import { useState } from 'react'
import Header from './components/Header'
import GratitudeForm from './components/GratitudeForm'
import GratitudeList from './components/GratitudeList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-sky-50 to-emerald-50">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Header />

        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Add todays gratitude</h2>
            <GratitudeForm onSubmitted={() => setRefreshKey(k => k + 1)} />
          </div>

          <div className="bg-white/80 backdrop-blur rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent entries</h2>
            <GratitudeList refreshKey={refreshKey} />
          </div>
        </div>

        <p className="text-center text-xs text-gray-500 mt-8">Built with love • Share a little gratitude each day</p>
      </div>
    </div>
  )
}

export default App
