import { useEffect, useState } from 'react'
import {
  ArrowRight, BadgeIndianRupee, BarChart3, Box, Building2, Check, ChevronDown,
  CircleCheck, Clock3, Code2, Globe2, Headphones, Instagram, Linkedin, LocateFixed,
  Mail, MapPin, Menu, PackageCheck, Phone, Plane, RefreshCcw, Route, Search,
  ShieldCheck, ShoppingBag, Sparkles, Store, Truck, Warehouse, X, Zap,
} from 'lucide-react'
import { Link, NavLink, Route as RouterRoute, Routes, useLocation } from 'react-router-dom'

const nav = [
  ['Products', '/services'],
  ['Platform', '/partners'],
  ['Pricing', '/pricing'],
  ['Track Order', '/tracking'],
  ['Company', '/about'],
]

const products = [
  {
    kicker: '1/4 · SHIPPING',
    title: 'Unified domestic shipping',
    copy: 'Ship to every customer through one powerful workflow. Compare courier performance, automate dispatch and keep every order visible.',
    metric: '29,000+',
    metricLabel: 'serviceable pin codes',
    cta: 'Explore shipping',
    to: '/services',
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
    to: '/services',
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
    to: '/partners',
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
    to: '/contact',
    icon: BadgeIndianRupee,
    gradient: 'from-[#8a5cf6] via-[#bd91dc] to-[#ddff19]',
    accent: '#40208d',
    mockup: 'capital',
  },
]

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="offer-bar">
        <span>Launch offer: get <strong>20% off</strong> your first five shipments</span>
        <Link to="/pricing">Claim offer <ArrowRight size={14} /></Link>
      </div>
      <header className="site-nav">
        <div className="shell nav-inner">
          <Link to="/" className="brand" aria-label="Shipray home">
            <img src="/assets/shipray-logo.svg" alt="Shipray Logistics" />
          </Link>
          <nav className="desktop-links" aria-label="Main navigation">
            {nav.map(([label, to], index) => (
              <NavLink key={to} to={to}>
                {label}{index < 2 && <ChevronDown size={14} />}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <Link className="login-link" to="/contact">Log in</Link>
            <Link className="button primary small" to="/pricing">Try for free</Link>
            <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mobile-menu">
            {nav.map(([label, to]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}
            <Link className="button primary" to="/pricing" onClick={() => setOpen(false)}>Try for free</Link>
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
            <Link className="button primary" to="/pricing">Start shipping free <ArrowRight size={17} /></Link>
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
          <Link to="/services">Explore all products <ArrowRight /></Link>
        </div>
        <div className="solution-grid">
          {solutionCards.map(([title, copy, Icon], i) => (
            <article key={title} className={`solution-card tone-${i + 1}`}>
              <span><Icon /></span><h3>{title}</h3><p>{copy}</p><Link to="/services">Learn more <ArrowRight size={15} /></Link>
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
            <article key={title}><span><Icon /></span><h3>{title}</h3><p>{copy}</p><Link to="/services">{cta} <ArrowRight size={15} /></Link></article>
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
        <div><span className="section-label light">ENGINEERED FOR DEVELOPERS</span><h2>Powerful logistics.<br />Clean integrations.</h2><p>Connect Shipray to your storefront, OMS or custom stack with developer-friendly APIs and practical documentation.</p><Link className="button lime" to="/contact">Explore our APIs <Code2 size={17} /></Link></div>
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

function Pricing() {
  const [mode, setMode] = useState('prepaid')
  const [result, setResult] = useState(null)
  const calculate = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const weight = Math.max(.5, Number(data.get('weight')) || .5)
    setResult(Math.round(49 + weight * 28 + (mode === 'cod' ? 32 : 0)))
  }
  return (
    <section className="form-page">
      <div className="shell form-grid">
        <div><span className="eyebrow"><BadgeIndianRupee size={17} /> SIMPLE PRICING</span><h1>Know your shipping cost in seconds</h1><p>Enter your route and package weight for a quick indicative rate. No platform fee and no minimum monthly shipment commitment.</p><ul className="feature-list"><li><Check /> 100+ courier options</li><li><Check /> Prepaid and COD support</li><li><Check /> Volume-based business plans</li></ul></div>
        <form className="calculator-card" onSubmit={calculate}>
          <div className="calc-head"><div><span>Rate calculator</span><small>Instant indicative quote</small></div><BadgeIndianRupee /></div>
          <label>Pickup pincode<input name="pickup" required pattern="\d{6}" placeholder="380015" /></label>
          <label>Delivery pincode<input name="delivery" required pattern="\d{6}" placeholder="110001" /></label>
          <label>Package weight (kg)<input name="weight" required type="number" min=".1" step=".1" placeholder="0.5" /></label>
          <div className="mode-switch"><button type="button" className={mode === 'prepaid' ? 'active' : ''} onClick={() => setMode('prepaid')}>Prepaid</button><button type="button" className={mode === 'cod' ? 'active' : ''} onClick={() => setMode('cod')}>Cash on delivery</button></div>
          <button className="button primary full" type="submit">Calculate rate <ArrowRight size={17} /></button>
          {result && <div className="rate-result"><span>Estimated from</span><strong>₹{result}</strong><small>+ applicable taxes</small></div>}
        </form>
      </div>
    </section>
  )
}

function Tracking() {
  const [awb, setAwb] = useState('')
  const [searched, setSearched] = useState(false)
  return (
    <section className="tracking-page">
      <div className="shell tracking-shell">
        <span className="eyebrow"><LocateFixed size={17} /> LIVE SHIPMENT VISIBILITY</span>
        <h1>Where is your order?</h1><p>Enter an AWB or order ID to see the latest shipment milestone.</p>
        <form className="tracking-search" onSubmit={(e) => { e.preventDefault(); if (awb.length >= 6) setSearched(true) }}>
          <Search /><input value={awb} onChange={e => setAwb(e.target.value)} minLength={6} placeholder="Enter AWB or Order ID" /><button className="button primary">Track order <ArrowRight size={17} /></button>
        </form>
        {searched && <div className="tracking-result"><div className="track-head"><div><small>Shipment ID</small><strong>{awb.toUpperCase()}</strong></div><span><Truck /> In transit</span></div><div className="timeline">{['Order placed', 'Picked up', 'In transit', 'Out for delivery', 'Delivered'].map((x, i) => <div className={i < 3 ? 'done' : ''} key={x}><i>{i < 3 ? <Check /> : i + 1}</i><span>{x}</span></div>)}</div><p>Demo status shown for preview. Connect your live tracking API to display real milestones.</p></div>}
      </div>
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
    <section className="final-cta"><div className="shell"><div><span>READY WHEN YOU ARE</span><h2>Start shipping with more confidence.</h2><p>Join growing Indian businesses simplifying every delivery with Shipray.</p></div><Link className="button dark-button" to="/pricing">Try Shipray for free <ArrowRight size={17} /></Link></div></section>
  )
}

function Footer() {
  return (
    <footer><div className="shell footer-grid"><div className="footer-brand"><img src="/assets/shipray-logo-light.svg" alt="Shipray Logistics" /><p>One smart logistics platform for every shipment — from first pickup to final delivery.</p><div className="socials"><a href="#" aria-label="LinkedIn"><Linkedin /></a><a href="#" aria-label="Instagram"><Instagram /></a></div></div><div><h4>Products</h4><Link to="/services">Domestic shipping</Link><Link to="/services">International shipping</Link><Link to="/services">B2B cargo</Link><Link to="/tracking">Order tracking</Link></div><div><h4>Platform</h4><Link to="/partners">Courier network</Link><Link to="/pricing">Rate calculator</Link><Link to="/contact">API integrations</Link><Link to="/contact">Support</Link></div><div><h4>Company</h4><Link to="/about">About us</Link><Link to="/contact">Contact</Link><Link to="/about">Our values</Link><Link to="/contact">Careers</Link></div></div><div className="shell footer-bottom"><span>© 2026 Shipray Logistics Pvt. Ltd.</span><span>Privacy · Terms · Security</span></div></footer>
  )
}

export default function App() {
  return (
    <>
      <ScrollTop /><Header />
      <main>
        <Routes>
          <RouterRoute path="/" element={<Home />} />
          <RouterRoute path="/services" element={<StandardPage type="services" />} />
          <RouterRoute path="/partners" element={<StandardPage type="partners" />} />
          <RouterRoute path="/pricing" element={<Pricing />} />
          <RouterRoute path="/tracking" element={<Tracking />} />
          <RouterRoute path="/about" element={<StandardPage type="about" />} />
          <RouterRoute path="/contact" element={<Contact />} />
          <RouterRoute path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
