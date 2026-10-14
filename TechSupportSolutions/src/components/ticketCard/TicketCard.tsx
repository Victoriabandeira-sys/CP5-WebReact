
import { Link } from "react-router-dom";
import type { Ticket } from "../../models/Ticket";

interface Props {
    ticket: Ticket;
}

function TicketCard({ ticket }: Props) {
    return (
        <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold text-blue-900 mb-3">
                {ticket.title}
            </h2>

            <p>Categoria: {ticket.category}</p>
            <p>Prioridade: {ticket.priority}</p>
            <p>Status: {ticket.status}</p>

            <Link
                to={`/chamado/${ticket.id}`}
                className="inline-block mt-4 text-blue-900 font-semibold hover:underline"
            >
                Ver detalhes
            </Link>
        </div>
    );
}

export default TicketCard;
