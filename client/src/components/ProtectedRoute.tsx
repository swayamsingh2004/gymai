import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import api from "../api/axios"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        try {
            await api.get('/api/auth/me')
            setAuthenticated(true)
        } catch (error) {
            setAuthenticated(false)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="min-h-screen bg-gray-950" />
    if (!authenticated) return <Navigate to="/login" />
    return <>{children}</>
}