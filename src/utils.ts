import moji from "moji";
import * as fs from "node:fs";

type Config = {
  kana?: boolean;
  symbol?: boolean;
};

const list: string[] = [];

const symbolNormalize = (x: string) => {
  const mojiLine = moji(x);
  return [
    mojiLine.convert("ZE", "HE").toString(),
    mojiLine.convert("HE", "ZE").toString(),
    x.replaceAll("!", "！"),
    x.replaceAll("！", "!"),
    x.replaceAll("!", "").replaceAll("！", ""),
    x.replaceAll("?", "").replaceAll("？", ""),
    x.replaceAll("～", "ー"),
    x.replaceAll("ー", "～"),
    x.replaceAll("～", "").replaceAll("ー", ""),
    x.replaceAll("ー", "").replaceAll("～", ""),
    x.toString().replaceAll("、", ""),
    x.toString().replaceAll("、", ""),
    x.replaceAll(".", "・"),
    x.replaceAll("・", "."),
    x.replaceAll(".", "").replaceAll("・", ""),
    x.replaceAll("！", "!"),
    x.replaceAll("!", "").replaceAll("！", ""),

    x.toString().replaceAll(")", "）").replaceAll("(", "（"),
  ];
};

const kanaNormalize = (x: string) => {
  const mojiLine = moji(x);
  return [
    mojiLine.convert("KK", "HG").toString(),
    mojiLine.convert("HG", "KK").toString(),

    mojiLine.convert("HK", "ZK").toString(),
    mojiLine.convert("ZK", "HK").toString(),

    mojiLine.convert("HG", "KK").convert("ZK", "HK").toString(),
    mojiLine.convert("HG", "KK").convert("ZK", "HK").convert("ZE", "HE").toString(),
    mojiLine.convert("HG", "KK").convert("ZK", "HK").convert("HE", "ZE").toString(),
    mojiLine.convert("HG", "KK").convert("HK", "ZK").toString(),
    mojiLine.convert("HG", "KK").convert("HK", "ZK").convert("ZE", "HE").toString(),
    mojiLine.convert("HG", "KK").convert("HK", "ZK").convert("HE", "ZE").toString(),

    mojiLine.convert("HK", "ZK").convert("KK", "HG").toString(),
  ];
};

export const $ = (text: string | string[], config?: Config) => {
  const base = typeof text === "string" ? [text] : text;
  const kana = config?.kana ?? false;
  const symbol = config?.symbol ?? true;

  const res = base.flatMap((text) => {
    const list = [
      text,
      ...(kana ? kanaNormalize(text.toString()) : []),
      ...(symbol ? symbolNormalize(text.toString()) : []),
      ...(kana && symbol ? kanaNormalize(text.toString()).flatMap((x) => symbolNormalize(x)) : []),
    ];
    return [...new Set(list.map((str) => `!${str}`))];
  });
  list.push(...res);
};
export const white = (text: string | string[]) => {
  const base = typeof text === "string" ? [text] : text;
  const res = base.flatMap((text) => {
    return [text];
  });
  list.push(...res);
};

/**
 * 複数のテキストを組み合わせて返す
 */
export const matrix = (...texts: (string | string[])[]): string[] => {
  if (texts.length === 0) return [];

  const combine = (arr1: string[], arr2: string[]): string[] => {
    return arr1.flatMap((str1) => arr2.map((str2) => str1 + str2));
  };

  const combineAll = (texts: (string | string[])[]): string[] => {
    if (texts.length === 1) {
      return typeof texts[0] === "string" ? [texts[0]] : texts[0];
    }
    const [first, ...rest] = texts;
    const firstArr = typeof first === "string" ? [first] : first;
    return combine(firstArr, combineAll(rest));
  };

  return combineAll(texts);
};

export const output = (file: string) => {
  const data = [...new Set(list)].join("\n");
  fs.writeFileSync(file, data, "utf8");
};
