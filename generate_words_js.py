import pandas as pd
import json
import codecs

if __name__=="__main__":
    words_file = "CSV_concepts.csv"
    words = pd.read_csv(words_file)
    word_list = words.to_numpy().tolist()
    categories = {}
    concepts = set()
    for item in word_list:
        w = item[0]
        c = item[1]
        if c not in categories:
            categories[c] = set()

        categories[c].add(w)
        concepts.add(w)

    print("Total categories", len(categories))
    print("Total words:", len(concepts))

    for k in categories:
        words_l = list(categories[k])
        categories[k] = sorted(words_l)

    # print(categories)

    concepts = list (concepts)
    concepts.sort()

    # print(concepts)

    # convert into JSON:
    concepts_js = "var concepts="+ json.dumps(concepts) +";"
    #print(concepts_js)

    dictionary_js = "var dictionary ="+ json.dumps(categories) +";"
    # print(dictionary_js)

    sorted_categories = list(categories.keys())
    sorted_categories.sort()
    # print(sorted_categories)

    categories_js = "var categories =" + json.dumps(sorted_categories) + ";"
    # print(categories_js)





    f = codecs.open ("js/word_data.js", "w", "utf-8")
    f.write(concepts_js)
    f.write("\n")

    f.write(dictionary_js)
    f.write("\n")

    f.write(categories_js)
    f.write("\n")

    f.close()