import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <input placeholder="Nome" />
      <input placeholder="Descrição" />
      <input placeholder="Valor" />

      <select>
        <option value="">TIPO</option>
        <option value="1">Entrada</option>
        <option value="2">Saida</option>
      </select>
    </div>
  );
}

export default Home;
