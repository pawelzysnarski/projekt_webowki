import {BrowserRouter,Route,Routes} from "react-router"
import mainPageRouter from "./routes/mainPageRouter/mainPageRouter.tsx"
import "./App.scss"

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={mainPageRouter()}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
