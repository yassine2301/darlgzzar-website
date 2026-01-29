# Dar L'Gzzar - Site Web Statique

Site vitrine one-page pour **Dar L'Gzzar**, unité de découpe et de transformation de viandes située à Benslimane, Maroc.

## Structure du Projet

```
darlgzzar-website/
├── index.html              # Page principale
├── assets/
│   ├── css/
│   │   └── main.css        # Styles (responsive, variables CSS)
│   ├── js/
│   │   └── main.js         # JavaScript vanilla (ES6+)
│   └── images/
│       ├── logo/           # Logo et favicon
│       ├── hero/           # Image hero (à ajouter)
│       ├── agrements/      # Certificats (à ajouter)
│       └── produits/       # Photos produits (à ajouter)
├── robots.txt              # Configuration crawlers
├── sitemap.xml             # Plan du site SEO
├── _headers                # En-têtes sécurité (Netlify)
├── .htaccess               # Configuration Apache
└── README.md               # Ce fichier
```

## Prérequis

Aucune dépendance externe. Le site est 100% statique (HTML, CSS, JS vanilla).

## Installation

1. Cloner ou télécharger le projet
2. Placer les fichiers sur un serveur web (Apache, Nginx, Netlify, Vercel...)
3. Configurer HTTPS (obligatoire)

## Configuration Requise

### Formulaire de Contact

Le formulaire utilise [Formspree](https://formspree.io) par défaut. 

1. Créer un compte Formspree
2. Créer un nouveau formulaire
3. Remplacer `yourformid` dans `index.html` :

```html
<form action="https://formspree.io/f/VOTRE_ID" method="POST">
```

### Images

Remplacer les placeholders par les vraies images :

| Emplacement | Format Recommandé | Dimensions |
|-------------|-------------------|------------|
| Hero | WebP/JPG | 1920x1080 min |
| Produits | WebP/JPG | 800x600 (ratio 4:3) |
| Chef | WebP/JPG | 800x1000 (ratio 4:5) |
| Logo | SVG | Vectoriel |

## Déploiement

### Netlify

1. Connecter le repo GitHub
2. Build command : *(laisser vide)*
3. Publish directory : `.` ou `/`
4. Les headers de sécurité sont dans `_headers`

### Serveur Apache

1. Uploader tous les fichiers
2. S'assurer que `.htaccess` est actif
3. Activer `mod_rewrite`, `mod_headers`, `mod_deflate`, `mod_expires`

### Serveur Nginx

Ajouter dans la configuration :

```nginx
location / {
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
```

## Fonctionnalités

- ✅ Design responsive (mobile-first)
- ✅ Navigation sticky avec scroll smooth
- ✅ Système d'onglets pour les produits
- ✅ Formulaire avec validation côté client
- ✅ Protection anti-spam (honeypot)
- ✅ Accessibilité (skip link, focus visible, aria-labels)
- ✅ SEO optimisé (meta tags, Schema.org, sitemap)
- ✅ Performance (preload fonts, lazy loading ready)
- ✅ Sécurité (CSP, X-Frame-Options, etc.)

## Navigateurs Supportés

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Accessibilité

Le site vise la conformité WCAG 2.1 niveau AA :

- Contraste des couleurs suffisant
- Navigation au clavier
- Skip link pour accès direct au contenu
- Labels de formulaire explicites
- Support `prefers-reduced-motion`

## Performance

Recommandations pour un score Lighthouse optimal :

1. Compresser les images en WebP
2. Activer la compression GZIP/Brotli
3. Utiliser un CDN pour les assets

## Licence

© 2025 Dar L'Gzzar. Tous droits réservés.

---

**Contact :**  
📞 +212 52 32 92 016  
✉️ contact@darlgzzar.com  
🌐 www.darlgzzar.com
