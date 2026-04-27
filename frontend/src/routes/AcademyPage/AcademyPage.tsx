import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './AcademyPage.module.scss';

const scoutingPoints = [
    { id: 1, lat: 52.4831, lng: 17.2715, place: "Stadion Miejski", date: "15.05.2024" },
    { id: 2, lat: 52.4850, lng: 17.2650, place: "Orlik przy Szkole", date: "18.05.2024" },
    { id: 3, lat: 52.4780, lng: 17.2820, place: "Boisko Leśne", date: "22.05.2024" },
    { id: 4, lat: 52.4900, lng: 17.2750, place: "Tereny przy Jeziorze", date: "25.05.2024" },
];

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
    const [hoveredId, setHoveredId] = useState<number | null>(null);

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
                        {scoutingPoints.map(point => (
                            <div
                                key={point.id}
                                className={`${styles.DateCard} ${hoveredId === point.id ? styles.ActiveCard : ''}`}
                                onMouseEnter={() => setHoveredId(point.id)}
                                onMouseLeave={() => setHoveredId(null)}
                            >
                                <span>{point.date}</span>
                                <strong>{point.place}</strong>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.MapWrapper}>
                    <MapContainer center={[52.4831, 17.2715]} zoom={14} className={styles.Map}>
                        <TileLayer
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                            attribution='&copy; OpenStreetMap'
                        />
                        {scoutingPoints.map(point => (
                            <Marker
                                key={point.id}
                                position={[point.lat, point.lng]}
                                icon={createCustomIcon(hoveredId === point.id)}
                                zIndexOffset={hoveredId === point.id ? 1000 : 0}
                            >
                                <Popup>
                                    <strong>{point.place}</strong><br />
                                    {point.date}
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </section>
        </main>
    );
}
