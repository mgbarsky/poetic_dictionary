import csv
import json
import codecs

if __name__=="__main__":
    data_file = "CSV_connections.csv"
    graph_list = []
    first_row = True
    with open(data_file, newline='', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
        for row in reader:
            if first_row:
                first_row = False
                continue
            concept1 = row[9]
            concept2 = row[10]

            type = row[8]

            row_list1 =[]
            row_list1.append(concept1)
            row_list1.append(concept2)
            row_list1.append(type)
            graph_list.append(row_list1)

            row_list2 = []
            row_list2.append(concept2)
            row_list2.append(concept1)
            row_list2.append(type)
            graph_list.append(row_list2)

    f = codecs.open("visualization/graph.csv", "w", "utf-8")
    for row in graph_list:
        f.write(",".join(row))
        f.write("\n")

    f.close()

