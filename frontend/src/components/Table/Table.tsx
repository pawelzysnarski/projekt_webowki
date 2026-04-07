import styles from "./Table.module.scss";
import {useQuery} from "@tanstack/react-query";

const getTableData = async () => {
    const res = await fetch('/api/table');
    if (!res.ok) throw new Error('Problem z pobraniem danych');
    return res.json();
};
export default function Table(){
    const { data: tableData, isLoading, isError, error } = useQuery({
        queryKey: ['table'],
        queryFn: getTableData,
    });
    if (isLoading) return <div>Ładowanie tabeli...</div>;
    if (isError) return <div>Błąd: {error.message}</div>;
    return(
        <table className={styles.Table}>
            <thead>
                <tr>
                    <th>Klub</th>
                    <th>M</th>
                    <th>Z</th>
                    <th>R</th>
                    <th>P</th>
                    <th>GZ</th>
                    <th>GS</th>
                    <th>BB</th>
                    <th>PKT</th>
                </tr>
            </thead>
            <tbody>
            {tableData?.map((k) => {
                return (
                    <tr key={k.idKlubu}>
                        <td className={styles.desc}><img src={`logos/${k.klub.herb}`} alt='logo'/><p>{k.klub.nazwa}</p> </td>
                        <td>{k.mecze}</td>
                        <td>{k.zwyciestwa}</td>
                        <td>{k.remisy}</td>
                        <td>{k.porazki}</td>
                        <td>{k.goleZdobyte}</td>
                        <td>{k.goleStracone}</td>
                        <td>{k.bilansBramek}</td>
                        <td>{k.punkty}</td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    )
}