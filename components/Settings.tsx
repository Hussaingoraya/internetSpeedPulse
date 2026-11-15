'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {Check,Search,Server,X} from 'lucide-react';
import {dateFormats,usePreferences,type Preferences} from './Preferences';
import {historyKey,servers,speedUnits,type ServerId,type SpeedUnit,type TestMode} from '@/lib/test-config';

export default function Settings() {
 const {prefs,setPrefs}=usePreferences();
 const dialog=useRef<HTMLDialogElement>(null);
 const trigger=useRef<HTMLButtonElement>(null);
 const [query,setQuery]=useState('');
 const [provider,setProvider]=useState<string|null>(null);
 const [lookingUp,setLookingUp]=useState(true);
 const [saved,setSaved]=useState(false);
 const [storageError,setStorageError]=useState(false);
 const selected=servers.find(server=>server.id===prefs.server);
 const matching=servers.filter(server=>[server.name,server.region,server.description].join(' ').toLowerCase().includes(query.trim().toLowerCase()));

 useEffect(()=>{
  try{setSaved(localStorage.getItem('pulse-save')==='true');}catch{}
  const controller=new AbortController();
  const signal=AbortSignal.any([controller.signal,AbortSignal.timeout(1950)]);
  async function lookup() {
   try{
    const result=await fetch('/api/isp/',{signal,cache:'no-store'});
    if(!result.ok)return;
    const data=await result.json();
    if(!controller.signal.aborted)setProvider(data.isp||(data.asn?`AS${data.asn}`:null));
   }catch{}finally{if(!controller.signal.aborted)setLookingUp(false);}
  }
  void lookup();
  return ()=>controller.abort();
 },[]);

 function selectServer(server:ServerId) {
  setPrefs({server});
  dialog.current?.close();
 }
 function toggleHistory(enabled:boolean) {
  try{
   if(!enabled)localStorage.removeItem(historyKey);
   localStorage.setItem('pulse-save',String(enabled));
   setSaved(enabled);
   setStorageError(false);
  }catch{setStorageError(true);}
 }

 return <>
  <div className="settings-grid">
   <section className="settings-card">
    <h2>Global settings</h2>
    <label>Time format<select value={prefs.clock} onChange={e=>setPrefs({clock:e.target.value as Preferences['clock']})}><option value="12">12-hour</option><option value="24">24-hour</option></select></label>
    <label>Date format<select value={prefs.dateFormat} onChange={e=>setPrefs({dateFormat:e.target.value as Preferences['dateFormat']})}>{dateFormats.map(format=><option key={format}>{format}</option>)}</select></label>
    <label>Distance units<select aria-describedby="settings-distance-note" value={prefs.distance} onChange={e=>setPrefs({distance:e.target.value as Preferences['distance']})}><option value="mi">Miles</option><option value="km">Kilometers</option></select></label>
    <p id="settings-distance-note">Saved for this browser. Distance is unavailable for the current measurement endpoints.</p>
    <label>Speed units<select value={prefs.unit} onChange={e=>setPrefs({unit:e.target.value as SpeedUnit})}>{speedUnits.map(unit=><option key={unit}>{unit}</option>)}</select></label>
    <label>Connection mode<select value={prefs.mode} onChange={e=>setPrefs({mode:e.target.value as TestMode})}><option value="single">Single</option><option value="multi">Multi</option></select></label>
    <div className="settings-server"><strong>Default server</strong><span>{selected?.name||'Automatic'}</span>
     <button ref={trigger} type="button" className="secondary" onClick={()=>{setQuery('');dialog.current?.showModal();}}>Change server</button>
    </div>
   </section>
   <section className="settings-card">
    <h2>Current connection</h2>
    <dl><dt>Internet provider</dt><dd role="status">{lookingUp?'Identifying provider…':provider||'Provider unavailable'}</dd>
     <dt>Measurement server preference</dt><dd>{selected?.name||'Automatic selection'}</dd></dl>
    <p>Automatic selection compares available endpoints when you start a test.</p>
    <Link className="primary" href="/">Go to the speed test ↗</Link>
   </section>
   <section className="settings-card">
    <h2>Your browser</h2>
    <label>Theme<select value={prefs.theme} onChange={e=>setPrefs({theme:e.target.value as Preferences['theme']})}><option value="light">Light</option><option value="dark">Dark</option></select></label>
    <label className="check-label"><input type="checkbox" checked={saved} onChange={e=>toggleHistory(e.target.checked)}/> Remember completed results on this device</label>
    <p>Turning this off clears local results. CSV exports use Mbps and standard timestamps.</p>
    {storageError&&<p role="status">Browser storage is unavailable.</p>}
    <Link className="text-link" href="/history/">View results history ↗</Link>
   </section>
  </div>
  <dialog ref={dialog} className="server-dialog settings-server-dialog" aria-labelledby="settings-server-title" onClose={()=>trigger.current?.focus()}>
   <div className="dialog-heading"><h2 id="settings-server-title">Choose a test server</h2><button type="button" className="icon-button" aria-label="Close server picker" onClick={()=>dialog.current?.close()}><X size={21}/></button></div>
   <button type="button" className="server-option" aria-pressed={prefs.server==='auto'} onClick={()=>selectServer('auto')}><span><strong>Select automatically</strong><small>Compare available endpoints when the test starts</small></span>{prefs.server==='auto'&&<Check size={18}/>}</button>
   <label className="settings-server-search"><span><Search size={16} aria-hidden="true"/> Search servers</span><input type="search" value={query} onChange={e=>setQuery(e.target.value)} /></label>
   <div className="server-options">
    {matching.map(server=><button type="button" className="server-option" key={server.id} aria-pressed={prefs.server===server.id} onClick={()=>selectServer(server.id)}>
     <Server size={20} aria-hidden="true"/><span><strong>{server.name}</strong><small>{server.region}</small></span>{prefs.server===server.id&&<Check size={18}/>}
    </button>)}
    {!matching.length&&<p role="status">No available servers match your search.</p>}
   </div>
   <Link className="text-link" href="/servers/">About the available servers ↗</Link>
  </dialog>
 </>;
}
