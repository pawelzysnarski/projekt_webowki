import {NavLink} from "react-router";
import styles from "./Menu.module.scss"
import logo from "../../logo.png"
import sponsor from "../../sponsor.png"
export default function Menu(){
    return(
        <nav className={styles.Menu}>
            <div className={styles.menuTop}>
                <img className={styles.Logo} src={logo} alt="Logo"/>
                <div className={styles.clubDesc}>
                    <h1 className={styles.clubName}>Chaber Pobiedziska</h1>
                    <p className={styles.desc}>Strona najbardziej utytułowanego klubu w całej Polsce</p>
                    <ul className={styles.titlesYears}>
                        <li>| 1921 |</li>
                        <li>1928 |</li>
                        <li>1934 |</li>
                        <li>1940 |</li>
                        <li>1942 |</li>
                        <li>1943 |</li>
                        <li>1967 |</li>
                        <li>1969 |</li>
                        <li>1981 |</li>
                        <li>1990 |</li>
                        <li>2001 |</li>
                        <li>2020 |</li>
                        <li>2024 |</li>
                    </ul>
                </div>
                <img className={styles.Sponsor} src={sponsor} alt="Sponsor"/>
            </div>
            <div className={styles.menuBottom}>
                <NavLink to="/">Strona główna</NavLink>
                <NavLink to="/aktualnosci">Aktualności</NavLink>
                <NavLink to="/terminarz">Terminarz</NavLink>
                <NavLink to="/druzyna">Drużyna</NavLink>
                <NavLink to="/akademia">Akademia</NavLink>
                <NavLink to="/bilety">Bilety</NavLink>
                <NavLink to="/sklep">Sklep</NavLink>
                <NavLink to="/kontakt">Kontakt</NavLink>
            </div>
        </nav>
    )
}
