import { existsSync, mkdirSync, copyFile } from "fs";
import { join, basename } from "path";

async function saveToLocal(filePath) {
    return new Promise((resolve, reject) => {
        const uploadsDir = "src/uploads/processed/";
        console.log(filePath,"fileeePath")
        
        // ✅ Ensure the directory exists
        if (!existsSync(uploadsDir)) {
            mkdirSync(uploadsDir, { recursive: true });
        }

        // ✅ Ensure source file exists before copying
        if (!existsSync(filePath)) {
            return reject(new Error(`Source file not found: ${filePath}`));
        }

        const fileName = basename(filePath);
        const newFilePath = join(uploadsDir, fileName);
        console.log(newFilePath,fileName,"fileeeeee")

        // ✅ Copy the file to processed folder
        copyFile(filePath, newFilePath, (err) => {
            if (err) reject(err);
            else resolve(newFilePath); // Return the saved file path
        });
    });
}

export default saveToLocal;
