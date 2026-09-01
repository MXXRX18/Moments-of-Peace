# Moments of Peace — sitio web

Landing page responsive creada con HTML, CSS y JavaScript puro.

## Estructura principal

```text
moments-of-peace-web/
├─ index.html
├─ 404.html
├─ styles.css
├─ carousel.css
├─ script.js
├─ carousel.js
├─ carrusel-preview.html
├─ README.md
└─ img/
   ├─ logo.svg
   ├─ whatsapp.svg
   ├─ facebook.svg
   ├─ phone.svg
   ├─ location.svg
   ├─ masaje-terapeutico-01.jpg
   ├─ masaje-terapeutico-02.jpg
   └─ masaje-terapeutico-03.jpg
```

## Carrusel fotográfico

El carrusel está preparado para fotografías verticales y también tolera fotografías con otras proporciones sin deformarlas.

La regla principal es:

```css
object-fit: contain;
```

Esto hace que la fotografía completa permanezca visible. El espacio sobrante del marco se rellena visualmente con una versión desenfocada de la misma imagen, sin modificar el archivo original ni estirar sus píxeles.

El carrusel incluye:

- Flechas en computadora.
- Swipe/deslizamiento en celular y tablet.
- Teclas izquierda/derecha en computadora.
- Autoplay suave.
- Indicadores y contador.
- Miniaturas.
- Respeto a `prefers-reduced-motion`.
- Tres fotografías reales almacenadas directamente en `img/`.

## Vista previa en Visual Studio Code

Abre la carpeta del proyecto en Visual Studio Code y ejecuta `index.html` con **Live Server**.

Para revisar únicamente el carrusel puedes abrir:

```text
carrusel-preview.html
```

También puedes levantar un servidor local desde la terminal:

```bash
python -m http.server 5500
```

Luego visita `http://localhost:5500`.

## Actualizar el repositorio de GitHub existente

Como el sitio ya está publicado, no necesitas volver a ejecutar `git init` ni volver a configurar `origin`.

Después de reemplazar los archivos del proyecto por esta versión:

```bash
git status
git add .
git commit -m "Implementar carrusel fotografico responsive"
git push origin main
```

Si GitHub Pages está configurado desde la rama `main`, el sitio se actualizará automáticamente después del push.

## Datos configurados

- WhatsApp: 999 392 5467
- Teléfono: 999 392 5467
- Facebook: página oficial proporcionada
- Ubicación: temporalmente dirige a `404.html`
- Precarga skeleton: ~1.35 segundos
