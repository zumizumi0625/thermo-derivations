# 導出ページの書き方（執筆ガイド）

このサイトは「熱力学の各公式を、出発点から**めちゃくちゃ丁寧に・図つきで**導出する」個別ページの集合。
1導出 = 1 markdown ファイル。新規ページを足すときは下記フォーマットに従う。

## ファイル配置

- 本文: `src/content/<section>/<id>.md`
  - `<section>` は `foundation / first-law / gas-cycle / vapor-cycle / refrigeration / entropy` のいずれか
  - `<id>` は英小文字・ハイフン（例: `otto`, `rankine`, `ideal-gas-entropy`）。`導出リスト_熱力学.md` の対応表の id に合わせる
- 図: `src/figures/figs-<section>.jsx`（セクションごとに1ファイルにまとめる）

## フロントマター（md 冒頭）

```markdown
---
id: otto
section: gas-cycle
order: 2
title: オットーサイクルの効率
formula: η = 1 − ε^−(κ−1)
issue: 465
year: 2026
prereq: [first-law-closed, adiabatic-polytropic]
---
```

- `order`: セクション内の表示順（1始まり）
- `formula`: 一覧/ヘッダに出す結論式（プレーンテキスト。ρ,√,²,∂ 等の記号はそのまま）
- `issue`: SELF_MANAGEMENT の対応 Issue 番号（なければ空でよい）
- `year`: 過去問の出題年（あれば。なければ省略可）
- `prereq`: 前提となる他ページの id（任意。配列）

## 本文フォーマット（土台セクションが手本）

`src/content/foundation/ideal-gas.md` を必ず手本にすること。型は:

1. `# タイトル`（H1, 1つだけ）
2. `> **ゴール**:` 引用で「このページで再現できるようになること」を1〜2文
3. `## 物理状況` — 直感的な説明＋図マーカー `@@FIG:図id@@`
4. `## 設定` — 記号・前提の定義
5. `## ステップ1 / ステップ2 …` — **1ステップ1式**で、式変形の根拠（どの法則・どの近似）を必ず日本語で添える。途中式を飛ばさない
6. `## 結論` — 最終式を `$$ \boxed{ … } $$` で囲む
7. 末尾に `> **ポイント**:` 引用で、試験で詰まりやすい所・記憶のフックを1〜2文

## 数式

- ブロック式は `$$ … $$`（独立行）。インライン は `$ … $`
- 式番号が要るときは `\tag{1}`、要所は `\boxed{ }`
- KaTeX で組めるコマンドのみ使用（`align`, `aligned`, `cases`, `boxed`, `underbrace` などは可）

## 図（SVG）

- `@@FIG:図id@@` を本文に置くと、その位置に `figs-<section>.jsx` の対応コンポーネントが描画される
- `figs-<section>.jsx` は `export default { '図id': Component, ... }` の形でまとめてエクスポート
- 各図は `import { Caption } from './index.jsx'` を使い、`<figure className="figure"><svg viewBox=...>…</svg><Caption>…</Caption></figure>` の構造
- light テーマ前提。色は明示（主線 #2563eb 系 / 補助 #475569 / 強調 #b91c1c 等）。`viewBox` を使い `width:100%` で伸縮
- 図は「式のどの量が図のどこか」を示す具体図にする（座標・記号・矢印つき）。飾りでなく理解の補助

## 図キャプション（`<Caption>…</Caption>`）の罠 — 重要

`Caption` は `<figcaption>{children}</figcaption>` で**そのまま描画する（KaTeX 処理しない）**。
だから **キャプションに `$…$` や LaTeX を書いてはいけない**。特に `\mathrm{K}` や `\frac{a}{b}` の
**波カッコ `{…}` は JSX 式として評価され `K is not defined` 等で画面全体が落ちる**（2026-06-24 に踏んだ）。

- ✕ `<Caption>定圧で $1\,\mathrm{K}$ 上げると $p\,dv=R\,dT$</Caption>`
- ◯ `<Caption>定圧で 1 K 上げると <b>p·dv = R·dT</b> の仕事をする</Caption>`

キャプションは**プレーンな Unicode テキスト**で書く（`²³ ½ ∂ ∇ √ ρ μ κ ΔT cₚ cᵥ` 等）。強調は `<b>…</b>`。
数式をちゃんと組みたい場合は本文 md 側（`$$…$$` / `$…$`）に置く。md 本文は KaTeX が効くので LaTeX で OK。

## やってはいけないこと

- npm / build / git / commit / push は実行しない（ファイルを作るだけ）
- 既存の `foundation/` や `figs-foundation.jsx`、`App.jsx` 等の共通ファイルは編集しない
- 自分の担当セクションのディレクトリと `figs-<自セクション>.jsx` だけを作る
