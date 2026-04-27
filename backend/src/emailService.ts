import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'effie.heathcote@ethereal.email',
        pass: 'qWtzdUEFTP1MgqGxn5'
    }
});

export async function sendTicketEmail(to: string, subject: string, html: string) {
    try {
        const info = await transporter.sendMail({
            from: '"Chaber Pobiedziska" <chaber@pobiedziska.pl>',
            to,
            subject,
            html
        });
        console.log('Email sent:', info.messageId);
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

export function generateTicketEmailHtml(data: {
    firstName: string;
    lastName: string;
    matchInfo: string;
    ticketType: string;
    sector: string;
    seat: string;
    row: string;
    price: string;
    ticketCode: string;
    isHome: boolean;
}) {
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a0f09; color: #f5e6d9;">
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #2d1b12, #714a36); border-radius: 10px;">
                <h1 style="color: #d4af37;">🏟️ Chaber Pobiedziska</h1>
                <p style="font-size: 18px;">Potwierdzenie zakupu biletu</p>
            </div>
            <div style="padding: 20px; background: #2d1b12; border-radius: 10px; margin-top: 20px;">
                <h2 style="color: #d4af37;">Cześć ${data.firstName} ${data.lastName}!</h2>
                <p>Dziękujemy za zakup biletu. Oto szczegóły:</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr><td style="padding: 8px; color: #c4a58b;">Mecz:</td><td style="padding: 8px; color: #f5e6d9; font-weight: bold;">${data.matchInfo}</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Typ biletu:</td><td style="padding: 8px; color: #d4af37;">${data.ticketType}</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Sektor:</td><td style="padding: 8px; color: #f5e6d9;">${data.sector}</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Rząd:</td><td style="padding: 8px; color: #f5e6d9;">${data.row}</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Miejsce:</td><td style="padding: 8px; color: #f5e6d9; font-size: 20px; font-weight: bold;">${data.seat}</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Cena:</td><td style="padding: 8px; color: #22c55e; font-weight: bold;">${data.price} zł</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Kod biletu:</td><td style="padding: 8px; color: #d4af37; font-family: monospace;">${data.ticketCode}</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Mecz:</td><td style="padding: 8px; color: ${data.isHome ? '#4ade80' : '#60a5fa'};">${data.isHome ? '🏟️ Domowy' : '🚌 Wyjazdowy'}</td></tr>
                </table>
            </div>
            <div style="text-align: center; padding: 20px; color: #c4a58b; font-size: 12px;">
                <p>Chaber Pobiedziska - Bądź częścią naszej rodziny!</p>
            </div>
        </div>
    `;
}

export function generateSeasonTicketEmailHtml(data: {
    firstName: string;
    lastName: string;
    ticketType: string;
    price: string;
    passCode: string;
    occupiedSeats: Array<{ opponent: string; date: string; sector: string; seat: number; row: string }>;
}) {
    const seatsHtml = data.occupiedSeats.map(s => `
        <tr>
            <td style="padding: 3px 6px; color: #f5e6d9; font-size: 8px;">${s.opponent}</td>
            <td style="padding: 3px 6px; color: #c4a58b; font-size: 8px;">${new Date(s.date).toLocaleDateString('pl-PL')}</td>
            <td style="padding: 3px 6px; color: #d4af37; font-size: 8px;">${s.sector}</td>
            <td style="padding: 3px 6px; color: #d4af37; font-size: 8px;">Rząd ${s.row}, Miejsce ${s.seat}</td>
        </tr>
    `).join('');

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a0f09; color: #f5e6d9;">
            <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #2d1b12, #714a36); border-radius: 10px;">
                <h1 style="color: #d4af37; margin: 0;">🏟️ Chaber Pobiedziska</h1>
                <p style="font-size: 18px; margin: 10px 0 0;">Potwierdzenie zakupu karnetu sezonowego 2026</p>
            </div>
            <div style="padding: 20px; background: #2d1b12; border-radius: 10px; margin-top: 20px;">
                <h2 style="color: #d4af37; margin: 0 0 10px;">Cześć ${data.firstName} ${data.lastName}!</h2>
                <p style="margin: 0 0 15px;">Dziękujemy za zakup karnetu sezonowego!</p>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                    <tr><td style="padding: 8px; color: #c4a58b;">Typ karnetu:</td><td style="padding: 8px; color: #d4af37; font-weight: bold;">${data.ticketType}</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Cena:</td><td style="padding: 8px; color: #22c55e; font-weight: bold;">${data.price} zł</td></tr>
                    <tr><td style="padding: 8px; color: #c4a58b;">Kod karnetu:</td><td style="padding: 8px; color: #d4af37; font-family: monospace;">${data.passCode}</td></tr>
                </table>
                <h3 style="color: #d4af37; margin-top: 20px;">Twoje miejsca na mecze domowe (${data.occupiedSeats.length}):</h3>
                <table style="width:100%; border-collapse: collapse; margin-top: 10px;">
                    <tr style="background: #714a36;">
                        <th style="padding: 4px 6px; color: #f5e6d9; text-align: left; font-size: 8px;">Przeciwnik</th>
                        <th style="padding: 4px 6px; color: #f5e6d9; text-align: left; font-size: 8px;">Data</th>
                        <th style="padding: 4px 6px; color: #f5e6d9; text-align: left; font-size: 8px;">Sektor</th>
                        <th style="padding: 4px 6px; color: #f5e6d9; text-align: left; font-size: 8px;">Miejsce</th>
                    </tr>
                    ${seatsHtml}
                </table>
                <p style="color: #60a5fa; margin-top: 20px; font-style: italic; font-size: 13px;">⚠️ Karnet nie obowiązuje na mecze wyjazdowe - na nie trzeba kupić osobny bilet.</p>
            </div>
            <div style="text-align: center; padding: 20px; color: #c4a58b; font-size: 12px;">
                <p>Chaber Pobiedziska - Bądź częścią naszej rodziny!</p>
            </div>
        </div>
    `;
}