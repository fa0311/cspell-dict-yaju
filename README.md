# cspell-dict-yaju

このリポジトリでは、うっかり深刻な下ネタを利用してしまうことを防ぐための、cspell 用の辞書を提供します。
文脈によっては下ネタではない単語も含まれており、偽陽性が多いかもしれません。その場合は、`words`に追加してください。

また、この辞書では一般的な下ネタは含まれておらず、"深刻な下ネタ" のみを含んでいます。

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
