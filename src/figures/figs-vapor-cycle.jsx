import { Caption } from './index.jsx'

// 蒸気サイクルセクションの図。light テーマ前提・viewBox で伸縮。
// 主線 #2563eb / 補助 #475569 / 強調 #b91c1c / 面 #dbeafe
// キャプションはプレーン Unicode テキストのみ（$…$ / LaTeX / {} 禁止）。強調は <b>。

const AX = '#475569'
const BLUE = '#2563eb'
const RED = '#b91c1c'
const FILL = '#dbeafe'

function Defs() {
  return (
    <defs>
      <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={AX} />
      </marker>
      <marker id="arrB" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={BLUE} />
      </marker>
      <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={RED} />
      </marker>
    </defs>
  )
}

// 湿り蒸気ドーム（T-s 図）: 飽和液線・飽和蒸気線・臨界点・乾き度線
function WetDome() {
  // ドーム輪郭。左が飽和液線(x=0)、右が飽和蒸気線(x=1)、頂点が臨界点C
  // 飽和液側
  const liq = '60,180 78,150 100,118 125,92 150,72 170,60'
  // 飽和蒸気側
  const vap = '170,60 195,72 222,96 250,128 275,162 290,180'
  // 等温線（ドーム内は水平）: T1 上, T2 下
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 210" width="100%" role="img" aria-label="湿り蒸気ドームと乾き度">
        <Defs />
        {/* 軸 */}
        <line x1="40" y1="180" x2="305" y2="180" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="40" y1="180" x2="40" y2="20" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="305" y="198" fontSize="13" fill={AX} textAnchor="end">s（比エントロピー）</text>
        <text x="30" y="20" fontSize="13" fill={AX} textAnchor="end">T</text>
        {/* ドーム面 */}
        <polygon points={`${liq} ${vap}`} fill={FILL} opacity="0.5" />
        <polyline points={liq} fill="none" stroke={BLUE} strokeWidth="2.4" />
        <polyline points={vap} fill="none" stroke={BLUE} strokeWidth="2.4" />
        {/* 臨界点 */}
        <circle cx="170" cy="60" r="4" fill={RED} />
        <text x="170" y="50" fontSize="12" fill={RED} textAnchor="middle">臨界点 C</text>
        {/* 飽和液線・飽和蒸気線ラベル */}
        <text x="78" y="128" fontSize="11" fill={BLUE} textAnchor="end">飽和液線</text>
        <text x="80" y="142" fontSize="11" fill={BLUE} textAnchor="end">x=0</text>
        <text x="278" y="150" fontSize="11" fill={BLUE}>飽和蒸気線</text>
        <text x="278" y="164" fontSize="11" fill={BLUE}>x=1</text>
        {/* 等温線（ドーム内は水平＝等圧でもある）: 点 f(x=0) - 中間 - g(x=1) */}
        <line x1="105" y1="125" x2="247" y2="125" stroke={RED} strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="105" cy="125" r="3.5" fill={RED} />
        <circle cx="247" cy="125" r="3.5" fill={RED} />
        <circle cx="190" cy="125" r="3.5" fill={AX} />
        <text x="98" y="120" fontSize="11" fill={RED} textAnchor="end">f (h′)</text>
        <text x="254" y="120" fontSize="11" fill={RED}>g (h″)</text>
        <text x="190" y="143" fontSize="11" fill={AX} textAnchor="middle">湿り蒸気 (x)</text>
        {/* 乾き度=てこ */}
        <text x="148" y="112" fontSize="11" fill={AX} textAnchor="middle">x</text>
        <text x="218" y="112" fontSize="11" fill={AX} textAnchor="middle">1−x</text>
      </svg>
      <Caption>飽和液 f と乾き飽和蒸気 g を結ぶ等温(=等圧)線上を、状態は乾き度 x の比で移動する。<b>h = h′ + x(h″−h′)</b> は f から測った「てこの関係」。</Caption>
    </figure>
  )
}

