// src/components/StadiumMap.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';
import styles from './StadiumMap.module.scss';

type TicketType = 'zloty_jelen' | 'srebrny_jez' | 'brazowy_los';

interface Seat {
    id: string;
    seatNumber: string;
    row: string;
    column: number;
    isReserved: boolean;
    price: number;
    allowedTicketTypes: TicketType[];
}

interface Sector {
    id: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    rows: number;
    seatsPerRow: number;
    seats: Seat[];
    allowedTicketTypes: TicketType[];
}

export default function StadiumMap() {
    const { type_id } = useParams<{ id: string; type_id: TicketType }>();
    const currentTicketType: TicketType = type_id || 'brazowy_los';

    const [sectors, setSectors] = useState<Sector[]>([]);
    const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const generatedSectors = generateSectors(currentTicketType);
        setSectors(generatedSectors);
        setIsLoading(false);
    }, [currentTicketType]);

    const handleSectorClick = (sector: Sector) => {
        if (!sector.allowedTicketTypes.includes(currentTicketType)) {
            alert(`Sektor ${sector.name} jest dostępny tylko dla posiadaczy karnetu: ${getTicketTypeName(sector.allowedTicketTypes[0])}`);
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
        if (seat.isReserved) return;
        if (!seat.allowedTicketTypes.includes(currentTicketType)) {
            alert(`To miejsce wymaga karnetu ${getTicketTypeName(seat.allowedTicketTypes[0])}`);
            return;
        }
        setSelectedSeat(seat);
    };

    const getTicketTypeName = (type: TicketType): string => {
        switch(type) {
            case 'zloty_jelen': return 'Złoty Jeleń';
            case 'srebrny_jez': return 'Srebrny Jeż';
            case 'brazowy_los': return 'Brązowy Łoś';
            default: return 'Nieznany';
        }
    };

    const getTicketTypeColor = (type: TicketType): string => {
        switch(type) {
            case 'zloty_jelen': return '#eab308';
            case 'srebrny_jez': return '#94a3b8';
            case 'brazowy_los': return '#b45309';
            default: return '#3b82f6';
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                Ładowanie stadionu...
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
            />
        );
    }

    return (
        <div>
            <header className={styles.Stadium_header}>
                <h1 className={styles.Stadium_title}>Arena imienia Tomasza Piotrkowskiego</h1>
                <div className={styles.ticketTypeBadge} style={{ backgroundColor: getTicketTypeColor(currentTicketType) }}>
                    🎫 {getTicketTypeName(currentTicketType)}
                </div>
            </header>

            <Stage width={921} height={601} x={200}>
                <Layer>
                    <Rect
                        x={260}
                        y={200}
                        width={401}
                        height={201}
                        fill="#22c55e"
                        stroke="#166534"
                        strokeWidth={3}
                        cornerRadius={10}
                    />
                    <Circle
                        x={461}
                        y={301}
                        radius={30}
                        stroke="white"
                        strokeWidth={2}
                    />
                    <Circle
                        x={461}
                        y={301}
                        radius={10}
                        stroke="white"
                        fill="white"
                        strokeWidth={2}
                    />
                    <Rect
                        x={270}
                        y={210}
                        width={381}
                        height={181}
                        stroke="white"
                        strokeWidth={2}
                        cornerRadius={10}
                    />
                    <Rect
                        x={461}
                        y={210}
                        width={1}
                        height={181}
                        stroke="white"
                        strokeWidth={2}
                    />
                </Layer>

                <Layer>
                    <Text
                        x={386}
                        y={220}
                        width={150}
                        fontSize={18}
                        text={"Trybuna północna"}
                        fill="black"
                    />
                    <Text
                        x={386}
                        y={361}
                        width={170}
                        fontSize={18}
                        text={"Trybuna południowa"}
                        fill="black"
                    />
                    <Text
                        x={621}
                        y={380}
                        width={160}
                        rotation={-90}
                        fontSize={18}
                        text={"Trybuna wschodnia"}
                        fill="black"
                    />
                    <Text
                        x={300}
                        y={220}
                        width={160}
                        fontSize={18}
                        rotation={90}
                        text={"Trybuna zachodnia"}
                        fill="black"
                    />
                </Layer>

                <Layer>
                    {sectors.map((sector) => {
                        const isAvailable = sector.allowedTicketTypes.includes(currentTicketType);
                        return (
                            <Rect
                                key={sector.id}
                                x={sector.x}
                                y={sector.y}
                                width={sector.width}
                                height={sector.height}
                                fill={sector.color}
                                stroke={isAvailable ? "white" : "#64748b"}
                                strokeWidth={2}
                                cornerRadius={8}
                                opacity={isAvailable ? 0.85 : 0.4}
                                onClick={() => handleSectorClick(sector)}
                                onMouseEnter={(e) => {
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = isAvailable ? 'pointer' : 'not-allowed';
                                }}
                                onMouseLeave={(e) => {
                                    const container = e.target.getStage()?.container();
                                    if (container) container.style.cursor = 'default';
                                }}
                            />
                        );
                    })}
                </Layer>

                <Layer>
                    {sectors.map((sector) => (
                        <Text
                            key={`text_${sector.id}`}
                            x={sector.x + sector.width / 2 - 20}
                            y={sector.y + sector.height / 2 - 10}
                            text={sector.name}
                            fontSize={14}
                            fontStyle="bold"
                            fill="white"
                            width={40}
                            align="center"
                        />
                    ))}
                </Layer>
            </Stage>

            <div className={styles.instruction}>
                💡 Kliknij na dowolny sektor, aby zobaczyć miejsca
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
}> = ({ sector, onBack, onSeatClick, selectedSeat, currentTicketType }) => {
    const seatsByRow: { [key: string]: Seat[] } = {};
    sector.seats.forEach(seat => {
        if (!seatsByRow[seat.row]) seatsByRow[seat.row] = [];
        seatsByRow[seat.row].push(seat);
    });

    const rows = Object.keys(seatsByRow).sort();

    const getSeatStatus = (seat: Seat) => {
        if (seat.isReserved) return 'reserved';
        if (!seat.allowedTicketTypes.includes(currentTicketType)) return 'locked';
        if (selectedSeat?.id === seat.id) return 'selected';
        return 'available';
    };

    return (
        <div>
            <header className={styles.Stadium_header}>
                <button onClick={onBack} className={styles.backButton}>
                    ← Powrót do mapy
                </button>
                <h1 className={styles.Stadium_title}>
                    Sektor {sector.name}
                    <span className={styles.seatCount}> ({sector.seats.length} miejsc)</span>
                </h1>
                <div className={styles.legend}>
                    <span className={styles.legendDotAvailable}></span> Wolne
                    <span className={styles.legendDotReserved}></span> Zajęte
                    <span className={styles.legendDotLocked}></span> Niedostępne
                    <span className={styles.legendDotSelected}></span> Wybrane
                </div>
            </header>

            <div className={styles.seatMapContainer}>
                <div className={styles.seatMap}>
                    {rows.map((row) => (
                        <div key={row} className={styles.seatRow}>
                            <div className={styles.rowLabel}>{row}</div>
                            <div className={styles.seatsGrid}>
                                {seatsByRow[row].map((seat) => {
                                    const status = getSeatStatus(seat);
                                    return (
                                        <button
                                            key={seat.id}
                                            className={`${styles.seat} ${styles[`seat${status.charAt(0).toUpperCase() + status.slice(1)}`]}`}
                                            onClick={() => onSeatClick(seat)}
                                            disabled={seat.isReserved || status === 'locked'}
                                            title={`Miejsce ${seat.seatNumber} - ${seat.price} zł`}
                                        >
                                            <span className={styles.seatNumber}>{seat.seatNumber}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedSeat && !selectedSeat.isReserved && (
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
                            <span className={styles.seatInfoValue}>{selectedSeat.seatNumber}</span>
                        </div>
                        <div className={styles.seatInfo}>
                            <span className={styles.seatInfoLabel}>Rząd:</span>
                            <span className={styles.seatInfoValue}>{selectedSeat.row}</span>
                        </div>
                        <div className={styles.seatInfo}>
                            <span className={styles.seatInfoLabel}>Cena:</span>
                            <span className={styles.seatInfoValue}>{selectedSeat.price} zł</span>
                        </div>
                    </div>
                    <div className={styles.seatPanelActions}>
                        <button className={styles.buyButton}>
                            Kup bilet
                        </button>
                        <button onClick={() => onSeatClick(selectedSeat)} className={styles.cancelButton}>
                            Anuluj
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

function generateSectors(currentTicketType?: TicketType): Sector[] {
    const sectors: Sector[] = [];

    const sectorDefs = [
        { name: 'A1', x: 280, y: 160, width: 80, height: 40, rows: 5, seatsPerRow: 8, allowedTypes: ['brazowy_los'] as TicketType[] },
        { name: 'A2', x: 370, y: 160, width: 80, height: 40, rows: 5, seatsPerRow: 8, allowedTypes: ['brazowy_los'] as TicketType[] },
        { name: 'A3', x: 460, y: 160, width: 80, height: 40, rows: 5, seatsPerRow: 8, allowedTypes: ['brazowy_los'] as TicketType[] },
        { name: 'A4', x: 550, y: 160, width: 80, height: 40, rows: 5, seatsPerRow: 8, allowedTypes: ['brazowy_los'] as TicketType[] },

        { name: 'B1', x: 670, y: 220, width: 50, height: 70, rows: 6, seatsPerRow: 6, allowedTypes: ['srebrny_jez'] as TicketType[] },
        { name: 'B2', x: 670, y: 300, width: 50, height: 70, rows: 6, seatsPerRow: 6, allowedTypes: ['srebrny_jez'] as TicketType[] },

        { name: 'C1', x: 280, y: 410, width: 80, height: 40, rows: 5, seatsPerRow: 8, allowedTypes: ['brazowy_los'] as TicketType[] },
        { name: 'C2', x: 370, y: 410, width: 80, height: 40, rows: 5, seatsPerRow: 8, allowedTypes: ['brazowy_los'] as TicketType[] },
        { name: 'C3', x: 460, y: 410, width: 80, height: 40, rows: 5, seatsPerRow: 8, allowedTypes: ['brazowy_los'] as TicketType[] },
        { name: 'C4', x: 550, y: 410, width: 80, height: 40, rows: 5, seatsPerRow: 8, allowedTypes: ['brazowy_los'] as TicketType[] },

        { name: 'D1', x: 200, y: 220, width: 50, height: 70, rows: 6, seatsPerRow: 6, allowedTypes: ['zloty_jelen'] as TicketType[] },
        { name: 'D2', x: 200, y: 300, width: 50, height: 70, rows: 6, seatsPerRow: 6, allowedTypes: ['zloty_jelen'] as TicketType[] },
    ];

    const ticketTypeColors = {
        'zloty_jelen': '#eab308',
        'srebrny_jez': '#94a3b8',
        'brazowy_los': '#b45309',
    };

    let seatId = 0;
    const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let i = 0; i < sectorDefs.length; i++) {
        const def = sectorDefs[i];
        const seats: Seat[] = [];
        const allowedTypes = def.allowedTypes;
        const sectorColor = ticketTypeColors[allowedTypes[0]];

        for (let row = 0; row < def.rows; row++) {
            for (let col = 0; col < def.seatsPerRow; col++) {
                // Cena zależna od typu sektora i rzędu
                let price = 50;
                if (allowedTypes[0] === 'zloty_jelen') price = 150 + row * 10;
                else if (allowedTypes[0] === 'srebrny_jez') price = 90 + row * 8;
                else price = 50 + row * 5;

                seats.push({
                    id: `seat_${seatId++}`,
                    seatNumber: `${rowLetters[row]}${col + 1}`,
                    row: rowLetters[row],
                    column: col,
                    isReserved: Math.random() < 0.15,
                    price: price,
                    allowedTicketTypes: allowedTypes
                });
            }
        }

        sectors.push({
            id: `sector_${def.name}`,
            name: def.name,
            x: def.x,
            y: def.y,
            width: def.width,
            height: def.height,
            color: sectorColor,
            rows: def.rows,
            seatsPerRow: def.seatsPerRow,
            seats: seats,
            allowedTicketTypes: allowedTypes
        });
    }

    return sectors;
}