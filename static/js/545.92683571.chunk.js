"use strict";(self.webpackChunkmovies=self.webpackChunkmovies||[]).push([[545],{3030:function(e,n,t){t.d(n,{H$:function(){return x},HI:function(){return c},JZ:function(){return s},M5:function(){return j},VH:function(){return d},XT:function(){return i},bR:function(){return g},eb:function(){return p},tL:function(){return v},tx:function(){return f},vB:function(){return u},wM:function(){return m},yB:function(){return h},zv:function(){return l}});var r=t(4165),o=t(5861),a=t(9439),i=function(e){var n=(0,a.Z)(e.queryKey,2)[1].page;return fetch("https://api.themoviedb.org/3/discover/movie?api_key=".concat("3949a8e40149fe7ea222fce59c7d0f73","&language=en-US&include_adult=false&include_video=false&page=").concat(n)).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).then((function(e){var n=e.results;return{page:e.page,results:n,total_results:1e4,total_pages:500}})).catch((function(e){throw e}))},c=function(e){var n=(0,a.Z)(e.queryKey,2)[1].id;return fetch("https://api.themoviedb.org/3/movie/".concat(n,"?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))},s=function(){var e=(0,o.Z)((0,r.Z)().mark((function e(){return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=3949a8e40149fe7ea222fce59c7d0f73&language=en-US").then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e})));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),u=function(e){var n=e.queryKey,t=(0,a.Z)(n,2)[1].id;return fetch("https://api.themoviedb.org/3/movie/".concat(t,"/images?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))},f=function(e){var n=e.queryKey,t=(0,a.Z)(n,2)[1].id;return fetch("https://api.themoviedb.org/3/movie/".concat(t,"/reviews?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))},h=function(e){var n=(0,a.Z)(e.queryKey,2)[1].page;return fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=".concat("3949a8e40149fe7ea222fce59c7d0f73","&language=en-US&page=").concat(n)).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).then((function(e){var n=e.results;return{page:e.page,results:n,total_results:537,total_pages:14}})).catch((function(e){throw e}))},p=function(e){var n=(0,a.Z)(e.queryKey,2)[1].page;return fetch("https://api.themoviedb.org/3/trending/movie/week?api_key=".concat("3949a8e40149fe7ea222fce59c7d0f73","&language=en-US&page=").concat(n)).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).then((function(e){var n=e.results;return{page:e.page,results:n,total_results:1e4,total_pages:500}})).catch((function(e){throw e}))},d=function(e){var n=e.queryKey,t=(0,a.Z)(n,2)[1].id;return fetch("https://api.themoviedb.org/3/movie/".concat(t,"/videos?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))},l=function(e){var n=e.queryKey,t=(0,a.Z)(n,2)[1].id;return fetch("https://api.themoviedb.org/3/movie/".concat(t,"/credits?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))},g=function(e){var n=(0,a.Z)(e.queryKey,2)[1].page;return fetch("https://api.themoviedb.org/3/person/popular?api_key=".concat("3949a8e40149fe7ea222fce59c7d0f73","&language=en-US&include_adult=false&include_video=false&page=").concat(n)).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).then((function(e){var n=e.results;return{page:e.page,results:n,total_results:1e4,total_pages:500}})).catch((function(e){throw e}))},m=function(e){var n=(0,a.Z)(e.queryKey,2)[1].id;return fetch("https://api.themoviedb.org/3/person/".concat(n,"?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))},v=function(e){var n=e.queryKey,t=(0,a.Z)(n,2)[1].id;return fetch("https://api.themoviedb.org/3/person/".concat(t,"/images?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))},x=function(e){var n=e.queryKey,t=(0,a.Z)(n,2)[1].id;return fetch("https://api.themoviedb.org/3/person/".concat(t,"/movie_credits?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))},j=function(e){var n=e.queryKey,t=(0,a.Z)(n,2)[1].id;return fetch("https://api.themoviedb.org/3/person/".concat(t,"/tv_credits?api_key=").concat("3949a8e40149fe7ea222fce59c7d0f73")).then((function(e){if(!e.ok)throw new Error(e.json().message);return e.json()})).catch((function(e){throw e}))}},4436:function(e,n,t){t(2791);var r=t(7394),o=t(8264),a=t(5527),i=t(3400),c=t(890),s=t(7689),u=t(184);n.Z=function(e){var n=e.title,t=(0,s.s0)();return(0,u.jsxs)(a.Z,{elevation:5,component:"div",sx:{display:"flex",justifyContent:"space-around",flexWrap:"wrap",marginBottom:1.5},children:[(0,u.jsx)(i.Z,{"aria-label":"go back",onClick:function(){return t(-1)},children:(0,u.jsx)(r.Z,{color:"primary",fontSize:"large"})}),(0,u.jsx)(c.Z,{variant:"h4",component:"h3",children:n}),(0,u.jsx)(i.Z,{"aria-label":"go forward",onClick:function(){return t(1)},children:(0,u.jsx)(o.Z,{color:"primary",fontSize:"large"})})]})}},9515:function(e,n,t){t.d(n,{Z:function(){return a}});t(2791);var r=t(3239),o=t(184);function a(){return(0,o.jsxs)("div",{sx:{display:"flex",justifyContent:"center","& > * + *":{marginLeft:"2em"}},children:[(0,o.jsx)(r.Z,{}),(0,o.jsx)(r.Z,{})]})}},4461:function(e,n,t){t.r(n),t.d(n,{default:function(){return K}});var r=t(9439),o=t(2791),a=t(3030),i=t(4436),c=t(1889),s=t(5699),u=t(5527),f=t(1582),h=t(7246),p=t(7621),d=t(1492),l=t(9504),g=t(2169),m=t(9585),v=t(4294),x=t(890),j=t(5780),Z=t(7796),w=t(578),y=t(1087),k=t(4554),b=t(7804),_=t(5432),C=t(184);function z(e){var n=e.people,t=e.action,r=e.avatarCheck;return(0,C.jsxs)(p.Z,{sx:{maxWidth:345},elevation:5,style:s.Z.backgroundCardContainer,children:[(0,C.jsx)(m.Z,{avatar:r(n),title:(0,C.jsxs)(x.Z,{variant:"h5",component:"p",children:[n.name," "]})}),(0,C.jsx)(g.Z,{sx:{height:500},image:n.profile_path?"https://image.tmdb.org/t/p/w500/".concat(n.profile_path):w}),(0,C.jsx)(l.Z,{children:(0,C.jsxs)(c.ZP,{container:!0,children:[(0,C.jsx)(c.ZP,{item:!0,xs:6,children:(0,C.jsxs)(x.Z,{variant:"h6",component:"p",style:{whiteSpace:"nowrap"},children:[(0,C.jsx)(j.Z,{fontSize:"medium"})," ",n.known_for_department," "]})}),(0,C.jsx)(c.ZP,{item:!0,xs:6,children:(0,C.jsx)(x.Z,{variant:"h6",component:"p",style:{whiteSpace:"nowrap"},children:(0,C.jsx)(k.Z,{component:"span",ml:4,children:1===n.gender?(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(_.Z,{fontSize:"medium"}),"Female"," "]}):(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(b.Z,{fontSize:"medium"}),"Male"," "]})})})}),(0,C.jsx)(c.ZP,{item:!0,xs:6,children:(0,C.jsx)(x.Z,{variant:"h6",component:"p",style:{whiteSpace:"nowrap"},children:(0,C.jsxs)(k.Z,{component:"span",ml:0,children:[(0,C.jsx)(Z.Z,{fontSize:"medium"})," "," ",n.popularity.toFixed(2)," "]})})})]})}),(0,C.jsxs)(d.Z,{disableSpacing:!0,children:[t(n),(0,C.jsx)(y.rU,{to:"/people/popular/".concat(n.id),children:(0,C.jsx)(v.Z,{variant:"outlined",size:"medium",color:"primary",sx:{marginBottom:"25px",padding:"15px",marginLeft:"72px"},children:"More Info ..."})})]})]})}var S=function(e){var n=e.people,t=e.action,r=e.avatarCheck;return n.map((function(e){return(0,C.jsx)(c.ZP,{item:!0,xs:12,sm:6,md:4,lg:3,xl:2,children:(0,C.jsx)(z,{people:e,action:t,avatarCheck:r},e.id)},e.id)}))};var P=function(e){var n=e.people,t=e.title,r=e.action,o=e.avatarCheck,a=e.pageChange,p=e.currentPage,d=e.totalPages;return(0,C.jsxs)(c.ZP,{container:!0,sx:{padding:"20px"},style:s.Z.backgroundMainContainer,children:[(0,C.jsx)(c.ZP,{item:!0,xs:12,children:(0,C.jsx)(i.Z,{title:t})}),(0,C.jsx)(c.ZP,{item:!0,container:!0,spacing:5,children:(0,C.jsx)(S,{action:r,people:n,avatarCheck:o})}),(0,C.jsx)(u.Z,{elevation:5,component:"div",sx:{display:"flex",marginTop:2,left:"50%",transform:"translateX(-50%)",zIndex:1e3,position:"relative",padding:1.1},children:(0,C.jsx)(f.Z,{spacing:2,children:(0,C.jsx)(h.Z,{count:d,page:p,onChange:a,variant:"outlined",shape:"rounded",size:"large",boundaryCount:2,showFirstButton:!0,showLastButton:!0})})})]})},E=t(1933),q=t(9515),K=function(){var e=(0,o.useState)(1),n=(0,r.Z)(e,2),t=n[0],i=n[1],c=(0,E.useQuery)(["popularPeople",{page:t}],a.bR),s=c.data,u=c.error,f=c.isLoading,h=c.isError;if(f)return(0,C.jsx)(q.Z,{});if(h)return(0,C.jsx)("h1",{children:u.message});var p=s.results,d=s.total_pages;return(0,C.jsx)(P,{title:"Popular People",people:p,currentPage:t,totalPages:d,pageChange:function(e,n){i(n)},action:function(){return(0,C.jsx)(C.Fragment,{})},avatarCheck:function(){return(0,C.jsx)(C.Fragment,{})}})}},5699:function(e,n,t){t.d(n,{Z:function(){return a}});var r=t.p+"static/media/pexels-eberhard-grossgasteiger-1366919.1b0742abe3e5a29b7451.jpg",o=t.p+"static/media/pexels-laura-tancredi-7078717.1498457edb9a21999856.jpg",a={backgroundMainContainer:{backgroundImage:"url(".concat(r,")"),backgroundSize:"cover",backgroundPosition:"center",width:"100%",zIndex:-1,position:"absolute",right:0,left:0},backgroundCardContainer:{backgroundImage:"url(".concat(o,")"),backgroundSize:"cover",backgroundPosition:"center",zIndex:-1},backgroundDetailContainer:{backgroundColor:"rgba(219,232,240,0.7)",position:"fixed",top:0,left:0,width:"100vw",height:"100vh"}}},5780:function(e,n,t){var r=t(4836);n.Z=void 0;var o=r(t(5649)),a=t(184),i=(0,o.default)((0,a.jsx)("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 16H7v-.24C8.42 17.62 10.16 17 12 17s3.58.62 5 1.76V19zm2-1.14C17.2 16.09 14.73 15 12 15s-5.2 1.09-7 2.86V5h14v12.86zM12 13c1.93 0 3.5-1.57 3.5-3.5S13.93 6 12 6 8.5 7.57 8.5 9.5 10.07 13 12 13zm0-5c.83 0 1.5.67 1.5 1.5S12.83 11 12 11s-1.5-.67-1.5-1.5S11.17 8 12 8z"}),"AccountBoxOutlined");n.Z=i},7804:function(e,n,t){var r=t(4836);n.Z=void 0;var o=r(t(5649)),a=t(184),i=(0,o.default)([(0,a.jsx)("path",{d:"M14 7h-4c-1.1 0-2 .9-2 2v6h2v7h4v-7h2V9c0-1.1-.9-2-2-2z"},"0"),(0,a.jsx)("circle",{cx:"12",cy:"4",r:"2"},"1")],"ManOutlined");n.Z=i},5432:function(e,n,t){var r=t(4836);n.Z=void 0;var o=r(t(5649)),a=t(184),i=(0,o.default)([(0,a.jsx)("path",{d:"M13.94 8.31C13.62 7.52 12.85 7 12 7s-1.62.52-1.94 1.31L7 16h3.5v6h3v-6H17l-3.06-7.69z"},"0"),(0,a.jsx)("circle",{cx:"12",cy:"4",r:"2"},"1")],"Woman2Outlined");n.Z=i},578:function(e,n,t){e.exports=t.p+"static/media/film-poster-placeholder.9a8182eb4c8ae70fe602.png"}}]);
//# sourceMappingURL=545.92683571.chunk.js.map