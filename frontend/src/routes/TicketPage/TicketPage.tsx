import styles from "./TicketPage.module.scss"
import {NavLink} from "react-router"

export default function TicketPage(){
    return(
        <main className={styles.Main}>
            <NavLink to={"/bilety/:id"} className={styles.Link_ticket}>
            <div className={styles.Ticket_container}>
                <div className={styles.Ticket_container_matchup}>
                    <h3 className={styles.Ticket_container_title}>Chaber Pobiedziska x Zatyłek Pobiedziska</h3>
                    <h5 className={styles.Ticket_container_date}>67 maja 2067 roku</h5>
                </div>
            </div>
        </NavLink>
            <NavLink to={"/bilety/:id"} className={styles.Link_ticket}>
                <div className={styles.Ticket_container}>
                    <div className={styles.Ticket_container_matchup}>
                        <h3 className={styles.Ticket_container_title}>Chaber Pobiedziska x Zatyłek Pobiedziska</h3>
                        <h5 className={styles.Ticket_container_date}>67 maja 2067 roku</h5>
                    </div>
                </div>
            </NavLink>
            <NavLink to={"/bilety/karnet"} className={styles.Link_pass}>
                <div className={styles.Pass_container}>
                    <h2 className={styles.Pass_container_title}>Karnet sezonowy Chaber Pobiedziska</h2>
                    <h5 className={styles.Pass_container_subtitle}>Kliknij aby dowiedzieć się więcej</h5>
                </div>
            </NavLink>
        </main>
    )
}