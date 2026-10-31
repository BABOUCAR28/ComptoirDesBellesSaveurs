# Guide de la responsable — Le Comptoir des Belles Saveurs

## Démarrage du site

```bash
node --no-warnings --experimental-sqlite server.js
```

Le site est accessible sur : **http://localhost:3000**  
L'administration est accessible sur : **http://localhost:3000/admin**

> Le flag `--experimental-sqlite` est nécessaire sur Node.js 22.x. La commande `npm start` l'inclut automatiquement.

---

## Gestion des produits

1. Aller sur `/admin` → onglet **Produits**.
2. Remplir le formulaire : catégorie, nom, description, garniture (si confirmée), prix en FCFA, unité, quantité minimale, délai de précommande → **Enregistrer**.
3. **Photo** : choisir un fichier PNG/JPEG/WebP, elle est réduite automatiquement.
4. **Prix vide** = le site affiche « Prix à confirmer ».
5. Décocher **Publié** pour masquer un produit sans le supprimer.
6. Pour modifier un prix : cliquer **Modifier**, changer le prix, **Enregistrer** — le site est à jour immédiatement.

---

## Gestion des demandes

Onglet **Demandes** : chaque demande reçue via le formulaire apparaît en statut « Demande reçue ».

Procédure :
1. Contacter le client (WhatsApp / téléphone).
2. Confirmer disponibilité, prix final, délai, modalités de paiement et de réception.
3. Passer le statut à **Commande confirmée** — ou **Refusée / annulée** si nécessaire.

Le client ne reçoit jamais de confirmation automatique : c'est toujours la responsable qui confirme.

---

## Réglages du site

Onglet **Réglages** — sections disponibles :

| Rubrique | Contenu |
|---|---|
| Images | Logo de l'entreprise, photo principale de l'accueil |
| Coordonnées | WhatsApp (`221XXXXXXXXX`), téléphone, e-mail, ville, retrait, horaires |
| Commandes | Paiement, livraison, frais, conditions d'annulation |
| Réseaux sociaux | Liens Facebook, Instagram, TikTok |
| À propos | Présentation, histoire, activité, valeurs, démarche, engagement |
| Mentions légales | Nom, responsable, adresse, NINEA/RCCM, hébergeur, conservation |

Tout champ vide est affiché comme « à compléter » sur le site public — jamais inventé.

---

## Sauvegardes

- **Depuis l'admin** : onglet Réglages → **Télécharger une sauvegarde** (produits, demandes et réglages en JSON).
- **Automatique sur serveur** : voir `deploy/crontab.txt` — sauvegarde quotidienne à 3h du matin.
- **Restauration** : arrêter le site, remplacer le dossier `data/` par la sauvegarde, relancer.

---

## Déploiement en production

1. Copier le projet sur le serveur dans `/opt/comptoir`.
2. Copier `.env.example` en `.env` et remplir les variables (`PORT`, `SITE_URL`, `ADMIN_PASSWORD`…).
3. Installer le service systemd : `sudo cp deploy/comptoir.service /etc/systemd/system/` puis `sudo systemctl enable --now comptoir`.
4. Configurer Caddy (proxy HTTPS) : voir `deploy/Caddyfile`.
5. Vérifier que le site répond sur le domaine configuré.

> **Node.js requis : version 22.5 minimum** (pour le support SQLite intégré).
