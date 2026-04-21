import { useState } from "react";
import useMatches from "../../queries/matchDayQuery.ts";
import Match from "../../components/Match/Match";
import styles from "./TablePage.module.scss";
import type {Terminarz} from "../../types/Terminarz.ts";
import Table from "../../components/Table/Table.tsx";

interface TableProps {
    round: number;
}

export default function TablePage({ round: initialRound }: TableProps) {
    const [currentRound, setCurrentRound] = useState(initialRound);
    const { data: matches, isLoading, error } = useMatches(currentRound);

    if (error) return <div>Błąd: {error.message}</div>;

    return (
        <div className={styles.Container}>
            <Table/>

            <div className={styles.Nav}>
                <button
                    onClick={() => setCurrentRound(r => Math.max(1, r - 1))}
                    disabled={currentRound <= 1}
                >
                    Poprzednia kolejka
                </button>
                <h2>Kolejka {currentRound}</h2>
                <button
                    onClick={() => setCurrentRound(r => r + 1)}
                    disabled={currentRound >= 30}
                >
                    Następna kolejka
                </button>
            </div>

            {isLoading ? (
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
