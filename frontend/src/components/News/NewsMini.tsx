import type { NewsItem } from "../../types/Wiadomosc";
import styles from "./NewsMini.module.scss";

export default function NewsMini({ item }: { item: NewsItem }) {
    return (
        <article className={styles.Article} data-testid="news-mini">
            <div className={styles.ImageWrapper}>
                <img src={`/news/${item.Zdj_cie}`} alt="news" />
            </div>
            <div className={styles.Content}>
                <div className={styles.Meta}>
                    <time>{new Date(item.Data).toLocaleDateString('pl-PL')}</time>
                </div>
                <h2 className={styles.Title}>{item.Nag__wek}</h2>
            </div>
        </article>
    );
}
