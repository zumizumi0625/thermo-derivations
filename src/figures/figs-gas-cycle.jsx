import { Caption } from './index.jsx'

// ガスサイクル（カルノー/オットー/ディーゼル/ブレイトン）セクションの図。
// 各サイクルは p-v 線図と T-s 線図を並べ、状態点1234と過程名つき。
// light テーマ前提・viewBox で伸縮。
// 主線 #2563eb / 補助 #475569 / 強調 #b91c1c / 面 #dbeafe / 放熱 #0891b2

const AX = '#475569'
const BLUE = '#2563eb'
const RED = '#b91c1c'
const CYAN = '#0891b2'

function Defs() {
  return (
    <defs>
      <marker id="garr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L6,3 L0,6 Z" fill={AX} />
      </marker>
    </defs>
  )
}

// 共通の軸（左下原点、右と上に矢印）
function Axes({ xl, yl }) {
  return (
    <>
      <line x1="34" y1="172" x2="290" y2="172" stroke={AX} strokeWidth="1.5" markerEnd="url(#garr)" />
      <line x1="34" y1="172" x2="34" y2="18" stroke={AX} strokeWidth="1.5" markerEnd="url(#garr)" />
      <text x="288" y="190" fontSize="12" fill={AX} textAnchor="end">{xl}</text>
      <text x="26" y="20" fontSize="12" fill={AX} textAnchor="end">{yl}</text>
    </>
  )
}

// 状態点（小円＋ラベル）
function Pt({ x, y, label, dx = 0, dy = 0 }) {
  const px = Number(x), py = Number(y) // props が文字列でも数値演算に揃える（"70"+(-10) の文字列連結を防ぐ）
  return (
    <>
      <circle cx={px} cy={py} r="3.5" fill={RED} />
      <text x={px + dx} y={py + dy} fontSize="12" fill={RED} textAnchor="middle" fontWeight="bold">{label}</text>
    </>
  )
}

// 二図を横並びにする小ヘルパ（1つの svg 内に2系統）
function Pair({ aria, children }) {
  return (
    <svg viewBox="0 0 640 200" width="100%" role="img" aria-label={aria}>
      <Defs />
      {children}
    </svg>
  )
}

// ---- カルノー: 2等温2断熱。p-v は双曲線2＋断熱2、T-s は長方形 ----
function CarnotDiagrams() {
  // p-v 側（左、x:0-300）等温=双曲線、断熱=より急な双曲線。簡易的に曲線で表現。
  // T-s 側（右、x:340-640）長方形
  return (
    <figure className="figure">
      <Pair aria="カルノーサイクルの p-v 線図と T-s 線図">
        {/* === p-v 線図（左） === */}
        <g>
          <Axes xl="v" yl="p" />
          {/* 1→2 等温膨張（上の双曲線, 高温） */}
          <path d="M70,55 Q120,75 175,95" fill="none" stroke={BLUE} strokeWidth="2.5" />
          {/* 2→3 断熱膨張 */}
          <path d="M175,95 Q215,120 250,150" fill="none" stroke={RED} strokeWidth="2.5" />
          {/* 3→4 等温圧縮（下の双曲線, 低温） */}
          <path d="M250,150 Q190,140 135,130" fill="none" stroke={CYAN} strokeWidth="2.5" />
          {/* 4→1 断熱圧縮 */}
          <path d="M135,130 Q95,95 70,55" fill="none" stroke={RED} strokeWidth="2.5" strokeDasharray="5 3" />
          <Pt x="70" y="55" label="1" dx={-10} dy={2} />
          <Pt x="175" y="95" label="2" dx={10} dy={-4} />
          <Pt x="250" y="150" label="3" dx={10} dy={4} />
          <Pt x="135" y="130" label="4" dx={-10} dy={6} />
          <text x="100" y="50" fontSize="10.5" fill={BLUE}>等温膨張 q_H</text>
          <text x="232" y="128" fontSize="10.5" fill={RED}>断熱膨張</text>
          <text x="150" y="166" fontSize="10.5" fill={CYAN}>等温圧縮 q_L</text>
          <text x="150" y="14" fontSize="12" fill={AX} textAnchor="middle">p-v 線図</text>
        </g>
        {/* === T-s 線図（右）長方形 === */}
        <g transform="translate(340,0)">
          <Axes xl="s" yl="T" />
          {/* 高温等温（上辺 1→2）, 低温等温（下辺 3→4）, 断熱は鉛直 */}
          <line x1="80" y1="55" x2="220" y2="55" stroke={BLUE} strokeWidth="2.5" />
          <line x1="220" y1="55" x2="220" y2="140" stroke={RED} strokeWidth="2.5" />
          <line x1="220" y1="140" x2="80" y2="140" stroke={CYAN} strokeWidth="2.5" />
          <line x1="80" y1="140" x2="80" y2="55" stroke={RED} strokeWidth="2.5" strokeDasharray="5 3" />
          {/* 受熱面（薄く） */}
          <rect x="80" y="55" width="140" height="85" fill="#dbeafe" opacity="0.5" />
          <Pt x="80" y="55" label="1" dx={-10} dy={-2} />
          <Pt x="220" y="55" label="2" dx={10} dy={-2} />
          <Pt x="220" y="140" label="3" dx={10} dy={4} />
          <Pt x="80" y="140" label="4" dx={-10} dy={4} />
          <text x="150" y="48" fontSize="10.5" fill={BLUE} textAnchor="middle">T_H（受熱 q_H=T_H Δs）</text>
          <text x="150" y="155" fontSize="10.5" fill={CYAN} textAnchor="middle">T_L（放熱 q_L=T_L Δs）</text>
          <text x="150" y="14" fontSize="12" fill={AX} textAnchor="middle">T-s 線図（長方形）</text>
        </g>
      </Pair>
      <Caption>カルノー＝2等温2断熱。T-s では <b>横幅 Δs・高さ T の長方形</b>になり、囲む面積が正味仕事。受熱 q_H=T_H·Δs、放熱 q_L=T_L·Δs から η=1−T_L/T_H。</Caption>
    </figure>
  )
}

