import { useEffect, useState } from "react";
import styles from "./Tickets.module.scss";
import { NavLink, useParams } from "react-router";
import { matchQuery} from "../../queries/matchQuery.ts";
import type {Match} from '../../types/Match.ts';

export default function Tickets() {
    const { id } = useParams<{ id: string }>();
    const [match, setMatch] = useState<Match | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            matchQuery.getMatch(parseInt(id))
                .then(data => {
                    setMatch(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return (
            <main className={styles.Main}>
                <div className={styles.loading}>Ładowanie...</div>
            </main>
        );
    }

    const isHomeMatch = match?.czy_domowy ?? true;
    const opponent = match?.przeciwnik || '...';
    const matchDate = match?.data_meczu
        ? new Date(match.data_meczu).toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : '...';

    return (
        <main className={styles.Main}>
            {isHomeMatch ? (
                <>
                    <NavLink to={`/bilety/${id}/brazowy_los`} className={styles.Ticket}>
                        <div className={styles.Ticket_container_1}>
                            <div className={styles.Ticket_container_matchup}>
                                <h5 className={styles.Ticket_container_title}>
                                    🏟️ Chaber vs {opponent}
                                </h5>
                                <h5 className={styles.Ticket_container_date}>{matchDate}</h5>
                            </div>
                            <h1 className={styles.Ticket_container_type}>Brązowy Łoś</h1>
                            <p className={styles.Ticket_container_price}>od 50 zł</p>
                            <p className={styles.Ticket_container_info}>
                                <span>Sektory A, C</span>
                            </p>
                        </div>
                    </NavLink>
                    <NavLink to={`/bilety/${id}/srebrny_jez`} className={styles.Ticket}>
                        <div className={styles.Ticket_container_2}>
                            <div className={styles.Ticket_container_matchup}>
                                <h5 className={styles.Ticket_container_title}>
                                    🏟️ Chaber vs {opponent}
                                </h5>
                                <h5 className={styles.Ticket_container_date}>{matchDate}</h5>
                            </div>
                            <h1 className={styles.Ticket_container_type}>Srebrny Jeż</h1>
                            <p className={styles.Ticket_container_price}>od 90 zł</p>
                            <p className={styles.Ticket_container_info}>
                                <span>Sektor B</span>
                            </p>
                        </div>
                    </NavLink>
                    <NavLink to={`/bilety/${id}/zloty_jelen`} className={styles.Ticket}>
                        <div className={styles.Ticket_container_3}>
                            <div className={styles.Ticket_container_matchup}>
                                <h5 className={styles.Ticket_container_title}>
                                    🏟️ Chaber vs {opponent}
                                </h5>
                                <h5 className={styles.Ticket_container_date}>{matchDate}</h5>
                            </div>
                            <h1 className={styles.Ticket_container_type}>Złoty Jeleń</h1>
                            <p className={styles.Ticket_container_price}>od 150 zł</p>
                            <p className={styles.Ticket_container_info}>
                                <span>Sektor D · VIP</span>
                            </p>
                        </div>
                    </NavLink>
                </>
            ) : (
                <>
                    <div className={styles.awayHeader}>
                        <span className={styles.awayIcon}>🚌</span>
                        <h2>Mecz wyjazdowy</h2>
                        <p>{opponent}</p>
                        <p>{matchDate}</p>
                        {match?.stadion && (
                            <p className={styles.awayStadium}>📍 {match.stadion}, {match.miasto}</p>
                        )}
                    </div>
                    <NavLink to={`/bilety/${id}/normalny`} className={styles.Ticket}>
                        <div className={styles.Ticket_container_away}>
                            <div className={styles.Ticket_container_matchup}>
                                <h5 className={styles.Ticket_container_title}>
                                    🚌 {opponent} vs Chaber
                                </h5>
                                <h5 className={styles.Ticket_container_date}>{matchDate}</h5>
                            </div>
                            <h1 className={styles.Ticket_container_type}>Bilet Normalny</h1>
                            <p className={styles.Ticket_container_price}>od 45 zł</p>
                            <p className={styles.Ticket_container_info}>
                                <span>Sektor Gości (B1)</span>
                            </p>
                        </div>
                    </NavLink>
                </>
            )}
            <div className={styles.Learn_more}>
                <NavLink className={styles.Learn_more_link} to={"/bilety/karnet"}>
                    <button className={styles.Learn_more_button}>🎫 Dowiedz się więcej o karnecie</button>
                </NavLink>
            </div>
        </main>
    );
}