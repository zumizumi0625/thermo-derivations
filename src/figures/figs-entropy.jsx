import { Caption } from './index.jsx'

// エントロピー・第二法則セクションの図。light テーマ前提・viewBox で伸縮。
// 主線 #2563eb / 補助 #475569 / 強調 #b91c1c / 面 #dbeafe
const AX = '#475569'
const BLUE = '#2563eb'
const RED = '#b91c1c'

function Defs() {
  return (
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={AX} />
      </marker>
      <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={RED} />
      </marker>
    </defs>
  )
}

// クラウジウス: 可逆サイクルを微小カルノーサイクルに分割して ∮δq/T=0
function ClausiusCycle() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 220" width="100%" role="img" aria-label="任意の可逆サイクルを微小カルノーサイクルに分割">
        <Defs />
        <line x1="40" y1="190" x2="300" y2="190" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="40" y1="190" x2="40" y2="20" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="300" y="208" fontSize="13" fill={AX} textAnchor="end">v</text>
        <text x="30" y="22" fontSize="13" fill={AX} textAnchor="end">p</text>
        {/* 任意の閉曲線 */}
        <path d="M90,150 C70,90 130,40 190,55 C250,70 270,140 220,170 C180,195 110,195 90,150 Z"
          fill="#dbeafe" stroke={BLUE} strokeWidth="2.5" />
        {/* 等温・断熱の格子で分割（細線） */}
        {[80, 120, 160, 200, 240].map((x) => (
          <line key={'a' + x} x1={x} y1="40" x2={x} y2="185" stroke={AX} strokeWidth="0.5" opacity="0.5" />
        ))}
        {[70, 105, 140, 175].map((y) => (
          <line key={'b' + y} x1="55" y1={y} x2="290" y2={y} stroke={AX} strokeWidth="0.5" opacity="0.5" />
        ))}
        <text x="155" y="120" fontSize="12" fill={BLUE} textAnchor="middle">可逆サイクル</text>
        <text x="155" y="208" fontSize="11" fill={AX} textAnchor="middle">微小カルノーで埋め尽くす</text>
      </svg>
      <Caption>任意の可逆サイクルは微小なカルノーサイクルの和に分割できる。各カルノーで δq/T の和が 0 なので、全体でも <b>∮ δq/T = 0</b>。よって δq_rev/T の積分は経路によらず、状態量 S が定義できる。</Caption>
    </figure>
  )
}

// 状態量: 経路A・経路Bで同じ2点を結んでも ∫δq_rev/T は等しい
function StatePathIndep() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 200" width="100%" role="img" aria-label="経路によらず状態量">
        <Defs />
        <circle cx="70" cy="150" r="5" fill={AX} />
        <circle cx="250" cy="55" r="5" fill={AX} />
        <text x="58" y="168" fontSize="13" fill={AX}>1</text>
        <text x="262" y="52" fontSize="13" fill={AX}>2</text>
        <path d="M70,150 C100,60 180,50 250,55" fill="none" stroke={BLUE} strokeWidth="2.5" markerEnd="url(#arr)" />
        <path d="M70,150 C140,170 210,140 250,55" fill="none" stroke={RED} strokeWidth="2.5" markerEnd="url(#arrR)" />
        <text x="120" y="70" fontSize="12" fill={BLUE}>経路A</text>
        <text x="160" y="165" fontSize="12" fill={RED}>経路B</text>
        <text x="160" y="190" fontSize="12" fill={AX} textAnchor="middle">S₂ − S₁ = ∫₁² δq_rev/T（経路によらず同じ）</text>
      </svg>
      <Caption>1→2 をどの可逆経路で結んでも ∫ δq_rev/T は同じ値。だから <b>S は状態量</b>で、ΔS は始点と終点だけで決まる。不可逆経路の ΔS も、同じ2点を結ぶ可逆経路で計算してよい。</Caption>
    </figure>
  )
}