// ランキンサイクルの T-s 線図（1→2→3→4→1）
function RankineTs() {
  // 状態点: 1=タービン入口(過熱蒸気,高T), 2=タービン出口(湿り蒸気),
  //         3=復水器出口(飽和液,低T), 4=ボイラ入口(加圧液)
  const liq = '70,178 86,150 108,118 132,94 155,76 172,66'
  const vap = '172,66 196,80 222,104 248,136 272,168 286,178'
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 210" width="100%" role="img" aria-label="ランキンサイクルのT-s線図">
        <Defs />
        <line x1="40" y1="178" x2="305" y2="178" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <line x1="40" y1="178" x2="40" y2="20" stroke={AX} strokeWidth="1.5" markerEnd="url(#arr)" />
        <text x="305" y="196" fontSize="13" fill={AX} textAnchor="end">s</text>
        <text x="30" y="20" fontSize="13" fill={AX} textAnchor="end">T</text>
        {/* ドーム */}
        <polygon points={`${liq} ${vap}`} fill={FILL} opacity="0.45" />
        <polyline points={liq} fill="none" stroke={BLUE} strokeWidth="1.8" opacity="0.8" />
        <polyline points={vap} fill="none" stroke={BLUE} strokeWidth="1.8" opacity="0.8" />
        {/* サイクル経路 */}
        {/* 4→1 ボイラ等圧受熱（飽和液側を上り、過熱へ） */}
        <path d="M86,150 Q120,96 132,94 Q160,60 215,46" fill="none" stroke={RED} strokeWidth="2.4" />
        {/* 1→2 タービン断熱膨張（垂直＝等エントロピー） */}
        <line x1="215" y1="46" x2="215" y2="118" stroke={AX} strokeWidth="2.4" markerEnd="url(#arr)" />
        {/* 2→3 復水器等圧放熱（水平・低温） */}
        <line x1="215" y1="150" x2="86" y2="150" stroke={BLUE} strokeWidth="2.4" markerEnd="url(#arrB)" />
        {/* 3→4 ポンプ断熱加圧（短い縦・ほぼ点） */}
        {/* 状態点 */}
        <circle cx="215" cy="46" r="4" fill={RED} />
        <circle cx="215" cy="150" r="4" fill={AX} />
        <circle cx="86" cy="150" r="4" fill={BLUE} />
        <circle cx="89" cy="146" r="3" fill={RED} />
        <text x="223" y="44" fontSize="12" fill={RED}>1 入口</text>
        <text x="221" y="162" fontSize="12" fill={AX}>2 出口</text>
        <text x="80" y="166" fontSize="12" fill={BLUE} textAnchor="end">3 復水</text>
        <text x="72" y="138" fontSize="11" fill={RED} textAnchor="end">4</text>
        {/* 注記 */}
        <text x="150" y="36" fontSize="11" fill={RED} textAnchor="middle">ボイラ q_in</text>
        <text x="232" y="92" fontSize="11" fill={AX}>タービン w_t</text>
        <text x="150" y="166" fontSize="11" fill={BLUE} textAnchor="middle">復水器 q_out</text>
      </svg>
      <Caption>ランキンは 4→1 等圧受熱・1→2 断熱膨張・2→3 等圧放熱・3→4 断熱加圧。<b>正味仕事はループの囲む面積</b>、受熱は 4→1 下の面積。効率は面積比。</Caption>
    </figure>
  )
}

// ランキンの機器系統図（ボイラ→タービン→復水器→ポンプ）
function RankineLoop() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 340 200" width="100%" role="img" aria-label="ランキンサイクル機器系統図">
        <Defs />
        {/* ボイラ（左下） */}
        <rect x="30" y="120" width="70" height="50" fill={FILL} stroke={RED} strokeWidth="2" rx="4" />
        <text x="65" y="142" fontSize="12" fill={RED} textAnchor="middle">ボイラ</text>
        <text x="65" y="158" fontSize="10" fill={RED} textAnchor="middle">等圧受熱</text>
        <path d="M65,185 L65,172" stroke={RED} strokeWidth="2" markerEnd="url(#arrR)" />
        <text x="65" y="198" fontSize="10" fill={RED} textAnchor="middle">q_in</text>
        {/* タービン（右上、台形） */}
        <polygon points="225,30 285,42 285,78 225,66" fill={FILL} stroke={AX} strokeWidth="2" />
        <text x="255" y="58" fontSize="12" fill={AX} textAnchor="middle">タービン</text>
        <path d="M300,48 L320,48" stroke={AX} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="318" y="40" fontSize="10" fill={AX} textAnchor="end">w_t</text>
        {/* 復水器（右下） */}
        <rect x="240" y="120" width="70" height="50" fill="#eff6ff" stroke={BLUE} strokeWidth="2" rx="4" />
        <text x="275" y="142" fontSize="12" fill={BLUE} textAnchor="middle">復水器</text>
        <text x="275" y="158" fontSize="10" fill={BLUE} textAnchor="middle">等圧放熱</text>
        <path d="M275,172 L275,185" stroke={BLUE} strokeWidth="2" markerEnd="url(#arrB)" />
        <text x="275" y="198" fontSize="10" fill={BLUE} textAnchor="middle">q_out</text>
        {/* ポンプ（左下やや上、円） */}
        <circle cx="65" cy="95" r="15" fill="#fff" stroke={AX} strokeWidth="2" />
        <text x="65" y="99" fontSize="11" fill={AX} textAnchor="middle">ポンプ</text>
        <path d="M40,95 L52,95" stroke={AX} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="30" y="92" fontSize="10" fill={AX}>w_p</text>
        {/* 配管: ボイラ→タービン (4→1→1) 状態1 */}
        <path d="M100,130 L200,130 Q215,130 215,115 L215,55 L223,52" fill="none" stroke={AX} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="150" y="124" fontSize="11" fill={AX} textAnchor="middle">①蒸気</text>
        {/* タービン→復水器 状態2 */}
        <path d="M275,78 L275,118" fill="none" stroke={AX} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="288" y="100" fontSize="11" fill={AX}>②湿り</text>
        {/* 復水器→ポンプ 状態3 */}
        <path d="M240,150 L120,150 Q80,150 75,108" fill="none" stroke={AX} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="160" y="146" fontSize="11" fill={AX} textAnchor="middle">③飽和液</text>
        {/* ポンプ→ボイラ 状態4 */}
        <path d="M65,80 L65,55 Q65,42 65,120" fill="none" stroke={AX} strokeWidth="0" />
        <path d="M55,95 L40,95" fill="none" stroke="none" />
        <path d="M65,80 L65,116" fill="none" stroke={AX} strokeWidth="2" markerEnd="url(#arr)" />
        <text x="78" y="110" fontSize="11" fill={AX}>④加圧液</text>
      </svg>
      <Caption>水が①②③④を一巡する閉ループ。<b>受熱 q_in=h₁−h₄</b>、タービン仕事 w_t=h₁−h₂、放熱 q_out=h₂−h₃、ポンプ仕事 w_p=h₄−h₃。</Caption>
    </figure>
  )
}

