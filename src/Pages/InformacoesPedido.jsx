import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function InformacoesPedido() {
  const { id } = useParams();

  const [pedido, setPedido] = useState([]);
  const [cliente, setCliente] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [itemsPedido, setItemsPedido] = useState([]);

  console.log("itemsPedido", itemsPedido);

  useEffect(() => {
    fetch(`https://sistemalift1.com/lift_ps/api/Produtos/`)
      .then((response) => response.json())
      .then((data) => setProdutos(data));
  }, []);

  useEffect(() => {
    fetch(`https://sistemalift1.com/lift_ps/api/Pedidos/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPedido(data);
        fetch(`https://sistemalift1.com/lift_ps/api/Clientes/${data.cliente}`)
          .then((response) => response.json())
          .then((data) => setCliente(data));
      });
  }, [id]);

  useEffect(() => {
    fetch(`https://sistemalift1.com/lift_ps/api/ItensPedido/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const items = data.map((item) => {
          const produto = produtos.find(
            (produto) => produto?.id === item?.produto
          );
          return {
            ...item,
            produtoNome: produto?.nome,
          };
        });
        setItemsPedido(items);
      });
  }, [id, produtos]);

  return (
    <div className="container mx-auto w-full flex flex-col items-center py-8 gap-8 text-gray-700 px-4">
      <h1 className="text-4xl font-bold ">Informações do Pedido</h1>

      <div className="lg:max-w-6xl text-md sm:text-lg text-center">
        <div>
          <div className="flex justify-between md:grid grid-cols-[100px_1fr_1fr_1fr] text-gray-200 bg-teal-600 rounded-t-lg py-2 px-4 md:py-4 md:px-8">
            <h3>Data</h3>
            <h3>Nome</h3>
            <h3>Email</h3>
            <h3>CPF</h3>
          </div>
          <div className="flex justify-between items-center sm:grid grid-cols-[100px_1fr_1fr_1fr] text-gray-700 bg-gray-200 last:rounded-b-lg  py-2 px-4 md:py-4 md:px-8">
            <p>{pedido.data}</p>
            <p>{cliente.nome}</p>
            <p>{cliente.email}</p>
            <p>{cliente.cpf}</p>
          </div>
        </div>
        <div className="flex justify-between sm:grid grid-cols-[400px_1fr] text-gray-200 bg-teal-600 rounded-t-lg py-2 px-4 md:py-4 md:px-8 mt-8">
          <h3>Produto Nome</h3>
          <h3>Quantidade</h3>
        </div>
        {itemsPedido.map((item) => (
          <div className="flex justify-between items-center sm:grid grid-cols-[400px_1fr] bg-gray-200 last:rounded-b-md py-2 px-4 md:py-4 md:px-8">
            <p>{item.produtoNome}</p>
            <p>{item.quantidade}</p>
          </div>
        ))}
      </div>
      <a href="/">
        <button className="text-gray-200 bg-teal-600 px-4 py-2 rounded-md hover:bg-teal-500 transition">
          Voltar a Página de Pedidos
        </button>
      </a>
    </div>
  );
}
