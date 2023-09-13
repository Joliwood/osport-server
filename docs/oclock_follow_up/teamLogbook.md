# Journal de bord

## Jour 1 - 11/08/2023

- Début du Sprint 0
- Définition des rôles (Product Owner, Git
Master, Lead Dev Front, Project Manager)
- Découverte et compréhension du projet
- Définitions des besoins pour la V.1 de l'application
- Idées de features à rajouter selon l'avancement du projet
- Choix des technologies à utiliser, côté Back & Front
- Ebauche de l'arborescence et des routes de l'application
- Mise en place d'un outil de gestion : Trello

### Jour 1 - A faire

- UserStories
- MCD (Guillaume & Steeve)
- Wireframes (Anthony)

## Jour 2 - 14/08/2023

- Ajout de Tailwind au projet (avec DaisyUI)
- Premières versions des Userstories (Revues par chaque membre)
- Premières propositons du MCD (Revues par chaque membre)
- Convention de nommage des commits

- Redéfinition de la page d'accueil, qui comprendra le chat, les dates des prochaines rencontres et autres informations (profil, historique des rencontres jouées)
- Redéfinition de la page matchmaking, où il sera possible de selectionner les participants, et de les afficher sur un terrain virtuel (image de fond en fonction du sport)

### Jour 2 - A faire

- Revue des UserStories proposées
- Revue des MCD proposés
- Dictionnaire de données

## Jour 3 - 16/08/2023

- Définition des bases de données relatives aux sports :
- Football : passing, pace, dribbling, shot, tackle, strenght
- Basket : dribbling, strength, block, mid-range-shot, long-range-shot, vertical, acceleration
- Revue des Wireframes en vue de modifications futures quand le front sera en cours d'élaboration
- Modification des routes suite aux modifications d'organisation de la structure de l'app (Wireframe)

## Jour 4 - 17/08/2023

Après revision des besoins/fonctionnalités :

- Suppression des fonctionnalités les plus chronophages, à integrer dans une V2 (chat direct, authentification Google, agenda)
- Revues des composants en front à simplifier (remplissage du terrain au fur et à mesure de la séléction des participants et autres optimisations)
- Revue du systeme de note, avec une seule note globale au lieu de plusiers skills.
- Les notes attribuées donneront un niveau à l'utilisateur : 1 à 3 = débutant, 4 à 6 = intermédiaire, 7 et + = confirmé.
- Les notes seront utilisées en back pour donner un niveau à l'utilisateur en front
- L'utilisateur choisira son niveau et ne s'attribuera pas de note au départ
- 2 sports conservés dans la V1 : Football et Basket-ball
- Finalisation des user stories

- Schéma d'arborescence fait (Thomas)
- Routes côté Backend définies (Steeve & Guillaume)
- Wireframes Desktop & Mobile finalisés (Anthony)
- Mise à jour du Trello, en séparant les tâches à effectuer (Guillaume & Anthony)
- Connexion à un serveur AWS en vue d'un futur déploiement (Steeve & Thomas)

## Jour 5 - 18/08/2023 (& week-end)

- Début de l'intégration page Profile, problème avec daisyUI qui ne prenait pas en compte les changements de CSS pour un élément ni les thèmes choisis. Les 1er éléments sont créés. (Anthony)
- Intégration page Login & Signup, et de la logique de connexion (useEffect), formulaire de connexion et d'inscription fait. Problème avec les sessions ajout de AuthProvider pour plus de sécurité. (Thomas)
- Script pour mettre des users dans la BDD, authentification, ajout de règles sur ESLint (le projet ne démarrait plus, extensions non reconnues). (Steeve)
- Intégration de Vitest, Diffèrentes configutaion ESLint. (Guillaume).

## Jour 6 - 21/08/2023

