import { CollectionState, useApiCollection } from './api'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const { items, loading, error } = useApiCollection(apiUrl)
  return <section><div className="view-heading"><p className="eyebrow">Together</p><h1>Teams</h1></div><CollectionState loading={loading} error={error} items={items} emptyMessage="No teams created yet."><div className="row g-3">{items.map((team) => <article className="col-md-6 col-lg-4" key={team._id}><div className="data-card"><p className="eyebrow">Team</p><h2>{team.name}</h2><p>{team.members?.length ?? 0} members</p></div></article>)}</div></CollectionState></section>
}