// ---- オットー: 2断熱2等積。p-v は断熱2＋鉛直2、T-s は断熱(鉛直)2＋等積曲線2 ----
function OttoDiagrams() {
  return (
    <figure className="figure">
      <Pair aria="オットーサイクルの p-v 線図と T-s 線図">
        {/* === p-v 線図（左）: 等積=鉛直線、断熱=曲線 === */}
        <g>
          <Axes xl="v" yl="p" />
          {/* 状態: 1(大v,低p) 2(小v,中p) 3(小v,高p) 4(大v,中低p) */}
          {/* 1→2 断熱圧縮（曲線） */}
          <path d="M230,150 Q140,135 90,70" fill="none" stroke={RED} strokeWidth="2.5" />
          {/* 2→3 等積受熱（鉛直, v=v2） */}
          <line x1="90" y1="70" x2="90" y2="35" stroke={BLUE} strokeWidth="2.5" />
          {/* 3→4 断熱膨張（曲線） */}
          <path d="M90,35 Q150,75 230,115" fill="none" stroke={RED} strokeWidth="2.5" />
          {/* 4→1 等積放熱（鉛直, v=v1） */}
          <line x1="230" y1="115" x2="230" y2="150" stroke={CYAN} strokeWidth="2.5" />
          <Pt x="230" y="150" label="1" dx={12} dy={4} />
          <Pt x="90" y="70" label="2" dx={-10} dy={-2} />
          <Pt x="90" y="35" label="3" dx={-10} dy={-2} />
          <Pt x="230" y="115" label="4" dx={12} dy={2} />
          <text x="150" y="120" fontSize="10.5" fill={RED}>断熱圧縮</text>
          <text x="96" y="30" fontSize="10.5" fill={BLUE}>等積受熱 q_H</text>
          <text x="150" y="70" fontSize="10.5" fill={RED}>断熱膨張</text>
          <text x="238" y="135" fontSize="10.5" fill={CYAN}>等積放熱 q_L</text>
          <text x="150" y="14" fontSize="12" fill={AX} textAnchor="middle">p-v 線図</text>
        </g>
        {/* === T-s 線図（右）: 断熱=鉛直、等積=右上がり曲線 === */}
        <g transform="translate(340,0)">
          <Axes xl="s" yl="T" />
          {/* 1→2 断熱（鉛直, s一定, 左側） */}
          <line x1="80" y1="150" x2="80" y2="110" stroke={RED} strokeWidth="2.5" />
          {/* 2→3 等積受熱（右上がり曲線） */}
          <path d="M80,110 Q150,80 220,50" fill="none" stroke={BLUE} strokeWidth="2.5" />
          {/* 3→4 断熱（鉛直, 右側） */}
          <line x1="220" y1="50" x2="220" y2="90" stroke={RED} strokeWidth="2.5" />
          {/* 4→1 等積放熱（右上がり曲線, 下側へ戻る） */}
          <path d="M220,90 Q150,120 80,150" fill="none" stroke={CYAN} strokeWidth="2.5" />
          <Pt x="80" y="150" label="1" dx={-10} dy={6} />
          <Pt x="80" y="110" label="2" dx={-10} dy={-2} />
          <Pt x="220" y="50" label="3" dx={10} dy={-2} />
          <Pt x="220" y="90" label="4" dx={12} dy={2} />
          <text x="150" y="14" fontSize="12" fill={AX} textAnchor="middle">T-s 線図</text>
        </g>
      </Pair>
      <Caption>オットー＝2断熱2等積（火花点火機関）。圧縮比 ε=v₁/v₂。受熱・放熱は等積なので <b>cᵥ·ΔT</b>。断熱の Tv^(κ−1)=const から温度比が ε^(κ−1) になり η=1−ε^−(κ−1)。</Caption>
    </figure>
  )
}

