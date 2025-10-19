INSTRUCCIONES

Archivos incluidos:
- index.html
- style.css
- script.js (configurado con tu usuario y repo)
- imagenes/ (tus imágenes subidas)

Cómo usar (Online - GitHub Pages):
1. Descomprime este ZIP.
2. Sube la carpeta descomprimida al repositorio: ANGIEFINOESTETICA/betabasedatosconsejojuventudes2025
   (puedes subirla desde la interfaz de GitHub o con git).
3. Activa GitHub Pages: Settings -> Pages -> Deploy from branch -> main / root -> Save
4. Abre la URL de GitHub Pages (https://ANGIEFINOESTETICA.github.io/betabasedatosconsejojuventudes2025/)
5. Desde la página puedes subir imágenes nuevas o usar las que ya están.
6. Al pulsar "Procesar imágenes" se generará y descargará el archivo registro_votacion_meta.xlsx
   con una columna "Archivo" que contiene enlaces directos a las imágenes en GitHub.

Notas:
- Por defecto la página carga Tesseract.js and SheetJS desde CDN (recomendado for GitHub Pages).
- Si quieres modo offline, descarga tesseract.min.js y xlsx.full.min.js en /libs/ y descomenta las líneas correspondientes in index.html.
- Las URLs en Excel usan encodeURIComponent para los nombres de archivo.
