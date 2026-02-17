'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase-client'

type Props = {
  userId: string
  onBookmarkAdded: () => void
}

export default function BookmarkForm({ userId, onBookmarkAdded }: Props) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAdd = async () => {
    if (!title.trim() || !url.trim()) {
      setError('Title and URL are required')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.from('bookmarks').insert([
        {
          title: title.trim(),
          url: url.trim(),
          user_id: userId,
        },
      ])

      if (error) throw error

      setTitle('')
      setUrl('')
      onBookmarkAdded() // 🔥 instantly refresh
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className="space-y-4">
    <div className="flex flex-col sm:flex-row gap-4">
      <input
        placeholder="Bookmark title"
        className="flex-1 border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="https://example.com"
        className="flex-1 border border-zinc-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={handleAdd}
        disabled={loading}
        className="px-6 py-3 rounded-lg bg-black text-white hover:bg-zinc-800 transition disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add'}
      </button>
    </div>

    {error && (
      <p className="text-red-500 text-sm">{error}</p>
    )}
  </div>
)

}
