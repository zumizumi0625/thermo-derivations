import { Caption } from './index.jsx'

// 第一法則と準静的変化セクションの図。light テーマ前提・viewBox で伸縮。
// 主線 #2563eb / 補助 #475569 / 強調 #b91c1c / 面 #dbeafe
// 緑（等圧など補助過程） #047857

const AX = '#475569'
const BLUE = '#2563eb'
const RED = '#b91c1c'
const GREEN = '#047857'

function Axes({ xl, yl }) {
  return (
    <>
      <line x1="40" y1="180" x2="300" y2="180" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
      <line x1="40" y1="180" x2="40" y2="20" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
      <text x="300" y="198" fontSize="13" fill={AX} textAnchor="end">{xl}</text>
      <text x="30" y="22" fontSize="13" fill={AX} textAnchor="end">{yl}</text>
    </>
  )
}

function Defs() {
  return (
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={AX} />
      </marker>
    </defs>
  )
}

// 閉じた系の第一法則：入る熱 q が ΔU と仕事 w に分かれる収支図
function FirstLawBalance() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 360 190" width="100%" role="img" aria-label="第一法則のエネルギー収支">
        <Defs />
        {/* シリンダ */}
        <rect x="120" y="55" width="110" height="80" fill="#dbeafe" stroke={AX} strokeWidth="2" />
        {/* ピストン */}
        <rect x="228" y="48" width="10" height="94" fill={AX} />
        <text x="175" y="100" fontSize="13" fill={AX} textAnchor="middle">気体 U</text>
        {/* 入る熱 q（下から赤矢印） */}
        <path d="M175,178 L175,140" stroke={RED} strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="175" y="173" fontSize="12" fill={RED} textAnchor="middle">入る熱 q</text>
        {/* ΔU 上向き（系内に貯まる） */}
        <path d="M150,95 L150,68" stroke={BLUE} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="150" y="46" fontSize="11" fill={BLUE} textAnchor="middle">ΔU に貯まる</text>
        {/* 外への仕事 w（ピストンを右へ） */}
        <path d="M245,90 L300,90" stroke={GREEN} strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="280" y="80" fontSize="12" fill={GREEN} textAnchor="middle">仕事 w</text>
        <text x="280" y="112" fontSize="11" fill={GREEN} textAnchor="middle">= p·dv</text>
        {/* 式 */}
        <text x="180" y="22" fontSize="14" fill={AX} textAnchor="middle">q = ΔU + w</text>
      </svg>
      <Caption>入った熱 q は <b>内部エネルギー ΔU</b> に貯まる分と <b>外への仕事 w = p·dv</b> に分かれる。U は状態量、q と w は経路量。</Caption>
    </figure>
  )
}

// エンタルピー h = u + pv の積み上げ（流動仕事 pv を u に足す）
function EnthalpyUVP() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 340 180" width="100%" role="img" aria-label="エンタルピー h = u + pv">
        <Defs />
        {/* u の棒 */}
        <rect x="70" y="70" width="70" height="80" fill="#dbeafe" stroke={AX} strokeWidth="2" />
        <text x="105" y="115" fontSize="14" fill={AX} textAnchor="middle">u</text>
        <text x="105" y="166" fontSize="11" fill={AX} textAnchor="middle">内部エネルギー</text>
        {/* + 記号 */}
        <text x="160" y="115" fontSize="18" fill={AX} textAnchor="middle">+</text>
        {/* pv の棒 */}
        <rect x="180" y="100" width="70" height="50" fill="#d1fae5" stroke={GREEN} strokeWidth="2" />
        <text x="215" y="130" fontSize="14" fill={GREEN} textAnchor="middle">p·v</text>
        <text x="215" y="166" fontSize="11" fill={GREEN} textAnchor="middle">流動仕事</text>
        {/* = h の棒 */}
        <text x="268" y="115" fontSize="18" fill={AX} textAnchor="middle">=</text>
        <rect x="288" y="70" width="42" height="80" fill="#fde2e2" stroke={RED} strokeWidth="2" />
        <text x="309" y="115" fontSize="14" fill={RED} textAnchor="middle">h</text>
        <text x="170" y="30" fontSize="14" fill={AX} textAnchor="middle">δq = dh − v·dp</text>
      </svg>
      <Caption>エンタルピー <b>h = u + p·v</b>。流動仕事 p·v を内部エネルギーに足した量で、流れ系の収支がきれいに書ける。等圧では δq = dh。</Caption>
    </figure>
  )
}

