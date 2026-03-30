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
function Login({ onLogin }) {
  const [pwd, setPwd] = useState('')
  const [shake, setShake] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pwd === 'sdn2026') {
      localStorage.setItem('auth', 'true')
      onLogin(true)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div style={S.wrap}>
      {/* Animated grid background */}
      <div style={S.grid}/>
      <div style={S.glow1}/>
      <div style={S.glow2}/>

      <div style={S.card}>
        {/* Left — branding */}
        <div style={S.left}>
          <div style={S.badge}>SDN · CNTT · DLU</div>
          <div style={S.logo}>
            <span style={S.logoAccent}>SDN</span>
            <span style={S.logoMain}>EDU</span>
          </div>
          <p style={S.tagline}>Hệ thống học tập & nghiên cứu<br/>Software Defined Networking</p>
          <div style={S.divider}/>
          <div style={S.meta}>
            <div style={S.metaRow}><span style={S.metaDot}/> GV: Trần Vĩnh Phúc</div>
            <div style={S.metaRow}><span style={S.metaDot}/> phuctv@dlu.edu.vn</div>
            <div style={S.metaRow}><span style={S.metaDot}/> 0976 353 605</div>
          </div>
        </div>

        {/* Right — login form */}
        <div style={S.right}>
          <div style={S.formHead}>
            <div style={S.lock}>🔐</div>
            <h2 style={S.formTitle}>Truy cập hệ thống</h2>
            <p style={S.formSub}>Nhập mật khẩu được cấp bởi giảng viên</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{
              ...S.inputWrap,
              ...(focused ? S.inputWrapFocus : {}),
              ...(shake ? S.inputWrapShake : {})
            }}>
              <span style={S.inputIcon}>⬡</span>
              <input
                type="password"
                placeholder="••••••••"
                value={pwd}
                onChange={e => setPwd(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={S.input}
              />
            </div>
            <button type="submit" style={S.btn}>
              <span>Đăng nhập</span>
              <span style={S.btnArrow}>→</span>
            </button>
          </form>

          <p style={S.hint}>Liên hệ giảng viên nếu chưa có mật khẩu</p>
        </div>
      </div>

      <style>{`
        @keyframes gridMove { from { transform: translateY(0) } to { transform: translateY(40px) } }
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(5px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        .login-card { animation: fadeUp .5s cubic-bezier(.16,1,.3,1) both }
        .login-btn:hover { background: linear-gradient(135deg,#00eeff,#00e676) !important; box-shadow: 0 8px 32px rgba(0,212,255,.35) !important; transform: translateY(-1px) }
        .login-btn:active { transform: translateY(0) }
      `}</style>
    </div>
  )
}
export default function App() {
const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('auth')
    if (saved === 'true') setIsAuth(true)
  }, [])

  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => { setOpen(false); window.scrollTo(0,0) }, [loc.pathname])


   if (!isAuth) {
  return <Login onLogin={setIsAuth} />
}

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
const S = {
  wrap: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#07090f',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Be Vietnam Pro', sans-serif",
  },
  grid: {
    position: 'absolute', inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,212,255,.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,255,.04) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    animation: 'gridMove 4s linear infinite alternate',
    pointerEvents: 'none',
  },
  glow1: {
    position: 'absolute', top: '-20%', left: '-10%',
    width: '50vw', height: '50vw',
    background: 'radial-gradient(circle, rgba(0,212,255,.12) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  glow2: {
    position: 'absolute', bottom: '-20%', right: '-10%',
    width: '45vw', height: '45vw',
    background: 'radial-gradient(circle, rgba(0,230,118,.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative', zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'clamp(200px, 40%, 340px) 1fr',
    width: '100%', maxWidth: 820,
    background: 'rgba(11,15,26,.85)',
    border: '1px solid rgba(0,212,255,.15)',
    borderRadius: 20,
    overflow: 'hidden',
    backdropFilter: 'blur(24px)',
    boxShadow: '0 32px 80px rgba(0,0,0,.7), inset 0 1px 0 rgba(255,255,255,.05)',
    animation: 'fadeUp .5s cubic-bezier(.16,1,.3,1) both',
  },
  left: {
    padding: '2.5rem 2rem',
    background: 'linear-gradient(160deg, rgba(0,212,255,.07) 0%, rgba(0,230,118,.04) 100%)',
    borderRight: '1px solid rgba(0,212,255,.1)',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  badge: {
    display: 'inline-block',
    padding: '.25rem .7rem',
    background: 'rgba(0,212,255,.1)',
    border: '1px solid rgba(0,212,255,.2)',
    borderRadius: 999,
    fontSize: '.62rem',
    fontFamily: "'JetBrains Mono', monospace",
    color: '#00d4ff',
    letterSpacing: '.1em',
    marginBottom: '1.5rem',
  },
  logo: {
    fontSize: 'clamp(2rem, 5vw, 2.8rem)',
    fontWeight: 800,
    lineHeight: 1,
    marginBottom: '.75rem',
    fontFamily: "'Syne', sans-serif",
  },
  logoAccent: {
    color: '#00d4ff',
    display: 'block',
  },
  logoMain: {
    color: 'rgba(255,255,255,.15)',
    display: 'block',
    letterSpacing: '.05em',
  },
  tagline: {
    fontSize: '.82rem',
    color: 'rgba(255,255,255,.4)',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
  },
  divider: {
    height: 1,
    background: 'linear-gradient(90deg, rgba(0,212,255,.3), transparent)',
    marginBottom: '1.5rem',
  },
  meta: { display: 'flex', flexDirection: 'column', gap: '.45rem' },
  metaRow: {
    display: 'flex', alignItems: 'center', gap: '.5rem',
    fontSize: '.78rem', color: 'rgba(255,255,255,.45)',
    fontFamily: "'JetBrains Mono', monospace",
  },
  metaDot: {
    width: 5, height: 5, borderRadius: '50%',
    background: '#00d4ff', flexShrink: 0,
    animation: 'pulse 2s ease infinite',
  },
  right: {
    padding: '2.5rem',
    display: 'flex', flexDirection: 'column', justifyContent: 'center',
  },
  formHead: { marginBottom: '2rem' },
  lock: { fontSize: '1.8rem', marginBottom: '.75rem' },
  formTitle: {
    fontSize: '1.3rem', fontWeight: 700, color: '#fff',
    marginBottom: '.35rem',
  },
  formSub: { fontSize: '.82rem', color: 'rgba(255,255,255,.35)' },
  inputWrap: {
    display: 'flex', alignItems: 'center', gap: '.75rem',
    padding: '.8rem 1rem',
    background: 'rgba(255,255,255,.04)',
    border: '1px solid rgba(255,255,255,.1)',
    borderRadius: 10,
    marginBottom: '.85rem',
    transition: 'all .2s',
  },
  inputWrapFocus: {
    border: '1px solid rgba(0,212,255,.5)',
    background: 'rgba(0,212,255,.04)',
    boxShadow: '0 0 0 3px rgba(0,212,255,.1)',
  },
  inputWrapShake: { animation: 'shake .4s ease both' },
  inputIcon: { fontSize: '.9rem', color: 'rgba(0,212,255,.5)', flexShrink: 0 },
  input: {
    flex: 1, background: 'none', border: 'none', outline: 'none',
    color: '#fff', fontSize: '1rem', fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: '.15em',
  },
  btn: {
    width: '100%', padding: '.85rem',
    background: 'linear-gradient(135deg, #00d4ff, #00e676)',
    border: 'none', borderRadius: 10,
    color: '#000', fontWeight: 700, fontSize: '.9rem',
    cursor: 'pointer', transition: 'all .2s',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.5rem',
    fontFamily: "'Be Vietnam Pro', sans-serif",
    className: 'login-btn',
  },
  btnArrow: { fontSize: '1rem', transition: 'transform .2s' },
  hint: {
    marginTop: '1.25rem',
    fontSize: '.75rem', color: 'rgba(255,255,255,.2)',
    textAlign: 'center',
  },
}
