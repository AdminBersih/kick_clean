// Import mongoose library untuk koneksi MongoDB
import mongoose from "mongoose";

// Ambil URL MongoDB dari variabel environment
const MONGODB_URL = process.env.MONGODB_URL!;
if (!MONGODB_URL) {
  // Jika variabel environment tidak ditemukan, lempar error
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}

// Inisialisasi cache untuk koneksi mongoose
let cached = (global as any).mongoose;

// Jika cache belum ada, buat objek cache baru
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

// Fungsi untuk menghubungkan ke database MongoDB
export default async function dbConnect() {
  // Jika sudah ada koneksi yang tersimpan di cache, kembalikan koneksi tersebut
  if (cached.conn) return cached.conn;
  // Jika belum ada koneksi, buat koneksi baru
  if (!cached.promise) {
    // Buat koneksi mongoose dan simpan promise-nya di cache
    cached.promise = mongoose.connect(MONGODB_URL).then((m) => m.connection);
  }
  // Tunggu hingga koneksi selesai dan simpan hasilnya di cache
  cached.conn = await cached.promise;
  // Kembalikan koneksi yang sudah dibuat
  return cached.conn;
}
