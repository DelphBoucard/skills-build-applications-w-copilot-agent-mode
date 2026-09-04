import { CollectionState, useApiCollection } from './api'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

export default function Leaderboard() {
  const { items, loading, error } = useApiCollection(apiUrl)
  const standings = [...items].sort((first, second) => second.score - first.score)
  return <section><div className="view-heading"><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div><CollectionState loading={loading} error={error} items={standings} emptyMessage="No standings yet."><ol className="standings">{standings.map((entry, index) => <li key={entry._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span><strong>{entry.team?.name ?? entry.team}</strong><small>{entry.period}</small></span><strong>{entry.score} pts</strong></li>)}</ol></CollectionState></section>
}