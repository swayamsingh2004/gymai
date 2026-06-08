import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function LogWorkout() {
    const[muscleGroup,setmuscleGroup]=useState("")
    const[date,setDate]=useState("");
    const [duration,setDuration]=useState(0);
    const [notes,setnotes]=useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const navigate=useNavigate();

    const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setLoading(true)

        try {
                await api.post('/api/workout',{muscleGroup:muscleGroup,date:date,duration:duration,notes:notes})
                navigate('/dashboard')
            
        } catch (error) {
            setError((error as any).response?.data?.message || "Failed to log workout")
            
        }finally{
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

      <h1 className="text-2xl font-black mb-2">Log Workout</h1>
      <p className="text-gray-500 text-sm mb-8">Record today's session</p>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400 mb-1 block">Muscle Group</label>
          <select
            onChange={(e) => setmuscleGroup(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                       text-white text-sm focus:outline-none focus:border-green-400"
          >
            <option value="">Select muscle group</option>
            <option value="Chest">Chest</option>
            <option value="Back">Back</option>
            <option value="Legs">Legs</option>
            <option value="Shoulders">Shoulders</option>
            <option value="Arms">Arms</option>
            <option value="Core">Core</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Date</label>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                       text-white text-sm focus:outline-none focus:border-green-400"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Duration (mins) — optional</label>
          <input
            type="number"
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                       text-white text-sm focus:outline-none focus:border-green-400"
          />
        </div>

        <div>
          <label className="text-xs text-gray-400 mb-1 block">Notes — optional</label>
          <textarea
            rows={3}
            onChange={(e) => setnotes(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                       text-white text-sm focus:outline-none focus:border-green-400 resize-none"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-green-400 text-gray-950 font-bold text-sm
                     rounded hover:bg-green-300 disabled:opacity-50 transition-colors"
        >
          {loading ? "Saving..." : "Log Workout"}
        </button>
      </div>
    </div>
  </div>
)
}