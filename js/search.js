var main_category="";
var main_concept = "";

function init(){
    var parentElem = document.getElementById("category_list");
    
    //all the categories are already in the var categories
    //Create and append select list
    main_category = categories[0];
    //main_concept = dictionary[main_category][0];
    var selectList = document.createElement("select");
    selectList.id = "category_select";
    selectList.onchange = function () {
        var sel_cat = selectList.value;
        main_category = sel_cat;
        //main_concept = dictionary[main_category][0];
        populateConcepts(sel_cat);
    };

    //Create and append the options
    for (var i = 0; i < categories.length; i++) {
        var option = document.createElement("option");
        option.value = categories[i];
        option.text = categories[i];       
        selectList.appendChild(option);
    }
    
    parentElem.appendChild(selectList);
    populateConcepts(main_category);
}

function populateConcepts(category){
    var parentElem = document.getElementById("concept_list");
    parentElem.innerHTML = "";
    
    var concepts = dictionary[category];
    main_concept = dictionary[category][0];
    
    var selectList = document.createElement("select");
    selectList.id = "concept_select";
    selectList.onchange = function () {
        main_concept = selectList.value;
        console.log(main_concept);
    };

    //Create and append the options
    for (var i = 0; i < concepts.length; i++) {
        var option = document.createElement("option");
        option.value = concepts[i];
        option.text = concepts[i];       
        selectList.appendChild(option);
    }
    
    parentElem.appendChild(selectList);
}

function displayResults(con_types){
    var parentElem = document.getElementById("results");
    parentElem.innerHTML = "";
    var mainWordElem = document.createElement("h2");
    mainWordElem.innerHTML = "Concept: "+ main_concept;
    parentElem.appendChild(mainWordElem);
    addHistory();
    var id =0;
    for (var t in con_types) {
        if (con_types.hasOwnProperty(t)) {
            var h3Elem = document.createElement("h3");
            h3Elem.innerHTML = t;
            var ulElem = document.createElement("ul");
            var c_obj_list = con_types[t];
            for (var i=0; i< c_obj_list.length; i++){
                id ++;
                var c  = c_obj_list[i];
                connected_word = c["connection"];
                title = c["title"];
                ref=c["ref"];
                txt = c["text"];
                author = c["author"];
                passage = c["passage"];
                con_passage = c["con+passage"];
                var liElem = document.createElement("li");
                var wElem = document.createElement("button");
                wElem.innerHTML = connected_word;
                wElem.id = connected_word;
                wElem.onclick = function(){
                    var this_elem = event.target.id;  
                    console.log(this_elem);
                    main_concept = this_elem;
                    searchConnections();                    
                }
                aElem = document.createElement("button");
                aElem.id = "show_"+id;              
                aElem.innerHTML = title;
                textElem = document.createElement("p");
                textElem.innerHTML = txt + "<br><i>" + author + "</i>"+"&nbsp;&nbsp;"+"<a href='" + ref + "' target='_blank'>(reference)</a>"
                textElem.id = "text"+id;
                textElem.setAttribute("style","display:none;");
                aElem.onclick = function (){
                    var causing_elem = event.target.id;   
                    //parse id after _  
                    var s =  causing_elem.split("_") ;  
                    showText(s[1]); 
                }; 

                textElem.onclick = function(){
                    var this_elem = event.target.id;  
                    hideText(this_elem);
                };
                
                liElem.appendChild(wElem);
                liElem.appendChild(aElem);
                liElem.appendChild(textElem);
                ulElem.appendChild(liElem);
            }
            parentElem.appendChild(h3Elem);
            parentElem.appendChild(ulElem);
        }
    } 
    
}

function showText(id){
    var x = document.getElementById("text"+id);  
    if (x) x.style.display = "block"; 
}

function hideText(id){
    var x = document.getElementById(id); 
    x.style.display = "none";  
}

function searchConnections(){
    var my_connections  = connections[main_concept];
    if (!my_connections) return;
    
    //group connections by type
    var types = {};
    for(var i=0; i< my_connections.length; i++){
        t = my_connections[i].type;
        if (!(t in types)){
            types[t] = [];
        }
        types[t].push(my_connections[i]);
    }
    displayResults(types);
}

function addHistory(){
    var footerElem = document.getElementById("footer");
    
    //check that this concept is not already in the history    
    for(var child=footerElem.firstChild; child!==null; child=child.nextSibling) {
        if (child.id && child.id.includes(main_concept))
            return;
    }
    var clearElem = document.createElement("button");
    clearElem.innerHTML = "x";
    clearElem.id = "clear_"+ main_concept;
    clearElem.onclick = function (){
        var causing_elem = event.target;
        var causing_elem_id = causing_elem.id;   
        //parse id after _  
        var s =  causing_elem_id.split("_") ;  
        var elem = document.getElementById("history_"+s[1]);
        elem.parentElement.removeChild(elem);
        causing_elem.parentElement.removeChild(causing_elem);
    };
    
    
    var wElem = document.createElement("button");
    wElem.id = "history_"+main_concept;
    wElem.innerHTML = main_concept;
    wElem.onclick = function (){
        var causing_elem = event.target.id;   
        //parse id after _  
        var s =  causing_elem.split("_") ;  
        main_concept = s[1]; 
        searchConnections();
    };
    footerElem.appendChild(wElem);
    footerElem.appendChild(clearElem);
}