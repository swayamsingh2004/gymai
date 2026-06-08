import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios"

export default function LogExercise() {
  const { workoutId } = useParams()
  const navigate = useNavigate()
  const [exerciseName, setExerciseName] = useState("")
  const [sets, setSets] = useState([{ setNumber: 1, reps: 0, weight: 0 }])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const addSet = () => {
    setSets([...sets, { setNumber: sets.length + 1, reps: 0, weight: 0 }])
  }

  const removeSet = (index: number) => {
    const updated = sets.filter((_, i) => i !== index)
    const renumbered = updated.map((s, i) => ({ ...s, setNumber: i + 1 }))
    setSets(renumbered)
  }

  const updateSet = (index: number, field: string, value: number) => {
    const updated = [...sets]
    updated[index] = { ...updated[index], [field]: value }
    setSets(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/exercise', {
        workoutId,
        exerciseName,
        sets
      })
      navigate('/dashboard')
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to log exercise")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <div className="max-w-lg mx-auto">

        <button onClick={() => navigate('/dashboard')}
          className="text-gray-500 text-sm mb-6 hover:text-white transition-colors">
          ← Back
        </button>

        <h1 className="text-2xl font-black mb-2">Log Exercise</h1>
        <p className="text-gray-500 text-sm mb-8">Add exercises to your workout</p>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1 block">Exercise Name</label>
            <input
              type="text"
              placeholder="e.g. Bench Press"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                         text-white text-sm placeholder-gray-500 focus:outline-none 
                         focus:border-green-400"
            />
          </div>

          {/* Sets */}
          <div>
            <label className="text-xs text-gray-400 mb-3 block">Sets</label>
            <div className="space-y-3">
              {sets.map((set, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <span className="text-xs text-gray-600 w-8">#{set.setNumber}</span>
                  <input
                    type="number"
                    placeholder="Reps"
                    onChange={(e) => updateSet(index, 'reps', Number(e.target.value))}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 
                               text-white text-sm placeholder-gray-500 focus:outline-none 
                               focus:border-green-400"
                  />
                  <input
                    type="number"
                    placeholder="Weight (kg)"
                    onChange={(e) => updateSet(index, 'weight', Number(e.target.value))}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 
                               text-white text-sm placeholder-gray-500 focus:outline-none 
                               focus:border-green-400"
                  />
                  {sets.length > 1 && (
                    <button
                      onClick={() => removeSet(index)}
                      className="text-red-400 text-sm hover:text-red-300"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={addSet}
              className="mt-3 text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              + Add Set
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-green-400 text-gray-950 font-bold text-sm
                       rounded hover:bg-green-300 disabled:opacity-50 transition-colors"
          >
            {loading ? "Saving..." : "Log Exercise"}
          </button>
        </div>
      </div>
    </div>
  )
}