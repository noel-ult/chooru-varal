export type Point = { x:number; y:number; z?:number };
export type HandMetrics = { palmWidth:number; palmLength:number; fingerSpread:number; thumbSpan:number; palmArea:number; normalizedSize:number };
const d=(a:Point,b:Point)=>Math.hypot(a.x-b.x,a.y-b.y);
export function getHandMetrics(p: Point[]): HandMetrics {
  const palmWidth=d(p[5],p[17]); const palmLength=d(p[0],p[9]);
  const fingerSpread=d(p[8],p[20]); const thumbSpan=d(p[4],p[17]);
  const scale=Math.max(d(p[0],p[5]),.001);
  return { palmWidth, palmLength, fingerSpread, thumbSpan, palmArea:palmWidth*palmLength, normalizedSize:(palmWidth+palmLength)/scale };
}
