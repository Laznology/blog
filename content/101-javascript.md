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

## The Definition

JavaScript adalah bahasa _high-level_ yang berjalan di atas runtime berbasis _interpreter_ dan _Just-In-Time (JIT) compilation_, menggunakan _garbage collection_, dieksekusi pada satu _single-threaded_, bersifat _dynamically typed_, _multi-paradigm_, _prototype-based_, dan menangani I/O _non-blocking_ melalui _event loop_.

Ini adalah peta arsitektur yang menjelaskan mengapa JavaScript terasa sederhana di permukaan, tetapi kuat di level sistem.

### 1. High-Level

JavaScript memberi lapisan abstraksi _high-level_. Developer tidak perlu mengelola _registry_ CPU, alokasi memori manual, atau instruksi biner secara langsung. Karena detail mesin disembunyikan oleh runtime, fokus engineering berpindah ke desain logika aplikasi.

### 2. Interpreted

JavaScript dieksekusi langsung oleh _interpreter_ baris demi baris tanpa _manual compilation_ ke file _binary_ seperti .exe atau .out. Pola ini menciptakan _feedback loop_ sangat cepat: tulis, simpan, jalankan.

### 3. Garbage Collected

Manajemen memori di JavaScript sudah dilakukan oleh _Runtime_ di belakang layar. _Runtime_ akan memeriksa dan membersihkan _Object_ yang sudah tidak lagi memiliki referensi di memori.

### 4. Single Threaded

Bayangkan JavaScript seperti seorang koki seorang diri. Karena hanya ada satu koki saja, maka hanya 1 pesanan saja yang dapat diproses secara berurutan.

### 5. Just-In-Time (JIT) Compiled

### 6. Dynamic Language

### 7. Multiparadigm

### 8. Prototype-based

### 9. Non-blocking Event Loop


