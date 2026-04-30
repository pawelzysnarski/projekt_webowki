import PlayerData from "../../components/PlayerData/PlayerData";
import StaffData from "../../components/StaffData/StaffData";
import usePlayers from "../../queries/playersQuery";
import useStaff from "../../queries/staffQuery";
import type { Player } from "../../types/Player.ts";
import type { Personel } from "../../types/Personel";
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
                {playersData.filter((p: Player) => p.Pozycja === "Bramkarz").map((player: Player) => (
                    <PlayerData key={player.ID} player={player} />
                ))}
            </div>

            <h2 className={styles.Heading}>Obrońcy</h2>
            <div className={styles.Grid}>
                {playersData.filter((p: Player) => p.Pozycja === "Obrońca").map((player: Player) => (
                    <PlayerData key={player.ID} player={player} />
                ))}
            </div>

            <h2 className={styles.Heading}>Pomocnicy</h2>
            <div className={styles.Grid}>
                {playersData.filter((p: Player) => p.Pozycja === "Pomocnik").map((player: Player) => (
                    <PlayerData key={player.ID} player={player} />
                ))}
            </div>

            <h2 className={styles.Heading}>Napastnicy</h2>
            <div className={styles.Grid}>
                {playersData.filter((p: Player) => p.Pozycja === "Napastnik").map((player: Player) => (
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
