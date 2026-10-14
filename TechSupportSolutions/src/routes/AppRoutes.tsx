import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import NewTicket from "../pages/newTicket/NewTicket";
import TicketDetails from "../pages/ticketDetails/TicketDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chamados" element={<Dashboard />} />
            <Route path="/novo-chamado" element={<NewTicket />} />
            <Route path="/chamado/:id" element={<TicketDetails />} />
        </Routes>
    );
}

export default AppRoutes;