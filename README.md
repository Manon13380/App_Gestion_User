J'ai opté pour une architecture monobloc, où chaque composant de l'application est intégré dans une seule et même plateforme. Elle a pour avantage la simplicité de déploiement, la cohérence du code et la facilité de maintenance.

J'ai choisi d'utiliser Node.js car ce langage est hautement performant grâce à son modèle asynchrone et non bloquant. De plus, son gestionnaire de paquets "npm"  permet d'intégrer des fonctionnalités tierces et répondre aux besoins spécifiques de mon application.

Pour le template, j'ai opté pour Twig en raison de sa simplicité et de sa puissance. Il offre une syntaxe claire et intuitive pour la création de modèles, ce qui facilite la gestion et la manipulation des données côté serveur.




---------------------------------------------Guide d'utilisation du projet Node.js---------------------------------------------


- Installer toutes les dépendances avec la commande : npm install

- Démarrage du serveur avec nodemon (redémarre automatiquement le serveur à chaque fois qu'un changement est détecté) : nodemon server.js