import styles from "./TableMini.module.scss";
import useTable from "../../queries/tableQuery.ts";

export default function TableMini(){
    const { data: tableMiniData, isLoading, isError, error } = useTable();
    if (isLoading) return <div>Ładowanie tabeli...</div>;
    if (isError) return <div>Błąd: {error.message}</div>;
    return(
        <table className={styles.TableMini}>
            <thead>
            <tr>
                <th>Klub</th>
                <th>M</th>
                <th>BB</th>
                <th>PKT</th>
            </tr>
            </thead>
            <tbody>
            {tableMiniData?.map((k) => {
                return (
                    <tr key={k.idKlubu}>
                        <td className={styles.desc}><img src={`logos/${k.klub.herb}`} alt='logo'/><p>{k.klub.nazwa}</p> </td>
                        <td>{k.mecze}</td>
                        <td>{k.bilansBramek}</td>
                        <td>{k.punkty}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}