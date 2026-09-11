export type RiceEstimate={ grams:number; confidence:number; riceRatio:number; mask:ImageData };
export function estimateRice(canvas:HTMLCanvasElement):RiceEstimate {
 const ctx=canvas.getContext("2d",{willReadFrequently:true}); if(!ctx) throw new Error("Canvas unavailable");
 const src=ctx.getImageData(0,0,canvas.width,canvas.height), out=ctx.createImageData(canvas.width,canvas.height); let n=0;
 for(let i=0;i<src.data.length;i+=4){const r=src.data[i],g=src.data[i+1],b=src.data[i+2]; const max=Math.max(r,g,b),min=Math.min(r,g,b); const rice=max>120 && max-min<58 && r>g-10 && g>b-12; if(rice){n++;out.data[i]=239;out.data[i+1]=108;out.data[i+2]=55;out.data[i+3]=175}else out.data[i+3]=0}
 const ratio=n/(canvas.width*canvas.height); if(ratio<.018) throw new Error("No plausible rice region");
 return { grams:Math.round(Math.max(65,Math.min(620,ratio*1750+72))), confidence:Math.round(Math.max(48,Math.min(91,58+ratio*115))), riceRatio:ratio, mask:out };
}
