'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function Login() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) router.push('/dashboard')
    }

    checkSession()
  }, [router])

  const handleLogin = async () => {
    setLoading(true)

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">

      <div className="w-full max-w-sm border border-zinc-200 rounded-2xl shadow-sm p-8 space-y-8">

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Sign in
          </h1>
          <p className="text-sm text-zinc-500">
            Continue with your Google account
          </p>
        </div>

        {/* Google Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg border border-zinc-300 bg-white hover:bg-zinc-50 transition disabled:opacity-60"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.1-1.3 3.2-5.1 3.2-3.1 0-5.6-2.6-5.6-5.8s2.5-5.8 5.6-5.8c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.7 3 14.6 2 12 2 6.9 2 2.8 6.1 2.8 11.2S6.9 20.4 12 20.4c6.9 0 9.2-4.8 9.2-7.3 0-.5 0-.8-.1-1.1H12z"/>
          </svg>

          <span className="text-sm font-medium">
            {loading ? 'Redirecting...' : 'Sign in with Google'}
          </span>
        </button>

      </div>

    </div>
  )
}
