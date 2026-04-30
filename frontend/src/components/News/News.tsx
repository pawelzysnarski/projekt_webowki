import type { NewsItem } from "../../types/Information.ts";
import styles from "./News.module.scss";

export default function News({ item }: { item: NewsItem }) {
    return (
        <article className={styles.Article}>
            <div className={styles.ImageWrapper}>
                <img src={`/news/${item.Zdj_cie}`} alt="news" />
            </div>
            <div className={styles.Content}>
                <div className={styles.Meta}>
                    <time>{new Date(item.Data).toLocaleDateString('pl-PL')}</time>
                </div>
                <h2 className={styles.Title}>{item.Nag__wek}</h2>
                {item.akapity.map((akapit) => (
                    <p key={akapit.ID}>{akapit.Tre__}</p>
                ))}
            </div>
        </article>
    );
}
