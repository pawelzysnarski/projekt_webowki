import styles from "./Tickets.module.scss"
import {NavLink} from "react-router";

export default function Tickets(){
    return(
        <main className={styles.Main}>
            <NavLink to={"/bilety/:id/brazowy_los"} className={styles.Ticket}>
                <div className={styles.Ticket_container_1}>
                    <div className={styles.Ticket_container_matchup}>
                        <h5 className={styles.Ticket_container_title}>Chaber Pobiedziska x Zatyłek Pobiedziska</h5>
                        <h5 className={styles.Ticket_container_date}>67 maja 2067 roku</h5>
                    </div>
                        <h1 className={styles.Ticket_container_type}>Brązowy Łoś</h1>
                </div>
            </NavLink>
            <NavLink to={"/bilety/:id/srebrny_jez"} className={styles.Ticket}>
                <div className={styles.Ticket_container_2}>
                    <div className={styles.Ticket_container_matchup}>
                        <h5 className={styles.Ticket_container_title}>Chaber Pobiedziska x Zatyłek Pobiedziska</h5>
                        <h5 className={styles.Ticket_container_date}>67 maja 2067 roku</h5>
                    </div>
                        <h1 className={styles.Ticket_container_type}>Srebrny Jeż</h1>
                </div>
            </NavLink>
            <NavLink to={"/bilety/:id/zloty_jelen"} className={styles.Ticket}>
                <div className={styles.Ticket_container_3}>
                    <div className={styles.Ticket_container_matchup}>
                        <h5 className={styles.Ticket_container_title}>Chaber Pobiedziska x Zatyłek Pobiedziska</h5>
                        <h5 className={styles.Ticket_container_date}>67 maja 2067 roku</h5>
                    </div>
                        <h1 className={styles.Ticket_container_type}>Złoty Jeleń</h1>
                </div>
            </NavLink>
        <div className={styles.Learn_more}>
            <NavLink className={styles.Learn_more_link} to={"/bilety/karnet"}>
                <button className={styles.Learn_more_button}>Dowiedz się więcej</button>
            </NavLink>
        </div>
    </main>
    )
}