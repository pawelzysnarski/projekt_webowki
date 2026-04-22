import { useParams, useNavigate } from "react-router-dom";
import useStaff from "../../queries/staffQuery";
import styles from "./StaffDesc.module.scss";
import type { Personel } from "../../types/Personel.ts";

export default function StaffDesc() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: staffList } = useStaff();

    const member = staffList?.find((s: Personel) => s.ID == Number(id));

    if (!member) return <div className={styles.NotFound}>Nie znaleziono członka personelu</div>;

    return (
        <div className={styles.Wrapper}>
            <button onClick={() => navigate(-1)} className={styles.BackButton}>
                ← Wróć do listy
            </button>

            <div className={styles.ProfileCard}>
                <div className={styles.Hero}>
                    <img src={`/staff/${member.ID}.png`} alt="staff" className={styles.MainImg} />
                    <div className={styles.NameOverlay}>
                        <h1>{member.Imie} {member.Nazwisko}</h1>
                        <p>{member.Profesja}</p>
                    </div>
                </div>

                <div className={styles.Details}>
                    <div className={styles.DetailItem}>
                        <strong>Kraj:</strong> <span>{member.Kraj}</span>
                    </div>
                    <div className={styles.DetailItem}>
                        <strong>Stanowisko:</strong> <span>{member.Profesja}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
