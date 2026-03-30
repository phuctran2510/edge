import { RESOURCES } from '../data/content'
export default function Resources() {
  return (
    <div className="fu">
      <div className="page-hdr"><h1><span className="gt">Tai lieu</span></h1><p>Papers, tools, courses, benchmarks cho Edge AI Security</p></div>
      <div style={{display:'flex',flexDirection:'column',gap:'1.8rem'}}>
        {RESOURCES.map(sec=>(
          <div key={sec.cat}>
            <div style={{display:'flex',alignItems:'center',gap:'.6rem',marginBottom:'.75rem',borderBottom:'1px solid var(--brd)',paddingBottom:'.4rem'}}>
              <div style={{width:3,height:16,background:sec.color,borderRadius:2,flexShrink:0}}/>
              <h2 style={{fontSize:'.92rem',fontWeight:700,color:'var(--txt)',fontFamily:'var(--fd)'}}>{sec.cat}</h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(260px,100%),1fr))',gap:'.6rem'}}>
              {sec.items.map(item=>(
                <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="card card-a" style={{padding:'.95rem 1rem',textDecoration:'none',display:'block',borderColor:`${sec.color}18`}}>
                  <div style={{fontWeight:600,color:sec.color,fontSize:'.84rem',marginBottom:'.25rem',lineHeight:1.35}}>{item.name}</div>
                  <div style={{fontSize:'.78rem',color:'var(--txt2)',lineHeight:1.55}}>{item.desc}</div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