// ---- ディーゼル: 断熱圧縮→等圧受熱→断熱膨張→等積放熱 ----
function DieselDiagrams() {
  return (
    <figure className="figure">
      <Pair aria="ディーゼルサイクルの p-v 線図と T-s 線図">
        {/* === p-v 線図（左） === */}
        <g>
          <Axes xl="v" yl="p" />
          {/* 1(大v,低p) 2(小v,高p) 3(中v,高p・等圧で右へ) 4(大v,中低p) */}
          {/* 1→2 断熱圧縮 */}
          <path d="M235,150 Q140,135 85,50" fill="none" stroke={RED} strokeWidth="2.5" />
          {/* 2→3 等圧受熱（水平線, p一定で右へ v2→v3） */}
          <line x1="85" y1="50" x2="150" y2="50" stroke={BLUE} strokeWidth="2.5" />
          {/* 3→4 断熱膨張 */}
          <path d="M150,50 Q200,90 235,115" fill="none" stroke={RED} strokeWidth="2.5" />
          {/* 4→1 等積放熱（鉛直 v=v1） */}
          <line x1="235" y1="115" x2="235" y2="150" stroke={CYAN} strokeWidth="2.5" />
          <Pt x="235" y="150" label="1" dx={12} dy={4} />
          <Pt x="85" y="50" label="2" dx={-10} dy={-2} />
          <Pt x="150" y="50" label="3" dx={6} dy={-6} />
          <Pt x="235" y="115" label="4" dx={12} dy={2} />
          <text x="150" y="116" fontSize="10.5" fill={RED}>断熱圧縮</text>
          <text x="86" y="42" fontSize="10.5" fill={BLUE}>等圧受熱 q_H</text>
          <text x="178" y="82" fontSize="10.5" fill={RED}>断熱膨張</text>
          <text x="243" y="135" fontSize="10.5" fill={CYAN}>等積放熱 q_L</text>
          <text x="150" y="14" fontSize="12" fill={AX} textAnchor="middle">p-v 線図</text>
        </g>
        {/* === T-s 線図（右）: 断熱=鉛直, 等圧=右上がり曲線, 等積=右上がり曲線 === */}
        <g transform="translate(340,0)">
          <Axes xl="s" yl="T" />
          {/* 1→2 断熱（鉛直） */}
          <line x1="80" y1="148" x2="80" y2="108" stroke={RED} strokeWidth="2.5" />
          {/* 2→3 等圧受熱（右上がり曲線, 上端へ） */}
          <path d="M80,108 Q150,78 215,52" fill="none" stroke={BLUE} strokeWidth="2.5" />
          {/* 3→4 断熱（鉛直） */}
          <line x1="215" y1="52" x2="215" y2="92" stroke={RED} strokeWidth="2.5" />
          {/* 4→1 等積放熱（右上がり曲線, 戻る。等積は等圧より急） */}
          <path d="M215,92 Q150,128 80,148" fill="none" stroke={CYAN} strokeWidth="2.5" />
          <Pt x="80" y="148" label="1" dx={-10} dy={6} />
          <Pt x="80" y="108" label="2" dx={-10} dy={-2} />
          <Pt x="215" y="52" label="3" dx={10} dy={-2} />
          <Pt x="215" y="92" label="4" dx={12} dy={2} />
          <text x="150" y="14" fontSize="12" fill={AX} textAnchor="middle">T-s 線図</text>
        </g>
      </Pair>
      <Caption>ディーゼル＝断熱圧縮→<b>等圧受熱</b>→断熱膨張→等積放熱（圧縮着火）。締切比 σ=v₃/v₂。受熱は cₚ・放熱は cᵥ なので比に κ が残り、補正項 (σ^κ−1)/(κ(σ−1)) が付く。σ→1 でオットーに一致。</Caption>
    </figure>
  )
}

// ---- ブレイトン: 2断熱2等圧（ガスタービン） ----
function BraytonDiagrams() {
  return (
    <figure className="figure">
      <Pair aria="ブレイトンサイクルの p-v 線図と T-s 線図">
        {/* === p-v 線図（左）: 等圧=水平線、断熱=曲線 === */}
        <g>
          <Axes xl="v" yl="p" />
          {/* 1(大v,低p) 2(小v,高p) 3(中v,高p) 4(大大v,低p) */}
          {/* 1→2 断熱圧縮（高p, 小vへ） */}
          <path d="M170,140 Q105,120 75,60" fill="none" stroke={RED} strokeWidth="2.5" />
          {/* 2→3 等圧受熱（高pの水平線, 右へ） */}
          <line x1="75" y1="60" x2="160" y2="60" stroke={BLUE} strokeWidth="2.5" />
          {/* 3→4 断熱膨張（低pへ, 大vへ） */}
          <path d="M160,60 Q230,110 270,150" fill="none" stroke={RED} strokeWidth="2.5" />
          {/* 4→1 等圧放熱（低pの水平線, 戻る） */}
          <line x1="270" y1="150" x2="170" y2="140" stroke={CYAN} strokeWidth="2.5" />
          <Pt x="170" y="140" label="1" dx={-2} dy={14} />
          <Pt x="75" y="60" label="2" dx={-10} dy={-2} />
          <Pt x="160" y="60" label="3" dx={8} dy={-6} />
          <Pt x="270" y="150" label="4" dx={10} dy={6} />
          <text x="100" y="100" fontSize="10.5" fill={RED}>断熱圧縮</text>
          <text x="80" y="52" fontSize="10.5" fill={BLUE}>等圧受熱 q_H</text>
          <text x="208" y="100" fontSize="10.5" fill={RED}>断熱膨張</text>
          <text x="200" y="158" fontSize="10.5" fill={CYAN}>等圧放熱 q_L</text>
          <text x="150" y="14" fontSize="12" fill={AX} textAnchor="middle">p-v 線図</text>
        </g>
        {/* === T-s 線図（右）: 断熱=鉛直, 等圧=右上がり曲線 === */}
        <g transform="translate(340,0)">
          <Axes xl="s" yl="T" />
          {/* 1→2 断熱（鉛直, 左） */}
          <line x1="80" y1="145" x2="80" y2="105" stroke={RED} strokeWidth="2.5" />
          {/* 2→3 等圧受熱（高圧線, 右上がり曲線） */}
          <path d="M80,105 Q150,75 220,52" fill="none" stroke={BLUE} strokeWidth="2.5" />
          {/* 3→4 断熱（鉛直, 右） */}
          <line x1="220" y1="52" x2="220" y2="98" stroke={RED} strokeWidth="2.5" />
          {/* 4→1 等圧放熱（低圧線, 右上がり曲線, 戻る） */}
          <path d="M220,98 Q150,128 80,145" fill="none" stroke={CYAN} strokeWidth="2.5" />
          <Pt x="80" y="145" label="1" dx={-10} dy={6} />
          <Pt x="80" y="105" label="2" dx={-10} dy={-2} />
          <Pt x="220" y="52" label="3" dx={10} dy={-2} />
          <Pt x="220" y="98" label="4" dx={12} dy={2} />
          <text x="150" y="14" fontSize="12" fill={AX} textAnchor="middle">T-s 線図</text>
        </g>
      </Pair>
      <Caption>ブレイトン＝2断熱2等圧（ガスタービン）。圧力比 π=p₂/p₁。受熱・放熱とも等圧で <b>cₚ·ΔT</b>。断熱の T∝p^((κ−1)/κ) から温度比が π^((κ−1)/κ) になり η=1−π^−((κ−1)/κ)。</Caption>
    </figure>
  )
}

export default {
  'carnot-diagrams': CarnotDiagrams,
  'otto-diagrams': OttoDiagrams,
  'diesel-diagrams': DieselDiagrams,
  'brayton-diagrams': BraytonDiagrams,
}