// 断熱自由膨張: 仕切り→真空へ気体が広がる
function FreeExpansion() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 340 170" width="100%" role="img" aria-label="断熱自由膨張（真空への膨張）">
        <Defs />
        {/* 前 */}
        <rect x="30" y="40" width="120" height="80" fill="none" stroke={AX} strokeWidth="2" />
        <rect x="30" y="40" width="60" height="80" fill="#dbeafe" stroke="none" />
        <line x1="90" y1="40" x2="90" y2="120" stroke={RED} strokeWidth="3" />
        <text x="60" y="85" fontSize="11" fill={AX} textAnchor="middle">気体 V₁</text>
        <text x="120" y="85" fontSize="11" fill={AX} textAnchor="middle">真空</text>
        <text x="90" y="135" fontSize="11" fill={RED} textAnchor="middle">仕切り</text>
        <text x="90" y="32" fontSize="12" fill={AX} textAnchor="middle">前（断熱・剛体壁）</text>
        {/* 矢印 */}
        <path d="M165,80 L200,80" stroke={AX} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="182" y="70" fontSize="11" fill={AX} textAnchor="middle">仕切り除去</text>
        {/* 後 */}
        <rect x="215" y="40" width="120" height="80" fill="#dbeafe" stroke={AX} strokeWidth="2" />
        <text x="275" y="85" fontSize="11" fill={AX} textAnchor="middle">気体 V₂ に充満</text>
        <text x="275" y="32" fontSize="12" fill={AX} textAnchor="middle">後</text>
        <text x="275" y="135" fontSize="11" fill={BLUE} textAnchor="middle">Q=0, W=0 → ΔU=0</text>
      </svg>
      <Caption>剛体・断熱容器で仕切りを抜くと、気体は真空側へ広がる。外へ仕事をせず（W=0）熱の出入りもない（Q=0）ので <b>ΔU=0</b>、理想気体なら温度一定。それでも体積が増えるので ΔS = R·ln(v₂/v₁) &gt; 0。代表的な不可逆過程。</Caption>
    </figure>
  )
}

// 相変化: 等温等圧で潜熱 L を受け取りながら相が変わる
function PhaseChange() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 200" width="100%" role="img" aria-label="相変化（融解・蒸発）の温度一定加熱">
        <Defs />
        {/* 軸 */}
        <line x1="45" y1="170" x2="300" y2="170" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="45" y1="170" x2="45" y2="20" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="300" y="188" fontSize="12" fill={AX} textAnchor="end">加えた熱 q</text>
        <text x="35" y="22" fontSize="12" fill={AX} textAnchor="end">T</text>
        {/* 加熱曲線: 昇温→平坦(相変化)→昇温 */}
        <path d="M45,140 L110,90" fill="none" stroke={BLUE} strokeWidth="2.5" />
        <path d="M110,90 L210,90" fill="none" stroke={RED} strokeWidth="3" />
        <path d="M210,90 L285,45" fill="none" stroke={BLUE} strokeWidth="2.5" />
        {/* 潜熱区間 */}
        <line x1="110" y1="90" x2="110" y2="170" stroke={AX} strokeWidth="0.7" strokeDasharray="3 3" />
        <line x1="210" y1="90" x2="210" y2="170" stroke={AX} strokeWidth="0.7" strokeDasharray="3 3" />
        <path d="M110,180 L210,180" stroke={RED} strokeWidth="1.5" markerStart="url(#arrR)" markerEnd="url(#arrR)" />
        <text x="160" y="196" fontSize="11" fill={RED} textAnchor="middle">潜熱 L（温度一定）</text>
        <line x1="45" y1="90" x2="110" y2="90" stroke={AX} strokeWidth="0.6" strokeDasharray="3 3" />
        <text x="40" y="94" fontSize="11" fill={AX} textAnchor="end">Tₘ</text>
        <text x="80" y="80" fontSize="10" fill={BLUE}>固相</text>
        <text x="155" y="82" fontSize="10" fill={RED} textAnchor="middle">相が変わる</text>
        <text x="255" y="58" fontSize="10" fill={BLUE}>液相</text>
      </svg>
      <Caption>融解・蒸発は等温等圧で進む。潜熱 L を受け取る間も温度は Tₘ のまま一定。だから ΔS = ∫δq/T = L/Tₘ（T を積分の外に出せる）。氷→水なら融解潜熱、水→蒸気なら蒸発潜熱。</Caption>
    </figure>
  )
}

