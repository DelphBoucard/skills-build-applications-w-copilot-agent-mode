import { CollectionState, useApiCollection } from './api'

export default function Activities() {
  const { items, loading, error } = useApiCollection('activities')
  return <section><div className="view-heading"><p className="eyebrow">Training log</p><h1>Activities</h1></div><CollectionState loading={loading} error={error} items={items} emptyMessage="No activities recorded yet."><div className="table-responsive"><table className="table align-middle"><thead><tr><th>Activity</th><th>Duration</th><th>Completed</th></tr></thead><tbody>{items.map((activity) => <tr key={activity._id}><td className="fw-semibold">{activity.type}</td><td>{activity.durationMinutes} min</td><td>{new Date(activity.completedAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></CollectionState></section>
}