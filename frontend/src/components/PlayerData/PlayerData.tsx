import type { Player } from "../../types/Player.ts";
import styles from "./PlayerData.module.scss";

export default function PlayerData({ player }: { player: Player }) {
    return (
        <div className={styles.Contener}>
            <img src={`/players/${player.Numer}.png`} alt="player" className={styles.PImage}/>
            <div className={styles.Overlay}>
                <span className={styles.Number}>#{player.Numer}</span>
                <span className={styles.Country}>{player.Kraj}</span>
                <a href={`/zawodnik/${player.ID}`} className={styles.ProfileLink}>
                    Profil gracza
                </a>
            </div>

            <div className={styles.Desc}>
                <h4>{player.Imie}</h4>
                <h4>{player.Nazwisko}</h4>
            </div>
        </div>
    );
}
