import { CollectionState, useApiCollection } from './api'

const apiUrl = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

export default function Users() {
  const { items, loading, error } = useApiCollection(apiUrl)
  return <section><div className="view-heading"><p className="eyebrow">Community</p><h1>Members</h1></div><CollectionState loading={loading} error={error} items={items} emptyMessage="No members yet."><div className="row g-3">{items.map((user) => <article className="col-md-6" key={user._id ?? user.email}><div className="member-card"><div className="avatar">{user.avatarUrl ? <img src={user.avatarUrl} alt="" /> : user.displayName?.slice(0, 1)}</div><div><h2>{user.displayName}</h2><p>{user.email}</p></div></div></article>)}</div></CollectionState></section>
}