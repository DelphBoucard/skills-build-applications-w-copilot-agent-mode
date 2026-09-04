import { createElement, useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
export const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function extractItems(payload) {
  if (Array.isArray(payload)) return payload
  for (const key of ['items', 'results', 'data']) {
    if (Array.isArray(payload?.[key])) return payload[key]
  }
  return []
}

export function useApiCollection(endpoint) {
  const [state, setState] = useState({ items: [], loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    async function loadCollection() {
      try {
        const response = await fetch(`${apiOrigin}${endpoint}`, { signal: controller.signal })
        if (!response.ok) throw new Error(`Request failed (${response.status})`)
        setState({ items: extractItems(await response.json()), loading: false, error: '' })
      } catch (error) {
        if (error.name !== 'AbortError') setState({ items: [], loading: false, error: error.message })
      }
    }
    loadCollection()
    return () => controller.abort()
  }, [endpoint])

  return state
}

export function CollectionState({ loading, error, items, emptyMessage, children }) {
  if (loading) return createElement('p', { className: 'text-secondary' }, 'Loading...')
  if (error) return createElement('p', { className: 'alert alert-danger mb-0' }, error)
  if (!items.length) return createElement('p', { className: 'text-secondary' }, emptyMessage)
  return children
}