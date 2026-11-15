'use client';
import {useState,useRef,useEffect,useCallback} from 'react';
import Link from 'next/link';
import {ArrowDown,ArrowUp,Activity,Radio,ArrowUpRight,Copy,Check,Zap,UserRound,Server,Download,X} from 'lucide-react';
import {usePreferences} from './Preferences';
import {servers,speedUnits,displaySpeed,type SpeedUnit,readHistory,historyKey,downloadCSV,type TestResult,type ServerId} from '@/lib/test-config';
import {runMeasurement,type Phase} from '@/lib/measure';
import TransferChart,{type TransferPoint} from './TransferChart';
import AnimatedSpeedometer from './AnimatedSpeedometer';
const blank:TestResult={download:null,upload:null,ping:null,jitter:null,date:''};
import en from '@/src/i18n/dictionaries/en';
import type {Dictionary} from '@/src/i18n/dictionaries/types';
import {direction,type Locale} from '@/src/i18n/locales';

type Connection={isp:string|null;asn:number|null};
export default function SpeedTest({locale='en',dictionary=en}:{locale?:Locale;dictionary?:Dictionary}={}) {
 const {prefs,setPrefs}=usePreferences();
 const [startLabel,stopLabel,again,ready,connecting,latency,download,upload,complete,stopped,errorLabel,downLabel,upLabel,idle,jitter,loadedDown,loadedUp,provider,refresh,detectingLabel,unavailable,serverLabel,change,automatic,single,multi,copyLabel,copiedLabel,csv,history,remember,data]=dictionary.test;
 const phaseLabels={ready,connecting,latency,download,upload,complete,stopped,error:errorLabel};
 const {nav}=dictionary;
 const [result,setResult]=useState<TestResult>(blank),[running,setRunning]=useState(false),[phase,setPhase]=useState<Phase|'ready'|'complete'|'stopped'|'error'>('ready'),[save,setSave]=useState(false),[message,setMessage]=useState(''),[copied,setCopied]=useState(false),[showServers,setShowServers]=useState(false),[connection,setConnection]=useState<Connection|null>(null),[detecting,setDetecting]=useState(false),[detected,setDetected]=useState(false);
 const [progress,setProgress]=useState(0),[points,setPoints]=useState<TransferPoint[]>([]);
 const controller=useRef<AbortController|null>(null),detectController=useRef<AbortController|null>(null),runId=useRef(0),saveRef=useRef(false),dialog=useRef<HTMLDialogElement>(null),serverTrigger=useRef<HTMLButtonElement>(null);const selected=prefs.server==='auto'?{name:result.server||automatic}:servers.find(s=>s.id===prefs.server)!;
 useEffect(()=>{try{setSave(localStorage.getItem('pulse-save')==='true');saveRef.current=localStorage.getItem('pulse-save')==='true';}catch{}return()=>{runId.current++;controller.current?.abort();detectController.current?.abort();detectController.current=null;};},[]);
 useEffect(()=>{if(showServers&&!dialog.current?.open)dialog.current?.showModal();if(!showServers&&dialog.current?.open)dialog.current?.close();},[showServers]);
 useEffect(()=>{if(!running){setResult(blank);setPhase('ready');setMessage('');setProgress(0);setPoints([]);}},[prefs.server,prefs.mode]);
 async function start(){if(running||controller.current)return;const id=++runId.current;const control=new AbortController();controller.current=control;setRunning(true);setResult(blank);setMessage('');setProgress(0);setPoints([]);setPhase('connecting');try{const completed=await runMeasurement({serverId:prefs.server,mode:prefs.mode,signal:control.signal,onPhase:p=>{if(runId.current===id)setPhase(p);},onUpdate:r=>{if(runId.current===id)setResult(old=>({...old,...r}));},onProgress:p=>{if(runId.current===id){setProgress(p.fraction);if(p.mbps!==null)setPoints(old=>[...old,{phase:p.phase,fraction:p.fraction,mbps:p.mbps!}].slice(-160));}}});if(runId.current!==id)return;setResult(completed);setPhase('complete');if(saveRef.current){try{localStorage.setItem(historyKey,JSON.stringify([completed,...readHistory()].slice(0,10)));}catch{setMessage(locale==='en'?'Your test completed, but browser storage is unavailable.':complete);}}}catch(error){if(runId.current!==id)return;control.abort();setPhase('error');setMessage(locale==='en'&&error instanceof Error?`${error.message} Try again, or select the other measurement server.`:errorLabel);}finally{if(controller.current===control)controller.current=null;if(runId.current===id)setRunning(false);}}
 function stop(){runId.current++;controller.current?.abort();controller.current=null;setRunning(false);setPhase('stopped');setMessage(locale==='en'?'The test was stopped. Partial results are not saved or exported.':stopped);}
 const detect=useCallback(async()=>{
  detectController.current?.abort();
  const request=new AbortController();
  detectController.current=request;
  setDetecting(true);
  const timeout=setTimeout(()=>request.abort(),1950);
  try{
   const response=await fetch('/api/isp/',{cache:'no-store',signal:request.signal});
   if(!response.ok)throw new Error('Provider lookup unavailable');
   const data=await response.json() as Partial<Connection>;
   if(detectController.current===request)setConnection({
    isp:typeof data.isp==='string'?data.isp:null,
    asn:typeof data.asn==='number'?data.asn:null,
   });
  }catch{
   if(detectController.current===request)setConnection(null);
  }finally{
   clearTimeout(timeout);
   if(detectController.current===request){setDetecting(false);setDetected(true);}
  }
 },[]);
 useEffect(()=>{void detect();},[detect]);
 function toggle(){const next=!save;setSave(next);saveRef.current=next;try{localStorage.setItem('pulse-save',String(next));if(!next)localStorage.removeItem(historyKey);}catch{setMessage(locale==='en'?'Your browser blocked local storage. Results will not persist.':unavailable);}}
 const num=(n:number|null,bandwidth=false)=>n===null?'—':(bandwidth?displaySpeed(n,prefs.unit):n).toFixed(1);
 async function copy(){try{await navigator.clipboard.writeText(`InternetSpeed Pulse\n ${downLabel}: ${result.download?.toFixed(2)} Mbps\n${upLabel}: ${result.upload?.toFixed(2)} Mbps\n${idle}: ${num(result.ping)} ms\n${jitter}: ${num(result.jitter)} ms\n${serverLabel}: ${result.server}\n${result.mode==='single'?single:multi}\n${result.date}`);setCopied(true);setTimeout(()=>setCopied(false),2000);}catch{setMessage(locale==='en'?'Clipboard is unavailable. Use Download CSV to keep this result.':csv);}}
 const metrics=[{key:'download',icon:ArrowDown},{key:'upload',icon:ArrowUp},{key:'ping',icon:Activity},{key:'jitter',icon:Radio}] as const;const display=phase==='upload'?result.upload:result.download;const completed=phase==='complete';
 useEffect(()=>{const pause=()=>{if(document.hidden&&controller.current){runId.current++;controller.current.abort();controller.current=null;setRunning(false);setPhase('stopped');setMessage(locale==='en'?'Test stopped because this tab was hidden. Keep the tab visible for reliable timings. Partial results are not saved.':stopped);}};document.addEventListener('visibilitychange',pause);return()=>document.removeEventListener('visibilitychange',pause);},[]);
 const resultHeading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{if(completed)resultHeading.current?.focus({preventScroll:true});},[completed]);
 const labels=[downLabel,upLabel,idle,jitter];
 return <div className="test-experience" lang={locale} dir={direction(locale)}>
  <p className="data-warning" id="test-data-warning">ⓘ {data} <Link href="/methodology/">{nav[3]}</Link></p>
  <section className={completed?"test-panel test-panel-complete":"test-panel"} aria-label={nav[1]}>
   <div className="panel-top"><span><i className={running?'status-dot active':'status-dot'}/>{nav[1]}</span><span className="powered"><Zap size={13}/>{serverLabel} · <bdi>{selected.name}</bdi></span></div>
   {completed?<header className="test-result-header">
    <div className="test-result-title">
     <span className="test-result-check"><Check size={22} aria-hidden="true"/></span>
     <h2 ref={resultHeading} tabIndex={-1}>{complete}</h2>
    </div>
    <button type="button" className="test-result-retest" aria-describedby="test-data-warning" onClick={start}>{again}<ArrowUpRight size={17} aria-hidden="true"/></button>
   </header>:<div className="test-main">
    <AnimatedSpeedometer value={display} unit={prefs.unit} phase={phase} running={running} stage={phaseLabels[phase]} locale={locale}/>
    <div className="start-area">
     <span className="phase" role="status" aria-live="polite">{phaseLabels[phase]}</span>
     {phase==='error'&&message&&<p role="alert">{message}</p>}
     {running&&<progress className="test-progress" value={progress} max={1} aria-label={phaseLabels[phase]}/>}
     <button className="start-button" aria-describedby="test-data-warning" onClick={running?stop:start}>{running?stopLabel:startLabel}<ArrowUpRight size={20}/></button>
    </div>
   </div>}
   <div className="metrics">{metrics.map((m,i)=><div className="metric" key={m.key}><span><m.icon size={16}/>{labels[i]}</span><strong>{num(result[m.key],i<2)}<small>{result[m.key]===null?'':i<2?prefs.unit:'ms'}</small></strong></div>)}</div>
   {(running||completed)&&<TransferChart points={points} labels={[downLabel,upLabel]}/>}
   <div className="latency-comparison">
    <span>{idle} <strong><bdi>{num(result.ping)} ms</bdi></strong></span>
    <span><ArrowDown size={13}/>{loadedDown} <strong><bdi>{num(result.downloadLatency??null)} ms</bdi></strong></span>
    <span><ArrowUp size={13}/>{loadedUp} <strong><bdi>{num(result.uploadLatency??null)} ms</bdi></strong></span>
   </div>
   <div className="connection-panel">
    <div className="connection-item"><span className="connection-icon"><UserRound size={20}/></span><div>
     <span className="connection-label">{provider}</span>
     <strong><bdi>{connection?.isp||(connection?.asn?`AS${connection.asn}`:detected&&!detecting?unavailable:detectingLabel)}</bdi></strong>
     <button className="panel-link" disabled={detecting||running} onClick={detect}>{refresh}</button>
    </div></div>
    <div className="connection-item"><span className="connection-icon"><Server size={20}/></span><div>
     <span className="connection-label">{serverLabel}</span><strong><bdi>{selected.name}</bdi></strong>
     <button ref={serverTrigger} className="panel-link" disabled={running} onClick={()=>setShowServers(true)}>{change} <ArrowUpRight size={13}/></button>
    </div></div>
   </div>
   <div className="connection-mode"><div className="segmented-control" role="group" aria-label={`${single} / ${multi}`}>
    <button disabled={running} aria-pressed={prefs.mode==='multi'} onClick={()=>setPrefs({mode:'multi'})}>{multi}<small>4</small></button>
    <button disabled={running} aria-pressed={prefs.mode==='single'} onClick={()=>setPrefs({mode:'single'})}>{single}<small>1</small></button>
   </div><select aria-label="Mbps / Kbps / MB/s" value={prefs.unit} onChange={event=>setPrefs({unit:event.target.value as SpeedUnit})} className="speed-unit-select">
    {speedUnits.map(unit=><option key={unit} value={unit}>{unit}</option>)}
   </select></div>
   {completed&&<div className="result-actions test-result-actions">
    <button type="button" onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>} {copied?copiedLabel:copyLabel}</button>
    <button type="button" onClick={()=>downloadCSV([result])}><Download size={16}/>{csv}</button>
   </div>}
   <div className="test-bottom"><Link href="/methodology/">{nav[3]}<ArrowUpRight size={13}/></Link></div>
  </section>
  <div className="test-disclosure"><p><Link href="/privacy/">{nav[5]}</Link></p></div>
  {message&&phase!=='error'&&<p className="notice" role="status">{message}</p>}
  {completed&&locale==='en'&&<nav className="result-guides" aria-label="Speed test troubleshooting guides">
   <Link href="/blog/how-to-test-internet-speed/">How to retest your internet speed <ArrowUpRight size={13} aria-hidden="true"/></Link>
   <Link href="/blog/why-is-my-wifi-so-slow/">Compare Wi-Fi and Ethernet speeds <ArrowUpRight size={13} aria-hidden="true"/></Link>
  </nav>}
  <div className="history-controls"><label><input type="checkbox" checked={save} onChange={toggle}/>{remember}</label></div>
  <p className="engine-credit"><a href="/vendor/librespeed/speedtest_worker.js">LibreSpeed</a> · <a href="/vendor/librespeed/LICENSE.txt">LGPLv3</a> · <a href="/vendor/librespeed/GPL-3.0.txt">GPLv3</a></p>
  <Link href="/history/" className="history-link">{history} ↗</Link>
  <dialog ref={dialog} className="server-dialog" onCancel={()=>setShowServers(false)} onClose={()=>{setShowServers(false);serverTrigger.current?.focus();}} aria-labelledby="server-title">
   <div className="dialog-heading"><h2 id="server-title">{change}</h2><button className="icon-button" aria-label={dictionary.extras[2]} onClick={()=>setShowServers(false)}><X size={21}/></button></div>
   <div className="server-options">{[{id:'auto',name:automatic},...servers].map(s=><button key={s.id} className={prefs.server===s.id?'server-option chosen':'server-option'} aria-pressed={prefs.server===s.id} onClick={()=>{setPrefs({server:s.id as ServerId});setResult(blank);setPhase('ready');setShowServers(false);}}>
    {s.id==='auto'?<Zap size={22}/>:<Server size={22}/>}<span><strong><bdi>{s.name}</bdi></strong>{locale==='en'&&'region' in s&&<small>{s.region}</small>}</span>{prefs.server===s.id&&<Check size={20}/>}
   </button>)}</div>
   <Link className="text-link" href="/servers/" onClick={()=>setShowServers(false)}>{serverLabel} ↗</Link>
  </dialog>
 </div>;
}
