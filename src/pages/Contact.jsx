import { INSTRUCTOR } from '../data/content'
export default function Contact() {
  return (
    <div className="fu">
      <div className="page-hdr"><h1><span className="gt">Lien he GV</span></h1></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(min(300px,100%),1fr))',gap:'1.1rem',maxWidth:760}}>
        <div className="card" style={{padding:'1.5rem',borderColor:'rgba(255,56,96,.22)',background:'rgba(255,56,96,.025)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'.95rem',marginBottom:'1.2rem'}}>
            <div style={{width:52,height:52,borderRadius:12,background:'linear-gradient(135deg,var(--r),var(--p))',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:'1.1rem',color:'#fff',flexShrink:0,fontFamily:'var(--fm)'}}>{INSTRUCTOR.avatar}</div>
            <div>
              <div style={{fontFamily:'var(--fd)',fontWeight:800,fontSize:'.98rem',color:'var(--txt)'}}>{INSTRUCTOR.name}</div>
              <div style={{fontSize:'.76rem',color:'var(--txt3)',marginTop:'.08rem'}}>{INSTRUCTOR.dept}</div>
              <div style={{fontSize:'.74rem',color:'var(--c)',marginTop:'.04rem'}}>{INSTRUCTOR.uni}</div>
            </div>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
            <a href={`mailto:${INSTRUCTOR.email}`} className="btn btn-o" style={{justifyContent:'flex-start',fontSize:'.82rem'}}>{INSTRUCTOR.email}</a>
            <a href={`tel:${INSTRUCTOR.phone}`} className="btn btn-s" style={{justifyContent:'flex-start',fontSize:'.82rem'}}>{INSTRUCTOR.phone}</a>
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card" style={{padding:'1.2rem'}}>
            <div style={{fontSize:'.65rem',color:'var(--txt3)',fontFamily:'var(--fm)',textTransform:'uppercase',letterSpacing:'.07em',marginBottom:'.6rem'}}>Mon hoc</div>
            <p style={{fontSize:'.85rem',color:'var(--txt2)',lineHeight:1.65}}>Bao Mat Edge AI & Federated Learning — Chuyen de nang cao, Khoa CNTT, DH Da Lat</p>
          </div>
          <div className="alert ai" style={{margin:0,fontSize:'.83rem'}}>Email: ghi ro Ten, MSSV, Mon hoc. Ke theo van de cu the de duoc ho tro nhanh.</div>
          <div className="alert ap" style={{margin:0,fontSize:'.83rem'}}>NCKH: Chuan bi 1 trang tom tat y tuong truoc khi gap GV. Uu tien huong Open Problem va Moi noi.</div>
        </div>
      </div>
    </div>
  )
}
