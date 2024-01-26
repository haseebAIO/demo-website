import { NextResponse } from "next/server";
const fs = require("fs-extra");
const uuid = require("uuid");
const path = require("path");
const archiver = require("archiver");

export async function GET() {
  const templates = {
    header: "HeaderOne",
    hero: "HeroSectionTwo",
    footer: "FooterTwo",
  };

  return NextResponse.json(templates);
}

function zipDirectory(sourceDir, outPath) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

function parseTemplate(templateContent, data) {
  Object.keys(data).forEach((key) => {
    const placeholder = new RegExp(`\\{${key}\\}`, "g");
    templateContent = templateContent.replace(placeholder, data[key]);
  });

  return templateContent;
}

export async function POST(request) {
  const userData = await request.json();
  const templateFolderPath = path.resolve("./app/api/static-templates");

  // Create a unique identifier for the temporary working folder
  const tempFolderName = `temp-working-${uuid.v4()}`;
  const tempFolderPath = `./temp-folders/${tempFolderName}`;

  // Copy the template files to the temporary working folder
  fs.copySync(templateFolderPath, tempFolderPath);

  // Read the HTML template content
  const templateFilePath = `${tempFolderPath}/index.html`;
  const cssPath = `${tempFolderPath}/css/custom.css`;
  let templateContent = fs.readFileSync(templateFilePath, "utf-8");
  let cssContent = fs.readFileSync(cssPath, "utf-8");

  templateContent = parseTemplate(templateContent, userData);

  // Update the CSS content
  cssContent = cssContent.replace(
    "* {",
    `* {\n  color: ${userData.fontColor} !important;`
  );

  // Write the modified content back to the HTML file
  fs.writeFileSync(templateFilePath, templateContent, "utf-8");
  fs.writeFileSync(cssPath, cssContent, "utf-8");

  await zipDirectory(tempFolderPath, "./sample.zip");

  return NextResponse.json({ status: "success" });
}
