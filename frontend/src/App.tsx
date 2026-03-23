import {BrowserRouter,Route,Routes} from "react-router"
import mainPageRouter from "./routes/mainPageRouter/mainPageRouter.tsx"
import shopPageRouter from "./routes/shopPageRouter/shopPageRouter.tsx"
import "./App.scss"

function App() {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/*" element={mainPageRouter()}/>
            <Route path="/sklep" element={shopPageRouter()}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
