import React, { useState } from 'react'

const pages = ['home', 'catalogo', 'detalle', 'carrito', 'checkout', 'confirmacion']
const labels = { home: 'Novedades', catalogo: 'Mujer', detalle: 'Abrigos', carrito: 'Bolso', checkout: 'Checkout', confirmacion: 'Pedido confirmado' }
const products = [
  { id: 'abrigo', name: 'Abrigo núm. 04', type: 'Abrigos', price: 289000, image: '/mockups/03-detalle.png' },
  { id: 'jersey', name: 'Jersey núm. 07', type: 'Punto', price: 119000, image: '/mockups/02-catalogo.png' },
]
const money = (value) => `$${new Intl.NumberFormat('es-CL').format(value)}`

function Icon({ name }) {
  if (name === 'search') return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4.5 4.5"/></svg>
  if (name === 'bag') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8.5h14l-1 12H6l-1-12Z"/><path d="M9 9V6.5a3 3 0 0 1 6 0V9"/></svg>
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>
}

function Header({ page, bagCount, navigate }) {
  return <>
    {page === 'home' && <div className="notice">Envío gratis en Chile sobre $121.000</div>}
    <header className="header">
      <button className="wordmark" onClick={() => navigate('home')}>Atelier Norte</button>
      <nav aria-label="Principal">
        <button onClick={() => navigate('home')}>Novedades</button>
        <button onClick={() => navigate('catalogo')}>Mujer</button>
        <button onClick={() => navigate('catalogo')}>Hombre</button>
        <button onClick={() => navigate('home')}>Editorial</button>
      </nav>
      <div className="utilities"><button onClick={() => navigate('catalogo')} aria-label="Buscar"><Icon name="search" /></button><button onClick={() => navigate('carrito')} aria-label={`Bolso, ${bagCount} productos`}><Icon name="bag" /><span>{bagCount || ''}</span></button></div>
    </header>
  </>
}

function Button({ children, onClick, dark = true, className = '' }) { return <button className={`button ${dark ? 'button-dark' : 'button-outline'} ${className}`} onClick={onClick}>{children}</button> }

function Home({ navigate }) { return <main className="home">
  <section className="home-hero">
    <div className="home-image image-left" />
    <div className="hero-copy"><span>Colección 01</span><i></i><h1>El peso<br/>de lo<br/>esencial</h1><Button dark={false} onClick={() => navigate('catalogo')}>Descubrir</Button><small>01 / 03</small></div>
    <div className="home-image image-right" />
  </section>
  <div className="season-bar">Otoño–Invierno 2026 <span>/</span> Santiago</div>
</main> }

function Catalog({ navigate }) { const [filter, setFilter] = useState('Todo'); const displayed = filter === 'Todo' ? products : products.filter(p => p.type === filter)
  return <main className="catalog page-shell"><div className="catalog-top"><h1>Mujer / Otoño 2026</h1><span>24 piezas</span></div><div className="filters">{['Todo','Abrigos','Sastrería','Punto','Camisería'].map(item => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}<button className="sort">Ordenar <b>⌄</b></button></div>
  <section className="catalog-grid"><button className="catalog-portrait" onClick={() => navigate('detalle')} aria-label="Ver abrigo núm. 04" /><div className="product-main"><button className="coat-product" onClick={() => navigate('detalle')} /><p>Abrigo núm. 04 <span>/</span> {money(289000)}</p></div><div className="catalog-side">{displayed.slice(0,2).map((p, index) => <button className={`catalog-item item-${index}`} onClick={() => navigate(p.id === 'abrigo' ? 'detalle' : 'catalogo')} key={p.id}><div></div><p>{p.name} <span>/</span> {money(p.price)}</p></button>)}</div></section></main> }

function Detail({ add }) { const [size, setSize] = useState('M'); const [color, setColor] = useState('Grafito'); return <main className="detail"><aside className="thumbs"><span>01 / 04</span><i></i>{[1,2,3,4].map(n => <button className={`thumb thumb-${n}`} aria-label={`Imagen ${n}`} key={n}/>)}</aside><div className="detail-photo"></div><section className="detail-info"><p className="crumb">Mujer / Abrigos</p><i></i><h1>Abrigo<br/>núm. 04</h1><p className="price">{money(289000)}</p><p className="description">Lana virgen, estructura suave.</p><div className="picker"><span>Color</span><div><button className={color === 'Grafito' ? 'selected swatch graphite' : 'swatch graphite'} onClick={() => setColor('Grafito')}></button>Grafito <button className={color === 'Negro' ? 'selected swatch black' : 'swatch black'} onClick={() => setColor('Negro')}></button>Negro</div></div><div className="picker sizes"><span>Talla</span><div>{['XS','S','M','L'].map(s => <button className={size === s ? 'chosen' : ''} onClick={() => setSize(s)} key={s}>{s}</button>)}</div></div><Button onClick={() => add({ ...products[0], size, color })}>Añadir al bolso</Button><button className="details">Detalles y cuidado <b>+</b></button></section></main> }

function Cart({ cart, setCart, navigate }) { const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); const change = (id, delta) => setCart(current => current.flatMap(i => i.id === id ? (i.quantity + delta < 1 ? [] : [{ ...i, quantity: i.quantity + delta }]) : [i])); return <main className="cart page-shell"><section className="cart-lines"><h1>Bolso / {String(cart.length).padStart(2,'0')}</h1><div className="cart-columns"><span>Producto</span><span>Talla</span><span>Cantidad</span><span>Precio</span></div>{cart.length ? cart.map(item => <article className="cart-row" key={item.id}><div className={`cart-image ${item.id}`}></div><div><h2>{item.name}</h2><p>{item.color}</p></div><span>{item.size}</span><div className="quantity"><button onClick={() => change(item.id, -1)}>−</button>{item.quantity}<button onClick={() => change(item.id, 1)}>+</button></div><strong>{money(item.price * item.quantity)}</strong><button className="remove" onClick={() => setCart(current => current.filter(i => i.id !== item.id))}>×</button></article>) : <p className="empty">Tu bolso está vacío.</p>}<p className="shipping">Envío gratis en Chile sobre $120.000</p></section><aside className="summary"><h2>Resumen</h2><i></i><p><span>Subtotal</span><strong>{money(total)}</strong></p><p><span>Envío</span><small>Se calcula en el siguiente paso</small></p><p className="total"><span>Total</span><strong>{money(total)}</strong></p><Button dark={false} onClick={() => navigate('checkout')}>Continuar a pago</Button></aside></main> }

