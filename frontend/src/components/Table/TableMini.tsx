import styles from "./TableMini.module.scss";
import useTable from "../../queries/tableQuery.ts";
import type {Tabela} from "../../types/Tabela.ts";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function TableMini() {
    const queryClient = useQueryClient();
    const { data: tableMiniData, isLoading, isError, error } = useTable();

    useEffect(() => {
        const interval = setInterval(() => {
            queryClient.invalidateQueries({ queryKey: ['table'] });
        }, 0);

        return () => clearInterval(interval);
    }, [queryClient]);

    if (isLoading) return <div>Ładowanie tabeli...</div>;
    if (isError) return <div>Błąd: {error.message}</div>;

    const sortedData = [...(tableMiniData || [])].sort((a, b) => {
        if (b.punkty !== a.punkty) return b.punkty - a.punkty;
        if (b.bilansBramek !== a.bilansBramek) return b.bilansBramek - a.bilansBramek;
        return b.goleZdobyte - a.goleZdobyte;
    });

    return (
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
            {sortedData.map((k: Tabela) => (
                <tr key={k.idKlubu} className={k.idKlubu === 1 ? styles.MyClub : ""}>
                    <td className={styles.desc}>
                        <img src={`logos/${k.klub.herb}`} alt='logo'/>
                        <p>{k.klub.nazwa}</p>
                    </td>
                    <td>{k.mecze}</td>
                    <td>{k.bilansBramek}</td>
                    <td>{k.punkty}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}