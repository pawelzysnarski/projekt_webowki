import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import { stadiumQuery, type Seat, type SeatsResponse } from '../../queries/stadiumQuery';
import { matchQuery, type Match } from '../../queries/matchQuery';
import styles from './StadiumMap.module.scss';

type TicketType = 'zloty_jelen' | 'srebrny_jez' | 'brazowy_los' | 'normalny';

interface Sector {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    seats: Seat[];
    allowedTicketTypes: TicketType[];
}

export default function StadiumMap() {
    const { id, type_id } = useParams<{ id: string; type_id?: string }>();
    const matchId = parseInt(id || '1');

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

                console.log('Fetching data for match:', matchId);

                const [matchData, seats] = await Promise.all([
                    matchQuery.getMatch(matchId),
                    stadiumQuery.getSeats(matchId)
                ]);

                console.log('Match data:', matchData);
                console.log('Seats data:', seats);

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

                console.log('Sectors found:', Array.from(sectorMap.keys()));

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
                    'B1': ['srebrny_jez','normalny'],
                    'B2': ['srebrny_jez'],
                    'D1': ['zloty_jelen'],
                    'D2': ['zloty_jelen'],
                };

                const positions: Record<string, { x: number; y: number; width: number; height: number }> = {
                    'A1': { x: 130, y: 120, width: 90, height: 70 },
                    'A2': { x: 230, y: 120, width: 90, height: 70 },
                    'A3': { x: 330, y: 120, width: 90, height: 70 },
                    'A4': { x: 430, y: 120, width: 90, height: 70 },
                    'B1': { x: 530, y: 170, width: 60, height: 110 },
                    'B2': { x: 530, y: 290, width: 60, height: 110 },
                    'C1': { x: 130, y: 410, width: 90, height: 70 },
                    'C2': { x: 230, y: 410, width: 90, height: 70 },
                    'C3': { x: 330, y: 410, width: 90, height: 70 },
                    'C4': { x: 430, y: 410, width: 90, height: 70 },
                    'D1': { x: 60, y: 170, width: 60, height: 110 },
                    'D2': { x: 60, y: 290, width: 60, height: 110 },
                };

                const generatedSectors: Sector[] = [];

                const allSectorNames = seats.is_home
                    ? ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2']
                    : ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2'];

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

                console.log('Generated sectors:', generatedSectors.length);
                setSectors(generatedSectors);

            } catch (err) {
                console.error('Error loading stadium:', err);
                setError('Nie udało się załadować danych stadionu. Sprawdź czy backend działa.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [matchId]);

    const handleSectorClick = (sector: Sector) => {
        if (!sector.allowedTicketTypes.includes(currentTicketType) && currentTicketType!="normalny") {
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
        setSelectedSeat(seat);
    };

    const getTicketTypeName = (type: TicketType): string => {
        switch(type) {
            case 'zloty_jelen': return 'Złoty Jeleń';
            case 'srebrny_jez': return 'Srebrny Jeż';
            case 'brazowy_los': return 'Brązowy Łoś';
            case 'normalny': return 'Bilet normalny';
            default: return 'Nieznany';
        }
    };

    const getTicketTypeColor = (type: TicketType): string => {
        switch(type) {
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
                <button onClick={() => window.location.reload()} className={styles.retryButton}>
                    Spróbuj ponownie
                </button>
            </div>
        );
    }

    if (sectors.length === 0) {
        return (
            <div className={styles.error}>
                <p>❌ Brak sektorów dla tego meczu</p>
                <p>Sprawdź dane w bazie lub skontaktuj się z administratorem</p>
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
                isHome={seatsData?.is_home ?? true}
                currentTicketType={currentTicketType}
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
                <Stage width={650} height={601}>
                    {/* Boisko */}
                    <Layer>
                        <Rect
                            x={175}
                            y={195}
                            width={300}
                            height={210}
                            fill="#22c55e"
                            stroke="#166534"
                            strokeWidth={3}
                            cornerRadius={10}
                        />
                        <Circle x={325} y={300} radius={35} stroke="white" strokeWidth={2} />
                        <Circle x={325} y={300} radius={12} stroke="white" fill="white" strokeWidth={2} />
                        <Rect x={185} y={205} width={280} height={190} stroke="white" strokeWidth={2} cornerRadius={10} />
                        <Rect x={325} y={205} width={1} height={190} stroke="white" strokeWidth={2} />
                    </Layer>

                    {/* Etykiety trybun */}
                    <Layer>
                        <Text x={260} y={165} width={130} fontSize={16} text={"Trybuna Północna"} fill="#1a0f09" fontStyle="bold" align="center" />
                        <Text x={260} y={415} width={130} fontSize={16} text={"Trybuna Południowa"} fill="#1a0f09" fontStyle="bold" align="center" />
                        <Text x={480} y={380} width={130} rotation={-90} fontSize={16} text={"Trybuna Wschodnia"} fill="#1a0f09" fontStyle="bold" />
                        <Text x={115} y={230} width={130} rotation={90} fontSize={16} text={"Trybuna Zachodnia"} fill="#1a0f09" fontStyle="bold" />
                    </Layer>

                    {/* Sektory */}
                    <Layer>
                        {sectors.map((sector) => {
                            const isAvailable = sector.allowedTicketTypes.includes(currentTicketType);
                            const hasSeats = sector.seats.length > 0;
                            const wolneMiejsca = sector.seats.filter(s => !s.czy_zajete).length;

                            return (
                                <React.Fragment key={sector.id}>
                                    <Rect
                                        x={sector.x}
                                        y={sector.y}
                                        width={sector.width}
                                        height={sector.height}
                                        fill={sector.color}
                                        stroke={isAvailable ? "white" : "#475569"}
                                        strokeWidth={2}
                                        cornerRadius={8}
                                        opacity={hasSeats ? (isAvailable ? 0.9 : 0.5) : 0.3}
                                        onClick={() => hasSeats && handleSectorClick(sector)}
                                        onMouseEnter={(e) => {
                                            const container = e.target.getStage()?.container();
                                            if(currentTicketType=="normalny"){
                                                container.style.cursor = isAvailable ? 'pointer' : 'not-allowed';
                                            }
                                            else if (container && hasSeats) {
                                                container.style.cursor = isAvailable ? 'pointer' : 'not-allowed';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const container = e.target.getStage()?.container();
                                            if (container) container.style.cursor = 'default';
                                        }}
                                    />
                                    <Text
                                        x={sector.x}
                                        y={sector.y + sector.height / 2 - 20}
                                        text={hasSeats ? `${sector.name}\n${wolneMiejsca} wolnych` : sector.name}
                                        fontSize={12}
                                        fontStyle="bold"
                                        fill="white"
                                        width={sector.width}
                                        align="center"
                                    />
                                </React.Fragment>
                            );
                        })}
                    </Layer>
                </Stage>
            </div>

            <div className={styles.instruction}>
                💡 {!isHomeMatch
                ? 'Tylko sektor G (niebieski) jest dostępny dla kibiców gości'
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
    isHome: boolean;
    currentTicketType: TicketType;
}> = ({ sector, onBack, onSeatClick, selectedSeat, currentTicketType }) => {
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
        switch(type) {
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
                <button onClick={onBack} className={styles.backButton}>
                    ← Powrót do mapy
                </button>
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
                                {seatsByRow[row]
                                    .sort((a, b) => a.numer - b.numer)
                                    .map((seat) => {
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
                        <button className={styles.buyButton}>Kup bilet</button>
                        <button onClick={() => onSeatClick(selectedSeat)} className={styles.cancelButton}>Anuluj</button>
                    </div>
                </div>
            )}
        </div>
    );
};