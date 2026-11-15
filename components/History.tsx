'use client';
import {useState,useEffect} from 'react';
import Link from 'next/link';
import {Download,Trash2} from 'lucide-react';
import {readHistory,historyKey,downloadCSV,displaySpeed,type TestResult} from '@/lib/test-config';
import {usePreferences,type Preferences} from './Preferences';
function formatResultTime(value:string, prefs:Preferences) {
 const date=new Date(value);
 if(!Number.isFinite(date.getTime()))return '—';
 const month=String(date.getMonth()+1).padStart(2,'0');
 const day=String(date.getDate()).padStart(2,'0');
 const year=date.getFullYear();
 const stamp=prefs.dateFormat==='YYYY-MM-DD'?`${year}-${month}-${day}`:prefs.dateFormat==='DD/MM/YYYY'?`${day}/${month}/${year}`:`${month}/${day}/${year}`;
 return `${stamp} ${new Intl.DateTimeFormat('en',{hour:'numeric',minute:'2-digit',hourCycle:prefs.clock==='24'?'h23':'h12'}).format(date)}`;
}
export default function History(){const [rows,setRows]=useState<TestResult[]>([]),[ready,setReady]=useState(false),[notice,setNotice]=useState('');const {prefs}=usePreferences();useEffect(()=>{setRows(readHistory());setReady(true);},[]);const show=(n:number|null)=>n===null?'—':displaySpeed(n,prefs.unit).toFixed(2);return <section className="results-history"><div className="history-toolbar"><p>Up to ten completed tests, saved only on this browser.</p><div><button className="secondary" disabled={!rows.length} onClick={()=>downloadCSV(rows)}><Download size={16}/> Export CSV</button><button className="secondary" disabled={!rows.length} onClick={()=>{try{localStorage.removeItem(historyKey);setRows([]);setNotice('Saved results cleared from this device.');}catch{setNotice('Your browser could not clear storage.');}}}><Trash2 size={16}/> Clear history</button></div></div>{ready&&!rows.length?<div className="empty-history"><span>01 — START WITH A BASELINE</span><h2>No saved tests yet.</h2><p>Enable “Remember results” on the speed test, then run a complete test. Your results will appear here. No account is needed.</p><Link className="primary" href="/">Run a speed test ↗</Link></div>:<div className="table-wrap"><table><thead><tr><th>Time</th><th>Download ({prefs.unit})</th><th>Upload ({prefs.unit})</th><th>Ping (ms)</th><th>Jitter (ms)</th><th>Server</th><th>Mode</th><th>Method</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r.date+i}><td>{formatResultTime(r.date,prefs)}</td><td>{show(r.download)}</td><td>{show(r.upload)}</td><td>{r.ping?.toFixed(1)}</td><td>{r.jitter?.toFixed(1)}</td><td>{r.server||'Cloudflare'}</td><td>{r.mode||'single'}</td><td>{r.engine==='librespeed-bounded-v2'?'Bounded sustained v2':r.engine?.startsWith('librespeed')?'Earlier sustained v1':'Legacy quick test'}</td></tr>)}</tbody></table></div>}{notice&&<p role="status" className="notice">{notice}</p>}</section>}
