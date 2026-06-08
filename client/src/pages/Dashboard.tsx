import { useState,useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/axios"
import type {IWorkout}  from "../types/index"
export default function Dashboard() {
    const [workout,setWorkouts]=useState<IWorkout[]>([])
    const [loading,setLoading]=useState(true);
    const navigate = useNavigate()

    useEffect(()=>{
        fetchWorkouts()
    },[]);
    const handleLogout = async () => {
    try {
        await api.post('/api/auth/logout')
        navigate('/login')
    } catch (error) {
        console.error(error)
    }
}

    const fetchWorkouts=async()=>{
        try {
            const response=await api.get('/api/workout');
            setWorkouts(response.data.data)
            
        } catch (error) {
            console.error(error)
            
        }finally{
            setLoading(false);
        }
    }

   return (
  <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
    
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-black">GymAI</h1>
        <p className="text-gray-500 text-sm mt-1">Your workout history</p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/ai-analysis')}
          className="px-4 py-2 bg-gray-800 text-green-400 border border-green-400/30 
                     rounded text-sm font-bold hover:bg-gray-700 transition-colors"
        >
          AI Analysis
        </button>
        <button
          onClick={() => navigate('/log-workout')}
          className="px-4 py-2 bg-green-400 text-gray-950 rounded text-sm 
                     font-bold hover:bg-green-300 transition-colors"
        >
          + Log Workout
        </button>
        <button
    onClick={handleLogout}
    className="px-4 py-2 bg-gray-800 text-red-400 border border-red-400/30 
               rounded text-sm font-bold hover:bg-gray-700 transition-colors"
>
    Logout
</button>
      </div>
    </div>

    {/* Loading */}
    {loading && <p className="text-gray-500 text-sm">Loading...</p>}

    {/* Empty state */}
    {!loading && workout.length === 0 && (
      <div className="text-center py-20">
        <p className="text-gray-600 text-lg">No workouts logged yet</p>
        <p className="text-gray-700 text-sm mt-2">Start by logging your first workout</p>
      </div>
    )}

    {/* Workout cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {workout.map((w) => (
        <div
          key={w._id}
          className="bg-gray-900 border border-gray-800 rounded-lg p-5 
                     hover:border-gray-700 transition-colors"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded font-medium">
              {w.muscleGroup}
            </span>
            <span className="text-xs text-gray-600">
              {new Date(w.date).toLocaleDateString()}
            </span>
          </div>
          {w.duration && (
            <p className="text-sm text-gray-400 mb-1">Duration: {w.duration} mins</p>
          )}
          {w.notes && (
            <p className="text-sm text-gray-500 mb-4">{w.notes}</p>
          )}
          <button
            onClick={() => navigate(`/workout/${w._id}`)}

            className="w-full py-2 bg-gray-800 text-white text-sm rounded 
                       hover:bg-gray-700 transition-colors"
          >
            Log Exercises →
          </button>
        </div>
      ))}
    </div>
  </div>
)
}