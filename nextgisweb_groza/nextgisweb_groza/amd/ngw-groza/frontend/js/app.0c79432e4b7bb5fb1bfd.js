webpackJsonp([1],{0:function(t,n){},"7zck":function(t,n){},AGWN:function(t,n){},AOrw:function(t,n){},EYnv:function(t,n){},NHnr:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=e("7+uW"),a=e("3EgV"),o=e.n(a),i=e("K/Lq"),r=e.n(i),l={render:function(){var t=this.$createElement,n=this._self._c||t;return n("div",{attrs:{id:"app"}},[n("v-app",[n("router-view")],1)],1)},staticRenderFns:[]};var c=e("VU/8")({name:"App"},l,!1,function(t){e("AOrw")},null,null).exports,u=e("/ocq"),v=e("BO1k"),d=e.n(v),f=e("nrd6"),p={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",{attrs:{fluid:"","grid-list-md":""}},[e("v-flex",{attrs:{xs12:""}},[e("v-card",[e("v-card-title",[e("h4",[t._v(t._s(0!=t.event.ampl?"Молния «облако-земля»":"Облачная молния "))])]),t._v(" "),e("v-divider"),t._v(" "),e("v-list",{attrs:{dense:""}},[e("v-list-tile",[e("v-list-tile-content",[t._v("Дата")]),t._v(" "),e("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.moment(new Date(1e3*t.event.ev_ts)).format("YYYY/MM/DD"))+"\n          ")])],1),t._v(" "),e("v-list-tile",[e("v-list-tile-content",[t._v("Время")]),t._v(" "),e("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.moment(new Date(1e3*t.event.ev_ts)).format("HH:mm:ss"))+"\n          ")])],1),t._v(" "),e("v-list-tile",[e("v-list-tile-content",[t._v("Широта:")]),t._v(" "),e("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.event.lat))])],1),t._v(" "),e("v-list-tile",[e("v-list-tile-content",[t._v("Долгота:")]),t._v(" "),e("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.event.lon))])],1),t._v(" "),e("v-list-tile",[e("v-list-tile-content",[t._v("Аплитуда, кВ:")]),t._v(" "),e("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.event.ampl))])],1)],1)],1)],1)],1)},staticRenderFns:[]};var h=e("VU/8")({name:"EventPopup",props:["event"]},p,!1,function(t){e("UUpG")},"data-v-29df2a3a",null).exports,m=L.FeatureGroup.extend({initialize:function(t,n,e){this._layers={},this._eventsSocket=t,this._styles=n,this._popup=null,Object(f.setOptions)(this,e)},addEvent:function(t){var n=this._styles[t.rule],e=new L.CircleMarker([t.lat,t.lon],n);e._grozaEvent=t,e._grozaId=t.id,this.addLayer(e);var a=this;e.on("click",function(){var t=this._map,n=new(s.a.extend(h))({propsData:{event:this._grozaEvent}});n.$mount();var e=n.$el,o=L.popup({maxWidth:300}).setLatLng(this.getLatLng()).setContent(e);t.openPopup(o),a._popup=o,console.log(this)})},addEvents:function(t){var n=!0,e=!1,s=void 0;try{for(var a,o=d()(t);!(n=(a=o.next()).done);n=!0){var i=a.value;this.addEvent(i)}}catch(t){e=!0,s=t}finally{try{!n&&o.return&&o.return()}finally{if(e)throw s}}},getLayerId:function(t){return t._grozaId},onAdd:function(t){var n=this;this._eventsSocket.getEvents().then(function(e){n.addEvents(e);var s=n.getBounds();t.flyToBounds(s)})}});L.EventsOverlay=m,L.EventsOverlay.eventsOverlay=function(){return new m};var j=m,g=e("//Fk"),_=e.n(g),w=e("Zrlr"),E=e.n(w),y=e("wxAW"),b=e.n(y),z=e("DmT9"),U=e.n(z),k=function(){function t(){E()(this,t);var n=this;this.socket=U()(window.grozaConfig.rgUrl,{transports:["websocket"]}),this.socket.on("connection",function(t){n.socket.on("events",function(t){console.log("message: "+t)})})}return b()(t,[{key:"getEvents",value:function(){var t=this;return new _.a(function(n,e){t.socket.emit("find","events",function(t,s){t&&e(t),n(s)})})}}]),t}(),R={name:"Panel",data:function(){return{switchCloud:!0}},methods:{onChange:function(){console.log()}}},x={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"grey lighten-3"},[e("v-toolbar",{attrs:{color:"blue"}},[e("v-toolbar-side-icon"),t._v(" "),e("v-toolbar-title",{staticClass:"white--text"},[t._v("Панель управления")])],1),t._v(" "),e("v-card",[e("v-container",{staticStyle:{"min-height":"0"},attrs:{fluid:"","grid-list-lg":""}},[e("v-layout",{attrs:{row:"",wrap:""}},[e("v-flex",{attrs:{xs12:""}},[e("v-switch",{attrs:{label:"Облачные молнии"},on:{change:function(n){t.onChange()}},model:{value:t.switchCloud,callback:function(n){t.switchCloud=n},expression:"switchCloud"}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var O=e("VU/8")(R,x,!1,function(t){e("pwew")},"data-v-019d4213",null).exports,S=L.Control.extend({onAdd:function(t){var n=new(s.a.extend(O))({});return n.$mount(),n.$el},onRemove:function(t){}}),T={name:"Map",mounted:function(){this.initMap()},methods:{initMap:function(){var t=this;this.$store.dispatch("NGW_WEB_MAP").then(function(n){var e=n.data;if(e.success){var s=e.data;t.map=L.map("map",{crs:L.CRS.EPSG3857}),t.map.fitBounds(s.extent);var a=s.basemap,o=L.tileLayer(a.url,{id:a.resource_id});t.map.addLayer(o);var i=s.layers,r=(t.$store.dispatch("IMAGE_ADAPTER_URL"),!0),l=!1,c=void 0;try{for(var u,v=d()(i);!(r=(u=v.next()).done);r=!0)u.value}catch(t){l=!0,c=t}finally{try{!r&&v.return&&v.return()}finally{if(l)throw c}}}var f=new k,p=new j(f,window.grozaConfig.settings.eventsStyles);t.map.addLayer(p),new S({position:"topright"}).addTo(t.map)})}}},C={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{attrs:{id:"map"}})},staticRenderFns:[]};var A={name:"Monitoring",components:{"app-map":e("VU/8")(T,C,!1,function(t){e("Shd5")},"data-v-c100ca44",null).exports}},F={render:function(){var t=this.$createElement;return(this._self._c||t)("app-map")},staticRenderFns:[]};var H=e("VU/8")(A,F,!1,function(t){e("cyT6")},"data-v-08237d1a",null).exports,P={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("history")])},staticRenderFns:[]};var N=e("VU/8")({name:"History"},P,!1,function(t){e("z5fQ")},"data-v-3b96e6fa",null).exports,G={name:"Login",data:function(){return{valid:!1,authFail:!1,login:"",loginRules:[function(t){return!!t||"Логин обязателен"}],password:"",pswRules:[function(t){return!!t||"Пароль обязателен"}]}},methods:{submit:function(){var t=this,n=this.login,e=this.password,s=this;this.$store.dispatch("AUTH_REQUEST",{login:n,password:e}).then(function(n){n?(t.authFail=!1,s.$router.push("/")):t.authFail=!0})}}},M={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-content",[e("v-container",{attrs:{fluid:"","fill-height":""}},[e("v-layout",{attrs:{"align-center":"","justify-center":""}},[e("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[e("v-card",{staticClass:"elevation-12"},[e("v-toolbar",{attrs:{dark:"",color:"primary"}},[e("v-toolbar-title",[t._v("Авторизация")])],1),t._v(" "),e("v-card-text",[e("v-form",{on:{submit:t.submit},model:{value:t.valid,callback:function(n){t.valid=n},expression:"valid"}},[e("v-text-field",{attrs:{rules:t.loginRules,"prepend-icon":"person",name:"login",label:"Логин",type:"text"},model:{value:t.login,callback:function(n){t.login=n},expression:"login"}}),t._v(" "),e("v-text-field",{attrs:{rules:t.pswRules,"prepend-icon":"lock",name:"password",label:"Пароль",id:"password",type:"password"},model:{value:t.password,callback:function(n){t.password=n},expression:"password"}})],1),t._v(" "),e("div",[e("v-alert",{attrs:{type:"error",dismissible:""},model:{value:t.authFail,callback:function(n){t.authFail=n},expression:"authFail"}},[t._v("\n                Вход не выполнен\n              ")])],1)],1),t._v(" "),e("v-card-actions",[e("v-spacer"),t._v(" "),e("v-btn",{attrs:{disabled:!t.valid,color:"primary"},nativeOn:{click:function(n){return t.submit(n)}}},[t._v("Войти")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var q,W,V,B,D=e("VU/8")(G,M,!1,function(t){e("AGWN")},"data-v-1aa38d2a",null).exports,I=e("NYxO"),Q=e("bOdI"),X=e.n(Q),Y={state:{status:"",profile:{}},getters:{getProfile:function(t){return t.profile},isProfileLoaded:function(t){return!!t.profile.name}},actions:X()({},"USER_REQUEST",function(t){var n=t.commit;t.dispatch;n("USER_REQUEST")}),mutations:(q={},X()(q,"USER_REQUEST",function(t){t.status="loading"}),X()(q,"USER_SUCCESS",function(t,n){t.status="success",s.a.set(t,"profile",n)}),X()(q,"USER_ERROR",function(t){t.status="error"}),X()(q,"AUTH_LOGOUT",function(t){t.profile={}}),q)},$={authCookie:"true"===r.a.get("groza")||!1,status:"",hasLoadedOnce:!1},K={isAuthenticated:function(){return $.authCookie},authStatus:function(){return $.status}},J=(W={},X()(W,"AUTH_REQUEST",function(t,n){var e=t.commit,s=t.dispatch;return new _.a(function(t,a){e("AUTH_REQUEST"),s("NGW_LOGIN",n).then(function(n){!0===n.data.login?(e("AUTH_SUCCESS"),s("USER_REQUEST"),t(!0)):(r.a.delete("groza"),t(!1))}).catch(function(t){e("AUTH_ERROR",t),r.a.delete("groza"),a(t)})})}),X()(W,"AUTH_LOGOUT",function(t){var n=t.commit;t.dispatch;return new _.a(function(t,e){n("AUTH_LOGOUT"),r.a.delete("groza"),t()})}),W),Z=(V={},X()(V,"AUTH_REQUEST",function(t){t.status="loading"}),X()(V,"AUTH_SUCCESS",function(t){t.status="success",r.a.set("groza",!0,{expires:"3D"}),t.authCookie=!0,t.hasLoadedOnce=!0}),X()(V,"AUTH_ERROR",function(t){t.status="error",t.hasLoadedOnce=!0}),X()(V,"AUTH_LOGOUT",function(t){r.a.delete("groza")}),V),tt={state:$,getters:K,actions:J,mutations:Z},nt=e("mtWM"),et=e.n(nt),st=e("mw3O"),at=e.n(st),ot=window.grozaConfig.ngwUrl,it=et.a.create({baseURL:ot}),rt={state:{},getters:{},actions:(B={},X()(B,"NGW_LOGIN",function(t,n){t.commit,t.dispatch;return it.post("/api/groza/login",at.a.stringify(n))}),X()(B,"NGW_WEB_MAP",function(t){t.commit,t.dispatch;var n=window.grozaConfig.settings.web_map;return it.get("/api/groza/webmap/"+n+"/")}),X()(B,"IMAGE_ADAPTER_URL",function(t){t.commit,t.dispatch;return ot+"/api/component/render/image"}),B),mutations:{}};s.a.use(I.a);var lt=new I.a.Store({modules:{user:Y,auth:tt,ngw:rt},strict:!1});s.a.use(u.a);var ct=function(t,n,e){lt.getters.isAuthenticated?e():e("/login")},ut=new u.a({mode:"hash",routes:[{path:"/",name:"Monitoring",component:H,beforeEnter:ct},{path:"/history",name:"History",component:N,beforeEnter:ct},{path:"/login",name:"Login",component:D,beforeEnter:function(t,n,e){lt.getters.isAuthenticated?e("/"):e()}}]}),vt=(e("j1ja"),e("7zck"),e("EYnv"),e("fTnx")),dt=e.n(vt),ft=e("PJh5"),pt=e.n(ft),ht=e("RAhh"),mt=e.n(ht);s.a.prototype.moment=pt.a,s.a.prototype.formatcoords=mt.a,s.a.config.productionTip=!1,s.a.component("split-pane",dt.a),s.a.use(o.a,{theme:{primary:"#016fc5"}}),s.a.use(r.a),new s.a({el:"#app",store:lt,router:ut,components:{App:c},template:"<App />"})},Shd5:function(t,n){},UUpG:function(t,n){},cyT6:function(t,n){},pwew:function(t,n){},uslO:function(t,n,e){var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function a(t){return e(o(t))}function o(t){var n=s[t];if(!(n+1))throw new Error("Cannot find module '"+t+"'.");return n}a.keys=function(){return Object.keys(s)},a.resolve=o,t.exports=a,a.id="uslO"},z5fQ:function(t,n){}},["NHnr"]);
//# sourceMappingURL=app.0c79432e4b7bb5fb1bfd.js.map