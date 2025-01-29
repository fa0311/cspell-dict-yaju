# cspell-dict-yaju

このリポジトリでは、うっかり深刻な下ネタを利用してしまうことを防ぐための辞書を提供します。
かなり厳しめに設定されており、偽陽性が多いかもしれません。その場合は、`words`に追加してください。

<https://news.nicovideo.jp/watch/nw17103083>

## 使い方

1. `npm install -D cspell-dict-yaju` を実行
1. `cspell.json` に以下のように書く

```json
{
  "files": ["**/*.{md,txt}"],
  "dictionaries": ["yaju"],
  "import": ["cspell-dict-yaju/cspell-ext.json"]
}
```
