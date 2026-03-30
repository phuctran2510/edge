import { useState } from 'react'
import { QUIZ } from '../data/content'
const CATS = ['all',...new Set(QUIZ.map(q=>q.cat))]
export default function Quiz() {
  const [cat,setCat]=useState('all'), [idx,setIdx]=useState(0), [ch,setCh]=useState({}), [mode,setMode]=useState('browse'), [score,setScore]=useState(null)
  const pool = cat==='all' ? QUIZ : QUIZ.filter(q=>q.cat===cat)
  const q = pool[idx]
  const pick=(qi,j)=>{ if(ch[qi]!==undefined)return; setCh(p=>({...p,[qi]:j})) }

  if(mode==='test'&&score===null) return (
    <div className="fu">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1rem',flexWrap:'wrap',gap:'.5rem'}}>
        <h1 style={{fontSize:'1.1rem'}}><span className="gt">Kiem tra</span> — {pool.length} cau</h1>
        <button className="btn btn-s" onClick={()=>{setMode('browse');setCh({});setIdx(0)}}>Thoat</button>
      </div>
      <div className="prog" style={{marginBottom:'1.1rem'}}><div className="prog-f" style={{width:`${Object.keys(ch).length/pool.length*100}%`}}/></div>
      {pool.map((qq,i)=>(
        <div key={qq.id} className="card" style={{padding:'1.05rem',marginBottom:'.65rem'}}>
          <div style={{fontSize:'.72rem',color:'var(--txt3)',marginBottom:'.32rem'}}>Câu {i+1} · {qq.cat}</div>
          <p style={{fontWeight:600,color:'var(--txt)',fontSize:'.88rem',marginBottom:'.65rem',lineHeight:1.55}}>{qq.q}</p>
          {qq.opts.map((opt,j)=>{const done=ch[i]!==undefined,sel=ch[i]===j,right=qq.ans===j;return(
            <div key={j} onClick={()=>pick(i,j)} className={`qopt${done&&right?' qr':done&&sel&&!right?' qw':''}`} style={{opacity:done&&!right&&!sel?.5:1}}>
              <div style={{width:22,height:22,borderRadius:'50%',border:'1.5px solid currentColor',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',fontFamily:'var(--fm)',fontWeight:700,flexShrink:0}}>{done&&right?'v':done&&sel?'x':['A','B','C','D'][j]}</div>
              {opt}
            </div>
          )})}
          {ch[i]!==undefined&&<div className="alert as" style={{marginTop:'.55rem',fontSize:'.81rem'}}>{qq.exp}</div>}
        </div>
      ))}
      <div style={{display:'flex',justifyContent:'center',padding:'1rem 0'}}>
        <button className="btn btn-r" disabled={Object.keys(ch).length<pool.length} onClick={()=>setScore(pool.filter((_,i)=>ch[i]===pool[i].ans).length)}>Nộp bài ({Object.keys(ch).length}/{pool.length})</button>
      </div>
    </div>
  )
  if(mode==='test'&&score!==null){const pct=Math.round(score/pool.length*100);return(
    <div className="fu" style={{textAlign:'center',padding:'3.5rem 1rem'}}>
      <div style={{fontFamily:'var(--fm)',fontSize:'2rem',fontWeight:800,color:pct>=80?'var(--g)':pct>=60?'var(--y)':'var(--r)',marginBottom:'.4rem'}}>{score}/{pool.length}</div>
      <div style={{color:'var(--txt2)',marginBottom:'1.5rem'}}>{pct}% — {pct>=80?'Xuat sac!':pct>=60?'Kha tot!':'Can on them!'}</div>
      <div style={{display:'flex',gap:'.6rem',justifyContent:'center'}}>
        <button className="btn btn-r" onClick={()=>{setCh({});setScore(null);setMode('test')}}>Lam lai</button>
        <button className="btn btn-s" onClick={()=>{setCh({});setScore(null);setMode('browse');setIdx(0)}}>Về browse</button>
      </div>
    </div>
  )}
  if(!q)return null
  return(
    <div className="fu">
      <div className="page-hdr"><h1><span className="gt">Trắc nghiệm</span></h1><p>{QUIZ.length} cau — Adversarial ML, FL, Blockchain, HE, FPGA Security</p></div>
      <div style={{display:'flex',gap:'.45rem',flexWrap:'wrap',marginBottom:'1rem',alignItems:'center'}}>
        <select value={cat} onChange={e=>{setCat(e.target.value);setIdx(0);setCh({})}} style={{padding:'.38rem .65rem',background:'var(--sur)',border:'1px solid var(--brd)',color:'var(--txt)',borderRadius:6,fontSize:'.81rem'}}>
          {CATS.map(c=><option key={c} value={c}>{c==='all'?`Tất cả (${QUIZ.length})`:c}</option>)}
        </select>
        <button className="btn btn-r" onClick={()=>{setCh({});setScore(null);setMode('test')}}>Bắt đầu kiểm tra ({pool.length})</button>
      </div>
      <div style={{fontSize:'.74rem',color:'var(--txt3)',marginBottom:'.65rem'}}>Cau {idx+1}/{pool.length} · {q.cat}</div>
      <div className="prog" style={{marginBottom:'.9rem'}}><div className="prog-f" style={{width:`${(idx+1)/pool.length*100}%`}}/></div>
      <div className="card" style={{padding:'1.2rem',marginBottom:'.9rem'}}>
        <p style={{fontWeight:600,color:'var(--txt)',fontSize:'.9rem',lineHeight:1.6,marginBottom:'.9rem'}}>{q.q}</p>
        {q.opts.map((opt,j)=>{const done=ch[idx]!==undefined,sel=ch[idx]===j,right=q.ans===j;return(
          <div key={j} onClick={()=>pick(idx,j)} className={`qopt${done&&right?' qr':done&&sel&&!right?' qw':sel?' qs':''}`} style={{opacity:done&&!right&&!sel?.5:1}}>
            <div style={{width:22,height:22,borderRadius:'50%',border:'1.5px solid currentColor',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'.7rem',fontFamily:'var(--fm)',fontWeight:700,flexShrink:0}}>{done&&right?'v':done&&sel?'x':['A','B','C','D'][j]}</div>
            {opt}
          </div>
        )})}
        {ch[idx]!==undefined&&<div className="alert as" style={{marginTop:'.7rem',fontSize:'.83rem'}}><strong>Giải thích:</strong> {q.exp}</div>}
      </div>
      <div style={{display:'flex',justifyContent:'space-between',gap:'.5rem'}}>
        <button className="btn btn-s" disabled={idx===0} onClick={()=>setIdx(i=>i-1)}>Câu trước</button>
        <button className="btn btn-o" disabled={idx===pool.length-1} onClick={()=>setIdx(i=>i+1)}>Câu tiếp</button>
      </div>
    </div>
  )
}
