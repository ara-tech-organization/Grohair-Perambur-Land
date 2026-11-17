import { useEffect, useRef, useState } from 'react'
import {
  Phone, ArrowRight, ChevronDown, CheckCircle2, Navigation, CalendarDays,
  Menu, X, Loader2, Send, MapPin, Search, Stethoscope, Sparkles, Layers,
  UserCheck, ClipboardList, CalendarCheck, Mail, Check, Star, Quote,
  MoveHorizontal, ScanFace, Sprout, Scissors,
} from 'lucide-react'
import logo from './assets/logo.png'
import {
  PHONE, PHONE_DISPLAY, EMAIL, ADDRESS_LINES, MAPS_URL, nav, trust, concernOptions, concerns,
  treatments, whyUs, transplantData, gfcData, steps, faqs, results, reviews,
} from './content'

/* ---------- helpers ---------- */
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

// Stub: wire to the CMS / API endpoint.
async function submitLead(data) {
  await new Promise((r) => setTimeout(r, 900))
  console.info('Lead submitted', data)
  return true
}

function Cta({ href = '#book', children, variant = 'primary', icon: Icon = ArrowRight, ...rest }) {
  return (
    <a href={href} className={`btn btn-${variant}`} {...rest}>
      <span>{children}</span>
      <Icon size={18} aria-hidden="true" className="btn-ic" />
    </a>
  )
}

function SectionHead({ title, text, center }) {
  return (
    <Reveal className={`sec-head ${center ? 'center' : ''}`}>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  )
}

