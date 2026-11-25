#!/usr/bin/env node
/**
 * Motion Designers Studio — Agency CLI (Dual-Mode: Multi-Brand & Single-Brand Export)
 * Cero dependencias externas. Compatible con Node.js >= 20.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

const CONFIG_PATH = path.join(ROOT_DIR, "agency.config.json");
const TEMPLATE_DIR = path.join(ROOT_DIR, "marcas", "_template");

const EXCLUDED_DIR_NAMES = new Set([
  "node_modules",
  ".git",
  "scratch",
  "dist",
  "out",
  "output",
  ".hyperframes",
  ".cache",
]);

function printUsage() {
  console.log(`
Motion Designers Studio — Agency CLI

Comandos disponibles:
  node scripts/agency-cli.mjs new-brand <slug> [--name "Nombre Comercial"]
      Crea una nueva marca en marcas/<slug>/ a partir de marcas/_template/.

  node scripts/agency-cli.mjs switch-single-brand <slug>
      Activa el modo Single-Brand en este repo copiando marcas/<slug>/ hacia brand/
      y actualizando agency.config.json.

  node scripts/agency-cli.mjs switch-multi-brand
      Vuelve a activar el modo Multi-Marca en agency.config.json (conserva marcas/).

  node scripts/agency-cli.mjs export-brand-repo <slug> <ruta-destino>
      Exporta una copia limpia y portable de toda la agencia exclusiva para <slug>,
      con brand/ en la raíz y modo "single-brand" (sin node_modules ni otros clientes).

  node scripts/agency-cli.mjs status
      Muestra el modo actual y las marcas registradas.
`);
}

function readConfig() {
  if (!fs.existsSync(CONFIG_PATH)) {
    return {
      agencyName: "Motion Designers Studio",
      mode: "multi-brand",
      singleBrandDir: "brand",
      multiBrandDir: "marcas",
      engines: ["remotion", "hyperframe", "motion-canvas"],
      inspirationSourcesFile: "fuentes_inspiracion.md",
      antiRepetitionWindow: 3,
    };
  }
  return JSON.parse(fs.readFileSync(CONFIG_PATH, "utf8"));
}

function writeConfig(config, targetPath = CONFIG_PATH) {
  fs.writeFileSync(targetPath, JSON.stringify(config, null, 2) + "\n", "utf8");
}

function validateSlug(slug) {
  if (!slug || !/^[a-z0-9][a-z0-9-_]*$/.test(slug) || slug === "_template") {
    console.error(
      `❌ Slug inválido: "${slug}". Usa solo minúsculas, números, guiones o guion bajo (ej. "acme-corp").`
    );
    process.exit(1);
  }
}

function toDisplayName(slug) {
  return slug
    .split(/[-_]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function copyDirFiltered(src, dest, { excludeDirs = EXCLUDED_DIR_NAMES } = {}) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith("_tmp_")) continue;
    if (entry.isDirectory() && excludeDirs.has(entry.name)) continue;

    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirFiltered(srcPath, destPath, { excludeDirs });
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function replacePlaceholdersInFile(filePath, replacements) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, "utf8");
  for (const [key, value] of Object.entries(replacements)) {
    content = content.replaceAll(key, value);
  }
  fs.writeFileSync(filePath, content, "utf8");
}

function cmdNewBrand(args) {
  const slug = args[0];
  validateSlug(slug);

  let brandName = toDisplayName(slug);
  const nameIdx = args.indexOf("--name");
  if (nameIdx !== -1 && args[nameIdx + 1]) {
    brandName = args[nameIdx + 1];
  }

  if (!fs.existsSync(TEMPLATE_DIR)) {
    console.error(`❌ No se encontró la plantilla en: ${TEMPLATE_DIR}`);
    process.exit(1);
  }

  const brandDir = path.join(ROOT_DIR, "marcas", slug);
  if (fs.existsSync(brandDir)) {
    console.error(`❌ La marca "${slug}" ya existe en: ${brandDir}`);
    process.exit(1);
  }

  copyDirFiltered(TEMPLATE_DIR, brandDir);
  const replacements = {
    "{{BRAND_NAME}}": brandName,
    "{{BRAND_SLUG}}": slug,
  };
  replacePlaceholdersInFile(path.join(brandDir, "brand.md"), replacements);
  replacePlaceholdersInFile(
    path.join(brandDir, "historial_estilos.md"),
    replacements
  );

  console.log(`✅ Marca creada exitosamente:`);
  console.log(`   • Nombre: ${brandName}`);
  console.log(`   • Carpeta: marcas/${slug}/`);
  console.log(`   • Edita marcas/${slug}/brand.md con los colores HEX, tipografías y activos.`);
}

function cmdSwitchSingleBrand(args) {
  const slug = args[0];
  validateSlug(slug);

  const srcBrandDir = path.join(ROOT_DIR, "marcas", slug);
  if (!fs.existsSync(path.join(srcBrandDir, "brand.md"))) {
    console.error(`❌ No existe marcas/${slug}/brand.md. Crea la marca primero con new-brand.`);
    process.exit(1);
  }

  const destBrandDir = path.join(ROOT_DIR, "brand");
  if (fs.existsSync(destBrandDir)) {
    fs.rmSync(destBrandDir, { recursive: true, force: true });
  }
  copyDirFiltered(srcBrandDir, destBrandDir);

  const config = readConfig();
  config.mode = "single-brand";
  config.activeBrandSlug = slug;
  writeConfig(config);

  console.log(`✅ Modo Single-Brand activado para "${slug}".`);
  console.log(`   • Ficha activa en: brand/brand.md`);
  console.log(`   • Para volver al modo multi-marca: node scripts/agency-cli.mjs switch-multi-brand`);
}

function cmdSwitchMultiBrand() {
  const config = readConfig();
  config.mode = "multi-brand";
  delete config.activeBrandSlug;
  writeConfig(config);
  console.log(`✅ Modo Multi-Marca activado en agency.config.json.`);
}

function cmdExportBrandRepo(args) {
  const slug = args[0];
  const rawTarget = args[1];
  validateSlug(slug);

  if (!rawTarget) {
    console.error("❌ Debes especificar la ruta de destino: export-brand-repo <slug> <ruta-destino>");
    process.exit(1);
  }

  const srcBrandDir = path.join(ROOT_DIR, "marcas", slug);
  if (!fs.existsSync(path.join(srcBrandDir, "brand.md"))) {
    console.error(`❌ No existe marcas/${slug}/brand.md.`);
    process.exit(1);
  }

  const targetDir = path.resolve(process.cwd(), rawTarget);
  if (fs.existsSync(targetDir)) {
    const existing = fs.readdirSync(targetDir);
    if (existing.length > 0) {
      console.error(`❌ El directorio destino ya existe y no está vacío: ${targetDir}`);
      process.exit(1);
    }
  }
  fs.mkdirSync(targetDir, { recursive: true });

  const rootFilesToCopy = [
    "AGENTS.md",
    "README.md",
    "fuentes_inspiracion.md",
    ".gitignore",
  ];
  for (const file of rootFilesToCopy) {
    const srcFile = path.join(ROOT_DIR, file);
    if (fs.existsSync(srcFile)) {
      fs.copyFileSync(srcFile, path.join(targetDir, file));
    }
  }

  const dirsToCopy = [
    ".agents",
    "biblioteca_prompts",
    "scripts",
    "remotion",
    "hyperframe",
    "motion-canvas",
  ];
  for (const dir of dirsToCopy) {
    copyDirFiltered(path.join(ROOT_DIR, dir), path.join(targetDir, dir));
  }

  // Incluir plantilla limpia de marcas y copiar la marca seleccionada como brand/
  copyDirFiltered(
    TEMPLATE_DIR,
    path.join(targetDir, "marcas", "_template")
  );
  copyDirFiltered(srcBrandDir, path.join(targetDir, "brand"));

  // Carpetas vacías para entregables finales
  const vertDir = path.join(targetDir, "videos_completados", "verticales");
  const horizDir = path.join(targetDir, "videos_completados", "horizontales");
  fs.mkdirSync(vertDir, { recursive: true });
  fs.mkdirSync(horizDir, { recursive: true });
  fs.writeFileSync(path.join(vertDir, ".gitkeep"), "", "utf8");
  fs.writeFileSync(path.join(horizDir, ".gitkeep"), "", "utf8");

  const config = readConfig();
  config.mode = "single-brand";
  config.exportedFrom = slug;
  writeConfig(config, path.join(targetDir, "agency.config.json"));

  console.log(`✅ Repositorio portable de la agencia exportado para "${slug}":`);
  console.log(`   • Destino: ${targetDir}`);
  console.log(`   • Modo configurado: single-brand (brand/brand.md)`);
  console.log(`   • Siguiente paso: instala dependencias en los motores que uses (ej. cd remotion && npm install)`);
}

function cmdStatus() {
  const config = readConfig();
  const hasSingleBrand = fs.existsSync(path.join(ROOT_DIR, "brand", "brand.md"));
  const marcasDir = path.join(ROOT_DIR, "marcas");
  const brands = fs.existsSync(marcasDir)
    ? fs
        .readdirSync(marcasDir, { withFileTypes: true })
        .filter((d) => d.isDirectory() && d.name !== "_template")
        .map((d) => d.name)
    : [];

  console.log(`🎬 ${config.agencyName}`);
  console.log(`   • Modo configurado: ${config.mode}`);
  console.log(`   • brand/brand.md presente: ${hasSingleBrand ? "Sí" : "No"}`);
  console.log(`   • Marcas en marcas/: ${brands.length ? brands.join(", ") : "(ninguna aún)"}`);
  console.log(`   • Motores: ${(config.engines || []).join(", ")}`);
  console.log(`   • Ventana anti-repetición: ${config.antiRepetitionWindow} videos`);
}

const [, , command, ...rest] = process.argv;

switch (command) {
  case "new-brand":
    cmdNewBrand(rest);
    break;
  case "switch-single-brand":
    cmdSwitchSingleBrand(rest);
    break;
  case "switch-multi-brand":
    cmdSwitchMultiBrand();
    break;
  case "export-brand-repo":
    cmdExportBrandRepo(rest);
    break;
  case "status":
    cmdStatus();
    break;
  default:
    printUsage();
    process.exit(command ? 1 : 0);
}
