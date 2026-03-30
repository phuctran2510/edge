import { useState } from 'react'
import { RESEARCH_TOPICS } from '../data/content'

const LEVELS = ['all','Đang nghiên cứu','Mới nổi','Open Problem']

export default function Research() {
  const [lv, setLv] = useState('all')
  const [sel, setSel] = useState(null)

  const list = lv === 'all' ? RESEARCH_TOPICS : RESEARCH_TOPICS.filter(t=>t.level===lv)

  if (sel) {
    const t = RESEARCH_TOPICS.find(x=>x.id===sel)
    return (
      <div className="fu">
        <button className="btn btn-s" style={{marginBottom:'1.1rem'}} onClick={()=>setSel(null)}>← Danh sach de tai</button>
        <div className="card" style={{padding:'1.3rem',borderColor:`${t.color}28`,background:`${t.color}05`,marginBottom:'1.1rem'}}>
          <span className="badge" style={{background:`${t.color}12`,color:t.color,border:`1px solid ${t.color}28`,marginBottom:'.55rem',display:'inline-flex'}}>{t.level}</span>
          <h2 style={{fontWeight:800,fontSize:'1.1rem',marginBottom:'.4rem'}}>{t.title}</h2>
          <div style={{display:'flex',gap:'.5rem',flexWrap:'wrap',marginTop:'.4rem'}}>
            {[...Array(5)].map((_,i)=><div key={i} style={{width:12,height:12,borderRadius:2,background:i<t.difficulty?'var(--r)':'var(--brd)'}}/>)}
            <span style={{fontSize:'.7rem',color:'var(--txt3)',marginLeft:'.3rem'}}>Difficulty</span>
            <span style={{marginLeft:'.8rem'}}>{[...Array(5)].map((_,i)=><span key={i} style={{fontSize:'1rem',color:i<t.novelty?'var(--y)':'var(--brd)'}}>★</span>)}</span>
            <span style={{fontSize:'.7rem',color:'var(--txt3)',marginLeft:'.2rem'}}>Novelty</span>
          </div>
        </div>

        {[
          ['Van de dang mo', t.problem, 'ae'],
          ['State of the Art', t.state_of_art, 'ai'],
          ['Huong nghien cuu de xuat', t.proposed, 'as'],
          ['Research Gap', t.gap, 'aw'],
        ].map(([label, content, cls])=>(
          <div key={label} style={{marginBottom:'.8rem'}}>
            <div style={{fontSize:'.68rem',color:'var(--txt3)',fontFamily:'var(--fm)',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:'.35rem'}}>{label}</div>
            <div className={`alert ${cls}`} style={{fontSize:'.85rem',lineHeight:1.65}}>{content}</div>
          </div>
        ))}

        <div style={{marginTop:'1rem'}}>
          <div style={{fontSize:'.68rem',color:'var(--txt3)',fontFamily:'var(--fm)',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:'.5rem'}}>Key References</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'.35rem'}}>
            {t.refs.map(r=><span key={r} className="tag">{r}</span>)}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fu">
      <div className="page-hdr">
        <h1><span className="gt">De tai NCKH</span></h1>
        <p>{RESEARCH_TOPICS.length} de tai — Open problems va huong nghien cuu moi nhat the gioi</p>
      </div>

      <div className="tabs" style={{marginBottom:'1rem'}}>
        {LEVELS.map(l=><button key={l} className={`tab${lv===l?' on':''}`} onClick={()=>setLv(l)}>{l==='all'?`Tat ca (${RESEARCH_TOPICS.length})`:l}</button>)}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(280px,100%),1fr))',gap:'.7rem'}}>
        {list.map(t=>(
          <div key={t.id} className="card card-a" onClick={()=>setSel(t.id)} style={{padding:'1.05rem',borderColor:`${t.color}18`}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'.45rem',flexWrap:'wrap',gap:'.35rem'}}>
              <span className="badge" style={{fontSize:'.6rem',background:`${t.color}0e`,color:t.color,border:`1px solid ${t.color}22`}}>{t.level}</span>
              <div style={{display:'flex',gap:'.2rem'}}>
                {[...Array(5)].map((_,i)=><div key={i} style={{width:8,height:8,borderRadius:2,background:i<t.difficulty?'var(--r)':'var(--brd)'}}/>)}
              </div>
            </div>
            <h3 style={{fontWeight:700,fontSize:'.88rem',color:'var(--txt)',marginBottom:'.3rem',lineHeight:1.35}}>{t.title}</h3>
            <p style={{fontSize:'.79rem',color:'var(--txt3)',lineHeight:1.5,marginBottom:'.65rem'}}>{t.problem.slice(0,120)}...</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:'.25rem'}}>{t.refs.slice(0,3).map(r=><span key={r} className="tag">{r}</span>)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