/* ---------- custom dropdown ---------- */
function Dropdown({ id, value, onChange, options, placeholder = 'Select' }) {
  const [open, setOpen] = useState(false)
  const [hi, setHi] = useState(-1)
  const [up, setUp] = useState(false)
  const wrap = useRef(null)
  const btn = useRef(null)

  useEffect(() => {
    if (!open) return
    const off = (e) => { if (wrap.current && !wrap.current.contains(e.target)) setOpen(false) }
    document.addEventListener('pointerdown', off)
    return () => document.removeEventListener('pointerdown', off)
  }, [open])

  const openList = () => {
    const r = btn.current.getBoundingClientRect()
    setUp(window.innerHeight - r.bottom < 300 && r.top > 300)
    setHi(Math.max(0, options.indexOf(value)))
    setOpen(true)
  }
  const pick = (o) => {
    onChange(o)
    setOpen(false)
    btn.current.focus()
  }
  const onKey = (e) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openList() }
      return
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => (h + 1) % options.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => (h - 1 + options.length) % options.length) }
    else if (e.key === 'Home') { e.preventDefault(); setHi(0) }
    else if (e.key === 'End') { e.preventDefault(); setHi(options.length - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (hi >= 0) pick(options[hi]) }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false) }
    else if (e.key === 'Tab') setOpen(false)
  }

  return (
    <div className={`dd ${open ? 'open' : ''} ${up ? 'up' : ''}`} ref={wrap}>
      <button
        type="button" id={id} ref={btn} className={`dd-btn ${value ? '' : 'ph'}`}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={`${id}-list`}
        onClick={() => (open ? setOpen(false) : openList())} onKeyDown={onKey}
      >
        <span>{value || placeholder}</span>
        <ChevronDown size={18} aria-hidden="true" />
      </button>
      <ul className="dd-list" id={`${id}-list`} role="listbox" aria-activedescendant={hi >= 0 ? `${id}-o${hi}` : undefined}>
        {options.map((o, i) => (
          <li
            key={o} id={`${id}-o${i}`} role="option" aria-selected={o === value}
            className={`${i === hi ? 'hi' : ''} ${o === value ? 'sel' : ''}`}
            onMouseEnter={() => setHi(i)} onClick={() => pick(o)}
          >
            <span>{o}</span>
            {o === value && <Check size={16} aria-hidden="true" />}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------- lead form ---------- */
function LeadForm({ id, heading, text, button, dark, optionalDate = true }) {
  const [vals, setVals] = useState({ name: '', mobile: '', concern: '', date: '' })
  const [errs, setErrs] = useState({})
  const [state, setState] = useState('idle')

  const set = (k) => (e) => setVals((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (vals.name.trim().length < 2) e.name = 'Please enter your full name'
    if (!/^[6-9]\d{9}$/.test(vals.mobile.replace(/\s|-/g, '').replace(/^(\+91|0)/, '')))
      e.mobile = 'Enter a valid 10-digit mobile number'
    if (!vals.concern) e.concern = 'Please select your hair concern'
    return e
  }

  const onSubmit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrs(e)
    if (Object.keys(e).length) return
    setState('loading')
    await submitLead(vals)
    setState('done')
  }

  const today = new Date().toISOString().split('T')[0]

  return (
    <form className={`lead ${dark ? 'lead-dark' : ''}`} onSubmit={onSubmit} noValidate id={id}>
      {state === 'done' ? (
        <div className="lead-done">
          <CheckCircle2 size={48} aria-hidden="true" />
          <h3>Thank you</h3>
          <p>Your request has been received. Our team will contact you shortly to schedule your consultation.</p>
        </div>
      ) : (
        <>
          {heading && <h3>{heading}</h3>}
          {text && <p className="lead-sub">{text}</p>}
          <div className={`field ${errs.name ? 'bad' : ''}`}>
            <label htmlFor={`${id}-name`}>Full Name</label>
            <input id={`${id}-name`} value={vals.name} onChange={set('name')} autoComplete="name" placeholder="Enter your full name" />
            {errs.name && <small>{errs.name}</small>}
          </div>
          <div className={`field ${errs.mobile ? 'bad' : ''}`}>
            <label htmlFor={`${id}-mobile`}>Mobile Number</label>
            <input id={`${id}-mobile`} type="tel" inputMode="numeric" value={vals.mobile} onChange={set('mobile')} autoComplete="tel" placeholder="10-digit mobile number" />
            {errs.mobile && <small>{errs.mobile}</small>}
          </div>
          <div className={`field ${errs.concern ? 'bad' : ''}`}>
            <label htmlFor={`${id}-concern`}>{id === 'final-form' ? 'Hair Concern' : 'Select Your Hair Concern'}</label>
            <Dropdown id={`${id}-concern`} value={vals.concern} onChange={(v) => setVals((x) => ({ ...x, concern: v }))} options={concernOptions} placeholder="Select your hair concern" />
            {errs.concern && <small>{errs.concern}</small>}
          </div>
          <div className="field">
            <label htmlFor={`${id}-date`}>Preferred Appointment Date{optionalDate ? ' (Optional)' : ''}</label>
            <input id={`${id}-date`} type="date" min={today} value={vals.date} onChange={set('date')} />
          </div>
          <button className="btn btn-primary btn-block" type="submit" disabled={state === 'loading'}>
            {state === 'loading' ? <Loader2 size={18} className="spin" aria-hidden="true" /> : <Send size={18} aria-hidden="true" />}
            <span>{state === 'loading' ? 'SENDING' : button}</span>
          </button>
          {text && <p className="disclaimer">By submitting this form, you agree to be contacted by our team regarding your enquiry.</p>}
        </>
      )}
    </form>
  )
}

/* ---------- scroll spy + deep links ---------- */
const BASE = import.meta.env.BASE_URL // e.g. '/Grohair-Perambur-Land/'
const SECTION_IDS = ['top', 'about', 'concerns', 'treatments', 'why-us', 'hair-transplant', 'gfc', 'process', 'location', 'results', 'faq', 'appointment']
const NAV_OF = { 'hair-transplant': 'treatments', gfc: 'treatments' }

function useScrollSpy() {
  const [active, setActive] = useState('top')

  useEffect(() => {
    let current = ''
    let ready = false
    let ticking = false

    const compute = () => {
      ticking = false
      const line = 140
      let id = SECTION_IDS[0]
      for (const sid of SECTION_IDS) {
        const el = document.getElementById(sid)
        if (el && el.getBoundingClientRect().top <= line) id = sid
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) id = SECTION_IDS[SECTION_IDS.length - 1]
      if (id === current) return
      current = id
      setActive(id)
      if (ready) {
        const url = BASE + (id === 'top' ? '' : id) + window.location.search
        window.history.replaceState(null, '', url)
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(compute)
      }
    }

    // Deep link: open straight onto the section, then glide to it
    const hash = decodeURIComponent(window.location.pathname.slice(BASE.length - 1).replace(/^\/+|\/+$/g, '') || window.location.hash.slice(1))
    const target = hash && document.getElementById(hash)
    let timer
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (target) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      timer = setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        setTimeout(() => { ready = true; compute() }, 1200)
      }, 350)
    } else {
      ready = true
    }
    // in-page links: smooth scroll, URL is then kept in sync by the scroll spy
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a[href^="#"]')
      if (!a) return
      const el = document.getElementById(a.getAttribute('href').slice(1))
      if (!el) return
      e.preventDefault()
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    document.addEventListener('click', onClick)
    compute()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      clearTimeout(timer)
      document.removeEventListener('click', onClick)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return NAV_OF[active] || active
}

/* ---------- header ---------- */
function Header() {
  const active = useScrollSpy()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <header className={`hdr ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap hdr-in">
        <a href="#top" className="brand" aria-label="Advanced GroHair Perambur">
          <img src={logo} alt="Advanced GroHair and GloSkin" />
        </a>
        <nav className={`nav ${open ? 'open' : ''}`} aria-label="Primary">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={active === n.href.slice(1) ? 'active' : ''}
              aria-current={active === n.href.slice(1) ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hdr-act">
          <a href={`tel:${PHONE}`} className="btn btn-primary btn-sm">
            <Phone size={16} aria-hidden="true" /><span>Call Now</span>
          </a>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  )
}

/* ---------- sections ---------- */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="blob b1" /><div className="blob b2" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <h1 className="rise" style={{ '--d': '100ms' }}>
            Hair Treatment in Chennai – <em>Personalised Hair Restoration</em> Solutions
          </h1>
          <p className="lead-p rise" style={{ '--d': '200ms' }}>
            Experiencing hair fall, thinning hair or baldness? Explore personalised hair treatment and hair restoration options at Advanced GroHair, Perambur.
          </p>
          <ul className="chips">
            {trust.map(({ icon: Icon, text }, i) => (
              <li key={text} className="rise" style={{ '--d': `${300 + i * 80}ms` }}>
                <Icon size={18} aria-hidden="true" /><span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="rise" style={{ '--d': '650ms' }}>
            <Cta href="#book">Book Your Hair Consultation</Cta>
          </div>
        </div>
        <div className="hero-form rise" style={{ '--d': '250ms' }} id="book">
          <LeadForm
            id="hero-form"
            heading="Book Your Hair Consultation"
            text="Share your hair concern and our team will help you schedule a consultation."
            button="BOOK MY CONSULTATION"
          />
        </div>
      </div>
    </section>
  )
}

function Intro() {
  const rows = [
    { icon: Search, text: 'Hair fall, thinning hair and changes in hair density can have different underlying causes. Finding the right approach starts with understanding your hair and scalp condition.' },
    { icon: Stethoscope, text: 'At Advanced GroHair, Perambur, we offer hair treatment and hair restoration options based on individual concerns and consultation findings.' },
    { icon: Sparkles, text: 'Whether you are exploring hair fall treatment, hair regrowth options, GFC treatment or hair transplant, our team can help you understand the available options.' },
  ]
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <Reveal className="intro">
          <div className="intro-l">
            <h2>Looking for Hair Treatment in Perambur, Chennai?</h2>
            <Cta href="#book" variant="light">Schedule Your Hair Consultation</Cta>
          </div>
          <ol className="intro-r">
            {rows.map(({ icon: Icon, text }, i) => (
              <Reveal as="li" key={i} delay={150 + i * 120}>
                <span className="ic"><Icon size={24} aria-hidden="true" /></span>
                <p>{text}</p>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

function Concerns() {
  return (
    <section className="sec tint" id="concerns">
      <div className="wrap">
        <SectionHead center title="Find the Right Approach for Your Hair Concern" />
        <div className="grid g3">
          {concerns.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 80} className="card">
              <span className="ic"><Icon size={26} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="center-cta"><Cta href="#book">Discuss Your Hair Concern</Cta></Reveal>
      </div>
    </section>
  )
}

function Treatments() {
  return (
    <section className="sec" id="treatments">
      <div className="wrap">
        <SectionHead center title="Hair Treatment Options at Advanced GroHair" text="Explore different hair treatment and hair restoration options available at our Perambur clinic." />
        <div className="grid g3">
          {treatments.map(({ icon: Icon, title, text, cta }, i) => (
            <Reveal key={title} delay={(i % 3) * 90} className="card tcard">
              <span className="ic"><Icon size={26} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#book" className="link">{cta}<ArrowRight size={16} aria-hidden="true" /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUs() {
  const icons = [Stethoscope, Layers, UserCheck, ClipboardList, MapPin, CalendarCheck]
  return (
    <section className="sec why" id="why-us">
      <div className="blob b3" /><div className="blob b2" />
      <div className="wrap why-in">
        <div className="why-l">
          <SectionHead title="Your Hair Restoration Journey Starts with the Right Consultation" text="At Advanced GroHair, our approach begins with understanding your hair concerns and exploring appropriate treatment options." />
          <Reveal delay={150}><Cta href="#book" variant="light">Book an Appointment</Cta></Reveal>
        </div>
        <ul className="why-grid">
          {whyUs.map((t, i) => {
            const Icon = icons[i]
            return (
              <Reveal as="li" key={t} delay={i * 80} className="why-card">
                <span className="ic"><Icon size={24} aria-hidden="true" /></span>
                <span>{t}</span>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function ConsultBlock({ id, tint, data, flip }) {
  return (
    <section className={`sec cb ${tint ? 'tint' : 'cb-fade'}`} id={id}>
      <div className="blob b1" /><div className="blob b2" />
      <div className="wrap">
        <Reveal className="cb-head">
          <h2>{data.title}</h2>
          <p>{data.intro}</p>
        </Reveal>
        <div className={`cb-grid ${flip ? 'flip' : ''}`}>
          <Reveal delay={100} className="cb-card cb-light">
            <h3>Common Hair Concerns</h3>
            <ul>
              {data.concerns.map((t, i) => {
                const Icon = data.concernIcons[i]
                return (
                  <Reveal as="li" key={t} delay={200 + i * 80}>
                    <span className="ic"><Icon size={22} aria-hidden="true" /></span>
                    <span>{t}</span>
                  </Reveal>
                )
              })}
            </ul>
          </Reveal>
          <Reveal delay={200} className="cb-card cb-red">
            <h3>During Consultation, Understand</h3>
            <ul>
              {data.understand.map((t, i) => {
                const Icon = data.understandIcons[i]
                return (
                  <Reveal as="li" key={t} delay={300 + i * 80}>
                    <Icon size={22} aria-hidden="true" />
                    <span>{t}</span>
                  </Reveal>
                )
              })}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={200} className="center-cta"><Cta href="#book">{data.cta}</Cta></Reveal>
      </div>
    </section>
  )
}

function Transplant() {
  return <ConsultBlock id="hair-transplant" tint data={transplantData} />
}

function Gfc() {
  const d = gfcData
  return (
    <section className="sec gx" id="gfc">
      <div className="blob b1" /><div className="blob b2" />
      <div className="wrap gx-grid">
        <Reveal className="gx-left">
          <h2>{d.title}</h2>
          <p>{d.intro}</p>
          <h3 className="gx-sub">Common Hair Concerns</h3>
          <ul className="gx-chips">
            {d.concerns.map((t, i) => {
              const Icon = d.concernIcons[i]
              return (
                <Reveal as="li" key={t} delay={150 + i * 80}>
                  <Icon size={18} aria-hidden="true" /><span>{t}</span>
                </Reveal>
              )
            })}
          </ul>
          <Cta href="#book">{d.cta}</Cta>
        </Reveal>
        <Reveal delay={150} className="gx-right">
          <h3>During Consultation, Understand</h3>
          <ol className="gx-line">
            {d.understand.map((t, i) => {
              const Icon = d.understandIcons[i]
              return (
                <Reveal as="li" key={t} delay={250 + i * 110}>
                  <span className="gx-node"><Icon size={22} aria-hidden="true" /></span>
                  <span className="gx-text">{t}</span>
                </Reveal>
              )
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="sec" id="process">
      <div className="wrap">
        <SectionHead center title="Your Hair Consultation Journey" />
        <ol className="steps">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 110} className="step">
              <span className="ic"><Icon size={24} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Local() {
  return (
    <section className="sec tint" id="location">
      <div className="wrap">
        <Reveal className="loc">
          <div className="loc-l">
            <h2>Advanced GroHair – Hair Clinic in Perambur, Chennai</h2>
            <p>Looking for a hair clinic in Perambur or exploring hair treatment options in Chennai?</p>
            <p>Advanced GroHair provides consultation for hair fall, hair thinning, hair regrowth, GFC treatment and hair transplant enquiries.</p>
            <p>Visit our Perambur clinic to discuss your hair concerns and understand available treatment options.</p>
            <div className="btn-row">
              <Cta href={MAPS_URL} target="_blank" rel="noreferrer" icon={Navigation}>Get Directions</Cta>
              <Cta href="#book" variant="ghost">Book Your Consultation</Cta>
            </div>
          </div>
          <div className="loc-r" aria-hidden="true">
            <span className="ring r1" /><span className="ring r2" /><span className="ring r3" />
            <span className="loc-pin"><MapPin size={44} /></span>
            <span className="loc-label">Perambur, Chennai</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Faq() {
  const [open, setOpen] = useState(0)
  const half = Math.ceil(faqs.length / 2)
  const columns = [faqs.slice(0, half), faqs.slice(half)]
  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <SectionHead center title="Frequently Asked Questions" />
        <div className="faq">
          {columns.map((col, c) => (
            <div className="faq-col" key={c}>
              {col.map(([q, a], j) => {
                const i = c * half + j
                return (
                  <Reveal key={q} delay={j * 70} className={`qa ${open === i ? 'open' : ''}`}>
                    <h3>
                      <button aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                        <span><b>{i + 1}.</b> {q}</span>
                        <ChevronDown size={20} aria-hidden="true" />
                      </button>
                    </h3>
                    <div className="ans" id={`faq-${i}`} role="region"><div><p>{a}</p></div></div>
                  </Reveal>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Final() {
  return (
    <section className="final" id="appointment">
      <div className="blob b3" />
      <div className="wrap hero-grid">
        <Reveal className="final-copy">
          <h2>Take the First Step Towards Understanding Your Hair Concerns</h2>
          <p>Explore personalised hair treatment and hair restoration options at Advanced GroHair, Perambur.</p>
          <p><strong>Book your hair consultation today.</strong></p>
          <div className="btn-row">
            <Cta href="#final-form" variant="light" icon={CalendarDays}>BOOK MY CONSULTATION</Cta>
            <a href={`tel:${PHONE}`} className="btn btn-ghost"><Phone size={18} aria-hidden="true" /><span>CALL NOW</span></a>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <LeadForm id="final-form" heading="" button="REQUEST AN APPOINTMENT" optionalDate={false} />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- before / after + reviews ---------- */
const SHOW_PLACEHOLDERS = import.meta.env.DEV // empty slots are only drawn while developing

function CompareSlider({ before, after, label }) {
  const [pos, setPos] = useState(50)
  const base = import.meta.env.BASE_URL
  return (
    <figure className="cmp" style={{ '--pos': `${pos}%` }}>
      <div className="cmp-box">
        <img src={base + after} alt={`${label || 'Result'} - after`} loading="lazy" />
        <img className="cmp-before" src={base + before} alt={`${label || 'Result'} - before`} loading="lazy" />
        <span className="cmp-tag b">Before</span>
        <span className="cmp-tag a">After</span>
        <span className="cmp-line" aria-hidden="true"><span className="cmp-knob"><MoveHorizontal size={18} /></span></span>
        <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Drag to compare before and after" />
      </div>
      {label && <figcaption>{label}</figcaption>}
    </figure>
  )
}

function Proof() {
  const hasBA = results.length > 0
  const hasRev = reviews.length > 0
  const dev = SHOW_PLACEHOLDERS
  const [tab, setTab] = useState('ba')
  if (!hasBA && !hasRev && !dev) return null

  const showBA = hasBA || dev
  const showRev = hasRev || dev
  const active = showBA && showRev ? tab : showBA ? 'ba' : 'rev'

  const baSlots = [
    { key: 0, icon: ScanFace, title: 'Hairline restoration' },
    { key: 1, icon: Sprout, title: 'Hair regrowth' },
    { key: 2, icon: Scissors, title: 'Hair transplant' },
  ]
  const baItems = hasBA ? results : baSlots.map((x) => ({ ...x, placeholder: true }))
  const revItems = hasRev ? reviews : [0, 1, 2].map((i) => ({ placeholder: true, key: i }))

  return (
    <section className="sec tint" id="results">
      <div className="wrap">
        <SectionHead center title="Patient Results & Reviews" text="Results vary from person to person. Suitability and outcomes are assessed during consultation." />
        {showBA && showRev && (
          <Reveal className="tabs" role="tablist" aria-label="Results or reviews">
            <button role="tab" aria-selected={active === 'ba'} className={active === 'ba' ? 'on' : ''} onClick={() => setTab('ba')}>Before &amp; After</button>
            <button role="tab" aria-selected={active === 'rev'} className={active === 'rev' ? 'on' : ''} onClick={() => setTab('rev')}>What Our Patients Say</button>
          </Reveal>
        )}
        {active === 'ba' ? (
          <div className="cmp-grid" key="ba">
            {baItems.map((r, i) => (
              <Reveal key={r.key ?? r.before} delay={i * 100}>
                {r.placeholder ? (
                  <div className="slot"><r.icon size={36} aria-hidden="true" /><b>{r.title}</b><span>Add before / after photos in content.js</span></div>
                ) : (
                  <CompareSlider {...r} />
                )}
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="grid g3" key="rev">
            {revItems.map((r, i) => (
              <Reveal key={r.key ?? r.name} delay={(i % 3) * 90} className="card review">
                {r.placeholder ? (
                  <div className="slot"><Quote size={32} aria-hidden="true" /><span>Add genuine patient reviews in content.js</span></div>
                ) : (
                  <>
                    <Quote className="rev-q" size={30} aria-hidden="true" />
                    <div className="stars" aria-label={`${r.rating || 5} out of 5 stars`}>
                      {Array.from({ length: r.rating || 5 }).map((_, k) => <Star key={k} size={18} fill="currentColor" aria-hidden="true" />)}
                    </div>
                    <p>{r.text}</p>
                    <div className="rev-by"><b>{r.name}</b>{r.concern && <span>{r.concern}</span>}</div>
                  </>
                )}
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="ftr">
      <div className="blob b1" />
      <div className="wrap">
        <div className="ftr-grid">
          <div className="ftr-brand">
            <img src={logo} alt="Advanced GroHair and GloSkin" />
            <a href="#book" className="btn btn-primary btn-sm"><CalendarCheck size={16} aria-hidden="true" /><span>Book Consultation</span></a>
          </div>
          <div>
            <h4 className="ftr-h">Explore</h4>
            <ul>
              {nav.map((n) => <li key={n.href}><a href={n.href}>{n.label}</a></li>)}
              <li><a href="#book">Book appointment</a></li>
            </ul>
          </div>
          <div>
            <h4 className="ftr-h">Treatments</h4>
            <ul>
              {treatments.map((t) => <li key={t.title}><a href="#treatments">{t.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="ftr-h">Contact</h4>
            <ul className="ftr-contact">
              <li><Phone size={18} aria-hidden="true" /><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></li>
              <li><Mail size={18} aria-hidden="true" /><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
              <li><MapPin size={18} aria-hidden="true" /><a href={MAPS_URL} target="_blank" rel="noreferrer">{ADDRESS_LINES.map((l) => <span key={l} className="addr-l">{l}</span>)}</a></li>
            </ul>
          </div>
        </div>
        <div className="ftr-bar">
          <small>© {year} Advanced GroHair, Perambur. All rights reserved.</small>
        </div>
      </div>
    </footer>
  )
}

function StickyBar() {
  return (
    <div className="sticky-bar">
      <a href={`tel:${PHONE}`}><Phone size={18} aria-hidden="true" />Call Now</a>
      <a href="#book" className="primary"><CalendarDays size={18} aria-hidden="true" />Book Consultation</a>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Concerns />
        <Treatments />
        <WhyUs />
        <Transplant />
        <Gfc />
        <Process />
        <Local />
        <Proof />
        <Faq />
        <Final />
      </main>
      <Footer />
      <StickyBar />
    </>
  )
}
