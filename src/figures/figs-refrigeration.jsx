import { Caption } from './index.jsx'

// 冷凍サイクルセクションの図。light テーマ前提・viewBox で伸縮。
// 主線 #2563eb / 補助 #475569 / 強調 #b91c1c / 面 #dbeafe
// キャプションはプレーン Unicode のみ（$…$ / LaTeX / {…} 禁止）。強調は <b>。

const AX = '#475569'
const BLUE = '#2563eb'
const RED = '#b91c1c'
const FILL = '#dbeafe'

function Defs() {
  return (
    <defs>
      <marker id="arrR" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={AX} />
      </marker>
      <marker id="arrRed" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={RED} />
      </marker>
      <marker id="arrBlue" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={BLUE} />
      </marker>
    </defs>
  )
}

// 逆カルノー冷凍機の T-s 線図（反時計回りの長方形サイクル）
// 4→1 蒸発(等温吸熱 q_L, 低温 T_L), 1→2 断熱圧縮, 2→3 凝縮(等温放熱 q_H, 高温 T_H), 3→4 断熱膨張
function ReverseCarnotTs() {
  // 長方形の4隅（s小=左, s大=右 / T低=下, T高=上）
  const sL = 90, sR = 250, tH = 50, tL = 140
  return (
    <figure className="figure">
      <svg viewBox="0 0 330 220" width="100%" role="img" aria-label="逆カルノー冷凍機の T-s 線図">
        <Defs />
        {/* 軸 */}
        <line x1="50" y1="185" x2="310" y2="185" stroke={AX} strokeWidth="1.5" markerEnd="url(#arrR)" />
        <line x1="50" y1="185" x2="50" y2="25" stroke={AX} strokeWidth="1.5" markerEnd="url(#arrR)" />
        <text x="308" y="203" fontSize="13" fill={AX} textAnchor="end">s（エントロピー）</text>
        <text x="42" y="26" fontSize="13" fill={AX} textAnchor="end">T</text>

        {/* 温度レベルの破線 */}
        <line x1="50" y1={tH} x2={sR} y2={tH} stroke={AX} strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="50" y1={tL} x2={sR} y2={tL} stroke={AX} strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="44" y={tH + 4} fontSize="12" fill={RED} textAnchor="end">T_H</text>
        <text x="44" y={tL + 4} fontSize="12" fill={BLUE} textAnchor="end">T_L</text>

        {/* 高温放熱の面 q_H（上辺の下の薄塗り）と低温吸熱の面 q_L */}
        <rect x={sL} y={tL} width={sR - sL} height={185 - tL} fill={FILL} opacity="0.7" />

        {/* サイクル長方形 */}
        <polygon points={`${sL},${tL} ${sR},${tL} ${sR},${tH} ${sL},${tH}`}
          fill="none" stroke={AX} strokeWidth="2" />

        {/* 反時計回りの矢印（冷凍機＝逆向き） */}
        {/* 4→1 低温等温吸熱（右向き、下辺） */}
        <path d={`M${sL + 18},${tL} L${sR - 18},${tL}`} stroke={BLUE} strokeWidth="2.5" markerEnd="url(#arrBlue)" />
        {/* 1→2 断熱圧縮（上向き、右辺） */}
        <path d={`M${sR},${tL - 12} L${sR},${tH + 12}`} stroke={AX} strokeWidth="2" markerEnd="url(#arrR)" />
        {/* 2→3 高温等温放熱（左向き、上辺） */}
        <path d={`M${sR - 18},${tH} L${sL + 18},${tH}`} stroke={RED} strokeWidth="2.5" markerEnd="url(#arrRed)" />
        {/* 3→4 断熱膨張（下向き、左辺） */}
        <path d={`M${sL},${tH + 12} L${sL},${tL - 12}`} stroke={AX} strokeWidth="2" markerEnd="url(#arrR)" />

        {/* 状態点ラベル */}
        <text x={sL - 6} y={tL + 14} fontSize="12" fill={AX} textAnchor="end">4</text>
        <text x={sR + 6} y={tL + 14} fontSize="12" fill={AX}>1</text>
        <text x={sR + 6} y={tH - 4} fontSize="12" fill={AX}>2</text>
        <text x={sL - 6} y={tH - 4} fontSize="12" fill={AX} textAnchor="end">3</text>

        {/* 熱ラベル */}
        <text x={(sL + sR) / 2} y={tL + 18} fontSize="12" fill={BLUE} textAnchor="middle">q_L 吸熱（冷却）</text>
        <text x={(sL + sR) / 2} y={tH - 6} fontSize="12" fill={RED} textAnchor="middle">q_H 放熱</text>
      </svg>
      <Caption>逆カルノーは反時計回り。低温 T_L で熱 q_L を汲み上げ、仕事 w を足して高温 T_H へ q_H を捨てる。長方形の各辺は 等温／断熱。<b>COP_R = T_L / (T_H − T_L)</b>。</Caption>
    </figure>
  )
}

