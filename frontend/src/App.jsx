import { useMemo, useState } from 'react'
import {
  ArrowRight, BarChart3, BedDouble, Building2, Check, ChevronDown,
  Home, MapPin, Menu, ShieldCheck, Sparkles, TrendingUp, X, Zap,
} from 'lucide-react'
import './App.css'

const propertyTypes = { Detached: 1.35, 'Semi-detached': 1.1, Terraced: 0.92, Flat: 0.72 }
const regions = { London: 2.15, 'South East': 1.35, 'South West': 1.08, Midlands: 0.82, 'North West': 0.74, 'North East': 0.62 }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [propertyType, setPropertyType] = useState('Semi-detached')
  const [region, setRegion] = useState('South East')
  const [bedrooms, setBedrooms] = useState(3)
  const [area, setArea] = useState(1100)

  const estimate = useMemo(() => {
    const value = (210000 + bedrooms * 27000 + Math.max(0, area - 650) * 145) * propertyTypes[propertyType] * regions[region]
    return Math.round(value / 1000) * 1000
  }, [propertyType, region, bedrooms, area])

  const formatPrice = (value) => new Intl.NumberFormat('en-GB', {
    style: 'currency', currency: 'GBP', maximumFractionDigits: 0,
  }).format(value)

  const scrollToEstimator = () => document.getElementById('estimate')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <main>
      <nav className="navbar" aria-label="Main navigation">
        <div className="container nav-inner">
          <a className="brand" href="#top" aria-label="NestWorth home">
            <span className="brand-mark"><Home size={20} strokeWidth={2.5} /></span>
            <span>Nest<span>Worth</span></span>
          </a>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
            <a href="#insights" onClick={() => setMenuOpen(false)}>Market insights</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <button className="nav-cta" onClick={scrollToEstimator}>Value my home</button>
          </div>
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <section className="hero-section" id="top">
        <div className="hero-glow" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} /> AI-powered UK property insights</div>
            <h1>Know what your home is <em>really worth.</em></h1>
            <p className="hero-lead">Get a fast, data-driven property valuation built from UK market trends, location data and the details that make your home unique.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={scrollToEstimator}>Get your free estimate <ArrowRight size={18} /></button>
              <a className="text-link" href="#how-it-works">See how it works <ChevronDown size={16} /></a>
            </div>
            <div className="trust-row">
              <div className="avatars" aria-hidden="true"><span>JM</span><span>SK</span><span>AT</span></div>
              <div><strong>Trusted by 12,000+ homeowners</strong><small>Free, instant and no obligation</small></div>
            </div>
          </div>
          <div className="visual-wrap">
            <div className="image-card"><img src="/hero_uk_property.jpg" alt="A modern UK family home" /><div className="image-overlay" /></div>
            <div className="floating-card price-card"><span>Estimated value</span><strong>£428,500</strong><small><TrendingUp size={14} /> 4.8% this year</small></div>
            <div className="floating-card accuracy-card"><span className="accuracy-icon"><BarChart3 size={19} /></span><div><strong>94.7%</strong><small>Model accuracy</small></div></div>
            <span className="dots-pattern" aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="stats-strip" aria-label="Platform statistics">
        <div className="container stats-grid">
          <div><strong>2.4M+</strong><span>UK properties analysed</span></div>
          <div><strong>94.7%</strong><span>Prediction accuracy</span></div>
          <div><strong>250+</strong><span>Data points considered</span></div>
          <div><strong>60 sec</strong><span>To get your estimate</span></div>
        </div>
      </section>

      <section className="estimate-section" id="estimate">
        <div className="container estimate-grid">
          <div className="section-copy">
            <span className="section-kicker">Try it now</span>
            <h2>Your property estimate, in under a minute.</h2>
            <p>Tell us a few details and our model will calculate an indicative market value based on recent UK property data.</p>
            <ul className="benefit-list">
              <li><span><Check size={16} /></span>No sign-up required</li>
              <li><span><Check size={16} /></span>Updated market data</li>
              <li><span><Check size={16} /></span>Private and secure</li>
            </ul>
          </div>
          <div className="estimator-card">
            <div className="estimator-heading">
              <div><span className="tiny-label">Property valuation</span><h3>Tell us about your home</h3></div>
              <span className="step-pill">Quick estimate</span>
            </div>
            <div className="form-grid">
              <label>Property type<span className="input-wrap"><Building2 size={17} /><select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>{Object.keys(propertyTypes).map((type) => <option key={type}>{type}</option>)}</select><ChevronDown size={16} /></span></label>
              <label>Region<span className="input-wrap"><MapPin size={17} /><select value={region} onChange={(e) => setRegion(e.target.value)}>{Object.keys(regions).map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={16} /></span></label>
              <label>Bedrooms<span className="input-wrap"><BedDouble size={17} /><select value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value))}>{[1, 2, 3, 4, 5, 6].map((count) => <option key={count} value={count}>{count} bedroom{count > 1 ? 's' : ''}</option>)}</select><ChevronDown size={16} /></span></label>
              <label>Floor area<span className="input-wrap"><Home size={17} /><input type="number" min="300" max="10000" value={area} onChange={(e) => setArea(Number(e.target.value))} /><small>sq ft</small></span></label>
            </div>
            <button className="button button-primary estimate-button"><Zap size={18} fill="currentColor" /> Calculate my estimate</button>
            <div className="result-panel" aria-live="polite">
              <div><span>Your estimated property value</span><strong>{formatPrice(estimate)}</strong></div>
              <span className="confidence"><TrendingUp size={15} /> High confidence</span>
              <div className="range-bar"><span /></div>
              <small>Likely range: {formatPrice(estimate * 0.94)} – {formatPrice(estimate * 1.06)}</small>
            </div>
            <p className="privacy-note"><ShieldCheck size={14} /> Your details are never stored or shared.</p>
          </div>
        </div>
      </section>

      <section className="process-section" id="how-it-works">
        <div className="container">
          <div className="section-heading"><span className="section-kicker">Simple by design</span><h2>From details to valuation in three steps.</h2><p>No estate agent visits, no paperwork and no waiting around.</p></div>
          <div className="process-grid">
            <article><span className="step-number">01</span><div className="feature-icon"><Home /></div><h3>Describe your property</h3><p>Share the essentials, including property type, location, size and bedrooms.</p></article>
            <article><span className="step-number">02</span><div className="feature-icon"><BarChart3 /></div><h3>We analyse the market</h3><p>Our model compares your home with millions of UK property records and current trends.</p></article>
            <article><span className="step-number">03</span><div className="feature-icon"><TrendingUp /></div><h3>Get your estimate</h3><p>Receive a clear valuation range and confidence score in less than a minute.</p></article>
          </div>
        </div>
      </section>

      <section className="insights-section" id="insights">
        <div className="container insight-card">
          <div><span className="section-kicker light">Smarter decisions start here</span><h2>Take the guesswork out of your next move.</h2><p>Whether you are thinking of selling, remortgaging or simply curious, get the clarity you need to move with confidence.</p><button className="button button-light" onClick={scrollToEstimator}>Check my property value <ArrowRight size={18} /></button></div>
          <div className="insight-visual"><div className="mini-chart"><div className="chart-head"><div><small>Average property value</small><strong>£312,640</strong></div><span>+3.2%</span></div><div className="chart-bars" aria-label="Illustrative rising property price chart">{[38,48,43,59,55,71,67,82,78,94].map((height,index) => <i key={index} style={{ height: `${height}%` }} />)}</div><div className="chart-labels"><span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span></div></div></div>
        </div>
      </section>

      <footer id="about">
        <div className="container footer-grid">
          <div><a className="brand footer-brand" href="#top"><span className="brand-mark"><Home size={20} /></span><span>Nest<span>Worth</span></span></a><p>Clear, confident UK property estimates powered by smarter data.</p></div>
          <div><strong>Product</strong><a href="#estimate">Valuation</a><a href="#how-it-works">How it works</a><a href="#insights">Market insights</a></div>
          <div><strong>Company</strong><a href="#about">About us</a><a href="#about">Contact</a><a href="#about">Privacy</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2026 NestWorth. All rights reserved.</span><span>Estimates are for guidance only.</span></div>
      </footer>
    </main>
  )
}

export default App
