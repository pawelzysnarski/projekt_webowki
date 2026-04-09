import {BrowserRouter,Route,Routes} from "react-router-dom"
import MainPage from "./routes/MainPage/MainPage.tsx"
import ShopPage from "./routes/ShopPage/ShopPage.tsx"
import TablePage from "./routes/TablePage/TablePage.tsx";
import "./App.scss"
import Menu from "./components/Menu/Menu.tsx";
import TicketPage from "./routes/TicketPage/TicketPage.tsx";
import ContactPage from "./routes/ContactPage/ContactPage.tsx";

function App() {

  return (
    <BrowserRouter>
        <Menu></Menu>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/sklep" element={<ShopPage/>}/>
            <Route path="/terminarz" element={<TablePage/>}/>
            <Route path="/bilety" element={<TicketPage/>}/>
            <Route path="/kontakt" element={<ContactPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
