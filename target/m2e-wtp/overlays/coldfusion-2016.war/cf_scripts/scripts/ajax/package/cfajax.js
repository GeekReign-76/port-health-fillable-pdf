/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
function cfinit(){
if(!window.ColdFusion){
ColdFusion={};
var $C=ColdFusion;
if(!$C.Ajax){
$C.Ajax={};
}
var $A=$C.Ajax;
if(!$C.AjaxProxy){
$C.AjaxProxy={};
}
var $X=$C.AjaxProxy;
if(!$C.Bind){
$C.Bind={};
}
var $B=$C.Bind;
if(!$C.Event){
$C.Event={};
}
var $E=$C.Event;
if(!$C.Log){
$C.Log={};
}
var $L=$C.Log;
if(!$C.Util){
$C.Util={};
}
var $U=$C.Util;
if(!$C.DOM){
$C.DOM={};
}
var $D=$C.DOM;
if(!$C.Spry){
$C.Spry={};
}
var $S=$C.Spry;
if(!$C.Pod){
$C.Pod={};
}
var $P=$C.Pod;
if(!$C.objectCache){
$C.objectCache={};
}
if(!$C.required){
$C.required={};
}
if(!$C.importedTags){
$C.importedTags=[];
}
if(!$C.requestCounter){
$C.requestCounter=0;
}
if(!$C.bindHandlerCache){
$C.bindHandlerCache={};
}
window._cf_loadingtexthtml="<div style=\"text-align: center;\">"+window._cf_loadingtexthtml+"&nbsp;"+CFMessage["loading"]+"</div>";
$C.globalErrorHandler=function(_215,_216){
if($L.isAvailable){
$L.error(_215,_216);
}
if($C.userGlobalErrorHandler){
$C.userGlobalErrorHandler(_215);
}
if(!$L.isAvailable&&!$C.userGlobalErrorHandler){
alert(_215+CFMessage["globalErrorHandler.alert"]);
}
};
$C.handleError=function(_217,_218,_219,_21a,_21b,_21c,_21d,_21e){
var msg=$L.format(_218,_21a);
if(_217){
$L.error(msg,"http");
if(!_21b){
_21b=-1;
}
if(!_21c){
_21c=msg;
}
_217(_21b,_21c,_21e);
}else{
if(_21d){
$L.error(msg,"http");
throw msg;
}else{
$C.globalErrorHandler(msg,_219);
}
}
};
$C.setGlobalErrorHandler=function(_220){
$C.userGlobalErrorHandler=_220;
};
$A.createXMLHttpRequest=function(){
try{
return new XMLHttpRequest();
}
catch(e){
}
var _221=["Microsoft.XMLHTTP","MSXML2.XMLHTTP.5.0","MSXML2.XMLHTTP.4.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP"];
for(var i=0;i<_221.length;i++){
try{
return new ActiveXObject(_221[i]);
}
catch(e){
}
}
return false;
};
$A.isRequestError=function(req){
return ((req.status!=0&&req.status!=200)||req.getResponseHeader("server-error"));
};
$A.sendMessage=function(url,_225,_226,_227,_228,_229,_22a){
var req=$A.createXMLHttpRequest();
if(!_225){
_225="GET";
}
if(_227&&_228){
req.onreadystatechange=function(){
$A.callback(req,_228,_229);
};
}
if(_226){
_226+="&_cf_nodebug=true&_cf_nocache=true";
}else{
_226="_cf_nodebug=true&_cf_nocache=true";
}
if(window._cf_clientid){
_226+="&_cf_clientid="+_cf_clientid;
}
if(_225=="GET"){
if(_226){
_226+="&_cf_rc="+($C.requestCounter++);
if(url.indexOf("?")==-1){
url+="?"+_226;
}else{
url+="&"+_226;
}
}
$L.info("ajax.sendmessage.get","http",[url]);
req.open(_225,url,_227);
req.send(null);
}else{
$L.info("ajax.sendmessage.post","http",[url,_226]);
req.open(_225,url,_227);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
if(_226){
req.send(_226);
}else{
req.send(null);
}
}
if(!_227){
while(req.readyState!=4){
}
if($A.isRequestError(req)){
$C.handleError(null,"ajax.sendmessage.error","http",[req.status,req.statusText],req.status,req.statusText,_22a);
}else{
return req;
}
}
};
$A.callback=function(req,_22d,_22e){
if(req.readyState!=4){
return;
}
req.onreadystatechange=new Function;
_22d(req,_22e);
};
$A.submitForm=function(_22f,url,_231,_232,_233,_234){
var _235=$C.getFormQueryString(_22f);
if(_235==-1){
$C.handleError(_232,"ajax.submitform.formnotfound","http",[_22f],-1,null,true);
return;
}
if(!_233){
_233="POST";
}
_234=!(_234===false);
var _236=function(req){
$A.submitForm.callback(req,_22f,_231,_232);
};
$L.info("ajax.submitform.submitting","http",[_22f]);
var _238=$A.sendMessage(url,_233,_235,_234,_236);
if(!_234){
$L.info("ajax.submitform.success","http",[_22f]);
return _238.responseText;
}
};
$A.submitForm.callback=function(req,_23a,_23b,_23c){
if($A.isRequestError(req)){
$C.handleError(_23c,"ajax.submitform.error","http",[req.status,_23a,req.statusText],req.status,req.statusText);
}else{
$L.info("ajax.submitform.success","http",[_23a]);
if(_23b){
_23b(req.responseText);
}
}
};
$C.empty=function(){
};
$C.setSubmitClicked=function(_23d,_23e){
var el=$D.getElement(_23e,_23d);
el.cfinputbutton=true;
$C.setClickedProperty=function(){
el.clicked=true;
};
$E.addListener(el,"click",$C.setClickedProperty);
};
$C.getFormQueryString=function(_240,_241){
var _242;
if(typeof _240=="string"){
_242=(document.getElementById(_240)||document.forms[_240]);
}else{
if(typeof _240=="object"){
_242=_240;
}
}
if(!_242||null==_242.elements){
return -1;
}
var _243,elementName,elementValue,elementDisabled;
var _244=false;
var _245=(_241)?{}:"";
for(var i=0;i<_242.elements.length;i++){
_243=_242.elements[i];
elementDisabled=_243.disabled;
elementName=_243.name;
elementValue=_243.value;
if(!elementDisabled&&elementName){
switch(_243.type){
case "select-one":
case "select-multiple":
for(var j=0;j<_243.options.length;j++){
if(_243.options[j].selected){
if(window.ActiveXObject){
_245=$C.getFormQueryString.processFormData(_245,_241,elementName,_243.options[j].attributes["value"].specified?_243.options[j].value:_243.options[j].text);
}else{
_245=$C.getFormQueryString.processFormData(_245,_241,elementName,_243.options[j].hasAttribute("value")?_243.options[j].value:_243.options[j].text);
}
}
}
break;
case "radio":
case "checkbox":
if(_243.checked){
_245=$C.getFormQueryString.processFormData(_245,_241,elementName,elementValue);
}
break;
case "file":
case undefined:
case "reset":
break;
case "button":
_245=$C.getFormQueryString.processFormData(_245,_241,elementName,elementValue);
break;
case "submit":
if(_243.cfinputbutton){
if(_244==false&&_243.clicked){
_245=$C.getFormQueryString.processFormData(_245,_241,elementName,elementValue);
_244=true;
}
}else{
_245=$C.getFormQueryString.processFormData(_245,_241,elementName,elementValue);
}
break;
case "textarea":
var _248;
if(window.FCKeditorAPI&&(_248=$C.objectCache[elementName])&&_248.richtextid){
var _249=FCKeditorAPI.GetInstance(_248.richtextid);
if(_249){
elementValue=_249.GetXHTML();
}
}
_245=$C.getFormQueryString.processFormData(_245,_241,elementName,elementValue);
break;
default:
_245=$C.getFormQueryString.processFormData(_245,_241,elementName,elementValue);
break;
}
}
}
if(!_241){
_245=_245.substr(0,_245.length-1);
}
return _245;
};
$C.getFormQueryString.processFormData=function(_24a,_24b,_24c,_24d){
if(_24b){
if(_24a[_24c]){
_24a[_24c]+=","+_24d;
}else{
_24a[_24c]=_24d;
}
}else{
_24a+=encodeURIComponent(_24c)+"="+encodeURIComponent(_24d)+"&";
}
return _24a;
};
$A.importTag=function(_24e){
$C.importedTags.push(_24e);
};
$A.checkImportedTag=function(_24f){
var _250=false;
for(var i=0;i<$C.importedTags.length;i++){
if($C.importedTags[i]==_24f){
_250=true;
break;
}
}
if(!_250){
$C.handleError(null,"ajax.checkimportedtag.error","widget",[_24f]);
}
};
$C.getElementValue=function(_252,_253,_254){
if(!_252){
$C.handleError(null,"getelementvalue.noelementname","bind",null,null,null,true);
return;
}
if(!_254){
_254="value";
}
var _255=$B.getBindElementValue(_252,_253,_254);
if(typeof (_255)=="undefined"){
_255=null;
}
if(_255==null){
$C.handleError(null,"getelementvalue.elnotfound","bind",[_252,_254],null,null,true);
return;
}
return _255;
};
$B.getBindElementValue=function(_256,_257,_258,_259,_25a){
var _25b="";
if(window[_256]){
var _25c=eval(_256);
if(_25c&&_25c._cf_getAttribute){
_25b=_25c._cf_getAttribute(_258);
return _25b;
}
}
var _25d=$C.objectCache[_256];
if(_25d&&_25d._cf_getAttribute){
_25b=_25d._cf_getAttribute(_258);
return _25b;
}
var el=$D.getElement(_256,_257);
var _25f=(el&&((!el.length&&el.length!=0)||(el.length&&el.length>0)||el.tagName=="SELECT"));
if(!_25f&&!_25a){
$C.handleError(null,"bind.getbindelementvalue.elnotfound","bind",[_256]);
return null;
}
if(el.tagName!="SELECT"){
if(el.length>1){
var _260=true;
for(var i=0;i<el.length;i++){
var _262=(el[i].getAttribute("type")=="radio"||el[i].getAttribute("type")=="checkbox");
if(!_262||(_262&&el[i].checked)){
if(!_260){
_25b+=",";
}
_25b+=$B.getBindElementValue.extract(el[i],_258);
_260=false;
}
}
}else{
_25b=$B.getBindElementValue.extract(el,_258);
}
}else{
var _260=true;
for(var i=0;i<el.options.length;i++){
if(el.options[i].selected){
if(!_260){
_25b+=",";
}
_25b+=$B.getBindElementValue.extract(el.options[i],_258);
_260=false;
}
}
}
if(typeof (_25b)=="object"){
$C.handleError(null,"bind.getbindelementvalue.simplevalrequired","bind",[_256,_258]);
return null;
}
if(_259&&$C.required[_256]&&_25b.length==0){
return null;
}
return _25b;
};
$B.getBindElementValue.extract=function(el,_264){
var _265=el[_264];
if((_265==null||typeof (_265)=="undefined")&&el.getAttribute){
_265=el.getAttribute(_264);
}
return _265;
};
$L.init=function(){
if(window.YAHOO&&YAHOO.widget&&YAHOO.widget.Logger){
YAHOO.widget.Logger.categories=[CFMessage["debug"],CFMessage["info"],CFMessage["error"],CFMessage["window"]];
YAHOO.widget.LogReader.prototype.formatMsg=function(_266){
var _267=_266.category;
return "<p>"+"<span class='"+_267+"'>"+_267+"</span>:<i>"+_266.source+"</i>: "+_266.msg+"</p>";
};
var _268=new YAHOO.widget.LogReader(null,{width:"30em",fontSize:"100%"});
_268.setTitle(CFMessage["log.title"]||"ColdFusion AJAX Logger");
_268._btnCollapse.value=CFMessage["log.collapse"]||"Collapse";
_268._btnPause.value=CFMessage["log.pause"]||"Pause";
_268._btnClear.value=CFMessage["log.clear"]||"Clear";
$L.isAvailable=true;
}
};
$L.log=function(_269,_26a,_26b,_26c){
if(!$L.isAvailable){
return;
}
if(!_26b){
_26b="global";
}
_26b=CFMessage[_26b]||_26b;
_26a=CFMessage[_26a]||_26a;
_269=$L.format(_269,_26c);
YAHOO.log(_269,_26a,_26b);
};
$L.format=function(code,_26e){
var msg=CFMessage[code]||code;
if(_26e){
for(i=0;i<_26e.length;i++){
if(!_26e[i].length){
_26e[i]="";
}
var _270="{"+i+"}";
msg=msg.replace(_270,_26e[i]);
}
}
return msg;
};
$L.debug=function(_271,_272,_273){
$L.log(_271,"debug",_272,_273);
};
$L.info=function(_274,_275,_276){
$L.log(_274,"info",_275,_276);
};
$L.error=function(_277,_278,_279){
$L.log(_277,"error",_278,_279);
};
$L.dump=function(_27a,_27b){
if($L.isAvailable){
var dump=(/string|number|undefined|boolean/.test(typeof (_27a))||_27a==null)?_27a:recurse(_27a,typeof _27a,true);
$L.debug(dump,_27b);
}
};
$X.invoke=function(_27d,_27e,_27f,_280,_281){
return $X.invokeInternal(_27d,_27e,_27f,_280,_281,false,null,null);
};
$X.invokeInternal=function(_282,_283,_284,_285,_286,_287,_288,_289){
var _28a="method="+_283+"&_cf_ajaxproxytoken="+_284;
if(_287){
_28a+="&_cfclient="+"true";
var _28b=$X.JSON.encodeInternal(_282._variables,_287);
_28a+="&_variables="+encodeURIComponent(_28b);
var _28c=$X.JSON.encodeInternal(_282._metadata,_287);
_28a+="&_metadata="+encodeURIComponent(_28c);
}
var _28d=_282.returnFormat||"json";
_28a+="&returnFormat="+_28d;
if(_282.queryFormat){
_28a+="&queryFormat="+_282.queryFormat;
}
if(_282.formId){
var _28e=$C.getFormQueryString(_282.formId,true);
if(_285!=null){
for(prop in _28e){
_285[prop]=_28e[prop];
}
}else{
_285=_28e;
}
_282.formId=null;
}
var _28f="";
if(_285!=null){
_28f=$X.JSON.encodeInternal(_285,_287);
_28a+="&argumentCollection="+encodeURIComponent(_28f);
}
$L.info("ajaxproxy.invoke.invoking","http",[_282.cfcPath,_283,_28f]);
if(_282.callHandler){
_282.callHandler.call(null,_282.callHandlerParams,_282.cfcPath,_28a);
return;
}
var _290;
var _291=_282.async;
if(_288!=null){
_291=true;
_290=function(req){
$X.callbackOp(req,_282,_286,_288,_289);
};
}else{
if(_282.async){
_290=function(req){
$X.callback(req,_282,_286);
};
}
}
var req=$A.sendMessage(_282.cfcPath,_282.httpMethod,_28a,_291,_290,null,true);
if(!_291){
return $X.processResponse(req,_282);
}
};
$X.callback=function(req,_296,_297){
if($A.isRequestError(req)){
$C.handleError(_296.errorHandler,"ajaxproxy.invoke.error","http",[req.status,_296.cfcPath,req.statusText],req.status,req.statusText,false,_297);
}else{
if(_296.callbackHandler){
var _298=$X.processResponse(req,_296);
_296.callbackHandler(_298,_297);
}
}
};
$X.callbackOp=function(req,_29a,_29b,_29c,_29d){
if($A.isRequestError(req)){
var _29e=_29a.errorHandler;
if(_29d!=null){
_29e=_29d;
}
$C.handleError(_29e,"ajaxproxy.invoke.error","http",[req.status,_29a.cfcPath,req.statusText],req.status,req.statusText,false,_29b);
}else{
if(_29c){
var _29f=$X.processResponse(req,_29a);
_29c(_29f,_29b);
}
}
};
$X.processResponse=function(req,_2a1){
var _2a2=true;
for(var i=0;i<req.responseText.length;i++){
var c=req.responseText.charAt(i);
_2a2=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_2a2){
break;
}
}
var _2a5=(req.responseXML&&req.responseXML.childNodes.length>0);
var _2a6=_2a5?"[XML Document]":req.responseText;
$L.info("ajaxproxy.invoke.response","http",[_2a6]);
var _2a7;
var _2a8=_2a1.returnFormat||"json";
if(_2a8=="json"){
try{
_2a7=_2a2?null:$X.JSON.decode(req.responseText);
}
catch(e){
if(typeof _2a1._metadata!=="undefined"&&_2a1._metadata.servercfc&&typeof req.responseText==="string"){
_2a7=req.responseText;
}else{
throw e;
}
}
}else{
_2a7=_2a5?req.responseXML:(_2a2?null:req.responseText);
}
return _2a7;
};
$X.init=function(_2a9,_2aa,_2ab){
if(typeof _2ab==="undefined"){
_2ab=false;
}
var _2ac=_2aa;
if(!_2ab){
var _2ad=_2aa.split(".");
var ns=self;
for(i=0;i<_2ad.length-1;i++){
if(_2ad[i].length){
ns[_2ad[i]]=ns[_2ad[i]]||{};
ns=ns[_2ad[i]];
}
}
var _2af=_2ad[_2ad.length-1];
if(ns[_2af]){
return ns[_2af];
}
ns[_2af]=function(){
this.httpMethod="GET";
this.async=false;
this.callbackHandler=null;
this.errorHandler=null;
this.formId=null;
};
_2ac=ns[_2af].prototype;
}else{
_2ac.httpMethod="GET";
_2ac.async=false;
_2ac.callbackHandler=null;
_2ac.errorHandler=null;
_2ac.formId=null;
}
_2ac.cfcPath=_2a9;
_2ac.setHTTPMethod=function(_2b0){
if(_2b0){
_2b0=_2b0.toUpperCase();
}
if(_2b0!="GET"&&_2b0!="POST"){
$C.handleError(null,"ajaxproxy.sethttpmethod.invalidmethod","http",[_2b0],null,null,true);
}
this.httpMethod=_2b0;
};
_2ac.setSyncMode=function(){
this.async=false;
};
_2ac.setAsyncMode=function(){
this.async=true;
};
_2ac.setCallbackHandler=function(fn){
this.callbackHandler=fn;
this.setAsyncMode();
};
_2ac.setErrorHandler=function(fn){
this.errorHandler=fn;
this.setAsyncMode();
};
_2ac.setForm=function(fn){
this.formId=fn;
};
_2ac.setQueryFormat=function(_2b4){
if(_2b4){
_2b4=_2b4.toLowerCase();
}
if(!_2b4||(_2b4!="column"&&_2b4!="row"&&_2b4!="struct")){
$C.handleError(null,"ajaxproxy.setqueryformat.invalidformat","http",[_2b4],null,null,true);
}
this.queryFormat=_2b4;
};
_2ac.setReturnFormat=function(_2b5){
if(_2b5){
_2b5=_2b5.toLowerCase();
}
if(!_2b5||(_2b5!="plain"&&_2b5!="json"&&_2b5!="wddx")){
$C.handleError(null,"ajaxproxy.setreturnformat.invalidformat","http",[_2b5],null,null,true);
}
this.returnFormat=_2b5;
};
$L.info("ajaxproxy.init.created","http",[_2a9]);
if(_2ab){
return _2ac;
}else{
return ns[_2af];
}
};
$U.isWhitespace=function(s){
var _2b7=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_2b7=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_2b7){
break;
}
}
return _2b7;
};
$U.getFirstNonWhitespaceIndex=function(s){
var _2bb=true;
for(var i=0;i<s.length;i++){
var c=s.charAt(i);
_2bb=(c==" "||c=="\n"||c=="\t"||c=="\r");
if(!_2bb){
break;
}
}
return i;
};
$C.trim=function(_2be){
return _2be.replace(/^\s+|\s+$/g,"");
};
$U.isInteger=function(n){
var _2c0=true;
if(typeof (n)=="number"){
_2c0=(n>=0);
}else{
for(i=0;i<n.length;i++){
if($U.isInteger.numberChars.indexOf(n.charAt(i))==-1){
_2c0=false;
break;
}
}
}
return _2c0;
};
$U.isInteger.numberChars="0123456789";
$U.isArray=function(a){
return (typeof (a.length)=="number"&&!a.toUpperCase);
};
$U.isBoolean=function(b){
if(b===true||b===false){
return true;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
return (b==$U.isBoolean.trueChars||b==$U.isBoolean.falseChars);
}else{
return false;
}
}
};
$U.isBoolean.trueChars="true";
$U.isBoolean.falseChars="false";
$U.castBoolean=function(b){
if(b===true){
return true;
}else{
if(b===false){
return false;
}else{
if(b.toLowerCase){
b=b.toLowerCase();
if(b==$U.isBoolean.trueChars){
return true;
}else{
if(b==$U.isBoolean.falseChars){
return false;
}else{
return false;
}
}
}else{
return false;
}
}
}
};
$U.checkQuery=function(o){
var _2c5=null;
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.DATA&&$U.isArray(o.DATA)&&(o.DATA.length==0||(o.DATA.length>0&&$U.isArray(o.DATA[0])))){
_2c5="row";
}else{
if(o&&o.COLUMNS&&$U.isArray(o.COLUMNS)&&o.ROWCOUNT&&$U.isInteger(o.ROWCOUNT)&&o.DATA){
_2c5="col";
for(var i=0;i<o.COLUMNS.length;i++){
var _2c7=o.DATA[o.COLUMNS[i]];
if(!_2c7||!$U.isArray(_2c7)){
_2c5=null;
break;
}
}
}
}
return _2c5;
};
$X.JSON=new function(){
var _2c8={}.hasOwnProperty?true:false;
var _2c9=/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
var pad=function(n){
return n<10?"0"+n:n;
};
var m={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\"":"\\\"","\\":"\\\\"};
var _2cd=function(s){
if(/["\\\x00-\x1f]/.test(s)){
return "\""+s.replace(/([\x00-\x1f\\"])/g,function(a,b){
var c=m[b];
if(c){
return c;
}
c=b.charCodeAt();
return "\\u00"+Math.floor(c/16).toString(16)+(c%16).toString(16);
})+"\"";
}
return "\""+s+"\"";
};
var _2d2=function(o){
var a=["["],b,i,l=o.length,v;
for(i=0;i<l;i+=1){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(v===null?"null":$X.JSON.encode(v));
b=true;
}
}
a.push("]");
return a.join("");
};
var _2d5=function(o){
return "\""+o.getFullYear()+"-"+pad(o.getMonth()+1)+"-"+pad(o.getDate())+"T"+pad(o.getHours())+":"+pad(o.getMinutes())+":"+pad(o.getSeconds())+"\"";
};
this.encode=function(o){
return this.encodeInternal(o,false);
};
this.encodeInternal=function(o,cfc){
if(typeof o=="undefined"||o===null){
return "null";
}else{
if(o instanceof Array){
return _2d2(o);
}else{
if(o instanceof Date){
if(cfc){
return this.encodeInternal({_date_:o.getTime()},cfc);
}
return _2d5(o);
}else{
if(typeof o=="string"){
return _2cd(o);
}else{
if(typeof o=="number"){
return isFinite(o)?String(o):"null";
}else{
if(typeof o=="boolean"){
return String(o);
}else{
if(cfc&&typeof o=="object"&&typeof o._metadata!=="undefined"){
return "{\"_metadata\":"+this.encodeInternal(o._metadata,false)+",\"_variables\":"+this.encodeInternal(o._variables,cfc)+"}";
}else{
var a=["{"],b,i,v;
for(var i in o){
if(!_2c8||o.hasOwnProperty(i)){
v=o[i];
switch(typeof v){
case "undefined":
case "function":
case "unknown":
break;
default:
if(b){
a.push(",");
}
a.push(this.encodeInternal(i,cfc),":",v===null?"null":this.encodeInternal(v,cfc));
b=true;
}
}
}
a.push("}");
return a.join("");
}
}
}
}
}
}
}
};
this.decode=function(json){
if(typeof json=="object"){
return json;
}
if($U.isWhitespace(json)){
return null;
}
var _2dd=$U.getFirstNonWhitespaceIndex(json);
if(_2dd>0){
json=json.slice(_2dd);
}
if(window._cf_jsonprefix&&json.indexOf(_cf_jsonprefix)==0){
json=json.slice(_cf_jsonprefix.length);
}
try{
if(_2c9.test(json)){
return eval("("+json+")");
}
}
catch(e){
}
throw new SyntaxError("parseJSON");
};
}();
if(!$C.JSON){
$C.JSON={};
}
$C.JSON.encode=$X.JSON.encode;
$C.JSON.encodeInternal=$X.JSON.encodeInternal;
$C.JSON.decode=$X.JSON.decode;
$C.navigate=function(url,_2df,_2e0,_2e1,_2e2,_2e3){
if(url==null){
$C.handleError(_2e1,"navigate.urlrequired","widget");
return;
}
if(_2e2){
_2e2=_2e2.toUpperCase();
if(_2e2!="GET"&&_2e2!="POST"){
$C.handleError(null,"navigate.invalidhttpmethod","http",[_2e2],null,null,true);
}
}else{
_2e2="GET";
}
var _2e4;
if(_2e3){
_2e4=$C.getFormQueryString(_2e3);
if(_2e4==-1){
$C.handleError(null,"navigate.formnotfound","http",[_2e3],null,null,true);
}
}
if(_2df==null){
if(_2e4){
if(url.indexOf("?")==-1){
url+="?"+_2e4;
}else{
url+="&"+_2e4;
}
}
$L.info("navigate.towindow","widget",[url]);
window.location.replace(url);
return;
}
$L.info("navigate.tocontainer","widget",[url,_2df]);
var obj=$C.objectCache[_2df];
if(obj!=null){
if(typeof (obj._cf_body)!="undefined"&&obj._cf_body!=null){
_2df=obj._cf_body;
}
}
$A.replaceHTML(_2df,url,_2e2,_2e4,_2e0,_2e1);
};
$A.checkForm=function(_2e6,_2e7,_2e8,_2e9,_2ea){
var _2eb=_2e7.call(null,_2e6);
if(_2eb==false){
return false;
}
var _2ec=$C.getFormQueryString(_2e6);
$L.info("ajax.submitform.submitting","http",[_2e6.name]);
$A.replaceHTML(_2e8,_2e6.action,_2e6.method,_2ec,_2e9,_2ea);
return false;
};
$A.replaceHTML=function(_2ed,url,_2ef,_2f0,_2f1,_2f2){
var _2f3=document.getElementById(_2ed);
if(!_2f3){
$C.handleError(_2f2,"ajax.replacehtml.elnotfound","http",[_2ed]);
return;
}
var _2f4="_cf_containerId="+encodeURIComponent(_2ed);
_2f0=(_2f0)?_2f0+"&"+_2f4:_2f4;
$L.info("ajax.replacehtml.replacing","http",[_2ed,url,_2f0]);
if(_cf_loadingtexthtml){
try{
_2f3.innerHTML=_cf_loadingtexthtml;
}
catch(e){
}
}
var _2f5=function(req,_2f7){
var _2f8=false;
if($A.isRequestError(req)){
$C.handleError(_2f2,"ajax.replacehtml.error","http",[req.status,_2f7.id,req.statusText],req.status,req.statusText);
_2f8=true;
}
var _2f9=new $E.CustomEvent("onReplaceHTML",_2f7);
var _2fa=new $E.CustomEvent("onReplaceHTMLUser",_2f7);
$E.loadEvents[_2f7.id]={system:_2f9,user:_2fa};
if(req.responseText.search(/<script/i)!=-1){
try{
_2f7.innerHTML="";
}
catch(e){
}
$A.replaceHTML.processResponseText(req.responseText,_2f7,_2f2);
}else{
try{
_2f7.innerHTML=req.responseText;
$A.updateLayouttab(_2f7);
}
catch(e){
}
}
$E.loadEvents[_2f7.id]=null;
_2f9.fire();
_2f9.unsubscribe();
_2fa.fire();
_2fa.unsubscribe();
$L.info("ajax.replacehtml.success","http",[_2f7.id]);
if(_2f1&&!_2f8){
_2f1();
}
};
try{
$A.sendMessage(url,_2ef,_2f0,true,_2f5,_2f3);
}
catch(e){
try{
_2f3.innerHTML=$L.format(CFMessage["ajax.replacehtml.connectionerrordisplay"],[url,e]);
}
catch(e){
}
$C.handleError(_2f2,"ajax.replacehtml.connectionerror","http",[_2ed,url,e]);
}
};
$A.replaceHTML.processResponseText=function(text,_2fc,_2fd){
var pos=0;
var _2ff=0;
var _300=0;
_2fc._cf_innerHTML="";
while(pos<text.length){
var _301=text.indexOf("<s",pos);
if(_301==-1){
_301=text.indexOf("<S",pos);
}
if(_301==-1){
break;
}
pos=_301;
var _302=true;
var _303=$A.replaceHTML.processResponseText.scriptTagChars;
for(var i=1;i<_303.length;i++){
var _305=pos+i+1;
if(_305>text.length){
break;
}
var _306=text.charAt(_305);
if(_303[i][0]!=_306&&_303[i][1]!=_306){
pos+=i+1;
_302=false;
break;
}
}
if(!_302){
continue;
}
var _307=text.substring(_2ff,pos);
if(_307){
_2fc._cf_innerHTML+=_307;
}
var _308=text.indexOf(">",pos)+1;
if(_308==0){
pos++;
continue;
}else{
pos+=7;
}
var _309=_308;
while(_309<text.length&&_309!=-1){
_309=text.indexOf("</s",_309);
if(_309==-1){
_309=text.indexOf("</S",_309);
}
if(_309!=-1){
_302=true;
for(var i=1;i<_303.length;i++){
var _305=_309+2+i;
if(_305>text.length){
break;
}
var _306=text.charAt(_305);
if(_303[i][0]!=_306&&_303[i][1]!=_306){
_309=_305;
_302=false;
break;
}
}
if(_302){
break;
}
}
}
if(_309!=-1){
var _30a=text.substring(_308,_309);
var _30b=_30a.indexOf("<!--");
if(_30b!=-1){
_30a=_30a.substring(_30b+4);
}
var _30c=_30a.lastIndexOf("//-->");
if(_30c!=-1){
_30a=_30a.substring(0,_30c-1);
}
if(_30a.indexOf("document.write")!=-1||_30a.indexOf("CF_RunContent")!=-1){
if(_30a.indexOf("CF_RunContent")!=-1){
_30a=_30a.replace("CF_RunContent","document.write");
}
_30a="var _cfDomNode = document.getElementById('"+_2fc.id+"'); var _cfBuffer='';"+"if (!document._cf_write)"+"{document._cf_write = document.write;"+"document.write = function(str){if (_cfBuffer!=null){_cfBuffer+=str;}else{document._cf_write(str);}};};"+_30a+";_cfDomNode._cf_innerHTML += _cfBuffer; _cfBuffer=null;";
}
try{
eval(_30a);
}
catch(ex){
$C.handleError(_2fd,"ajax.replacehtml.jserror","http",[_2fc.id,ex]);
}
}
_301=text.indexOf(">",_309)+1;
if(_301==0){
_300=_309+1;
break;
}
_300=_301;
pos=_301;
_2ff=_301;
}
if(_300<text.length-1){
var _307=text.substring(_300,text.length);
if(_307){
_2fc._cf_innerHTML+=_307;
}
}
try{
_2fc.innerHTML=_2fc._cf_innerHTML;
$A.updateLayouttab(_2fc);
}
catch(e){
}
_2fc._cf_innerHTML="";
};
$A.updateLayouttab=function(_30d){
var _30e=_30d.id;
if(_30e.length>13&&_30e.indexOf("cf_layoutarea")==0){
var s=_30e.substr(13,_30e.length);
var cmp=Ext.getCmp(s);
if(cmp){
cmp.update("<div id="+_30d.id+">"+_30d.innerHTML+"</div>");
}
}
};
$A.replaceHTML.processResponseText.scriptTagChars=[["s","S"],["c","C"],["r","R"],["i","I"],["p","P"],["t","T"]];
$D.getElement=function(_311,_312){
var _313=function(_314){
return (_314.name==_311||_314.id==_311);
};
var _315=$D.getElementsBy(_313,null,_312);
if(_315.length==1){
return _315[0];
}else{
return _315;
}
};
$D.getElementsBy=function(_316,tag,root){
tag=tag||"*";
var _319=[];
if(root){
root=$D.get(root);
if(!root){
return _319;
}
}else{
root=document;
}
var _31a=root.getElementsByTagName(tag);
if(!_31a.length&&(tag=="*"&&root.all)){
_31a=root.all;
}
for(var i=0,len=_31a.length;i<len;++i){
if(_316(_31a[i])){
_319[_319.length]=_31a[i];
}
}
return _319;
};
$D.get=function(el){
if(!el){
return null;
}
if(typeof el!="string"&&!(el instanceof Array)){
return el;
}
if(typeof el=="string"){
return document.getElementById(el);
}else{
var _31d=[];
for(var i=0,len=el.length;i<len;++i){
_31d[_31d.length]=$D.get(el[i]);
}
return _31d;
}
return null;
};
$E.loadEvents={};
$E.CustomEvent=function(_31f,_320){
return {name:_31f,domNode:_320,subs:[],subscribe:function(func,_322){
var dup=false;
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
if(sub.f==func&&sub.p==_322){
dup=true;
break;
}
}
if(!dup){
this.subs.push({f:func,p:_322});
}
},fire:function(){
for(var i=0;i<this.subs.length;i++){
var sub=this.subs[i];
sub.f.call(null,this,sub.p);
}
},unsubscribe:function(){
this.subscribers=[];
}};
};
$E.windowLoadImpEvent=new $E.CustomEvent("cfWindowLoadImp");
$E.windowLoadEvent=new $E.CustomEvent("cfWindowLoad");
$E.windowLoadUserEvent=new $E.CustomEvent("cfWindowLoadUser");
$E.listeners=[];
$E.addListener=function(el,ev,fn,_32b){
var l={el:el,ev:ev,fn:fn,params:_32b};
$E.listeners.push(l);
var _32d=function(e){
if(!e){
var e=window.event;
}
fn.call(null,e,_32b);
};
if(el.addEventListener){
el.addEventListener(ev,_32d,false);
return true;
}else{
if(el.attachEvent){
el.attachEvent("on"+ev,_32d);
return true;
}else{
return false;
}
}
};
$E.isListener=function(el,ev,fn,_332){
var _333=false;
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn==fn&&ls[i].params==_332){
_333=true;
break;
}
}
return _333;
};
$E.callBindHandlers=function(id,_337,ev){
var el=document.getElementById(id);
if(!el){
return;
}
var ls=$E.listeners;
for(var i=0;i<ls.length;i++){
if(ls[i].el==el&&ls[i].ev==ev&&ls[i].fn._cf_bindhandler){
ls[i].fn.call(null,null,ls[i].params);
}
}
};
$E.registerOnLoad=function(func,_33d,_33e,user){
if($E.registerOnLoad.windowLoaded){
if(_33d&&_33d._cf_containerId&&$E.loadEvents[_33d._cf_containerId]){
if(user){
$E.loadEvents[_33d._cf_containerId].user.subscribe(func,_33d);
}else{
$E.loadEvents[_33d._cf_containerId].system.subscribe(func,_33d);
}
}else{
func.call(null,null,_33d);
}
}else{
if(user){
$E.windowLoadUserEvent.subscribe(func,_33d);
}else{
if(_33e){
$E.windowLoadImpEvent.subscribe(func,_33d);
}else{
$E.windowLoadEvent.subscribe(func,_33d);
}
}
}
};
$E.registerOnLoad.windowLoaded=false;
$E.onWindowLoad=function(fn){
if(window.addEventListener){
window.addEventListener("load",fn,false);
}else{
if(window.attachEvent){
window.attachEvent("onload",fn);
}else{
if(document.getElementById){
window.onload=fn;
}
}
}
};
$C.addSpanToDom=function(){
var _341=document.createElement("span");
document.body.insertBefore(_341,document.body.firstChild);
};
$E.windowLoadHandler=function(e){
if(window.Ext){
Ext.BLANK_IMAGE_URL=_cf_ajaxscriptsrc+"/resources/ext/images/default/s.gif";
}
$C.addSpanToDom();
$L.init();
$E.registerOnLoad.windowLoaded=true;
$E.windowLoadImpEvent.fire();
$E.windowLoadImpEvent.unsubscribe();
$E.windowLoadEvent.fire();
$E.windowLoadEvent.unsubscribe();
if(window.Ext){
Ext.onReady(function(){
$E.windowLoadUserEvent.fire();
});
}else{
$E.windowLoadUserEvent.fire();
}
$E.windowLoadUserEvent.unsubscribe();
};
$E.onWindowLoad($E.windowLoadHandler);
$B.register=function(_343,_344,_345,_346){
for(var i=0;i<_343.length;i++){
var _348=_343[i][0];
var _349=_343[i][1];
var _34a=_343[i][2];
if(window[_348]){
var _34b=eval(_348);
if(_34b&&_34b._cf_register){
_34b._cf_register(_34a,_345,_344);
continue;
}
}
var _34c=$C.objectCache[_348];
if(_34c&&_34c._cf_register){
_34c._cf_register(_34a,_345,_344);
continue;
}
var _34d=$D.getElement(_348,_349);
var _34e=(_34d&&((!_34d.length&&_34d.length!=0)||(_34d.length&&_34d.length>0)||_34d.tagName=="SELECT"));
if(!_34e){
$C.handleError(null,"bind.register.elnotfound","bind",[_348]);
}
if(_34d.length>1&&!_34d.options){
for(var j=0;j<_34d.length;j++){
$B.register.addListener(_34d[j],_34a,_345,_344);
}
}else{
$B.register.addListener(_34d,_34a,_345,_344);
}
}
if(!$C.bindHandlerCache[_344.bindTo]&&typeof (_344.bindTo)=="string"){
$C.bindHandlerCache[_344.bindTo]=function(){
_345.call(null,null,_344);
};
}
if(_346){
_345.call(null,null,_344);
}
};
$B.register.addListener=function(_350,_351,_352,_353){
if(!$E.isListener(_350,_351,_352,_353)){
$E.addListener(_350,_351,_352,_353);
}
};
$B.assignValue=function(_354,_355,_356,_357){
if(!_354){
return;
}
if(_354.call){
_354.call(null,_356,_357);
return;
}
var _358=$C.objectCache[_354];
if(_358&&_358._cf_setValue){
_358._cf_setValue(_356);
return;
}
var _359=document.getElementById(_354);
if(!_359){
$C.handleError(null,"bind.assignvalue.elnotfound","bind",[_354]);
}
if(_359.tagName=="SELECT"){
var _35a=$U.checkQuery(_356);
var _35b=$C.objectCache[_354];
if(_35a){
if(!_35b||(_35b&&(!_35b.valueCol||!_35b.displayCol))){
$C.handleError(null,"bind.assignvalue.selboxmissingvaldisplay","bind",[_354]);
return;
}
}else{
if(typeof (_356.length)=="number"&&!_356.toUpperCase){
if(_356.length>0&&(typeof (_356[0].length)!="number"||_356[0].toUpperCase)){
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_354]);
return;
}
}else{
$C.handleError(null,"bind.assignvalue.selboxerror","bind",[_354]);
return;
}
}
_359.options.length=0;
var _35c;
var _35d=false;
if(_35b){
_35c=_35b.selected;
if(_35c&&_35c.length>0){
_35d=true;
}
}
if(!_35a){
for(var i=0;i<_356.length;i++){
var opt=new Option(_356[i][1],_356[i][0]);
_359.options[i]=opt;
if(_35d){
for(var j=0;j<_35c.length;j++){
if(_35c[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_35a=="col"){
var _361=_356.DATA[_35b.valueCol];
var _362=_356.DATA[_35b.displayCol];
if(!_361||!_362){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_354]);
return;
}
for(var i=0;i<_361.length;i++){
var opt=new Option(_362[i],_361[i]);
_359.options[i]=opt;
if(_35d){
for(var j=0;j<_35c.length;j++){
if(_35c[j]==opt.value){
opt.selected=true;
}
}
}
}
}else{
if(_35a=="row"){
var _363=-1;
var _364=-1;
for(var i=0;i<_356.COLUMNS.length;i++){
var col=_356.COLUMNS[i];
if(col==_35b.valueCol){
_363=i;
}
if(col==_35b.displayCol){
_364=i;
}
if(_363!=-1&&_364!=-1){
break;
}
}
if(_363==-1||_364==-1){
$C.handleError(null,"bind.assignvalue.selboxinvalidvaldisplay","bind",[_354]);
return;
}
for(var i=0;i<_356.DATA.length;i++){
var opt=new Option(_356.DATA[i][_364],_356.DATA[i][_363]);
_359.options[i]=opt;
if(_35d){
for(var j=0;j<_35c.length;j++){
if(_35c[j]==opt.value){
opt.selected=true;
}
}
}
}
}
}
}
}else{
_359[_355]=_356;
}
$E.callBindHandlers(_354,null,"change");
$L.info("bind.assignvalue.success","bind",[_356,_354,_355]);
};
$B.localBindHandler=function(e,_367){
var _368=document.getElementById(_367.bindTo);
var _369=$B.evaluateBindTemplate(_367,true);
$B.assignValue(_367.bindTo,_367.bindToAttr,_369);
};
$B.localBindHandler._cf_bindhandler=true;
$B.evaluateBindTemplate=function(_36a,_36b,_36c,_36d,_36e){
var _36f=_36a.bindExpr;
var _370="";
if(typeof _36e=="undefined"){
_36e=false;
}
for(var i=0;i<_36f.length;i++){
if(typeof (_36f[i])=="object"){
var _372=null;
if(!_36f[i].length||typeof _36f[i][0]=="object"){
_372=$X.JSON.encode(_36f[i]);
}else{
var _372=$B.getBindElementValue(_36f[i][0],_36f[i][1],_36f[i][2],_36b,_36d);
if(_372==null){
if(_36b){
_370="";
break;
}else{
_372="";
}
}
}
if(_36c){
_372=encodeURIComponent(_372);
}
_370+=_372;
}else{
var _373=_36f[i];
if(_36e==true&&i>0){
if(typeof (_373)=="string"&&_373.indexOf("&")!=0){
_373=encodeURIComponent(_373);
}
}
_370+=_373;
}
}
return _370;
};
$B.jsBindHandler=function(e,_375){
var _376=_375.bindExpr;
var _377=new Array();
var _378=_375.callFunction+"(";
for(var i=0;i<_376.length;i++){
var _37a;
if(typeof (_376[i])=="object"){
if(_376[i].length){
if(typeof _376[i][0]=="object"){
_37a=_376[i];
}else{
_37a=$B.getBindElementValue(_376[i][0],_376[i][1],_376[i][2],false);
}
}else{
_37a=_376[i];
}
}else{
_37a=_376[i];
}
if(i!=0){
_378+=",";
}
_377[i]=_37a;
_378+="'"+_37a+"'";
}
_378+=")";
var _37b=_375.callFunction.apply(null,_377);
$B.assignValue(_375.bindTo,_375.bindToAttr,_37b,_375.bindToParams);
};
$B.jsBindHandler._cf_bindhandler=true;
$B.urlBindHandler=function(e,_37d){
var _37e=_37d.bindTo;
if($C.objectCache[_37e]&&$C.objectCache[_37e]._cf_visible===false){
$C.objectCache[_37e]._cf_dirtyview=true;
return;
}
var url=$B.evaluateBindTemplate(_37d,false,true,false,true);
var _380=$U.extractReturnFormat(url);
if(_380==null||typeof _380=="undefined"){
_380="JSON";
}
if(_37d.bindToAttr||typeof _37d.bindTo=="undefined"||typeof _37d.bindTo=="function"){
var _37d={"bindTo":_37d.bindTo,"bindToAttr":_37d.bindToAttr,"bindToParams":_37d.bindToParams,"errorHandler":_37d.errorHandler,"url":url,returnFormat:_380};
try{
$A.sendMessage(url,"GET",null,true,$B.urlBindHandler.callback,_37d);
}
catch(e){
$C.handleError(_37d.errorHandler,"ajax.urlbindhandler.connectionerror","http",[url,e]);
}
}else{
$A.replaceHTML(_37e,url,null,null,_37d.callback,_37d.errorHandler);
}
};
$B.urlBindHandler._cf_bindhandler=true;
$B.urlBindHandler.callback=function(req,_382){
if($A.isRequestError(req)){
$C.handleError(_382.errorHandler,"bind.urlbindhandler.httperror","http",[req.status,_382.url,req.statusText],req.status,req.statusText);
}else{
$L.info("bind.urlbindhandler.response","http",[req.responseText]);
var _383;
try{
if(_382.returnFormat==null||_382.returnFormat==="JSON"){
_383=$X.JSON.decode(req.responseText);
}else{
_383=req.responseText;
}
}
catch(e){
if(req.responseText!=null&&typeof req.responseText=="string"){
_383=req.responseText;
}else{
$C.handleError(_382.errorHandler,"bind.urlbindhandler.jsonerror","http",[req.responseText]);
}
}
$B.assignValue(_382.bindTo,_382.bindToAttr,_383,_382.bindToParams);
}
};
$A.initSelect=function(_384,_385,_386,_387){
$C.objectCache[_384]={"valueCol":_385,"displayCol":_386,selected:_387};
};
$S.setupSpry=function(){
if(typeof (Spry)!="undefined"&&Spry.Data){
Spry.Data.DataSet.prototype._cf_getAttribute=function(_388){
var val;
var row=this.getCurrentRow();
if(row){
val=row[_388];
}
return val;
};
Spry.Data.DataSet.prototype._cf_register=function(_38b,_38c,_38d){
var obs={bindParams:_38d};
obs.onCurrentRowChanged=function(){
_38c.call(null,null,this.bindParams);
};
obs.onDataChanged=function(){
_38c.call(null,null,this.bindParams);
};
this.addObserver(obs);
};
if(Spry.Debug.trace){
var _38f=Spry.Debug.trace;
Spry.Debug.trace=function(str){
$L.info(str,"spry");
_38f(str);
};
}
if(Spry.Debug.reportError){
var _391=Spry.Debug.reportError;
Spry.Debug.reportError=function(str){
$L.error(str,"spry");
_391(str);
};
}
$L.info("spry.setupcomplete","bind");
}
};
$E.registerOnLoad($S.setupSpry,null,true);
$S.bindHandler=function(_393,_394){
var url;
var _396="_cf_nodebug=true&_cf_nocache=true";
if(window._cf_clientid){
_396+="&_cf_clientid="+_cf_clientid;
}
var _397=window[_394.bindTo];
var _398=(typeof (_397)=="undefined");
if(_394.cfc){
var _399={};
var _39a=_394.bindExpr;
for(var i=0;i<_39a.length;i++){
var _39c;
if(_39a[i].length==2){
_39c=_39a[i][1];
}else{
_39c=$B.getBindElementValue(_39a[i][1],_39a[i][2],_39a[i][3],false,_398);
}
_399[_39a[i][0]]=_39c;
}
_399=$X.JSON.encode(_399);
_396+="&method="+_394.cfcFunction;
_396+="&argumentCollection="+encodeURIComponent(_399);
$L.info("spry.bindhandler.loadingcfc","http",[_394.bindTo,_394.cfc,_394.cfcFunction,_399]);
url=_394.cfc;
}else{
url=$B.evaluateBindTemplate(_394,false,true,_398);
$L.info("spry.bindhandler.loadingurl","http",[_394.bindTo,url]);
}
var _39d=_394.options||{};
if((_397&&_397._cf_type=="json")||_394.dsType=="json"){
_396+="&returnformat=json";
}
if(_397){
if(_397.requestInfo.method=="GET"){
_39d.method="GET";
if(url.indexOf("?")==-1){
url+="?"+_396;
}else{
url+="&"+_396;
}
}else{
_39d.postData=_396;
_39d.method="POST";
_397.setURL("");
}
_397.setURL(url,_39d);
_397.loadData();
}else{
if(!_39d.method||_39d.method=="GET"){
if(url.indexOf("?")==-1){
url+="?"+_396;
}else{
url+="&"+_396;
}
}else{
_39d.postData=_396;
_39d.useCache=false;
}
var ds;
if(_394.dsType=="xml"){
ds=new Spry.Data.XMLDataSet(url,_394.xpath,_39d);
}else{
ds=new Spry.Data.JSONDataSet(url,_39d);
ds.preparseFunc=$S.preparseData;
}
ds._cf_type=_394.dsType;
var _39f={onLoadError:function(req){
$C.handleError(_394.errorHandler,"spry.bindhandler.error","http",[_394.bindTo,req.url,req.requestInfo.postData]);
}};
ds.addObserver(_39f);
window[_394.bindTo]=ds;
}
};
$S.bindHandler._cf_bindhandler=true;
$S.preparseData=function(ds,_3a2){
var _3a3=$U.getFirstNonWhitespaceIndex(_3a2);
if(_3a3>0){
_3a2=_3a2.slice(_3a3);
}
if(window._cf_jsonprefix&&_3a2.indexOf(_cf_jsonprefix)==0){
_3a2=_3a2.slice(_cf_jsonprefix.length);
}
return _3a2;
};
$P.init=function(_3a4){
$L.info("pod.init.creating","widget",[_3a4]);
var _3a5={};
_3a5._cf_body=_3a4+"_body";
$C.objectCache[_3a4]=_3a5;
};
$B.cfcBindHandler=function(e,_3a7){
var _3a8=(_3a7.httpMethod)?_3a7.httpMethod:"GET";
var _3a9={};
var _3aa=_3a7.bindExpr;
for(var i=0;i<_3aa.length;i++){
var _3ac;
if(_3aa[i].length==2){
_3ac=_3aa[i][1];
}else{
_3ac=$B.getBindElementValue(_3aa[i][1],_3aa[i][2],_3aa[i][3],false);
}
_3a9[_3aa[i][0]]=_3ac;
}
var _3ad=function(_3ae,_3af){
$B.assignValue(_3af.bindTo,_3af.bindToAttr,_3ae,_3af.bindToParams);
};
var _3b0={"bindTo":_3a7.bindTo,"bindToAttr":_3a7.bindToAttr,"bindToParams":_3a7.bindToParams};
var _3b1={"async":true,"cfcPath":_3a7.cfc,"httpMethod":_3a8,"callbackHandler":_3ad,"errorHandler":_3a7.errorHandler};
if(_3a7.proxyCallHandler){
_3b1.callHandler=_3a7.proxyCallHandler;
_3b1.callHandlerParams=_3a7;
}
$X.invoke(_3b1,_3a7.cfcFunction,_3a7._cf_ajaxproxytoken,_3a9,_3b0);
};
$B.cfcBindHandler._cf_bindhandler=true;
$U.extractReturnFormat=function(url){
var _3b3;
var _3b4=url.toUpperCase();
var _3b5=_3b4.indexOf("RETURNFORMAT");
if(_3b5>0){
var _3b6=_3b4.indexOf("&",_3b5+13);
if(_3b6<0){
_3b6=_3b4.length;
}
_3b3=_3b4.substring(_3b5+13,_3b6);
}
return _3b3;
};
$U.replaceAll=function(_3b7,_3b8,_3b9){
var _3ba=_3b7.indexOf(_3b8);
while(_3ba>-1){
_3b7=_3b7.replace(_3b8,_3b9);
_3ba=_3b7.indexOf(_3b8);
}
return _3b7;
};
$U.cloneObject=function(obj){
var _3bc={};
for(key in obj){
var _3bd=obj[key];
if(typeof _3bd=="object"){
_3bd=$U.cloneObject(_3bd);
}
_3bc.key=_3bd;
}
return _3bc;
};
$C.clone=function(obj,_3bf){
if(typeof (obj)!="object"){
return obj;
}
if(obj==null){
return obj;
}
var _3c0=new Object();
for(var i in obj){
if(_3bf===true){
_3c0[i]=$C.clone(obj[i]);
}else{
_3c0[i]=obj[i];
}
}
return _3c0;
};
$C.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
if(typeof (value)=="object"){
value=$C.printObject(value);
}
str+=value;
}
return str;
};
}
}
cfinit();
