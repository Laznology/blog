---
title: "JavaScript 101: Membedah Runtime"
description: "Sebuah dekonstruksi teknis tentang mengapa JavaScript bekerja seperti itu—dari abstraksi high-level."
date: 2026-04-06
author: "Laz"
tags:
  - engineering
  - javascript
  - architecture
---

# The Definition

Jika kita membaca definisi resmi JavaScript, kita mungkin menemukan sederet istilah yang membingungkan: _"JavaScript adalah bahasa high-level yang berjalan di atas runtime berbasis interpreter dan Just-In-Time (JIT) compilation, menggunakan garbage collection, dieksekusi pada single-threaded, bersifat dynamically typed, multi-paradigm, prototype-based, dan menangani I/O non-blocking melalui event loop"_.

Terdengar rumit? Jangan khawatir. Mari bedah peta arsitekturnya satu per satu agar kita paham kenapa JavaScript terasa sederhana di permukaan, tetapi sangat powerful dan kuat di level sistem.

## 1. High-Level

"High-Level" merujuk pada tingkat abstraksi detail _hardware_ komputer. Developer tidak perlu mengelola _registry_ CPU, alokasi memori manual, atau _call stack_ secara langsung. Karena detail mesin disembunyikan oleh runtime, fokus engineering berpindah ke desain logika aplikasi.

## 2. Interpreted

JavaScript dieksekusi langsung oleh _interpreter_ baris demi baris tanpa mengkompilasi program menjadi bahasa mesin seperti file _binary_ seperti .exe atau .out. Pola ini menciptakan _feedback loop_ sangat cepat: tulis, simpan, jalankan.

## 3. Garbage Collected

Garbage Collection atau sering dikenal GC adalah salah satu bentuk pengelolaan memori secara otomatis. GC akan memberishkan object program yang telah dialokasikan ke memori, tetapi tidak memiliki _reference_; memori seperti itu disebut sampah.

## 4. Single Threaded

JavaScript berjalan di _thread_ tunggal, ini berarti hanya dapat melakukan satu operasi dalam satu waktu. Hal ini juga berarti setiap proses yang sedang berjalan akan memblokir (_blocking_) eksekusi kode selanjutnya.

Bayangkan JavaScript seperti seorang koki seorang diri. Karena hanya ada satu koki saja, maka hanya 1 pesanan saja yang dapat diproses secara berurutan. Lalu bagaimana jika pesanannya sangat banyak? Bukankah koki akan kewalahan dan restoran menjadi lambat? Di sinilah arsitektur Non-blocking Event Loop menyelamatkan JavaScript dari blocking!

## 5. Just-In-Time (JIT) Compiled

Sederhananya JIT adalah cara _Runtime_ JavaScript mengubah kode yang kita tulis menjadi kode mesin secara langsung saat program sedang berjalan.

Sebelumnya, bahasa pemrograman biasanya harus memilih satu dari dua cara:

1. _Interpreter_: Menjalankan kode baris demi baris.
2. _Ahead-of-Time (AOT) Compilation_: Mengubah seluruh kode sebelum program dijalankan.

JIT menggabungkan keduanya: Ia mulai sebagai interpreter, lalu sambil jalan, ia melakukan kompilasi untuk mempercepat bagian-bagian yang penting.

## 6. Dynamic Language

Dalam bahasa pemrograman, istilah "Dinamis" mengacu pada fleksibilitas. Artinya, banyak hal yang biasanya diputuskan saat kode sedang ditulis atau dikompilasi, dalam bahasa dinamis hal tersebut baru diputuskan saat kode sedang berjalan (runtime).

Sederhananya: Bahasa dinamis tidak cerewet di awal. Ia membiarkan kita berkreasi dengan cepat, dan ia akan menyesuaikan diri saat program dijalankan.

### Karakteristik Utama

1. **Dynamic Typing**
   Ini adalah ciri yang paling sering ditemukan ketika coding dengan JavaScript. Kita tidak perlu memberitahu komputer apakah sebuah variabel itu ber-tipekan angka, teks, atau array.
   Contoh:

   ```js
   let data = "Hello world"; // (string)
   data = 42; // (number) - tidak error !
   ```

2. **Pengecekan saat Runtime**
   Karena bahasa tidak melakukan pengecekan secara ketat saat compiling, ia akan mengecek "apakah kode ini masuk akal" saat kode di jalankan.
   Contoh: Jika kita mencoba menjalankan fungsi hitung(), tapi ternyata hitung itu bukan fungsi melainkan sebuah angka, JavaScript baru akan protes (error) saat baris tersebut dijalankan.
3. **Bebas Memodifikasi Object**
   Dalam bahasa dinamis, struktur data bersifat "hidup". Kita bisa menambah, menghapus, atau mengubah bagian-bagian dari sebuah objek kapan saja.

