'use client';

import Image from 'next/image'
import React, { useState } from 'react'

const SAMPLE_PRODUCTS = [
  {
    id: 'gamis-polo-linen-denim',
    title: 'Gamis Polo Linen - Denim',
    price: 149000,
    sku: 'ILF-DENIM-01',
    img: '/assets/products/gamis-denim.jpg',
    colors: ['Denim'],
    sizeRange: ['S','M','L','XL'],
  },
  {
    id: 'gamis-polo-linen-latte',
    title: 'Gamis Polo Linen - Latte',
    price: 149000,
    sku: 'ILF-LATTE-01',
    img: '/assets/products/gamis-latte.jpg',
    colors: ['Latte'],
    sizeRange: ['S','M','L','XL'],
  },
  {
    id: 'gamis-polo-linen-sage',
    title: 'Gamis Polo Linen - Sage',
    price: 149000,
    sku: 'ILF-SAGE-01',
    img: '/assets/products/gamis-sage.jpg',
    colors: ['Sage'],
    sizeRange: ['S','M','L','XL'],
  },
]

function currency(idr) {
  return idr.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}

function generateShopeeDescription(product) {
  return `Nama: ${product.title}
Harga: ${currency(product.price)}
SKU: ${product.sku}
Warna: ${product.colors.join(', ')}
Size: ${product.sizeRange.join('/')}
Bahan: Polo linen (ringan, adem), jahitan rapi, cocok untuk reseller dan toko online. Minimum order fleksibel. Untuk foto dan stok, hubungi WA.`
}

export default function Page() {
  const [cart, setCart] = useState([])

  function addToCart(product) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id)
      if (found) return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p))
      return [...prev, { ...product, qty: 1 }]
    })
  }

  function total() {
    return cart.reduce((s, p) => s + p.price * p.qty, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="#home" className="font-bold text-2xl tracking-tight">ila<span className="text-indigo-600">fashion</span></a>
            <nav className="hidden md:flex gap-6 ml-6 text-sm items-center">
              <a href="#products" className="hover:text-indigo-600">Products</a>
              <a href="#about" className="hover:text-indigo-600">About</a>
              <a href="#contact" className="hover:text-indigo-600">Contact</a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })} className="flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-2xl text-sm shadow-sm">Shop</button>
            <div className="hidden md:block text-sm text-gray-600">Order target: <strong>100/day</strong></div>
          </div>
        </div>
      </header>

      <main id="home">
        <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">IlaFashion — Gamis polos berkualitas, produksi lokal.</h1>
            <p className="mt-4 text-gray-600">Bahan polo-linen yang adem, potongan rapi, siap produksi massal. Cocok untuk reseller dan toko online.</p>

            <div className="mt-6 flex gap-3">
              <a href="#products" className="px-5 py-3 bg-indigo-600 text-white rounded-lg shadow-sm">Lihat Produk</a>
              <a href="#contact" className="px-5 py-3 border rounded-lg text-sm">Hubungi Produsen</a>
            </div>

            <ul className="mt-6 text-sm text-gray-600 grid grid-cols-2 gap-2">
              <li>Produksi dari bahan hingga jadi</li>
              <li>Alat produksi memadai</li>
              <li>Ready stok & pre-order</li>
              <li>Harga pabrik untuk reseller</li>
            </ul>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg relative h-96">
            <Image src={SAMPLE_PRODUCTS[0].img} alt="Gamis showcase" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
        </section>

        <section id="products" className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Featured Products</h2>
            <div className="text-sm text-gray-600">{SAMPLE_PRODUCTS.length} items</div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {SAMPLE_PRODUCTS.map((p) => (
              <article key={p.id} className="bg-white rounded-2xl overflow-hidden shadow">
                <div className="relative aspect-[4/5] bg-gray-100">
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{p.title}</h3>
                    <div className="text-sm text-gray-500">{currency(p.price)}</div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">SKU: {p.sku}</p>

                  <div className="mt-4 flex items-center gap-2">
                    <button onClick={() => addToCart(p)} className="flex-1 px-3 py-2 rounded-xl border text-sm">Add to cart</button>
                    <a href="#" className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm">Buy</a>
                  </div>

                  <div className="mt-3 text-xs text-gray-600">
                    <strong>Shopee description:</strong>
                    <pre className="whitespace-pre-wrap text-xs mt-1 bg-gray-50 p-2 rounded">{generateShopeeDescription(p)}</pre>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-600">Cart items: <strong>{cart.length}</strong></div>
              <div className="text-lg font-semibold">{currency(total())}</div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 border rounded-lg">View cart</button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Checkout</button>
            </div>
          </div>
        </section>

        <section id="about" className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-semibold">Tentang IlaFashion</h3>
              <p className="mt-4 text-gray-600">IlaFashion memproduksi gamis polos berkualitas dari bahan polo-linen. Semua proses—sourcing, produksi, finishing—dilakukan di workshop kami di Bandung. Kami melayani penjahitan massal, private label, dan reseller.</p>

              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-700">
                <li>- Potong jahit modern</li>
                <li>- QC ketat untuk setiap batch</li>
                <li>- Minimum order fleksibel</li>
                <li>- Garansi kelarifitas jahitan</li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg relative h-80">
              <Image src={'/assets/products/workshop.jpg'} alt="Workshop" fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </section>

        <section id="contact" className="max-w-3xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-semibold text-center">Hubungi Kami</h3>
          <p className="text-center text-gray-600 mt-2">Siap produksi, kirim contoh kain, atau minta quotation cepat.</p>

          <form className="mt-6 grid gap-3">
            <input className="p-3 rounded-lg border" type="text" placeholder="Nama" />
            <input className="p-3 rounded-lg border" type="text" placeholder="Perusahaan / Toko (opsional)" />
            <input className="p-3 rounded-lg border" type="tel" placeholder="No. WA / Telepon" />
            <textarea className="p-3 rounded-lg border" rows={4} placeholder="Pesan / kebutuhan (mis. warna, jumlah, ukuran)"></textarea>
            <div className="flex gap-3">
              <button type="button" className="px-4 py-3 bg-indigo-600 text-white rounded-lg">Kirim</button>
              <a className="px-4 py-3 border rounded-lg text-sm" href="https://shopee.co.id/">Buka toko Shopee</a>
            </div>
          </form>
        </section>

        <footer className="bg-white border-t mt-12">
          <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-600">© {new Date().getFullYear()} IlaFashion — Made with care.</div>
            <div className="text-sm text-gray-600">Alamat workshop: Bandung. Kontak: +62 812-XXXX-XXXX</div>
          </div>
        </footer>
      </main>
    </div>
  )
