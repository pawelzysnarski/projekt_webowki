import styles from "./Ticket.module.scss"
import Stadium from "../Stadium/StadiumMap.tsx"

export default function Ticket(){
    return(
        <div className={styles.Main}>
            <div className={styles.Matchup}>

            </div>
            <Stadium/>
        </div>
    )
}