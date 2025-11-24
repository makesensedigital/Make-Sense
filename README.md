# Make Sense Digital

Guia rapida para instalar, personalizar y publicar el sitio estatico incluido en este repositorio.

## 1. Requisitos
- Navegador moderno (Chrome, Edge, Firefox o Safari).
- Editor de codigo opcional para personalizaciones (VS Code recomendado).
- Servidor estatico local opcional para probar cambios con auto recarga (Live Server, http-server, `python -m http.server`, etc.).

## 2. Estructura del proyecto
```
Make Sense Digital.html   # Unico archivo HTML; contiene todo el markup, CSS in-line y scripts
Logos MK Sense/           # Carpeta con los recursos graficos usados en el sitio
```
Manten estos archivos en la misma carpeta para que las rutas a los logos e iconos funcionen correctamente.

## 3. Instalacion y vista previa local
1. Clona o descarga el repositorio (`Code > Download ZIP`).
2. Ubica el archivo `Make Sense Digital.html` junto con la carpeta `Logos MK Sense` en la misma ruta.
3. **Vista previa rapida**: haz doble clic en `Make Sense Digital.html` para abrirlo en el navegador.
4. **Vista previa con servidor** (opcional pero util para trabajar con rutas relativas y pruebas de analytics):
   - Con VS Code puedes usar la extension *Live Server* y elegir "Open with Live Server" sobre el HTML.
   - Con Python 3: `python -m http.server 8000` y luego visita `http://localhost:8000/Make%20Sense%20Digital.html`.

## 4. Personalizacion basica
- Todo el estilo esta dentro de la etiqueta `<style>` del HTML; puedes migrarlo a un CSS externo si lo prefieres.
- Cambia textos clave (hero, servicios, CTA) directamente en las secciones correspondientes del HTML.
- Reemplaza los archivos dentro de `Logos MK Sense/` manteniendo los mismos nombres para evitar referencias rotas.

## 5. Deploy
Al ser un sitio estatico, puedes publicarlo en cualquier hosting de archivos estaticos:
- GitHub Pages, Netlify, Vercel, Cloudflare Pages o un bucket S3/Static Web Apps.
- Solo asegurate de subir `Make Sense Digital.html` y la carpeta `Logos MK Sense/` preservando la estructura.

## 6. Pruebas finales antes de publicar
- Verifica que los enlaces internos (navegacion, CTA) hagan scroll o apunten correctamente.
- Confirma que las fuentes de Google Fonts y el script de Google Tag Manager carguen segun la configuracion final del dominio.
- Revisa el comportamiento responsive reduciendo el ancho del navegador o usando las herramientas de desarrollador.

Con esto tendras el sitio listo para compartirse o escalarse segun las necesidades de Make Sense Digital.
