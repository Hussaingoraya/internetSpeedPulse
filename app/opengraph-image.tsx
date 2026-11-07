import { ImageResponse } from 'next/og';

export const alt = 'InternetSpeed Pulse — Internet speed test and Wi-Fi guides';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',background:'#1c2330',padding:80,color:'#f8f9f5'}}>
      <div style={{display:'flex',fontSize:28,color:'#c5ef7b',marginBottom:40}}>INTERNETSPEED PULSE</div>
      <div style={{display:'flex',fontSize:76,fontWeight:700}}>Know your connection.</div>
      <div style={{display:'flex',fontSize:32,marginTop:32}}>Download · Upload · Latency · Wi-Fi guides</div>
      <div style={{display:'flex',fontSize:25,color:'#c5ef7b',marginTop:55}}>internetspeedpulse.online</div>
    </div>, size,
  );
}
