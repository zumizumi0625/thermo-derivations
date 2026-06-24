// すべての導出ページを content/**/*.md から自動ロードする。
// 新しい導出を足すときは md ファイルを置くだけ（中央の一覧編集は不要）。
import { SECTION_BY_KEY } from './sections.js'

// 簡易 YAML フロントマターパーサ（gray-matter を入れずに済ませる軽量版）。
// 対応: key: value / key: [a, b, c] / key: 数値・文字列。
function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (!m) return { data: {}, body: raw }
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const mm = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (!mm) continue
    let v = mm[2].trim()
    if (/^\[.*\]$/.test(v)) {
      v = v
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else {
      v = v.replace(/^["']|["']$/g, '')
    }
    data[mm[1]] = v
  }
  return { data, body: m[2] }
}

const modules = import.meta.glob('./content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const pages = []
for (const [path, raw] of Object.entries(modules)) {
  const { data, body } = parseFrontmatter(raw)
  // path 例: ./content/momentum/jet-180.md → section=momentum, file=jet-180
  const mp = /\.\/content\/([^/]+)\/([^/]+)\.md$/.exec(path)
  const sectionKey = data.section || (mp ? mp[1] : 'foundation')
  const id = data.id || (mp ? mp[2] : path)
  pages.push({
    id,
    sectionKey,
    order: Number(data.order || 0),
    title: data.title || id,
    formula: data.formula || '',
    issue: data.issue || '',
    year: data.year || '',
    prereq: Array.isArray(data.prereq) ? data.prereq : data.prereq ? [data.prereq] : [],
    body,
  })
}

// セクション順 → order 順 で安定ソート
pages.sort((a, b) => {
  const sa = SECTION_BY_KEY[a.sectionKey]?.n ?? 99
  const sb = SECTION_BY_KEY[b.sectionKey]?.n ?? 99
  return sa - sb || a.order - b.order || a.id.localeCompare(b.id)
})

export const PAGES = pages
export const PAGE_BY_ID = Object.fromEntries(pages.map((p) => [p.id, p]))
