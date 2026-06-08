// src/App.jsx
import { useEffect, useState } from 'react'
import './App.css'
import heroLarge from './assets/hero-large.jpg'
import spaInterior from './assets/spa-interior.jpg'
import therapistAva from './assets/therapist-ava.jpg'
import therapistLiam from './assets/therapist-liam.jpg'
import hotStones from './assets/hot-stones.jpg'

const DUMMY_EMPLOYEES = [
  { id: 'em1', name: 'Ava Reed', photo: therapistAva },
  { id: 'em2', name: 'Liam Stone', photo: therapistLiam },
  { id: 'em3', name: 'Maya Lin', photo: therapistAva },
]

const SERVICES = [
  { id: 's1', title: 'Relaxing Swedish Massage', length: '60 min', price: '$70', img: spaInterior },
  { id: 's2', title: 'Deep Tissue Massage', length: '75 min', price: '$90', img: hotStones },
  { id: 's3', title: 'Hot Stone Therapy', length: '90 min', price: '$110', img: heroLarge },
]

function Header({ active, setActive }) {
  return (
    <header className="studio-header">
      <div className="brand">
        <div className="logo" aria-hidden />
        <div>
          <div className="title">Serenity Studio</div>
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

  return (
    <section className="admin-view">
      <h2>Admin: Employees & Availability</h2>
      <div className="admin-grid">
        {DUMMY_EMPLOYEES.map((em) => (
          <div key={em.id} className="admin-card">
            <img src={em.photo} alt="" />
            <div className="admin-body">
              <div className="name">{em.name}</div>
              <div className="muted">Availability</div>
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
      <footer className="studio-footer">© Serenity Studio — Demo POC</footer>
    </div>
  )
}
