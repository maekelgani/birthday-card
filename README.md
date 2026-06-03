# Hadiah Ulang Tahun Interaktif

Website SPA interaktif yang dibangun dengan React (Vite), Tailwind CSS, dan Anime.js.

## Cara Mengganti Audio (BGM)

Website ini dikonfigurasi untuk memutar file audio sebagai latar musik (BGM). Untuk menambahkan lagu pilihan Anda, ikuti langkah berikut:

1. Siapkan file musik Anda (disarankan berformat `.mp3`).
2. Ubah nama file musik tersebut menjadi `placeholder-bgm.mp3`.
3. Pindahkan file tersebut ke dalam folder `public/` di direktori utama proyek Anda (misal: `public/placeholder-bgm.mp3`).
4. Musik secara otomatis akan diputar berulang (looping) setelah tombol "Buka Hadiah" ditekan pada halaman awal.

## Menjalankan Proyek Secara Lokal

1. Pastikan Anda telah menginstal dependensi dengan `npm install`.
2. Jalankan server pengembangan dengan `npm run dev`.
3. Buka URL yang tertera di terminal (biasanya `http://localhost:5173/`).
