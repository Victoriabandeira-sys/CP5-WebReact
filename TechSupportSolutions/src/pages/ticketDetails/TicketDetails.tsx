
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import type { Ticket } from "../../models/Ticket";

function TicketDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        api.get<Ticket>(`/tickets/${id}`)
            .then((resposta) => {
                setTicket(resposta.data);
            })
            .catch(() => {
                setErro("Erro ao carregar chamado.");
            })
            .finally(() => {
                setCarregando(false);
            });
    }, [id]);

    async function atualizarStatus(novoStatus: string) {
        if (!ticket) return;

        setSalvando(true);
        setMensagem("");

        try {
            const resposta = await api.patch<Ticket>(
                `/tickets/${ticket.id}`,
                { status: novoStatus }
            );

            setTicket(resposta.data);
            setMensagem("Status atualizado com sucesso!");
        } catch {
            setMensagem("Erro ao atualizar status.");
        } finally {
            setSalvando(false);
        }
    }

    async function excluirChamado() {
        if (!ticket) return;

        setSalvando(true);
        setMensagem("");

        try {
            await api.delete(`/tickets/${ticket.id}`);
            navigate("/chamados");
        } catch {
            setMensagem("Erro ao excluir chamado.");
            setSalvando(false);
        }
    }

    return (
        <main className="bg-gray-100 min-h-screen py-12 px-6">
            <section className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow">
                <h1 className="text-2xl font-bold text-blue-900 mb-6">
                    Detalhes do Chamado
                </h1>

                {carregando && <p>Carregando chamado...</p>}

                {erro && <p className="text-red-600">{erro}</p>}

                {ticket && (
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-bold">
                            {ticket.title}
                        </h2>

                        <p>Descrição: {ticket.description}</p>
                        <p>Categoria: {ticket.category}</p>
                        <p>Prioridade: {ticket.priority}</p>
                        <p>Status: {ticket.status}</p>

                        <label className="font-semibold">
                            Atualizar status
                        </label>

                        <select
                            value={ticket.status}
                            onChange={(e) => atualizarStatus(e.target.value)}
                            disabled={salvando}
                            className="border border-gray-300 rounded-lg p-3"
                        >
                            <option value="ABERTO">ABERTO</option>
                            <option value="EM_ANDAMENTO">EM ANDAMENTO</option>
                            <option value="CONCLUIDO">CONCLUÍDO</option>
                        </select>

                        <button
                            onClick={excluirChamado}
                            disabled={salvando}
                            className="bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700"
                        >
                            Excluir Chamado
                        </button>

                        {mensagem && <p>{mensagem}</p>}
                    </div>
                )}
            </section>
        </main>
    );
}

export default TicketDetails;
