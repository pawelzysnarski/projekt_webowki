import type {Terminarz} from "../../types/Terminarz";
import styles from "./Match.module.scss";

export default function Match(mecz: Terminarz) {
    const data = new Date(mecz.dataSpotkania);
    const godzina = `${String(data.getHours()).padStart(2,"0")}:${String(data.getMinutes()).padStart(2,"0")}`;
    const dataString = data.toLocaleDateString('pl-PL');

    return (
        <div className={styles.MatchCard}>
            <div className={styles.Top}>
                <h6>{mecz.gospodarz.stadion}</h6>
            </div>
            <div className={styles.TeamsRow}>
                <div className={styles.Team}>
                    <img src={`/logos/${mecz.gospodarz.herb}`} alt="" />
                    <span>{mecz.gospodarz.nazwa}</span>
                </div>

                <div className={styles.TimeBox}>
                    <span className={styles.Date}>{dataString}</span>
                    <span className={styles.Hour}>{godzina}</span>
                </div>

                <div className={styles.Team}>
                    <img src={`/logos/${mecz.gosc.herb}`} alt="" />
                    <span>{mecz.gosc.nazwa}</span>
                </div>
            </div>
        </div>
    );
}


