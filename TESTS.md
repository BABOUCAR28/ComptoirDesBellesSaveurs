# Résultats des tests réellement exécutés (25/10/2026)

## 1. Tests automatiques (`npm test`, Node 22, base temporaire)
```
OK   page /
OK   page /sucres
OK   page /sales
OK   page /fatayas
OK   page /evenements
OK   page /apropos
OK   page /contact
OK   page /legal
OK   page /admin
OK   page inconnue = 404
OK   traversal bloqué
OK   sitemap
OK   robots
OK   catalogue public (6 produits)
OK   commande valide
OK   téléphone invalide refusé
OK   date passée refusée
OK   produit inconnu refusé
OK   sans produit refusé
OK   devis sans type refusé
OK   admin sans session = 401
OK   mauvais mot de passe = 401
OK   connexion + cookie HttpOnly
OK   demande visible en admin (statut reçue)
OK   modif prix produit
OK   prix visible côté public
OK   masquer un produit
OK   statut confirmée
OK   statut invalide refusé
OK   upload image
OK   upload non image refusé
OK   SEO : titre propre à la page
OK   SEO : canonical + description
OK   notification envoyée
OK   garniture enregistrée et publique
OK   quantité minimale imposée
OK   réglages valides enregistrés
OK   livraison activée + frais publics
OK   WhatsApp invalide refusé
OK   lien javascript: refusé
OK   logo externe refusé
OK   logo téléversé accepté
OK   sauvegarde JSON (sans mot de passe)
OK   sauvegarde refusée sans session
OK   changement de mot de passe
OK   suppression produit
OK   limitation anti-abus (429)
OK   en-têtes de sécurité

48 réussis, 0 échecs
```

## 2. Test dans un navigateur réel (Chromium, scénario complet)
Mobile 375 px et ordinateur 1280 px : accueil → catalogue → « Commander ce produit » → formulaire → envoi → message « Demande reçue » (non confirmée) → connexion admin → demande visible. Résultat : **aucun débordement horizontal, aucune erreur JavaScript**, demandes enregistrées (CBS-1, CBS-2).

## 3. Autres
- `scripts/backup.js` : sauvegarde créée (base + photos) — réussi.

## Non testé
Android/iPhone réels, tablette, Lighthouse (performance/accessibilité), déploiement HTTPS (Caddy, systemd, Docker), réception réelle d’un message via un compte WhatsApp, compression d’image WebP dans l’admin (code non exécuté en navigateur), restauration depuis sauvegarde.
