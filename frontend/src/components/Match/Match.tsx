import type { Terminarz } from "../../types/Terminarz";
import styles from "./Match.module.scss";

export default function Match(mecz: Terminarz) {
    const data = new Date(mecz.dataSpotkania);
    const teraz = new Date();
    const godzina = `${String(data.getHours()).padStart(2, "0")}:${String(data.getMinutes()).padStart(2, "0")}`;
    const dataString = data.toLocaleDateString('pl-PL');

    const diffMs = teraz.getTime() - data.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    const isMyClub = mecz.idGospodarza === 1 || mecz.idGoscia === 1;

    const renderStatus = () => {
        if (diffMs < 0) {
            return (
                <>
                    <span className={styles.Hour}>{godzina}</span>
                    <span className={styles.Date}>{dataString}</span>
                </>
            );
        }

        if (diffHours >= 0 && diffHours <= 2) {
            return <span className={styles.Live}>MECZ TRWA</span>;
        }

        if (mecz.wynik) {
            return (
                <span className={styles.Score}>
                    {mecz.wynik.bramkiGospodarzy} : {mecz.wynik.bramkiGosci}
                </span>
            );
        }

        return <span className={styles.Live}>MECZ TRWA</span>;
    };

    return (
        <div className={`${styles.MatchCard} ${isMyClub ? styles.MyMatch : ""}`}>
            <div className={styles.Top}>
                <h6>{mecz.gospodarz.stadion}</h6>
            </div>
            <div className={styles.TeamsRow}>
                <div className={styles.Team}>
                    <img src={`/logos/${mecz.gospodarz.herb}`} alt="" />
                    <span>{mecz.gospodarz.nazwa}</span>
                </div>

                <div className={styles.TimeBox}>
                    {renderStatus()}
                </div>

                <div className={styles.Team}>
                    <img src={`/logos/${mecz.gosc.herb}`} alt="" />
                    <span>{mecz.gosc.nazwa}</span>
                </div>
            </div>
        </div>
    );
}
