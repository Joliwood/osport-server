# O'Sport

## Presentation du projet

Une application autour du sport, réfléchie pour des matchs de foot 5v5 mais pouvant s'appliquer à d'autres sports. L'application regrouperait des utilisateurs, chaque utilisateur aurait une fiche sous forme de tableau de scores par compétences.

L'utilisateur aurait la possibilité, lors de son inscription et uniquement à ce moment-là, de s'attribuer des scores pour chaque compétence. De plus, un utilisateur aurait la possibilité d'attribuer des notes à d'autres utilisateurs, sous certaines conditions à définir, par exemple, en étant présents dans une liste d'amis ou en ayant participé ensemble à au moins un événement sportif.

Le but de l'application serait de permettre à un utilisateur de créer un événement (comme un match par exemple), d'envoyer des invitations à une liste d'utilisateurs, de créer une messagerie instantanée regroupant les invités pour leur permettre de s'organiser. Une fois le nombre de participants atteint, l'application créerait deux équipes équilibrées en fonction du score de chaque participant.

Après chaque événement, les participants pourront élire un MVP (Most Valuable Player et non Minimum Viable Product). Ce MVP verra son score global augmenté. On peut imaginer d'autres éléments qui pourraient incrémenter ou décrémenter le score global d'un utilisateur, comme le fair-play du joueur, etc.

## Public visé

Tous sportifs, tous niveaux. Groupes d'amis voulant se réunir et garder un historique des matchs joués via une interface simple à utiliser, et permettre aux joueurs de s'évaluer entre eux. L'application permettra de générer deux équipes en fonction de la note des joueurs. Le résultat des matchs sera enregistré par l'oganisateur de l'événement.

## Besoins

- L'utilisateur doit pouvoir créer un événement
- L'utilisateur doit pouvoir ajouter/supprimer des amis à ses contacts
- L'utilisateur peut accéder à son historique de matchs joués qui affiche les détails du match (participants, score, sport, date)
- L'utilisateur peut accepter une invitation à un événément envoyée par un ami
- L'utilisateur peut modifier ses informations de profil
- L'utilisateur doit pouvoir communiquer via une messagerie avec les autres participants d'un événement
- L'organisateur peut inviter ses amis à l'événement créé
- L'organisateur doit pouvoir modifier l'événement
- L'organisateur peut confirmer l'événément
- L'organisateur de l'événement peut inscrire le score final

## Fonctionnalités

Dans une version 1, l'application comprendrait :

- La possibilité pour l'utilisateur de s'enregistrer, modifier ou supprimer intégralement son profil
- Modifier sa photo de profil, son pseudo et mettre à jour son email
- L'utilisateur doit pouvoir s'attribuer un niveau de base (débutant-intermediaire-confirmé) selon le sport
- L'ajout d'autres utilisateurs dans une liste d'amis
- La création, modification, confirmation et suppression d'événements
- L'envoi d'invitations à l'événement aux contacts choisis
- La création d'une messagerie par événement accessible pour tous les participants
- La repartition des participants en équipes via  un algorithme (score global en unique paramètre pour avoir 2 équipes équilibrées)
- Le niveau choisi par l'utilisateur correspond à une valeur numerique (débutant = 1 à 3, intermediare = 4 à 6, confirmé = 7 et +)
- La possibilité de noter les joueurs (note de 1 à 10)
- L'accés à l'historique des matchs disputés

### Bonus

- Une authentification via Google (et/ou Apple)
- Email de confirmation
- Ajout un lien vers Google Agenda automatique
- Election MVP
- Encart pour le prochain événement à venir
- Liste d'attente lors d'un matchmaking (confirmé par l'organisateur)
- Possibilité d'invitation à rejoindre l'application
- Chat direct

## Technologies utilisées

### Front

- TypeScript
- React
- Node
- Vite
- Vitest
- Tailwindcss
- DaisyUI

### Back

- TypeScript
- Prisma
- PostgreSQL
- Faker
- Express
- Node
- Vitest
- Cypress

## Arborescence de l'application

### [Trello](https://www.figma.com/file/TBX27pwp27QdyIRzMbHJWE/OSport?type=design&node-id=44%3A2&mode=design&t=yfL0rgEu1itT30FB-1)

## Liste des routes FRONT

- /
- /login
- /signup
- /contact
- /edit_profile
- /create_event
- /event_list
- /event/:id
- /legal_mentions
- /privacy_policy

## Liste des routes BACK

| ROUTE | GET | POST | PATCH | DELETE | DESCRIPTION |
| :---: | :---: | :---: | :---: | :---: | :---: |
| `/signup` | ❌ | ✅ | ❌ | ❌ | Creation of the user and hash password |
| `/signin` | ❌ | ✅ | ❌ | ❌ | Creation of a token to resend back to the front |
| `/user/validate` | ✅ | ❌ | ❌ | ❌ | |
| `/logout` | ❌ | ✅ | ❌ | ❌ | Invalidate token |
| `/user` | ✅ | ❌ | ✅ | ✅ | |
| `/user/image` | ❌ | ❌ | ✅ | ❌ | |
| `/user/sport` | ✅ | ❌ | ❌ | ❌ | User_on_sport |
| `/user_friends/:id` | ✅ | ❌ | ❌ | ❌ | |
| `/user_friends/send/:id` | ❌ | ✅ | ❌ | ❌ | |
| `/user_friends/reject/:id` | ❌ | ✅ | ❌ | ❌ | |
| `/user_friends/accept/:id` | ❌ | ✅ | ❌ | ❌ | |
| `/rate_user/:id` | ❌ | ❌ | ✅ | ❌ | |
| `/event` | ❌ | ✅ | ✅ | ❌ | Here, after organizator validate the event, it generate teams and distribute players (for Patch) |
| `/event/:id` | ✅ | ❌ | ❌ | ❌ | |
| `/event/details/:id` | ✅ | ❌ | ❌ | ❌ | |
| `/event/validate` | ❌ | ❌ | ✅ | ❌ | |
| `/event/results` | ❌ | ❌ | ✅ | ❌ | After the end of the event, the organizator only can save results |
| `/sport` | ✅ | ❌ | ❌ | ❌ | |
| `/chat` | ❌ | ✅ | ❌ | ❌ | To send new message to the chat |
| `/chat/:id` | ✅ | ❌ | ❌ | ❌ | To reload the chat, new players or chat messages |

## Wireframes

### [Moqup - Desktop Version](https://app.moqups.com/cCk3iLfr4qXsS0zye6MKNCvcdlGhEQ7r/view/page/ad64222d5)

### [Moqup - Mobile Version](https://app.moqups.com/W7DPy5eEV1H5z1EvA04u3hCgxf7e6vlT/view/page/ad64222d5)

## Se repérer dans les commits

:zap: = Minor correction / fast debug \
:construction: = Work in progress \
:tada: = New feature \
:card_file_box: = Datas or contents updated \
:hammer: = Corrections / debug \
:memo: = Readme / Code comments / Documentations \
:rotating_light: = Security \
:sparkles: = Clean code
