import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Daily Gratitude</h1>
          <p className="text-sm text-gray-500">Capture a few things youre grateful for today</p>
        </div>
      </div>
      <a href="/test" className="text-sm text-indigo-600 hover:text-indigo-700">Check backend</a>
    </header>
  )
}
