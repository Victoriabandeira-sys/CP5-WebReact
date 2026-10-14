
import { useState } from "react";
import type { FormEvent } from "react";
import api from "../../services/api";

function TicketForm() {
    const [mensagem, setMensagem] = useState("");

    async function cadastrar(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formulario = e.currentTarget;
        const dados = new FormData(formulario);

        const chamado = {
            title: dados.get("title"),
            category: dados.get("category"),
            priority: dados.get("priority"),
            description: dados.get("description"),
            status: "ABERTO"
        };

        try {
            await api.post("/tickets", chamado);
            setMensagem("Chamado cadastrado com sucesso!");
            formulario.reset();
        } catch {
            setMensagem("Erro ao cadastrar chamado.");
        }
    }

    return (
        <section
            id="novo-chamado"
            className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow"
        >
            <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Novo Chamado
            </h2>

            <p className="text-gray-500 mb-6">
                Preencha as informações abaixo.
            </p>

            <form onSubmit={cadastrar} className="flex flex-col gap-5">

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Título</label>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="Digite o título do chamado"
                        className="border border-gray-300 rounded-lg p-3"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Categoria</label>
                    <select
                        name="category"
                        required
                        defaultValue=""
                        className="border border-gray-300 rounded-lg p-3"
                    >
                        <option value="">Selecione uma categoria</option>
                        <option value="HARDWARE">HARDWARE</option>
                        <option value="SOFTWARE">SOFTWARE</option>
                        <option value="REDE">REDE</option>
                        <option value="OUTROS">OUTROS</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Prioridade</label>
                    <select
                        name="priority"
                        required
                        defaultValue=""
                        className="border border-gray-300 rounded-lg p-3"
                    >
                        <option value="">Selecione a prioridade</option>
                        <option value="BAIXA">BAIXA</option>
                        <option value="MEDIA">MEDIA</option>
                        <option value="ALTA">ALTA</option>
                    </select>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="font-semibold">Descrição</label>
                    <textarea
                        name="description"
                        rows={4}
                        required
                        placeholder="Descreva o problema"
                        className="border border-gray-300 rounded-lg p-3"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800"
                >
                    Cadastrar Chamado
                </button>

                {mensagem && (
                    <p className="text-center">{mensagem}</p>
                )}

            </form>
        </section>
    );
}

export default TicketForm;