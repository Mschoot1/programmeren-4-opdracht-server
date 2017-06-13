# node-msql-todolist
Nodejs server, biedt API op een ToDo list MySql database. De API endpoints zijn beveiligd met [JavaScript Web Tokens](https://jwt.io/), dus je moet inloggen voordat je de services kunt gebruiken. Voor dit project is ook een [Android client](https://github.com/avansinformatica/android-todolist) beschikbaar.

## Vooraf
- nodejs installeren
- MySql of MariaDB installeren (bv. via XAMPP)
- het script `tododb.sql` importeren in de database. 

## Gebruik
Vanaf command line:
```
npm install
npm start
```
De server runt op [localhost:3000](http://localhost:3000) en op [Heroku](https://mynodetodolistserver.herokuapp.com/api/v1/todos).

## API Endpoints
Om de API te kunnen gebruiken moet je inloggen. Dat kan met [Postman](https://www.getpostman.com/docs/introduction). 
Stuur een POST naar /api/v1/login met in de body:

```
{
    "username": "username",
    "password": "test"
}
```
Je krijgt dan een JWT token dat je in de header van ieder request mee moet sturen. 
De header die je moet instellen:

```
Authorization:   Bearer <JWT token>
```

Voorbeelden van endpoints: 
- GET,POST [localhost:3000/api/v1/todos](http://localhost:3000/api/v1/todos)
- GET, PUT, DELETE [localhost:3000/api/v1/todos/2](http://localhost:3000/api/v1/todos/2)

## Testen
Het project bevat een aantal testen. Deze zijn natuurlijk niet compleet, maar geven een idee van hoe je een project als dit kunt testen.

Om de testen uit te voeren:
```
npm test
```
De testen worden ook, na een push naar GitHub, uitgevoerd op [Travis CI](https://travis-ci.org/avansinformatica). Het project wordt alleen als de testen slagen op [Heroku](https://mynodetodolistserver.herokuapp.com/api/v1/todos) gedeployed. De configuratie voor Travis staat beschreven in `.travis.yml`. Koppel Travis via een account aan je eigen GitHub repository.

## Static Code Analysis met SonarQube
Er is ook een configuratie voor static code analysis met behulp van [SonarQube](https://sonarqube.com/organizations/avansinformaticabreda/projects). Deze anayse geeft je inzicht in de kwaliteit van je code.

De analyse wordt nog op je lokale machine uitgevoerd en daarna automatisch online gezet. Je moet de analyse dus nog handmatig triggeren. Hierbij wordt gebruik gemaakt van [Gulpjs](http://gulpjs.com/), en van de npm module [sonarqube-scanner](https://www.npmjs.com/package/sonarqube-scanner).

Om een analyse uit te voeren en naar SonarQube te publiceren:

```
gulp sonarqube
```
of
```
npm run sonar
```
Bekijk eventueel ook het bestand `gulpfile.js`; dat bevat het script dat de analyse uitvoert.