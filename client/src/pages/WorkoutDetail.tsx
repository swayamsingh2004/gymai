import { useState ,useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom"
import api from "../api/axios";
import type { IWorkout } from "../types";
import type { IExercise } from "../types";
export default function WorkoutDetail(){
    const {workoutId}=useParams();
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");
    const[workout,setWorkout]=useState<IWorkout|null>(null)
    const [exercises, setExercises] = useState<IExercise[]>([])

    const navigate=useNavigate();
    useEffect(() => {
    fetchData()
}, [])

    const fetchData = async () => {
    setLoading(true)
    try {
        const workoutRes = await api.get(`/api/workout/${workoutId}`)
        setWorkout(workoutRes.data.data)
        
        const exercisesRes = await api.get(`/api/exercise/${workoutId}`)
        setExercises(exercisesRes.data.data)
    } catch (error) {
        setError("Failed to fetch workout")
    } finally {
        setLoading(false)
    }
}
    
    return (
  <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
    <div className="max-w-2xl mx-auto">

      <button onClick={() => navigate('/dashboard')}
        className="text-gray-500 text-sm mb-6 hover:text-white transition-colors">
        ← Back
      </button>

      {loading && <p className="text-gray-500 text-sm">Loading...</p>}
      {error && <p className="text-red-400 text-sm">{error}</p>}

      {workout && (
        <>
          {/* Workout Header */}
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded font-medium">
                {workout.muscleGroup}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(workout.date).toLocaleDateString()}
              </span>
            </div>
            {workout.duration && (
              <p className="text-sm text-gray-400 mb-1">Duration: {workout.duration} mins</p>
            )}
            {workout.notes && (
              <p className="text-sm text-gray-500">{workout.notes}</p>
            )}
          </div>

          {/* Exercises */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Exercises</h2>
            <button
              onClick={() => navigate(`/log-exercise/${workoutId}`)}
              className="px-4 py-2 bg-green-400 text-gray-950 rounded text-sm 
                         font-bold hover:bg-green-300 transition-colors"
            >
              + Add Exercise
            </button>
          </div>

          {exercises.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600">No exercises logged yet</p>
              <p className="text-gray-700 text-sm mt-1">Add your first exercise above</p>
            </div>
          )}

          <div className="space-y-4">
            {exercises.map((exercise) => (
              <div key={exercise._id}
                className="bg-gray-900 border border-gray-800 rounded-lg p-5">
                <h3 className="font-bold text-white mb-4">{exercise.exerciseName}</h3>
                <div className="space-y-2">
                  {exercise.sets.map((set, index) => (
                    <div key={index}
                      className="flex gap-4 text-sm text-gray-400 bg-gray-800 
                                 rounded px-4 py-2">
                      <span className="text-gray-600 w-12">Set {set.setNumber}</span>
                      <span>{set.reps} reps</span>
                      <span>{set.weight} kg</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  </div>
)
}