// セクション定義（導出リスト_熱力学.md の6区分に対応）。
// key は content/<key>/ ディレクトリ名と一致させる。priority は院試での重要度。
export const SECTIONS = [
  { key: 'foundation', n: 0, emoji: '🧱', title: '土台（理想気体・比熱）', note: '最初にこれ。状態方程式・cv/cp・マイヤー・κ', priority: '必須' },
  { key: 'first-law', n: 1, emoji: '🔥', title: '第一法則と準静的変化', note: '★最優先・4〜5/5年。各過程の w・q・ΔU', priority: '★最優先' },
  { key: 'gas-cycle', n: 2, emoji: '⚙️', title: 'ガスサイクル', note: '★必出。カルノー/オットー/ディーゼル/ブレイトン', priority: '★最優先' },
  { key: 'vapor-cycle', n: 3, emoji: '💨', title: '蒸気サイクル', note: '★3/5年。湿り蒸気・ランキン', priority: '★最優先' },
  { key: 'refrigeration', n: 4, emoji: '❄️', title: '冷凍サイクル', note: '★必出。逆カルノー・蒸気圧縮の COP', priority: '★最優先' },
  { key: 'entropy', n: 5, emoji: '📉', title: 'エントロピー・第二法則', note: '4/5年。ΔS 計算・T-s 線図', priority: '優先' },
]

export const SECTION_BY_KEY = Object.fromEntries(SECTIONS.map((s) => [s.key, s]))
