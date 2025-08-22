import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MovimentsList.module.css";

function MovimentsList() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("INCOME");
  const [value, setValue] = useState(0);

  useEffect(() => {
    fetchMovimentacoes();
  }, []);

  const fetchMovimentacoes = () => {
    //meu GET na API
    axios
      .get("http://localhost:8080/api")
      .then((response) => {
        setMovimentacoes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const saveMovimentacao = {
      name,
      description,
      value,
      transactionType,
      transactionDate: new Date().toISOString(),
    };

    axios
      .post("http://localhost:8080/api", saveMovimentacao)
      .then(() => {
        setName("");
        setDescription("");
        setValue(0);
        setTransactionType("INCOME");

        fetchMovimentacoes(); //atualizar valores
      })
      .catch((error) => {
        console.error(error);
      });
  };
  if (loading) {
    return <div> Carregando...</div>;
  }

  return (
    <div className={styles.users}>
      <h1>Lista de Movimentações</h1>
      <ul>
        {movimentacoes.map((movimentacoes) => (
          <li key={movimentacoes.id}>
            {movimentacoes.name}, {movimentacoes.value},{" "}
            {movimentacoes.description}
          </li>
        ))}
      </ul>

      <h2>Nova movimentação</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Digite o Titulo"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Digite a Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Digite o Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <select
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="INCOME">Entrada</option>
          <option value="EXPENSE">Saída</option>
        </select>
        <button type="submit">ENVIAR</button>
      </form>
    </div>
  );
}

export default MovimentsList;
