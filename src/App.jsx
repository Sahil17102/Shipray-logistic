import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BadgeIndianRupee, BarChart3, BookOpen, Box, Building2, Check,
  ChevronDown, ChevronLeft, ChevronRight, CircleCheck, Clock3, Code2, Globe2, Headphones,
  Instagram, Linkedin, LocateFixed, Mail, MapPin, Menu, PackageCheck, PackageSearch,
  Phone, Plane, PlugZap, RefreshCcw, Route, Ruler, Scale, Search, ShieldCheck,
  ShoppingBag, Sparkles, Store, Truck, Warehouse, X, Zap,
} from 'lucide-react'
import { Link, NavLink, Route as RouterRoute, Routes, useLocation } from 'react-router-dom'

const platformItems = [
  {
    label: 'Sales Channels',
    copy: 'Connect storefronts and marketplaces',
    to: '/integrations/sales-channels',
    icon: ShoppingBag,
  },
  {
    label: 'Courier Partners',
    copy: 'Access a flexible delivery network',
    to: '/integrations/courier-partners',
    icon: Truck,
  },
]

const toolItems = [
  {
    label: 'Weight Estimator',
    copy: 'Calculate chargeable parcel weight',
    to: '/weight-calculator',
    icon: Scale,
  },
  {
    label: 'Rate Calculator',
    copy: 'Compare estimated shipping costs',
    to: '/rate-calculator',
    icon: BadgeIndianRupee,
  },
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
  const [desktopMenu, setDesktopMenu] = useState(null)
  const [mobileGroup, setMobileGroup] = useState(null)
  const headerRef = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    setDesktopMenu(null)
    setMobileGroup(null)
  }, [pathname])

  useEffect(() => {
    const closeMenus = (event) => {
      if (!headerRef.current?.contains(event.target)) setDesktopMenu(null)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setDesktopMenu(null)
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', closeMenus)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeMenus)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const toggleMobileGroup = (group) => {
    setMobileGroup(current => current === group ? null : group)
  }

  return (
    <header className="site-nav" ref={headerRef}>
      <div className="nav-inner">
        <Link to="/" className="brand" aria-label="Shipray home">
          <img src="/assets/shipray-logo.svg" alt="Shipray Logistics" />
        </Link>
        <nav className="desktop-links" aria-label="Main navigation">
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setDesktopMenu('products')}
            onMouseLeave={() => setDesktopMenu(null)}
          >
            <button
              className={`nav-trigger ${['/weight-calculator', '/rate-calculator'].includes(pathname) ? 'active' : ''}`}
              type="button"
              aria-expanded={desktopMenu === 'products'}
              aria-controls="products-menu"
              onClick={() => setDesktopMenu('products')}
            >
              Products <ChevronDown />
            </button>
            <div
              id="products-menu"
              className={`nav-dropdown tools-dropdown products-dropdown ${desktopMenu === 'products' ? 'open' : ''}`}
            >
              <div className="dropdown-heading">
                <span>SHIPRAY PRODUCTS</span>
                <strong>Tools that simplify every shipment.</strong>
              </div>
              <div className="tool-dropdown-grid">
                {toolItems.map(({ label, copy, to, icon: Icon }) => (
                  <NavLink className="tool-dropdown-card" key={to} to={to}>
                    <span className="dropdown-option-icon"><Icon /></span>
                    <span><strong>{label}</strong><small>{copy}</small></span>
                    <ArrowRight className="option-arrow" />
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setDesktopMenu('platform')}
            onMouseLeave={() => setDesktopMenu(null)}
          >
            <button
              className={`nav-trigger ${pathname.startsWith('/integrations') ? 'active' : ''}`}
              type="button"
              aria-expanded={desktopMenu === 'platform'}
              aria-controls="platform-menu"
              onClick={() => setDesktopMenu('platform')}
            >
              Platform <ChevronDown />
            </button>
            <div
              id="platform-menu"
              className={`nav-dropdown platform-dropdown ${desktopMenu === 'platform' ? 'open' : ''}`}
            >
              <Link className="dropdown-lead" to="/integrations">
                <span className="dropdown-lead-icon"><PlugZap /></span>
                <div>
                  <small>PLATFORM</small>
                  <strong>Integrations</strong>
                  <p>Bring every order and delivery partner into one workflow.</p>
                </div>
                <ChevronRight className="lead-arrow" />
              </Link>
              <div className="dropdown-options">
                <span className="dropdown-label">Explore integrations</span>
                {platformItems.map(({ label, copy, to, icon: Icon }) => (
                  <NavLink className="dropdown-option" key={to} to={to}>
                    <span className="dropdown-option-icon"><Icon /></span>
                    <span><strong>{label}</strong><small>{copy}</small></span>
                    <ArrowRight className="option-arrow" />
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/rate-calculator">Pricing</NavLink>
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setDesktopMenu('partners')}
            onMouseLeave={() => setDesktopMenu(null)}
          >
            <button
              className={`nav-trigger ${pathname === '/integrations/courier-partners' ? 'active' : ''}`}
              type="button"
              aria-expanded={desktopMenu === 'partners'}
              aria-controls="partners-menu"
              onClick={() => setDesktopMenu('partners')}
            >
              Partners <ChevronDown />
            </button>
            <div
              id="partners-menu"
              className={`nav-dropdown compact-dropdown partners-dropdown ${desktopMenu === 'partners' ? 'open' : ''}`}
            >
              <NavLink className="dropdown-option" to="/integrations/courier-partners">
                <span className="dropdown-option-icon"><Truck /></span>
                <span><strong>Courier Partners</strong><small>Explore the delivery network</small></span>
                <ArrowRight className="option-arrow" />
              </NavLink>
              <NavLink className="dropdown-option" to="/integrations/sales-channels">
                <span className="dropdown-option-icon"><Building2 /></span>
                <span><strong>Channel Partners</strong><small>Connect your commerce stack</small></span>
                <ArrowRight className="option-arrow" />
              </NavLink>
            </div>
          </div>
          <NavLink to="/tracking">Track Order</NavLink>
          <div
            className="nav-dropdown-wrap"
            onMouseEnter={() => setDesktopMenu('resources')}
            onMouseLeave={() => setDesktopMenu(null)}
          >
            <button
              className={`nav-trigger ${pathname === '/blogs' ? 'active' : ''}`}
              type="button"
              aria-expanded={desktopMenu === 'resources'}
              aria-controls="resources-menu"
              onClick={() => setDesktopMenu('resources')}
            >
              Resources <ChevronDown />
            </button>
            <div
              id="resources-menu"
              className={`nav-dropdown compact-dropdown resources-dropdown ${desktopMenu === 'resources' ? 'open' : ''}`}
            >
              <NavLink className="dropdown-option" to="/blogs">
                <span className="dropdown-option-icon"><BookOpen /></span>
                <span><strong>Blogs</strong><small>Shipping guides and insights</small></span>
                <ArrowRight className="option-arrow" />
              </NavLink>
              <NavLink className="dropdown-option" to="/weight-calculator">
                <span className="dropdown-option-icon"><Scale /></span>
                <span><strong>Weight Estimator</strong><small>Find chargeable parcel weight</small></span>
                <ArrowRight className="option-arrow" />
              </NavLink>
            </div>
          </div>
        </nav>
        <div className="nav-actions">
          <Link className="login-button" to="/login">Log In</Link>
          <button
            className="menu-button"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-menu">
          <button className="mobile-group-trigger" type="button" onClick={() => toggleMobileGroup('products')} aria-expanded={mobileGroup === 'products'}>
            Products <ChevronDown />
          </button>
          {mobileGroup === 'products' && (
            <div className="mobile-submenu">
              {toolItems.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to}><Icon /> {label}</NavLink>)}
            </div>
          )}
          <button className="mobile-group-trigger" type="button" onClick={() => toggleMobileGroup('platform')} aria-expanded={mobileGroup === 'platform'}>
            Platform <ChevronDown />
          </button>
          {mobileGroup === 'platform' && (
            <div className="mobile-submenu">
              <span className="mobile-submenu-title">Integrations <ChevronRight /></span>
              {platformItems.map(({ label, to, icon: Icon }) => <NavLink key={to} to={to}><Icon /> {label}</NavLink>)}
            </div>
          )}
          <NavLink to="/rate-calculator">Pricing</NavLink>
          <button className="mobile-group-trigger" type="button" onClick={() => toggleMobileGroup('partners')} aria-expanded={mobileGroup === 'partners'}>
            Partners <ChevronDown />
          </button>
          {mobileGroup === 'partners' && (
            <div className="mobile-submenu">
              <NavLink to="/integrations/courier-partners"><Truck /> Courier Partners</NavLink>
              <NavLink to="/integrations/sales-channels"><Building2 /> Channel Partners</NavLink>
            </div>
          )}
          <NavLink to="/tracking">Track Order</NavLink>
          <button className="mobile-group-trigger" type="button" onClick={() => toggleMobileGroup('resources')} aria-expanded={mobileGroup === 'resources'}>
            Resources <ChevronDown />
          </button>
          {mobileGroup === 'resources' && (
            <div className="mobile-submenu">
              <NavLink to="/blogs"><BookOpen /> Blogs</NavLink>
              <NavLink to="/weight-calculator"><Scale /> Weight Estimator</NavLink>
            </div>
          )}
          <Link className="login-button mobile-login" to="/login">Log In</Link>
        </div>
      )}
    </header>
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

const demoProducts = [
  {
    tab: 'Smart Booking',
    title: 'Book the right courier in minutes',
    copy: 'Enter pickup, delivery and parcel details once. Shipray compares suitable delivery options and keeps the booking workflow clear from start to finish.',
    image: '/assets/shipray-warehouse-operations.jpg',
    imageAlt: 'Shipray warehouse team preparing ecommerce shipments',
    to: '/rate-calculator',
    cta: 'Try rate calculator',
    tone: 'violet',
  },
  {
    tab: 'Shipping',
    title: 'Ship every order from one workspace',
    copy: 'Move domestic parcels through a consistent process with chargeable-weight guidance, route-level estimates and organised shipment milestones.',
    image: '/assets/shipray-hero-courier.jpg',
    imageAlt: 'Courier team packing and processing customer orders',
    to: '/weight-calculator',
    cta: 'Estimate weight',
    tone: 'amber',
  },
  {
    tab: 'Live Tracking',
    title: 'See delivery progress without the guesswork',
    copy: 'Follow shipment events in one readable timeline and identify the latest courier scan before customers need to ask for an update.',
    image: '/assets/shipray-tracking.png',
    imageAlt: 'Shipray live shipment tracking interface',
    to: '/tracking',
    cta: 'Track shipment',
    tone: 'cyan',
  },
]

function LiveDemos() {
  const [activeDemo, setActiveDemo] = useState(0)
  const demo = demoProducts[activeDemo]
  return (
    <section className="live-demos">
      <div className="demo-ambient" />
      <div className="shell">
        <div className="demo-heading">
          <span>SHIPRAY PRODUCT EXPERIENCE</span>
          <h2>Experience smarter shipping<br />through live tools</h2>
        </div>
        <div className="demo-tabs" role="tablist" aria-label="Shipray product demos">
          {demoProducts.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeDemo === index}
              className={activeDemo === index ? 'active' : ''}
              onClick={() => setActiveDemo(index)}
              key={item.tab}
            >
              {item.tab}
            </button>
          ))}
        </div>
        <article className={`demo-stage demo-${demo.tone}`} key={demo.tab}>
          <div className="demo-copy">
            <span className="demo-index">0{activeDemo + 1} / 03</span>
            <h3>{demo.title}</h3>
            <p>{demo.copy}</p>
            <Link className="button primary" to={demo.to}>{demo.cta} <ArrowRight size={17} /></Link>
          </div>
          <div className="demo-media">
            <img src={demo.image} alt={demo.imageAlt} />
            <div className="demo-status">
              <CircleCheck />
              <span><small>Shipray workflow</small><strong>Ready to use</strong></span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

const coreStrengths = [
  {
    metric: '50K+',
    title: 'growing businesses',
    copy: 'Shipping with clearer operations',
    image: '/assets/shipray-warehouse-operations.jpg',
    alt: 'Warehouse operations supporting growing shipping businesses',
  },
  {
    metric: '29,000+',
    title: 'serviceable pin codes',
    copy: 'Domestic reach across India',
    image: '/assets/shipray-hero-courier.jpg',
    alt: 'Courier team processing parcels for nationwide delivery',
  },
  {
    metric: '220+',
    title: 'countries and territories',
    copy: 'Connected cross-border possibilities',
    image: '/assets/shipray-3d-logistics-hero.png',
    alt: 'Connected global Shipray logistics network',
  },
  {
    metric: '100+',
    title: 'courier options',
    copy: 'Flexible partners for every route',
    image: '/assets/shipray-tracking.png',
    alt: 'Courier network and shipment tracking view',
  },
  {
    metric: '99.2%',
    title: 'platform uptime',
    copy: 'Reliable tools when teams need them',
    image: '/assets/shipray-rate-calculator.png',
    alt: 'Shipray shipping rate calculation interface',
  },
]

function CoreStrengths() {
  const trackRef = useRef(null)
  const move = (direction) => {
    const card = trackRef.current?.querySelector('.strength-card')
    if (!trackRef.current || !card) return
    trackRef.current.scrollBy({ left: direction * (card.getBoundingClientRect().width + 28), behavior: 'smooth' })
  }
  return (
    <section className="core-strengths">
      <div className="strength-head">
        <h2>Our Core Strengths</h2>
        <div className="strength-controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous strength"><ChevronLeft /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next strength"><ChevronRight /></button>
        </div>
      </div>
      <div className="strength-track" ref={trackRef}>
        {coreStrengths.map((item) => (
          <article className="strength-card" key={item.metric}>
            <h3><strong>{item.metric}</strong> {item.title}</h3>
            <p>{item.copy}</p>
            <div className="strength-media"><img src={item.image} alt={item.alt} /></div>
          </article>
        ))}
      </div>
    </section>
  )
}

const courierPartners = [
  { name: 'XPRESSBEES', tone: 'orange' },
  { name: 'DELHIVERY', tone: 'black' },
  { name: 'amazon shipping', tone: 'amazon' },
  { name: 'LOADSHARE', tone: 'indigo' },
  { name: 'BLUE DART', tone: 'blue' },
  { name: 'DTDC', tone: 'navy' },
  { name: 'shadowfax', tone: 'coral' },
  { name: 'ECOM EXPRESS', tone: 'plum' },
  { name: 'DOTZOT', tone: 'steel' },
  { name: 'KERRY INDEV', tone: 'royal' },
  { name: 'BORZO', tone: 'electric' },
  { name: 'eKart', tone: 'teal' },
  { name: 'aramex', tone: 'red' },
]

const sellerStories = [
  {
    brand: 'Nayra Naturals',
    mark: 'NAYRA',
    quote: '“Our team now books, tracks and resolves delivery questions from one clear workflow.”',
    copy: 'Shipray helped this fast-growing wellness brand replace scattered courier screens with a consistent dispatch process. The result is quicker handoffs and fewer status follow-ups.',
    metric: '31%',
    metricLabel: 'faster daily dispatch',
    image: '/assets/shipray-warehouse-operations.jpg',
    tone: 'violet',
  },
  {
    brand: 'Urban Loom',
    mark: 'UL',
    quote: '“Route-level choices made our shipping costs easier to predict as order volume grew.”',
    copy: 'With weight guidance and practical courier comparisons, Urban Loom can plan every parcel around speed, serviceability and cost without slowing down fulfilment.',
    metric: '24%',
    metricLabel: 'lower exception rate',
    image: '/assets/shipray-hero-courier.jpg',
    tone: 'amber',
  },
  {
    brand: 'The Willow Co.',
    mark: 'WILLOW',
    quote: '“Customers receive clearer delivery updates and our support queue stays focused.”',
    copy: 'A single milestone view gives the team the latest shipment context before a customer asks, while keeping post-purchase communication calm and consistent.',
    metric: '42%',
    metricLabel: 'fewer tracking queries',
    image: '/assets/shipray-tracking.png',
    tone: 'cyan',
  },
  {
    brand: 'Rooted Earth',
    mark: 'ROOTED',
    quote: '“We can launch into new pin codes without rebuilding our fulfilment process.”',
    copy: 'Shipray gives Rooted Earth a repeatable booking flow that supports wider reach while keeping parcel checks and route decisions easy for the operations team.',
    metric: '18K+',
    metricLabel: 'pin codes explored',
    image: '/assets/shipray-3d-logistics-hero.png',
    tone: 'lime',
  },
  {
    brand: 'Atelier Nine',
    mark: 'A9',
    quote: '“The same small team now handles more orders with far better visibility.”',
    copy: 'Organised shipment milestones and quick rate estimates let Atelier Nine spend less time reconciling tools and more time improving the customer experience.',
    metric: '2.3×',
    metricLabel: 'orders handled per day',
    image: '/assets/shipray-rate-calculator.png',
    tone: 'pink',
  },
]

function SellerStories() {
  const [activeStory, setActiveStory] = useState(0)
  const story = sellerStories[activeStory]
  const marqueePartners = [...courierPartners, ...courierPartners]
  const reversePartners = [...courierPartners.slice(6), ...courierPartners.slice(0, 6), ...courierPartners]

  return (
    <section className="seller-stories">
      <div className="partner-cloud" aria-label="Courier partners available through Shipray">
        <div className="partner-row">
          {marqueePartners.map((partner, index) => (
            <div className={`partner-logo partner-${partner.tone}`} key={`top-${partner.name}-${index}`}>
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
        <div className="partner-row partner-row-reverse">
          {reversePartners.map((partner, index) => (
            <div className={`partner-logo partner-${partner.tone}`} key={`bottom-${partner.name}-${index}`}>
              <span>{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="shell seller-shell">
        <span className="section-label">SELLER SUCCESS</span>
        <h2>Stories from growing sellers</h2>
        <div className="seller-tabs" role="tablist" aria-label="Seller stories">
          {sellerStories.map((item, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeStory === index}
              className={activeStory === index ? 'active' : ''}
              onClick={() => setActiveStory(index)}
              key={item.brand}
            >
              {item.brand}
            </button>
          ))}
        </div>

        <article className={`seller-story-card story-${story.tone}`} key={story.brand}>
          <div className="seller-story-copy">
            <span className="seller-mark">{story.mark}</span>
            <blockquote>{story.quote}</blockquote>
            <p>{story.copy}</p>
            <div className="seller-result">
              <strong>{story.metric}</strong>
              <span>{story.metricLabel}</span>
            </div>
          </div>
          <div className="seller-story-visual">
            <img src={story.image} alt={`${story.brand} shipping workflow with Shipray`} />
            <div className="story-status">
              <CircleCheck />
              <span><small>Shipray impact</small><strong>Operations moving smoothly</strong></span>
            </div>
            <div className="story-order-card">
              <small>Today’s dispatch</small>
              <strong>Ready for pickup</strong>
              <span><i /> 148 orders processed</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

const servicesPortfolio = [
  {
    title: 'Domestic Delivery',
    copy: 'Reach customers across India through one organised shipping flow. Compare suitable courier options, create orders in fewer steps and keep tracking updates easy to understand.',
    image: '/assets/shipray-hero-courier.jpg',
    alt: 'Shipray courier team preparing domestic deliveries',
    metric: '29,000+',
    metricLabel: 'serviceable pin codes',
    to: '/rate-calculator',
    cta: 'Plan a domestic shipment',
    icon: Truck,
    kind: 'photo',
  },
  {
    title: 'Fulfilment Network',
    copy: 'Keep inventory, packing and dispatch moving as one connected operation. Shipray gives growing teams a clearer path from a confirmed order to a pickup-ready parcel.',
    image: '/assets/shipray-warehouse-operations.jpg',
    alt: 'Warehouse operations supporting Shipray fulfilment',
    metric: 'One flow',
    metricLabel: 'from shelf to shipment',
    to: '/integrations',
    cta: 'Explore fulfilment tools',
    icon: Warehouse,
    kind: 'photo',
  },
  {
    title: 'Quick Local Movement',
    copy: 'Handle urgent city deliveries with a focused booking experience designed for short routes. Enter parcel details once, review the estimate and keep every local handoff visible.',
    image: '/assets/shipray-3d-logistics-hero.png',
    alt: 'Connected Shipray local delivery network',
    metric: 'Same day',
    metricLabel: 'local delivery planning',
    to: '/rate-calculator',
    cta: 'Estimate a local route',
    icon: LocateFixed,
    kind: 'illustration',
  },
  {
    title: 'Cross-Border Growth',
    copy: 'Build a repeatable export workflow with route guidance, shipment visibility and support for international expansion. Move from the first overseas order to wider global reach with confidence.',
    image: '/assets/shipray-hero-courier.png',
    alt: 'Shipray international courier delivery',
    metric: '220+',
    metricLabel: 'countries and territories',
    to: '/integrations/courier-partners',
    cta: 'Explore global shipping',
    icon: Globe2,
    kind: 'illustration',
  },
  {
    title: 'Smooth Checkout',
    copy: 'Give shoppers a faster path from cart to confirmed order. Clear delivery choices and fewer unnecessary steps help brands build a calmer, more dependable buying experience.',
    image: '/assets/shipray-rate-calculator.png',
    alt: 'Shipray rate and delivery choice interface',
    metric: 'Fewer steps',
    metricLabel: 'from cart to confirmation',
    to: '/rate-calculator',
    cta: 'Try the rate experience',
    icon: ShoppingBag,
    kind: 'ui',
  },
  {
    title: 'Seller Connect',
    copy: 'Keep customers informed with useful shipment context at the right moment. A readable tracking journey helps support teams answer questions quickly and keeps buyers engaged after checkout.',
    image: '/assets/shipray-tracking.png',
    alt: 'Shipray customer shipment tracking interface',
    metric: 'Live status',
    metricLabel: 'through every milestone',
    to: '/tracking',
    cta: 'See live tracking',
    icon: Mail,
    kind: 'ui',
  },
]

function ServicesPortfolio() {
  return (
    <section className="services-portfolio">
      <div className="shell">
        <div className="portfolio-heading">
          <span className="section-label">THE SHIPRAY PORTFOLIO</span>
          <h2>Our Services<br /><span>&amp; Solutions Portfolio</span></h2>
          <p>Practical logistics capabilities for every stage of a growing commerce journey.</p>
        </div>

        <div className="portfolio-list">
          {servicesPortfolio.map((service, index) => {
            const Icon = service.icon
            return (
              <article className={`portfolio-row ${index % 2 ? 'portfolio-reverse' : ''}`} key={service.title}>
                <div className="portfolio-copy">
                  <span className="portfolio-index">0{index + 1}</span>
                  <span className="portfolio-icon"><Icon /></span>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                  <Link to={service.to}>{service.cta} <ArrowRight /></Link>
                </div>
                <div className={`portfolio-visual visual-${service.kind}`}>
                  <div className="portfolio-grid-lines" />
                  <img src={service.image} alt={service.alt} />
                  <div className="portfolio-metric">
                    <small>Shipray advantage</small>
                    <strong>{service.metric}</strong>
                    <span>{service.metricLabel}</span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Home() {
  return <><Hero /><TrustRail /><RollingCards /><LiveDemos /><CoreStrengths /><SellerStories /><ServicesPortfolio /><Solutions /><Stats /><BusinessTypes /><DeveloperBand /><FinalCta /></>
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

const explorePages = {
  integrations: {
    eyebrow: 'SHIPRAY PLATFORM',
    title: 'Connect your commerce stack to one shipping workflow.',
    copy: 'Sync orders from the places you sell and fulfil them through the courier network that fits each shipment.',
    icon: PlugZap,
    cards: [
      ['Sales Channels', 'Bring storefront and marketplace orders into one organised dispatch queue.', ShoppingBag, '/integrations/sales-channels', 'Explore channels'],
      ['Courier Partners', 'Compare serviceability, speed and pricing across a flexible delivery network.', Truck, '/integrations/courier-partners', 'Explore couriers'],
    ],
  },
  salesChannels: {
    eyebrow: 'SALES CHANNEL INTEGRATIONS',
    title: 'All your orders. One place to ship.',
    copy: 'Connect the channels your customers already use, reduce repetitive order entry and keep fulfilment status aligned.',
    icon: ShoppingBag,
    cards: [
      ['Online storefronts', 'Connect popular hosted storefronts and pull ready-to-ship orders into Shipray.', Store],
      ['Marketplaces', 'Organise multi-marketplace orders without switching between separate seller panels.', ShoppingBag],
      ['Social commerce', 'Turn social and conversational orders into a consistent shipping workflow.', Globe2],
      ['Custom websites', 'Connect a custom checkout or order system through secure APIs and webhooks.', Code2],
      ['OMS and ERP', 'Keep order, inventory and shipment events aligned with your operations stack.', Warehouse],
      ['Status synchronisation', 'Send AWB, pickup and delivery milestones back to the originating channel.', RefreshCcw],
    ],
  },
  courierPartners: {
    eyebrow: 'COURIER PARTNER NETWORK',
    title: 'Choose the right delivery partner for every parcel.',
    copy: 'Use route, shipment and service-level signals to select a courier without being locked into a single network.',
    icon: Truck,
    cards: [
      ['Express delivery', 'Prioritise faster movement for time-sensitive business and customer orders.', Zap],
      ['Surface shipping', 'Balance cost and transit time for regular domestic parcel movement.', Truck],
      ['Air cargo', 'Move urgent and long-distance shipments through air-enabled services.', Plane],
      ['Wide serviceability', 'Reach metro, tier 2, tier 3 and remote delivery locations across India.', MapPin],
      ['Shipment security', 'Use scan-led milestones and consistent handover processes for better control.', ShieldCheck],
      ['Exception visibility', 'Identify stuck pickups and delayed movement while there is still time to act.', PackageSearch],
    ],
  },
  blogs: {
    eyebrow: 'SHIPRAY RESOURCES',
    title: 'Practical ideas for faster, clearer shipping.',
    copy: 'Guides for ecommerce teams that want to control delivery costs, choose couriers confidently and improve customer experience.',
    icon: BookOpen,
    cards: [
      ['How to calculate volumetric weight correctly', 'Understand why parcel dimensions affect shipping charges and avoid billing surprises.', Scale, null, '6 min read'],
      ['A better way to compare courier partners', 'Evaluate serviceability, delivery speed, support and total cost before choosing a carrier.', Truck, null, '8 min read'],
      ['Shipping rate calculation for growing stores', 'Learn which shipment details matter when estimating domestic courier charges.', BadgeIndianRupee, null, '7 min read'],
      ['Reduce failed deliveries with clearer tracking', 'Use useful milestone updates to keep customers informed before delivery day.', LocateFixed, null, '5 min read'],
      ['Preparing ecommerce orders for dispatch', 'Build a repeatable packing and handover checklist for busy fulfilment teams.', Box, null, '6 min read'],
      ['When to use surface shipping or air shipping', 'Compare cost, distance and urgency to select the right transport mode.', Plane, null, '7 min read'],
    ],
  },
}

function ExplorePage({ type }) {
  const data = explorePages[type]
  const Icon = data.icon
  return (
    <>
      <section className="explore-hero">
        <div className="explore-glow" />
        <div className="shell explore-hero-grid">
          <div>
            <span className="eyebrow"><Icon size={17} /> {data.eyebrow}</span>
            <h1>{data.title}</h1>
            <p>{data.copy}</p>
            <div className="hero-actions">
              <Link className="button primary" to="/rate-calculator">Calculate shipping rate <ArrowRight size={17} /></Link>
              <Link className="button ghost" to="/tracking">Track a shipment</Link>
            </div>
          </div>
          <div className="explore-visual" aria-hidden="true">
            <div className="integration-orbit orbit-one" />
            <div className="integration-orbit orbit-two" />
            <span className="integration-core"><Icon /></span>
            <span className="integration-node node-store"><Store /></span>
            <span className="integration-node node-truck"><Truck /></span>
            <span className="integration-node node-box"><Box /></span>
            <span className="integration-node node-route"><Route /></span>
          </div>
        </div>
      </section>
      <section className={`explore-content ${type === 'integrations' ? 'compact-catalogue' : ''}`}>
        <div className="shell">
          <div className="explore-section-head">
            <span>{type === 'blogs' ? 'LATEST GUIDES' : 'BUILT FOR CONNECTED COMMERCE'}</span>
            <h2>{type === 'blogs' ? 'Make every shipping decision count.' : 'Everything stays connected as you grow.'}</h2>
          </div>
          <div className="explore-card-grid">
            {data.cards.map(([title, copy, CardIcon, to, meta]) => {
              const cardContent = (
                <>
                  <span className="explore-card-icon"><CardIcon /></span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                  <span className="explore-card-action">{meta || (to ? 'Explore' : 'Shipray capability')} {to && <ArrowRight size={15} />}</span>
                </>
              )
              return to
                ? <Link className="explore-card" key={title} to={to}>{cardContent}</Link>
                : <article className="explore-card" key={title}>{cardContent}</article>
            })}
          </div>
        </div>
      </section>
      <FinalCta />
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
          <RouterRoute path="/integrations" element={<ExplorePage type="integrations" />} />
          <RouterRoute path="/integrations/sales-channels" element={<ExplorePage type="salesChannels" />} />
          <RouterRoute path="/integrations/courier-partners" element={<ExplorePage type="courierPartners" />} />
          <RouterRoute path="/weight-calculator" element={<WeightCalculator />} />
          <RouterRoute path="/rate-calculator" element={<RateCalculator />} />
          <RouterRoute path="/blogs" element={<ExplorePage type="blogs" />} />
          <RouterRoute path="/tracking" element={<Tracking />} />
          <RouterRoute path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
