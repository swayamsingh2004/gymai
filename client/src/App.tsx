import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import LogExercise from "./pages/LogExercise";
import Register from "./pages/Register";
import LogWorkout from "./pages/LogWorkout";
import Dashboard from "./pages/Dashboard";
import AIAnalysis from "./pages/AIAnalysis";
import ProtectedRoute from "./components/ProtectedRoute";
import WorkoutDetail from "./pages/WorkoutDetail";
function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path="/log-workout" element={<ProtectedRoute><LogWorkout/></ProtectedRoute>} />
        <Route path="/log-exercise/:workoutId" element={<ProtectedRoute><LogExercise/></ProtectedRoute>} />
        <Route path="/ai-analysis" element={<ProtectedRoute><AIAnalysis/></ProtectedRoute>} />
        <Route path="/workout/:workoutId" element={<ProtectedRoute><WorkoutDetail/></ProtectedRoute>} />
        
      </Routes>

    </BrowserRouter>

  )

}
export default App;