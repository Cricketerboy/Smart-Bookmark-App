'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import BookmarkForm from '@/components/BookmarkForm'
import BookmarkList from '@/components/BookmarkList'

type Bookmark = {
  id: string
  title: string
  url: string
  created_at: string
  user_id: string
}

export default function Dashboard() {
  const router = useRouter()
  const channelRef = useRef<BroadcastChannel | null>(null)

  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  useEffect(() => {
    channelRef.current = new BroadcastChannel('bookmarks-channel')

    channelRef.current.onmessage = () => {
      if (userId) {
        fetchBookmarks(userId)
      }
    }

    return () => {
      channelRef.current?.close()
    }
  }, [userId])

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUserEmail(user.email ?? null)
      setUserId(user.id)

      await fetchBookmarks(user.id)
      setLoading(false)
    }

    init()
  }, [router])

  const fetchBookmarks = async (uid: string) => {
    const { data } = await supabase
      .from('bookmarks')
      .select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    setBookmarks(data || [])
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-black">

    {/* Navbar */}
    <div className="flex justify-between items-center px-8 py-4 bg-white/70 backdrop-blur border-b shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight">
        🔖 Smart Bookmarks
      </h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-zinc-600">
          {userEmail}
        </span>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800 transition"
        >
          Logout
        </button>
      </div>
    </div>

    {/* Content */}
    <div className="max-w-4xl mx-auto p-10">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-8 space-y-6">

        <h2 className="text-3xl font-bold mb-2">
          Your Bookmarks
        </h2>

        {userId && (
          <>
            <BookmarkForm
              userId={userId}
              onBookmarkAdded={() => {
                fetchBookmarks(userId)
                channelRef.current?.postMessage('update')
              }}
            />

            <BookmarkList
              bookmarks={bookmarks}
              onDelete={async (id) => {
                await supabase.from('bookmarks').delete().eq('id', id)
                fetchBookmarks(userId)
                channelRef.current?.postMessage('update')
              }}
            />
          </>
        )}

      </div>
    </div>
  </div>
)

}
