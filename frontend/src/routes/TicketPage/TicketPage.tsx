import styles from "./TicketPage.module.scss"
import {NavLink} from "react-router"
import {useEffect, useState} from "react";
import { matchQuery, type Match } from '../../queries/matchQuery';

export default function TicketPage(){
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        matchQuery.getUpcomingMatches()
            .then(setMatches)
            .catch(console.error);
    }, []);

    return(
        <main className={styles.Main}>
            {matches.map(match => (
                <NavLink
                    key={match.id}
                    to={`/bilety/${match.id}`}
                    className={styles.Link_ticket}
                >
                    <div className={styles.Ticket_container}>
                        <div className={styles.Ticket_container_matchup}>
                            <h3 className={styles.Ticket_container_title}>
                                Chaber Pobiedziska vs {match.przeciwnik}
                            </h3>
                            <h5 className={styles.Ticket_container_date}>
                                {new Date(match.data_meczu).toLocaleDateString('pl-PL')}
                            </h5>
                        </div>
                    </div>
                </NavLink>
            ))}
            <NavLink to={"/bilety/karnet"} className={styles.Link_pass}>
                <div className={styles.Pass_container}>
                    <h2 className={styles.Pass_container_title}>Karnet sezonowy Chaber Pobiedziska</h2>
                    <h5 className={styles.Pass_container_subtitle}>Kliknij aby dowiedzieć się więcej</h5>
                </div>
            </NavLink>
        </main>
    )
}