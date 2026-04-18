import Product from "../../components/Product/Product";
import styles from "./ProductPage.module.scss";

export default function ProductPage() {
    return (
        <div className={styles.productPage}>
            <Product />
        </div>
    );
}