// 蒸気圧縮冷凍サイクルの p-h 線図（飽和ドームつき）
// 1 蒸発器出口(乾き飽和蒸気) → 2 圧縮機出口(過熱) → 3 凝縮器出口(飽和液) → 4 膨張弁出口(湿り) → 1
function VaporCompressionPh() {
  // 状態点（svg 座標）。yLow=低圧（蒸発, 下側）, yHigh=高圧（凝縮, 上側）
  const yLow = 150, yHigh = 65
  const x4 = 110, x1 = 210, x2 = 270, x3 = 110
  return (
    <figure className="figure">
      <svg viewBox="0 0 330 220" width="100%" role="img" aria-label="蒸気圧縮冷凍サイクルの p-h 線図">
        <Defs />
        {/* 軸 */}
        <line x1="50" y1="185" x2="312" y2="185" stroke={AX} strokeWidth="1.5" markerEnd="url(#arrR)" />
        <line x1="50" y1="185" x2="50" y2="25" stroke={AX} strokeWidth="1.5" markerEnd="url(#arrR)" />
        <text x="310" y="203" fontSize="13" fill={AX} textAnchor="end">h（比エンタルピー）</text>
        <text x="44" y="26" fontSize="13" fill={AX} textAnchor="end">p</text>

        {/* 飽和ドーム（左：飽和液線、右：飽和蒸気線） */}
        <path d="M70,185 C95,80 120,40 150,38 C185,40 215,90 240,185"
          fill="none" stroke={AX} strokeWidth="1.5" />
        <text x="100" y="70" fontSize="11" fill={AX}>飽和液線</text>
        <text x="205" y="70" fontSize="11" fill={AX} textAnchor="end">飽和蒸気線</text>
        <text x="150" y="34" fontSize="11" fill={AX} textAnchor="middle">臨界点</text>

        {/* 圧力レベルの破線 */}
        <line x1="50" y1={yLow} x2="300" y2={yLow} stroke={BLUE} strokeWidth="0.8" strokeDasharray="3 3" />
        <line x1="50" y1={yHigh} x2="300" y2={yHigh} stroke={RED} strokeWidth="0.8" strokeDasharray="3 3" />
        <text x="304" y={yLow + 4} fontSize="11" fill={BLUE}>p_L</text>
        <text x="304" y={yHigh + 4} fontSize="11" fill={RED}>p_H</text>

        {/* サイクル経路 */}
        {/* 4→1 蒸発器：等圧受熱（下辺右向き、湿り→乾き飽和蒸気） */}
        <path d={`M${x4},${yLow} L${x1},${yLow}`} stroke={BLUE} strokeWidth="2.5" markerEnd="url(#arrBlue)" />
        {/* 1→2 圧縮機：断熱圧縮（右上がり、過熱域へ） */}
        <path d={`M${x1},${yLow} L${x2},${yHigh}`} stroke={AX} strokeWidth="2.5" markerEnd="url(#arrR)" />
        {/* 2→3 凝縮器：等圧放熱（上辺左向き） */}
        <path d={`M${x2},${yHigh} L${x3},${yHigh}`} stroke={RED} strokeWidth="2.5" markerEnd="url(#arrRed)" />
        {/* 3→4 膨張弁：等エンタルピー絞り（左辺 鉛直に降下、h 一定） */}
        <path d={`M${x3},${yHigh} L${x4},${yLow}`} stroke={AX} strokeWidth="2.5" strokeDasharray="5 3" markerEnd="url(#arrR)" />

        {/* 状態点 */}
        {[[x1, yLow], [x2, yHigh], [x3, yHigh], [x4, yLow]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3.5" fill={AX} />
        ))}
        <text x={x1 + 6} y={yLow + 14} fontSize="12" fill={AX}>1</text>
        <text x={x2 + 6} y={yHigh - 4} fontSize="12" fill={AX}>2</text>
        <text x={x3 - 6} y={yHigh - 4} fontSize="12" fill={AX} textAnchor="end">3</text>
        <text x={x4 - 6} y={yLow + 14} fontSize="12" fill={AX} textAnchor="end">4</text>

        {/* 量ラベル */}
        <text x={(x4 + x1) / 2} y={yLow + 16} fontSize="11" fill={BLUE} textAnchor="middle">q_L = h₁ − h₄</text>
        <text x={(x2 + x3) / 2} y={yHigh - 7} fontSize="11" fill={RED} textAnchor="middle">q_H = h₂ − h₃</text>
        <text x={x2 + 4} y={(yLow + yHigh) / 2} fontSize="11" fill={AX}>w = h₂ − h₁</text>
        <text x={x4 - 4} y={(yLow + yHigh) / 2} fontSize="11" fill={AX} textAnchor="end">h₃ = h₄</text>
      </svg>
      <Caption>p-h 線図。膨張弁 3→4 は <b>等エンタルピー（h₃ = h₄、垂直の点線）</b>。蒸発器で q_L = h₁ − h₄ を受け、圧縮機で w = h₂ − h₁ を与え、凝縮器で q_H を捨てる。横幅がそのまま各量。</Caption>
    </figure>
  )
}

