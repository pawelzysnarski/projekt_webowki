import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './AcademyPage.module.scss';
import useScout from "../../queries/scoutQuery.ts";

const benefits = [
    { title: "Kadra UEFA", desc: "Trenerzy z najwyższymi licencjami.", icon: "⚽" },
    { title: "Monitoring", desc: "Systemy analizy wydolności GPS.", icon: "📊" },
    { title: "Rozwój", desc: "Indywidualne ścieżki kariery.", icon: "🚀" },
    { title: "Baza", desc: "Własne boiska z podgrzewaną murawą.", icon: "🏟️" },
];

const createCustomIcon = (isActive: boolean) => {
    return L.divIcon({
        html: `<div style="
            background-color: ${isActive ? '#fff' : '#61331c'};
            width: 1.25rem;
            height: 1.25rem;
            border-radius: 50%;
            border: 0.125rem solid white;
            box-shadow: 0 0 0.625rem rgba(0,0,0,0.5);
            transition: all 0.2s ease;
            transform: ${isActive ? 'scale(1.3)' : 'scale(1)'};
        "></div>`,
        className: '',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
};

export default function AcademyPage() {
    const { data: scoutingPoints = [], isLoading } = useScout();
    const [hoveredId, setHoveredId] = useState<number | null>(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isLoading) return <div className={styles.Loading}>Ładowanie danych...</div>;

    return (
        <main className={styles.AcademyPage}>
            <section className={styles.Hero}>
                <h1>Akademia Piłkarska</h1>
                <p>Dołącz do najlepszych. Rozpocznij swoją karierę tutaj.</p>
            </section>

            <section className={styles.BenefitsGrid}>
                {benefits.map((benefit, index) => (
                    <div key={index} className={styles.BenefitItem}>
                        <div className={styles.Icon}>{benefit.icon}</div>
                        <h3>{benefit.title}</h3>
                        <p>{benefit.desc}</p>
                    </div>
                ))}
            </section>

            <section className={styles.ScoutingSection}>
                <div className={styles.Info}>
                    <h2>Terminy Scoutingu</h2>
                    <div className={styles.DatesList}>
                        {scoutingPoints?.map(point => {
                            const eventDate = point.data ? new Date(point.data) : null;
                            const isPast = eventDate ? eventDate < today : false;
                            const available = point.Ilosc_miejsca - (point.zapis?.length || 0);

                            return (
                                <div
                                    key={point.ID}
                                    className={`${styles.DateCard} ${hoveredId === point.ID ? styles.ActiveCard : ''} ${isPast ? styles.PastEvent : ''}`}
                                    onMouseEnter={() => setHoveredId(point.ID)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <span>{isPast ? "Zakończone" : eventDate?.toLocaleDateString('pl-PL')}</span>
                                    <strong>{point.miejsce}</strong>
                                    {!isPast && (
                                        <>
                                            <small>Dostępne miejsca: {available}</small>
                                            <button
                                                className={styles.RegisterBtn}
                                                onClick={() => window.location.href = `/akademia/zapis/${point.ID}`}
                                            >
                                                Zapisz się
                                            </button>
                                        </>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className={styles.MapWrapper}>
                    <MapContainer center={[52.4831, 17.2715]} zoom={14} className={styles.Map}>
                        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
                        {scoutingPoints?.map(point => {
                            const eventDate = point.data ? new Date(point.data) : null;
                            const isPast = eventDate ? eventDate < today : false;
                            const available = point.Ilosc_miejsca - (point.zapis?.length || 0);

                            return (
                                <Marker
                                    key={point.ID}
                                    position={[Number(point.szerokosc_geograficzna) || 0, Number(point.dlugosc_geograficzna) || 0]}
                                    icon={createCustomIcon(hoveredId === point.ID)}
                                    zIndexOffset={hoveredId === point.ID ? 1000 : 0}
                                >
                                    <Popup>
                                        <strong>{point.miejsce}</strong><br />
                                        {isPast ? "Zakończone" : `Wolne miejsca: ${available}`}
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
            </section>
        </main>
    );
}
