if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let f=Promise.resolve();return c[e]||(f=new Promise(async f=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=f}else importScripts(e),f()})),f.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},f=(f,c)=>{Promise.all(f.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(f)};self.define=(f,i,s)=>{c[f]||(c[f]=Promise.resolve().then(()=>{let c={};const a={uri:location.origin+f.slice(1)};return Promise.all(i.map(f=>{switch(f){case"exports":return c;case"module":return a;default:return e(f)}})).then(e=>{const f=s(...e);return c.default||(c.default=f),c})}))}}define("./service-worker.js",["./workbox-e170c028"],(function(e){"use strict";e.setCacheNameDetails({prefix:"g2gbox"}),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"css/10.b7f65fd5.css",revision:"1eb3e8004c0a40b513faaddbdf1569a9"},{url:"css/12.ffe8051e.css",revision:"1e1d2ced41d7132cd0f69505fa6c2cab"},{url:"css/2.b8cc662b.css",revision:"e0807b3c8928945a9a58d55de1bae3f0"},{url:"css/3.9ba69811.css",revision:"330017381124196e19bb3c99f5cbac10"},{url:"css/4.4566c469.css",revision:"5bb5785b5e29c0f9effc3211bb656bd2"},{url:"css/5.5e0b59f4.css",revision:"2f1099cb3ae1ae2936ae9e08278d6519"},{url:"css/6.2f7316c4.css",revision:"c9b0354be8fc714317b609d12fc6ddb9"},{url:"css/7.f194ceae.css",revision:"543d8f09241ae455df2e761983ba1284"},{url:"css/8.5e9ed848.css",revision:"cb541bb9f622d9e418770333e48caae1"},{url:"css/9.fca98fe5.css",revision:"bf77f89c31705db6c1d31560ce8b1b46"},{url:"css/app.4343dc58.css",revision:"6a197f7b7824bff9f02e8517a28183de"},{url:"css/vendor.d8fcc367.css",revision:"dfdb8d2cb66f268a4643b52451aa4021"},{url:"favicon.ico",revision:"8b9eb314ff597f6f7c7bf8c7a5f717ec"},{url:"fonts/KFOkCnqEu92Fr1MmgVxIIzQ.a45108d3.woff",revision:"5cb7edfceb233100075dc9a1e12e8da3"},{url:"fonts/KFOlCnqEu92Fr1MmEU9fBBc-.cea99d3e.woff",revision:"87284894879f5b1c229cb49c8ff6decc"},{url:"fonts/KFOlCnqEu92Fr1MmSU5fBBc-.865f928c.woff",revision:"b00849e00f4c2331cddd8ffb44a6720b"},{url:"fonts/KFOlCnqEu92Fr1MmWUlfBBc-.2267169e.woff",revision:"adcde98f1d584de52060ad7b16373da3"},{url:"fonts/KFOlCnqEu92Fr1MmYUtfBBc-.bac8362e.woff",revision:"bb1e4dc6333675d11ada2e857e7f95d7"},{url:"fonts/KFOmCnqEu92Fr1Mu4mxM.49ae34d4.woff",revision:"60fa3c0614b8fb2f394fa29944c21540"},{url:"fonts/fa-brands-400.28d8b8fc.woff",revision:"dc0bd022735ed218df547742a1b2f172"},{url:"fonts/fa-brands-400.37913cdf.woff2",revision:"cac68c831145804808381a7032fdc7c2"},{url:"fonts/fa-regular-400.c3c2ab4f.woff2",revision:"3a3398a6ef60fc64eacf45665958342e"},{url:"fonts/fa-regular-400.fcaa6c13.woff",revision:"05b53beb21e3ef13d28244545977152d"},{url:"fonts/fa-solid-900.22aa6d43.woff",revision:"ee09ad7553b8ad3d81150d609d5341a0"},{url:"fonts/fa-solid-900.4055b057.woff2",revision:"c500da19d776384ba69573ae6fe274e7"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.0cd122a9.woff",revision:"3e818a94fbf09bb3f988bf070952b382"},{url:"fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.2987c5cc.woff2",revision:"945837e0b4566b601ce571159eb59e07"},{url:"icons/apple-icon-120x120.png",revision:"c9920835d2adb9f6ab6a79a27f220a3a"},{url:"icons/apple-icon-152x152.png",revision:"9df9e65a1d2c6df3bd9143666b0e8c63"},{url:"icons/apple-icon-167x167.png",revision:"4300c6c136c06abcd781aa18644dd7a3"},{url:"icons/apple-icon-180x180.png",revision:"88dbf3d9e8269f1298486d103e22a57c"},{url:"icons/favicon-128x128.png",revision:"1be07e62226c8f6a7086f132d9be1642"},{url:"icons/favicon-16x16.png",revision:"df5ff7f4728c4ef4b951d46b4136906f"},{url:"icons/favicon-32x32.png",revision:"64aa9e88dd6545f64226c1e2230f66cc"},{url:"icons/favicon-96x96.png",revision:"d22664397060743b24e8956a5a3fcdec"},{url:"icons/icon-128x128.png",revision:"1be07e62226c8f6a7086f132d9be1642"},{url:"icons/icon-192x192.png",revision:"a1b423855a450ae7adbd9d2a782e0dfb"},{url:"icons/icon-256x256.png",revision:"9f33ebc999e51d0dc2975fc573d53a0b"},{url:"icons/icon-384x384.png",revision:"a126be0d50ed682c3129e0b8b31f680a"},{url:"icons/icon-512x512.png",revision:"02abd24e7c8638e848d96a6bf78d2c27"},{url:"icons/ms-icon-144x144.png",revision:"f256ec55be616f32ae486ab7571eb936"},{url:"icons/safari-pinned-tab.svg",revision:"de8107bed7f087fb443d8e36855e7467"},{url:"img/1.49fb6fde.png",revision:"fde881316fcd46c74b77bb8f35e10d1e"},{url:"img/2.7715f0ce.png",revision:"1d0df619fcd4fbb73c7747d833dc5b69"},{url:"img/3.5bd333b5.png",revision:"f7024afaa4cabe7d7922385a89e9b2d0"},{url:"img/4.219d86fc.png",revision:"6346d2e07afc114319128a5ff9d6fbc4"},{url:"img/cashout_result.0748060a.png",revision:"1f476fa1677cecf0875a955cbadc8ff4"},{url:"img/gp2.6b3600ac.png",revision:"0e622a1e367985f5b69a4791ed66c6de"},{url:"img/gp3.ebd6cb4c.png",revision:"45061495d47b422d24ecdb4bfcf5ee5d"},{url:"img/gp4.c4101c9d.png",revision:"a8be5475e831fe14104d7fba3032fd00"},{url:"img/head.cd78f65b.png",revision:"4f742621a267fe9c30954a3b4e0172f1"},{url:"img/home_logo.97fd472d.png",revision:"2c346fb0ebbc9a2ad239a1af12b7b1f0"},{url:"img/logo.2db39557.png",revision:"14347bbced61f2bfdb62c0ccf3f0e951"},{url:"img/money.269b8843.png",revision:"7bd3abeee6f77b9ab59d8a521179536f"},{url:"img/p2.5938198a.png",revision:"2d80ea7eb2fc62d610a2cdf58a9588d6"},{url:"img/p3.5a502667.png",revision:"9c9014b78a2bc41dbb4c189b4f68ca50"},{url:"img/p4.7f7168fa.png",revision:"92b93b0b5d0bc7e8622f90b02e7a6f4d"},{url:"img/pay_error.253c9e26.png",revision:"bb9d7ee23fa272850b0b221b4bff885d"},{url:"img/pay_success.cff626c3.png",revision:"355e18d81c5a178b15edf86e32c01db9"},{url:"img/store_icon.1ade2431.png",revision:"b2dacbec11a505f28f28f4bc2650b7d1"},{url:"img/thank_you.73bb7962.png",revision:"da99be347b338b2368d3abf587892b33"},{url:"img/urcash.b0aea483.jpg",revision:"0b9e5c412e11d848ff875f452af533d7"},{url:"img/welcome_verify.dcd77b21.png",revision:"cff1d22a735a60011f834e901e2db875"},{url:"index.html",revision:"c0a2d5e5bb3139cc4e943d202f0486ac"},{url:"js/10.71b946da.js",revision:"3e5841a1c6cc6d3e4d121a2ee035a0fe"},{url:"js/11.0ef6cf7b.js",revision:"cd3fbbc472e4d50302bdb812d143b9cc"},{url:"js/12.8f417bfd.js",revision:"fd727a6d01763beef94a59baa0ee5f5a"},{url:"js/13.1285017f.js",revision:"3897745586cf3deb0796b3de29b54547"},{url:"js/14.f39766b7.js",revision:"22391914201de2309c7597f1435f1ff7"},{url:"js/15.96126a37.js",revision:"a16fc8fb4875397ae4b7a026283a48eb"},{url:"js/16.f96c591e.js",revision:"f097bab2cefb250f4c7cbe43e19fed8a"},{url:"js/17.61b1a423.js",revision:"3f8b86cfcac13f498919eb0f59d8dc2d"},{url:"js/18.e930834e.js",revision:"efc714a4a36cfdde4be883d2088f1b7e"},{url:"js/19.1afba877.js",revision:"49a98efb9e5cedbe68098a412235fbad"},{url:"js/2.e19b56d7.js",revision:"cf3ff79b60f2753abf297f3295df3a3a"},{url:"js/20.6e1f1c11.js",revision:"2aa9d6836f9ba59af92facb06a364bf7"},{url:"js/3.c11b31a4.js",revision:"3bd22cd88373a12ed8192d5e8a22c3a1"},{url:"js/4.68b8268a.js",revision:"6385e25fb6d8aa6d02be1e6e0583c802"},{url:"js/5.fad20ad4.js",revision:"6ea49d8d38155a8ed4164f833cbaae17"},{url:"js/6.71e8c33a.js",revision:"a68e1e151d6908df473f9728e4ca8cd9"},{url:"js/7.766facb0.js",revision:"562ec6065651068a3fae69100b919371"},{url:"js/8.5b0a882d.js",revision:"d1ad3b2534fd3b42592918ffd9b268dc"},{url:"js/9.804b88c6.js",revision:"93c32a2b09ece7e15758474c47c8845e"},{url:"js/app.c26ebf68.js",revision:"b5939ed36b3e373caab95c1bd902ab29"},{url:"js/vendor.9af57f9a.js",revision:"2949ccef569641d46ac09423df5e8bef"},{url:"manifest.json",revision:"e307b63fc778a580340a1eb4262698c2"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/service-worker\.js$/,/workbox-(.)*\.js$/]}))}));
