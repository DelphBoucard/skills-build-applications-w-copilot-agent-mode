import { CollectionState, useApiCollection } from './api'

export default function Leaderboard({ endpoint = '/api/leaderboard/' }) {
  const { items, loading, error } = useApiCollection(endpoint)
  const standings = [...items].sort((first, second) => second.score - first.score)
  return <section><div className="view-heading"><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div><CollectionState loading={loading} error={error} items={standings} emptyMessage="No standings yet."><ol className="standings">{standings.map((entry, index) => <li key={entry._id}><span className="rank">{String(index + 1).padStart(2, '0')}</span><span><strong>{entry.team?.name ?? entry.team}</strong><small>{entry.period}</small></span><strong>{entry.score} pts</strong></li>)}</ol></CollectionState></section>
}