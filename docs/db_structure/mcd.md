# Conception Merise : MCD

:
CREER, 11 EVENT, 0N USER
:
AJOUTER_EN_AMI, 0N USER, 0N USER: status

:
JOUER, 1N EVENT, 0N USER: team, status
USER : ref, username, email, password
:

EVENT : ref, date, location, duration, nb_team, nb_max_participant, status, winner_team, score_team_1, score_team_2
DISCUTER, 0N EVENT, 0N USER: message, date
:
AVOIR, 01 IMAGE, 01 USER

AVOIR2, 11 EVENT, 0N SPORT
:
MAITRISER, 0N SPORT, 0N USER, 01 EVENT: rating
:

SPORT : ref, name
DETENIR, 0N IMAGE, 1N SPORT
:
IMAGE : ref,title ,url
