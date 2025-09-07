# Application de Gestion des Charges Horaires

## Université Ibn Zohr - Faculté Polydisciplinaire de Ouarzazate
### Master : Intelligence Artificielle et Applications

## Description

Cette application web moderne permet de gérer efficacement les charges horaires des enseignants au sein d'un département universitaire. Elle offre une interface intuitive pour la répartition manuelle des modules entre enseignants et la consultation des charges horaires selon le rôle de l'utilisateur.

## Fonctionnalités

### Pour les Administrateurs
- ✅ Gestion complète des utilisateurs (ajout, modification, suppression)
- ✅ Gestion des modules et leurs volumes horaires
- ✅ Répartition manuelle des cours/TD/TP aux enseignants
- ✅ Visualisation des charges horaires par enseignant, semestre ou département
- ✅ Tableau de bord avec statistiques détaillées
- ✅ Gestion des affectations et suivi des confirmations

### Pour les Professeurs
- ✅ Consultation des modules affectés
- ✅ Visualisation de la charge horaire personnelle
- ✅ Ajout de remarques concernant les affectations
- ✅ Interface dédiée aux cours et planning
- ✅ Suivi de l'historique des charges

### Fonctionnalités Générales
- ✅ Interface moderne et responsive
- ✅ Authentification sécurisée avec rôles
- ✅ Visualisations graphiques des données
- ✅ Filtres et recherche avancée
- ✅ Export des données
- ✅ Notifications et alertes

## Technologies Utilisées

### Frontend
- **React.js 18** - Framework principal
- **React Router** - Navigation entre pages
- **Recharts** - Visualisations graphiques
- **Lucide React** - Icônes modernes
- **CSS3** - Styling personnalisé avec design system

### Architecture
- **Context API** - Gestion d'état globale
- **Composants réutilisables** - Architecture modulaire
- **Responsive Design** - Compatible mobile et desktop

## Installation

1. **Cloner le projet**
   ```bash
   git clone <repository-url>
   cd university-workload-management
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer l'application**
   ```bash
   npm start
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:3000
   ```

## Comptes de Démonstration

### Administrateur
- **Email:** admin@uiz.ac.ma
- **Mot de passe:** motdepasse

### Professeur
- **Email:** prof@uiz.ac.ma
- **Mot de passe:** motdepasse

## Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.js       # En-tête de l'application
│   ├── Sidebar.js      # Barre latérale de navigation
│   ├── Layout.js       # Layout principal
│   └── LoadingSpinner.js
├── contexts/           # Contextes React
│   └── AuthContext.js  # Gestion de l'authentification
├── pages/              # Pages de l'application
│   ├── Login.js        # Page de connexion
│   ├── Dashboard.js    # Tableau de bord principal
│   ├── AdminDashboard.js
│   ├── ProfessorDashboard.js
│   ├── UsersManagement.js
│   ├── ModulesManagement.js
│   ├── AssignmentsManagement.js
│   ├── WorkloadOverview.js
│   └── Profile.js
├── App.js              # Composant principal
├── index.js            # Point d'entrée
└── index.css           # Styles globaux
```

## Contraintes Métier Implémentées

- ✅ 240 heures de cours/an pour les PES
- ✅ 300 heures de cours/an pour les MC/MCH
- ✅ 1 heure de cours = 1h30 de TD = 2h de TP
- ✅ Un semestre contient 7 modules (5 disciplinaires, 1 soft skill, 1 langue)
- ✅ Alertes pour les dépassements de charge horaire
- ✅ Calcul automatique des pourcentages de charge

## Fonctionnalités Avancées

### Visualisations
- Graphiques en barres pour les charges par enseignant
- Graphiques en secteurs pour la répartition par département
- Graphiques linéaires pour l'évolution temporelle
- Indicateurs de progression visuels

### Interface Utilisateur
- Design moderne avec dégradés et ombres
- Animations fluides et transitions
- Mode responsive pour tous les écrans
- Thème cohérent avec l'identité universitaire

### Gestion des Données
- Filtres multiples et recherche en temps réel
- Tri et pagination des tableaux
- Modales pour les formulaires
- Validation des données côté client

## Équipe de Développement

- **Fatima Zohra Ait Ahmed Ouhamou**
- **Fatima Ait Khadra**
- **Soukayna Bouras**

**Sous la direction de :** Prof. MOHAMED BENADY

**Année Universitaire :** 2024-2025

## Scripts Disponibles

- `npm start` - Lance l'application en mode développement
- `npm build` - Construit l'application pour la production
- `npm test` - Lance les tests
- `npm eject` - Éjecte la configuration (irréversible)

## Prochaines Étapes

1. **Intégration Backend** - Connexion à l'API Django
2. **Base de Données** - Intégration MySQL
3. **Tests** - Tests unitaires et d'intégration
4. **Déploiement** - Mise en production
5. **Documentation** - Documentation technique complète

## Licence

Ce projet est développé dans le cadre académique de l'Université Ibn Zohr.

---

*Application développée avec ❤️ pour l'Université Ibn Zohr*