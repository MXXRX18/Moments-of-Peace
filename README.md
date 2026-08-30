# Moments of Peace — sitio web

Landing page responsive creada con HTML, CSS y JavaScript puro.

## Estructura

```text
moments-of-peace-web/
├─ index.html
├─ 404.html
├─ styles.css
├─ script.js
├─ README.md
└─ img/
   ├─ logo.svg
   ├─ whatsapp.svg
   ├─ facebook.svg
   ├─ phone.svg
   └─ location.svg
```

## Abrir en Visual Studio Code

1. Abre Visual Studio Code.
2. Ve a **File > Open Folder** y selecciona `moments-of-peace-web`.
3. Abre `index.html`.
4. Recomendado: instala la extensión **Live Server** y usa **Open with Live Server**.

También puedes abrirlo sin extensiones ejecutando desde la terminal:

```bash
python -m http.server 5500
```

Luego abre `http://localhost:5500`.

## Configurar Git y GitHub

Desde la terminal integrada de VS Code, dentro de esta carpeta:

```bash
git init
git add .
git commit -m "Primera version del sitio Moments of Peace"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/moments-of-peace.git
git push -u origin main
```

> Antes del `push`, crea en GitHub un repositorio vacío llamado `moments-of-peace` y sustituye `TU_USUARIO` por tu usuario real.

## Publicar con GitHub Pages

Después del `push`:

1. En GitHub entra al repositorio.
2. Ve a **Settings > Pages**.
3. En **Build and deployment**, selecciona **Deploy from a branch**.
4. Selecciona `main` y la carpeta `/ (root)`.
5. Guarda los cambios.

## Datos configurados

- WhatsApp: 999 392 5467
- Teléfono: 999 392 5467
- Facebook: página oficial proporcionada
- Ubicación: temporalmente dirige a `404.html`
- Precarga skeleton: ~1.35 segundos
