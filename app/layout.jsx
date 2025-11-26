import './globals.css'

export const metadata = {
  title: 'IlaFashion',
  description: 'Gamis polos bahan polo-linen produksi lokal - IlaFashion',
  openGraph: {
    title: 'IlaFashion',
    description: 'Gamis polos bahan polo-linen produksi lokal',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
