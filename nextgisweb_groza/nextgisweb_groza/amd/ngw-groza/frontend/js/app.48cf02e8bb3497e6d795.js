webpackJsonp([1],{0:function(t,e){},"1kNR":function(t,e){},"7zck":function(t,e){},"9VWe":function(t,e){},A2R1:function(t,e){},AGWN:function(t,e){},AOrw:function(t,e){},C77s:function(t,e){},EYnv:function(t,e){},H60B:function(t,e){},K4gw:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=n("7+uW"),i=n("3EgV"),a=n.n(i),o=n("K/Lq"),r=n.n(o),l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("v-app",[e("router-view")],1)],1)},staticRenderFns:[]};var c=n("VU/8")({name:"App"},l,!1,function(t){n("AOrw")},null,null).exports,u=n("/ocq"),d=n("nrd6"),h=n.n(d),v=(n("0nqb"),{name:"NgMap",data:function(){return{ready:!1}},mounted:function(){this.initMap()},methods:{initMap:function(){var t=this;this.$store.dispatch("NGW_WEB_MAP").then(function(e){var n=e.data;if(n.success){t.webMapInfo=n.data,t.map=h.a.map(t.$el,{crs:h.a.CRS.EPSG3857}),t.map.fitBounds(t.webMapInfo.extent);h.a.control.graphicScale({showSubunits:!0,doubleLine:!0,fill:"fill"}).addTo(t.map)}t.ready=!0})}}}),p={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"ng-map"},[this.ready?this._t("default"):this._e()],2)},staticRenderFns:[]};var _=n("VU/8")(v,p,!1,function(t){n("C77s")},"data-v-f4028cd2",null).exports,f={name:"NgwBasemapLayer",mounted:function(){var t=this.$parent.map,e=this.$parent.webMapInfo.basemap,n=L.tileLayer(e.url,{id:e.resource_id});t.addLayer(n)}},m={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]};var g=n("VU/8")(f,m,!1,function(t){n("apC2")},"data-v-6ca4c308",null).exports,y=n("//Fk"),E=n.n(y),j=n("Zrlr"),b=n.n(j),w=n("wxAW"),x=n.n(w),S=n("DmT9"),C=n("Vjoj"),k=n("g0X3"),R=function(){function t(){b()(this,t);this._socket=S(window.grozaConfig.rgUrl,{transports:["websocket"],path:window.grozaConfig.rgPath}),this._client=C(),this._client.configure(k(this._socket))}return x()(t,[{key:"onExpireCreate",value:function(t){this._client.service("expire").on("created",t)}},{key:"offExpireCreate",value:function(t){this._client.service("expire").removeListener("created",t)}},{key:"getEvents",value:function(){var t=this;return new E.a(function(e,n){t._socket.emit("find","events",function(t,s){t&&n(t),e(s)})})}},{key:"destroy",value:function(){this._socket.disconnect()}}]),t}(),T=n("woOf"),z=n.n(T),O=new s.a,U=n("BO1k"),P=n.n(U);h.a.SVG.include({_updateShape:function(t){var e=t._point,n=t._radius,s=t.options.shape;if("diamond"===s){var i="M "+(e.x-n)+" "+e.y+", L "+e.x+" "+(e.y-n)+", L"+(e.x+n)+" "+e.y+", L"+e.x+" "+(e.y+n)+", L"+(e.x-n)+" "+e.y;this._setPath(t,i)}if("square"===s){i="M "+(e.x-n)+" "+(e.y-n)+", L "+(e.x+n)+" "+(e.y-n)+", L"+(e.x+n)+" "+(e.y+n)+", L"+(e.x-n)+" "+(e.y+n)+", L"+(e.x-n)+" "+(e.y-n);this._setPath(t,i)}if("triangle"===s||"triangle-up"===s){i="M"+(e.x-n)+" "+(e.y+n)+" L"+e.x+" "+(e.y-n)+" L"+(e.x+n)+" "+(e.y+n)+" Z";this._setPath(t,i)}if("triangle-down"===s){i="M"+(e.x-n)+" "+(e.y-n)+" L"+e.x+" "+(e.y+n)+" L"+(e.x+n)+" "+(e.y-n)+" Z";this._setPath(t,i)}if("circle"===s&&this._updateCircle(t),"x"===s){n/=2;i="M"+(e.x+n)+","+(e.y+n)+"L"+(e.x-n)+","+(e.y-n)+"M"+(e.x-n)+","+(e.y+n)+"L"+(e.x+n)+","+(e.y-n);this._setPath(t,i)}if("circle-plus"===s){var a=this._getCirclePath(e,n)+" "+("M "+(e.x-.5*n)+" "+e.y+", L "+(e.x+.5*n)+" "+e.y)+" "+("M "+e.x+" "+(e.y-.5*n)+", L "+e.x+" "+(e.y+.5*n));this._setPath(t,a)}if("circle-minus"===s){var o=this._getCirclePath(e,n)+" "+("M "+(e.x-.5*n)+" "+e.y+", L "+(e.x+.5*n)+" "+e.y);this._setPath(t,o)}},_getCirclePath:function(t,e){var n="a"+e+","+e+" 0 1,0 ";return"M"+(t.x-e)+","+t.y+n+2*e+",0 "+n+2*-e+",0 "}});var N=h.a.Path.extend({options:{fill:!0,shape:"triangle",radius:10},initialize:function(t,e){h.a.setOptions(this,e),this._latlng=h.a.latLng(t),this._radius=this.options.radius},setLatLng:function(t){return this._latlng=h.a.latLng(t),this.redraw(),this.fire("move",{latlng:this._latlng})},getLatLng:function(){return this._latlng},setRadius:function(t){return this.options.radius=this._radius=t,this.redraw()},getRadius:function(){return this._radius},setStyle:function(t){var e=t&&t.radius||this._radius;return h.a.Path.prototype.setStyle.call(this,t),this.setRadius(e),this},_project:function(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds()},_updateBounds:function(){var t=this._radius,e=this._radiusY||t,n=this._clickTolerance(),s=[t+n,e+n];this._pxBounds=new h.a.Bounds(this._point.subtract(s),this._point.add(s))},_update:function(){this._map&&this._updatePath()},_updatePath:function(){this._renderer._updateShape(this)},_empty:function(){return this._size&&!this._renderer._bounds.intersects(this._pxBounds)},toGeoJSON:function(){return h.a.GeoJSON.getFeature(this,{type:"Point",coordinates:h.a.GeoJSON.latLngToCoords(this.getLatLng())})}});h.a.ShapeMarker=N,h.a.shapeMarker=function(t,e){return new h.a.ShapeMarker(t,e)};var D=N,M={name:"EventPopup",props:["event","closeCallback"],beforeDestroy:function(){console.log(this)}},V={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{fluid:"","grid-list-md":""}},[n("v-flex",{attrs:{xs12:""}},[n("v-toolbar",{attrs:{color:"blue"}},[n("v-toolbar-title",{staticClass:"body-2 white--text"},[t._v("\n        "+t._s(0!=t.event.ampl?"Молния «облако-земля»":"Облачная молния ")+"\n      ")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"info",attrs:{icon:"",title:"В режим Диспетчера"},nativeOn:{click:function(e){t.closeCallback()}}},[n("v-icon",[t._v("close")])],1)],1),t._v(" "),n("v-card",[n("v-list",{attrs:{dense:""}},[n("v-list-tile",[n("v-list-tile-content",[t._v("Дата")]),t._v(" "),n("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.moment(new Date(1e3*t.event.ev_ts)).format("YYYY.MM.DD"))+"\n          ")])],1),t._v(" "),n("v-list-tile",[n("v-list-tile-content",[t._v("Время")]),t._v(" "),n("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.moment(new Date(1e3*t.event.ev_ts)).format("HH:mm:ss"))+"\n          ")])],1),t._v(" "),n("v-list-tile",[n("v-list-tile-content",[t._v("Широта:")]),t._v(" "),n("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.event.lat))])],1),t._v(" "),n("v-list-tile",[n("v-list-tile-content",[t._v("Долгота:")]),t._v(" "),n("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(t.event.lon))])],1),t._v(" "),n("v-list-tile",[n("v-list-tile-content",[t._v("Аплитуда, кА:")]),t._v(" "),n("v-list-tile-content",{staticClass:"align-end"},[t._v(t._s(Math.round(t.event.ampl/1e3*100)/100))])],1)],1)],1)],1)],1)},staticRenderFns:[]};var H=n("VU/8")(M,V,!1,function(t){n("1kNR")},"data-v-865a49c0",null).exports,F=(n("YPi3"),h.a.Popup.extend({initialize:function(t,e,n){h.a.setOptions(this,t),this.options.closeButton=!1,this.options.className="eventPopup",this._source=n,this._buildVueContent(e)},_buildVueContent:function(t){var e=this,n=new(s.a.extend(H))({propsData:{event:t,closeCallback:function(){e._map.closePopup()}}});n.$mount(),this._content=n.$el}}));h.a.EventPopup=F,h.a.eventPopup=function(){return new F};var A=F,G=h.a.FeatureGroup.extend({initialize:function(t,e,n){this._layers={},this._events={},this._getEventMarkerOptions=e,this._styles=t,this._popup=null,h.a.setOptions(this,n)},addEvent:function(t){var e=this._getEventMarkerOptions.call(this,t,this._styles),n=new D([t.lat,t.lon],e);n._grozaEvent=t,n._grozaId=t.id,this.addLayer(n),this._events[n._grozaId]=n;var s=this;n.on("click",function(){var t=this._map,e=new A({maxWidth:300},this._grozaEvent).setLatLng(this.getLatLng());t.openPopup(e),s._popup=e})},changeEventRule:function(t,e){if(!this._events.hasOwnProperty(t))return!1;var n=this._events[t];if(n._grozaEvent.rule===e)return console.log("[changeEventRule] ID: "+n._grozaId+" not changed. Circle rule "+n._grozaEvent.rule+" "),!1;n._grozaEvent.rule=e;var s=this._getEventMarkerOptions.call(this,n._grozaEvent,this._styles);return n.setStyle(s),!0},removeEvent:function(t){var e=this._events[t];this.removeLayer(e),delete this._events[t]},hideCloudEvents:function(){var t=document.createElement("style");t.innerHTML="path.ligh_t_0 { display: none; }",this._sheetElement=document.body.appendChild(t)},showCloudEvents:function(){this._removeSheetElement()},addEvents:function(t){var e=!0,n=!1,s=void 0;try{for(var i,a=P()(t);!(e=(i=a.next()).done);e=!0){var o=i.value;this.addEvent(o)}}catch(t){n=!0,s=t}finally{try{!e&&a.return&&a.return()}finally{if(n)throw s}}},destroy:function(){this._removeSheetElement()},_removeSheetElement:function(){this._sheetElement&&document.body.removeChild(this._sheetElement),this._sheetElement=null}});h.a.EventsLayer=G,h.a.eventsLayer=function(){return new G};var $=G,I=(n("tSgr"),h.a.FeatureGroup.extend({initialize:function(t,e){this._layers={},this._isVisibleEllipses=!0,this._style=t.ellipseStyle,this._ellipseVisibleZoom=t.ellipse_z_visible,h.a.setOptions(this,e)},addEvent:function(t){var e={className:"ev_el"};z()(e,this._style);var n=new h.a.Ellipse([t.lat,t.lon],[t.ell_maj,t.ell_min],t.ell_az,e);n._grozaId=t.id,this.addLayer(n)},onAdd:function(t){this._bindEvents(t),h.a.FeatureGroup.prototype.onAdd.call(this,t),this._updateVisibleEllipses()},_bindEvents:function(t){var e=this;t.on("zoomend",function(){e._updateVisibleEllipses()})},_updateVisibleEllipses:function(){var t=this._map.getZoom()>=this._ellipseVisibleZoom;return!(this._isVisibleEllipses&&t||!this._isVisibleEllipses&&!t)&&(this._isVisibleEllipses&&!t?(this.hideEllipses(),!0):!this._isVisibleEllipses&&t?(this.showEllipses(),!0):void 0)},hideEllipses:function(){var t=document.createElement("style");t.innerHTML="path.ev_el { display: none; }",this._sheetElement=document.body.appendChild(t),this._isVisibleEllipses=!1},showEllipses:function(){this._removeSheetElement(),this._isVisibleEllipses=!0},addEvents:function(t){var e=!0,n=!1,s=void 0;try{for(var i,a=P()(t);!(e=(i=a.next()).done);e=!0){var o=i.value;this.addEvent(o)}}catch(t){n=!0,s=t}finally{try{!e&&a.return&&a.return()}finally{if(n)throw s}}},destroy:function(){this._removeSheetElement()},_removeSheetElement:function(){this._sheetElement&&document.body.removeChild(this._sheetElement),this._sheetElement=null}}));h.a.EllipsesLayer=I,h.a.ellipsesLayer=function(){return new I};var W=I,B=h.a.LayerGroup.extend({initialize:function(t,e,n){this._layers={},this._eventsSocket=t,this._grozaSettings=e,this._listeners=[],h.a.setOptions(this,n),this._buildEventsLayer(),this._buildEllipsesLayer(),this._ellipsesLayer.bringToFront(),this._eventsLayer.bringToFront()},_buildEventsLayer:function(){this._eventsLayer=new $(this._grozaSettings.eventsStyles,this.getEventMarkerOptions),this.addLayer(this._eventsLayer)},_buildEllipsesLayer:function(){this._ellipsesLayer=new W(this._grozaSettings),this.addLayer(this._ellipsesLayer)},getEventMarkerOptions:function(t){var e=this._styles.expired[t.rule],n=this._styles.types[t.ligh_t],s={className:"ligh_t_"+t.ligh_t};return z()(s,n),z()(s,e),s},onAdd:function(t){this._bindEvents(),h.a.LayerGroup.prototype.onAdd.call(this,t)},_bindEvents:function(){var t=this,e=this;this._eventsSocket.getEvents().then(function(t){e._eventsLayer.addEvents(t),e._ellipsesLayer.addEvents(t)});var n=void 0;n=O.$on("HIDE_CLOUD_EVENTS",function(){t._eventsLayer.hideCloudEvents()}),this._listeners.push(n),n=O.$on("SHOW_CLOUD_EVENTS",function(){t._eventsLayer.showCloudEvents()}),this._listeners.push(n),this._eventsSocket.onExpireCreate(function(e){return t._onExpireCreateHandler(e)})},_onExpireCreateHandler:function(t){var e=t.data,n=e.id;if("NEW_EXPIRE"===e.type){var s=e.rule;console.log("NEW_EXPIRE",e),this._eventsLayer.changeEventRule(n,s)}"REMOVE_EVENT"===e.type&&(console.log("REMOVE_EVENT",e),this._eventsLayer.removeEvent(n))},destroy:function(){this._unbindEvents()},_unbindEvents:function(){this._listeners.forEach(function(t){t.$off()}),this._eventsLayer.destroy(),this._ellipsesLayer.destroy(),this._eventsSocket.destroy()}});h.a.RgEventsLayer=B,h.a.rgEventsLayer=function(){return new B};var q=B,Y={name:"RgEventsLayer",data:function(){return{rgEventsLayer:null}},mounted:function(){var t=this.$parent.map,e=new R;this.rgEventsLayer=new q(e,window.grozaConfig.settings),t.addLayer(this.rgEventsLayer)},beforeDestroy:function(){this.rgEventsLayer.destroy()}},X={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]};var J,Q,Z,K,tt=n("VU/8")(Y,X,!1,function(t){n("PdUj")},"data-v-71c1c7cb",null).exports,et=n("NYxO"),nt=n("bOdI"),st=n.n(nt),it={state:{status:"",profile:{}},getters:{getProfile:function(t){return t.profile},isProfileLoaded:function(t){return!!t.profile.name}},actions:st()({},"USER_REQUEST",function(t){var e=t.commit;t.dispatch;e("USER_REQUEST")}),mutations:(J={},st()(J,"USER_REQUEST",function(t){t.status="loading"}),st()(J,"USER_SUCCESS",function(t,e){t.status="success",s.a.set(t,"profile",e)}),st()(J,"USER_ERROR",function(t){t.status="error"}),st()(J,"AUTH_LOGOUT",function(t){t.profile={}}),J)},at={authCookie:"true"===r.a.get("groza")||!1,status:"",hasLoadedOnce:!1},ot={isAuthenticated:function(){return at.authCookie},authStatus:function(){return at.status}},rt=(Q={},st()(Q,"AUTH_REQUEST",function(t,e){var n=t.commit,s=t.dispatch;return new E.a(function(t,i){n("AUTH_REQUEST"),s("NGW_LOGIN",e).then(function(e){!0===e.data.login?(n("AUTH_SUCCESS"),s("USER_REQUEST"),t(!0)):(r.a.delete("groza"),t(!1))}).catch(function(t){n("AUTH_ERROR",t),r.a.delete("groza"),i(t)})})}),st()(Q,"AUTH_LOGOUT",function(t){var e=t.commit;t.dispatch;return new E.a(function(t,n){e("AUTH_LOGOUT"),r.a.delete("groza"),t()})}),Q),lt=(Z={},st()(Z,"AUTH_REQUEST",function(t){t.status="loading"}),st()(Z,"AUTH_SUCCESS",function(t){t.status="success",r.a.set("groza",!0,{expires:"3D"}),t.authCookie=!0,t.hasLoadedOnce=!0}),st()(Z,"AUTH_ERROR",function(t){t.status="error",t.hasLoadedOnce=!0}),st()(Z,"AUTH_LOGOUT",function(t){r.a.delete("groza")}),Z),ct={state:at,getters:ot,actions:rt,mutations:lt},ut=n("mtWM"),dt=n.n(ut),ht=n("mw3O"),vt=n.n(ht),pt=window.grozaConfig.ngwUrl,_t=dt.a.create({baseURL:pt}),ft={state:{},getters:{},actions:(K={},st()(K,"NGW_LOGIN",function(t,e){t.commit,t.dispatch;return _t.post("/api/groza/login",vt.a.stringify(e))}),st()(K,"NGW_WEB_MAP",function(t){t.commit,t.dispatch;var e=window.grozaConfig.settings.web_map;return _t.get("/api/groza/webmap/"+e+"/")}),st()(K,"IMAGE_ADAPTER_URL",function(t){t.commit,t.dispatch;return _t.defaults.baseURL+"/api/component/render/image"}),st()(K,"NGW_TILE_ADAPTER_URL",function(t){t.commit,t.dispatch;return _t.defaults.baseURL+"/api/component/render/tile?z={z}&x={x}&y={y}&resource={resourceId}"}),st()(K,"NGW_GET_EVENTS",function(t,e){t.commit,t.dispatch;return _t.get("/api/groza/events/",{params:e})}),K),mutations:{}};s.a.use(et.a);var mt=new et.a.Store({modules:{user:it,auth:ct,ngw:ft},strict:!1}),gt=n("nvAS"),yt=(new gt.a.Proj("EPSG:4326"),new gt.a.Proj("EPSG:3857"),h.a.TileLayer.extend({_ngwBaseImageUrl:null,_resourceId:null,initialize:function(t,e,n){this._url=t,(n=n||{}).resourceId=e,h.a.TileLayer.prototype.initialize.call(this,t,n)}}));h.a.TileLayer.NgwTileLayer=yt,h.a.TileLayer.ngwTileLayer=function(){return new yt};var Et=yt,jt={name:"NgwLayers",mounted:function(){var t=this.$parent.map,e=this.$parent.webMapInfo.layers;mt.dispatch("NGW_TILE_ADAPTER_URL").then(function(n){if(e)for(var s=e.length;s--;){var i=e[s];if("ngw-webmap/TileAdapter"===i.adapter){var a=new Et(n,i.styleId);t.addLayer(a)}}})}},bt={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]};var wt=n("VU/8")(jt,bt,!1,function(t){n("A2R1")},"data-v-4ddf76a6",null).exports,Lt={name:"MonitoringPanelContent",data:function(){return{closed:!1,switchCloud:!0}},methods:{onChangeClosed:function(){this.closed=!this.closed},goToHistory:function(){re.push("/history")},onSwitchCloud:function(){this.switchCloud?O.$emit("SHOW_CLOUD_EVENTS"):O.$emit("HIDE_CLOUD_EVENTS")}}},xt={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.closed?n("v-btn",{attrs:{title:"Открыть панель",color:"info"},nativeOn:{click:function(e){t.onChangeClosed()}}},[n("v-icon",{attrs:{dark:""}},[t._v("menu")])],1):n("div",{staticClass:"grey lighten-3",staticStyle:{"min-width":"300px"}},[n("v-toolbar",{attrs:{color:"blue"}},[n("v-toolbar-side-icon",{attrs:{title:"Свернуть панель"},nativeOn:{click:function(e){t.onChangeClosed()}}}),t._v(" "),n("v-toolbar-title",{staticClass:"white--text"},[t._v("Диспетчер")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"info",attrs:{icon:"",title:"Открыть архив данных"},nativeOn:{click:function(e){t.goToHistory()}}},[n("v-icon",[t._v("history")])],1)],1),t._v(" "),n("v-card",[n("v-list",{attrs:{"two-line":""}},[n("v-list-tile",{on:{click:function(t){}}},[n("v-list-tile-action",[n("v-icon",[t._v("cloud_circle")])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Облачные молнии")]),t._v(" "),n("v-list-tile-sub-title",[t._v("Отображение облачных молний")])],1),t._v(" "),n("v-list-tile-action",[n("v-switch",{attrs:{title:"Облачные молнии"},on:{change:function(e){t.onSwitchCloud()}},model:{value:t.switchCloud,callback:function(e){t.switchCloud=e},expression:"switchCloud"}})],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var St=n("VU/8")(Lt,xt,!1,function(t){n("nkl3")},"data-v-65366c23",null).exports,Ct=h.a.Control.extend({onAdd:function(t){var e=new(s.a.extend(St))({});return e.$mount(),e.$el},addTo:function(t){h.a.Control.prototype.addTo.call(this,t);var e=this._container;return h.a.Browser.touch?h.a.DomEvent.on(e,"click dblclick mousewheel mousedown touchstart",h.a.DomEvent.stopPropagation):(h.a.DomEvent.disableClickPropagation(e),h.a.DomEvent.on(e,"mousewheel touchstart",h.a.DomEvent.stopPropagation)),this},onRemove:function(t){}}),kt={name:"MonitoringPanelControl",props:{position:{type:String,default:"topright"},options:{type:Object,default:function(){return{}}}},mounted:function(){this.mapObject=new Ct({position:this.position}),this.mapObject.addTo(this.$parent.map)}},Rt={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]},Tt={name:"Monitoring",components:{NgMap:_,RgEventsLayer:tt,NgwLayers:wt,NgwBasemapLayer:g,MonitoringPanel:n("VU/8")(kt,Rt,!1,null,null,null).exports}},zt={render:function(){var t=this.$createElement,e=this._self._c||t;return e("ng-map",[e("rg-events-layer"),this._v(" "),e("ngw-basemap-layer"),this._v(" "),e("ngw-layers"),this._v(" "),e("monitoring-panel")],1)},staticRenderFns:[]};var Ot=n("VU/8")(Tt,zt,!1,function(t){n("H60B")},"data-v-6850f720",null).exports,Ut=n("GxBP"),Pt=n.n(Ut),Nt=n("IDJ8"),Dt=n.n(Nt),Mt=n("RlJb"),Vt={name:"RangeSelector",methods:{getSelectedDates:function(){var t=this._flatpickr.selectedDates;return 2===t.length&&t}},mounted:function(){this._flatpickr=Pt()(this.$refs.rangeStart,{altInput:!1,altFormat:"Y/m/d",locale:Mt.Russian,enableTime:!0,minuteIncrement:1,time_24hr:!0,dateFormat:"Y-m-d H:i",plugins:[new Dt.a({input:this.$refs.rangeEnd})]})},beforeDestroy:function(){this._flatpickr.destroy()}},Ht={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"date-range-selector"},[e("input",{ref:"rangeStart",staticClass:"btn normal",attrs:{type:"text",placeholder:"От"}}),this._v(" -\n  "),e("input",{ref:"rangeEnd",staticClass:"btn normal",attrs:{type:"text",placeholder:"До","data-fp-omit":""}})])},staticRenderFns:[]};var Ft=n("VU/8")(Vt,Ht,!1,function(t){n("SwCX")},"data-v-5133c7d6",null).exports,At=(n("K4gw"),n("PJh5")),Gt=n.n(At),$t={name:"HistoryPanelContent",components:{RangeSelector:Ft},props:{formatDate:{default:"YYYY.MM.DD HH:mm",type:String}},map:null,data:function(){return{timeRangeDialog:!1,date:null,dateSubTitle:"Настройка периода времени",closed:!1,switchCloud:!0}},methods:{onChangeClosed:function(){this.closed=!this.closed},goToMonitoring:function(){re.push("/")},onSwitchCloud:function(){this.switchCloud?O.$emit("SHOW_CLOUD_EVENTS"):O.$emit("HIDE_CLOUD_EVENTS")},applyTimeRange:function(){this.timeRangeDialog=!1;var t=this.$refs.rangeSelector.getSelectedDates();if(!t)return!1;var e=Gt()(t[0]).format(this.formatDate),n=Gt()(t[1]).format(this.formatDate);this.dateSubTitle=e+" - "+n;var s=Gt.a.utc(t[0]).format(),i=Gt.a.utc(t[1]).format();O.$emit("UPDATE_HISTORY_EVENTS",{start:s,end:i})}}},It={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t.closed?n("v-btn",{attrs:{title:"Открыть панель",color:"info"},nativeOn:{click:function(e){t.onChangeClosed()}}},[n("v-icon",{attrs:{dark:""}},[t._v("menu")])],1):n("div",{staticClass:"grey lighten-3",staticStyle:{"min-width":"300px"}},[n("v-toolbar",{attrs:{color:"blue"}},[n("v-toolbar-side-icon",{attrs:{title:"Свернуть панель"},nativeOn:{click:function(e){t.onChangeClosed()}}}),t._v(" "),n("v-toolbar-title",{staticClass:"white--text"},[t._v("Архив данных")]),t._v(" "),n("v-spacer"),t._v(" "),n("v-btn",{staticClass:"info",attrs:{icon:"",title:"В режим Диспетчера"},nativeOn:{click:function(e){t.goToMonitoring()}}},[n("v-icon",[t._v("track_changes")])],1)],1),t._v(" "),n("v-card",[n("v-list",{attrs:{"two-line":""}},[n("v-list-tile",{on:{click:function(t){}}},[n("v-list-tile-action",[n("v-icon",[t._v("cloud_circle")])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Облачные молнии")]),t._v(" "),n("v-list-tile-sub-title",[t._v("Отображение облачных молний")])],1),t._v(" "),n("v-list-tile-action",[n("v-switch",{attrs:{title:"Облачные молнии"},on:{change:function(e){t.onSwitchCloud()}},model:{value:t.switchCloud,callback:function(e){t.switchCloud=e},expression:"switchCloud"}})],1)],1),t._v(" "),n("v-divider",{attrs:{inset:""}}),t._v(" "),n("v-list-tile",{on:{click:function(t){}}},[n("v-list-tile-action",[n("v-icon",[t._v("date_range")])],1),t._v(" "),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Период времени")]),t._v(" "),n("v-list-tile-sub-title",[t._v(t._s(t.dateSubTitle))])],1),t._v(" "),n("v-list-tile-action",[n("v-btn",{staticClass:"info",attrs:{flat:"",icon:""},on:{click:function(e){e.stopPropagation(),t.timeRangeDialog=!0}}},[n("v-icon",[t._v("date_range")])],1)],1)],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.timeRangeDialog,callback:function(e){t.timeRangeDialog=e},expression:"timeRangeDialog"}},[n("v-card",[n("v-card-title",[t._v("\n          Настройка периода времени\n        ")]),t._v(" "),n("v-card-text",[n("range-selector",{ref:"rangeSelector"})],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"success",flat:""},on:{click:function(e){e.stopPropagation(),t.applyTimeRange()}}},[t._v("Применить")]),t._v(" "),n("v-btn",{attrs:{color:"info",flat:""},on:{click:function(e){e.stopPropagation(),t.timeRangeDialog=!1}}},[t._v("Отмена")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var Wt=n("VU/8")($t,It,!1,function(t){n("9VWe")},null,null).exports,Bt=h.a.Control.extend({onAdd:function(t){var e=new(s.a.extend(Wt))({});return e.$mount(),e.$el},addTo:function(t){h.a.Control.prototype.addTo.call(this,t);var e=this._container;return h.a.Browser.touch?h.a.DomEvent.on(e,"click dblclick mousewheel mousedown touchstart",h.a.DomEvent.stopPropagation):(h.a.DomEvent.disableClickPropagation(e),h.a.DomEvent.on(e,"mousewheel touchstart",h.a.DomEvent.stopPropagation)),this},onRemove:function(t){}}),qt={name:"HistoryPanel",props:{position:{type:String,default:"topright"},options:{type:Object,default:function(){return{}}}},mounted:function(){this.mapObject=new Bt({position:this.position}),this.mapObject.addTo(this.$parent.map)}},Yt={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]},Xt=n("VU/8")(qt,Yt,!1,null,null,null).exports,Jt=h.a.LayerGroup.extend({initialize:function(t,e){this._layers={},this._grozaSettings=t,this._listeners=[],h.a.setOptions(this,e),this._buildEventsLayer(),this._buildEllipsesLayer(),this._ellipsesLayer.bringToFront(),this._eventsLayer.bringToFront()},_buildEventsLayer:function(){this._eventsLayer=new $(this._grozaSettings.eventsStyles,this.getEventMarkerOptions),this.addLayer(this._eventsLayer)},_buildEllipsesLayer:function(){this._ellipsesLayer=new W(this._grozaSettings),this.addLayer(this._ellipsesLayer)},getEventMarkerOptions:function(t,e){var n=e.types[t.ligh_t],s={className:"ligh_t_"+t.ligh_t};return z()(s,n),s},onAdd:function(t){this._bindEvents(),h.a.LayerGroup.prototype.onAdd.call(this,t)},clearLayer:function(t){return t.clearLayers(),this},clearLayers:function(){return this.eachLayer(this.clearLayer,this)},_bindEvents:function(){var t=this,e=this,n=void 0;n=O.$on("UPDATE_HISTORY_EVENTS",function(t){mt.dispatch("NGW_GET_EVENTS",t).then(function(t){var n=t.data;n.success&&(e.clearLayers(),e._eventsLayer.addEvents(n.data),e._ellipsesLayer.addEvents(n.data))})}),this._listeners.push(n),n=O.$on("HIDE_CLOUD_EVENTS",function(){t._eventsLayer.hideCloudEvents()}),this._listeners.push(n),n=O.$on("SHOW_CLOUD_EVENTS",function(){t._eventsLayer.showCloudEvents()}),this._listeners.push(n)},destroy:function(){this._unbindEvents()},_unbindEvents:function(){this._listeners.forEach(function(t){t.$off()}),this._eventsLayer.destroy(),this._ellipsesLayer.destroy()}});h.a.NgwEventsLayer=Jt,h.a.ngwEventsLayer=function(){return new Jt};var Qt=Jt,Zt={name:"NgwEventsLayer",data:function(){return{ngwEventsLayer:null}},mounted:function(){var t=this.$parent.map;this.ngwEventsLayer=new Qt(window.grozaConfig.settings),t.addLayer(this.ngwEventsLayer)},beforeDestroy:function(){this.ngwEventsLayer.destroy()}},Kt={render:function(){var t=this.$createElement;return(this._self._c||t)("div")},staticRenderFns:[]};var te={name:"History",components:{NgMap:_,NgwBasemapLayer:g,HistoryPanel:Xt,NgwEventsLayer:n("VU/8")(Zt,Kt,!1,function(t){n("tGNp")},"data-v-fd97c1ba",null).exports,NgwLayers:wt}},ee={render:function(){var t=this.$createElement,e=this._self._c||t;return e("ng-map",[e("ngw-basemap-layer"),this._v(" "),e("ngw-events-layer"),this._v(" "),e("ngw-layers"),this._v(" "),e("history-panel")],1)},staticRenderFns:[]};var ne=n("VU/8")(te,ee,!1,function(t){n("Zp11")},"data-v-0e5001d1",null).exports,se={name:"Login",data:function(){return{valid:!1,authFail:!1,login:"",loginRules:[function(t){return!!t||"Логин обязателен"}],password:"",pswRules:[function(t){return!!t||"Пароль обязателен"}]}},methods:{submit:function(){var t=this,e=this.login,n=this.password,s=this;this.$store.dispatch("AUTH_REQUEST",{login:e,password:n}).then(function(e){e?(t.authFail=!1,s.$router.push("/")):t.authFail=!0})}}},ie={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-content",[n("v-container",{attrs:{fluid:"","fill-height":""}},[n("v-layout",{attrs:{"align-center":"","justify-center":""}},[n("v-flex",{attrs:{xs12:"",sm8:"",md4:""}},[n("v-card",{staticClass:"elevation-12"},[n("v-toolbar",{attrs:{dark:"",color:"primary"}},[n("v-toolbar-title",[t._v("Авторизация")])],1),t._v(" "),n("v-card-text",[n("v-form",{on:{submit:t.submit},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[n("v-text-field",{attrs:{rules:t.loginRules,"prepend-icon":"person",name:"login",label:"Логин",type:"text"},model:{value:t.login,callback:function(e){t.login=e},expression:"login"}}),t._v(" "),n("v-text-field",{attrs:{rules:t.pswRules,"prepend-icon":"lock",name:"password",label:"Пароль",id:"password",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),t._v(" "),n("div",[n("v-alert",{attrs:{type:"error",dismissible:""},model:{value:t.authFail,callback:function(e){t.authFail=e},expression:"authFail"}},[t._v("\n                Вход не выполнен\n              ")])],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{disabled:!t.valid,color:"primary"},nativeOn:{click:function(e){return t.submit(e)}}},[t._v("Войти")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var ae=n("VU/8")(se,ie,!1,function(t){n("AGWN")},"data-v-1aa38d2a",null).exports;s.a.use(u.a);var oe=function(t,e,n){mt.getters.isAuthenticated?n():n("/login")},re=new u.a({mode:"hash",routes:[{path:"/",name:"Monitoring",component:Ot,beforeEnter:oe},{path:"/history",name:"History",component:ne,beforeEnter:oe},{path:"/login",name:"Login",component:ae,beforeEnter:function(t,e,n){mt.getters.isAuthenticated?n("/"):n()}}]}),le=(n("j1ja"),n("7zck"),n("EYnv"),n("YWNN"),n("fTnx")),ce=n.n(le),ue=n("RAhh"),de=n.n(ue);s.a.prototype.moment=Gt.a,s.a.prototype.formatcoords=de.a,s.a.config.productionTip=!1,s.a.component("split-pane",ce.a),s.a.use(a.a,{theme:{primary:"#016fc5",success:"#4CAF50"}}),s.a.use(r.a),new s.a({el:"#app",store:mt,router:re,components:{App:c},template:"<App />"})},PdUj:function(t,e){},SwCX:function(t,e){},YPi3:function(t,e){},YWNN:function(t,e){},Zp11:function(t,e){},apC2:function(t,e){},lQeg:function(t,e){t.exports={_from:"proj4",_id:"proj4@2.4.4",_inBundle:!1,_integrity:"sha512-yo6qTpBQXnxhcPopKJeVwwOBRzUpEa3vzSFlr38f5mF4Jnfb6NOL/ePIomefWiZmPgkUblHpcwnWVMB8FS3GKw==",_location:"/proj4",_phantomChildren:{},_requested:{type:"tag",registry:!0,raw:"proj4",name:"proj4",escapedName:"proj4",rawSpec:"",saveSpec:null,fetchSpec:"latest"},_requiredBy:["#USER","/"],_resolved:"https://registry.npmjs.org/proj4/-/proj4-2.4.4.tgz",_shasum:"c03d825e380f6850a4a7af5d20d365f6b72c4042",_spec:"proj4",_where:"/home/karavanjo/projects/nextgis/nextgisweb/nextgisweb_groza/frontend_groza",author:"",bugs:{url:"https://github.com/proj4js/proj4js/issues"},bundleDependencies:!1,contributors:[{name:"Mike Adair",email:"madair@dmsolutions.ca"},{name:"Richard Greenwood",email:"rich@greenwoodmap.com"},{name:"Calvin Metcalf",email:"calvin.metcalf@gmail.com"},{name:"Richard Marsden",url:"http://www.winwaed.com"},{name:"T. Mittan"},{name:"D. Steinwand"},{name:"S. Nelson"}],dependencies:{mgrs:"1.0.0","wkt-parser":"^1.2.0"},deprecated:!1,description:"Proj4js is a JavaScript library to transform point coordinates from one coordinate system to another, including datum transformations.",devDependencies:{chai:"~1.8.1",curl:"git://github.com/cujojs/curl.git",grunt:"^1.0.1","grunt-cli":"~0.1.13","grunt-contrib-connect":"~0.6.0","grunt-contrib-jshint":"~1.1.0","grunt-contrib-uglify":"~0.11.1","grunt-mocha-phantomjs":"~0.4.0","grunt-rollup":"^1.0.1",istanbul:"~0.2.4",mocha:"~1.17.1",rollup:"^0.41.4","rollup-plugin-json":"^2.0.1","rollup-plugin-node-resolve":"^2.0.0",tin:"~0.4.0"},directories:{test:"test",doc:"docs"},homepage:"https://github.com/proj4js/proj4js#readme",license:"MIT",main:"dist/proj4-src.js",module:"lib/index.js",name:"proj4",repository:{type:"git",url:"git://github.com/proj4js/proj4js.git"},scripts:{build:"grunt","build:tmerc":"grunt build:tmerc",test:"npm run build && istanbul test _mocha test/test.js"},version:"2.4.4"}},nkl3:function(t,e){},tGNp:function(t,e){},uslO:function(t,e,n){var s={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(t){return n(a(t))}function a(t){var e=s[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}i.keys=function(){return Object.keys(s)},i.resolve=a,t.exports=i,i.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.48cf02e8bb3497e6d795.js.map