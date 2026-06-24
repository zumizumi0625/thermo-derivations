import { useMemo, useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import Figure from './figures/index.jsx'
import { SECTIONS, SECTION_BY_KEY } from './sections.js'
import { PAGES, PAGE_BY_ID } from './content.js'
import { useProgress, STATE_META, STATES } from './progress.js'

// --- markdown ヘルパ（テザーサイトのものを踏襲） ---------------------------

// 1行 $$...$$ は remark-math では inline 扱いになり \tag が壊れる。独立行に展開して
// 確実に display 数式にする。
function normalizeMath(md) {
  return md.replace(/^[ \t]*\$\$(.*)\$\$[ \t]*$/gm, (_, body) => `\n$$\n${body.trim()}\n$$\n`)
}

// ページ先頭の H1 はヘッダ（page-title）と重複するので落とす。
function stripLeadingH1(md) {
  return md.replace(/^\s*#\s+[^\n]*\r?\n+/, '')
}

function slug(s) {
  return String(s)
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[()（）。、,.:：/\\#★🔰🧭①②③④⑤]/g, '')
    .toLowerCase()
}

function nodeText(children) {
  if (children == null) return ''
  if (typeof children === 'string' || typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(nodeText).join('')
  if (children.props) return nodeText(children.props.children)
  return ''
}

function splitContent(md) {
  const parts = md.split(/@@FIG:([a-z0-9-]+)@@/)
  const out = []
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (parts[i].trim()) out.push({ type: 'md', body: parts[i] })
    } else {
      out.push({ type: 'fig', id: parts[i] })
    }
  }
  return out
}

function buildToc(md) {
  const toc = []
  let inFence = false
  for (const line of md.split('\n')) {
    if (line.startsWith('```')) { inFence = !inFence; continue }
    if (inFence) continue
    const m = /^(#{2,3})\s+(.*)$/.exec(line)
    if (m) toc.push({ level: m[1].length, text: m[2].replace(/\s+$/, ''), id: slug(m[2]) })
  }
  return toc
}

const mdComponents = {
  h1: ({ children }) => <h1 id={slug(nodeText(children))}>{children}</h1>,
  h2: ({ children }) => <h2 id={slug(nodeText(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slug(nodeText(children))}>{children}</h3>,
  h4: ({ children }) => <h4 id={slug(nodeText(children))}>{children}</h4>,
  a: ({ href, children }) => (
    <a href={href} target={href && href.startsWith('#') ? undefined : '_blank'} rel="noreferrer">{children}</a>
  ),
  table: ({ children }) => <div className="table-wrap"><table>{children}</table></div>,
}

// --- ルーティング --------------------------------------------------------

function routeFromHash() {
  const h = (window.location.hash || '').replace(/^#\/?/, '')
  if (!h || h === 'home') return { kind: 'home' }
  if (PAGE_BY_ID[h]) return { kind: 'page', id: h }
  return { kind: 'home' }
}

// --- 進捗トグル小物 ------------------------------------------------------

function StateBadge({ id, compact }) {
  const { getState, cycleState } = useProgress()
  const st = getState(id)
  const meta = STATE_META[st]
  return (
    <button
      className={'state-badge ' + meta.cls + (compact ? ' compact' : '')}
      title="クリックで 未着手→復習中→習得 を切替"
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); cycleState(id) }}
    >
      <span className="state-mark">{meta.mark}</span>
      {!compact && <span className="state-label">{meta.label}</span>}
    </button>
  )
}

// --- ダッシュボード（トップ） --------------------------------------------

function Dashboard() {
  const { getState } = useProgress()
  const total = PAGES.length
  const done = PAGES.filter((p) => getState(p.id) === 'done').length
  const review = PAGES.filter((p) => getState(p.id) === 'review').length
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="dashboard">
      <header className="hero">
        <h1>🔥 熱力学 導出トレ</h1>
        <p className="hero-sub">
          東京科学大 機械系 院試対策。各公式を<strong>出発点から図つきで丁寧に</strong>導出する個別ページ集。
          各ページの ⬜→🔁→✅ をクリックして<strong>3周メソッド</strong>の進捗を記録できる（保存はこの端末のブラウザ内）。
        </p>
        <div className="overall">
          <div className="overall-bar">
            <div className="overall-fill" style={{ width: pct + '%' }} />
          </div>
          <div className="overall-stat">
            習得 <b>{done}</b> ・ 復習中 <b>{review}</b> ・ 全 <b>{total}</b> 項目 — <b>{pct}%</b>
          </div>
        </div>
        <p className="hero-note">
          進め方の目安: <b>セクション0〜3を最優先</b>で全部手を動かす（得点源）。4は定義＋運動量欠損まで、5は時間が余れば。
        </p>
      </header>

      {SECTIONS.map((sec) => {
        const items = PAGES.filter((p) => p.sectionKey === sec.key)
        if (!items.length) return null
        const d = items.filter((p) => getState(p.id) === 'done').length
        return (
          <section className="sec-card" key={sec.key}>
            <div className="sec-head">
              <span className="sec-emoji">{sec.emoji}</span>
              <h2>{sec.n}. {sec.title}</h2>
              <span className={'sec-pri pri-' + (sec.priority.startsWith('★') ? 'high' : 'norm')}>{sec.priority}</span>
              <span className="sec-count">{d}/{items.length}</span>
            </div>
            <p className="sec-note">{sec.note}</p>
            <ul className="item-list">
              {items.map((p) => (
                <li key={p.id}>
                  <a className="item-link" href={'#/' + p.id}>
                    <StateBadge id={p.id} compact />
                    <span className="item-title">{p.title}</span>
                    {p.formula && <code className="item-formula">{p.formula}</code>}
                    {p.year && <span className="item-year">{p.year}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )
      })}

      <footer className="foot">
        出典: <code>knowledge/notes/院試/導出リスト_熱力学.md</code>（過去問分析 2021–2026）·
        3周メソッド = 写経 → 見ながら再現 → 見ずに再現 ·
        進捗はブラウザの localStorage に保存
      </footer>
    </div>
  )
}

// --- 個別導出ページ ------------------------------------------------------

function DerivationPage({ id }) {
  const page = PAGE_BY_ID[id]
  const [active, setActive] = useState('')
  const md = useMemo(() => normalizeMath(stripLeadingH1(page.body)), [page.body])
  const blocks = useMemo(() => splitContent(md), [md])
  const toc = useMemo(() => buildToc(md), [md])
  const sec = SECTION_BY_KEY[page.sectionKey]

  // 同セクション内の前後ページ
  const siblings = PAGES.filter((p) => p.sectionKey === page.sectionKey)
  const idx = siblings.findIndex((p) => p.id === id)
  const prev = siblings[idx - 1]
  const next = siblings[idx + 1]

  useEffect(() => {
    const ids = toc.map((t) => t.id)
    const onScroll = () => {
      let cur = ''
      for (const tid of ids) {
        const el = document.getElementById(tid)
        if (el && el.getBoundingClientRect().top <= 120) cur = tid
      }
      setActive(cur)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [toc])

  return (
    <>
      <div className="page-head">
        <div className="breadcrumb">
          <a href="#/">🏠 一覧</a> <span>/</span> <span>{sec?.emoji} {sec?.n}. {sec?.title}</span>
        </div>
        <div className="page-title-row">
          <h1 className="page-title">{page.title}</h1>
          <StateBadge id={id} />
        </div>
        <div className="page-meta">
          {page.formula && <code className="page-formula">{page.formula}</code>}
          {page.issue && (
            <a className="page-issue" href={`https://github.com/zumizumi0625/SELF_MANAGEMENT/issues/${page.issue}`} target="_blank" rel="noreferrer">#{page.issue}</a>
          )}
          {page.year && <span className="page-year">出題: {page.year}</span>}
        </div>
        {page.prereq.length > 0 && (
          <div className="prereq">
            前提:{' '}
            {page.prereq.map((pr) => (
              <a key={pr} href={'#/' + pr}>{PAGE_BY_ID[pr]?.title || pr}</a>
            ))}
          </div>
        )}
      </div>

      <article className="prose">
        {blocks.map((b, i) =>
          b.type === 'fig' ? (
            <Figure key={i} id={b.id} />
          ) : (
            <ReactMarkdown
              key={i}
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={mdComponents}
            >
              {b.body}
            </ReactMarkdown>
          ),
        )}
      </article>

      <nav className="pager">
        {prev ? <a className="pager-prev" href={'#/' + prev.id}>← {prev.title}</a> : <span />}
        {next ? <a className="pager-next" href={'#/' + next.id}>{next.title} →</a> : <span />}
      </nav>
    </>
  )
}

// --- サイドバー（全ページのナビ＋進捗マーク） ----------------------------

function Sidebar({ route, onNav }) {
  const { getState } = useProgress()
  return (
    <div className="site-nav">
      <a className={'site-nav-home' + (route.kind === 'home' ? ' site-nav-active' : '')} href="#/" onClick={onNav}>
        🧭 トップ（進捗ダッシュボード）
      </a>
      {SECTIONS.map((sec) => {
        const items = PAGES.filter((p) => p.sectionKey === sec.key)
        if (!items.length) return null
        return (
          <div key={sec.key} className="nav-sec">
            <div className="site-nav-group">{sec.emoji} {sec.n}. {sec.title}</div>
            {items.map((p) => (
              <a
                key={p.id}
                href={'#/' + p.id}
                onClick={onNav}
                className={'site-nav-link' + (route.kind === 'page' && route.id === p.id ? ' site-nav-active' : '')}
              >
                <span className={'nav-mark ' + STATE_META[getState(p.id)].cls}>{STATE_META[getState(p.id)].mark}</span>
                <span>{p.title}</span>
              </a>
            ))}
          </div>
        )
      })}
    </div>
  )
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash())
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onHash = () => { setRoute(routeFromHash()); setOpen(false); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <div className="layout">
      <button className="toc-toggle" onClick={() => setOpen((v) => !v)} aria-label="メニュー">☰ メニュー</button>
      <aside className={'toc' + (open ? ' toc-open' : '')}>
        <div className="site-nav-head">熱力学 導出トレ</div>
        <Sidebar route={route} onNav={() => setOpen(false)} />
      </aside>
      <main className="content">
        {route.kind === 'home' ? <Dashboard /> : <DerivationPage id={route.id} />}
      </main>
    </div>
  )
}
