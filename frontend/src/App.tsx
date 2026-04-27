import {BrowserRouter,Route,Routes} from "react-router-dom"
import MainPage from "./routes/MainPage/MainPage.tsx"
import ShopPage from "./routes/ShopPage/ShopPage.tsx"
import TablePage from "./routes/TablePage/TablePage.tsx";
import "./App.scss"
import Menu from "./components/Menu/Menu.tsx";
import TicketPage from "./routes/TicketPage/TicketPage.tsx";
import ContactPage from "./routes/ContactPage/ContactPage.tsx";
import Tickets from "./routes/TicketPage/Tickets/Tickets.tsx";
import Ticket from "./components/Ticket/Ticket.tsx";
import SeasonTicket from "./components/SeasonTicket/SeasonTicket.tsx";
import TeamPage from "./routes/TeamPage/TeamPage.tsx";
import PlayerDesc from "./components/PlayerDesc/PlayerDesc.tsx";
import ProductPage from "./routes/ProductPage/ProductPage.tsx"
import StaffDesc from "./components/StaffDesc/StaffDesc.tsx";
import NewsPage from "./routes/NewsPage/NewsPage.tsx";
import AcademyPage from "./routes/AcademyPage/AcademyPage.tsx";


function App() {

  return (
    <BrowserRouter>
        <Menu></Menu>
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/sklep" element={<ShopPage/>}/>
            <Route path="/terminarz" element={<TablePage />}/>
            <Route path="/bilety" element={<TicketPage/>}/>
            <Route path="/bilety/:id" element={<Tickets/>}/>
            <Route path="/bilety/:id/:type_id" element={<Ticket/>}/>
            <Route path="/bilety/karnet" element={<SeasonTicket/>}/>
            <Route path="/kontakt" element={<ContactPage/>}/>
            <Route path="druzyna" element={<TeamPage/>}/>
            <Route path="/zawodnik/:id" element={<PlayerDesc />} />
            <Route path="/personel/:id" element={<StaffDesc />}/>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/aktualnosci" element={<NewsPage/>}/>
            <Route path="/akademia" element={<AcademyPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
