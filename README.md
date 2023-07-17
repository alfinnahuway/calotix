# Calo Tiket - Proyek Konser Tiket

Calo Tiket adalah proyek konser tiket yang sedang dalam pengembangan. Proyek ini ditujukan untuk membuat sebuah platform yang memungkinkan pengguna untuk membeli tiket konser secara online. Saat ini, proyek ini masih berbasis HTML, CSS, dan menggunakan framework Tailwind CSS.

## Pembagian Tugas

Berikut adalah pembagian tugas untuk pengembangan proyek Calo Tiket:

1. Navbar: Dicky
2. Hero: Hendri
3. Itemlist Event Terbaru: Juanda
4. Itemlist Promo: Febrian
5. Itemlist Highlight: Alfin
6. Footer: Zidan

## Cara Pengerjaan

Berikut adalah langkah-langkah untuk memulai berkontribusi dalam pengembangan proyek Calo Tiket:

1. Clone repository:

```bash
git clone https://github.com/muhzulzidan/calo-tiket.git
```

2. Checkout ke branch tugas Anda:

```bash
git checkout -b <nama-branch> origin/<nama-branch>
```

Contoh:

```bash
git checkout -b zidan origin/zidan
```

3. Install dependensi:

```bash
pnpm  install
```

4. start the project

```bash
pnpm dev
```

5. buat components terlebih dahulu, lalu ingat untuk import itu ke `layout/public.jsx`

```jsx
import { Navbar } from "flowbite-react";
import Footerlocal from "../components/Footer"; 
const Public = ({ children }) => {
	return (
		<main>
			<Navbar />
			{children}
			<Footerlocal />
		</main>
	);
};

export default Public;
```

6. Pertemuan mingguan berikutnya akan dilakukan melalui Virtual Communication Software (VCS) untuk sinkronisasi dan diskusi lanjutan.

## Design

https://www.figma.com/file/XaDLqb2WcRWtU4O5gcVdUw/hari-senin-tiket-konser?type=design&node-id=0%3A1&t=fr391OCvb5x4p8xe-1

## Palet Warna

Berikut adalah warna-warna yang digunakan dalam proyek Calo Tiket, dengan menggunakan kelas utilitas Tailwind CSS:

- Background    : Stone 950 (#1F2937)
- Primary       : Orange 600 (#FB923C)
- Secondary     : Stone 700 (#44403c)
- white         : Stone 50 (#F9FAFB)

Warna-warna ini dipilih untuk memberikan desain yang menarik secara visual dan keselarasan yang konsisten dalam proyek ini. Anda dapat merujuk pada nilai-nilai warna ini saat melakukan penyesuaian UI atau gaya.

### Mengatur latar belakang (background):

```html
<div className="bg-stone-950">
  <!-- Konten Anda di sini -->
</div>
```

### Menggunakan warna utama (primary):

```html
<button className="bg-orange-600 text-white">Beli Tiket</button>
```

### Menggunakan warna sekunder (secondary):

```html
<div className="text-stone-700">Keterangan tambahan</div>
```

### Menggunakan warna putih:

```html
<p className="text-stone-50">Teks ini akan terlihat di atas latar belakang gelap</p>
```

Pastikan Anda telah mengimpor dan mengkonfigurasi Tailwind CSS dengan benar dalam proyek Anda sebelum menggunakan kelas utilitas warna ini.

Dalam contoh di atas, Anda dapat melihat bagaimana kelas utilitas Tailwind CSS seperti `bg-{warna}` dan `text-{warna}` digunakan untuk mengaplikasikan warna yang sesuai pada elemen HTML. Anda dapat mengganti kodenya sesuai dengan kebutuhan proyek Anda dan menyesuaikan penggunaan kelas utilitas warna yang sesuai dengan warna-warna yang telah didefinisikan sebelumnya.

## Kontribusi

Jika Anda ingin berkontribusi dalam pengembangan proyek Calo Tiket, berikut langkah-langkah yang dapat Anda ikuti:

1. Fork repository Calo Tiket ke akun GitHub Anda.
2. Clone repository yang telah di-fork ke dalam komputer lokal Anda.
3. Buat branch baru untuk fitur/tugas yang akan Anda kerjakan.
4. Lakukan perubahan atau penambahan pada kode proyek.
5. Commit perubahan dan push ke branch di repository GitHub Anda.
6. Buat Pull Request (PR) untuk menggabungkan perubahan Anda ke repository utama Calo Tiket.
7. Tunggu dan terlibat dalam diskusi terkait perubahan yang diajukan.
8. Setelah PR Anda diterima, perubahan akan digabungkan ke repository utama.

## Lisensi

Proyek Calo Tiket saat ini tidak memiliki lisensi yang ditentukan. Mohon untuk tidak mengambil, menggunakan, atau mendistribusikan proyek ini tanpa izin dari pemilik proyek.

## Kontak

Jika Anda memiliki pertanyaan, saran, atau masukan terkait proyek Calo Tiket, silakan hubungi kami melalui email di [email@example.com]. Terima kasih atas minat dan partisipasi Anda!