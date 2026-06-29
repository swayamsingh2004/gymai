import { useState } from "react"
import { useNavigate } from "react-router-dom";
import api from "../api/axios";


export default function Register() {
    const[Username,setUsername]=useState("");
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("");
    const[loading,setLoading]=useState(false);
    const[error,setError]=useState("");
    const navigate=useNavigate();
    const handleSubmit=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/api/auth/register',{username:Username,email:email,password:password});
            navigate('/login')
            
        } catch (error) {
            const data = (error as any).response?.data;
    if (data?.errors?.length) {
        setError(data.errors[0].message);
    } else {
        setError(data?.message || "Registration Failed");
    }
            
        }
        finally{
            setLoading(false);
        }
        


    }


 return (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-gray-900 rounded-lg p-8 border border-gray-800">
      
      <h1 className="text-2xl font-black text-white mb-2">GymAI</h1>
      <p className="text-gray-500 text-sm mb-8">Create your account</p>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={Username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                     text-white text-sm placeholder-gray-500 focus:outline-none 
                     focus:border-green-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                     text-white text-sm placeholder-gray-500 focus:outline-none 
                     focus:border-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 
                     text-white text-sm placeholder-gray-500 focus:outline-none 
                     focus:border-green-400"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 bg-green-400 text-gray-950 font-bold text-sm
                     rounded hover:bg-green-300 disabled:opacity-50 transition-colors"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </div>

      <p className="text-gray-500 text-sm text-center mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-green-400 hover:underline">Login</a>
      </p>
    </div>
  </div>
)
}