function Checkout({ cart, navigate }) { const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); return <main className="checkout"><header className="checkout-head"><button className="wordmark" onClick={() => navigate('home')}>Atelier Norte</button><span>Checkout / paso 01 de 02</span></header><section className="checkout-grid"><form onSubmit={(e) => { e.preventDefault(); navigate('confirmacion') }}><h1>Dirección<br/>de entrega</h1><i></i><div className="form-grid">{['Nombre','Apellido','RUT','Correo','Dirección','Comuna','Región'].map(field => <label className={['RUT','Correo','Dirección'].includes(field) ? 'wide' : ''} key={field}>{field}<input required aria-label={field}/></label>)}<label>Chile<select defaultValue="Chile"><option>Chile</option></select></label></div><Button>Continuar</Button></form><aside className="order-review"><div className="review-product"></div><div><h2>Abrigo<br/>núm. 04</h2><p>Grafito / M</p></div><div className="review-totals"><p><span>Subtotal</span><strong>{money(total)}</strong></p><p><span>Envío</span><strong>Gratis</strong></p><p><span>Total</span><strong>{money(total)}</strong></p></div><small>— &nbsp; Pago seguro</small></aside></section></main> }

function Confirmation({ navigate }) { return <main className="confirmation page-shell"><div className="confirmation-head"><button className="wordmark" onClick={() => navigate('home')}>Atelier Norte</button><span>Pedido confirmado</span></div><section><div className="thanks"><h1>Gracias por<br/>elegir con<br/>tiempo.</h1><p>Tu pedido #AN-2048 ha sido recibido.<br/>Recibirás la confirmación en tu correo.</p><Button dark={false} onClick={() => navigate('catalogo')}>Seguir explorando</Button></div><div className="folded-coat"><span>Entrega estimada /<br/>2–4 días hábiles</span></div></section><footer><span>Abrigo núm. 04 / {money(289000)}</span><span>Santiago, Chile</span></footer></main> }

export default function App() { const [page, setPage] = useState('home'); const [cart, setCart] = useState([]); const add = (product) => { setCart(current => { const found = current.find(item => item.id === product.id); return found ? current.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { ...product, quantity: 1 }] }); setPage('carrito') }; const navigate = (next) => setPage(pages.includes(next) ? next : 'home'); const count = cart.reduce((n, item) => n + item.quantity, 0); const standard = ['home','catalogo','detalle','carrito'].includes(page); return <div className={`app app-${page}`}>{standard && <Header page={page} bagCount={count} navigate={navigate}/>} {page === 'home' && <Home navigate={navigate}/>} {page === 'catalogo' && <Catalog navigate={navigate}/>} {page === 'detalle' && <Detail add={add}/>} {page === 'carrito' && <Cart cart={cart} setCart={setCart} navigate={navigate}/>} {page === 'checkout' && <Checkout cart={cart} navigate={navigate}/>} {page === 'confirmacion' && <Confirmation navigate={navigate}/>}</div> }
