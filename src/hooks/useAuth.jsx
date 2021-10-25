import { useState, useEffect } from 'react'
import supabase from '@config/supabase'

function useAuth() {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      const user = supabase.auth.user()
      setUser(user)
      setLoading(false)
    }, 500)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user)
        setLoading(false)
      }
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  const logout = () => supabase.auth.signOut()

  return { user, loading, logout }
}

export default useAuth
