import{r as u}from"./index-RYns6xqu.js";var l={exports:{}},n={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var x=u,y=Symbol.for("react.element"),E=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,O=x.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,R={key:!0,ref:!0,__self:!0,__source:!0};function f(o,r,p){var e,t={},a=null,m=null;p!==void 0&&(a=""+p),r.key!==void 0&&(a=""+r.key),r.ref!==void 0&&(m=r.ref);for(e in r)v.call(r,e)&&!R.hasOwnProperty(e)&&(t[e]=r[e]);if(o&&o.defaultProps)for(e in r=o.defaultProps,r)t[e]===void 0&&(t[e]=r[e]);return{$$typeof:y,type:o,key:a,ref:m,props:t,_owner:O.current}}n.Fragment=E;n.jsx=f;n.jsxs=f;l.exports=n;var g=l.exports;function d(){return g.jsx("h1",{children:"Hello Diagram"})}d.__docgenInfo={description:"",methods:[],displayName:"Diagram"};const j={component:d},s={};var i,c,_;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(_=(c=s.parameters)==null?void 0:c.docs)==null?void 0:_.source}}};const S=["Example"];export{s as Example,S as __namedExportsOrder,j as default};
