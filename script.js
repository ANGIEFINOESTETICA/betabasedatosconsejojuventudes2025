// === Certificados de Votación a Excel ===
// Configurado para GitHub user/repo: ANGIEFINOESTETICA / betabasedatosconsejojuventudes2025

const fileInput = document.getElementById("fileInput");
const processBtn = document.getElementById("processBtn");
const progress = document.getElementById("progress");
const result = document.getElementById("result");

// Cambia solo si tu repositorio o carpeta difieren
const rutaBase = "https://raw.githubusercontent.com/ANGIEFINOESTETICA/betabasedatosconsejojuventudes2025/main/imagenes/";

// OCR mejorado con español y configuración avanzada
async function extractText(file) {
  progress.innerText = `Leyendo ${file.name}...`;
  const { data: { text } } = await Tesseract.recognize(file, "spa", {
    langPath: "https://tessdata.projectnaptha.com/4.0.0_best/",
    tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÓÚÑabcdefghijklmnñopqrstuvwxyzáéíóú0123456789 .,:-/",
    psm: 6,
    logger: m => {
      if (m.status === "recognizing text") {
        progress.innerText = `${file.name}: ${Math.round(m.progress * 100)}%`;
      }
    },
  });
  return text.replace(/\s{2,}/g, " ");
}

// Extracción flexible de datos desde el texto
function parseData(text) {
  const data = {};
  const find = (regex) => (text.match(regex) || [])[1] || "";

  data["Número de Cédula"] = find(/\b(\d[\d.\s]{5,})\b/);

  let nombre = find(/Nombres?\s*y?\s*apellidos?:?\s*([A-ZÁÉÍÓÚÑa-záéíóúñ\s]+)/);
  if (!nombre) {
    const posibleNombre = text.match(/[A-ZÁÉÍÓÚÑ]{3,}\s+[A-ZÁÉÍÓÚÑ]{3,}(\s+[A-ZÁÉÍÓÚÑ]{3,})?/);
    nombre = posibleNombre ? posibleNombre[0] : "";
  }
  data["Nombre y Apellidos"] = nombre.trim();

  data["Departamento"] = "META";
  data["Municipio"] = "VILLAVICENCIO";
  data["Puesto"] = find(/Puesto\s*:?([A-Za-z0-9\s\-\.]+)/i);
  data["Mesa"] = find(/Mesa\s*:?(\d+)/i);
  data["Fecha"] = find(/(\d{1,2}\s+de\s+[A-Za-zÁÉÍÓÚñ]+\s+de\s+\d{4})/i);

  return data;
}

// Proceso principal
async function processImages() {
  const files = Array.from(fileInput.files);
  if (!files.length) {
    alert("Por favor selecciona al menos una imagen.");
    return;
  }

  processBtn.disabled = true;
  progress.innerText = `Procesando ${files.length} imágenes...`;

  const rows = [];
  for (const file of files) {
    const text = await extractText(file);
    const info = parseData(text);
    const link = `=HYPERLINK("${rutaBase}${encodeURIComponent(file.name)}", "${file.name}")`;
    info["Archivo"] = link;
    rows.push(info);
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows);
  XLSX.utils.book_append_sheet(wb, ws, "Certificados");
  XLSX.writeFile(wb, "registro_votacion_meta.xlsx");

  progress.innerText = "✅ ¡Excel generado correctamente!";
  result.innerHTML = `<p>Descarga completada: <strong>registro_votacion_meta.xlsx</strong></p>`;

  processBtn.disabled = false;
}

processBtn.addEventListener("click", processImages);
