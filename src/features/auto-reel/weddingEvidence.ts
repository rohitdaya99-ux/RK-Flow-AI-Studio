import type { VisionBatchAnalysis } from "./models";

export const WEDDING_EVIDENCE_VERSION = "phase-7-local-cues-v1";
export type WeddingEventName = "venue"|"decor"|"bride-prep"|"groom-prep"|"bride-entry"|"groom-entry"|"haldi"|"mehndi"|"sangeet"|"baraat"|"varmala"|"pheras"|"sindoor"|"mangalsutra"|"bidaai"|"reception"|"cake"|"dance"|"couple-portrait"|"family-emotion"|"crowd-reaction"|"drone"|"detail"|"fireworks"|"unknown";
export interface WeddingEvidence { clipId:string; frameSampleId:string; timestampSeconds:number; cue:string; strength:number; source:"local-cue"; note:string }
export interface WeddingEventSuggestion { clipId:string; suggestedEvent:WeddingEventName; confidence:number; status:"suggested"|"user_confirmed"|"user_corrected"|"unknown"; supportingEvidence:WeddingEvidence[]; contradictingEvidence:string[]; alternatives:Array<{event:WeddingEventName;confidence:number}>; sourceFrames:string[]; temporalNeighborEvidence:string[]; capabilitySource:"local-cue-provider"|"dedicated-model-provider"; providerVersion:string }
export interface ConfirmedWeddingEvent { clipId:string; event:WeddingEventName; status:"user_confirmed"|"user_corrected"|"unknown"; timestamp:string; evidenceSummary:string; providerVersion:string }
export interface WeddingTimelineEntry { clipId:string; timestampSeconds:number; suggestion:WeddingEventSuggestion; confirmed?:ConfirmedWeddingEvent }
export interface WeddingTimelineReport { version:string; suggestions:WeddingEventSuggestion[]; timeline:WeddingTimelineEntry[]; cacheKey:string; warnings:string[] }
export interface WeddingCapabilities { localCueProvider:true; dedicatedWeddingModelProvider:false; reason:string }
export interface WeddingEvidenceProvider { version:string; capabilities():WeddingCapabilities; analyze(vision:VisionBatchAnalysis):WeddingTimelineReport }
export class LocalCueProvider implements WeddingEvidenceProvider {
 version=WEDDING_EVIDENCE_VERSION;
 capabilities():WeddingCapabilities { return {localCueProvider:true,dedicatedWeddingModelProvider:false,reason:"Dedicated commercial wedding-event model not configured"}; }
 analyze(vision:VisionBatchAnalysis):WeddingTimelineReport {
  const suggestions=vision.clips.map(clip=>{ const frames=clip.frames; const e:WeddingEvidence[]=[]; const first=frames[0]; if(!first) return unknown(clip.clipId,e);
   if(first.sceneEstimate.droneLikelihood>.45)e.push(cue(clip.clipId,first,"wide/drone likelihood",first.sceneEstimate.droneLikelihood));
   if(first.sceneEstimate.shotType==="detail")e.push(cue(clip.clipId,first,"detail framing",.4));
   if(first.sceneEstimate.indoorOutdoor==="outdoor")e.push(cue(clip.clipId,first,"outdoor scene",.3));
   if(first.saturation>120 && first.whiteBalanceEstimate.temperatureK && first.whiteBalanceEstimate.temperatureK<4500)e.push(cue(clip.clipId,first,"warm saturated colour cue",.35));
   const candidate=e.some(x=>x.cue.includes("drone"))?"drone":e.some(x=>x.cue.includes("detail"))?"detail":"unknown";
   const confidence=Math.min(.49,e.reduce((n,x)=>n+x.strength,0)/Math.max(1,e.length));
   return {clipId:clip.clipId,suggestedEvent:candidate as WeddingEventName,confidence,status:candidate==="unknown"?"unknown":"suggested",supportingEvidence:e,contradictingEvidence:[],alternatives:candidate==="drone"?[{event:"venue",confidence:.25}]:[],sourceFrames:frames.map(f=>f.frameSampleId),temporalNeighborEvidence:[],capabilitySource:"local-cue-provider",providerVersion:this.version} satisfies WeddingEventSuggestion;
  });
  return {version:this.version,suggestions,timeline:suggestions.map(s=>({clipId:s.clipId,timestampSeconds:s.supportingEvidence[0]?.timestampSeconds||0,suggestion:s})),cacheKey:stable(JSON.stringify({vision:vision.visionVersion,clips:vision.clips.map(c=>c.frames.map(f=>f.contentHash))})),warnings:[this.capabilities().reason]};
 }
}
export class DedicatedWeddingModelProvider { readonly enabled=false; readonly reason="Dedicated commercial wedding-event model not configured"; }
export function confirmWeddingEvent(s:WeddingEventSuggestion,event:WeddingEventName,status:"user_confirmed"|"user_corrected"|"unknown"):ConfirmedWeddingEvent { return {clipId:s.clipId,event,status,timestamp:new Date().toISOString(),evidenceSummary:s.supportingEvidence.map(e=>e.cue).join(", ")||"No local evidence",providerVersion:s.providerVersion}; }
function cue(clipId:string,f:VisionBatchAnalysis["clips"][number]["frames"][number],name:string,strength:number):WeddingEvidence{return {clipId,frameSampleId:f.frameSampleId,timestampSeconds:f.sourceTimeSeconds,cue:name,strength,source:"local-cue",note:"Cue only; not a verified wedding event."};}
function unknown(clipId:string,e:WeddingEvidence[]):WeddingEventSuggestion{return {clipId,suggestedEvent:"unknown",confidence:0,status:"unknown",supportingEvidence:e,contradictingEvidence:[],alternatives:[],sourceFrames:[],temporalNeighborEvidence:[],capabilitySource:"local-cue-provider",providerVersion:WEDDING_EVIDENCE_VERSION};}
function stable(text:string):string{let h=2166136261;for(let i=0;i<text.length;i++)h=(h^text.charCodeAt(i))*16777619;return `wedding-${(h>>>0).toString(16)}`;}
