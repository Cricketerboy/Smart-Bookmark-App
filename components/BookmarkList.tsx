'use client'

type Bookmark = {
  id: string
  title: string
  url: string
  created_at: string
  user_id: string
}

type Props = {
  bookmarks: Bookmark[]
  onDelete: (id: string) => void
}

export default function BookmarkList({ bookmarks, onDelete }: Props) {
  if (bookmarks.length === 0) {
  return (
    <div className="text-center py-10 text-zinc-500">
      No bookmarks yet. Add your first one 🚀
    </div>
  )
}

return (
  <div className="grid gap-4">
    {bookmarks.map((b) => (
      <div
        key={b.id}
        className="p-5 bg-zinc-50 rounded-xl border hover:shadow-md transition"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">
              {b.title}
            </h3>

            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all text-sm"
            >
              {b.url}
            </a>

            <p className="text-xs text-zinc-400">
              {new Date(b.created_at).toLocaleString()}
            </p>
          </div>

          <button
            onClick={() => onDelete(b.id)}
            className="text-red-500 hover:text-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
)
}
