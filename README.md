#  Clean Kick – E-Commerce Shoes Treatment Platform
Website Full-Stack untuk layanan Cleaning, Repair, Repaint, dan Shoes Treatment, dibangun menggunakan Next.js 13, MongoDB Atlas, dan Midtrans Payment Gateway.

## 📘 1. Overview
Clean Kick adalah platform digital untuk layanan perawatan sepatu yang menggantikan proses manual seperti chat WhatsApp dan pencatatan Excel. Website ini menyediakan:
- Pemesanan layanan online
- Pembayaran otomatis via Midtrans
- Dashboard admin & analitik transaksi
- Autentikasi menggunakan JWT
- Email & WhatsApp Notification

## 📦 2. Teknologi yang Digunakan
| Teknologi | Fungsi |
|----------|--------|
| Next.js 13 | Full-stack React Framework |
| MongoDB Atlas | Database NoSQL |
| Midtrans Client | Payment Gateway |
| JWT + bcryptjs | Authentication |
| Nodemailer | Email Notification |
| Fonnte API | WhatsApp Notification |
| Recharts | Dashboard chart |
| React Bootstrap | UI Components |
| Swiper.js | Carousel |

## 🛠 3. Instalasi Project
### 3.1 Clone Repository
```
git clone <repository-url>
cd kickclean
```

### 3.2 Install Dependencies
```
npm install
```

## 🔐 4. Setup Environment Variables (.env.local)
Buat file:
```
.env.local
```

Isi dengan:
```
MONGODB_URL=<your-mongodb-url>

ACCESS_TOKEN_SECRET=<random-hex-64>
REFRESH_TOKEN_SECRET=<random-hex-64>
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=1d

NODE_ENV=production

MIDTRANS_SERVER_KEY=<server-key-midtrans>
MIDTRANS_CLIENT_KEY=<client-key-midtrans>
MIDTRANS_STATUS_PRODUCTION=true

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=<gmail-user>
SMTP_PASS=<gmail-pass>

FONNTE_API_URL=https://api.fonnte.com/send
FONNTE_TOKEN=<fonnte-token>

NEXT_PUBLIC_BASE_URL=<your-domain>
```

## 🔑 5. Generate JWT Secret
```
openssl rand -hex 64
```

Atau:
```
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## 🚀 6. Menjalankan Website
### Development
```
npm run dev
```

### Production
```
npm run build
npm run start
```


## 📊 7. Fitur Utama
### Customer
- Lihat katalog
- Cart & checkout
- Pembayaran otomatis
- Track order

### Admin
- Kelola layanan
- Kelola order
- Dashboard pendapatan