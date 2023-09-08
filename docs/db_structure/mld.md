# Conception Merise : MLD

<!-- winner_team -> 0: by default, 1: winners, 2: loosers, 3: exeaco -->
EVENT (id INTEGER, event_date DATE, location TEXT, duration INTEGER, nb_team INTEGER, nb_max_participant INTEGER, status TEXT, winner_team INTEGER, #user_id(id), #sport_id(name))

USER (id INTEGER, username TEXT, email TEXT, password TEXT, #image_id(url))

SPORT (id INTEGER, name TEXT)

IMAGE (id INTEGER, title TEXT, url TEXT)

<!-- Convertion : JOUER, 1N EVENT, 0N USER -->
<!-- team = 0 by default, 1 if the player is in the first team, 2 for the second one -->
EVENT_ON_USER (event_id INTEGER, user_id INTEGER, team INTEGER)

<!-- Convertion : AJOUTER_EN_AMI, 0N USER, 0N USER -->
USER_ON_FRIEND (user_ask_id INTEGER, user_friend_id INTEGER, status TEXT)

<!-- Convertion : MAITRISER, 0N SPORT, 0N USER -->
USER_ON_SPORT (user_sport_id INTEGER, sport_id INTEGER, rate INTEGER)

<!-- Convertion : DETENIR, 0N IMAGE, 1N SPORT -->
SPORT_ON_IMAGE (image_id INTEGER, sport_image_id INTEGER)

<!-- Convertion : DISCUTER, 0N EVENT, 0N USER -->
EVENT_CHAT_ON_USER (user_event_id INTEGER, event_user_id INTEGER, message TEXT, date DATE)
