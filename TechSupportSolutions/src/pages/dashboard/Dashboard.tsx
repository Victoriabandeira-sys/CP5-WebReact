import { useState, useEffect } from "react";
import TicketCard from "../../components/ticketCard/TicketCard";
import TicketFilter from "../../components/ticketFilter/TicketFilter";
import type { Ticket } from "../../models/Ticket";
import api from "../../services/api";

function Dashboard() {
    const [pesquisa, setPesquisa] = useState("");
    const [status, setStatus] = useState("");
    const [chamados, setChamados] = useState<Ticket[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    useEffect(() => {
        api.get<Ticket[]>("/tickets")
            .then((resposta) => {
                setChamados(resposta.data);
            })
            .catch(() => {
                setErro("Erro ao carregar os chamados.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, []);

    const chamadosFiltrados = chamados.filter((ticket) => {
        return (
            ticket.title.toLowerCase().includes(pesquisa.toLowerCase()) &&
            (status === "" || ticket.status === status)
        );
    });

    return (
        <main className="bg-gray-100 min-h-screen py-12 px-6">
            <section className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-blue-900 mb-3">
                    Chamados Técnicos
                </h1>

                <p className="text-gray-600 mb-8">
                    Visualize e acompanhe os chamados cadastrados.
                </p>

                <TicketFilter
                    pesquisa={pesquisa}
                    status={status}
                    setPesquisa={setPesquisa}
                    setStatus={setStatus}
                />

                {carregando && <p>Carregando chamados...</p>}

                {erro && (
                    <p className="text-red-600">{erro}</p>
                )}

                {!carregando && !erro && (
                    <div className="grid gap-4">
                        {chamadosFiltrados.length > 0 ? (
                            chamadosFiltrados.map((ticket) => (
                                <TicketCard key={ticket.id} ticket={ticket} />
                            ))
                        ) : (
                            <p className="text-gray-500">
                                Nenhum chamado encontrado.
                            </p>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Dashboard;