import { useEffect, useState } from "react"
import api from "../api/axios"
import ReactMarkdown from "react-markdown"
import { useNavigate } from "react-router-dom"


export default function AIAnalysis() {
    const [loading,setLoading]=useState(false);
    const [result,setResult]=useState("");
    const [error,setError]=useState("");
    const navigate = useNavigate()

    useEffect(()=>{
        AIResult();

    },[])
    const AIResult= async ()=>{
        setLoading(true)
        try {
            const output=await api.post('/api/ai');
            setResult(output.data.data)
            
        } catch (error) {
            setLoading(false);
            setError(error?.response?.data?.message|| "Analysis failed")
            
        }finally{
            setLoading(false);
        }

    }


  return (
  <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
    <div className="max-w-2xl mx-auto">

      <button onClick={() => navigate('/dashboard')}
        className="text-gray-500 text-sm mb-6 hover:text-white transition-colors">
        ← Back
      </button>

      <h1 className="text-2xl font-black mb-2">AI Analysis</h1>
      <p className="text-gray-500 text-sm mb-8">Personalized insights from your workout history</p>

      {loading && (
        <div className="flex flex-col items-center py-20 gap-3">
          <div className="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Analyzing your workouts...</p>
        </div>
      )}

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {result && !loading && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 prose prose-invert prose-sm max-w-none">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}

    </div>
  </div>
)
}