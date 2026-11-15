import {languages,locales,localePath,type Locale} from '@/src/i18n/locales';

export default function LanguageMenu({locale,label}:{locale:Locale;label:string}) {
 return <details className="locale-menu">
  <summary><span className="sr-only">{label}: </span>{languages[locale]}</summary>
  <ul aria-label={label}>{locales.map(language=><li key={language}>
   <a href={localePath(language)} hrefLang={language} lang={language} dir="auto" aria-current={language===locale?'page':undefined}>{languages[language]}</a>
  </li>)}</ul>
 </details>;
}
