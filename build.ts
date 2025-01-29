import moji from "moji";
import * as fs from "node:fs";
import * as path from "node:path";

const outputDir = "dist";

const files = fs.readdirSync(".").filter((file) => file.endsWith(".txt"));

for (const file of files) {
  const data = fs.readFileSync(file, "utf8");

  const convertedData = data
    .split("\n")
    .flatMap((line) => {
      if (line.startsWith("#")) return line;
      const prefix = line.startsWith("!");
      const mojiLine = moji(prefix ? line.slice(1) : line);
      const list = [
        mojiLine.toString(),
        mojiLine.toString().replaceAll("!", "").replaceAll("！", ""),
        mojiLine.toString().replaceAll("?", "").replaceAll("？", ""),
        mojiLine.toString().replaceAll("ー", ""),
        mojiLine.toString().replaceAll("ー", "～"),
        mojiLine.toString().replaceAll("、", ""),
        mojiLine.toString().replaceAll(")", "）").replaceAll("(", "（"),
      ];
      if (list.every((str) => !str.match(/\p{sc=Han}/u))) {
        list.push(
          mojiLine.convert("ZE", "HE").toString(),
          mojiLine.convert("HE", "ZE").toString(),
          mojiLine.convert("KK", "HG").toString(),
          mojiLine.convert("HG", "KK").toString(),
          mojiLine.convert("HG", "KK").convert("ZK", "HK").toString(),
          mojiLine.convert("HG", "KK").convert("ZK", "HK").toString(),
          mojiLine.convert("HG", "KK").convert("ZK", "HK").convert("ZE", "HE").toString(),
          mojiLine.convert("HG", "KK").convert("ZK", "HK").convert("HE", "ZE").toString()
        );
      }

      return [...new Set(list.map((str) => `${prefix ? "!" : ""}${str}`))];
    })
    .join("\n");

  const outputFilePath = path.join(outputDir, file);
  fs.writeFileSync(outputFilePath, convertedData, "utf8");
}
