import { useState } from "react";
import useMatches from "../../queries/matchDayQuery.ts";
import Match from "../../components/Match/Match";
import styles from "./TablePage.module.scss";
import type { Terminarz } from "../../types/Terminarz.ts";
import Table from "../../components/Table/Table.tsx";
import {useAllMatches} from "../../queries/matchDayQuery2.ts";

export default function TablePage() {
    const [userRound, setUserRound] = useState<number | null>(null);
    const { data: allMatches, isLoading: isLoadingAll } = useAllMatches();

    const calculatedRound = allMatches && allMatches.length > 0
        ? Math.ceil(allMatches.filter((m) => m.wynik != null).length/8)
        : 1;
    const currentRound = userRound ?? calculatedRound;
    const { data: matches, isLoading: isLoadingMatches, error } = useMatches(currentRound);

    if (error) return <div>Błąd: {error.message}</div>;
    if (isLoadingAll && !userRound) return <div className={styles.Loader}>Inicjalizacja...</div>;

    return (
        <div className={styles.Container}>
            <Table />
            <div className={styles.Nav}>
                <button
                    onClick={() => setUserRound(currentRound - 1)}
                    disabled={currentRound <= 1}
                >
                    Poprzednia kolejka
                </button>
                <h2>Kolejka {currentRound}</h2>
                <button
                    onClick={() => setUserRound(currentRound + 1)}
                    disabled={currentRound >= 30}
                >
                    Następna kolejka
                </button>
            </div>

            {isLoadingMatches ? (
                <div className={styles.Loader}>Ładowanie...</div>
            ) : (
                <div className={styles.MatchesGrid}>
                    {matches?.map((mecz: Terminarz) => (
                        <Match key={mecz.id} {...mecz} />
                    ))}
                </div>
            )}
        </div>
    );
}
