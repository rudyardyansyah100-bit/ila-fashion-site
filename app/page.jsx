'use client';

import Image from 'next/image'
import React, { useState } from 'react'

const SAMPLE_PRODUCTS = [
  {
    id: 'gamis-polo-linen-denim',
    title: 'Gamis Polo Linen — Denim',
    price: { xl: 72500, xxl: 75000 },
    sku: 'ILF-DENIM-01',
    img: '/assets/products/gamis-denim.jpg',
    colors: ['Denim'],
    sizeRange: ['XL (LD 110)', 'XXL'],
  },
  {
    id: 'gamis-polo-linen-latte',
    title: 'Gamis Polo Linen — Latte',
    price: { xl: 72500, xxl: 75000 },
    sku: 'ILF-LATTE-01',
    img: '/assets/products/gamis-latte.jpg',
    colors: ['Latte'],
    sizeRange: ['XL (LD 110)', 'XXL'],
  },
  {
    id: 'gamis-polo-linen-sage',
    title: 'Gamis Polo Linen — Sage',
    price: { xl: 72500, xxl: 75000 },
    sku: 'ILF-SAGE-01',
    img: '/assets/products/gamis-sage.jpg',
    colors: ['Sage'],
    sizeRange: ['XL (LD 110)', 'XXL'],
  },
]

function currency(amount) {
  if (typeof amount !== 'number') return ''
  return amount.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
}

function generateShopeeDescription(product, chosenSize, chosenColor) {
  const priceNumber = product.price[chosenSize === 'XXL' ? 'xxl' : 'xl']
  return `Nama: ${product.title}
Warna: ${chosenColor}
Ukuran: ${chosenSize}
Harga: ${currency(priceNumber)}
SKU: ${product.sku}
Bahan: Polo linen (ringan, adem), jahitan rapi. Cocok untuk reseller dan toko online. Untuk foto & stok, hubungi WA.`
}

