# Conception Merise : MLD

<!-- winner_team -> 0: exeaco, 1: winners, 2: loosers -->
EVENT (
    id INTEGER,
    event_date DATE,
    location TEXT,
    duration INTEGER,
    nb_team INTEGER,
    nb_max_participant INTEGER,
    status TEXT,
    winner_team INTEGER,
    score_team_1 INTEGER,
    score_team_2 INTEGER,
    #user_id(id),
    #sport_name(name)
)

USER (
    id INTEGER,
    username TEXT,
    email TEXT,
    password TEXT,
    #image_url(url)
)

SPORT (
    id INTEGER,
    name TEXT
)

IMAGE (
    id INTEGER,
    title TEXT,
    url TEXT
)

<!-- Convertion : JOUER, 1N EVENT, 0N USER -->
EVENT_ON_USER (
    #event_id(id),
    #user_id(id),
    status TEXT,
    team INTEGER
)

<!-- Convertion : AJOUTER_EN_AMI, 0N USER, 0N USER -->
USER_ON_FRIEND (
    #asked_id(id),
    #asker_id(id),
    status TEXT
)

<!-- Convertion : MAITRISER, 0N SPORT, 0N USER, 01 EVENT -->
USER_ON_SPORT (
    id INTEGER,
    user_id INTEGER,
    sport_id INTEGER,
    rating INTEGER,
    #event_id(id)
)

<!-- Convertion : DETENIR, 0N IMAGE, 1N SPORT -->
SPORT_ON_IMAGE (
    #image_id(id),
    #sport_image_id(id)
)

<!-- Convertion : DISCUTER, 0N EVENT, 0N USER -->
EVENT_CHAT_ON_USER (
    user_id INTEGER,
    event_id INTEGER,
    message TEXT,
    date DATE
)
