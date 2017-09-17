import csv

file = open('./1_questions.csv', 'a')

with open('0_questions.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    for row in spamreader:
        if row[1] == '?':
            row[1] = "%s or %s ?" % (row[2], row[3])
        file.write(','.join(row))
        file.write("\n")