export default function Page() {
  const [cart, setCart] = useState([])

  // default selected sizes/colors
  const [selectedSizes, setSelectedSizes] = useState(
    SAMPLE_PRODUCTS.reduce((acc, p) => {
      acc[p.id] = p.sizeRange[0].includes('XXL') ? 'XXL' : 'XL'
      return acc
    }, {})
  )
  const [selectedColors, setSelectedColors] = useState(
    SAMPLE_PRODUCTS.reduce((acc, p) => {
      acc[p.id] = p.colors?.[0] ?? ''
      return acc
    }, {})
  )

  function handleSizeChange(productId, sizeLabel) {
    const norm = sizeLabel.includes('XXL') ? 'XXL' : 'XL'
    setSelectedSizes((s) => ({ ...s, [productId]: norm }))
  }

  function handleColorChange(productId, color) {
    setSelectedColors((s) => ({ ...s, [productId]: color }))
  }

  function addToCart(product) {
    const chosenSize = selectedSizes[product.id] || 'XL'
    const chosenColor = selectedColors[product.id] || (product.colors && product.colors[0]) || ''
    const priceNum = product.price[chosenSize === 'XXL' ? 'xxl' : 'xl']

    setCart((prev) => {
      // find by id + size + color
      const found = prev.find((p) => p.id === product.id && p.size === chosenSize && p.color === chosenColor)
      if (found) {
        return prev.map((p) =>
          p.id === product.id && p.size === chosenSize && p.color === chosenColor
            ? { ...p, qty: p.qty + 1 }
            : p
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          size: chosenSize,
          color: chosenColor,
          price: priceNum,
          sku: product.sku,
          qty: 1,
        },
      ]
    })
  }

  function total() {
    return cart.reduce((s, p) => s + p.price * p.qty, 0)
  }

  function removeCartItem(index) {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const WA_NUMBER = '+6281226935166' // nomor yang kamu minta

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
            {SAMPLE_PRODUCTS.map((p) => {
              const chosen = selectedSizes[p.id] || 'XL'
              const chosenColor = selectedColors[p.id] || (p.colors && p.colors[0]) || ''
              const priceNum = p.price[chosen === 'XXL' ? 'xxl' : 'xl']

              return (
                <article key={p.id} className="bg-white rounded-2xl overflow-hidden shadow">
                  <div className="relative aspect-[4/5] bg-gray-100">
                    <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">{p.title}</h3>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">XL: <span className="font-semibold text-indigo-600">{currency(p.price.xl)}</span></div>
                        <div className="text-sm text-gray-600">XXL: <span className="font-semibold text-indigo-600">{currency(p.price.xxl)}</span></div>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-gray-500">SKU: {p.sku}</p>

                    {/* Size radio */}
                    <div className="mt-3">
                      <label className="text-xs text-gray-600">Pilih ukuran</label>
                      <div className="mt-2 flex gap-2">
                        {p.sizeRange.map((s) => {
                          const norm = s.includes('XXL') ? 'XXL' : 'XL'
                          const checked = (selectedSizes[p.id] || 'XL') === norm
                          return (
                            <label key={s} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${checked ? 'border-indigo-600 bg-indigo-50' : 'bg-white'}`}>
                              <input
                                type="radio"
                                name={`size-${p.id}`}
                                value={s}
                                checked={checked}
                                onChange={() => handleSizeChange(p.id, s)}
                                className="form-radio"
                              />
                              <span className="text-sm">{s}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    {/* Color radio */}
                    <div className="mt-3">
                      <label className="text-xs text-gray-600">Pilih warna</label>
                      <div className="mt-2 flex gap-2">
                        {p.colors.map((c) => {
                          const checked = (selectedColors[p.id] || p.colors[0]) === c
                          return (
                            <label key={c} className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${checked ? 'border-indigo-600 bg-indigo-50' : 'bg-white'}`}>
                              <input
                                type="radio"
                                name={`color-${p.id}`}
                                value={c}
                                checked={checked}
                                onChange={() => handleColorChange(p.id, c)}
                                className="form-radio"
                              />
                              <span className="text-sm">{c}</span>
                            </label>
                          )
                        })}
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <div>
                        <div className="text-sm text-gray-600">Harga terpilih:</div>
                        <div className="text-lg font-semibold text-indigo-600">{currency(priceNum)}</div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button onClick={() => addToCart(p)} className="px-3 py-2 rounded-xl border text-sm">Add to cart</button>
                        <a
                          className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-sm"
                          href={`https://wa.me/${WA_NUMBER.replace(/\+/g, '')}?text=${encodeURIComponent(
                            `Halo, saya mau pesan *${p.title}* warna *${chosenColor}* ukuran *${chosen}* (${currency(priceNum)}). SKU: ${p.sku}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Order via WA
                        </a>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-600">
                      <strong>Shopee description:</strong>
                      <pre className="whitespace-pre-wrap text-xs mt-1 bg-gray-50 p-2 rounded">{generateShopeeDescription(p, chosen, chosenColor)}</pre>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <div className="text-sm text-gray-600">Cart items: <strong>{cart.reduce((s, i) => s + i.qty, 0)}</strong></div>

                {cart.length === 0 ? (
                  <div className="mt-3 text-sm text-gray-500">Keranjang kosong</div>
                ) : (
                  <ul className="mt-3 space-y-2 text-sm">
                    {cart.map((item, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{item.title} <span className="text-xs text-gray-500">({item.size} • {item.color})</span></div>
                          <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{currency(item.price)} x {item.qty}</div>
                          <div className="text-sm font-semibold">{currency(item.price * item.qty)}</div>
                          <div className="mt-1">
                            <button onClick={() => removeCartItem(idx)} className="text-red-500 text-xs">Hapus</button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="w-56 text-right">
                <div className="text-gray-600">Total</div>
                <div className="text-2xl font-bold">{currency(total())}</div>
                <div className="mt-3 flex flex-col gap-2">
                  <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg">Checkout</button>
                  <a className="px-3 py-2 border rounded-lg text-sm" href="https://shopee.co.id/">Buka toko Shopee</a>
                </div>
              </div>
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
}
