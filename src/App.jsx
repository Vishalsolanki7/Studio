// filepath: /Users/vishalsolanki/Documents/WEB/Studio/src/App.jsx
import { useEffect, useState } from 'react'
import './App.css'
import heroLarge from './assets/hero-large.jpg'
import spaInterior from './assets/spa-interior.jpg'
import therapistAva from './assets/therapist-ava.jpg'
import therapistLiam from './assets/therapist-liam.jpg'
import hotStones from './assets/hot-stones.jpg'

const DUMMY_EMPLOYEES = [
  { id: 'em1', name: 'Ava Reed', photo: therapistAva, bio: 'Specializes in Swedish & calming modalities. Ava brings a gentle touch and holistic approach to every session.' },
  { id: 'em2', name: 'Liam Stone', photo: therapistLiam, bio: 'Deep tissue expert focused on therapeutic recovery, mobility, and athletic clients.' },
  { id: 'em3', name: 'Maya Lin', photo: therapistAva, bio: 'Integrative therapist blending trigger-point work with restorative techniques for lasting relief.' },
]

const SERVICES = [
  { id: 's1', title: 'Relaxing Swedish Massage', length: '60 min', price: '$70', img: spaInterior },
  { id: 's2', title: 'Deep Tissue Massage', length: '75 min', price: '$90', img: hotStones },
  { id: 's3', title: 'Hot Stone Therapy', length: '90 min', price: '$110', img: heroLarge },
]

const TESTIMONIALS = [
  { id: 't1', name: 'Sophie K.', text: 'The most relaxing massage I have ever had. Ava is incredibly intuitive and professional.' },
  { id: 't2', name: 'Mark R.', text: 'Liam helped me recover from a nagging shoulder injury — highly recommend.' },
  { id: 't3', name: 'Dana P.', text: 'Lovely space, great energy, and exceptional therapists.' },
]

const FAQ = [
  { q: 'What should I expect on my first visit?', a: 'You will be greeted, asked about your goals and comfort, and your therapist will tailor pressure and techniques to your needs.' },
  { q: 'What is your cancellation policy?', a: 'Please provide 24 hours notice for cancellations to avoid a small fee. This POC does not enforce payments.' },
  { q: 'Do you accept walk-ins?', a: 'We recommend booking in advance. We may accommodate walk-ins depending on availability.' },
]

function Header({ active, setActive }) {
  return (
    <header className="studio-header">
      <div className="brand">
        <div className="logo" aria-hidden />
        <div>
          <div className="title">A&R Massage Studio</div>
          <div className="subtitle">Massage & Wellness</div>
        </div>
      </div>
      <nav>
        <button className={active === 'client' ? 'active' : ''} onClick={() => setActive('client')}>Client</button>
        <button className={active === 'employee' ? 'active' : ''} onClick={() => setActive('employee')}>Employee</button>
        <button className={active === 'admin' ? 'active' : ''} onClick={() => setActive('admin')}>Admin</button>
      </nav>
    </header>
  )
}

