import {hyphenateSync} from './vendor/hyphen-de.js';
const supportedTabs=new Set(['steckbrief','reifegrad','muster','kunden','innovation','plattform','erloese','ki','massnahmen']);
const cache=new Map();
export function hyphenateDescription(text){
 // Preserve URLs, identifiers, existing line breaks and punctuation.
 return text.split(/(\s+)/u).map(token=>{
  if(/https?:|www\.|@|[_/\\]/iu.test(token))return token;
  return token.replace(/\p{L}[\p{L}\u00ad]{7,}/gu,word=>{
   const plain=word.replaceAll('\u00ad','');
   if(!cache.has(plain)){
    if(cache.size>=3000)cache.clear();
    cache.set(plain,hyphenateSync(plain,{minWordLength:8}));
   }
   return cache.get(plain);
  });
 }).join('');
}
export function applyDescriptionTypography(root,tab){
 if(!supportedTabs.has(tab)||!root)return;
 for(const element of root.querySelectorAll('p, dd')){
  if(element.matches('.scope-note,.source-note,.method-caption,.ca-date,.edit-banner')||element.closest('button,summary,svg,[contenteditable="true"]')||element.textContent.trim().length<65)continue;
  const walker=element.ownerDocument.createTreeWalker(element,4);
  const nodes=[];let node;
  while((node=walker.nextNode()))if(!node.parentElement.closest('a,button,input,textarea,select,code,pre,[contenteditable="true"]'))nodes.push(node);
  for(const textNode of nodes)textNode.nodeValue=hyphenateDescription(textNode.nodeValue);
  element.classList.add('description-copy');element.lang='de';
 }
}
