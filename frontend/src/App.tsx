import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import MainPage from "./routes/MainPage/MainPage";
import ShopPage from "./routes/ShopPage/ShopPage";
import TablePage from "./routes/TablePage/TablePage";
import "./App.scss";
import Menu from "./components/Menu/Menu";
import TicketPage from "./routes/TicketPage/TicketPage";
import ContactPage from "./routes/ContactPage/ContactPage";
import Tickets from "./components/Tickets/Tickets";
import Ticket from "./components/Ticket/Ticket";
import SeasonTicket from "./components/SeasonTicket/SeasonTicket";
import TeamPage from "./routes/TeamPage/TeamPage";
import PlayerDesc from "./components/PlayerDesc/PlayerDesc";
import ProductPage from "./routes/ProductPage/ProductPage";
import StaffDesc from "./components/StaffDesc/StaffDesc";
import NewsPage from "./routes/NewsPage/NewsPage";
import AcademyPage from "./routes/AcademyPage/AcademyPage";
import AcademyRegister from "./routes/AcademyRegister/AcademyRegister";
import OrderPage from "./routes/OrderPage/OrderPage";
import ProfilePage from "./routes/ProfilePage/ProfilePage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Menu />
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/profil" element={<ProfilePage />} />
                    <Route path="/sklep" element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
                    <Route path="/terminarz" element={<ProtectedRoute><TablePage /></ProtectedRoute>} />
                    <Route path="/bilety" element={<ProtectedRoute><TicketPage /></ProtectedRoute>} />
                    <Route path="/bilety/:id" element={<ProtectedRoute><Tickets /></ProtectedRoute>} />
                    <Route path="/bilety/:id/:type_id" element={<ProtectedRoute><Ticket /></ProtectedRoute>} />
                    <Route path="/bilety/karnet" element={<ProtectedRoute><SeasonTicket /></ProtectedRoute>} />
                    <Route path="/kontakt" element={<ProtectedRoute><ContactPage /></ProtectedRoute>} />
                    <Route path="/druzyna" element={<ProtectedRoute><TeamPage /></ProtectedRoute>} />
                    <Route path="/zawodnik/:id" element={<ProtectedRoute><PlayerDesc /></ProtectedRoute>} />
                    <Route path="/personel/:id" element={<ProtectedRoute><StaffDesc /></ProtectedRoute>} />
                    <Route path="/product/:id" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
                    <Route path="/aktualnosci" element={<ProtectedRoute><NewsPage /></ProtectedRoute>} />
                    <Route path="/akademia" element={<ProtectedRoute><AcademyPage /></ProtectedRoute>} />
                    <Route path="/akademia/zapis/:id" element={<ProtectedRoute><AcademyRegister /></ProtectedRoute>} />
                    <Route path="/zamowienie" element={<ProtectedRoute><OrderPage /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;