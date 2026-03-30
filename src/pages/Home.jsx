import { Link } from 'react-router-dom'
import { QUIZ, LABS, RESEARCH_TOPICS } from '../data/content'
import { THEORY } from '../data/theory'

export default function Home() {
  const threats = [
    { n:'Adversarial\nExamples',   c:'#ff3860', risk:'Critical' },
    { n:'Data\nPoisoning',         c:'#ff8c42', risk:'Critical' },
    { n:'Model\nExtraction',       c:'#ffd166', risk:'High' },
    { n:'Membership\nInference',   c:'#a78bfa', risk:'High' },
    { n:'Neural\nBackdoor',        c:'#f472b6', risk:'Critical' },
    { n:'Gradient\nLeakage',       c:'#00c9ff', risk:'High' },
    { n:'Byzantine\nAttack',       c:'#06d6a0', risk:'High' },
    { n:'Side-channel\nAttack',    c:'#ffd166', risk:'Medium' },
  ]

  return (
    <div className="fu">
      {/* Hero */}
      <div style={{ padding:'2rem 0 2.5rem', borderBottom:'1px solid var(--brd)', marginBottom:'2rem' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:'.4rem', background:'rgba(255,56,96,.07)', border:'1px solid rgba(255,56,96,.2)', padding:'.2rem .8rem', borderRadius:999, marginBottom:'1rem' }}>
          <span style={{ width:6, height:6, background:'var(--r)', borderRadius:'50%', animation:'pulse 1.5s infinite', display:'inline-block' }}/>
          <span style={{ fontSize:'.67rem', color:'var(--r)', fontFamily:'var(--fm)' }}>THREAT LEVEL: CRITICAL — 2024/2025</span>
        </div>
        <h1 style={{ fontSize:'clamp(1.6rem,4vw,2.2rem)', marginBottom:'.5rem', lineHeight:1.1 }}>
          <span className="gtr">Bảo Mật</span><br/>
          <span style={{ color:'var(--txt)' }}>Edge AI & Federated Learning</span>
        </h1>
        <p style={{ maxWidth:560, marginBottom:'1.3rem', lineHeight:1.75 }}>
          Nghiên cứu chuyên sâu về các mối đe dọa và cơ chế bảo vệ hệ thống AI triển khai tại biên mạng —
          từ Adversarial ML đến Blockchain trust, Homomorphic Encryption và FPGA Security.
        </p>
        <div style={{ display:'flex', gap:'.55rem', flexWrap:'wrap' }}>
          <Link to="/theory"   className="btn btn-r">Bắt đầu học</Link>
          <Link to="/labs"     className="btn btn-o">Thực hành</Link>
          <Link to="/research" className="btn btn-s">Đề tài NCKH</Link>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(90px,1fr))', gap:'.5rem', marginBottom:'2rem' }}>
        {[
          [THEORY.length,        'Chương lý thuyết', '#00c9ff'],
          [LABS.length,          'Labs thực hành',   '#06d6a0'],
          [QUIZ.length,          'Câu trắc nghiệm',  '#ffd166'],
          [RESEARCH_TOPICS.length,'Đề tài NCKH',     '#a78bfa'],
        ].map(([n,l,c],i) => (
          <div key={i} className="card" style={{ padding:'.8rem .5rem', textAlign:'center' }}>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:c, fontFamily:'var(--fm)', lineHeight:1, marginBottom:'.18rem' }}>{n}</div>
            <div style={{ fontSize:'.65rem', color:'var(--txt3)' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Threat landscape */}
      <div style={{ marginBottom:'2rem' }}>
        <div style={{ fontSize:'.6rem', color:'var(--txt3)', fontFamily:'var(--fm)', marginBottom:'.7rem', textTransform:'uppercase', letterSpacing:'.08em' }}>
          Attack Landscape 2024
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(140px,100%),1fr))', gap:'.5rem' }}>
          {threats.map((t,i) => (
            <div key={i} className="card" style={{ padding:'.8rem', borderColor:`${t.c}22`, borderLeft:`3px solid ${t.c}` }}>
              <div style={{ fontSize:'.62rem', color:t.c, fontFamily:'var(--fm)', fontWeight:700, marginBottom:'.25rem', whiteSpace:'pre-line', lineHeight:1.3 }}>{t.n}</div>
              <span className="badge" style={{ fontSize:'.58rem', background:`${t.c}10`, color:t.c, border:`1px solid ${t.c}25` }}>{t.risk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning path */}
      <div>
        <div style={{ fontSize:'.6rem', color:'var(--txt3)', fontFamily:'var(--fm)', marginBottom:'.7rem', textTransform:'uppercase', letterSpacing:'.08em' }}>
          Lộ trình học
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(200px,100%),1fr))', gap:'.5rem' }}>
          {[
            { to:'/theory',   c:'#00c9ff', n:'01', t:'Lý thuyết', d:`${THEORY.length} chương: Adversarial ML, FL, Blockchain, HE, FPGA` },
            { to:'/labs',     c:'#06d6a0', n:'02', t:'Lab thực hành', d:`${LABS.length} labs PyTorch: FGSM, Backdoor, FL với DP, Watermarking` },
            { to:'/quiz',     c:'#ffd166', n:'03', t:'Trắc nghiệm', d:`${QUIZ.length} câu hỏi 5 chủ đề, có giải thích chi tiết` },
            { to:'/research', c:'#a78bfa', n:'04', t:'Đề tài NCKH', d:`${RESEARCH_TOPICS.length} topic: từ open problem đến đang nghiên cứu` },
          ].map(p => (
            <Link key={p.to} to={p.to} className="card card-a fu" style={{ padding:'1rem', textDecoration:'none', borderColor:`${p.c}1a` }}>
              <div style={{ fontSize:'.6rem', color:p.c, fontFamily:'var(--fm)', fontWeight:700, marginBottom:'.2rem' }}>{p.n}</div>
              <div style={{ fontWeight:700, fontSize:'.87rem', color:'var(--txt)', marginBottom:'.2rem', fontFamily:'var(--fd)' }}>{p.t}</div>
              <div style={{ fontSize:'.74rem', color:'var(--txt3)', lineHeight:1.5 }}>{p.d}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
