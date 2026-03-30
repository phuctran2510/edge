import { Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home     from './pages/Home'
import Theory   from './pages/Theory'
import Labs     from './pages/Labs'
import Quiz     from './pages/Quiz'
import Research from './pages/Research'
import Resources from './pages/Resources'
import Contact  from './pages/Contact'

const NAV = [
  { g:'Học tập', items:[
    { to:'/',          l:'Tổng quan',  dot:'#00c9ff' },
    { to:'/theory',   l:'Lý thuyết',  dot:'#ff3860' },
    { to:'/labs',     l:'Lab thực hành', dot:'#06d6a0' },
  ]},
  { g:'Nghiên cứu', items:[
    { to:'/quiz',     l:'Trắc nghiệm', dot:'#ffd166' },
    { to:'/research', l:'Đề tài NCKH', dot:'#a78bfa' },
  ]},
  { g:'Hỗ trợ', items:[
    { to:'/resources',l:'Tài liệu',   dot:'#f472b6' },
    { to:'/contact',  l:'Liên hệ GV', dot:'#00c9ff' },
  ]},
]

export default function App() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo(0,0) }, [loc.pathname])

  return (
    <div className="layout">
      {open && <div className="overlay show" onClick={() => setOpen(false)}/>}

      <aside className={`sidebar${open ? ' open' : ''}`}>
        {/* Logo */}
        <div style={{ padding:'1.1rem .9rem', borderBottom:'1px solid var(--brd)', display:'flex', alignItems:'center', gap:'.6rem' }}>
          <div style={{ width:32, height:32, borderRadius:7, background:'linear-gradient(135deg,var(--r),var(--p))', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fm)', fontWeight:700, fontSize:'.8rem', color:'#fff', flexShrink:0, letterSpacing:'-1px' }}>
            SEC
          </div>
          <div>
            <div style={{ fontFamily:'var(--fd)', fontWeight:800, fontSize:'.82rem', color:'var(--txt)', lineHeight:1 }}>Edge AI Security</div>
            <div style={{ fontSize:'.58rem', color:'var(--txt3)', fontFamily:'var(--fm)', marginTop:'.1rem' }}>DLU — Khoa CNTT</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'.4rem .45rem', overflowY:'auto' }}>
          {NAV.map(g => (
            <div key={g.g}>
              <div className="nav-grp">{g.g}</div>
              {g.items.map(n => (
                <NavLink key={n.to} to={n.to} end={n.to === '/'}
                  className={({isActive}) => `nav-link${isActive ? ' on' : ''}`}>
                  <span className="nav-dot" style={{ background: n.dot }}/>
                  {n.l}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div style={{ padding:'.7rem .9rem', borderTop:'1px solid var(--brd)', fontSize:'.63rem', color:'var(--txt3)' }}>
          <div style={{ fontFamily:'var(--fd)', fontWeight:600, color:'var(--txt2)', marginBottom:'.08rem' }}>GV. Trần Vĩnh Phúc</div>
          <a href="mailto:phuctv@dlu.edu.vn" style={{ color:'var(--c)' }}>phuctv@dlu.edu.vn</a>
        </div>
      </aside>

      <div className="main">
        <div className="topbar">
          <button className="ham" onClick={() => setOpen(o => !o)}>&#9776;</button>
          <span style={{ fontFamily:'var(--fd)', fontWeight:700, fontSize:'.86rem', color:'var(--r)', flex:1 }}>Edge AI Security</span>
          <span style={{ fontSize:'.6rem', color:'var(--txt3)', fontFamily:'var(--fm)' }}>DLU</span>
        </div>
        <main className="pg">
          <Routes>
            <Route path="/"          element={<Home/>}/>
            <Route path="/theory"    element={<Theory/>}/>
            <Route path="/labs"      element={<Labs/>}/>
            <Route path="/quiz"      element={<Quiz/>}/>
            <Route path="/research"  element={<Research/>}/>
            <Route path="/resources" element={<Resources/>}/>
            <Route path="/contact"   element={<Contact/>}/>
          </Routes>
        </main>
      </div>
    </div>
  )
}
