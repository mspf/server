import csv
from dateutil import tz, parser
from datetime import datetime, timedelta
import isodate

file = open('./question_location_frequency.csv', 'a')

answers_csv = open('1_answers.csv', 'rb')
a_reader = csv.reader(answers_csv, delimiter=',')
next(a_reader, None) # skip header

questions_location_dic = dict() # (question_id, location) -> count, delta

def getDatetimeFromStr(s):
    return parser.parse(s)
    # try:
    #     return datetime.strptime(s, "%Y-%m-%d %H:%M:%S.%f-07:00")
    # except ValueError:
    #     return datetime.strptime(s, "%Y-%m-%d %H:%M:%S-07:00")

prev_row = None #next(a_reader)
for row in a_reader:
    if prev_row is not None:
        prev_question_id = prev_row[0]
        prev_loc = prev_row[4]
        prev_time = getDatetimeFromStr(prev_row[5])

    cur_question_id = row[0]
    cur_loc = row[4]
    cur_time = getDatetimeFromStr(row[5])

    if (cur_question_id, cur_loc) not in questions_location_dic:
        questions_location_dic[(cur_question_id, cur_loc)] = (1, timedelta(0))

    if (prev_row is None or
            prev_question_id != cur_question_id or prev_loc != cur_loc):
        prev_row = row
        continue

    # got same question_id, location
    
    cd = questions_location_dic[(cur_question_id, cur_loc)]
    questions_location_dic[(cur_question_id, cur_loc)] = (cd[0] + 1, cd[1] + (cur_time - prev_time))
    if (cur_time < prev_time):
        print("Warning: prev_time larger than cur_time")


for k,v in questions_location_dic.iteritems():
    # questionId,location,totalCount,totalDuration,avgInterval
    avgInterval = str(v[1].total_seconds() / (v[0] - 1)) if v[0] > 1 else 'None'
    row = [k[0],k[1],str(v[0]),str(v[1].total_seconds()),avgInterval]
    file.write(','.join(row) + '\n')

