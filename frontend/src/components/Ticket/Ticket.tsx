import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { matchQuery} from '../../queries/matchQuery';
import type {Match} from '../../types/Match.ts';
import styles from "./Ticket.module.scss";
import Stadium from "../Stadium/StadiumMap.tsx";

export default function Ticket() {
    const { id } = useParams<{ id: string }>();
    const [match, setMatch] = useState<Match | null>(null);

    useEffect(() => {
        if (id) {
            matchQuery.getMatch(parseInt(id))
                .then(setMatch)
                .catch(console.error);
        }
    }, [id]);

    return (
        <div className={styles.Main}>
            {match && (
                <div className={styles.Matchup}>
                    <h2>Chaber Pobiedziska vs {match.przeciwnik}</h2>
                    <p>{new Date(match.data_meczu).toLocaleDateString('pl-PL')}</p>
                    <p className={match.czy_domowy ? styles.homeMatch : styles.awayMatch}>
                        {match.czy_domowy ? '🏟️ Mecz domowy' : '🚌 Mecz wyjazdowy'}
                    </p>
                    {!match.czy_domowy && (
                        <p className={styles.stadiumInfo}>
                            📍 {match.stadion}, {match.miasto}
                        </p>
                    )}
                </div>
            )}
            <Stadium />
        </div>
    );
}