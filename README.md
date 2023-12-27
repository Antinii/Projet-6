# Projet 6 OpenClassrooms
## Just Stream It - Application web permettant de visualiser en temps réel un classement de films intéressants.

### Importation de l'API
En clonant l'api depuis github ou en le téléchargeant en fichier zip
```
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
ou
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR/archive/refs/heads/master.zip
```


### Activation du serveur local:
Vous devez avoir préalablement Python 3.11 installé ainsi qu'un IDE (PyCharm ou Virtual Studio)

Déplacez-vous vers le répertoire de l'API:
```
cd OCMovies-API-EN-FR-master
```
Créez votre environnement virtuel:
```
python -m venv env
```
Activez votre environnement virtuel:
```
env\Scripts\activate (pour windows)
ou
source env/bin/activate (pour linux)
```
Installez les packages nécessaires:
```
pip install -r requirements.txt
```
Créez la base de données:
```
python manage.py create_db
```
Démarrez le serveur:
```
python manage.py runserver
```
L'api est accessible depuis l'adresse:
```
 http://localhost:8000/api/v1/titles/
```
Pour de plus amples informations sur l'API son lien est:
```
https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR
```
Vous pouvez maintenant lancer le fichier index.html afin d'ouvrir le site web de JustStreamIt.
Bon visionnage !