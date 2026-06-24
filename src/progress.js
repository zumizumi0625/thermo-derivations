import { useEffect, useState } from 'react'

// 進捗状態は3段階（テザーの3周メソッドに対応）。
// todo=未着手 / review=復習中（写経・見ながら済） / done=習得（見ずに再現できる）
export const STATES = ['todo', 'review', 'done']
export const STATE_META = {
  todo: { label: '未着手', mark: '⬜', cls: 'st-todo' },
  review: { label: '復習中', mark: '🔁', cls: 'st-review' },
  done: { label: '習得', mark: '✅', cls: 'st-done' },
}

const KEY = 'fmd-progress-v1'

export function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '{}')
  } catch {
    return {}
  }
}

function saveProgress(obj) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj))
  } catch {
    /* ignore quota / private mode */
  }
}

// 複数コンポーネント間で進捗を同期するための簡易ストア（外部購読）。
const listeners = new Set()
let store = typeof window !== 'undefined' ? loadProgress() : {}

export function getState(id) {
  return store[id] || 'todo'
}

export function setState(id, state) {
  store = { ...store, [id]: state }
  saveProgress(store)
  listeners.forEach((fn) => fn())
}

export function cycleState(id) {
  const cur = getState(id)
  const next = STATES[(STATES.indexOf(cur) + 1) % STATES.length]
  setState(id, next)
  return next
}

// 進捗ストアを購読する hook。store が変わると再レンダリングされる。
export function useProgress() {
  const [, force] = useState(0)
  useEffect(() => {
    const fn = () => force((n) => n + 1)
    listeners.add(fn)
    // 別タブでの変更も拾う
    const onStorage = (e) => {
      if (e.key === KEY) {
        store = loadProgress()
        fn()
      }
    }
    window.addEventListener('storage', onStorage)
    return () => {
      listeners.delete(fn)
      window.removeEventListener('storage', onStorage)
    }
  }, [])
  return { getState, setState, cycleState }
}
