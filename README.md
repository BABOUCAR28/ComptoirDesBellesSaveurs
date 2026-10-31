# Le Comptoir des Belles Saveurs — site web

Site vitrine + catalogue + demandes de commande/devis + administration.
**Aucune dépendance** : il suffit de **Node.js 22.13 ou plus** (base SQLite intégrée). Pas d’`npm install`.

## Installation
```
cp .env.example .env     # puis éditer (SITE_URL, ADMIN_PASSWORD…)
npm start                # http://localhost:3000
npm test                 # tests de bout en bout (base temporaire)
```
Au 1er démarrage, le compte admin est créé. Sans `ADMIN_PASSWORD`, un mot de passe est généré et affiché **une seule fois** dans la console. Admin : `/admin`.

## Choix techniques
Node.js + SQLite intégrés (aucune dépendance → peu de maintenance, installation simple), front HTML/JS léger (mobile-first, chargement rapide). Pas de paiement en ligne (hors périmètre v1). Une notification optionnelle (`NOTIFY_URL`, ex. ntfy) prévient à chaque demande.

## Livrables
`GUIDE.md` (guide responsable), `TESTS.md` (résultats réels), `deploy/` (Caddy, systemd, cron), `Dockerfile`, `scripts/backup.js`.

## Structure
- `server.js` : API, authentification (scrypt, cookie HttpOnly), validation serveur, limitation anti-abus, sitemap/robots.
- `public/index.html` : site (8 rubriques, URL propres `/sucres`, `/sales`, `/fatayas`, `/evenements`, `/apropos`, `/contact`, `/legal`).
- `public/admin.html` : espace de la responsable.
- `data/` : base `site.db` et photos `uploads/` (créé automatiquement, **à sauvegarder**).

## Guide de la responsable (`/admin`)
- **Produits** : ajouter/modifier (nom, description, photo, prix, unité, minimum, délai), cocher « Publié » pour afficher/masquer. Prix vide = « Prix à confirmer » sur le site.
- **Demandes** : chaque demande envoyée arrive ici au statut « Demande reçue ». Vous la vérifiez, contactez le client, puis changez le statut (en cours, confirmée, refusée). Rien n’est confirmé automatiquement.
- **Réglages** : WhatsApp (format `221XXXXXXXXX`), téléphone, e-mail, ville, retrait, horaires, livraison.

## Déploiement (VPS Linux)
1. Installer Node 22+, copier le projet, créer `.env`.
2. Lancer avec systemd ou pm2 (`node --no-warnings server.js`).
3. Mettre **Nginx ou Caddy** devant, avec HTTPS (Let’s Encrypt), vers `127.0.0.1:3000` ; garder `TRUST_PROXY=1`.
Un hébergement Node (VPS, Railway, Render…) est nécessaire ; un hébergement web classique ne convient pas.

## Sauvegarde / restauration
- Sauvegarde : copier le dossier `data/` (ex. `tar czf sauvegarde-$(date +%F).tgz data`), chaque jour via cron, hors du serveur.
- Restauration : arrêter le site, remplacer `data/` par la sauvegarde, relancer.

## À valider avant la mise en ligne
Logo, vrais produits/prix/photos, coordonnées, textes « À propos », mentions légales et confidentialité (page `/legal`, à rédiger selon le droit sénégalais), durée de conservation des données.

## Limites connues
Notification uniquement si `NOTIFY_URL` est configuré (sinon consulter `/admin`), pas de paiement en ligne (hors périmètre), titres de page gérés côté navigateur (pas de rendu serveur), CSP avec `unsafe-inline`.
