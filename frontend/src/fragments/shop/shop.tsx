import Menu from "../../fragments/menu/menu.tsx"
import "./shop.scss"

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
        <div className="App">
            <Menu />
            <main className="Shop">
                <div className="shopHeader">
                    <h2>Sklep Kibica</h2>
                    <p>Oficjalne akcesoria klubu Chaber Pobiedziska</p>
                </div>
                <div className="shopGrid">
                    {items.map(item => (
                        <div className="shopItem" key={item.id}>
                            <div className="itemPlaceholder">
                                <span className="itemNumber">{item.id}</span>
                            </div>
                            <div className="itemInfo">
                                <p className="itemName">{item.name}</p>
                                <p className="itemPrice">{item.price}</p>
                                <button className="buyButton">Dodaj do koszyka</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
