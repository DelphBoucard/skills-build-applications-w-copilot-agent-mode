import { CollectionState, useApiCollection } from './api'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

export default function Workouts() {
  const { items, loading, error } = useApiCollection(apiUrl)
  return <section><div className="view-heading"><p className="eyebrow">Suggested sessions</p><h1>Workouts</h1></div><CollectionState loading={loading} error={error} items={items} emptyMessage="No workouts available yet."><div className="row g-3">{items.map((workout) => <article className="col-md-6 col-lg-4" key={workout._id}><div className="data-card"><div className="d-flex justify-content-between gap-3"><h2>{workout.title}</h2><span className="badge text-bg-success">{workout.difficulty}</span></div><p>{workout.estimatedMinutes} min</p><ul>{workout.exercises?.map((exercise) => <li key={exercise}>{exercise}</li>)}</ul></div></article>)}</div></CollectionState></section>
}