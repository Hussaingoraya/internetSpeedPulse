'use client';
import {createContext,useContext,useState,useEffect,type ReactNode} from 'react';
import {type ServerId,type TestMode,type SpeedUnit} from '@/lib/test-config';
export type Preferences={theme:'light'|'dark';unit:SpeedUnit;mode:TestMode;server:ServerId};
const defaults:Preferences={theme:'light',unit:'Mbps',mode:'multi',server:'auto'};
const Context=createContext<{prefs:Preferences;setPrefs:(p:Partial<Preferences>)=>void}>({prefs:defaults,setPrefs:()=>{}});
export function PreferencesProvider({children}:{children:ReactNode}){const [prefs,update]=useState(defaults);const [ready,setReady]=useState(false);useEffect(()=>{try{const p=JSON.parse(localStorage.getItem('pulse-preferences')||'{}');update({theme:p.theme==='dark'?'dark':'light',unit:p.unit==='MB/s'||p.unit==='Kbps'?p.unit:'Mbps',mode:p.mode==='single'?'single':'multi',server:p.server==='pulse'?'pulse':p.server==='cloudflare'?'cloudflare':'auto'});}catch{}setReady(true);},[]);useEffect(()=>{document.documentElement.dataset.theme=prefs.theme;if(ready)try{localStorage.setItem('pulse-preferences',JSON.stringify(prefs));}catch{}},[prefs,ready]);return <Context.Provider value={{prefs,setPrefs:p=>update(old=>({...old,...p}))}}>{children}</Context.Provider>}
export const usePreferences=()=>useContext(Context);
