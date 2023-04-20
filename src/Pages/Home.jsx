import usePedidos from "../hooks/usePedidos";

export default function Home() {
  const { pedidos, loading } = usePedidos();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full mt-[40vh] gap-2">
        <h1 className="text-4xl text-gray-700">Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full flex flex-col items-center py-8 gap-8">
      <h1 className="text-4xl font-bold text-gray-700">Pedidos</h1>
      <div className="lg:max-w-6xl text-md sm:text-lg w-full">
        <div className="flex justify-between sm:grid grid-cols-[100px_1fr_1fr_1fr] text-gray-200 bg-teal-600 rounded-t-lg py-2 px-4 md:py-4 md:px-8">
          <h3>ID</h3>
          <h3>Cliente</h3>
          <h3>Data</h3>
          <span></span>
        </div>
        {pedidos.map((pedido) => (
          <div
            key={pedido.id}
            className="flex justify-between sm:grid grid-cols-[100px_1fr_1fr_1fr] text-gray-700 bg-gray-200 last:rounded-b-lg py-2 px-4 md:py-4 md:px-8"
          >
            <p>{pedido.id}</p>
            <p>{pedido.clienteNome}</p>
            <p>{pedido.data}</p>
            <a href={`/informacoes-pedido/${pedido.id}`}>
              <button
                type="submit"
                className="text-gray-200 bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-500 ml-auto transition"
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
