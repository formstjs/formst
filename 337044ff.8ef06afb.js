(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{105:function(e,r,t){"use strict";t.d(r,"a",(function(){return l})),t.d(r,"b",(function(){return b}));var n=t(0),o=t.n(n);function c(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function s(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function a(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?s(Object(t),!0).forEach((function(r){c(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function p(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},c=Object.keys(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(n=0;n<c.length;n++)t=c[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=o.a.createContext({}),u=function(e){var r=o.a.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):a(a({},r),e)),t},l=function(e){var r=u(e.components);return o.a.createElement(i.Provider,{value:r},e.children)},d={inlineCode:"code",wrapper:function(e){var r=e.children;return o.a.createElement(o.a.Fragment,{},r)}},f=o.a.forwardRef((function(e,r){var t=e.components,n=e.mdxType,c=e.originalType,s=e.parentName,i=p(e,["components","mdxType","originalType","parentName"]),l=u(t),f=n,b=l["".concat(s,".").concat(f)]||l[f]||d[f]||c;return t?o.a.createElement(b,a(a({ref:r},i),{},{components:t})):o.a.createElement(b,a({ref:r},i))}));function b(e,r){var t=arguments,n=r&&r.mdxType;if("string"==typeof e||n){var c=t.length,s=new Array(c);s[0]=f;var a={};for(var p in r)hasOwnProperty.call(r,p)&&(a[p]=r[p]);a.originalType=e,a.mdxType="string"==typeof e?e:n,s[1]=a;for(var i=2;i<c;i++)s[i]=t[i];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,t)}f.displayName="MDXCreateElement"},82:function(e,r,t){"use strict";t.r(r),t.d(r,"frontMatter",(function(){return s})),t.d(r,"metadata",(function(){return a})),t.d(r,"toc",(function(){return p})),t.d(r,"default",(function(){return u}));var n=t(3),o=t(7),c=(t(0),t(105)),s={id:"preprocessors",title:"Preprocessors",sidebar_label:"Preprocessors",slug:"/preprocessors"},a={unversionedId:"preprocessors",id:"preprocessors",isDocsHomePage:!1,title:"Preprocessors",description:"We can process the input before setting the value.",source:"@site/docs/preprocessors.md",slug:"/preprocessors",permalink:"/docs/preprocessors",editUrl:"https://github.com/formstjs/formst-docs/docs/preprocessors.md",version:"current",sidebar_label:"Preprocessors",sidebar:"someSidebar",previous:{title:"Mixed Types",permalink:"/docs/mixed"},next:{title:"createFormModel",permalink:"/docs/api/create-form-model"}},p=[{value:"Usage",id:"usage",children:[]}],i={toc:p};function u(e){var r=e.components,t=Object(o.a)(e,["components"]);return Object(c.b)("wrapper",Object(n.a)({},i,t,{components:r,mdxType:"MDXLayout"}),Object(c.b)("p",null,"We can process the input before setting the value."),Object(c.b)("h3",{id:"usage"},"Usage"),Object(c.b)("pre",null,Object(c.b)("code",Object(n.a)({parentName:"pre"},{}),"const TodoForm = createFormModel(\n  'TodoForm',\n  {\n    title: types.string,\n    description: types.string,\n  },\n  {\n    ...,\n\n    // Adding preprocessor\n    preprocessor: {\n      title: (value: string) => value.toUpperCase(),\n    },\n  }\n);\n")))}u.isMDXComponent=!0}}]);