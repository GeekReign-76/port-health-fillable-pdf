/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
var _CF_error_messages=new Array();
var _CF_error_fields=new Object();
var _CF_FirstErrorField=null;
var _CF_submit_status=new Array();
_CF_signalLoad=function(){
_CF_loaded=1;
};
_CF_onError=function(_915,_916,_917,_918){
if(_CF_error_fields[_916]==null){
if(_CF_FirstErrorField==null){
_CF_FirstErrorField=_916;
}
_CF_error_exists=true;
_CF_error_fields[_916]=_918;
_CF_error_messages[_CF_error_messages.length]=_918;
}
};
_CF_onErrorAlert=function(_919){
var _91a="";
for(var i=0;i<_919.length;i++){
_91a+=_919[i]+"\n";
}
alert(_91a);
return false;
};
updateHiddenValue=function(val,form,name){
if(form==null||form==""){
form=0;
}
if(document.forms[form]==null||document.forms[form][name]==null){
return;
}
document.forms[form][name].value=val;
};
_CF_hasValue=function(obj,_920,_921){
if(_920=="TEXT"||_920=="FILE"||_920=="PASSWORD"||_920=="CFTEXTAREA"||_920=="TEXTAREA"||_920=="CFTEXTINPUT"||_920=="DATEFIELD"){
if(obj.value.length==0){
return false;
}else{
if(_921){
str=obj.value.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
}
return true;
}else{
if(_920=="SELECT"){
for(i=0;i<obj.length;i++){
if(obj.options[i].selected&&obj.options[i].value.length>0){
return true;
}
}
return false;
}else{
if(_920=="SINGLE_VALUE_RADIO"||_920=="SINGLE_VALUE_CHECKBOX"){
if(obj.checked){
return true;
}else{
return false;
}
}else{
if(_920=="RADIO"||_920=="CHECKBOX"){
if(obj.length==undefined&&obj.checked){
return true;
}else{
for(i=0;i<obj.length;i++){
if(obj[i].checked){
return true;
}
}
}
return false;
}else{
if(_920=="CFTREE"){
if(obj["value"].length>0){
return true;
}else{
return false;
}
}else{
if(_920=="RICHTEXT"){
var _922=FCKeditorAPI.GetInstance(obj.id);
var val=_922.GetXHTML();
if(val.length==0){
return false;
}else{
if(_921){
str=val.replace(/^\s+/,"").replace(/\s+$/,"");
if(str.length==0){
return false;
}
}
return true;
}
}else{
return true;
}
}
}
}
}
}
};
_CF_checkdate=function(_924,_925){
_924=_924.replace(/^\s+/,"").replace(/\s+$/,"");
_924=_924=_924.replace(/{d \'/,"").replace(/'}/,"");
if(_925){
if(_924.length==0){
return false;
}
}else{
if(_924.length==0){
return true;
}
}
if(_924.length==0){
return true;
}
isplit=_924.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_924.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_924.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_924.length){
return false;
}
var _926=_924.substring(0,isplit);
if(_926.length==4){
sYear=_924.substring(0,isplit);
isplit=_924.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_924.length){
return false;
}
sMonth=_924.substring((sYear.length+1),isplit);
sDay=_924.substring(isplit+1);
}else{
sMonth=_924.substring(0,isplit);
isplit=_924.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_924.length){
return false;
}
sDay=_924.substring((sMonth.length+1),isplit);
sYear=_924.substring(isplit+1);
}
if((sDay.length==0)||(sMonth.length==0)||(sYear.length==0)){
return false;
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(sYear.length!=1&&sYear.length!=2&&sYear.length!=4){
return false;
}else{
if(!_CF_checkrange(sYear,0,9999)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
}
};
_CF_checkeurodate=function(_927,_928){
_927=_927.replace(/^\s+/,"").replace(/\s+$/,"");
_927=_927=_927.replace(/{d \'/,"").replace(/'}/,"");
if(_928){
if(_927.length==0){
return false;
}
}else{
if(_927.length==0){
return true;
}
}
isplit=_927.indexOf("/");
splitchr="/";
if(isplit==-1){
isplit=_927.indexOf(".");
splitchr=".";
}
if(isplit==-1){
isplit=_927.indexOf("-");
splitchr="-";
}
if(isplit==-1||isplit==_927.length){
return false;
}
var _929=_927.substring(0,isplit);
if(_929.length==4){
sYear=_927.substring(0,isplit);
isplit=_927.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_927.length){
return false;
}
sMonth=_927.substring((sYear.length+1),isplit);
sDay=_927.substring(isplit+1);
}else{
sDay=_927.substring(0,isplit);
isplit=_927.indexOf(splitchr,isplit+1);
if(isplit==-1||(isplit+1)==_927.length){
return false;
}
sMonth=_927.substring((sDay.length+1),isplit);
sYear=_927.substring(isplit+1);
}
if(!_CF_checkinteger(sMonth)){
return false;
}else{
if(!_CF_checkrange(sMonth,1,12)){
return false;
}else{
if(!_CF_checkinteger(sYear)){
return false;
}else{
if(!_CF_checkrange(sYear,0,null)){
return false;
}else{
if(!_CF_checkinteger(sDay)){
return false;
}else{
if(!_CF_checkday(sYear,sMonth,sDay)){
return false;
}else{
return true;
}
}
}
}
}
}
};
_CF_checkday=function(_92a,_92b,_92c){
maxDay=31;
if(_92b==4||_92b==6||_92b==9||_92b==11){
maxDay=30;
}else{
if(_92b==2){
if(_92a%4>0){
maxDay=28;
}else{
if(_92a%100==0&&_92a%400>0){
maxDay=28;
}else{
maxDay=29;
}
}
}
}
return _CF_checkrange(_92c,1,maxDay);
};
_CF_checkinteger=function(_92d,_92e){
_92d=_92d.replace(/^\s+/,"").replace(/\s+$/,"");
_92d=_92d.replace(/[$£¥€,~+]?/g,"");
if(_92e){
if(_92d.length==0){
return false;
}
}else{
if(_92d.length==0){
return true;
}
}
var _92f=".";
var _930=_92d.indexOf(_92f);
if(_930==-1){
return _CF_checknumber(_92d);
}else{
return false;
}
};
_CF_numberrange=function(_931,_932,_933,_934){
if(_934){
if(_931.length==0){
return false;
}
}else{
if(_931.length==0){
return true;
}
}
if(_932!=null){
if(_931<_932){
return false;
}
}
if(_933!=null){
if(_931>_933){
return false;
}
}
return true;
};
_CF_checknumber=function(_935,_936){
var _937=" .+-0123456789";
var _938=" .0123456789";
var _939;
var _93a=false;
var _93b=false;
var _93c=false;
_935=_935.replace(/^\s+/,"").replace(/\s+$/,"");
_935=_935.replace(/[$£¥€,~+]?/g,"");
if(_936){
if(_935.length==0){
return false;
}
}else{
if(_935.length==0){
return true;
}
}
_939=_937.indexOf(_935.charAt(0));
if(_939==1){
_93a=true;
}else{
if(_939<1){
return false;
}
}
for(var i=1;i<_935.length;i++){
_939=_938.indexOf(_935.charAt(i));
if(_939<0){
return false;
}else{
if(_939==1){
if(_93a){
return false;
}else{
_93a=true;
}
}else{
if(_939==0){
if(_93a||_93c){
_93b=true;
}
}else{
if(_93b){
return false;
}else{
_93c=true;
}
}
}
}
}
return true;
};
_CF_checkrange=function(_93e,_93f,_940,_941){
_93e=_93e.replace(/^\s+/,"").replace(/\s+$/,"");
if(_941){
if(_93e.length==0){
return false;
}
}else{
if(_93e.length==0){
return true;
}
}
if(!_CF_checknumber(_93e)){
return false;
}else{
return (_CF_numberrange((eval(_93e)),_93f,_940));
}
return true;
};
_CF_checktime=function(_942,_943){
_942=_942.replace(/^\s+/,"").replace(/\s+$/,"");
_942=_942.replace(/\s+:\s+/,":");
_942=_942=_942.replace(/{t \'/,"").replace(/'}/,"");
if(_943){
if(_942.length==0){
return false;
}
}else{
if(_942.length==0){
return true;
}
}
var _944=_CF_checkregex(_942,/^((([0-1]?\d)|(2[0-3])):[0-5]?\d)?(:[0-5]?\d)? ?([AP]M|[AP]m|[ap]m|[ap]M)?$/,_943);
return _944;
};
_CF_checkphone=function(_945,_946){
_945=_945.replace(/^\s+/,"").replace(/\s+$/,"");
if(_946){
if(_945.length==0){
return false;
}
}else{
if(_945.length==0){
return true;
}
}
if(_945.length==0){
return true;
}
return _CF_checkregex(_945,/^(((1))?[ ,\-,\.]?([\\(]?([1-9][0-9]{2})[\\)]?))?[ ,\-,\.]?([^0-1]){1}([0-9]){2}[ ,\-,\.]?([0-9]){4}(( )((x){0,1}([0-9]){1,5}){0,1})?$/,_946);
};
_CF_checkzip=function(_947,_948){
_947=_947.replace(/^\s+/,"").replace(/\s+$/,"");
if(_948){
if(_947.length==0){
return false;
}
}else{
if(_947.length==0){
return true;
}
}
return _CF_checkregex(_947,/^([0-9]){5,5}$|(([0-9]){5,5}(-| ){1}([0-9]){4,4}$)/,_948);
};
_CF_checkcreditcard=function(_949,_94a){
_949=_949.replace(/^\s+/,"").replace(/\s+$/,"");
if(_94a){
if(_949.length==0){
return false;
}
}else{
if(_949.length==0){
return true;
}
}
if(_949.length==0){
return true;
}
var _94b=" -";
var _94c="";
var _94d;
for(var i=0;i<_949.length;i++){
_94d=_94b.indexOf(_949.charAt(i));
if(_94d<0){
_94c+=_949.substring(i,(i+1));
}
}
if(_94c.length<13||_94c.length>19){
return false;
}
if(_94c.charAt(0)=="+"){
return false;
}
if(!_CF_checkinteger(_94c)){
return false;
}
var _94f=_94c.length%2==1?false:true;
var _950=0;
var _951;
for(var i=0;i<_94c.length;i++){
_951=eval(_94c.charAt(i));
if(_94f){
_951*=2;
_950+=(_951%10);
if((_951/10)>=1){
_950++;
}
_94f=false;
}else{
_950+=_951;
_94f=true;
}
}
return (_950%10)==0?true:false;
};
_CF_checkssn=function(_952,_953){
_952=_952.replace(/^\s+/,"").replace(/\s+$/,"");
if(_953){
if(_952.length==0){
return false;
}
}else{
if(_952.length==0){
return true;
}
}
return _CF_checkregex(_952,/^[0-9]{3}(-| )[0-9]{2}(-| )[0-9]{4}$/,_953);
};
_CF_checkEmail=function(_954,_955){
_954=_954.replace(/^\s+/,"").replace(/\s+$/,"");
if(_955){
if(_954.length==0){
return false;
}
}else{
if(_954.length==0){
return true;
}
}
return _CF_checkregex(_954,/^[a-zA-Z_0-9-'\+~]+(\.[a-zA-Z_0-9-'\+~]+)*@([a-zA-Z_0-9-]+\.)+[a-zA-Z]*$/,_955);
};
_CF_checkURL=function(_956,_957){
_956=_956.replace(/^\s+/,"").replace(/\s+$/,"");
if(_957){
if(_956.length==0){
return false;
}
}else{
if(_956.length==0){
return true;
}
}
return _CF_checkregex(_956.toLowerCase(),/^((http|https|ftp|file)\:\/\/([a-zA-Z0-0]*:[a-zA-Z0-0]*(@))?[a-zA-Z0-9-\.]+(\.[a-zA-Z]{2,3})?(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9-\._\?\,\'\/\+&amp;%\$#\=~])*)|((mailto)\:[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]*)|((news)\:[a-zA-Z0-9\.]*)$/,_957);
};
_CF_checkUUID=function(_958,_959){
_958=_958.replace(/^\s+/,"").replace(/\s+$/,"");
if(_959){
if(_958.length==0){
return false;
}
}else{
if(_958.length==0){
return true;
}
}
return _CF_checkregex(_958,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{16,16}/,_959);
};
_CF_checkGUID=function(_95a,_95b){
_95a=_95a.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95b){
if(_95a.length==0){
return false;
}
}else{
if(_95a.length==0){
return true;
}
}
return _CF_checkregex(_95a,/[A-Fa-f0-9]{8,8}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{4,4}-[A-Fa-f0-9]{12,12}/,_95b);
};
_CF_checkBoolean=function(_95c,_95d){
_95c=_95c.replace(/^\s+/,"").replace(/\s+$/,"");
if(_95d){
if(_95c.length==0){
return false;
}
}else{
if(_95c.length==0){
return true;
}
}
if(_95c.toUpperCase()=="TRUE"||_95c.toUpperCase()=="YES"||(_CF_checknumber(_95c)&&_95c!="0")){
return true;
}else{
if(_95c.toUpperCase()=="FALSE"||_95c.toUpperCase()=="NO"||_95c=="0"){
return true;
}else{
return false;
}
}
};
_CF_setFormParam=function(_95e,_95f,_960){
var _961="document['"+_95e+"']['"+_95f+"']";
var obj=eval(_961);
if(obj==undefined){
return false;
}else{
obj.value=_960;
return true;
}
};
_CF_checkregex=function(_963,_964,_965){
if(_965){
if(_963.length==0){
return false;
}
}else{
if(_963.length==0){
return true;
}
}
return _964.test(_963);
};
