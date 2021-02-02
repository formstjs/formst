(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{105:function(e,n,t){"use strict";t.d(n,"a",(function(){return m})),t.d(n,"b",(function(){return f}));var r=t(0),o=t.n(r);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function c(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var l=o.a.createContext({}),d=function(e){var n=o.a.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},m=function(e){var n=d(e.components);return o.a.createElement(l.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},p=o.a.forwardRef((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=d(t),p=r,f=m["".concat(i,".").concat(p)]||m[p]||u[p]||a;return t?o.a.createElement(f,s(s({ref:n},l),{},{components:t})):o.a.createElement(f,s({ref:n},l))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=p;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var l=2;l<a;l++)i[l]=t[l];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},93:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return a})),t.d(n,"metadata",(function(){return i})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return l}));var r=t(3),o=(t(0),t(105));const a={id:"nested",title:"Nested Forms",sidebar_label:"Nested Forms",slug:"/nested"},i={unversionedId:"nested",id:"nested",isDocsHomePage:!1,title:"Nested Forms",description:"It is very simple to handle nested data. You can create nested forms by creating nested form models.",source:"@site/docs/Nested.md",slug:"/nested",permalink:"/formst/docs/nested",editUrl:"https://github.com/formstjs/formst-docs/docs/Nested.md",version:"current",sidebar_label:"Nested Forms",sidebar:"someSidebar",previous:{title:"Validation",permalink:"/formst/docs/validation"},next:{title:"Middleware",permalink:"/formst/docs/middleware"}},s=[{value:"Usage",id:"usage",children:[]}],c={toc:s};function l({components:e,...n}){return Object(o.b)("wrapper",Object(r.a)({},c,n,{components:e,mdxType:"MDXLayout"}),Object(o.b)("p",null,"It is very simple to handle nested data. You can create nested forms by creating nested form models."),Object(o.b)("h3",{id:"usage"},"Usage"),Object(o.b)("p",null,"In this example, CreateProject form model contains other form models, Milestone and ProjectTeam."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{}),"const Milestone = createFormModel(\n  'Milestone',\n  {\n    name: types.string,\n  },\n  {\n    validation: {\n      name: name => {\n        if (!name) {\n          return 'Required';\n        }\n      },\n    },\n  }\n);\n\nconst ProjectTeam = createFormModel(\n  'ProjectTeam',\n  {\n    name: types.string,\n    lead: types.string,\n  },\n  {\n    validation: {\n      name: 'required',\n      lead: ['required', 'minLen'],\n    },\n  }\n);\n\nconst CreateProject = createFormModel(\n  'CreateProject',\n  {\n    name: types.string,\n    milestones: types.array(Milestone),\n    team: ProjectTeam,\n  },\n  {\n    validation: {\n      name: ['required'],\n      milestones: 'valid',\n      team: 'valid',\n    },\n  }\n)\n")),Object(o.b)("p",null,"Note: ",Object(o.b)("inlineCode",{parentName:"p"},"valid")," is required to make sure the form checks the child form."))}l.isMDXComponent=!0}}]);