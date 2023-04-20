import { useState, useEffect } from "react";

export default function usePedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPedidos = async () => {
    setLoading(true);

    try {
      const responsePedidos = await fetch("https://sistemalift1.com/lift_ps/api/Pedidos");
      const responseClientes = await fetch("https://sistemalift1.com/lift_ps/api/Clientes");

      const pedidos = await responsePedidos.json();
      const clientes = await responseClientes.json();

      const mergePedidos = pedidos.map((pedido) => {
        const cliente = clientes.find((cliente) => cliente?.id === pedido?.cliente);
        return {
          ...pedido,
          clienteNome: cliente?.nome,
        };
      });

      setPedidos(mergePedidos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  return {
    pedidos,
    loading,
  };
}
