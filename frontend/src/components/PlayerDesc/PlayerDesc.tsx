import { useParams, useNavigate } from "react-router-dom";
import usePlayers from "../../queries/playersQuery";
import styles from "./PlayerDesc.module.scss";
import type {Zawodnik} from "../../types/Zawodnik.ts";

export default function PlayerDesc() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: players } = usePlayers();
    const player = players?.find((p:Zawodnik) => p.ID === Number(id));

    if (!player) return <div className={styles.NotFound}>Nie znaleziono zawodnika</div>;

    return (
        <div className={styles.Wrapper}>
            <button onClick={() => navigate(-1)} className={styles.BackButton}>
                ← Wróć do składu
            </button>

            <div className={styles.ProfileCard}>
                <div className={styles.Hero}>
                    <img src={`/players/${player.Numer}.png`} alt="player" className={styles.MainImg} />
                    <div className={styles.NameOverlay}>
                        <span>#{player.Numer}</span>
                        <h1>{player.Imie} {player.Nazwisko}</h1>
                        <p>{player.Pozycja}</p>
                    </div>
                </div>

                <div className={styles.StatsGrid}>
                    <div className={styles.StatBox}>
                        <span className={styles.Value}>{player.Mecze}</span>
                        <span className={styles.Label}>Mecze</span>
                    </div>
                    <div className={styles.StatBox}>
                        <span className={styles.Value}>{player.Bramki}</span>
                        <span className={styles.Label}>Bramki</span>
                    </div>
                    <div className={styles.StatBox}>
                        <span className={styles.Value}>{player.Asysty}</span>
                        <span className={styles.Label}>Asysty</span>
                    </div>
                </div>

                <div className={styles.Details}>
                    <div className={styles.DetailItem}>
                        <strong>Kraj:</strong> <span>{player.Kraj}</span>
                    </div>
                    <div className={styles.DetailItem}>
                        <strong>Wzrost:</strong> <span>{player.Wzrost} cm</span>
                    </div>
                    <div className={styles.DetailItem}>
                        <strong>Waga:</strong> <span>{player.Waga} kg</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
