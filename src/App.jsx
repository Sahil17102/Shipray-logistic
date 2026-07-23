import { useEffect, useState } from 'react'
import {
  ArrowRight, BadgeIndianRupee, BarChart3, Box, Building2, Check,
  CircleCheck, Clock3, Code2, Globe2, Headphones, Instagram, Linkedin, LocateFixed,
  Mail, MapPin, Menu, PackageCheck, Phone, Plane, RefreshCcw, Route, Ruler, Scale,
  Search, ShieldCheck, ShoppingBag, Sparkles, Store, Truck, Warehouse, X, Zap,
} from 'lucide-react'
import { Link, NavLink, Route as RouterRoute, Routes, useLocation } from 'react-router-dom'

const nav = [
  ['Home', '/'],
  ['Weight Calculator', '/weight-calculator'],
  ['Rate Calculator', '/rate-calculator'],
  ['Track Order', '/tracking'],
]

const products = [
  {
    kicker: '1/4 · SHIPPING',
    title: 'Unified domestic shipping',
    copy: 'Ship to every customer through one powerful workflow. Compare courier performance, automate dispatch and keep every order visible.',
    metric: '29,000+',
    metricLabel: 'serviceable pin codes',
    cta: 'Explore shipping',
    to: '/rate-calculator',
    icon: Truck,
    gradient: 'from-[#81e6ff] via-[#7cc8ff] to-[#7659ff]',
    accent: '#6b50f6',
    mockup: 'orders',
  },
  {
    kicker: '2/4 · CROSS-BORDER',
    title: 'Full-stack global enablement',
    copy: 'Take Indian products worldwide with supported documentation, international courier selection and milestone-level visibility.',
    metric: '220+',
    metricLabel: 'countries & territories',
    cta: 'Go global',
    to: '/rate-calculator',
    icon: Globe2,
    gradient: 'from-[#79c9f3] via-[#62e5cf] to-[#67f095]',
    accent: '#0c8d72',
    mockup: 'globe',
  },
  {
    kicker: '3/4 · INTELLIGENCE',
    title: 'AI-powered tools for logistics growth',
    copy: 'Turn route, cost and delivery signals into faster courier decisions. Spot exceptions before they become customer problems.',
    metric: '99.2%',
    metricLabel: 'platform uptime',
    cta: 'See the platform',
    to: '/tracking',
    icon: Sparkles,
    gradient: 'from-[#ffba67] via-[#ffd264] to-[#bdff59]',
    accent: '#7b5d00',
    mockup: 'analytics',
  },
  {
    kicker: '4/4 · BUSINESS SUPPORT',
    title: 'Flexible solutions that scale with you',
    copy: 'From the first hundred parcels to complex multi-location movement, use a courier and support model built around your growth.',
    metric: '100+',
    metricLabel: 'courier options',
    cta: 'Talk to an expert',
    to: '/weight-calculator',
    icon: BadgeIndianRupee,
    gradient: 'from-[#8a5cf6] via-[#bd91dc] to-[#ddff19]',
    accent: '#40208d',
    mockup: 'capital',
  },
]

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="offer-bar">
        <span>Launch offer: get <strong>20% off</strong> your first five shipments</span>
        <Link to="/rate-calculator">Calculate now <ArrowRight size={14} /></Link>
      </div>
      <header className="site-nav">
        <div className="shell nav-inner">
          <Link to="/" className="brand" aria-label="Shipray home">
            <img src="/assets/shipray-logo.svg" alt="Shipray Logistics" />
          </Link>
          <nav className="desktop-links" aria-label="Main navigation">
            {nav.map(([label, to]) => (
              <NavLink key={to} to={to}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <Link className="button primary small" to="/rate-calculator">Calculate rate</Link>
            <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mobile-menu">
            {nav.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
            <Link className="button primary" to="/rate-calculator" onClick={() => setOpen(false)}>Calculate rate</Link>
          </div>
        )}
      </header>
    </>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow one" />
      <div className="hero-glow two" />
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="eyebrow"><Sparkles size={16} /> Built for ambitious businesses</div>
          <h1>Ship smarter.<br />Grow <span>without limits.</span></h1>
          <p>One reliable platform to compare couriers, ship across India, track every order and keep customers coming back.</p>
          <div className="hero-actions">
            <Link className="button primary" to="/rate-calculator">Calculate shipping rate <ArrowRight size={17} /></Link>
            <Link className="button ghost" to="/tracking"><LocateFixed size={17} /> Track an order</Link>
          </div>
          <div className="hero-note"><CircleCheck size={18} /> No setup fee · No minimum commitment</div>
        </div>
        <div className="hero-art">
          <div className="hero-orbit" />
          <img src="/assets/shipray-3d-logistics-hero.png" alt="Shipray connected logistics network" />
          <div className="float-card pickup">
            <span className="mini-icon"><PackageCheck size={20} /></span>
            <div><small>Today’s pickups</small><strong>128 ready</strong></div>
            <span className="positive">+18%</span>
          </div>
          <div className="float-card delivery">
            <span className="mini-icon lime"><Truck size={20} /></span>
            <div><small>Delivery score</small><strong>Excellent</strong></div>
            <span className="score">96</span>
          </div>
        </div>
      </div>
      <div className="shell hero-pager" aria-hidden="true"><button>‹</button><span className="active" /><span /><span /><span /><button>›</button></div>
    </section>
  )
}

