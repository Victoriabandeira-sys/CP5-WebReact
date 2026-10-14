import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="bg-blue-900 text-white px-8 py-5">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">
                    TechSupport
                </h1>

                <nav className="flex items-center gap-6">
                    <Link to="/" className="hover:underline">
                        Início
                    </Link>

                    <Link to="/novo-chamado" className="hover:underline">
                        Novo chamado
                    </Link>

                    <Link to="/chamados" className="hover:underline">
                        Chamados
                    </Link>

                    <div className="flex items-center gap-2">
                        <span className="font-semibold">
                            Prioridade:
                        </span>

                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                            Alta
                        </span>

                        <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm">
                            Média
                        </span>

                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                            Baixa
                        </span>
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;