import { useEffect, useState } from 'react'

export default function GratitudeList({ refreshKey }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/gratitude?limit=50`)
        if (!res.ok) throw new Error('Failed to load entries')
        const data = await res.json()
        setItems(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [refreshKey])

  if (loading) return <p className="text-gray-500">Loading entries...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (items.length === 0) return <p className="text-gray-500">No entries yet. Be the first!</p>

  return (
    <div className="space-y-3">
      {items.map((entry) => (
        <div key={entry.id} className="rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-900">{entry.name || 'Anonymous'}</p>
            {entry.mood && <span className="text-sm text-indigo-600">{entry.mood}</span>}
          </div>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            {entry.items?.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
          {entry.created_at && (
            <p className="text-xs text-gray-500 mt-2">{new Date(entry.created_at).toLocaleString()}</p>
          )}
        </div>
      ))}
    </div>
  )
}
