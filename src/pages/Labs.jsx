import { useState } from 'react'
import { LABS } from '../data/content'

function CopyBtn({ code }) {
  const [ok, setOk] = useState(false)
  return <button className={`cpbtn${ok?' ok':''}`} onClick={()=>{navigator.clipboard?.writeText(code);setOk(true);setTimeout(()=>setOk(false),1800)}}>{ok?'copied':'copy'}</button>
}

const dc = d => d==='easy'?'var(--g)':d==='medium'?'var(--y)':'var(--r)'
const dl = d => d==='easy'?'Intro':d==='medium'?'Trung cap':'Nang cao'

function LabDetail({ lab, done, setDone, onBack }) {
  const [step, setStep] = useState(0)
  if (!lab) return null
  return (
    <div>
      <div style={{display:'flex',gap:'.5rem',marginBottom:'1rem',flexWrap:'wrap',alignItems:'center'}}>
        <button className="btn btn-s" onClick={onBack}>← Quay lai</button>
        <span className="badge" style={{background:`${dc(lab.diff)}12`,color:dc(lab.diff),border:`1px solid ${dc(lab.diff)}28`}}>{dl(lab.diff)}</span>
        <span style={{fontSize:'.75rem',color:'var(--txt3)'}}>{lab.time}</span>
        <span style={{fontSize:'.75rem',color:'var(--txt3)'}}>{lab.hw}</span>
      </div>

      <div className="card" style={{padding:'1.1rem',marginBottom:'.9rem',background:'rgba(255,56,96,.04)',borderColor:'rgba(255,56,96,.18)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'.5rem',flexWrap:'wrap'}}>
          <div style={{flex:1}}>
            <span className="badge br" style={{marginBottom:'.4rem',display:'inline-flex'}}>{lab.cat}</span>
            <h2 style={{fontWeight:800,fontSize:'1.05rem',marginTop:'.3rem',marginBottom:'.3rem'}}>{lab.title}</h2>
            <p style={{fontSize:'.83rem',color:'var(--txt2)',lineHeight:1.55}}>{lab.obj}</p>
          </div>
          <button className={`btn ${done[lab.id]?'btn-s':'btn-g'}`} onClick={()=>setDone(p=>({...p,[lab.id]:!p[lab.id]}))}>
            {done[lab.id]?'Da xong':'Mark done'}
          </button>
        </div>
        <div style={{marginTop:'.8rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',fontSize:'.67rem',color:'var(--txt3)',marginBottom:'.22rem'}}>
            <span>Buoc {step+1}/{lab.steps.length}</span>
            <span>{Math.round((step+1)/lab.steps.length*100)}%</span>
          </div>
          <div className="prog"><div className="prog-f" style={{width:`${(step+1)/lab.steps.length*100}%`}}/></div>
        </div>
      </div>

      {lab.steps.map((s,idx)=>(
        <div key={idx} onClick={()=>setStep(idx)} className="card"
          style={{padding:'.85rem 1rem',marginBottom:'.45rem',cursor:'pointer',
            borderColor:idx===step?'var(--r)':idx<step?'rgba(6,214,160,.3)':'var(--brd)',
            background:idx===step?'rgba(255,56,96,.05)':idx<step?'rgba(6,214,160,.025)':'var(--sur)'}}>
          <div style={{display:'flex',gap:'.65rem',alignItems:'flex-start'}}>
            <div style={{width:24,height:24,borderRadius:'50%',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.67rem',fontFamily:'var(--fm)',fontWeight:700,background:idx<step?'var(--g)':idx===step?'var(--r)':'var(--sur2)',color:idx<=step?'#000':'var(--txt3)'}}>
              {idx<step?'v':idx+1}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:600,fontSize:'.87rem',color:idx===step?'var(--txt)':'var(--txt2)',marginBottom:idx===step?'.4rem':0}}>{s.t}</div>
              {idx===step&&<div style={{position:'relative'}}><pre><code style={{color:'#b8d4e8'}}>{s.code}</code></pre><CopyBtn code={s.code}/></div>}
            </div>
          </div>
        </div>
      ))}

      <div className="alert as" style={{marginTop:'.6rem',fontSize:'.83rem'}}><strong>Expected:</strong> {lab.expected}</div>
      <div style={{display:'flex',gap:'.5rem',marginTop:'.75rem',flexWrap:'wrap'}}>
        <button className="btn btn-s" disabled={step===0} onClick={()=>setStep(s=>s-1)}>Buoc truoc</button>
        <button className="btn btn-o" disabled={step===lab.steps.length-1} onClick={()=>setStep(s=>s+1)}>Buoc tiep</button>
      </div>
    </div>
  )
}

export default function Labs() {
  const [sel, setSel] = useState(null)
  const [done, setDone] = useState({})

  if (sel) return <div className="fu"><LabDetail lab={sel} done={done} setDone={setDone} onBack={()=>setSel(null)}/></div>

  return (
    <div className="fu">
      <div className="page-hdr"><h1><span className="gt">Lab thuc hanh</span></h1><p>{LABS.length} labs — PyTorch, Flower FL, Opacus DP, Model Security</p></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(280px,100%),1fr))',gap:'.7rem'}}>
        {LABS.map(l=>(
          <div key={l.id} className="card card-a" onClick={()=>setSel(l)} style={{padding:'1.05rem',borderColor:'rgba(255,56,96,.15)'}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.45rem',gap:'.35rem',flexWrap:'wrap'}}>
              <span className="badge" style={{fontSize:'.6rem',background:`${dc(l.diff)}0e`,color:dc(l.diff),border:`1px solid ${dc(l.diff)}22`}}>{dl(l.diff)}</span>
              <span style={{fontSize:'.7rem',color:'var(--txt3)'}}>{l.time}</span>
            </div>
            <span className="badge br" style={{marginBottom:'.5rem',display:'inline-flex'}}>{l.cat}</span>
            <h3 style={{fontWeight:700,fontSize:'.88rem',color:'var(--txt)',marginBottom:'.28rem',lineHeight:1.3}}>{l.title}</h3>
            <p style={{fontSize:'.79rem',color:'var(--txt3)',lineHeight:1.5,marginBottom:'.65rem'}}>{l.obj}</p>
            <div style={{fontSize:'.72rem',color:'var(--txt3)'}}>{l.hw}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
