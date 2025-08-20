import { useDebugValue, useEffect, useState } from "react";
import styles from "./Moviment.module.css";
import axios from "axios";

function Moviment() {
  const [movimentacoes, setMovimentacoes] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("INCOME");
  const [value, setValue] = useState(0);

  useEffect(() => {
    getFromApi();
  }, []);

  function getFromApi() {
    axios
      .get("http://localhost:8080/api")
      .then((response) => {
        setMovimentacoes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function postOnApi() {
    const saveMoviment = {
      name,
      description,
      value,
      transactionType,
      transactionDate: new Date().toISOString(),
    };

    axios
      .post("http://localhost:8080/api/saveMovimentacao")
      .then(() => {
        setName("");
        setDescription("");
        setTransactionType("INCOME");
        setValue(0);

        getFromApi();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="styles.savehome">
      <form onSubmit={postOnApi}>
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

export default Moviment;
