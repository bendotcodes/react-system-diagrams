import{c as E,g as M,s as f,i as T,j as s}from"./emotion-utils.browser.esm-DYhfUbuX.js";import{r as h}from"./index-CEThVCg_.js";function w(e,n){if(e.inserted[n.name]===void 0)return e.insert("",n,e.sheet,!0)}function x(e,n,t){var r=[],a=M(e,r,t);return r.length<2?t:a+n(r)}var S=function(n){var t=E(n);t.sheet.speedy=function(u){this.isSpeedy=u},t.compat=!0;var r=function(){for(var d=arguments.length,o=new Array(d),i=0;i<d;i++)o[i]=arguments[i];var c=f(o,t.registered,void 0);return T(t,c,!1),t.key+"-"+c.name},a=function(){for(var d=arguments.length,o=new Array(d),i=0;i<d;i++)o[i]=arguments[i];var c=f(o,t.registered),g="animation-"+c.name;return w(t,{name:c.name,styles:"@keyframes "+g+"{"+c.styles+"}"}),g},p=function(){for(var d=arguments.length,o=new Array(d),i=0;i<d;i++)o[i]=arguments[i];var c=f(o,t.registered);w(t,c)},m=function(){for(var d=arguments.length,o=new Array(d),i=0;i<d;i++)o[i]=arguments[i];return x(t.registered,r,R(o))};return{css:r,cx:m,injectGlobal:p,keyframes:a,hydrate:function(d){d.forEach(function(o){t.inserted[o]=!0})},flush:function(){t.registered={},t.inserted={},t.sheet.flush()},sheet:t.sheet,cache:t,getRegisteredStyles:M.bind(null,t.registered),merge:x.bind(null,t.registered,r)}},R=function e(n){for(var t="",r=0;r<n.length;r++){var a=n[r];if(a!=null){var p=void 0;switch(typeof a){case"boolean":break;case"object":{if(Array.isArray(a))p=e(a);else{p="";for(var m in a)a[m]&&m&&(p&&(p+=" "),p+=m)}break}default:p=a}p&&(t&&(t+=" "),t+=p)}}return t},U=S({key:"css"}),y=U.css,l=(e=>(e[e.Default=0]="Default",e[e.Moving=1]="Moving",e[e.Editing=2]="Editing",e))(l||{});function z(e){return h.useReducer(L,{data:e,state:{activeComponent:null,viewport:{moving:!1,position:{x:0,y:0}}}})}function L(e,n){var t,r,a,p;switch(n.type){case"move-begin":return e.state.activeComponent?e:{data:e.data,state:{...e.state,activeComponent:{id:n.id,state:l.Moving}}};case"move-end":return((t=e.state.activeComponent)==null?void 0:t.state)===l.Moving?{...e,state:{...e.state,activeComponent:null}}:e;case"viewport-begin":return e.state.activeComponent?e:{...e,state:{...e.state,viewport:{...e.state.viewport,moving:!0}}};case"viewport-end":return e.state.viewport.moving?{...e,state:{...e.state,viewport:{...e.state.viewport,moving:!1}}}:e;case"move":if(((r=e.state.activeComponent)==null?void 0:r.state)===l.Moving){const m=e.state.activeComponent.id,u={...e.data.components[m]};return u.position={x:u.position.x+n.position.x,y:u.position.y+n.position.y},{data:{...e.data,components:{...e.data.components,[m]:u}},state:e.state}}else return e.state.viewport.moving?{...e,state:{...e.state,viewport:{...e.state.viewport,position:{x:e.state.viewport.position.x+n.position.x,y:e.state.viewport.position.y+n.position.y}}}}:e;case"leave":return((a=e.state.activeComponent)==null?void 0:a.state)===l.Moving?{...e,state:{...e.state,activeComponent:null,viewport:{...e.state.viewport,moving:!1}}}:e;case"edit-begin":return{data:e.data,state:{...e.state,activeComponent:{id:n.id,state:l.Editing}}};case"edit-end":if(((p=e.state.activeComponent)==null?void 0:p.state)===l.Editing){const m=e.state.activeComponent.id,u={...e.data.components[m]};return u.name=n.text,{data:{...e.data,components:{...e.data.components,[m]:u}},state:{...e.state,activeComponent:null}}}else return e;default:return e}}function C({moving:e,position:n,onMouseDown:t,onMouseUp:r}){return s.jsxs(s.Fragment,{children:[s.jsxs("defs",{children:[s.jsx("pattern",{id:"smallGrid",width:"8",height:"8",patternUnits:"userSpaceOnUse",children:s.jsx("path",{d:"M 8 0 L 0 0 0 8",fill:"none",stroke:"gray",strokeWidth:"0.5"})}),s.jsxs("pattern",{id:"grid",width:"80",height:"80",patternUnits:"userSpaceOnUse",children:[s.jsx("rect",{width:"80",height:"80",fill:"url(#smallGrid)"}),s.jsx("path",{d:"M 80 0 L 0 0 0 80",fill:"none",stroke:"gray",strokeWidth:"1"})]})]}),s.jsx("rect",{x:-n.x,y:-n.y,width:"100%",height:"100%",fill:"url(#grid)",style:{cursor:e?"grabbing":"grab"},onMouseDown:()=>{t()},onMouseUp:()=>{r()}})]})}C.__docgenInfo={description:"",methods:[],displayName:"Grid",props:{moving:{required:!0,tsType:{name:"boolean"},description:""},position:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]}},description:""},onMouseDown:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMouseUp:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};function D({data:{name:e,position:n,size:t},state:r,onMouseDown:a,onMouseUp:p,onDoubleClick:m,onEditDone:u}){const d=h.useRef(null);return h.useEffect(()=>{r===l.Editing&&d.current&&(d.current.innerHTML=e,d.current.focus())},[r]),s.jsxs("g",{className:y`
        cursor: ${r===l.Editing?"text":"move"};
        user-select: none;
      `,onMouseDown:()=>{a()},onMouseUp:()=>{p()},onDoubleClick:()=>{m()},children:[s.jsx("rect",{fill:"#ffffff",stroke:"#d3d3d3",strokeWidth:1,x:n.x,y:n.y,width:t.width,height:t.height,style:{filter:"drop-shadow(3px 3px 2px #d3d3d3)"}}),s.jsx("foreignObject",{x:n.x,y:n.y,width:t.width,height:t.height,children:r===l.Editing?s.jsx("div",{ref:d,contentEditable:!0,onBlur:o=>{u(o.target.innerHTML)},onKeyDown:o=>{if(o.code==="Escape"){const i=o.target;u(i.innerHTML),console.log(i.innerHTML)}},onFocus:o=>{const i=o.target,c=window.getSelection();if(c){const g=document.createRange();c.removeAllRanges(),g.selectNodeContents(i),g.collapse(!1),c.addRange(g),i.focus()}},className:y`
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              justify-content: center;
              outline: 0;
            `}):s.jsx("div",{className:y`
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              justify-content: center;
              outline: 0;
            `,dangerouslySetInnerHTML:{__html:e}})})]})}D.__docgenInfo={description:"",methods:[],displayName:"Component",props:{id:{required:!0,tsType:{name:"string"},description:""},data:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  name: string;
  position: Position;
  size: Size;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"position",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"size",value:{name:"signature",type:"object",raw:`{
  width: number;
  height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]}},description:""},state:{required:!0,tsType:{name:"ComponentState"},description:""},onMouseDown:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onMouseUp:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onDoubleClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},onEditDone:{required:!0,tsType:{name:"signature",type:"function",raw:"(text: string) => void",signature:{arguments:[{type:{name:"string"},name:"text"}],return:{name:"void"}}},description:""}}};function k({initialData:e}){const[n,t]=z(e);return s.jsxs("svg",{className:y`
        width: 100%;
        height: 100%;
      `,onMouseMove:r=>{t({type:"move",position:{x:r.movementX,y:r.movementY}})},onMouseLeave:()=>{t({type:"leave"})},children:[s.jsx("filter",{id:"shadow",children:s.jsx("feDropShadow",{dx:"0.2",dy:"0.4",stdDeviation:"0.2",floodColor:"#d3d3d3"})}),s.jsxs("g",{style:{transform:`translate(${n.state.viewport.position.x.toString()}px, ${n.state.viewport.position.y.toString()}px)`},children:[s.jsx(C,{moving:n.state.viewport.moving,position:n.state.viewport.position,onMouseDown:()=>{t({type:"viewport-begin"})},onMouseUp:()=>{t({type:"viewport-end"})}}),Object.keys(n.data.components).map(r=>{var a;return s.jsx(D,{id:r,data:n.data.components[r],state:r===((a=n.state.activeComponent)==null?void 0:a.id)?n.state.activeComponent.state:l.Default,onMouseDown:()=>{t({type:"move-begin",id:r})},onMouseUp:()=>{t({type:"move-end"})},onDoubleClick:()=>{t({type:"edit-begin",id:r})},onEditDone:p=>{t({type:"edit-end",text:p})}},r)})]})]})}k.__docgenInfo={description:"",methods:[],displayName:"Diagram",props:{initialData:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  components: Record<string, ComponentData>;
}`,signature:{properties:[{key:"components",value:{name:"Record",elements:[{name:"string"},{name:"signature",type:"object",raw:`{
  name: string;
  position: Position;
  size: Size;
}`,signature:{properties:[{key:"name",value:{name:"string",required:!0}},{key:"position",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}}]},required:!0}},{key:"size",value:{name:"signature",type:"object",raw:`{
  width: number;
  height: number;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]}}],raw:"Record<string, ComponentData>",required:!0}}]}},description:""}}};const I={component:k},v={args:{initialData:{components:{test:{name:"Test",position:{x:10,y:10},size:{width:150,height:50}}}}}};var b,j,q;v.parameters={...v.parameters,docs:{...(b=v.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    initialData: {
      components: {
        test: {
          name: 'Test',
          position: {
            x: 10,
            y: 10
          },
          size: {
            width: 150,
            height: 50
          }
        }
      }
    }
  }
}`,...(q=(j=v.parameters)==null?void 0:j.docs)==null?void 0:q.source}}};const H=["Example"];export{v as Example,H as __namedExportsOrder,I as default};
