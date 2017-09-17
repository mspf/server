#!/bin/bash

mongoexport --host localhost --db VoteWithYourFeet --collection answers --type=csv --out answers.csv --fields questionId,answer,createdAt

mongoexport --host localhost --db VoteWithYourFeet --collection questions --type=csv --out questions.csv --fields _id,text,optionA,optionB,count