function ClientView() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [sent, setSent] = useState(false)

  function submitContact(e) {
    e.preventDefault()
    if (!name || !email || !note) return
    const raw = localStorage.getItem('studio_messages')
    const msgs = raw ? JSON.parse(raw) : []
    msgs.push({ id: Date.now(), name, email, note, received: new Date().toISOString() })
    localStorage.setItem('studio_messages', JSON.stringify(msgs))
    setName('')
    setEmail('')
    setNote('')
    setSent(true)
    setTimeout(() => setSent(false), 2400)
  }

  return (
    <main className="client-view">
      <section className="hero">
        <div className="hero-content">
          <h1>Relax. Recharge. Renew.</h1>
          <p>Book your moment of calm — discover our signature treatments.</p>
          <div className="hero-cta">View Services</div>
        </div>
        <div className="hero-image" style={{ backgroundImage: `url(${heroLarge})` }} />
      </section>

      <section className="services">
        {SERVICES.map((s) => (
          <article key={s.id} className="service-card">
            <div className="service-image" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="service-body">
              <h3>{s.title}</h3>
              <div className="meta">{s.length} • {s.price}</div>
              <p className="muted">Tailored pressure, calming atmosphere, licensed therapists.</p>
              <button className="book">Book (POC)</button>
            </div>
          </article>
        ))}
      </section>

      <section className="staff" style={{ marginTop: 18 }}>
        <h2>Meet our therapists</h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          {DUMMY_EMPLOYEES.map((em) => (
            <div key={em.id} style={{ width: 260, background: 'white', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              <img src={em.photo} alt={em.name} style={{ width: '100%', height: 160, objectFit: 'cover' }} />
              <div style={{ padding: 12, textAlign: 'left' }}>
                <div style={{ fontWeight: 700 }}>{em.name}</div>
                <div className="muted" style={{ marginTop: 6 }}>{em.bio}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials" style={{ marginTop: 22 }}>
        <h2>What clients say</h2>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          {TESTIMONIALS.map(t => (
            <blockquote key={t.id} style={{ width: 320, background: 'white', padding: 14, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>&ldquo;{t.text}&rdquo;</div>
              <div className="muted">— {t.name}</div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="faq" style={{ marginTop: 22, textAlign: 'left' }}>
        <h2>FAQ</h2>
        <div style={{ marginTop: 10 }}>
          {FAQ.map((f, i) => (
            <details key={i} style={{ background: 'white', padding: 12, borderRadius: 10, marginBottom: 8, boxShadow: '0 6px 18px rgba(0,0,0,0.04)' }}>
              <summary style={{ fontWeight: 700, cursor: 'pointer' }}>{f.q}</summary>
              <div className="muted" style={{ marginTop: 6 }}>{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      <section className="contact" style={{ marginTop: 22 }}>
        <h2>Contact & Inquiries</h2>
        <form onSubmit={submitContact} style={{ display: 'grid', gap: 8, justifyContent: 'center', gridTemplateColumns: '1fr', marginTop: 12 }}>
          <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #eee', width: 360 }} />
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #eee', width: 360 }} />
          <textarea placeholder="How can we help?" value={note} onChange={(e) => setNote(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #eee', width: 360, minHeight: 100 }} />
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
            <button type="submit" className="hero-cta">Send message</button>
            {sent && <div className="muted" style={{ alignSelf: 'center' }}>Message sent — thanks!</div>}
          </div>
        </form>
      </section>
    </main>
  )
}

function EmployeeView() {
  const [employees] = useState(DUMMY_EMPLOYEES)
  const [selected, setSelected] = useState(employees[0].id)
  const [date, setDate] = useState('')
  const [start, setStart] = useState('09:00')
  const [end, setEnd] = useState('10:00')
  const [data, setData] = useState({})

  useEffect(() => {
    const raw = localStorage.getItem('studio_availability')
    setData(raw ? JSON.parse(raw) : {})
  }, [])

  useEffect(() => {
    localStorage.setItem('studio_availability', JSON.stringify(data))
  }, [data])

  function addSlot() {
    if (!date) return
    const slot = { start, end, id: Date.now() }
    setData((d) => {
      const next = { ...d }
      next[selected] = next[selected] || {}
      next[selected][date] = [...(next[selected][date] || []), slot]
      return next
    })
    setDate('')
  }

  function removeSlot(empId, dt, slotId) {
    setData((d) => {
      const next = { ...d }
      next[empId] = next[empId] || {}
      next[empId][dt] = (next[empId][dt] || []).filter((s) => s.id !== slotId)
      return next
    })
  }

  return (
    <section className="employee-view">
      <aside className="employees">
        {employees.map((em) => (
          <button key={em.id} className={selected === em.id ? 'sel' : ''} onClick={() => setSelected(em.id)}>
            <img src={em.photo} alt="" />
            <div>{em.name}</div>
          </button>
        ))}
      </aside>

      <div className="scheduler">
        <h2>Set availability for {employees.find(e => e.id === selected).name}</h2>
        <div className="muted" style={{ marginBottom: 10, textAlign: 'left' }}>{employees.find(e => e.id === selected).bio}</div>
        <div className="form-row">
          <label>
            Date
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <label>
            Start
            <input type="time" value={start} onChange={(e) => setStart(e.target.value)} />
          </label>
          <label>
            End
            <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} />
          </label>
          <div className="form-actions">
            <button onClick={addSlot} className="add">Add slot</button>
          </div>
        </div>

        <div className="availability-list">
          {(data[selected] && Object.keys(data[selected]).length > 0) ? (
            Object.entries(data[selected]).sort().map(([dt, slots]) => (
              <div key={dt} className="day-block">
                <div className="day-title">{dt}</div>
                <div className="slots">
                  {slots.map((s) => (
                    <div className="slot" key={s.id}>
                      <div>{s.start} - {s.end}</div>
                      <button className="x" onClick={() => removeSlot(selected, dt, s.id)}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="muted">No availability set yet for this employee.</div>
          )}
        </div>
      </div>
    </section>
  )
}

function AdminView() {
  const [data] = useState(() => {
    const raw = localStorage.getItem('studio_availability')
    return raw ? JSON.parse(raw) : {}
  })

  const [messages, setMessages] = useState(() => {
    const raw = localStorage.getItem('studio_messages')
    return raw ? JSON.parse(raw) : []
  })

  function clearMessages() {
    localStorage.removeItem('studio_messages')
    setMessages([])
  }

  return (
    <section className="admin-view">
      <h2>Admin: Employees & Availability</h2>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 420 }}>
          <div className="admin-grid">
            {DUMMY_EMPLOYEES.map((em) => (
              <div key={em.id} className="admin-card">
                <img src={em.photo} alt="" />
                <div className="admin-body">
                  <div className="name">{em.name}</div>
                  <div className="muted">{em.bio}</div>
                  <div className="muted" style={{ marginTop: 6 }}>Availability</div>
                  <div className="admin-availability">
                    {data[em.id] ? (
                      Object.entries(data[em.id]).map(([dt, slots]) => (
                        <div key={dt} className="admin-day">
                          <strong>{dt}</strong>
                          <div className="slots-inline">
                            {slots.map((s) => (
                              <div className="chip" key={s.id}>{s.start}-{s.end}</div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="muted">No slots</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside style={{ width: 360, background: 'white', padding: 12, borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Messages</h3>
            <button onClick={clearMessages} style={{ background: 'transparent', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>Clear</button>
          </div>
          {messages.length === 0 ? (
            <div className="muted">No messages</div>
          ) : (
            <div style={{ display: 'grid', gap: 8 }}>
              {messages.map(m => (
                <div key={m.id} style={{ borderRadius: 8, padding: 8, background: '#fafafa' }}>
                  <div style={{ fontWeight: 700 }}>{m.name} <span className="muted">• {new Date(m.received).toLocaleString()}</span></div>
                  <div className="muted">{m.email}</div>
                  <div style={{ marginTop: 6 }}>{m.note}</div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

export default function App() {
  const [active, setActive] = useState('client')
  return (
    <div className="app-root">
      <Header active={active} setActive={setActive} />
      <div className="content">
        {active === 'client' && <ClientView />}
        {active === 'employee' && <EmployeeView />}
        {active === 'admin' && <AdminView />}
      </div>
      <footer className="studio-footer">© A&R Massage Studio — Demo POC</footer>
    </div>
  )
}
