# Undian HUT 40 Tahun Ruby

Aplikasi undian doorprize untuk HUT ke-40 RSU Surya Husadha Group. Berjalan penuh di browser, bisa dipasang sebagai aplikasi, dan bisa dipakai tanpa internet setelah dibuka satu kali.

## Isi repo

| Berkas | Fungsi |
|---|---|
| `index.html` | Aplikasi undian (tampilan dan logika) |
| `sw.js` | Service worker, menyimpan semua berkas supaya jalan offline |
| `manifest.json` | Data aplikasi untuk dipasang di layar utama |
| `ruby-40-logo.svg` | Logo asli dengan latar ruby |
| `ruby-40-logo-transparent.svg` | Logo asli tanpa latar |
| `ruby-40-logo-cropped.svg` | Logo tanpa ruang kosong, dipakai di aplikasi |
| `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `apple-touch-icon.png`, `favicon-32.png` | Ikon aplikasi |
| `xlsx.full.min.js` | Pembaca file Excel (SheetJS) |
| `marcellus-latin-400-normal.woff2`, `figtree-latin-wght-normal.woff2` | Font, disimpan lokal |
| `THIRD-PARTY-LICENSES.txt` | Lisensi pustaka dan font di atas |

Semua berkas ada di satu folder, tanpa subfolder.

## Pasang di GitHub Pages

1. Buat repo baru di GitHub, lalu unggah semua berkas di atas ke root repo.
2. Buka **Settings > Pages**.
3. Di **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu **Save**.
4. Tunggu satu sampai dua menit. Alamatnya `https://<username>.github.io/<nama-repo>/`.

Service worker hanya aktif lewat `https://` (atau `localhost`), jadi mode offline dan tombol "Pasang aplikasi" baru muncul setelah dibuka dari alamat GitHub Pages. Membuka `index.html` langsung dari folder tetap bisa dipakai, tetapi tanpa fitur pasang dan cache.

## Sebelum hari H

1. Buka alamat GitHub Pages di laptop panggung saat ada internet, tunggu tulisan **Siap dipakai offline** di bagian atas.
2. Pasang aplikasi (tombol **Pasang aplikasi**, atau menu browser **Install**).
3. Matikan internet dan buka ulang untuk memastikan jalan.
4. Pakai browser dan laptop yang sama sepanjang acara. Data peserta dan pemenang tersimpan di browser perangkat itu.

## Mengubah isi aplikasi

Setiap kali ada berkas yang diubah, naikkan angka `VERSION` di `sw.js` (misalnya `undian-ruby-v2`) supaya perangkat mengambil versi baru.

## Format data peserta

Nama, NIP, unit, masa kerja (tahun). Dari Excel: baris judul `Nama`, `NIP`, `Unit`, `Masa Kerja` boleh dipakai dan urutan kolom bebas. Format kolom NIP di Excel sebaiknya Text agar angka panjang tidak terpotong.
