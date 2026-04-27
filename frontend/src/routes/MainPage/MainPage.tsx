import { useNavigate } from "react-router-dom";
import useNews from "../../queries/newsQuery";
import News from "../../components/News/News";
import styles from "./MainPage.module.scss";
import TableMini from "../../components/Table/TableMini.tsx";
import type {NewsItem} from "../../types/Wiadomosc.ts";
import NewsMini from "../../components/News/NewsMini.tsx";

export default function MainPage() {
    const navigate = useNavigate();
    const { data: news } = useNews();
    const latestPost = news?.[0];

    return (
        <main className={styles.MainPage}>
            <div className={styles.Layout}>
                <aside className={styles.SponsorSidebar}>
                    <div className={styles.SponsorSticky}>
                        <p>Sponsor Główny</p>
                        <div className={styles.SponsorImage}>
                            <img src="/baner_sp.png" alt="Sponsor" />
                        </div>
                    </div>
                </aside>

                <div className={styles.CenterContent}>
                    <section className={styles.MainNews}>
                        {latestPost && <News item={latestPost} />}
                        <div className={styles.NewsGrid}>
                            {news?.slice(1, 5).map((n: NewsItem) => (
                                <NewsMini key={n.ID} item={n} />
                            ))}
                        </div>
                    </section>

                    <section className={styles.QuickActions}>
                        <div className={styles.ActionCard} onClick={() => navigate("/bilety")}>
                            <h2>Bilety</h2>
                            <span>Kup teraz →</span>
                        </div>
                        <div className={styles.ActionCard} onClick={() => navigate("/sklep")}>
                            <h2>Sklep</h2>
                            <span>Zobacz ofertę →</span>
                        </div>
                    </section>
                </div>

                <aside className={styles.TableSidebar}>
                    <div className={styles.TableSticky}>
                        <h3>Tabela ligowa</h3>
                        <TableMini />
                    </div>
                </aside>
            </div>
        </main>
    );
}