// 複合サイクル: 上段ブレイトンの排熱で下段ランキンを駆動するエネルギーカスケード
function CombinedCascade() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 320 230" width="100%" role="img" aria-label="ブレイトン・ランキン複合サイクルのエネルギーフロー">
        <Defs />
        {/* 投入熱 Q_in（上から） */}
        <path d="M150,8 L150,28" stroke={RED} strokeWidth="3" markerEnd="url(#arrR)" />
        <text x="160" y="20" fontSize="12" fill={RED}>Q_in</text>
        {/* 上段ブレイトン（ガスタービン） */}
        <rect x="70" y="30" width="160" height="55" fill={FILL} stroke={RED} strokeWidth="2" rx="5" />
        <text x="150" y="52" fontSize="13" fill={RED} textAnchor="middle">上段 ブレイトン</text>
        <text x="150" y="70" fontSize="11" fill={RED} textAnchor="middle">η_top</text>
        {/* 上段の仕事（右へ） */}
        <path d="M230,52 L300,52" stroke={AX} strokeWidth="2.5" markerEnd="url(#arr)" />
        <text x="298" y="44" fontSize="11" fill={AX} textAnchor="end">W_top = η_top·Q_in</text>
        {/* 上段排熱→下段受熱 */}
        <path d="M150,85 L150,118" stroke={RED} strokeWidth="3" strokeDasharray="6 3" markerEnd="url(#arrR)" />
        <text x="160" y="106" fontSize="11" fill={RED}>(1−η_top)·Q_in</text>
        <text x="150" y="132" fontSize="10" fill={AX} textAnchor="middle">上段排熱 = 下段受熱</text>
        {/* 下段ランキン */}
        <rect x="70" y="138" width="160" height="55" fill="#eff6ff" stroke={BLUE} strokeWidth="2" rx="5" />
        <text x="150" y="160" fontSize="13" fill={BLUE} textAnchor="middle">下段 ランキン</text>
        <text x="150" y="178" fontSize="11" fill={BLUE} textAnchor="middle">η_bottom</text>
        {/* 下段の仕事（右へ） */}
        <path d="M230,160 L300,160" stroke={BLUE} strokeWidth="2.5" markerEnd="url(#arrB)" />
        <text x="298" y="152" fontSize="11" fill={BLUE} textAnchor="end">W_bot = (1−η_top)η_bottom·Q_in</text>
        {/* 最終放熱 */}
        <path d="M150,193 L150,218" stroke={BLUE} strokeWidth="2.5" markerEnd="url(#arrB)" />
        <text x="160" y="212" fontSize="11" fill={BLUE}>Q_out</text>
      </svg>
      <Caption>投入熱 Q_in のうち上段が η_top を仕事に変え、残り (1−η_top) を下段へ渡す。下段はそこから η_bottom を取り出す。<b>合成効率 = η_top + (1−η_top)·η_bottom</b>。</Caption>
    </figure>
  )
}

export default {
  'wet-dome': WetDome,
  'rankine-ts': RankineTs,
  'rankine-loop': RankineLoop,
  'combined-cascade': CombinedCascade,
}
