# Creation d'une instance EC2

## Creation de compte pour authoriser une connexion ssh

- se connecter au serveur
  ```ssh -i "osport.pem" ubuntu@ec2-54-237-246-173.compute-1.amazonaws.com```

- creer un nouveau compte utilisateur
  ```sudo adduser <username>```
- ajouter nouvel utilisateur au groupe sudo
  ```sudo adduser <username> sudo```
- se connecter en tant que ce nouvel utilisateur
  ```su - <username>```
- creation d'un dossier ./.ssh à la racine
  ```mkdir ./.ssh```
- creation d'un fichier authorized_keys
  ```touch authorized_keys```
- inscrire la clé ssh public du nouvel utilisateur
  pour ouvrir le fichier
  ```nano authorized_keys```
  copier la clé
  Ctrl + x puis Y pour sauvgarder
- redémarer ssh
  ```sudo systemctl restart sshd```
  