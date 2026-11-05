'use client';
import {createContext,useContext,useState,useEffect,type ReactNode} from 'react';
import {type ServerId,type TestMode} from '@/lib/test-config';
export type Preferences={theme:'light'|'dark';language:'en'|'ar';unit:'Mbps'|'MB/s';mode:TestMode;server:ServerId};
const defaults:Preferences={theme:'light',language:'en',unit:'Mbps',mode:'multi',server:'auto'};
const Context=createContext<{prefs:Preferences;setPrefs:(p:Partial<Preferences>)=>void}>({prefs:defaults,setPrefs:()=>{}});
export function PreferencesProvider({children}:{children:ReactNode}){const [prefs,update]=useState(defaults);const [ready,setReady]=useState(false);useEffect(()=>{try{const p=JSON.parse(localStorage.getItem('pulse-preferences')||'{}');update({theme:p.theme==='dark'?'dark':'light',language:p.language==='ar'?'ar':'en',unit:p.unit==='MB/s'?'MB/s':'Mbps',mode:p.mode==='single'?'single':'multi',server:p.server==='pulse'?'pulse':p.server==='cloudflare'?'cloudflare':'auto'});}catch{}setReady(true);},[]);useEffect(()=>{document.documentElement.dataset.theme=prefs.theme;if(ready)try{localStorage.setItem('pulse-preferences',JSON.stringify(prefs));}catch{}},[prefs,ready]);return <Context.Provider value={{prefs,setPrefs:p=>update(old=>({...old,...p}))}}>{children}</Context.Provider>}
export const usePreferences=()=>useContext(Context);
