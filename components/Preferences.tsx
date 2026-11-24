'use client';
import {createContext,useContext,useState,useEffect,type ReactNode} from 'react';
import {type ServerId,type TestMode,type SpeedUnit} from '@/lib/test-config';
export const dateFormats=['MM/DD/YYYY','DD/MM/YYYY','YYYY-MM-DD'] as const;
export type Preferences={theme:'light'|'dark';unit:SpeedUnit;mode:TestMode;server:ServerId;clock:'12'|'24';dateFormat:typeof dateFormats[number];distance:'mi'|'km'};
const defaults:Preferences={theme:'light',unit:'Mbps',mode:'multi',server:'auto',clock:'12',dateFormat:'MM/DD/YYYY',distance:'mi'};
const Context=createContext<{prefs:Preferences;setPrefs:(p:Partial<Preferences>)=>void}>({prefs:defaults,setPrefs:()=>{}});
export function PreferencesProvider({children}:{children:ReactNode}){const [prefs,update]=useState(defaults);const [ready,setReady]=useState(false);useEffect(()=>{try{const p=JSON.parse(localStorage.getItem('pulse-preferences')||'{}');update({theme:p.theme==='dark'?'dark':'light',unit:p.unit==='MB/s'||p.unit==='Kbps'?p.unit:'Mbps',mode:p.mode==='single'?'single':'multi',clock:p.clock==='24'?'24':'12',dateFormat:dateFormats.includes(p.dateFormat)?p.dateFormat:defaults.dateFormat,distance:p.distance==='km'?'km':'mi',server:p.server==='cloudflare'?'cloudflare':'auto'});}catch{}setReady(true);},[]);useEffect(()=>{document.documentElement.dataset.theme=prefs.theme;if(ready)try{localStorage.setItem('pulse-preferences',JSON.stringify(prefs));}catch{}},[prefs,ready]);return <Context.Provider value={{prefs,setPrefs:p=>update(old=>({...old,...p}))}}>{children}</Context.Provider>}
export const usePreferences=()=>useContext(Context);
