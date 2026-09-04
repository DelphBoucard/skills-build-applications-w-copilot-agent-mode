import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const navigation = [
  { label: 'Users', path: '/users', Component: Users },
  { label: 'Activities', path: '/activities', Component: Activities },
  { label: 'Teams', path: '/teams', Component: Teams },
  { label: 'Leaderboard', path: '/leaderboard', Component: Leaderboard },
  { label: 'Workouts', path: '/workouts', Component: Workouts },
]

export default function App() {
  return (
    <div className="app-shell">
      <header className="topbar"><div className="container d-flex align-items-center justify-content-between"><NavLink className="brand" to="/users"><img src={logo} alt="OctoFit" /><span>OctoFit</span></NavLink><span className="status-dot">Live tracker</span></div></header>
      <nav className="navigation" aria-label="Main navigation"><div className="container d-flex gap-1 overflow-auto">{navigation.map(({ label, path }) => <NavLink className="nav-link" key={path} to={path}>{label}</NavLink>)}</div></nav>
      <main className="container content"><Routes>{navigation.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}<Route path="*" element={<Navigate to="/users" replace />} /></Routes></main>
    </div>
  )
}
