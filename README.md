# 📦 ResourceNexus

**ResourceNexus** adalah sistem manajemen aset dan reservasi tingkat enterprise yang dirancang untuk mengelola sumber daya fisik perusahaan (ruangan, kendaraan, perangkat elektronik) dengan presisi tinggi dan antarmuka modern.

![Tech Stack](https://img.shields.io/badge/Stack-Laravel_12_%2B_React_19-blue?style=for-the-badge&logo=laravel)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS_4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Inertia](https://img.shields.io/badge/Bridge-Inertia.js_2-9553E9?style=for-the-badge&logo=inertia)

---

## ✨ Fitur Utama

-   🛡️ **Role-Based Access Control (RBAC):** Pemisahan akses antara Administrator (Manager) dan Staff (Peminjam).
-   📅 **Intelligent Booking System:** Logika pencegahan bentrok jadwal (*Collision Prevention*) untuk memastikan satu aset tidak dipesan ganda di jam yang sama.
-   🗓️ **Visual Calendar View:** Integrasi FullCalendar untuk memantau seluruh jadwal peminjaman secara visual.
-   📊 **Advanced Analytics:** Visualisasi data menggunakan Recharts untuk melihat tren peminjaman dan distribusi aset.
-   📑 **PDF Reporting:** Generate laporan resmi seluruh riwayat peminjaman dalam format PDF.
-   🗑️ **Soft Deletes & Recovery:** Keamanan data dengan fitur tong sampah (Trash Bin) untuk memulihkan aset yang tidak sengaja terhapus.
-   ⛅ **Real-time Weather Intelligence:** Widget cuaca cerdas berdasarkan lokasi terkini pengguna menggunakan OpenWeather API.
-   🌓 **Luxury Dark Mode:** Transisi tema gelap dan terang yang halus dengan persistensi LocalStorage.
-   🔍 **Search & Filter:** Pencarian aset secara instan berdasarkan nama atau deskripsi.

---

## 🚀 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | Laravel 12 (PHP 8.2+) |
| **Frontend** | React 19 + TypeScript |
| **Bridge** | Inertia.js 2.0 |
| **Styling** | Tailwind CSS 4.0 |
| **Database** | MySQL / MariaDB |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Reporting** | Laravel DomPDF |

---

## 🛠️ Instalasi

Ikuti langkah berikut untuk menjalankan project di komputer lokal Anda:

1.  **Clone Repository**
    ```bash
    git clone https://github.com/username/resource-nexus.git
    cd resource-nexus
    ```

2.  **Instal Dependensi Backend**
    ```bash
    composer install
    ```

3.  **Instal Dependensi Frontend**
    ```bash
    npm install --legacy-peer-deps
    ```

4.  **Konfigurasi Environment**
    - Salin `.env.example` menjadi `.env`
    - Atur koneksi database Anda (MySQL)
    - Masukkan `OPENWEATHER_API_KEY` (Opsional untuk fitur cuaca)
    ```bash
    php artisan key:generate
    ```

5.  **Migrasi & Seeding (Akun Default)**
    ```bash
    php artisan migrate:fresh --seed
    ```

6.  **Hubungkan Storage**
    ```bash
    php artisan storage:link
    ```

7.  **Jalankan Aplikasi**
    Buka dua terminal dan jalankan:
    - Terminal 1: `php artisan serve`
    - Terminal 2: `npm run dev`

---

## 🔑 Akun Demo (Default)

Gunakan kredensial berikut setelah menjalankan seeder:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Administrator** | `admin@nexus.com` | `password` |
| **Regular Staff** | `staff@nexus.com` | `password` |

---

## 📂 Struktur Project Utama

-   `app/Http/Controllers/Admin` - Logika bisnis (Resources, Bookings, Reports).
-   `app/Http/Middleware/IsAdmin.php` - Guard keamanan akses Admin.
-   `resources/js/Pages` - Komponen UI React 19.
-   `resources/js/Layouts` - Layout utama dengan fitur Dark Mode.
-   `database/migrations` - Struktur tabel database modern.

---

## 📄 Lisensi

Project ini dibuat untuk tujuan latihan pengembangan aplikasi *full-stack* modern. Silakan digunakan dan dimodifikasi sesuai kebutuhan.

---
Dikembangkan dengan ❤️ menggunakan **Laravel 12** dan **React 19**.
