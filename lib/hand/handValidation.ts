import type { Point } from "./handMetrics";
export type HandGuideState = "SEARCHING"|"MOVE_LEFT"|"MOVE_RIGHT"|"MOVE_UP"|"MOVE_DOWN"|"MOVE_CLOSER"|"MOVE_BACK"|"SHOW_FULL_HAND"|"HOLD_STEADY"|"READY";
export function validateHandInGuide(points: Point[]): HandGuideState {
 if (points.length < 21) return "SEARCHING";
 const xs=points.map(p=>p.x),ys=points.map(p=>p.y), minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const width=maxX-minX,height=maxY-minY,cx=(minX+maxX)/2,cy=(minY+maxY)/2;
 if(minX<.025||maxX>.975||minY<.025||maxY>.975) return "SHOW_FULL_HAND";
 if(Math.max(width,height)<.22)return "MOVE_CLOSER";
 if(Math.max(width,height)>.67)return "MOVE_BACK";
 if(cx<.39)return "MOVE_RIGHT";
 if(cx>.61)return "MOVE_LEFT";
 if(cy<.30)return "MOVE_DOWN";
 if(cy>.70)return "MOVE_UP";
 return "READY";
}
export const guideCopy:Record<HandGuideState,string>={SEARCHING:"Kai evide?",MOVE_LEFT:"Kurachu idathekku.",MOVE_RIGHT:"Kurachu valathekku.",MOVE_UP:"Kurachu mukalilekku.",MOVE_DOWN:"Kurachu thazhekku.",MOVE_CLOSER:"Kurachu aduthu.",MOVE_BACK:"Kurachu pinnilekku.",SHOW_FULL_HAND:"Oru full kai venam.",HOLD_STEADY:"Hold cheyyu.",READY:"Set aanu."};
