type EvidenceFile = {href: string; label: string};
type Run = {
 timestamp: string;
 status: 'Complete' | 'Incomplete';
 downloadMbps: number | null;
 uploadMbps: number | null;
 idleMs: number | null;
 downloadLoadedMs: number | null;
 uploadLoadedMs: number | null;
 jitterMs: number | null;
 note: string;
};
type Setup = {
 deviceAndAdapter: string;
 ethernetLink: string;
 browserAndVersion: string;
 routerAndFirmware: string;
 wifiBandsAndLocations: string;
 serverModeAndEngine: string;
 vpnAndBackgroundTraffic: string;
 planTerms: string;
 datesAndTimezone: string;
};

// TODO(Hussain): Fill with approved field evidence before enabling public navigation.
export const connectionCaseStudy: {
 setup: Setup | null;
 results: {condition: string; runs: Run[]}[];
 csv: EvidenceFile | null;
 screenshots: EvidenceFile[];
 published: string | null;
 findings: string | null;
} = {
 setup: null,
 results: [
  {condition:'Ethernet',runs:[]},
  {condition:'Wi-Fi near the router',runs:[]},
  {condition:'Wi-Fi in the problem room',runs:[]},
 ],
 csv: null,
 screenshots: [],
 published: null,
 findings: null,
};

export const caseStudyPath='/case-study/';
export const caseStudyEnabled=process.env.CASE_STUDY_ENABLED==='true';
export const caseStudyPublic=caseStudyEnabled
 && Boolean(connectionCaseStudy.setup && connectionCaseStudy.csv && connectionCaseStudy.screenshots.length
  && connectionCaseStudy.published && connectionCaseStudy.findings)
 && connectionCaseStudy.results.every(({runs})=>runs.filter(run=>run.status==='Complete').length>=3);
