import type {Terminarz} from "../../types/Terminarz.ts";
import styles from "./Match.module.scss";

export default function Match(mecz:Terminarz) {
    return (
        <div className={styles.Match}>
            <div className={styles.Top}>
                <h6>{mecz.klubGospodarza.stadion}</h6>
            </div>
            <div className={styles.Left}>
                <img src={mecz.klubGospodarza.herb} alt="logo1"/>
                <h4>{mecz.klubGospodarza.nazwa}</h4>
            </div>
            <div className={styles.Center}>
                <p>{mecz.dataSpotkania.toDateString()}</p>
                <h4>{String(mecz.dataSpotkania.getHours()).padStart(2,"0")}:{String(mecz.dataSpotkania.getMinutes()).padStart(2,"0")}</h4>
            </div>
            <div className={styles.Right}>
                <img src={mecz.klubGoscia.herb} alt="logo2"/>
                <h4>{mecz.klubGoscia.nazwa}</h4>
            </div>
        </div>
    )
}