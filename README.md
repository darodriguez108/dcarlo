# D'Carlo — Jardín y Salón de Eventos

D'Carlo — Sitio oficial: catálogo de espacios, servicios y galería de eventos.

Descripción
-----------
Este repositorio contiene los archivos estáticos del sitio web de D'Carlo (HTML, CSS, JS y assets).

Estructura principal
- `index.html` — entrada principal del sitio
- `css/` — estilos
- `js/` — scripts
- `assets/` — imágenes y recursos

Despliegue (GitHub Pages)
--------------------------------
Recomiendo servir desde GitHub Pages (branch `main`, folder `/root`). To enable Pages:

1. Open the repository on GitHub: https://github.com/darodriguez108/dcarlo
2. Go to Settings → Pages
3. Under "Build and deployment" choose "Source" → Branch: `main` and Folder: `/ (root)`
4. Save. The site will be published to `https://darodriguez108.github.io/dcarlo/` shortly.

If you'd like, I can enable GitHub Pages for you via the API — I will need a short-lived Personal Access Token with `repo` scope.

Quick local preview
-------------------
If you want to preview the site locally without extra tools, use Python's simple HTTP server:

```powershell
# from project root
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Or use VSCode Live Server or any static-file server.

Notes
-----
- Remember to revoke any PATs you shared in chat (https://github.com/settings/tokens).
- If you want a README translated to Spanish or expanded (credits, license, contact), tell me and I'll update it.

---
_Committed and pushed to the `main` branch._
