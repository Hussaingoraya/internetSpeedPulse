'use client';
import {useEffect,useId,useMemo,useRef,useState,type CSSProperties} from 'react';
import {ArrowDown,ArrowUp,Check,Radio} from 'lucide-react';
import {type Phase} from '@/lib/measure';

type MeterPhase=Phase|'ready'|'complete'|'stopped'|'error';
type Props={value:number|null;unit:'Mbps'|'MB/s';phase:MeterPhase;running:boolean;language:'en'|'ar'};
const marks=[0,5,10,50,100,250,500,750,1000];
function position(fraction:number,radius:number){const angle=(135+fraction*270)*Math.PI/180;return {x:210+Math.cos(angle)*radius,y:190+Math.sin(angle)*radius};}
function fractionFor(value:number,max:number){const scaled=value/max*1000;if(scaled<=0)return 0;if(scaled>=1000)return 1;const i=marks.findIndex(n=>n>=scaled);return ((i-1)+(scaled-marks[i-1])/(marks[i]-marks[i-1]))/(marks.length-1);}
function short(value:number){return value>=1000?`${Number((value/1000).toFixed(1))}k`:Number(value.toFixed(1)).toString();}
export default function AnimatedSpeedometer({value,unit,phase,running,language}:Props){
 const id=useId().replaceAll(':','');const reduced=useRef(false);const target=useRef(0);const motion=useRef(0);const lastFrame=useRef<number|null>(null);const [shown,setShown]=useState(0);const [max,setMax]=useState(1000);const [motionPreference,setMotionPreference]=useState<'on'|'off'>('on');
 const converted=value===null?null:unit==='MB/s'?value/8:value;const upload=phase==='upload';const waiting=running&&(phase==='connecting'||phase==='latency'||converted===null||converted===0);const arabic=language==='ar';
 const reduceMotion=motionPreference==='off';reduced.current=reduceMotion;
 useEffect(()=>{try{const saved=localStorage.getItem('pulse-meter-motion');if(saved==='off'||(!saved&&window.matchMedia('(prefers-reduced-motion: reduce)').matches))setMotionPreference('off');}catch{}},[]);
 useEffect(()=>{if(phase==='ready'||phase==='connecting')setMax(1000);if(converted!==null&&converted>max)setMax(converted<=5000?5000:1000*Math.pow(10,Math.ceil(Math.log10(converted/1000))));},[converted,phase,max]);
 useEffect(()=>{target.current=converted??0;let frame=0;lastFrame.current=null;const tick=(time:number)=>{if(reduced.current){motion.current=target.current;setShown(target.current);return;}const elapsed=lastFrame.current===null?16:Math.min(64,time-lastFrame.current);lastFrame.current=time;motion.current+=(target.current-motion.current)*(1-Math.exp(-elapsed/110));if(Math.abs(target.current-motion.current)<.025){motion.current=target.current;setShown(target.current);return;}setShown(motion.current);frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame);},[converted,reduceMotion]);
 const fraction=fractionFor(shown,max);const angle=-135+fraction*270;const start=position(0,166),end=position(1,166);const path=`M ${start.x} ${start.y} A 166 166 0 1 1 ${end.x} ${end.y}`;
 const ticks=useMemo(()=>Array.from({length:81},(_,i)=>{const f=i/80;return {f,major:i%10===0,start:position(f,i%10===0?145:151),end:position(f,157)};}),[]);
 const stage=phase==='complete'?(arabic?'اكتمل الاختبار':'TEST COMPLETE'):phase==='stopped'?(arabic?'تم الإيقاف':'TEST STOPPED'):phase==='error'?(arabic?'غير مكتمل':'INCOMPLETE'):upload?(arabic?'قياس الرفع':'LIVE UPLOAD'):phase==='download'?(arabic?'قياس التنزيل':'LIVE DOWNLOAD'):phase==='latency'?(arabic?'زمن الاستجابة':'CHECKING LATENCY'):phase==='connecting'?(arabic?'جارٍ الاتصال':'FINDING YOUR CONNECTION'):(arabic?'جاهز للاختبار':'READY TO CONNECT');
 const label=value===null?'—':`${converted!.toFixed(1)} ${unit}`;const Icon=phase==='complete'?Check:upload?ArrowUp:running?ArrowDown:Radio;
 return <div className={`animated-meter ${upload?'meter-upload':'meter-download'} ${running?'meter-running':''} ${waiting?'meter-waiting':''} ${phase==='complete'?'meter-complete':''}`} data-motion={reduceMotion?'off':'on'} style={{'--meter-angle':`${angle}deg`,'--meter-fill':fraction} as CSSProperties} role="group" aria-label={`${stage}: ${label}`}>
  <div className="meter-aura" aria-hidden="true"/>
  <svg className="meter-dial" viewBox="0 0 420 370" aria-hidden="true">
   <defs>
    <linearGradient id={`${id}-arc`} x1="40" y1="310" x2="355" y2="30" gradientUnits="userSpaceOnUse"><stop stopColor={upload?'#8771ff':'#129dff'}/><stop offset=".55" stopColor={upload?'#b78aff':'#27e4e7'}/><stop offset="1" stopColor={upload?'#f0b8ff':'#82ffdb'}/></linearGradient>
    <linearGradient id={`${id}-needle`} x1="210" y1="65" x2="210" y2="211" gradientUnits="userSpaceOnUse"><stop stopColor="#ffffff"/><stop offset=".6" stopColor={upload?'#d2baff':'#a6fff2'}/><stop offset="1" stopColor={upload?'#aa80ff':'#40dedb'} stopOpacity=".1"/></linearGradient>
    <radialGradient id={`${id}-face`}><stop stopColor={upload?'#a78bfa':'#22d3ee'} stopOpacity=".1"/><stop offset="1" stopColor="#192330" stopOpacity="0"/></radialGradient>
    <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
   </defs>
   <circle cx="210" cy="190" r="147" fill={`url(#${id}-face)`}/>
   <path d={path} className="meter-track" fill="none" strokeWidth="19" strokeLinecap="round"/>
   <path d={path} className="meter-arc-glow" fill="none" stroke={`url(#${id}-arc)`} strokeWidth="12" strokeLinecap="round" pathLength="100" strokeDasharray={`${fraction*100} 100`} filter={`url(#${id}-glow)`}/>
   <path d={path} className="meter-arc" fill="none" stroke={`url(#${id}-arc)`} strokeWidth="19" strokeLinecap="round" pathLength="100" strokeDasharray={`${fraction*100} 100`}/>
   <path d={path} className="meter-loading-arc" fill="none" stroke={`url(#${id}-arc)`} strokeWidth="19" strokeLinecap="round" pathLength="100" strokeDasharray="13 87"/>
   <path d={`M ${position(0,137).x} ${position(0,137).y} A 137 137 0 1 1 ${position(1,137).x} ${position(1,137).y}`} fill="none" stroke="#687889" strokeOpacity=".18" strokeWidth="1"/>
   {ticks.map((tick,i)=><line key={i} x1={tick.start.x} y1={tick.start.y} x2={tick.end.x} y2={tick.end.y} className={`meter-tick ${tick.major?'major':''} ${tick.f<=fraction&&value!==null?'lit':''}`} strokeWidth={tick.major?1.8:1} strokeLinecap="round"/>)}
   {marks.map((mark,i)=>{const point=position(i/8,128);return <text key={mark} x={point.x} y={point.y} dy=".35em" textAnchor="middle" className="meter-scale">{short(mark*max/1000)}</text>;})}
   <g className="meter-needle" style={{transformOrigin:'210px 190px',transform:`rotate(${angle}deg)`}}>
    <path d="M 206 196 L 207.8 92 Q 210 82 212.2 92 L 214 196 Z" fill={`url(#${id}-needle)`}/>
    <path d="M 210 190 L 210 93" stroke="#fff" strokeWidth=".8" opacity=".75"/>
   </g>
   <circle cx="210" cy="190" r="12" className="meter-hub-outer"/><circle cx="210" cy="190" r="5" className="meter-hub"/>
  </svg>
  <div className="meter-readout" aria-hidden="true"><span className="meter-stage"><i/>{stage}</span><strong>{waiting||value===null?'—':shown.toFixed(1)}</strong><span className="meter-unit"><Icon size={15}/>{unit}</span></div>
  <button className="meter-motion-toggle" aria-pressed={!reduceMotion} onClick={()=>{const next=reduceMotion?'on':'off';setMotionPreference(next);try{localStorage.setItem('pulse-meter-motion',next);}catch{}}}>{reduceMotion?(arabic?'تفعيل الحركة':'Enable animation'):(arabic?'تقليل الحركة':'Reduce motion')}</button>
 </div>;
}
