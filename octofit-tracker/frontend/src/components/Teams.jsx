import { CollectionState, useApiCollection } from './api'

const endpoint = '/api/teams/'

export default function Teams() {
  const { items, loading, error } = useApiCollection(endpoint)
  return <section><div className="view-heading"><p className="eyebrow">Together</p><h1>Teams</h1></div><CollectionState loading={loading} error={error} items={items} emptyMessage="No teams created yet."><div className="row g-3">{items.map((team) => <article className="col-md-6 col-lg-4" key={team._id}><div className="data-card"><p className="eyebrow">Team</p><h2>{team.name}</h2><p>{team.members?.length ?? 0} members</p></div></article>)}</div></CollectionState></section>
}