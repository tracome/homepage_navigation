import{j as a,a as l}from"./index-1bc60ed3.js";import{I as t,l as d,i as c}from"./utils-19175b8d.js";import{b as B,a as M}from"./react-spring_web.modern-34e06984.js";function f({links:r,width:o="160px",height:s="176px"}){const i=B(r,{trail:400/r.length,from:{opacity:0,transform:"scale3d(0,0,0)"},enter:{opacity:1,transform:"scale3d(1,1,1)"},config:{tension:500,friction:50}});return a("main",{className:"BM-grid-rows-auto BM-grid BM-gap-20",style:{gridTemplateColumns:`repeat(auto-fill,minmax(${o},1fr))`,gridAutoRows:s},children:i((n,e)=>l(M.a,{target:"_blank",href:e.link,className:"BM-flex BM-h-full BM-cursor-pointer BM-flex-col BM-items-center BM-justify-center BM-overflow-hidden BM-rounded-20 BM-bg-1f BM-no-underline hover:BM-drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)] dark:BM-bg-darkItem dark:hover:BM-drop-shadow-[0_10px_10px_rgba(15,23,42,0.8)]",style:n,children:[a(t,{height:40,width:"80%",className:"BM-rounded-10 BM-object-scale-down BM-object-center",src:e.icon,preview:!1,fallback:d,placeholder:a(t,{preview:!1,src:c,height:40,width:"100%",className:"BM-object-center"})}),a("h1",{className:"BM-py-[1em] BM-text-20 BM-text-333 dark:BM-text-white",children:e.text}),a("p",{className:"BM-px-[1em] BM-text-12 BM-leading-[1.2em] BM-text-999 dark:BM-text-darkTextWhite",style:{height:e.desc?"auto":"1em"},children:e.desc})]},e.link))})}export{f as I};
