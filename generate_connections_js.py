import csv
import json
import codecs

if __name__=="__main__":
    data_file = "CSV_connections.csv"
    connection_dict = {}
    first_row = True
    with open(data_file, newline='', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for row in reader:
            if first_row:
                first_row = False
                continue
            concept1 = row[9]
            concept2 = row[10]

            author = row[1]
            title = row[2]

            text = row[4]
            text = text.replace('\n', '<br>')
            ref = row[5]

            passage1 = row[6]
            passage1 = passage1.replace('\n', '<br>')
            passage2 = row[7]
            passage2 = passage2.replace('\n', '<br>')

            type = row[8]

            connect_obj_for_w1 = {"author": author, "type": type, "title": title, "text": text,
                                  "ref": ref, "connection": concept2, "passage": passage1, "con_passage": passage2}
            connect_obj_for_w2 = {"author": author, "type": type, "title": title, "text": text,
                                  "ref": ref, "connection": concept1, "passage": passage2, "con_passage": passage1}

            if concept1 not in connection_dict:
                connection_dict[concept1] = []
            connection_dict[concept1].append(connect_obj_for_w1)

            if concept2 not in connection_dict:
                connection_dict[concept2] = []
            connection_dict[concept2].append(connect_obj_for_w2)

    # convert into JSON:
    connections_js = "var connections=" + json.dumps(connection_dict) + ";"
    print(connections_js)

    f = codecs.open("js/connections_data.js", "w", "utf-8")
    f.write(connections_js)
    f.write("\n")

    f.close()