// 等温変化の p-v 線図（双曲線）と仕事＝曲線下の面積
function IsothermalPV() {
  // p = c/(v-40), 1本の等温線。状態1(左上)→状態2(右下)へ膨張
  const c = 5000
  const v1 = 70, v2 = 250
  const pAt = (v) => 180 - c / (v - 40)
  const pts = []
  for (let v = v1; v <= v2; v += 4) {
    const p = pAt(v)
    if (p > 20 && p < 180) pts.push(`${v},${p.toFixed(1)}`)
  }
  // 面積ポリゴン（曲線下）
  const area = [`${v1},180`, ...pts, `${v2},180`].join(' ')
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 210" width="100%" role="img" aria-label="等温変化の p-v 線図">
        <Defs />
        <Axes xl="v（比体積）" yl="p（圧力）" />
        <polygon points={area} fill="#dbeafe" opacity="0.7" />
        <polyline points={pts.join(' ')} fill="none" stroke={BLUE} strokeWidth="2.5" />
        {/* 状態点 */}
        <circle cx={v1} cy={pAt(v1)} r="4" fill={RED} />
        <text x={v1 + 4} y={pAt(v1) - 6} fontSize="12" fill={RED}>1 (p₁,v₁)</text>
        <circle cx={v2} cy={pAt(v2)} r="4" fill={RED} />
        <text x={v2 - 8} y={pAt(v2) - 8} fontSize="12" fill={RED} textAnchor="end">2 (p₂,v₂)</text>
        <text x="150" y="160" fontSize="12" fill={AX} textAnchor="middle">w = ∫p dv</text>
        <text x="220" y="60" fontSize="12" fill={BLUE}>T 一定 (双曲線)</text>
      </svg>
      <Caption>等温線は <b>pv = RT</b> の双曲線。膨張 1→2 でする仕事 w は曲線下の面積 = <b>RT·ln(v₂/v₁)</b>。ΔU = 0 なので q = w。</Caption>
    </figure>
  )
}

// 等圧（水平）と等積（垂直）の p-v 線図
function IsobaricIsochoric() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 210" width="100%" role="img" aria-label="等圧・等積変化の p-v 線図">
        <Defs />
        <Axes xl="v（比体積）" yl="p（圧力）" />
        {/* 等圧（水平線）：面積あり */}
        <polygon points="80,90 240,90 240,180 80,180" fill="#d1fae5" opacity="0.7" />
        <line x1="80" y1="90" x2="240" y2="90" stroke={GREEN} strokeWidth="2.5" />
        <circle cx="80" cy="90" r="4" fill={GREEN} />
        <circle cx="240" cy="90" r="4" fill={GREEN} />
        <text x="160" y="82" fontSize="12" fill={GREEN} textAnchor="middle">等圧 p 一定</text>
        <text x="160" y="140" fontSize="11" fill={GREEN} textAnchor="middle">w = pΔv = RΔT</text>
        {/* 等積（垂直線）：面積ゼロ */}
        <line x1="120" y1="60" x2="120" y2="155" stroke={BLUE} strokeWidth="2.5" />
        <circle cx="120" cy="60" r="4" fill={BLUE} />
        <circle cx="120" cy="155" r="4" fill={BLUE} />
        <text x="118" y="50" fontSize="12" fill={BLUE} textAnchor="middle">等積 v 一定</text>
        <text x="120" y="172" fontSize="11" fill={BLUE} textAnchor="middle">w = 0</text>
      </svg>
      <Caption>等圧は水平線で <b>w = pΔv = RΔT</b>（下の面積）、等積は垂直線で <b>w = 0</b>。熱はそれぞれ q = cₚΔT、q = cᵥΔT。</Caption>
    </figure>
  )
}

// 断熱線 vs 等温線（断熱の方が急）＋ポリトロープ n の比較
function AdiabaticVsIsothermal() {
  // 共通の状態点1から、等温 pv=const と断熱 pv^κ=const を描く
  const v1 = 75
  const p1 = 150
  const k1 = p1 * (v1 - 40) // 等温の定数 p=(k1)/(v-40)
  const kappa = 1.4
  const k2 = p1 * Math.pow(v1 - 40, kappa) // 断熱の定数 p=k2/(v-40)^κ
  const iso = [], adi = []
  for (let v = v1; v <= 270; v += 4) {
    const piso = k1 / (v - 40)
    const padi = k2 / Math.pow(v - 40, kappa)
    if (piso > 18) iso.push(`${v},${piso.toFixed(1)}`)
    if (padi > 18) adi.push(`${v},${padi.toFixed(1)}`)
  }
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 210" width="100%" role="img" aria-label="断熱線と等温線の比較">
        <Defs />
        <Axes xl="v（比体積）" yl="p（圧力）" />
        <polyline points={iso.join(' ')} fill="none" stroke={BLUE} strokeWidth="2.5" />
        <polyline points={adi.join(' ')} fill="none" stroke={RED} strokeWidth="2.5" />
        <circle cx={v1} cy={p1} r="4" fill={AX} />
        <text x={v1 + 6} y={p1 - 6} fontSize="12" fill={AX}>状態1</text>
        <text x="200" y="70" fontSize="12" fill={BLUE}>等温 pv = const (n=1)</text>
        <text x="150" y="50" fontSize="12" fill={RED}>断熱 pvᵏ = const (n=κ)</text>
        <text x="155" y="170" fontSize="11" fill={AX}>断熱は等温より急 (κ&gt;1)</text>
      </svg>
      <Caption>同じ状態1から膨張すると、断熱線 <b>pvᵏ = const</b> は等温線 <b>pv = const</b> より急（κ &gt; 1）。ポリトロープ pvⁿ は n=0 等圧 / 1 等温 / κ 断熱 / ∞ 等積。</Caption>
    </figure>
  )
}

export default {
  'first-law-balance': FirstLawBalance,
  'enthalpy-uvp': EnthalpyUVP,
  'isothermal-pv': IsothermalPV,
  'isobaric-isochoric': IsobaricIsochoric,
  'adiabatic-vs-isothermal': AdiabaticVsIsothermal,
}
