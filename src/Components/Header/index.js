import styles from "./Header.module.css";

function Header(){
    return(
        <div >
            <navbar className={styles.header}>
                <span>DeFi Cash</span>
            <div className={styles.botoes}>
                <button>Entrada</button>
                <button>Saída</button>
            </div>
            </navbar>
        </div>
    )
}

export default Header;