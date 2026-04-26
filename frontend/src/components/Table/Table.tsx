import styles from "./Table.module.scss";
import useTable from "../../queries/tableQuery.ts";
import type {Tabela} from "../../types/Tabela.ts";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function Table() {
    const queryClient = useQueryClient();
    const {data: tableData, isLoading, isError, error} = useTable();

    useEffect(() => {
        const interval = setInterval(() => {
            queryClient.invalidateQueries({ queryKey: ['table'] });
        }, 5000);

        return () => clearInterval(interval);
    }, [queryClient]);

    if (isLoading) return <div>Ładowanie tabeli...</div>;
    if (isError) return <div>Błąd: {error.message}</div>;

    const sortedData = [...(tableData || [])].sort((a, b) => {
        if (b.punkty !== a.punkty) return b.punkty - a.punkty;
        if (b.bilansBramek !== a.bilansBramek) return b.bilansBramek - a.bilansBramek;
        return b.goleZdobyte - a.goleZdobyte;
    });

    return (
        <div className={styles.TableContainer}>
            <table className={styles.Table}>
                <thead>
                <tr>
                    <th>Lp.</th>
                    <th className={styles.LeftAlign}>Klub</th>
                    <th>M</th>
                    <th>Z</th>
                    <th>R</th>
                    <th>P</th>
                    <th>G+</th>
                    <th>G-</th>
                    <th>+/-</th>
                    <th>PKT</th>
                </tr>
                </thead>
                <tbody>
                {sortedData.map((k: Tabela, index: number) => (
                    <tr key={k.idKlubu} className={k.idKlubu === 1 ? styles.MyClub : ""}>
                        <td className={styles.Pos}>{index + 1}</td>
                        <td className={styles.desc}>
                            <img src={`logos/${k.klub.herb}`} alt='logo'/>
                            <p>{k.klub.nazwa}</p>
                        </td>
                        <td>{k.mecze}</td>
                        <td>{k.zwyciestwa}</td>
                        <td>{k.remisy}</td>
                        <td>{k.porazki}</td>
                        <td>{k.goleZdobyte}</td>
                        <td>{k.goleStracone}</td>
                        <td className={styles.Bilans}>
                            {k.bilansBramek > 0 ? `+${k.bilansBramek}` : k.bilansBramek}
                        </td>
                        <td className={styles.Points}>{k.punkty}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
