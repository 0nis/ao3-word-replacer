import esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { VALID_BROWSERS, VALID_STORAGE } from "./constants.js";

const __dirname = path.resolve();
const outDir = path.resolve(__dirname, "build");
const distDir = path.resolve(__dirname, "dist");
const entry = path.resolve(__dirname, "src/index.js");

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "package.json"), "utf8")
);
const baseFields = {
  name: pkg.displayName || pkg.name,
  version: pkg.version,
  description: pkg.description,
};

function parseArgs() {
  const args = {};
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith("--")) {
      const [key, value] = arg.replace(/^--/, "").split("=");
      args[key] = value ?? true;
    }
  }
  return args;
}

const args = parseArgs();
const browser = args.browser || "all";
const storage = args.storage || "local";

if (!VALID_BROWSERS.includes(browser)) {
  throw new Error(
    `Invalid browser: ${browser}. Valid options are: ${VALID_BROWSERS.join(
      ", "
    )}`
  );
}

if (!VALID_STORAGE.includes(storage)) {
  throw new Error(
    `Invalid storage: ${storage}. Valid options are: ${VALID_STORAGE.join(
      ", "
    )}`
  );
}

function copyFileSync(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

function mergeManifest(templatePath, destPath) {
  const template = JSON.parse(fs.readFileSync(templatePath, "utf8"));
  const merged = {
    ...template,
    ...baseFields,
  };
  merged.manifest_version = template.manifest_version;
  fs.writeFileSync(destPath, JSON.stringify(merged, null, 2));
}

async function buildForBrowser(targetBrowser) {
  console.log(`\nBuilding for ${targetBrowser} (storage=${storage})...`);

  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
  }
  fs.mkdirSync(outDir, { recursive: true });

  await esbuild.build({
    entryPoints: [entry],
    outfile: path.join(outDir, "content.js"),
    bundle: true,
    format: "iife",
    globalName: "AO3WordReplacer",
    sourcemap: true,
    minify: false,
    target: ["es2018"],
    define: {
      __BROWSER__: JSON.stringify(targetBrowser),
      __STORAGE__: JSON.stringify(storage),
    },
  });

  const distPath = path.join(distDir, `${targetBrowser}-${storage}`);

  const manifestSrc = path.resolve(
    __dirname,
    `templates/manifest.${targetBrowser}.json`
  );
  const manifestDest = path.join(distPath, "manifest.json");

  if (!fs.existsSync(manifestSrc))
    throw new Error(
      `Manifest file for ${targetBrowser} not found: ${manifestSrc}`
    );

  if (fs.existsSync(distPath))
    fs.rmSync(distPath, { recursive: true, force: true });
  fs.mkdirSync(distPath, { recursive: true });

  copyFileSync(
    path.join(outDir, "content.js"),
    path.join(distPath, "content.js")
  );
  mergeManifest(manifestSrc, manifestDest);

  console.log(
    `✅ Build complete for ${targetBrowser} (storage=${storage}). Output: ${distPath}`
  );
}

async function buildOnce() {
  if (browser === "all") {
    await buildForBrowser("chrome");
    await buildForBrowser("firefox");
  } else {
    await buildForBrowser(browser);
  }
}

buildOnce().catch((err) => {
  console.error(err);
  process.exit(1);
});
