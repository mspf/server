import csv
from dateutil import tz
from datetime import datetime, timedelta
import isodate

file = open('./1_answers.csv', 'a')

questions_csv = open('1_questions.csv', 'rb')
q_reader = csv.reader(questions_csv, delimiter=',')
next(q_reader, None) # skip header

answers_csv = open('0_answers.csv', 'rb')
a_reader = csv.reader(answers_csv, delimiter=',')
next(a_reader, None) # skip header

questions = dict()
for row in q_reader:
    questions[row[0]] = (row[1], row[2], row[3])

# market street
ms_start = datetime(2016, 10, 5, tzinfo=tz.gettz('PDT'))
ms_end = datetime(2016, 10, 9, tzinfo=tz.gettz('PDT'))

# asian art museum
aam_start = datetime(2016, 11, 6, tzinfo=tz.gettz('PDT'))
aam_end = datetime(2016, 11, 7, tzinfo=tz.gettz('PDT'))

# CHI
chi_start = datetime(2017, 5, 1, tzinfo=tz.gettz('PDT'))
chi_end = datetime(2017, 5, 15, tzinfo=tz.gettz('PDT'))

# maker faire
mf_start = datetime(2017, 5, 16, tzinfo=tz.gettz('PDT'))
mf_end = datetime(2017, 5, 23, tzinfo=tz.gettz('PDT'))

# write header
file.write("questionId,question,answerText,answer,location,timestamp\n")

for row in a_reader:
    if row[0] not in questions:
        print "id not found %s" % row[0]
        continue
    q = questions[row[0]]
    q_text = q[0]
    q_a = q[1]
    q_b = q[2]

    ans = q_a if row[1] == 'A' else q_b;
        
    dt = isodate.parse_datetime(row[2])
    sf_dt = dt.astimezone(tz.gettz('PDT'))

    if ms_start < sf_dt and sf_dt < ms_end:
        print "location marked as MS:  %s" % str(sf_dt)
        loc = "market street"
    elif aam_start < sf_dt and sf_dt < aam_end:
        print "location marked as AAM:  %s" % str(sf_dt)
        loc = "asian art museum"
    elif chi_start < sf_dt and sf_dt < chi_end:
        print "location marked as CHI:  %s" % str(sf_dt)
        loc = "chi 2017"
        sf_dt = sf_dt + timedelta(hours=1)
    elif mf_start < sf_dt and sf_dt < mf_end:
        print "location marked as MM:  %s" % str(sf_dt)
        loc = "maker faire"
    else: 
        print "location filtered by time:  %s" % str(sf_dt)
        continue

    # questionId,question,answerText,answer,createdAt
    new_row = [row[0],q_text,ans,row[1],loc,str(sf_dt)]
    file.write(','.join(new_row))
    file.write("\n")

