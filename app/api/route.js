import { NextResponse } from "next/server";
const fs = require("fs-extra");
const uuid = require("uuid");
const path = require("path");
const archiver = require("archiver");

// export async function GET() {
//   const templates = {
//     header: "HeaderOne",
//     hero: "HeroSectionTwo",
//     footer: "FooterTwo",
//   };

//   return NextResponse.json(templates);
// }

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
    const placeholder = new RegExp(`\\{{${key}\\}}`, "g");
    templateContent = templateContent.replace(placeholder, data[key]);
  });

  return templateContent;
}

function covnertPlaceholderData(data) {
  const outputObject = {};
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      outputObject[key] = data[key].value;
    }
  }
  return outputObject;
}

export async function POST(request) {
  const folderAddresses = [];
  const json = "./app/api/data.json";
  let jsonData = fs.readFileSync(json, "utf8");
  jsonData = JSON.parse(jsonData);
  const userData = await request.json();
  const templateFolderPath = path.resolve("./templates");

  jsonData.templates.forEach((template) => {
    // Create a unique identifier for the temporary working folder
    const copyFolderPath = `${templateFolderPath}/${template.name}`;
    const tempFolderName = `temp-working-${uuid.v4()}`;
    const tempFolderPath = `./temp-Templates/${tempFolderName}`;
    folderAddresses.push(tempFolderName);

    // Copy the template files to the temporary working folder
    fs.copySync(copyFolderPath, tempFolderPath);

    const cssTemplate = `${tempFolderPath}/css/global.css`;

    let cssContent = fs.readFileSync(cssTemplate, "utf-8");

    // // Update the CSS content
    cssContent = cssContent.replace(
      ".primary {",
      `.primary {\n  color: ${userData.primaryColor} !important;`
    );

    cssContent = cssContent.replace(
      ".primary-btn {",
      `.primary-btn {\n  background-color: ${userData.primaryColor} !important;`
    );

    cssContent = cssContent.replace(
      ".secondary {",
      `.secondary {\n  color: ${userData.secondaryColor} !important;`
    );

    cssContent = cssContent.replace(
      ".secondary-btn {",
      `.secondary-btn {\n  background-color: ${userData.secondaryColor} !important;`
    );

    if(!userData?.hasCustomFont){
      cssContent = cssContent.replace(
        "* {",
        `* {\n font-family: '${userData.fontInput}', sans-serif !important;\n`
      );
    }

    console.log("hasCustomFont:", userData.hasCustomFont);

    if(userData?.hasCustomFont){
      cssContent = cssContent.replace(
        "@font-face {",
        `@font-face {\n font-family: "${userData.customFontName}" !important;\n
        src: url('https://github.com/ZaryabAIO/custom-font/blob/main/fonts/Tomatoes-font.ttf');`
      )

      //Inject the custom font name 
      cssContent = cssContent.replace(
        "* {",
        `* {\n font-family: '${userData.customFontName}' !important;\n`
      );
    }

    fs.writeFileSync(cssTemplate, cssContent);

    try {
      template?.pages?.forEach((value) => {
        const templatePath = `${tempFolderPath}/${value.name}`;
        let templateContent = fs.readFileSync(templatePath, "utf-8");

        templateContent = parseTemplate(templateContent, userData);

        // // Write the modified content back to the HTML file
        fs.writeFileSync(templatePath, templateContent, "utf-8");
        console.log('TEMPLATE UPDATED ----> ', value.name);
        // fs.writeFileSync(cssPath, cssContent, "utf-8");

        // await zipDirectory(tempFolderPath, "./sample.zip");
      });

    } catch (error) {
      return NextResponse.json({ status: "failed" });
    }
  });
  return NextResponse.json({ status: "success", data:folderAddresses });
}

export async function GET() {
  const jsonData = "./app/api/data.json";
  const data = fs.readFileSync(jsonData, "utf8");
  return NextResponse.json({ data });
}
