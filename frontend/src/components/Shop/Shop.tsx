import styles from "./Shop.module.scss"

const items = [
    { id: 1, name: "Przedmiot1", price: "Cena" },
    { id: 2, name: "Przedmiot2", price: "Cena" },
    { id: 3, name: "Przedmiot3", price: "Cena" },
    { id: 4, name: "Przedmiot4", price: "Cena" },
    { id: 5, name: "Przedmiot5", price: "Cena" },
    { id: 6, name: "Przedmiot6", price: "Cena" },
    { id: 7, name: "Przedmiot7", price: "Cena" },
    { id: 8, name: "Przedmiot8", price: "Cena" },
    { id: 9, name: "Przedmiot9", price: "Cena" },
    { id: 10, name: "Przedmiot10", price: "Cena" },
    { id: 11, name: "Przedmiot11", price: "Cena" },
    { id: 12, name: "Przedmiot12", price: "Cena" },
]

export default function Shop() {
    return (
        <div>
            <main className={styles.Shop}>
                <div className={styles.shopHeader}>
                    <h2>Sklep Kibica</h2>
                    <p>Oficjalne akcesoria klubu Chaber Pobiedziska</p>
                </div>
                <div className={styles.shopGrid}>
                    {items.map(item => (
                        <div className={styles.shopItem} key={item.id}>
                            <div className={styles.itemPlaceholder}>
                                <span className={styles.itemNumber}>{item.id}</span>
                            </div>
                            <div className={styles.itemInfo}>
                                <p className={styles.itemName}>{item.name}</p>
                                <p className={styles.itemPrice}>{item.price}</p>
                                <button className={styles.buyButton}>Dodaj do koszyka</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
