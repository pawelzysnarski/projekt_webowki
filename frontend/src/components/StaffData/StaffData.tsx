import type { Personel } from "../../types/Personel.ts";
import styles from "./StaffData.module.scss";

export default function StaffData({ member }: { member: Personel }) {
    return (
        <div className={styles.Contener}>
            <img src={`/staff/${member.ID}.png`} alt="staff" className={styles.PImage}/>
            <div className={styles.Overlay}>
                <span className={styles.Role}>{member.Profesja}</span>
                <span className={styles.Country}>{member.Kraj}</span>
                <a href={`/personel/${member.ID}`} className={styles.ProfileLink}>
                    Szczegóły
                </a>
            </div>
            <div className={styles.Desc}>
                <h4>{member.Imie}</h4>
                <h4>{member.Nazwisko}</h4>
            </div>
        </div>
    );
}
