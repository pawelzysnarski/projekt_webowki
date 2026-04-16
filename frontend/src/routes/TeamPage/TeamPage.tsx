import PlayerData from "../../components/PlayerData/PlayerData.tsx";
import usePlayers from "../../queries/playersQuery.ts";
import type { Zawodnik } from "../../types/Zawodnik.ts";
import styles from "./TeamPage.module.scss";

export default function TeamPage() {
    const { data: playersData, isLoading, isError, error } = usePlayers();

    if (isLoading) return <div className={styles.Loading}>Ładowanie zawodników...</div>;
    if (isError) return <div className={styles.Error}>Błąd: {error.message}</div>;

    return (
        <div className={styles.Container}>
            <h2 className={styles.Heading}>Bramkarze</h2>
            <div className={styles.Grid}>
                {playersData.filter((p: Zawodnik) => p.Pozycja === "Bramkarz").map((player: Zawodnik) => (
                    <PlayerData key={player.ID} player={player} />
                ))}
            </div>

            <h2 className={styles.Heading}>Obrońcy</h2>
            <div className={styles.Grid}>
                {playersData.filter((p: Zawodnik) => p.Pozycja === "Obrońca").map((player: Zawodnik) => (
                    <PlayerData key={player.ID} player={player} />
                ))}
            </div>

            <h2 className={styles.Heading}>Pomocnicy</h2>
            <div className={styles.Grid}>
                {playersData.filter((p: Zawodnik) => p.Pozycja === "Pomocnik").map((player: Zawodnik) => (
                    <PlayerData key={player.ID} player={player} />
                ))}
            </div>

            <h2 className={styles.Heading}>Napastnicy</h2>
            <div className={styles.Grid}>
                {playersData.filter((p: Zawodnik) => p.Pozycja === "Napastnik").map((player: Zawodnik) => (
                    <PlayerData key={player.ID} player={player} />
                ))}
            </div>
        </div>
    );
}
