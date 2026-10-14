interface Props {
    pesquisa: string;
    status: string;
    setPesquisa: (valor: string) => void;
    setStatus: (valor: string) => void;
}

function TicketFilter({ pesquisa, status, setPesquisa, setStatus }: Props) {
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
                type="text"
                placeholder="Pesquisar pelo título"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="border border-gray-300 rounded-lg p-3 w-full"
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-3"
            >
                <option value="">Todos os status</option>
                <option value="ABERTO">ABERTO</option>
                <option value="EM_ANDAMENTO">EM ANDAMENTO</option>
                <option value="CONCLUIDO">CONCLUÍDO</option>
            </select>
        </div>
    );
}

export default TicketFilter;