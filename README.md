# FlowBoard

## Description
FlowBoard est un petit projet de gestion des tâches sous forme d'un tableau Kanban.

Le projet permet de suivre les tâches d'une équipe et de les organiser dans trois colonnes :
- À faire
- En cours
- Terminé

L'objectif est de remplacer les tableaux blancs par une application simple et facile à utiliser.

## Fonctionnalités
- Afficher les tâches depuis une API.
- Ajouter une nouvelle tâche.
- Filtrer les tâches par priorité.
- Filtrer les tâches par utilisateur.
- Rechercher une tâche par mot-clé.
- Afficher le nombre de tâches dans chaque colonne.
- Gérer les erreurs de chargement.
- Afficher un message si aucune tâche n'est trouvée.

## Technologies utilisées
- HTML
- CSS
- JavaScript Vanilla
- Fetch API
- Tailwind CSS
- Git et GitHub

## Structure du projet

```text
flowboard/
│
├── index.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── api.js
│   ├── ui.js
│   ├── app.js
│   └── validation.js
│
├── assets/
│
├── README.md
└── .gitignore
```

## Utilisation

- Ouvrir l'application.
- Consulter les tâches dans les trois colonnes.
- Cliquer sur "Nouvelle carte" pour ajouter une tâche.
- Utiliser les filtres pour rechercher une tâche.
- Cliquer sur "Réinitialiser" pour afficher toutes les tâches.

## Organisation Git

Le projet utilise une organisation simple avec les branches suivantes :

- `main` : version finale du projet.
- `develop` : branche principale de développement.
- `feature/board-layout` : création de l'interface.
- `feature/list-cards` : affichage des tâches.
- `feature/add-card` : ajout des tâches.
- `feature/filters` : filtrage des tâches.

Chaque fonctionnalité est développée dans une branche séparée et intégrée avec une Pull Request.

## Auteur

Projet réalisé individuellement dans le cadre d'un exercice de développement JavaScript.

## Date limite

13 novembre 2026.