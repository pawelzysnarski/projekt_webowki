import PlayerData from "../../components/PlayerData/PlayerData.tsx";
import StaffData from "../../components/StaffData/StaffData.tsx";
import usePlayers from "../../queries/playersQuery.ts";
import useStaff from "../../queries/staffQuery.ts";
import type { Zawodnik } from "../../types/Zawodnik.ts";
import type { Personel } from "../../types/Personel.ts";
import styles from "./TeamPage.module.scss";

export default function TeamPage() {
    const {
        data: playersData,
        isLoading: isPlayersLoading,
        isError: isPlayersError,
        error: playersError
    } = usePlayers();

    const {
        data: staffData,
        isLoading: isStaffLoading,
        isError: isStaffError,
        error: staffError
    } = useStaff();

    if (isPlayersLoading || isStaffLoading) return <div className={styles.Loading}>Ładowanie...</div>;
    if (isPlayersError) return <div className={styles.Error}>Błąd: {playersError.message}</div>;
    if (isStaffError) return <div className={styles.Error}>Błąd: {staffError.message}</div>;

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

            <h2 className={styles.Heading}>Sztab szkoleniowy</h2>
            <div className={styles.Grid}>
                {staffData?.map((member: Personel) => (
                    <StaffData key={member.ID} member={member} />
                ))}
            </div>
        </div>
    );
}
