export type Dictionary = {
 home: readonly [title:string, description:string, explain:string, benchmark:string, browsing:string, hd:string, uhd:string, estimate:string, questions:string];
 nav: readonly [language:string, test:string, guides:string, method:string, contact:string, privacy:string, terms:string, cookies:string, disclaimer:string, skip:string, english:string, editorial:string];
 test: readonly [start:string,stop:string,again:string,ready:string,connecting:string,latency:string,downPhase:string,upPhase:string,complete:string,stopped:string,error:string,download:string,upload:string,idle:string,jitter:string,loadedDown:string,loadedUp:string,provider:string,detect:string,detecting:string,unavailable:string,server:string,change:string,auto:string,single:string,multi:string,copy:string,copied:string,csv:string,history:string,remember:string,data:string];
 extras: readonly [perPerson:string,perStream:string,close:string];
 faq: readonly [readonly [string,string],readonly [string,string],readonly [string,string],readonly [string,string],readonly [string,string],readonly [string,string]];
};
