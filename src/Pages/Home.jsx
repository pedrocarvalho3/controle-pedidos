import { useEffect, useState } from "react";

export default function Home() {
  const [pedidos, setPedidos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [selectedId, setSelectedId] = useState("1");

  function handleSelectChange(event) {
    setSelectedId(event.target.value);
  }

  console.log("selectedId", selectedId);

  useEffect(() => {
    fetch("https://sistemalift1.com/lift_ps/api/Pedidos")
      .then((response) => response.json())
      .then((data) => setPedidos(data));
  }, []);

  useEffect(() => {
    fetch("https://sistemalift1.com/lift_ps/api/Clientes")
      .then((response) => response.json())
      .then((data) => setClientes(data));
  }, []);

  const data = pedidos.map((pedido) => {
    const cliente = clientes.find((cliente) => cliente?.id === pedido?.cliente);
    return {
      ...pedido,
      clienteNome: cliente?.nome,
    };
  });

  return (
    <div className="container mx-auto w-full flex flex-col items-center py-8 gap-8">
      <h1 className="text-4xl font-bold text-gray-700">Pedidos</h1>
      <div className="text-lg w-full">
        <div className="flex justify-between md:grid grid-cols-4 text-gray-200 bg-teal-600 rounded-t-lg py-4 px-8">
          <h3>ID</h3>
          <h3>Cliente</h3>
          <h3>Data</h3>
          <span></span>
        </div>
        {data.map((pedido) => (
          <div className="flex justify-between md:grid grid-cols-4 text-gray-700 bg-gray-200 last:rounded-b-lg  py-4 px-8">
            <p>{pedido.id}</p>
            <p>{pedido.clienteNome}</p>
            <p>{pedido.data}</p>
            <a href={`/informacoes-pedido/${pedido.id}`}>
              <button
                type="submit"
                className="text-gray-200 bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-500"
              >
                Ver Informações
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
