import test from 'node:test';
import assert from 'node:assert/strict';
import {DEFAULT_STATE} from '../assets/data.js';
import {clone,validateState} from '../assets/core.js';
import {innovationView,renderCustomerAnalysis,handleCustomerAnalysisEvent,customerScenario,strongestPain,weakestInvolvement} from '../assets/customer-analysis.js';
import {developmentIdeas} from '../assets/analysis-ui.js';
import {platformView} from '../assets/platform.js';
const ctx={editing:false,cite:(id,pages)=>`<a>${id} ${pages}</a>`};
function controls(state,context=ctx){let html='',saves=0;const options={save(){saves++;},render(){html=renderCustomerAnalysis(state,context);},toast(){}};return {options,get html(){return html;},get saves(){return saves;},click(attribute,value){handleCustomerAnalysisEvent({type:'click',target:{closest:selector=>selector==='#panel-kunden'?{}:selector==='['+attribute+']'?{dataset:{caCandidate:value,caMetric:value,caSegment:value},getAttribute:()=>value}:null}},state,options);}};}
test('course analysis preserves earlier model values and keeps maturity scenarios separate',()=>{
 const s=clone(DEFAULT_STATE),before=JSON.stringify(s.model),scenario=customerScenario(s);
 assert.equal(JSON.stringify(s.model),before);
 assert.deepEqual(scenario.groups[0],s.model[0]);
 assert.equal(scenario.groups[1].criteria.find(c=>c.id==='development').current,2);
 s.customerAnalysis.scenarioJourney=false;s.customerAnalysis.scenarioInnovation=false;
 assert.deepEqual(customerScenario(s).groups,s.model);
 assert.equal(customerScenario(s).changes.length,0);
 assert.equal(strongestPain(s.customerAnalysis).id,'plan');
 assert.equal(weakestInvolvement(s.customerAnalysis).id,'concept');
 s.customerAnalysis.involvement.forEach(p=>p.current=null);
 assert.equal(weakestInvolvement(s.customerAnalysis),null);
});
test('a change at rank one preserves the project companion scenarios and platform concept',()=>{
 const state=clone(DEFAULT_STATE);
 const expectedChanges=customerScenario(state).changes;
 const advisor=state.ideas.find(idea=>idea.id==='advisor');
 Object.assign(advisor,{impact:5,feasibility:5,cost:1,risk:1});
 const developmentProposals=developmentIdeas(state);
 assert.equal(developmentProposals[0].id,'advisor');
 assert.deepEqual(customerScenario(state).changes,expectedChanges);
 const journey=renderCustomerAnalysis(state,{...ctx,developmentProposals});
 assert.match(journey,/Customer Journey[\s\S]*?<h4>Stufe 3<\/h4>[\s\S]*?<h4>Stufe 4<\/h4>/);
 assert.match(innovationView(state,ctx,'scenario'),/Produktentwicklung mit Kunden[\s\S]*?<h4>Stufe 2<\/h4>/);
 const context={...ctx,developmentProposals,escape:String,icon:()=>'',panel:(title,body)=>title+body};
 assert.match(platformView('roles',context),/<details class="platform-idea-disclosure">\s*<summary>[\s\S]*?KI-Beratung[\s\S]*?Mögliche Ergänzung[\s\S]*?Projektbegleiter<\/a>/);
 assert.match(platformView('concept',context),/Plattformkonzept für den digitalen Projektbegleiter/);
 assert.match(platformView('pilot',context),/data-platform-simulation/);
});
test('journey and innovation views filter proposals and escape editable content',()=>{
 const s=clone(DEFAULT_STATE),c=controls(s,{...ctx,editing:true});c.click('data-ca-view','journey');
 assert.match(c.html,/<h4>Touchpoints<\/h4>\s*<div class="ca-field"><p>Touchpoints sind Kontaktpunkte/);
 assert.doesNotMatch(c.html,/class="ca-touchpoints"/);
 assert.match(c.html,/<h4>Pain Point<\/h4><p>Eine konkrete Hürde/);
 assert.match(c.html,/<h4>Actions von HORNBACH<\/h4><p>Was HORNBACH/);
 assert.match(c.html,/<h4>Kundenerlebnis<\/h4>/);
 assert.match(c.html,/Wähle zuerst ein Kundensegment/);
 assert.doesNotMatch(c.html,/ca-experience-chart|ca-phase-sources|ca-optimization-card|data-ca-(text|score)="journey\./);
 assert.ok(!c.html.includes(s.customerAnalysis.journey[0].online));
 c.click('data-ca-segment','all');
 assert.match(c.html,/<h4>Touchpoints<\/h4>[\s\S]*?<span>Online<\/span>[\s\S]*?<span>Offline<\/span>/);
 assert.match(c.html,/<span>Pain Point<\/span>[^]*?data-ca-score="journey.0.severity"/);
 assert.doesNotMatch(c.html,/<h4>(Ist|Soll)<\/h4>/);
 assert.match(c.html,/ca-layer-target ca-phase-grid[\s\S]*?<span>Risiken und Grenzen<\/span>[\s\S]*?<span>Erfolgskriterium<\/span>/);
 assert.doesNotMatch(c.html,/aria-label="Zufriedenheit je Phase"/);
 c.click('data-ca-metric','Satisfaction');
 assert.match(c.html,/aria-label="Zufriedenheit je Phase"/);
 assert.match(c.html,/<div class="ca-experience-edit"[^>]*>[\s\S]*?data-ca-score="journey.0.currentEmotion"[\s\S]*?data-ca-score="journey.0.currentSatisfaction"/);
 assert.doesNotMatch(c.html,/aria-label="Emotion je Phase"/);
 c.click('data-ca-metric','Emotion');
 const readOnly=renderCustomerAnalysis(s,ctx);
 assert.match(readOnly,/<span class="status-tag orange">Ist<\/span>/);
 assert.match(readOnly,/<span class="status-tag pink">Soll<\/span>/);
 assert.match(readOnly,/<\/svg><\/div>\s*<p class="ca-experience-note">Skala von 1 \(sehr negativ\) bis 5 \(sehr positiv\)<\/p>/);
 assert.doesNotMatch(readOnly,/data-ca-score="journey.0.currentEmotion"/);
 c.click('data-ca-mode','current');assert.doesNotMatch(c.html,/data-ca-score="journey.0.currentEmotion"/);assert.match(c.html,/data-ca-score="journey.0.targetEmotion"/);
 c.click('data-ca-mode','target');assert.match(c.html,/Wähle Ist oder Soll/);
 assert.doesNotMatch(c.html,/<span>(Risiken und Grenzen|Erfolgskriterium)<\/span>/);
 c.click('data-ca-mode','current');assert.match(c.html,/data-ca-score="journey.0.currentEmotion"/);assert.doesNotMatch(c.html,/data-ca-score="journey.0.targetEmotion"/);
 c.click('data-ca-mode','target');c.click('data-ca-view','innovation');
 assert.match(c.html,/class="ca-innovation-position">\s*<h2>Wo steht HORNBACH heute\?<\/h2>/);
 assert.match(c.html,/<a>gb25 46, 72<\/a>/);
 assert.doesNotMatch(c.html,/Open_Innovation\.pdf|Termin 5|Vorlesung Termin 5/);
 const overview=()=>innovationView(s,ctx,'overview');
 const proposal=innovationView(s,{...ctx,developmentProposals:developmentIdeas(s)},'overview');
 assert.doesNotMatch(overview(),/Kundeneinbindung ansehen/);
 assert.match(overview(),/Anteile der belegten Beispiele[\s\S]*?2 belegte Fälle/);
 assert.doesNotMatch(overview(),/Beleglage|keinen bestehenden Coupled-Fall/);
 assert.match(proposal,/Beispiele und Vorschläge[\s\S]*?Projektlabor[\s\S]*?Projektlisten-Datenformats[\s\S]*?Anteile der belegten Beispiele/);
 assert.match(c.html,/<h2>Beispiele und Vorschläge<\/h2>/);
 assert.match(c.html,/data-ca-filter="Coupled" checked/);
 assert.match(overview(),/<h4>Zukauf von Seniovo/);
 assert.match(c.html,/<h3>Closed Innovation<\/h3>[\s\S]*?class="panel ca-innovation-open"><header class="ca-innovation-model-heading"><h3>Open Innovation<\/h3><span class="status-tag">Bei HORNBACH belegt/);
 assert.match(c.html,/type="checkbox"[^>]+data-ca-filter="Outside-in" checked/);
 const setFlow=(caFilter,checked)=>handleCustomerAnalysisEvent({
  type:'change',target:{dataset:{caFilter},checked,closest:selector=>selector==='#panel-innovation'?{}:null,matches:()=>false}
 },s,c.options);
 setFlow('Outside-in',false);
 assert.match(overview(),/<h4>Freigabe eines Projektlisten-Datenformats/);
 assert.doesNotMatch(overview(),/<h4>Zukauf von Seniovo/);
 assert.match(overview(),/<h4>Projektlabor/);
 setFlow('Inside-out',false);
 assert.match(overview(),/<h4>Projektlabor/);
 setFlow('Coupled',false);
 assert.match(c.html,/Wähle mindestens eine Richtung/);
 assert.doesNotMatch(overview(),/<h4>Projektlabor|<h4>Freigabe eines Projektlisten-Datenformats/);
 setFlow('Outside-in',true);
 assert.match(c.html,/<h4>Zukauf von Seniovo/);
 assert.doesNotMatch(overview(),/<h4>Projektlabor/);
 assert.doesNotMatch(overview(),/<h4>Freigabe eines Projektlisten-Datenformats/);
 setFlow('Inside-out',true);
 assert.doesNotMatch(overview(),/<h4>Projektlabor/);
 setFlow('Coupled',true);
 assert.match(overview(),/<h4>Projektlabor/);
 assert.match(overview(),/<h4>Freigabe eines Projektlisten-Datenformats/);
 s.customerAnalysis.innovationConclusion='<script>alert(1)</script>';c.options.render();assert.match(c.html,/&lt;script&gt;/);assert.doesNotMatch(c.html,/<script>/);
 c.click('data-ca-view','journey');
});
test('segment selection switches experience text, scores and curve, with independent importable edits',async()=>{
 const state=clone(DEFAULT_STATE),view=controls(state,{...ctx,editing:true,developmentProposals:developmentIdeas(state)});
 const change=(dataset,value,type='change')=>handleCustomerAnalysisEvent({
  type,target:{dataset,value,closest:selector=>selector==='#panel-kunden'?{}:null,matches:()=>false}
 },state,view.options);
 try {
  view.click('data-ca-segment','difm');
  assert.match(view.html,/segmentExperience.difm.0.emotion[^>]*>Interesse am Projekt/);
  assert.equal((view.html.match(/<article class="ca-phase-card ca-optimization-card">/g)||[]).length,5);
  const [featured,more]=view.html.split('<details class="ca-optimization-more">');
  assert.equal((featured.match(/class="ca-phase-card ca-optimization-card"/g)||[]).length,2);
  assert.match(more,/<summary>Weitere Pain Points<\/summary>/);
  assert.equal((more.match(/class="ca-phase-card ca-optimization-card"/g)||[]).length,3);
  assert.match(view.html,/<summary id="ca-segment-0">Do-it-for-me-Kunden \(DIFM\)<\/summary>/);
  assert.match(view.html,/<summary id="ca-segment-optimization">Do-it-for-me-Kunden \(DIFM\)<\/summary>/);
  assert.match(view.html,/Phase Entdecken[\s\S]*?welche Arbeiten ein Fachbetrieb übernimmt/);
  const firstRankedCard=()=>view.html.split('<article class="ca-phase-card ca-optimization-card">')[1].split('</article>')[0];
  assert.match(firstRankedCard(),/Pain Point<\/h3>[\s\S]*?Phase Planen[\s\S]*?5\/5[\s\S]*?aria-label="Rang 1">1/);
  assert.match(view.html,/data-ca-score="segmentExperience.difm.0.severity"/);
  await change({caScore:'segmentExperience.difm.0.severity',min:'1',max:'5'},'5');
  assert.match(firstRankedCard(),/Pain Point<\/h3>[\s\S]*?Phase Entdecken[\s\S]*?5\/5[\s\S]*?aria-label="Rang 1">1/);
  assert.equal(validateState(state).customerAnalysis.segmentExperience.difm[0].severity,5);
  assert.match(firstRankedCard(),/<h4>Maßnahme<\/h4>[\s\S]*?<h4>Wirkung und Messung<\/h4>[\s\S]*?wer Material beschafft/);
  assert.doesNotMatch(firstRankedCard(),/Ausgangslage/);
  assert.match(firstRankedCard(),/<h4>Passende Idee<\/h4><p>Offen<\/p>/);
  assert.match(view.html,/href="#muster\/entwicklungsvorschlaege\/project">Digitaler Projektbegleiter/);
  view.click('data-ca-segment','diy');
  const scenario=()=>view.html.split('<div class="ca-maturity-layout">')[1];
  assert.match(scenario(),/Customer Journey[\s\S]*?<h4>Stufe 3<\/h4>[\s\S]*?<h4>Stufe 4<\/h4>/);
  assert.doesNotMatch(scenario(),/Priorisierter Maßnahmenkandidat|Termin 4 · Folie/);
  assert.doesNotMatch(scenario(),/Produktentwicklung mit Kunden|Steuerung &amp; Personalisierung|Maßnahme nach Phase wählen/);
  view.click('data-ca-segment','difm');
  assert.match(scenario(),/Customer Journey[\s\S]*?<h4>Stufe 3<\/h4>[\s\S]*?<h4>Stufe 4<\/h4>/);
  await handleCustomerAnalysisEvent({type:'change',target:{dataset:{caScenario:'scenarioJourney'},checked:false,closest:selector=>selector==='#panel-kunden'?{}:null,matches:()=>false}},state,view.options);
  assert.doesNotMatch(scenario(),/class="radar-target"/);
  assert.match(scenario(),/class="radar-original-target"/);
  assert.doesNotMatch(scenario(),/<table/);
  assert.match(innovationView(state,{...ctx,developmentProposals:developmentIdeas(state)},'scenario'),/Produktentwicklung mit Kunden[\s\S]*?Ist<\/span>\s*<h4>Stufe 1<\/h4>[\s\S]*?Szenario<\/span>\s*<h4>Stufe 2/);
  view.click('data-ca-segment','diy');
  assert.match(view.html,/href="#muster\/entwicklungsvorschlaege\/advisor">KI-Beratung als Projektservice/);
  view.click('data-ca-segment','difm');
  assert.doesNotMatch(firstRankedCard(),/data-ca-candidate="journey"/);
  assert.match(view.html,/ca-point-active"><title>Entdecken · Ist 2<\/title>/);
  await change({caText:'segmentExperience.difm.0.emotion'},'Bearbeitete Erfahrung','input');
  await change({caScore:'segmentExperience.difm.0.currentEmotion',min:'1',max:'5'},'5');
  assert.match(view.html,/Bearbeitete Erfahrung/);
  assert.match(view.html,/ca-point-active"><title>Entdecken · Ist 5<\/title>/);
  view.click('data-ca-segment','diy');
  assert.match(view.html,/ca-point-active"><title>Entdecken · Ist 3<\/title>/);
  assert.doesNotMatch(view.html,/Bearbeitete Erfahrung/);
  assert.equal(validateState(JSON.parse(JSON.stringify(state))).customerAnalysis.segmentExperience.difm[0].currentEmotion,5);
  const legacy=clone(state);
  delete legacy.customerAnalysis.segmentExperience;
  assert.deepEqual(validateState(legacy).customerAnalysis.segmentExperience,DEFAULT_STATE.customerAnalysis.segmentExperience);
  state.customerAnalysis.segmentExperience.difm[0].currentEmotion=6;
  assert.throws(()=>validateState(state),/Journey-Skalen/);
 }finally{
  view.click('data-ca-segment','all');
 }
});
test('Kundeneinbindung shows both scores and lets the user change a level with its definition visible',async()=>{
 const state=clone(DEFAULT_STATE);
 const view=()=>innovationView(state,ctx,'involvement');
 const target={closest:selector=>selector==='#panel-innovation'?{}:selector==='[data-ca-involvement-phase]'?{dataset:{caInvolvementPhase:'prototype'}}:null};
 const options={render(){},save(){},toast(){}};
 assert.match(view(),/Prototypentest[\s\S]*?Ist<\/span><b>1<\/b>/);
 assert.match(view(),/Markteinführung[\s\S]*?Ist<\/span><b>1<\/b>/);
 assert.doesNotMatch(view(),/<span class="status-tag">Schätzung<\/span>/);
 await handleCustomerAnalysisEvent({type:'click',target},state,options);
 assert.match(view(),/<span class="status-tag">Schätzung<\/span>/);
 assert.match(view(),/aria-label="Stufenansicht schließen">×<\/button>/);
 await handleCustomerAnalysisEvent({type:'click',target},state,options);
 assert.match(view(),/id="ca-involvement-editor" hidden/);
 state.customerAnalysis.involvement[2].current=null;
 assert.match(view(),/Prototypentest[\s\S]*?<b class="ca-involvement-unknown">Nicht belegt<\/b>/);
 await handleCustomerAnalysisEvent({type:'click',target},state,options);
 assert.match(view(),/ca-rate-prototype-open[^>]*stage-active/);
 assert.match(view(),/Stufe 0<\/strong>\s*<span class="ca-involvement-stage-role"><\/span>\s*<span>Es ist belegt, dass Kunden in dieser Phase nicht einbezogen werden/);
 await handleCustomerAnalysisEvent({type:'click',target:{
  closest:selector=>selector==='#panel-innovation'?{}:selector==='[data-ca-involvement-stage]'?{
   id:'ca-rate-prototype-1', classList:{contains:()=>false}, dataset:{caInvolvementStage:'1'}
  }:null
 }},state,options);
 assert.match(view(),/Stufe 1 zuordnen[\s\S]*?ca-involvement-set-current[^>]*>Als Ist setzen[\s\S]*?ca-involvement-set-target[^>]*>Als Soll setzen/);
 const level=(key,value)=>handleCustomerAnalysisEvent({type:'click',target:{
  closest:selector=>selector==='#panel-innovation'?{}:selector==='[data-ca-involvement-level]'?{
   dataset:{caInvolvementSide:key,caInvolvementLevel:value}
  }:null
 }},state,options);
 const submit=(values)=>handleCustomerAnalysisEvent({type:'submit',preventDefault(){},target:{
  closest:selector=>selector==='#panel-innovation'?{}:null,
  matches:selector=>selector==='[data-ca-involvement-rating]',
  elements:{namedItem:name=>Object.hasOwn(values,name)?{value:values[name],setCustomValidity(){},reportValidity(){}}:null}
 }},state,options);
 await level('current','1');
 assert.equal(state.customerAnalysis.involvement[2].current,null);
 assert.match(view(),/Quelle \(optional\)/);
 await submit({reason:'   ',source:''});
 assert.equal(state.customerAnalysis.involvement[2].current,null);
 await submit({reason:'Punktuelles Feedback dokumentiert.',source:'Pilotprotokoll'});
 assert.equal(state.customerAnalysis.involvement[2].current,1);
 assert.match(view(),/ca-rate-prototype-1-reason" class="stage-bubble stage-preview is-open"/);
 assert.match(view(),/Pilotprotokoll/);
 await level('target','3');
 await submit({reason:'Kunden wirken aktiv mit.',measure:' '});
 assert.equal(state.customerAnalysis.involvement[2].target,2);
 await submit({reason:'Kunden wirken aktiv mit.',measure:'Zwei gemeinsame Workshops durchführen.'});
 assert.equal(state.customerAnalysis.involvement[2].target,3);
 assert.match(view(),/Soll-Begründung[\s\S]*?Kunden wirken aktiv mit[\s\S]*?Zwei gemeinsame Workshops/);
 await level('target','1');
 await submit({reason:'Die Beteiligung bleibt punktuell.',measure:'Eine freiwillige Rückfrage stellen.'});
 assert.match(view(),/id="ca-rate-prototype-1" class="stage-card stage-active ca-stage-both"/);
 assert.match(view(),/class="ca-involvement-role-current">Ist<\/span> und <span class="ca-involvement-role-target">Soll/);
 assert.equal((view().match(/data-ca-involvement-stage=/g)||[]).length,5);
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(state))),state);
 await handleCustomerAnalysisEvent({type:'click',target},state,options);
});
test('Open Innovation connects measures, expertise proposals and model criteria',async()=>{
 const state=clone(DEFAULT_STATE);
 const context={...ctx,developmentProposals:developmentIdeas(state)};
 const view=key=>innovationView(state,context,key);
 assert.doesNotMatch(view('involvement'),/So könnten Kunden mitwirken|data-ca-candidate=/);
 assert.doesNotMatch(view('involvement'),/Kundeneinbindung in den verschiedenen Innovationsphasen/);
 assert.match(view('involvement'),/ca-involvement-overview[\s\S]*?Abgeleitete Maßnahmen/);
 const measures=()=>view('involvement').split('<h2>Abgeleitete Maßnahmen</h2>')[1].split('</section>')[0];
 assert.match(measures(),/Ideenfindung[\s\S]*?<details class="ca-involvement-pilot">[\s\S]*?Crowdsourcing für die Projektliste[\s\S]*?entwicklungsvorschlaege\/project[\s\S]*?<h4>Risiko<\/h4>[\s\S]*?<\/details>[\s\S]*?data-ca-involvement-priority="ideas"[\s\S]*?<\/article>/);
 assert.match(measures(),/Konzeptentwicklung[\s\S]*?zwei Projektlisten-Prototypen[\s\S]*?entwicklungsvorschlaege\/project[\s\S]*?So hilft die Idee/);
 assert.match(measures(),/Markteinführung[\s\S]*?entwicklungsvorschlaege\/advisor/);
 assert.match(measures(),/<article class="ca-phase-card ca-involvement-measure ca-involvement-prioritized">\s*<header><h3>Konzeptentwicklung/);
 assert.match(measures(),/<details class="ca-involvement-pilot">\s*<summary>Priorisierter Pilotversuch/);
 assert.match(measures(),/Warum zuerst\?<\/strong> Mehrere Phasen liegen bei Ist-Stufe 1/);
 assert.match(measures(),/<h4>Erhebung<\/h4>[\s\S]*?Testprotokoll[\s\S]*?erneut prüfen/);
 assert.match(measures(),/<h4>Wissenschaftliche Grundlage<\/h4>[\s\S]*?doi.org\/10.1111\/1540-5885.1420117/);
 assert.doesNotMatch(measures(),/Wähle die Maßnahme/);
 await handleCustomerAnalysisEvent({type:'click',target:{
  closest:selector=>selector==='#panel-innovation'?{}:selector==='[data-ca-involvement-priority]'?{dataset:{caInvolvementPriority:'launch'}}:null
 }},state,{save(){},render(){},toast(){}});
 assert.equal(state.customerAnalysis.involvementPriority,'launch');
 assert.match(measures(),/<article class="ca-phase-card ca-involvement-measure ca-involvement-prioritized">\s*<header><h3>Markteinführung/);
 assert.equal(validateState(state).customerAnalysis.involvementPriority,'launch');
 const customized=clone(state);
 customized.customerAnalysis.involvement[1].measure='Eine andere Maßnahme testen.';
 const customView=innovationView(customized,context,'involvement');
 assert.match(customView,/Eine andere Maßnahme testen\.<\/p><\/div>[\s\S]*?<h4>Passende Idee<\/h4><p>Offen/);
 assert.doesNotMatch(view('involvement'),/Wo lohnt sich mehr Beteiligung/);
 assert.match(view('involvement'),/ca-involvement-overview[\s\S]*?Ist<\/span><b>1[\s\S]*?Abgeleitete Maßnahmen/);
 assert.doesNotMatch(view('overview'),/ca-innovation-idea-picker|Bezug zur gewählten Idee/);
 assert.match(view('overview'),/Coupled · Vorschlag[\s\S]*?Projektlabor[\s\S]*?Inside-Out · Vorschlag[\s\S]*?Projektlisten-Datenformats/);
 assert.doesNotMatch(view('overview'),/Ausbauideen für externes Fachwissen|Passende Idee/);
 assert.doesNotMatch(view('involvement'),/<option value="availability">/);
 const maturity=view('scenario');
 assert.doesNotMatch(maturity,/Reifegrad im Vergleich/);
 assert.match(maturity,/ca-maturity-layout[\s\S]*?<svg[\s\S]*?radar-current[\s\S]*?radar-target/);
 assert.equal((maturity.match(/<svg\b/g)||[]).length,1);
 assert.doesNotMatch(maturity,/Detailzoom/);
 assert.equal((maturity.match(/class="radar-grid"/g)||[]).length,4);
 const customerTarget=state.model[1].criteria.reduce((sum,criterion)=>sum+criterion.target,0)/state.model[1].criteria.length;
 const targetLabel=new Intl.NumberFormat('de-DE',{maximumFractionDigits:1}).format(customerTarget);
 assert.ok(maturity.includes(`<title>Kundenanbindung · Soll aus dem digitalen Reifegrad ${targetLabel}</title>`));
 assert.match(maturity,/class="radar-original-target"/);
 assert.match(maturity,/<figcaption class="chart-legend"><span class="status-tag orange">Ist<\/span><span class="status-tag pink">Szenario<\/span><span class="status-tag ca-original-target-tag">Soll<\/span><\/figcaption>/);
 assert.match(maturity,/Kundenanbindung im Netzdiagramm<\/strong><span>Ist [\d,]+ → Szenario [\d,]+ → Soll 2,8/);
 assert.match(innovationView({...state,customerAnalysis:{...state.customerAnalysis,scenarioInnovation:false}},context,'scenario'),/class="radar-original-target"/);
 assert.doesNotMatch(maturity,/halben Rasterschritten|ca-radar-grid-minor/);
 assert.match(maturity,/Produktentwicklung mit Kunden[\s\S]*?Ist<\/span>\s*<h4>Stufe 1<\/h4>[\s\S]*?Szenario<\/span>\s*<h4>Stufe 2/);
 assert.match(maturity,/Warum diese Ist-Einstufung[\s\S]*?Welche Maßnahmen tragen dazu bei[\s\S]*?Was muss für Stufe 2 belegt sein/);
 assert.doesNotMatch(maturity,/<table|Welchen Beitrag leistet externes Fachwissen|IT-Integration beim Kunden|Die Achsen zeigen Mittelwerte|Wie wäre die nächste Stufe erreichbar/);
 assert.doesNotMatch(innovationView({...state,customerAnalysis:{...state.customerAnalysis,scenarioInnovation:false}},context,'scenario'),/class="radar-target"/);
 customized.customerAnalysis.involvement.find(phase=>phase.id==='prototype').target=null;
 const openMaturity=innovationView(customized,context,'scenario');
 assert.match(openMaturity,/Für die hinterlegten Maßnahmen ist die Reifegradwirkung noch zu prüfen/);
 assert.doesNotMatch(openMaturity,/class="radar-target"|ca-scenario-innovation-toggle/);
 assert.match(view('involvement'),/Crowdsourcing für die Projektliste[\s\S]*?entwicklungsvorschlaege\/project/);
 await handleCustomerAnalysisEvent({
  type:'click',target:{closest:selector=>selector==='#panel-innovation'?{}:selector==='[data-ca-candidate]'?{dataset:{caCandidate:'innovation',caCandidateIdea:'advisor'}}:null}
 },state,{save(){},render(){},toast(){}});
 assert.match(state.actions.find(action=>action.originId==='course-innovation-advisor').deliverable,/KI-Assistenten/);
});
test('candidate handoff is idempotent and does not mutate tabs 1 to 3',()=>{
 const s=clone(DEFAULT_STATE),before=clone({model:s.model,ideas:s.ideas,profile:s.profile}),c=controls(s);
 c.click('data-ca-candidate','journey');c.click('data-ca-candidate','journey');c.click('data-ca-candidate','innovation');
 assert.equal(s.actions.filter(a=>a.originId==='course-journey').length,1);assert.equal(s.actions.filter(a=>a.originId==='course-innovation').length,1);
 assert.deepEqual({model:s.model,ideas:s.ideas,profile:s.profile},before);
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(s))),s);
});
test('new analysis imports accept unknown values and reject invalid scale and source data',()=>{
 const old=clone(DEFAULT_STATE);delete old.customerAnalysis;assert.deepEqual(validateState(old).customerAnalysis,DEFAULT_STATE.customerAnalysis);
 const s=clone(DEFAULT_STATE);s.customerAnalysis.journey[0].currentEmotion=null;s.customerAnalysis.involvement[2].current=0;assert.deepEqual(validateState(s),s);
 for(const value of [6,-1,1.5]){const bad=clone(DEFAULT_STATE);bad.customerAnalysis.journey[0].currentSatisfaction=value;assert.throws(()=>validateState(bad));}
 const bad=clone(DEFAULT_STATE);bad.customerAnalysis.examples[0].sourceUrl='javascript:alert(1)';assert.throws(()=>validateState(bad));
});

test('new fields survive export/import and invalid scales are rejected',()=>{
 const s=clone(DEFAULT_STATE);s.customerAnalysis.journey[0].currentEmotion=null;s.customerAnalysis.involvement[0].current=0;
 assert.deepEqual(validateState(JSON.parse(JSON.stringify(s))),s);
 const old=clone(s);delete old.customerAnalysis;assert.deepEqual(validateState(old).customerAnalysis,DEFAULT_STATE.customerAnalysis);
 for(const value of [-1,4,1.5]){const bad=clone(DEFAULT_STATE);bad.customerAnalysis.involvement[2].current=value;assert.throws(()=>validateState(bad));}
 const bad=clone(DEFAULT_STATE);bad.customerAnalysis.journey[0].targetSatisfaction=6;assert.throws(()=>validateState(bad));
});
