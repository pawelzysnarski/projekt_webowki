import useNews from "../../queries/newsQuery";
import News from "../../components/News/News";
import styles from "./NewsPage.module.scss";
import type { NewsItem } from "../../types/Information.ts";

export default function NewsPage() {
    const { data: newsData, isLoading } = useNews();

    if (isLoading) return <div>Ładowanie aktualności...</div>;

    return (
        <div className={styles.PageContainer}>
            <div className={styles.NewsGrid}>
                {newsData?.map((item: NewsItem) => (
                    <News key={item.ID} item={item} />
                ))}
            </div>
        </div>
    );
}
