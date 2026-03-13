import {BrowserRouter,Route,Routes} from "react-router"
import mainPageRouter from "./routes/mainPageRouter/mainPageRouter.tsx"
import './App.css'

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/home/*" element={mainPageRouter()}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
