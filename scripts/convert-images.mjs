import sharp from "sharp";
import { glob } from "glob";
import path from "path";
import fs from "fs";

const images = await glob("src/**/*.+(png|jpg|jpeg)");

console.log(`Найдено ${images.length} изображений. Конвертируем...`);

for (const file of images) {
  const ext = path.extname(file);
  const newFile = file.replace(ext, ".webp");

  if (fs.existsSync(newFile)) continue;

  await sharp(file).webp({ quality: 100 }).toFile(newFile);

  console.log(`✅ ${file} -> ${newFile}`);

  // Опционально: удалить оригинал
  // fs.unlinkSync(file);
}

console.log("Готово! Теперь замени в HTML .webp/.webp на .webp");