function TrustRail() {
  return (
    <section className="trust-rail">
      <div className="shell">
        <p>Powering success stories for <strong>50,000+ businesses</strong></p>
        <div className="logo-row">
          {['mamaearth', 'BEARDO', 'boAt', 'THE MAN COMPANY', 'Wakefit', 'Lenskart', 'SUGAR'].map(x => <span key={x}>{x}</span>)}
        </div>
      </div>
    </section>
  )
}

function CardMockup({ type }) {
  if (type === 'globe') return (
    <div className="mockup centered">
      <div className="globe"><Plane /><span className="route-line a" /><span className="route-line b" /></div>
      <div className="route-pill"><MapPin size={16} /> Mumbai <ArrowRight size={14} /> New York</div>
    </div>
  )
  if (type === 'analytics') return (
    <div className="mockup analytics">
      <div className="analytics-top"><span>Courier intelligence</span><span className="live-dot">Live</span></div>
      <div className="bars">{[45, 68, 52, 82, 74, 94].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
      <div className="insight"><Sparkles size={18} /> <div><b>Best route found</b><small>12% faster than last week</small></div></div>
    </div>
  )
  if (type === 'capital') return (
    <div className="mockup capital">
      <div className="capital-card"><small>Monthly shipping saved</small><strong>₹42,680</strong><div className="progress"><i /></div><span>Great performance</span></div>
      <div className="capital-mini"><ShieldCheck /><span>Secure payments</span></div>
    </div>
  )
  return (
    <div className="mockup orders">
      <div className="mockup-head"><span>Today’s orders</span><strong>View all</strong></div>
      {[
        ['#SR29481', 'Out for delivery', 'violet'],
        ['#SR29480', 'In transit', 'blue'],
        ['#SR29479', 'Delivered', 'green'],
      ].map(([id, status, color]) => (
        <div className="order-row" key={id}><span className={`parcel ${color}`}><Box size={18} /></span><div><b>{id}</b><small>Ahmedabad → Delhi</small></div><em>{status}</em></div>
      ))}
    </div>
  )
}

function RollingCards() {
  return (
    <section className="stack-section">
      <div className="shell section-intro">
        <span className="section-label">ONE PLATFORM. EVERY POSSIBILITY.</span>
        <h2>Why growing businesses<br />choose Shipray</h2>
        <p>Purpose-built tools that simplify logistics, remove operational friction and create room for your business to grow.</p>
      </div>
      <div className="shell stack-wrap">
        {products.map((product, index) => {
          const Icon = product.icon
          return (
            <article className={`stack-card bg-gradient-to-br ${product.gradient}`} style={{ '--stack-offset': `${120 + index * 12}px` }} key={product.title}>
              <div className="stack-copy">
                <span className="card-kicker">{product.kicker}</span>
                <span className="feature-icon"><Icon /></span>
                <h3>{product.title}</h3>
                <p>{product.copy}</p>
                <Link to={product.to}> {product.cta} <ArrowRight size={16} /></Link>
              </div>
              <div className="stack-visual">
                <div className="big-metric"><strong>{product.metric}</strong><span>{product.metricLabel}</span></div>
                <CardMockup type={product.mockup} />
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

const solutionCards = [
  ['Domestic shipping', 'Reach customers in 29,000+ pin codes with the right courier for every route.', Truck],
  ['B2B cargo', 'Move heavier and bulk consignments with dependable surface and air cargo options.', Warehouse],
  ['Global delivery', 'Ship beyond borders with a supported documentation and tracking workflow.', Globe2],
  ['Returns made simple', 'Turn reverse logistics into an easy, visible customer experience.', RefreshCcw],
  ['Live tracking', 'Give teams and customers consistent milestones across courier networks.', LocateFixed],
  ['Smart rate engine', 'Compare real route, weight, SLA and payment-mode rates in moments.', BadgeIndianRupee],
]

function Solutions() {
  return (
    <section className="solutions">
      <div className="shell">
        <div className="section-heading">
          <div><span className="section-label">SHIPRAY SOLUTIONS</span><h2>Everything you need to<br />move business forward</h2></div>
          <Link to="/rate-calculator">Calculate a rate <ArrowRight /></Link>
        </div>
        <div className="solution-grid">
          {solutionCards.map(([title, copy, Icon], i) => (
            <article key={title} className={`solution-card tone-${i + 1}`}>
              <span><Icon /></span><h3>{title}</h3><p>{copy}</p><Link to="/rate-calculator">Calculate now <ArrowRight size={15} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section className="stats-section">
      <div className="shell stats-grid">
        {[
          ['50K+', 'businesses shipping'],
          ['29K+', 'serviceable pin codes'],
          ['100+', 'courier options'],
          ['99.2%', 'platform uptime'],
        ].map(([num, label]) => <div key={label}><strong>{num}</strong><span>{label}</span></div>)}
      </div>
    </section>
  )
}

function BusinessTypes() {
  return (
    <section className="business-section">
      <div className="shell">
        <div className="center-heading"><span className="section-label">BUILT AROUND YOU</span><h2>One platform. Every kind of business.</h2><p>Whether you are shipping ten orders or ten thousand, Shipray fits the way you work.</p></div>
        <div className="business-grid">
          {[
            ['D2C brands', 'Create a post-purchase experience customers remember.', ShoppingBag, 'Explore D2C shipping'],
            ['SMEs', 'Start quickly, control costs and scale without operational rework.', Store, 'Solutions for SMEs'],
            ['Enterprise', 'Coordinate multi-location, high-volume logistics with clarity.', Building2, 'Enterprise logistics'],
          ].map(([title, copy, Icon, cta]) => (
            <article key={title}><span><Icon /></span><h3>{title}</h3><p>{copy}</p><Link to="/rate-calculator">{cta} <ArrowRight size={15} /></Link></article>
          ))}
        </div>
      </div>
    </section>
  )
}

function DeveloperBand() {
  return (
    <section className="developer-band">
      <div className="shell developer-grid">
        <div><span className="section-label light">SMART SHIPPING TOOLS</span><h2>Know the weight.<br />Know the cost.</h2><p>Calculate chargeable weight, compare an indicative shipping rate and follow every delivery from one focused Shipray experience.</p><Link className="button lime" to="/weight-calculator">Calculate weight <Scale size={17} /></Link></div>
        <div className="code-window"><div><i /><i /><i /><span>create-shipment.js</span></div><pre>{`const shipment = await shipray.orders.create({
  pickup: "Ahmedabad",
  delivery: "Bengaluru",
  weight: 1.4,
  payment: "prepaid"
});

// Best courier matched
console.log(shipment.awb);`}</pre></div>
      </div>
    </section>
  )
}

function Home() {
  return <><Hero /><TrustRail /><RollingCards /><Solutions /><Stats /><BusinessTypes /><DeveloperBand /><FinalCta /></>
}

const pageData = {
  services: {
    eyebrow: 'SHIPPING SOLUTIONS',
    title: 'Services for every shipment',
    copy: 'From a local parcel to global cargo, Shipray brings the right courier, rate and workflow into one dependable platform.',
    icon: Truck,
    cards: solutionCards,
  },
  partners: {
    eyebrow: 'COURIER ECOSYSTEM',
    title: 'The right partner for every route',
    copy: 'Choose on performance, serviceability, speed and cost — without managing a different portal for every courier.',
    icon: Route,
    cards: [
      ['Intelligent matching', 'Compare route-level courier fit before each booking.', Sparkles],
      ['Broad serviceability', 'Reach customers across metro, tier 2, tier 3 and remote locations.', MapPin],
      ['SLA visibility', 'See delivery expectations and shipment milestones in one format.', Clock3],
      ['Exception support', 'Know what needs attention and move to the next action faster.', Headphones],
      ['Multi-mode delivery', 'Balance express, surface, air, cargo and hyperlocal options.', Plane],
      ['Secure operations', 'Consistent processes protect shipment and customer information.', ShieldCheck],
    ],
  },
  about: {
    eyebrow: 'ABOUT SHIPRAY',
    title: 'Logistics built around growth',
    copy: 'We believe shipping should feel like momentum — not administration. Shipray makes every delivery decision clearer for Indian businesses.',
    icon: Building2,
    cards: [
      ['Clarity first', 'Simple rates, readable milestones and practical next actions.', LocateFixed],
      ['Built for reliability', 'Dependable workflows that keep operating as volume grows.', ShieldCheck],
      ['Human when it matters', 'Real support for the exceptions software cannot resolve alone.', Headphones],
      ['Always improving', 'Smarter decisions informed by route and performance data.', BarChart3],
      ['Customer obsessed', 'Every shipment is part of someone’s brand experience.', ShoppingBag],
      ['Growth minded', 'Tools and partnerships designed to remove the next constraint.', Zap],
    ],
  },
}

function InnerHero({ data }) {
  const Icon = data.icon
  return (
    <section className="inner-hero">
      <div className="inner-glow" />
      <div className="shell inner-grid">
        <div><span className="eyebrow"><Icon size={17} /> {data.eyebrow}</span><h1>{data.title}</h1><p>{data.copy}</p><div className="hero-actions"><Link className="button primary" to="/pricing">Get started <ArrowRight size={17} /></Link><Link className="button ghost" to="/contact">Talk to our team</Link></div></div>
        <div className="inner-art"><img src="/assets/shipray-hero-courier.png" alt="" /><div className="inner-status"><CircleCheck /><div><small>Shipray network</small><strong>Ready to deliver</strong></div></div></div>
      </div>
    </section>
  )
}

function StandardPage({ type }) {
  const data = pageData[type]
  return (
    <>
      <InnerHero data={data} />
      <section className="page-content"><div className="shell solution-grid">{data.cards.map(([title, copy, Icon], i) => <article className={`solution-card tone-${(i % 6) + 1}`} key={title}><span><Icon /></span><h3>{title}</h3><p>{copy}</p><Link to="/contact">Learn more <ArrowRight size={15} /></Link></article>)}</div></section>
      <Stats /><FinalCta />
    </>
  )
}

function ToolIntro({ eyebrow, icon: Icon, title, copy, image, imageAlt, bullets }) {
  return (
    <div className="tool-intro">
      <span className="eyebrow"><Icon size={17} /> {eyebrow}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
      <ul className="feature-list">
        {bullets.map(item => <li key={item}><Check /> {item}</li>)}
      </ul>
      <div className="tool-image"><img src={image} alt={imageAlt} /></div>
    </div>
  )
}

function WeightCalculator() {
  const [shipmentType, setShipmentType] = useState('domestic')
  const [result, setResult] = useState(null)
  const calculate = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const length = Number(data.get('length'))
    const width = Number(data.get('width'))
    const height = Number(data.get('height'))
    const actual = Number(data.get('actual'))
    const divisor = shipmentType === 'domestic' ? 5000 : 6000
    const volumetric = (length * width * height) / divisor
    setResult({
      actual,
      volumetric,
      chargeable: Math.max(actual, volumetric),
      basis: volumetric > actual ? 'Volumetric weight' : 'Actual weight',
    })
  }
  return (
    <section className="tool-page weight-tool">
      <div className="tool-glow violet" />
      <div className="shell tool-layout">
        <ToolIntro
          eyebrow="WEIGHT CALCULATOR"
          icon={Scale}
          title="Find your chargeable weight."
          copy="Carriers compare a parcel’s actual weight with its volumetric weight. Enter the packed dimensions to know which value your shipment will be billed on."
          image="/assets/shipray-weight-calculator.png"
          imageAlt="Parcel on a digital weighing scale with dimensional guides"
          bullets={['Domestic and international divisors', 'Volumetric weight calculated instantly', 'Clear chargeable-weight breakdown']}
        />
        <form className="calculator-card tool-card" onSubmit={calculate}>
          <div className="calc-head"><div><span>Package details</span><small>Use final packed dimensions in centimetres</small></div><Ruler /></div>
          <div className="mode-switch"><button type="button" className={shipmentType === 'domestic' ? 'active' : ''} onClick={() => setShipmentType('domestic')}>Domestic</button><button type="button" className={shipmentType === 'international' ? 'active' : ''} onClick={() => setShipmentType('international')}>International</button></div>
          <div className="dimension-grid">
            <label>Length (cm)<input name="length" required type="number" min="1" step=".1" placeholder="30" /></label>
            <label>Width (cm)<input name="width" required type="number" min="1" step=".1" placeholder="20" /></label>
            <label>Height (cm)<input name="height" required type="number" min="1" step=".1" placeholder="15" /></label>
          </div>
          <label>Actual weight (kg)<input name="actual" required type="number" min=".01" step=".01" placeholder="1.20" /></label>
          <div className="formula-note"><Scale /><span>Formula: L × W × H ÷ {shipmentType === 'domestic' ? '5,000' : '6,000'}</span></div>
          <button className="button primary full" type="submit">Calculate chargeable weight <ArrowRight size={17} /></button>
          {result && (
            <div className="weight-result result-panel">
              <div><span>Actual</span><strong>{result.actual.toFixed(2)} kg</strong></div>
              <div><span>Volumetric</span><strong>{result.volumetric.toFixed(2)} kg</strong></div>
              <div className="result-primary"><span>Chargeable · {result.basis}</span><strong>{result.chargeable.toFixed(2)} kg</strong></div>
            </div>
          )}
        </form>
      </div>
      <ToolSteps items={[['1', 'Measure the box', 'Use the longest point on each packed side.'], ['2', 'Enter actual weight', 'Include packaging, fillers and labels.'], ['3', 'Use the higher value', 'That becomes the chargeable weight.']]} />
    </section>
  )
}

function RateCalculator() {
  const [paymentMode, setPaymentMode] = useState('prepaid')
  const [serviceMode, setServiceMode] = useState('surface')
  const [result, setResult] = useState(null)
  const calculate = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const pickup = String(data.get('pickup'))
    const delivery = String(data.get('delivery'))
    const weight = Math.max(.5, Number(data.get('weight')))
    const zone = pickup.slice(0, 2) === delivery.slice(0, 2) ? 1 : pickup[0] === delivery[0] ? 1.18 : 1.42
    const base = serviceMode === 'express' ? 62 : 42
    const perKg = serviceMode === 'express' ? 34 : 22
    const cod = paymentMode === 'cod' ? 35 : 0
    const rate = Math.round((base + Math.max(0, weight - .5) * perKg) * zone + cod)
    setResult({ rate, days: serviceMode === 'express' ? '1–3 days' : '3–6 days', zone: zone === 1 ? 'Local' : zone === 1.18 ? 'Regional' : 'National' })
  }
  return (
    <section className="tool-page rate-tool">
      <div className="tool-glow cyan" />
      <div className="shell tool-layout">
        <ToolIntro
          eyebrow="RATE CALCULATOR"
          icon={BadgeIndianRupee}
          title="Estimate your shipping rate."
          copy="Compare an indicative cost by route, chargeable weight, delivery speed and payment mode before you book."
          image="/assets/shipray-rate-calculator.png"
          imageAlt="Delivery van, parcels and route markers representing a shipping rate"
          bullets={['Route-aware indicative pricing', 'Surface and express estimates', 'Prepaid and COD calculations']}
        />
        <form className="calculator-card tool-card" onSubmit={calculate}>
          <div className="calc-head"><div><span>Shipment route</span><small>Get an instant indicative quote</small></div><BadgeIndianRupee /></div>
          <div className="route-grid">
            <label>Pickup pincode<input name="pickup" required pattern="\d{6}" inputMode="numeric" placeholder="380015" /></label>
            <label>Delivery pincode<input name="delivery" required pattern="\d{6}" inputMode="numeric" placeholder="110001" /></label>
          </div>
          <label>Chargeable weight (kg)<input name="weight" required type="number" min=".1" step=".1" placeholder="0.5" /></label>
          <span className="field-caption">Delivery speed</span>
          <div className="mode-switch"><button type="button" className={serviceMode === 'surface' ? 'active' : ''} onClick={() => setServiceMode('surface')}>Surface</button><button type="button" className={serviceMode === 'express' ? 'active' : ''} onClick={() => setServiceMode('express')}>Express</button></div>
          <span className="field-caption">Payment mode</span>
          <div className="mode-switch"><button type="button" className={paymentMode === 'prepaid' ? 'active' : ''} onClick={() => setPaymentMode('prepaid')}>Prepaid</button><button type="button" className={paymentMode === 'cod' ? 'active' : ''} onClick={() => setPaymentMode('cod')}>Cash on delivery</button></div>
          <button className="button primary full" type="submit">Calculate shipping rate <ArrowRight size={17} /></button>
          {result && <div className="rate-result enhanced"><div><span>Estimated from</span><strong>₹{result.rate}</strong><small>+ applicable taxes</small></div><div><b>{result.days}</b><small>{result.zone} route · {serviceMode}</small></div></div>}
        </form>
      </div>
      <ToolSteps items={[['01', 'Add the route', 'Enter valid six-digit pickup and delivery pincodes.'], ['02', 'Choose the service', 'Balance surface economy with express speed.'], ['03', 'Review the estimate', 'Use the quote to plan shipment cost.']]} />
    </section>
  )
}

function ToolSteps({ items }) {
  return (
    <div className="shell tool-steps">
      {items.map(([number, title, copy]) => <article key={title}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}
    </div>
  )
}

function Tracking() {
  const [awb, setAwb] = useState('')
  const [searched, setSearched] = useState(false)
  const milestones = ['Order placed', 'Picked up', 'In transit', 'Out for delivery', 'Delivered']
  return (
    <section className="tool-page tracking-tool">
      <div className="tool-glow pink" />
      <div className="shell tracking-hero-grid">
        <div className="tracking-copy">
          <span className="eyebrow"><LocateFixed size={17} /> LIVE SHIPMENT VISIBILITY</span>
          <h1>Track every move, from pickup to doorstep.</h1>
          <p>Enter an AWB or order ID for a clear milestone view of your shipment’s latest journey.</p>
          <form className="tracking-search" onSubmit={(e) => { e.preventDefault(); if (awb.trim().length >= 6) setSearched(true) }}>
            <Search /><input value={awb} onChange={e => { setAwb(e.target.value); setSearched(false) }} minLength={6} required placeholder="Enter AWB or Order ID" /><button className="button primary">Track order <ArrowRight size={17} /></button>
          </form>
          <div className="tracking-assurance"><span><CircleCheck /> One clear timeline</span><span><CircleCheck /> Courier-wide visibility</span></div>
        </div>
        <div className="tracking-art"><img src="/assets/shipray-tracking.png" alt="Smartphone, parcel and delivery van showing a shipment journey" /></div>
      </div>
      {searched && <div className="shell tracking-result live-result"><div className="track-head"><div><small>Shipment ID</small><strong>{awb.trim().toUpperCase()}</strong></div><span><Truck /> In transit</span></div><div className="shipment-meta"><div><small>Current location</small><b>Delhi sorting facility</b></div><div><small>Expected delivery</small><b>Tomorrow, by 8 PM</b></div><div><small>Service</small><b>Shipray Express</b></div></div><div className="timeline">{milestones.map((item, index) => <div className={index < 3 ? 'done' : ''} key={item}><i>{index < 3 ? <Check /> : index + 1}</i><span>{item}</span></div>)}</div><p>Preview status shown for this demo. Connect the live tracking API to display real courier events.</p></div>}
      <ToolSteps items={[['01', 'Enter your ID', 'Use the AWB or order ID shared at dispatch.'], ['02', 'Read the milestone', 'See the latest scan in a consistent timeline.'], ['03', 'Plan the next step', 'Know when to wait and when a shipment needs attention.']]} />
    </section>
  )
}

function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <section className="form-page contact-page"><div className="shell form-grid">
      <div><span className="eyebrow"><Headphones size={17} /> LET’S TALK LOGISTICS</span><h1>Tell us what you need to move</h1><p>Share your shipment volume, routes or operational challenge. Our team will help map the right way forward.</p><div className="contact-lines"><a href="tel:+918487881121"><Phone /> +91 84878 81121</a><a href="mailto:info@shipraylogistics.com"><Mail /> info@shipraylogistics.com</a><span><MapPin /> Ahmedabad, Gujarat, India</span></div></div>
      <form className="calculator-card" onSubmit={e => { e.preventDefault(); e.currentTarget.reset(); setSent(true) }}>
        <div className="calc-head"><div><span>Speak with an expert</span><small>We usually respond within one business day</small></div><Headphones /></div>
        <label>Your name<input required name="name" placeholder="Full name" /></label>
        <label>Work email<input required type="email" name="email" placeholder="you@company.com" /></label>
        <label>Phone number<input required name="phone" pattern="[0-9]{10}" placeholder="10-digit mobile number" /></label>
        <label>How can we help?<textarea name="message" rows="4" placeholder="Tell us about your shipping needs" /></label>
        <button className="button primary full" type="submit">Send enquiry <ArrowRight size={17} /></button>
        {sent && <div className="success-message"><CircleCheck /> Thanks — our team will contact you shortly.</div>}
      </form>
    </div></section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta"><div className="shell"><div><span>READY WHEN YOU ARE</span><h2>Start shipping with more confidence.</h2><p>Know your chargeable weight, estimate the rate and track every delivery.</p></div><Link className="button dark-button" to="/rate-calculator">Calculate a rate <ArrowRight size={17} /></Link></div></section>
  )
}

function Footer() {
  return (
    <footer><div className="shell footer-grid compact"><div className="footer-brand"><img src="/assets/shipray-logo-light.svg" alt="Shipray Logistics" /><p>One focused logistics toolkit for every shipment — from packed weight to final delivery.</p><div className="socials"><a href="#" aria-label="LinkedIn"><Linkedin /></a><a href="#" aria-label="Instagram"><Instagram /></a></div></div><div><h4>Calculators</h4><Link to="/weight-calculator">Weight calculator</Link><Link to="/rate-calculator">Rate calculator</Link></div><div><h4>Shipment tools</h4><Link to="/tracking">Track an order</Link><Link to="/">Home</Link></div><div><h4>Contact</h4><a href="tel:+918487881121">+91 84878 81121</a><a href="mailto:info@shipraylogistics.com">info@shipraylogistics.com</a></div></div><div className="shell footer-bottom"><span>© 2026 Shipray Logistics Pvt. Ltd.</span><span>Privacy · Terms · Security</span></div></footer>
  )
}

export default function App() {
  return (
    <>
      <ScrollTop /><Header />
      <main>
        <Routes>
          <RouterRoute path="/" element={<Home />} />
          <RouterRoute path="/weight-calculator" element={<WeightCalculator />} />
          <RouterRoute path="/rate-calculator" element={<RateCalculator />} />
          <RouterRoute path="/tracking" element={<Tracking />} />
          <RouterRoute path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
