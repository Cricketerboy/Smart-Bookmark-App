import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center px-6">
      <div className="max-w-3xl text-center space-y-8">
        
        {/* Heading */}
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Smart Bookmark Manager
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Save, manage and access your bookmarks securely with real-time sync.
          Private to you. Fast. Simple.
        </p>

        {/* Feature List */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
            🔐 Google Authentication
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
            ⚡ Real-time Updates
          </div>
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm">
            🛡️ Private & Secure
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <Link
            href="/login"
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-zinc-800 transition"
          >
            Get Started
          </Link>

          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