- Intégration de la page /profile et du menu de navigation du site, mise en place de vitest (Anthony)
- Intégration de la page login, stockage dans le local-storage (pour identifier l'user) via un hook (useLocaleStorage). Les données seront finalement stockées dans les cookies (Thomas)
- Schema Prisma, définition des modèles, BDD Locale, création de user via faker. usercontroller pour la journée (Guillaume)
- Authentification fonctionelle, ajout de la route pour se déconnecter. (Steeve)

## Jour 7 - 22/08/2023

- Validation des features ajoutées hier, controller & router pour les demandes d'amis (modification des routes), implémentation Zod (Steeve)
- Travail sur les routes /user (ajout de target pour cibler un user), travail sur les images des utilisateurs (Guillaume)
- Integration de la page /contact, logique sur l'input search pour récuperer le username du contact à ajouter, ajout du header sur l'app (Anthony)
- Continuation de la logique pour le login et signup (Thomas)

## Jour 8 - 23/08/2023

- Integration des pages event-list, edit-profile, create-event(en cours). Refonte du menu et mise en place d'un header. Probleme sur l'affichage d'un composant avec des avatars (sur create_event) (Anthony)
- Page signup fonctionelle, page login en cours (Thomas)
- Routes user terminées (modifier les infos, delete user, modifier avatar, liste des sports) (Guillaume)
- Script ajouté pour avoir un admin (fictif), création des relations (Steeve)

## Jour 9 - 24/08/2023

- Integration de la page create-event, event (en cours), création du composant Chat (Anthony)
- Amelioration des données faker, routes création event (Guillaume)
- Controller, Route pour les events, patch sur la DB, Gestion d'erreur, Algo Pour generer les equipes, Controller, routes et modeles pour les messages (Steeve)
- Page login terminée (Thomas)

## Jour 10 - 25/08/2023

- Integration de la page event et des differents composants qui évolueront en fonction du statut de l'event, modale pour noter les joueurs, amélioration CSS de la page create_event (Anthony)
- Elaboration d'une documentation complète de l'application côté back, connexion du front avec le back (Steeve)
- Gestion du seed, résolution de nombreux bugs en cours (Guillaume)
- Authentification terminée, mise en place de ReactCoookie pour recupèrer les informations envoyées (Thomas)

## Jour 11 - 28/08/2023

- Le user peut desormais créer un event => Todo : User peut lancer le match (verif. si user est l'organisateur), User peut modifier un event. (Guillaume)
- Resolution de problème sur le login suite à un changement de PC + veille  + début logique page profile (Thomas)
- Liaison entre event et algo pour la génération des équipes, fin du back. Notes et schema fixed (Steeve)
- Problème avec la récuperation des datas (useEffect), création d'un hook perso. pour fetch les datas (avec l'aide de Steeve et Thomas), affichage de la liste des contacts (Anthony)

## Jour 12 - 29/08/2023

- Affichage de la liste des contacts de manière dynamique, changement en fonction du statut de la demande. Todo => Fin de la page contact (ajout amis) (Anthony)
- Fin de user can validate event, et debut de update event. Todo => fin de l'update et debut de save event (Guillaume)
- Aide sur le front pour la création d'un hook personnalisé, update du seed (Steeve)

## Jour 13 - 30/08/2023

- Principales fonctionnalités page contact terminées (Affichage, Ajout, Accepter/Refuser). Affichage de la liste des events de l'utilisateur (score, date, etc...) (Anthony)
- Route pour les events (sans les participants), validation de l'event, enregistrement des events terminés (avec les scores) / (Front) Création event (nb de participants/sport/date) (Guillaume)
- Page Edit-profile avec enregistrement nouveau username et nouveau email et la photo de profil (image upload sur le serveur local) (Thomas & Steeve)

## Jour 14 - 31/08/2023

- Page Event en cours,  les composants changent en fonction du statut du match, validation du match par l'organisateur (Anthony)
- Page Edit Profile Ok, (changement pseudo, email, avatar). Auto-évaluation selon le sport Ok (Thomas)
- Page Create-Event Ok + Création d'une route event/detail/:id (Guillaume)
- Tentative d'utilisation de Docker (Steeve)