// T-s 線図: 曲線下の面積=熱量、等温=水平、断熱=垂直
function TsArea() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 220" width="100%" role="img" aria-label="T-s線図 曲線下面積が熱量">
        <Defs />
        <line x1="45" y1="180" x2="300" y2="180" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="45" y1="180" x2="45" y2="20" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="300" y="198" fontSize="13" fill={AX} textAnchor="end">s（比エントロピー）</text>
        <text x="35" y="22" fontSize="13" fill={AX} textAnchor="end">T</text>
        {/* ある過程の曲線 */}
        <path d="M90,140 C140,110 200,95 250,70" fill="none" stroke={BLUE} strokeWidth="2.5" />
        {/* 面積の塗り（曲線下） */}
        <path d="M90,140 C140,110 200,95 250,70 L250,180 L90,180 Z" fill="#dbeafe" opacity="0.8" />
        <circle cx="90" cy="140" r="4" fill={AX} />
        <circle cx="250" cy="70" r="4" fill={AX} />
        <text x="80" y="135" fontSize="12" fill={AX}>1</text>
        <text x="258" y="68" fontSize="12" fill={AX}>2</text>
        <text x="165" y="160" fontSize="12" fill={BLUE} textAnchor="middle">面積 = ∫T ds = q₁₂</text>
        {/* ds の短冊 */}
        <line x1="165" y1="180" x2="165" y2="103" stroke={RED} strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="178" y1="180" x2="178" y2="100" stroke={RED} strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="172" y="195" fontSize="10" fill={RED} textAnchor="middle">ds</text>
      </svg>
      <Caption>δq_rev = T·ds なので、T-s 線図では過程の曲線下の面積がそのまま授受熱量 q になる。幅 ds の短冊の高さが T、面積 T·ds の足し合わせ。p-v 線図で面積が仕事なのと対をなす関係。</Caption>
    </figure>
  )
}

// T-s上の代表過程: 等温=水平 / 断熱可逆=垂直
function TsProcesses() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 210" width="100%" role="img" aria-label="T-s線図の等温線と断熱線">
        <Defs />
        <line x1="45" y1="175" x2="300" y2="175" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="45" y1="175" x2="45" y2="20" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="300" y="193" fontSize="13" fill={AX} textAnchor="end">s</text>
        <text x="35" y="22" fontSize="13" fill={AX} textAnchor="end">T</text>
        {/* 等温線（水平） */}
        <line x1="80" y1="70" x2="240" y2="70" stroke={RED} strokeWidth="2.5" markerEnd="url(#arrR)" />
        <text x="160" y="62" fontSize="12" fill={RED} textAnchor="middle">等温 T一定（水平）</text>
        {/* 断熱可逆（垂直, 等エントロピー） */}
        <line x1="120" y1="160" x2="120" y2="85" stroke={BLUE} strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="123" y="150" fontSize="12" fill={BLUE}>断熱可逆 s一定（垂直）</text>
      </svg>
      <Caption>等温過程は T 一定なので <b>水平線</b>、可逆断熱（等エントロピー）過程は δq=0 で s 一定なので <b>垂直線</b>。カルノーサイクルは T-s 上では長方形になる。</Caption>
    </figure>
  )
}

// 定積と定圧の T-s 勾配比較（定積の方が急）
function TsSlopeCompare() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 210" width="100%" role="img" aria-label="定積線と定圧線のT-s勾配">
        <Defs />
        <line x1="45" y1="180" x2="300" y2="180" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="45" y1="180" x2="45" y2="20" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="300" y="198" fontSize="13" fill={AX} textAnchor="end">s</text>
        <text x="35" y="22" fontSize="13" fill={AX} textAnchor="end">T</text>
        {/* 共通の点から立ち上がる2曲線。定積(急, cv小)＞定圧(緩, cp大) */}
        <circle cx="80" cy="160" r="4" fill={AX} />
        {/* 定積線: 急 (勾配 T/cv 大) */}
        <path d="M80,160 C120,120 150,75 175,40" fill="none" stroke={RED} strokeWidth="2.5" markerEnd="url(#arrR)" />
        <text x="180" y="44" fontSize="12" fill={RED}>定積 v一定</text>
        <text x="186" y="60" fontSize="10" fill={RED}>(∂T/∂s)=T/cᵥ 急</text>
        {/* 定圧線: 緩 (勾配 T/cp 小) */}
        <path d="M80,160 C140,135 210,110 280,90" fill="none" stroke={BLUE} strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="225" y="105" fontSize="12" fill={BLUE}>定圧 p一定</text>
        <text x="222" y="121" fontSize="10" fill={BLUE}>(∂T/∂s)=T/cₚ 緩</text>
      </svg>
      <Caption>T ds = c dT より勾配は (∂T/∂s)=T/c。cᵥ &lt; cₚ なので同じ T では <b>定積線のほうが定圧線より急</b>に立ち上がる。同じ熱を入れても定積では温度が上がりやすい、を線図で見たもの。</Caption>
    </figure>
  )
}

export default {
  'clausius-cycle': ClausiusCycle,
  'state-path-indep': StatePathIndep,
  'free-expansion': FreeExpansion,
  'phase-change': PhaseChange,
  'ts-area': TsArea,
  'ts-processes': TsProcesses,
  'ts-slope-compare': TsSlopeCompare,
}
