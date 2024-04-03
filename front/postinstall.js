import { fileURLToPath } from "url";
import { dirname } from "path";
import fse from "fs-extra";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// async function copyTinyMCE() {
//   try {
//     // Clear the destination directory
//     await fse.emptyDir(path.join(__dirname, "public", "tinymce"));

//     // Copy TinyMCE from node_modules to the public directory
//     await fse.copy(path.join(__dirname, "node_modules", "tinymce"), path.join(__dirname, "public", "tinymce"), { overwrite: true });

//     console.log("TinyMCE copied successfully.");
//   } catch (error) {
//     console.error("Error copying TinyMCE:", error);
//   }
// }

// // Call the function to copy TinyMCE
// copyTinyMCE();
