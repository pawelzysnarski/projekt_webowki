import request from 'supertest';
import express from 'express';
import tableDbRouter from '../routes/tableDbRouter.js';
import matchesDbRouter from '../routes/matchesDbRouter.js';

const app = express();
app.use(express.json());
app.use('/api/table', tableDbRouter);
app.use('/api/matches', matchesDbRouter);

describe("Database Integrity Check", () => {
    test("Number of matches with results should equal half of total matches count in league table", async () => {
        const resTabela = await request(app).get('/api/table');
        const tabelaData = resTabela.body;

        const resMecze = await request(app).get('/api/matches');
        const meczeData = resMecze.body;

        const totalMatchesFromTable = tabelaData.reduce((sum: number, team: any) => {
            const m = team.mecze !== undefined ? team.mecze : (team.Mecze || 0);
            return sum + Number(m);
        }, 0);

        const expectedMatchesCount = totalMatchesFromTable / 2;
        const matchesWithResults = meczeData.filter((m: any) => m.wynik !== null && m.wynik !== undefined);

        expect(matchesWithResults.length).toBe(expectedMatchesCount);
    });

    test("Wins, draws, losses and points should match match history", async () => {
        const resTabela = await request(app).get('/api/table');
        const tabelaData = resTabela.body;

        const resMecze = await request(app).get('/api/matches');
        const meczeData = resMecze.body;

        const stats: Record<number, { w: number; r: number; p: number; pkt: number }> = {};

        tabelaData.forEach((klub: any) => {
            const id = klub.idKlubu || klub.ID_Klubu || klub.id;
            stats[id] = { w: 0, r: 0, p: 0, pkt: 0 };
        });

        meczeData.forEach((m: any) => {
            if (m.wynik) {
                const gID = m.idGospodarza || m.ID_Gospodarza;
                const goID = m.idGoscia || m.ID_Gościa;

                const bg = m.wynik.bramkiGospodarzy !== undefined ? m.wynik.bramkiGospodarzy : m.wynik.Bramki_Gospodarzy;
                const bgo = m.wynik.bramkiGosci !== undefined ? m.wynik.bramkiGosci : m.wynik.Bramki_Gości;

                if (bg > bgo) {
                    if (stats[gID]) { stats[gID].w++; stats[gID].pkt += 3; }
                    if (stats[goID]) { stats[goID].p++; }
                } else if (bgo > bg) {
                    if (stats[goID]) { stats[goID].w++; stats[goID].pkt += 3; }
                    if (stats[gID]) { stats[gID].p++; }
                } else {
                    if (stats[gID]) { stats[gID].r++; stats[gID].pkt += 1; }
                    if (stats[goID]) { stats[goID].r++; stats[goID].pkt += 1; }
                }
            }
        });

        tabelaData.forEach((klub: any) => {
            const id = klub.idKlubu || klub.ID_Klubu || klub.id;

            const pktTabela = klub.punkty !== undefined ? klub.punkty : klub.Punkty;
            const wTabela = klub.zwyciestwa !== undefined ? klub.zwyciestwa : klub.Zwycięstwa;
            const rTabela = klub.remisy !== undefined ? klub.remisy : klub.Remisy;
            const pTabela = klub.porazki !== undefined ? klub.porazki : klub.Porażki;

            expect(Number(pktTabela)).toBe(stats[id].pkt);
            expect(Number(wTabela)).toBe(stats[id].w);
            expect(Number(rTabela)).toBe(stats[id].r);
            expect(Number(pTabela)).toBe(stats[id].p);
        });
    });

    test("Goals scored and conceded in table should match match results", async () => {
        const resTabela = await request(app).get('/api/table');
        const tabelaData = resTabela.body;

        const resMecze = await request(app).get('/api/matches');
        const meczeData = resMecze.body;

        const goals: Record<number, { zdobyte: number; stracone: number }> = {};

        tabelaData.forEach((klub: any) => {
            const id = klub.idKlubu || klub.ID_Klubu || klub.id;
            goals[id] = { zdobyte: 0, stracone: 0 };
        });

        meczeData.forEach((m: any) => {
            if (m.wynik) {
                const gID = m.idGospodarza || m.ID_Gospodarza;
                const goID = m.idGoscia || m.ID_Gościa;

                const bg = m.wynik.bramkiGospodarzy !== undefined ? m.wynik.bramkiGospodarzy : m.wynik.Bramki_Gospodarzy;
                const bgo = m.wynik.bramkiGosci !== undefined ? m.wynik.bramkiGosci : m.wynik.Bramki_Gości;

                if (goals[gID]) {
                    goals[gID].zdobyte += Number(bg);
                    goals[gID].stracone += Number(bgo);
                }
                if (goals[goID]) {
                    goals[goID].zdobyte += Number(bgo);
                    goals[goID].stracone += Number(bg);
                }
            }
        });

        tabelaData.forEach((klub: any) => {
            const id = klub.idKlubu || klub.ID_Klubu || klub.id;

            const gzTabela = klub.goleZdobyte !== undefined ? klub.goleZdobyte : klub.Gole_Zdobyte;
            const gsTabela = klub.goleStracone !== undefined ? klub.goleStracone : klub.Gole_Stracone;
            const bilansTabela = klub.bilansBramek !== undefined ? klub.bilansBramek : klub.Bilans_Bramek;

            expect(Number(gzTabela)).toBe(goals[id].zdobyte);
            expect(Number(gsTabela)).toBe(goals[id].stracone);
            expect(Number(bilansTabela)).toBe(goals[id].zdobyte - goals[id].stracone);
        });
    });
});