// 蒸気圧縮冷凍機の機器系統図（4機器のループ）
function VaporCompressionLoop() {
  return (
    <figure className="figure">
      <svg viewBox="0 0 340 210" width="100%" role="img" aria-label="蒸気圧縮冷凍サイクルの機器系統図">
        <Defs />
        {/* 配管ループ（時計回り）：蒸発器(左下)→圧縮機(左上)→凝縮器(右上)→膨張弁(右下)→蒸発器 */}
        {/* 機器ボックス */}
        {/* 蒸発器（左下, 低温・吸熱） */}
        <rect x="30" y="135" width="70" height="45" fill={FILL} stroke={BLUE} strokeWidth="2" />
        <text x="65" y="153" fontSize="12" fill={AX} textAnchor="middle">蒸発器</text>
        <text x="65" y="170" fontSize="10" fill={BLUE} textAnchor="middle">等圧受熱 q_L</text>
        {/* 圧縮機（左上, 仕事入力） */}
        <rect x="30" y="30" width="70" height="45" fill="#fff" stroke={AX} strokeWidth="2" />
        <text x="65" y="48" fontSize="12" fill={AX} textAnchor="middle">圧縮機</text>
        <text x="65" y="65" fontSize="10" fill={AX} textAnchor="middle">断熱 w=h₂−h₁</text>
        {/* 凝縮器（右上, 高温・放熱） */}
        <rect x="240" y="30" width="70" height="45" fill="#fee2e2" stroke={RED} strokeWidth="2" />
        <text x="275" y="48" fontSize="12" fill={AX} textAnchor="middle">凝縮器</text>
        <text x="275" y="65" fontSize="10" fill={RED} textAnchor="middle">等圧放熱 q_H</text>
        {/* 膨張弁（右下） */}
        <rect x="240" y="135" width="70" height="45" fill="#fff" stroke={AX} strokeWidth="2" />
        <text x="275" y="153" fontSize="12" fill={AX} textAnchor="middle">膨張弁</text>
        <text x="275" y="170" fontSize="10" fill={AX} textAnchor="middle">絞り h₃=h₄</text>

        {/* 配管＋流れの矢印 */}
        {/* 蒸発器→圧縮機（左辺上向き, 点1） */}
        <path d="M65,135 L65,75" stroke={AX} strokeWidth="2" markerEnd="url(#arrR)" />
        <text x="58" y="108" fontSize="11" fill={BLUE} textAnchor="end">①</text>
        {/* 圧縮機→凝縮器（上辺右向き, 点2 過熱蒸気） */}
        <path d="M100,52 L240,52" stroke={AX} strokeWidth="2" markerEnd="url(#arrR)" />
        <text x="170" y="44" fontSize="11" fill={RED} textAnchor="middle">②</text>
        {/* 凝縮器→膨張弁（右辺下向き, 点3 飽和液） */}
        <path d="M275,75 L275,135" stroke={AX} strokeWidth="2" markerEnd="url(#arrR)" />
        <text x="282" y="108" fontSize="11" fill={AX}>③</text>
        {/* 膨張弁→蒸発器（下辺左向き, 点4 湿り蒸気） */}
        <path d="M240,157 L100,157" stroke={AX} strokeWidth="2" markerEnd="url(#arrR)" />
        <text x="170" y="151" fontSize="11" fill={BLUE} textAnchor="middle">④</text>

        {/* 仕事入力の矢印 */}
        <path d="M12,52 L30,52" stroke={RED} strokeWidth="2" markerEnd="url(#arrRed)" />
        <text x="6" y="40" fontSize="10" fill={RED}>w</text>
      </svg>
      <Caption>4機器を冷媒が循環。①蒸発器(低温で吸熱)→②圧縮機(仕事 w 入力)→③凝縮器(高温で放熱)→④膨張弁(絞り)。低温側の熱を高温側へ「移動」させる装置。<b>COP = q_L / w</b>。</Caption>
    </figure>
  )
}

export default {
  'reverse-carnot-ts': ReverseCarnotTs,
  'vapor-compression-ph': VaporCompressionPh,
  'vapor-compression-loop': VaporCompressionLoop,
}
