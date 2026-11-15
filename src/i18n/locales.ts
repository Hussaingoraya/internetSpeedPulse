export const languages = {
 en:'English', ar:'العربية', ur:'اردو', hi:'हिन्दी', es:'Español', fr:'Français', de:'Deutsch',
 pt:'Português', tr:'Türkçe', id:'Bahasa Indonesia', ru:'Русский', zh:'简体中文', ja:'日本語',
} as const;
export type Locale = keyof typeof languages;
export const locales = Object.keys(languages) as Locale[];
export const localePath = (locale:Locale) => locale==='en'?'/':`/${locale}/`;
export const direction = (locale:Locale) => locale==='ar'||locale==='ur'?'rtl':'ltr';
export const alternates = (origin:string) => Object.fromEntries([
 ...locales.map(locale=>[locale,origin+localePath(locale)]),['x-default',origin+'/'],
]);
