import fs from "fs";
import path from "path";
import url from "url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

function findTestFiles(dir: string): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...findTestFiles(fullPath));
    } else if (entry.isFile() && /\.test\.ts$/.test(entry.name)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function runAllTests() {
  const testDir = path.join(__dirname, "..");
  const testFiles = findTestFiles(testDir);

  if (testFiles.length === 0) {
    console.log("No test files found.");
    return;
  }

  console.log(`Found ${testFiles.length} test file(s).`);

  for (const file of testFiles) {
    const relative = path.relative(__dirname, file);
    const line = "─".repeat(relative.length + 15);
    console.log("\n" + "┌" + line + "┐");
    console.log(`│  🧪 Running ${relative}  │`);
    console.log("└" + line + "┘");

    try {
      await import(url.pathToFileURL(file).href);
    } catch (err) {
      console.error(`❌ Failed to import ${file}`);
      console.error(err);
    }
  }

  console.log("\n✅ All test files executed.");
}

runAllTests();
