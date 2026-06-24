import { Caption } from './index.jsx'

// 土台（理想気体・比熱）セクションの図。light テーマ前提・viewBox で伸縮。
// 主線 #2563eb / 補助 #475569 / 強調 #b91c1c / 面 #dbeafe

const AX = '#475569'
const BLUE = '#2563eb'
const RED = '#b91c1c'

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

// 理想気体 pv=RT の p-v 等温線（双曲線）
function IdealGasPV() {
  // p = c/v ; v in [55,290], 3本の等温線
  const curve = (c) => {
    const pts = []
    for (let v = 55; v <= 290; v += 5) {
      const p = 180 - (c / (v - 40))
      if (p > 20 && p < 180) pts.push(`${v},${p.toFixed(1)}`)
    }
    return pts.join(' ')
  }
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 210" width="100%" role="img" aria-label="pv=RT の等温線">
        <Defs />
        <Axes xl="v（比体積）" yl="p（圧力）" />
        {[2600, 4200, 5800].map((c, i) => (
          <polyline key={c} points={curve(c)} fill="none" stroke={BLUE} strokeWidth="2" opacity={0.55 + i * 0.2} />
        ))}
        <text x="250" y="70" fontSize="12" fill={BLUE}>T₃</text>
        <text x="250" y="110" fontSize="12" fill={BLUE} opacity="0.8">T₂</text>
        <text x="250" y="150" fontSize="12" fill={BLUE} opacity="0.6">T₁</text>
        <text x="150" y="40" fontSize="12" fill={AX}>T₁&lt;T₂&lt;T₃</text>
      </svg>
      <Caption>等温線は <b>pv=RT</b> の双曲線。温度が高いほど外側へ。各曲線上で pv は一定。</Caption>
    </figure>
  )
}

// 定積（固定フタ）と定圧（動くピストン）の加熱
function CvCpPistons() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 340 180" width="100%" role="img" aria-label="定積加熱と定圧加熱">
        {/* 定積 */}
        <rect x="30" y="40" width="90" height="90" fill="#dbeafe" stroke={AX} strokeWidth="2" />
        <line x1="30" y1="40" x2="120" y2="40" stroke={AX} strokeWidth="5" />
        <text x="75" y="30" fontSize="12" fill={AX} textAnchor="middle">フタ固定</text>
        <path d="M75,150 L75,132" stroke={RED} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="75" y="168" fontSize="12" fill={RED} textAnchor="middle">δq → ΔU のみ</text>
        <text x="75" y="100" fontSize="13" fill={AX} textAnchor="middle">定積 cᵥ</text>
        {/* 定圧 */}
        <rect x="210" y="55" width="90" height="75" fill="#dbeafe" stroke={AX} strokeWidth="2" />
        <rect x="208" y="48" width="94" height="9" fill={AX} />
        <path d="M255,48 L255,28" stroke={BLUE} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="255" y="22" fontSize="12" fill={BLUE} textAnchor="middle">膨張 pΔv</text>
        <path d="M255,150 L255,132" stroke={RED} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="255" y="168" fontSize="12" fill={RED} textAnchor="middle">δq → ΔU + 仕事</text>
        <text x="255" y="100" fontSize="13" fill={AX} textAnchor="middle">定圧 cₚ</text>
        <Defs />
      </svg>
      <Caption>同じ ΔT でも定圧は膨張仕事の分だけ余分に熱が要る → <b>cₚ &gt; cᵥ</b>。</Caption>
    </figure>
  )
}

// マイヤー: 定圧でピストンが dv 動く＝仕事 p dv
function MayerPdv() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 170" width="100%" role="img" aria-label="定圧膨張の仕事 p dv">
        <rect x="40" y="50" width="120" height="70" fill="#dbeafe" stroke={AX} strokeWidth="2" />
        <rect x="160" y="50" width="50" height="70" fill="#eff6ff" stroke={BLUE} strokeDasharray="4 3" strokeWidth="2" />
        <rect x="206" y="44" width="10" height="82" fill={AX} />
        <path d="M160,135 L210,135" stroke={RED} strokeWidth="1.5" markerEnd="url(#arr)" markerStart="url(#arr)" />
        <text x="185" y="152" fontSize="12" fill={RED} textAnchor="middle">dv</text>
        <path d="M230,85 L270,85" stroke={BLUE} strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="250" y="76" fontSize="12" fill={BLUE} textAnchor="middle">p（一定）</text>
        <text x="100" y="90" fontSize="13" fill={AX} textAnchor="middle">気体</text>
        <text x="160" y="32" fontSize="13" fill={RED} textAnchor="middle">仕事 = p·dv = R·dT</text>
        <Defs />
      </svg>
      <Caption>定圧で 1 K 上げると体積が dv 増え、<b>p·dv = R·dT</b> の仕事をする。これが cₚ − cᵥ = R の差の正体。</Caption>
    </figure>
  )
}

// 自由度: 単原子（並進3）と2原子（並進3+回転2）
function DofMolecules() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 340 170" width="100%" role="img" aria-label="分子の自由度">
        {/* 単原子 */}
        <circle cx="80" cy="80" r="14" fill={BLUE} />
        {[[0, -1], [0.87, 0.5], [-0.87, 0.5]].map(([dx, dy], i) => (
          <path key={i} d={`M80,80 L${80 + dx * 38},${80 + dy * 38}`} stroke={AX} strokeWidth="2" markerEnd="url(#arr)" />
        ))}
        <text x="80" y="150" fontSize="12" fill={AX} textAnchor="middle">単原子 f=3</text>
        <text x="80" y="166" fontSize="11" fill={BLUE} textAnchor="middle">並進3 → κ=5/3</text>
        {/* 2原子 */}
        <line x1="235" y1="80" x2="285" y2="80" stroke={AX} strokeWidth="3" />
        <circle cx="235" cy="80" r="13" fill={RED} />
        <circle cx="285" cy="80" r="13" fill={RED} />
        {[[0, -1], [0.87, 0.5], [-0.87, 0.5]].map(([dx, dy], i) => (
          <path key={i} d={`M260,80 L${260 + dx * 30},${80 + dy * 30}`} stroke={AX} strokeWidth="1.8" markerEnd="url(#arr)" />
        ))}
        <path d="M252,55 A14 14 0 1 1 268,55" fill="none" stroke={BLUE} strokeWidth="1.8" markerEnd="url(#arr)" />
        <text x="260" y="150" fontSize="12" fill={AX} textAnchor="middle">2原子 f=5</text>
        <text x="260" y="166" fontSize="11" fill={RED} textAnchor="middle">並進3+回転2 → κ=7/5</text>
        <Defs />
      </svg>
      <Caption>自由度 f のぶんだけ <b>½RT</b> ずつエネルギーが配られる（等分配則）。常温の2原子は振動が凍結して f=5。</Caption>
    </figure>
  )
}

export default {
  'ideal-gas-pv': IdealGasPV,
  'cv-cp-pistons': CvCpPistons,
  'mayer-pdv': MayerPdv,
  'dof-molecules': DofMolecules,
}
