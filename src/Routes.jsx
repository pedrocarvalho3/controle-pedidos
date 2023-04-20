import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import InformacoesPedido from "./Pages/InformacoesPedido";

export default function ProjectRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/informacoes-pedido/:id" element={<InformacoesPedido />} />
        </Routes>
    )
}