import Order from "../../components/Order/Order";
import styles from "./OrderPage.module.scss";

export default function OrderPage() {
    return (
        <div className={styles.orderPage}>
            <Order />
        </div>
    );
}