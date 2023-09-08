:
SPORT : ref, name
DETENIR, 0N IMAGE, 1N SPORT
:
IMAGE : ref,title ,url

AVOIR2, 11 EVENT, 0N SPORT
JOUER, 1N EVENT, 0N USER: team
MAITRISER, 0N SPORT, 0N USER: rate
:
AVOIR, 01 IMAGE, 01 USER

EVENT : ref, date, location, duration, nb_team, nb_max_participant, status, winner_team
CREER, 11 EVENT, 0N USER
USER : ref, username, email, password
:
AJOUTER_EN_AMI, 0N USER, 0N USER: status

:
DISCUTER, 0N EVENT, 0N USER: message, date
:
: