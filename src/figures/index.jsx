// 図レジストリ。各セクションは figs-<section>.jsx を作り、
//   export default { 'fig-id': FigComponent, ... }
// の形で図を登録する。ここでは glob で全モジュールを集約し、id → component に統合。
// → セクションごとに別ファイルなので、並列ジョブが衝突せずに図を足せる。

const modules = import.meta.glob('./figs-*.jsx', { eager: true })

const REGISTRY = {}
for (const mod of Object.values(modules)) {
  const map = mod.default || {}
  for (const [id, Comp] of Object.entries(map)) REGISTRY[id] = Comp
}

export default function Figure({ id }) {
  const Comp = REGISTRY[id]
  if (!Comp) {
    return (
      <div className="fig-missing" role="note">
        （図 <code>{id}</code> は準備中）
      </div>
    )
  }
  return <Comp />
}

// 共通キャプション（各 figs-*.jsx から import して使う）
export function Caption({ children }) {
  return <figcaption className="fig-caption">{children}</figcaption>
}
