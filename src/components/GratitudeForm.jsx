import { useState } from 'react'

export default function GratitudeForm({ onSubmitted }) {
  const [name, setName] = useState('')
  const [items, setItems] = useState([''])
  const [mood, setMood] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const addItem = () => setItems(prev => [...prev, ''])
  const updateItem = (idx, val) => setItems(prev => prev.map((v, i) => i === idx ? val : v))
  const removeItem = (idx) => setItems(prev => prev.filter((_, i) => i !== idx))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const filtered = items.map(s => s.trim()).filter(Boolean)
    if (filtered.length === 0) {
      setError('Please add at least one gratitude item')
      return
    }

    setLoading(true)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/gratitude`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || 'Anonymous', items: filtered, mood: mood || null })
      })
      if (!res.ok) throw new Error('Failed to save')
      await res.json()
      setName('')
      setMood('')
      setItems([''])
      onSubmitted?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Your name (optional)"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="w-full rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Mood or emoji (optional)"
          value={mood}
          onChange={e => setMood(e.target.value)}
        />
        <button
          type="button"
          onClick={addItem}
          className="rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50 px-3 py-2"
        >
          + Add item
        </button>
      </div>

      {items.map((val, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder={`Im grateful for... (#${idx+1})`}
            value={val}
            onChange={e => updateItem(idx, e.target.value)}
          />
          {items.length > 1 && (
            <button type="button" onClick={() => removeItem(idx)} className="text-sm text-gray-500 hover:text-red-600">Remove</button>
          )}
        </div>
      ))}

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        disabled={loading}
        className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 font-medium disabled:opacity-60"
      >
        {loading ? 'Saving...' : 'Save todays gratitude'}
      </button>
    </form>
  )
}
