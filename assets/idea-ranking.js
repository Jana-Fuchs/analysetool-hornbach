export function ideaScore(item,weights){
 if([item.impact,item.feasibility,item.cost,item.risk].includes(0))return 0;
 const total=Object.values(weights).reduce((a,b)=>a+b,0);
 return total?(item.impact*weights.impact+item.feasibility*weights.feasibility+(6-item.cost)*weights.cost+(6-item.risk)*weights.risk)/total:0;
}
export function rankedIdeas(state){return [...state.ideas].sort((a,b)=>ideaScore(b,state.ideaWeights)-ideaScore(a,state.ideaWeights));}
export function scoredIdeas(state,draftId=null){
 return rankedIdeas(state).filter(idea=>idea.name.trim()&&idea.id!==draftId&&ideaScore(idea,state.ideaWeights)>0);
}
