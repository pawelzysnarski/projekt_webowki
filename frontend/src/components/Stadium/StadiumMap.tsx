import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import { stadiumQuery } from '../../queries/stadiumQuery';
import type { Seat,SeatsResponse} from '../../types/Seat.ts';
import { matchQuery } from '../../queries/matchQuery';
import type {Match } from '../../types/Match';
import { useAuth } from '../../auth/AuthContext.tsx';
import styles from './StadiumMap.module.scss';
import type {Sector,TicketType} from '../../types/Sector.ts';

export default function StadiumMap() {
    const { id, type_id } = useParams<{ id: string; type_id?: string }>();
    const matchId = parseInt(id || '1');
    const { user } = useAuth();

    const getTicketTypeFromUrl = (): TicketType => {
        if (type_id === 'zloty_jelen') return 'zloty_jelen';
        if (type_id === 'srebrny_jez') return 'srebrny_jez';
        if (type_id === 'brazowy_los') return 'brazowy_los';
        return 'brazowy_los';
    };

    const [match, setMatch] = useState<Match | null>(null);
    const [seatsData, setSeatsData] = useState<SeatsResponse | null>(null);
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentTicketType, setCurrentTicketType] = useState<TicketType>(getTicketTypeFromUrl());

    useEffect(() => {
        setCurrentTicketType(getTicketTypeFromUrl());
    }, [type_id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const [matchData, seats] = await Promise.all([
                    matchQuery.getMatch(matchId),
                    stadiumQuery.getSeats(matchId)
                ]);

                setMatch(matchData);
                setSeatsData(seats);

                if (!seats.is_home) {
                    setCurrentTicketType('normalny');
                }

                const sectorMap = new Map<string, Seat[]>();

                if (!seats.seats || seats.seats.length === 0) {
                    setError('Brak dostępnych miejsc dla tego meczu');
                    setIsLoading(false);
                    return;
                }

                seats.seats.forEach(seat => {
                    if (!sectorMap.has(seat.sektor)) {
                        sectorMap.set(seat.sektor, []);
                    }
                    sectorMap.get(seat.sektor)!.push(seat);
                });

                const sectorColors: Record<string, string> = {
                    'A1': '#cd7f32', 'A2': '#cd7f32', 'A3': '#cd7f32', 'A4': '#cd7f32',
                    'C1': '#cd7f32', 'C2': '#cd7f32', 'C3': '#cd7f32', 'C4': '#cd7f32',
                    'B1': '#a8a8a8', 'B2': '#a8a8a8',
                    'D1': '#d4af37', 'D2': '#d4af37',
                };

                const sectorAllowedTypes: Record<string, TicketType[]> = {
                    'A1': ['brazowy_los'],
                    'A2': ['brazowy_los'],
                    'A3': ['brazowy_los'],
                    'A4': ['brazowy_los'],
                    'C1': ['brazowy_los'],
                    'C2': ['brazowy_los'],
                    'C3': ['brazowy_los'],
                    'C4': ['brazowy_los'],
                    'B1': ['srebrny_jez', 'normalny'],
                    'B2': ['srebrny_jez'],
                    'D1': ['zloty_jelen'],
                    'D2': ['zloty_jelen'],
                };

                const positions: Record<string, { x: number; y: number; width: number; height: number }> = {
                    'A1': { x: 85, y: 65, width: 80, height: 65 },
                    'A2': { x: 175, y: 65, width: 80, height: 65 },
                    'A3': { x: 265, y: 65, width: 80, height: 65 },
                    'A4': { x: 355, y: 65, width: 80, height: 65 },
                    'B1': { x: 455, y: 145, width: 55, height: 100 },
                    'B2': { x: 455, y: 255, width: 55, height: 100 },
                    'C1': { x: 85, y: 375, width: 80, height: 65 },
                    'C2': { x: 175, y: 375, width: 80, height: 65 },
                    'C3': { x: 265, y: 375, width: 80, height: 65 },
                    'C4': { x: 355, y: 375, width: 80, height: 65 },
                    'D1': { x: 20, y: 145, width: 55, height: 100 },
                    'D2': { x: 20, y: 255, width: 55, height: 100 },
                };

                const generatedSectors: Sector[] = [];
                const allSectorNames = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2'];

                for (const sectorName of allSectorNames) {
                    const sectorSeats = sectorMap.get(sectorName) || [];
                    const pos = positions[sectorName] || { x: 200, y: 200, width: 250, height: 200 };
                    const color = sectorColors[sectorName] || '#64748b';
                    const allowedTypes = sectorAllowedTypes[sectorName] || ['brazowy_los'];

                    generatedSectors.push({
                        id: `sector_${sectorName}`,
                        name: sectorName,
                        x: pos.x,
                        y: pos.y,
                        width: pos.width,
                        height: pos.height,
                        color: color,
                        seats: sectorSeats,
                        allowedTicketTypes: allowedTypes,
                    });
                }

                setSectors(generatedSectors);
            } catch (err) {
                console.error('Error loading stadium:', err);
                setError('Nie udało się załadować danych stadionu.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [matchId]);

    const handleSectorClick = (sector: Sector) => {
        if (!sector.allowedTicketTypes.includes(currentTicketType) && currentTicketType !== "normalny") {
            const typeName = getTicketTypeName(currentTicketType);
            const requiredTypes = sector.allowedTicketTypes.map(t => getTicketTypeName(t)).join(' lub ');
            alert(`Sektor ${sector.name} wymaga biletu typu: ${requiredTypes}\nTwój bilet: ${typeName}`);
            return;
        }
        setSelectedSector(sector);
        setSelectedSeat(null);
    };

    const handleBack = () => {
        setSelectedSector(null);
        setSelectedSeat(null);
    };

    const handleSeatClick = (seat: Seat) => {
        if (seat.czy_zajete) return;
        if (selectedSeat?.id === seat.id) {
            setSelectedSeat(null);
        } else {
            setSelectedSeat(seat);
        }
    };

    const getTicketTypeName = (type: TicketType): string => {
        switch (type) {
            case 'zloty_jelen': return 'Złoty Jeleń';
            case 'srebrny_jez': return 'Srebrny Jeż';
            case 'brazowy_los': return 'Brązowy Łoś';
            case 'normalny': return 'Bilet normalny';
            default: return 'Nieznany';
        }
    };

    const getTicketTypeColor = (type: TicketType): string => {
        switch (type) {
            case 'zloty_jelen': return '#d4af37';
            case 'srebrny_jez': return '#a8a8a8';
            case 'brazowy_los': return '#cd7f32';
            case 'normalny': return '#3b82f6';
            default: return '#3b82f6';
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
                <p>Ładowanie stadionu...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.error}>
                <p>❌ {error}</p>
                <button onClick={() => window.location.reload()} className={styles.retryButton}>Spróbuj ponownie</button>
            </div>
        );
    }

    if (sectors.length === 0) {
        return (
            <div className={styles.error}>
                <p>❌ Brak sektorów dla tego meczu</p>
            </div>
        );
    }

    if (selectedSector) {
        return (
            <SectorDetailView
                sector={selectedSector}
                onBack={handleBack}
                onSeatClick={handleSeatClick}
                selectedSeat={selectedSeat}
                currentTicketType={currentTicketType}
                matchId={matchId}
                user={user}
            />
        );
    }

    const isHomeMatch = seatsData?.is_home ?? true;

    return (
        <div className={styles.stadiumContainer}>
            <header className={styles.Stadium_header}>
                <h1 className={styles.Stadium_title}>
                    {isHomeMatch ? 'Arena imienia Tomasza Piotrkowskiego' : `Mecz wyjazdowy: ${match?.przeciwnik}`}
                </h1>
                <div className={styles.ticketTypeBadge} style={{ backgroundColor: getTicketTypeColor(currentTicketType) }}>
                    🎫 {getTicketTypeName(currentTicketType)}
                </div>
                {match && (
                    <p className={styles.matchInfo}>
                        {isHomeMatch ? '🏟️ Mecz domowy' : '🚌 Mecz wyjazdowy'} vs {match.przeciwnik}
                        {!isHomeMatch && match.stadion && ` - ${match.stadion}, ${match.miasto}`}
                    </p>
                )}
            </header>

            <div className={styles.stageWrapper}>
                <Stage width={530} height={540}>
                    <Layer>
                        <Rect x={100} y={150} width={335} height={200} fill="#22c55e" stroke="#166534" strokeWidth={3} cornerRadius={10} />
                        <Circle x={267} y={250} radius={35} stroke="white" strokeWidth={2} />
                        <Circle x={267} y={250} radius={12} stroke="white" fill="white" strokeWidth={2} />
                        <Rect x={110} y={160} width={315} height={180} stroke="white" strokeWidth={2} cornerRadius={10} />
                        <Rect x={267} y={160} width={1} height={180} stroke="white" strokeWidth={2} />
                    </Layer>

                    <Layer>
                        <Text x={130} y={135} width={275} fontSize={14} text={"Trybuna Północna"} fill="#c4a58b" fontStyle="bold" align="center" />
                        <Text x={130} y={358} width={275} fontSize={14} text={"Trybuna Południowa"} fill="#c4a58b" fontStyle="bold" align="center" />
                        <Text x={435} y={330} width={160} rotation={-90} fontSize={14} text={"Trybuna Wschodnia"} fill="#c4a58b" fontStyle="bold" align="center" />
                        <Text x={95} y={180} width={160} rotation={90} fontSize={14} text={"Trybuna Zachodnia"} fill="#c4a58b" fontStyle="bold" align="center" />
                    </Layer>

                    <Layer>
                        {sectors.map((sector) => {
                            const isAvailable = sector.allowedTicketTypes.includes(currentTicketType);
                            const hasSeats = sector.seats.length > 0;
                            const wolneMiejsca = sector.seats.filter(s => !s.czy_zajete).length;

                            return (
                                <React.Fragment key={sector.id}>
                                    <Rect
                                        x={sector.x} y={sector.y} width={sector.width} height={sector.height}
                                        fill={sector.color}
                                        stroke={isAvailable ? "white" : "#475569"}
                                        strokeWidth={2} cornerRadius={6}
                                        opacity={hasSeats ? (isAvailable ? 0.9 : 0.5) : 0.3}
                                        onClick={() => hasSeats && handleSectorClick(sector)}
                                        onMouseEnter={(e) => {
                                            const container = e.target.getStage()?.container();
                                            if (container && hasSeats) container.style.cursor = isAvailable ? 'pointer' : 'not-allowed';
                                        }}
                                        onMouseLeave={(e) => {
                                            const container = e.target.getStage()?.container();
                                            if (container) container.style.cursor = 'default';
                                        }}
                                    />
                                    <Text
                                        x={sector.x} y={sector.y + sector.height / 2 - 15}
                                        text={hasSeats ? `${sector.name}\n${wolneMiejsca} wolnych` : sector.name}
                                        fontSize={11} fontStyle="bold" fill="white" width={sector.width} align="center"
                                    />
                                </React.Fragment>
                            );
                        })}
                    </Layer>
                </Stage>
            </div>

            <div className={styles.instruction}>
                💡 {!isHomeMatch
                ? 'Tylko sektor B1 jest dostępny dla kibiców gości'
                : `Kliknij na sektor dostępny dla ${getTicketTypeName(currentTicketType)}`
            }
            </div>
        </div>
    );
}

const SectorDetailView: React.FC<{
    sector: Sector;
    onBack: () => void;
    onSeatClick: (seat: Seat) => void;
    selectedSeat: Seat | null;
    currentTicketType: TicketType;
    matchId: number;
    user: any;
}> = ({ sector, onBack, onSeatClick, selectedSeat, currentTicketType, matchId, user }) => {
    const seatsByRow: { [key: string]: Seat[] } = {};
    sector.seats.forEach(seat => {
        if (!seatsByRow[seat.rzad]) seatsByRow[seat.rzad] = [];
        seatsByRow[seat.rzad].push(seat);
    });

    const rows = Object.keys(seatsByRow).sort();

    const getSeatStatus = (seat: Seat) => {
        if (seat.czy_zajete) return 'reserved';
        if (selectedSeat?.id === seat.id) return 'selected';
        return 'available';
    };

    const wolneMiejsca = sector.seats.filter(s => !s.czy_zajete).length;

    const getTicketTypeName = (type: TicketType): string => {
        switch (type) {
            case 'zloty_jelen': return 'Złoty Jeleń';
            case 'srebrny_jez': return 'Srebrny Jeż';
            case 'brazowy_los': return 'Brązowy Łoś';
            case 'normalny': return 'Bilet normalny';
            default: return 'Nieznany';
        }
    };

    return (
        <div>
            <header className={styles.Stadium_header}>
                <button onClick={onBack} className={styles.backButton}>← Powrót do mapy</button>
                <h1 className={styles.Stadium_title}>
                    Sektor {sector.name} - {getTicketTypeName(currentTicketType)}
                    <span className={styles.seatCount}> ({wolneMiejsca} wolnych)</span>
                </h1>
                <div className={styles.legend}>
                    <span className={styles.legendDotAvailable}></span> Wolne
                    <span className={styles.legendDotReserved}></span> Zajęte
                    <span className={styles.legendDotSelected}></span> Wybrane
                </div>
            </header>

            <div className={styles.seatMapContainer}>
                <div className={styles.seatMap}>
                    <div className={styles.pitchIndicator}>⬆️ Murawa ⬆️</div>
                    {rows.map((row) => (
                        <div key={row} className={styles.seatRow}>
                            <div className={styles.rowLabel}>{row}</div>
                            <div className={styles.seatsGrid}>
                                {seatsByRow[row].sort((a, b) => a.numer - b.numer).map((seat) => {
                                    const status = getSeatStatus(seat);
                                    return (
                                        <button
                                            key={seat.id}
                                            className={`${styles.seat} ${styles[`seat${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}
                                            onClick={() => onSeatClick(seat)}
                                            disabled={seat.czy_zajete}
                                            title={`Miejsce ${seat.numer} - ${Number(seat.cena).toFixed(2)} zł`}
                                        >
                                            <span className={styles.seatNumber}>{seat.numer}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedSeat && !selectedSeat.czy_zajete && (
                <div className={styles.seatPanel}>
                    <div className={styles.seatPanelHeader}>
                        <h3>🎫 Wybrane miejsce</h3>
                        <button onClick={onBack} className={styles.closePanel}>×</button>
                    </div>
                    <div className={styles.seatPanelContent}>
                        <div className={styles.seatInfo}>
                            <span className={styles.seatInfoLabel}>Sektor:</span>
                            <span className={styles.seatInfoValue}>{sector.name}</span>
                        </div>
                        <div className={styles.seatInfo}>
                            <span className={styles.seatInfoLabel}>Miejsce:</span>
                            <span className={styles.seatInfoValue}>{selectedSeat.numer}</span>
                        </div>
                        <div className={styles.seatInfo}>
                            <span className={styles.seatInfoLabel}>Rząd:</span>
                            <span className={styles.seatInfoValue}>{selectedSeat.rzad}</span>
                        </div>
                        <div className={styles.seatInfo}>
                            <span className={styles.seatInfoLabel}>Cena:</span>
                            <span className={styles.seatInfoValue}>{Number(selectedSeat.cena).toFixed(2)} zł</span>
                        </div>
                        <div className={styles.seatInfo}>
                            <span className={styles.seatInfoLabel}>Typ biletu:</span>
                            <span className={styles.seatInfoValue}>{getTicketTypeName(currentTicketType)}</span>
                        </div>
                    </div>
                    <div className={styles.seatPanelActions}>
                        <button className={styles.buyButton} onClick={async () => {
                            if (!selectedSeat) return;
                            try {
                                const response = await fetch('/api/tickets/tickets/buy', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        matchId: matchId,
                                        seatId: selectedSeat.id,
                                        firstName: user?.imie || 'Kibic',
                                        lastName: user?.nazwisko || 'Testowy',
                                        email: user?.email || 'kibic@test.pl',
                                        ticketType: currentTicketType
                                    })
                                });
                                const data = await response.json();
                                if (data.success) {
                                    alert(`Bilet zakupiony!\nKod: ${data.ticket.kod_biletu}`);
                                    onBack();
                                    window.location.reload();
                                } else {
                                    alert('Błąd: ' + (data.error || 'Nieznany błąd'));
                                }
                            } catch (error) {
                                console.error('Error:', error);
                                alert('Błąd zakupu biletu');
                            }
                        }}>Kup bilet</button>
                        <button onClick={() => onSeatClick(selectedSeat!)} className={styles.cancelButton}>Anuluj</button>
                    </div>
                </div>
            )}
        </div>
    );
};