Misalnya, kita punya data object buku. Tiba-tiba di tengah program kita ingin menambahkan properti warna, kita bisa langsung melakukannya tanpa harus merombak ulang struktur objek buku dari awal ia dideklarasikan.

## 7. Multi-paradigm

Paradigma pemrograman adalah "gaya" kita dalam menyelesaikan masalah dengan kode. JavaScript termasuk Multi-Paradigm karena tidak memaksa kita menggunakan satu gaya saja. Sangat fleksibel.

Ada banyak paradigma pemrograman, namun JavaScript sering sekali menggunakan 3 paradigma ini, yaitu:

### Paradigma Utama dalam JavaScript

1. **Paradigma Imperatif / Prosedural**
   Ini adalah gaya paling dasar. Kita memberi tahu komputer langkah-demi-langkah apa yang harus dilakukan.
   - **Fokus:** Bagaimana cara melakukannya?
   - **Contoh:** Menggunakan looping `for` manual untuk menjumlahkan angka di dalam daftar satu per satu.

2. **Object-Oriented Programming (OOP)**
   Di sini, kita membungkus data dan fungsi ke dalam satu Objek.
   - **Fokus:** Siapa yang melakukan aksi ini?
   - **Konsep:** Kita membuat "cetak biru" (Class) untuk benda, seperti Mobil. Mobil punya data (warna, kecepatan) dan aksi (maju, belok, rem).

3. **Functional Programming**
   Ini adalah gaya yang sangat populer di JavaScript modern. Kita memperlakukan kode seperti fungsi matematika.
   - **Fokus:** Apa hasilnya? (Tanpa mengubah data asli).
   - **Konsep:** Kita tidak mengubah variabel global. Kita memasukkan data ke fungsi, dan fungsi mengeluarkan data baru tanpa merusak yang lama (Immutability).

## 8. Prototype-based

Prototype-based adalah style dari paradigma _Object-Oriented (OOP)_ dimana classnya tidak didefinisikan secara eksplisit, melainkan menggunakan kembali dari class yang sudah di definisikan atau telah dibuat blueprint (yang dikenal inheritance)

Contohnya kita mendefinisikan class "Kendaraan" yang dapat dikloning dan diperluas. Misal menggunakan class "Mobil" sebagai contoh, class "Mobil" akan memiliki properti dan method umum dari "Kendaraan" dan properti spesifik "Mobil" akan ditambahkan.

## 9. Non-blocking Event Loop

Runtime JavaScript beroperasi pada arsitektur _single-threaded_ dan _event-driven_ yang sangat bergantung pada operasi I/O _non-blocking_ untuk menangani _request_ secara bersamaan secara efisien. Dengan pendekatan _event-loop_ seperti ini, memungkinkan Runtime JavaScript yang _single-threaded_ itu menangani banyak _request_ tanpa membuat _thread_ utama terblock.

Bayangkan seorang pelayan yang bekerja di sebuah restoran. Dia berkeliling restoran untuk menerima pesanan dari pelanggan dan menyajikannya ketika makanan masing-masing sudah siap. Apa yang terjadi jika pelayan tersebut menerima pesanan dari seorang pelanggan dan menunggu hingga makanan disiapkan, menyajikannya, lalu melanjutkan ke pelanggan berikutnya? Dengan cara ini, waktu tunggu setiap pelanggan akan bertambah dan restoran tersebut akan mengalami kegagalan besar. Yang terakhir mewakili pemrograman sinkron, sedangkan yang pertama mewakili pemrograman asinkron.

# Glossary

- **AOT (Ahead-of-Time):** Teknik pemrosesan kode yang mengubah seluruh kode sumber menjadi bahasa mesin sebelum program dijalankan.
- **JIT (Just-In-Time):** Kebalikan dari AOT. Teknik ini menggabungkan interpreter dan compiler di mana kode diubah ke bahasa mesin ketika program sedang berjalan (berfokus pada bagian kode yang penting saja).
- **Runtime:** Lingkungan sistem tempat program atau instruksi dieksekusi secara nyata oleh mesin.
- **I/O Non-blocking:** Kemampuan sistem untuk menjalankan proses _Input/Output_ di belakang layar tanpa menghentikan jalur utama program (thread utama).

Referensi:

- https://en.wikipedia.org/wiki/High-level_programming_language
- https://developer.mozilla.org/en-US/docs/Glossary/Just_In_Time_Compilation
- https://www.educative.io/answers/static-vs-dynamic-languages
- https://developer.mozilla.org/en-US/docs/Glossary/Prototype-based_programming
- https://en.wikipedia.org/wiki/Prototype-based_programming
- https://www.geeksforgeeks.org/node-js/non-blocking-event-loop-in-node-js/
