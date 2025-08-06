/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
cfinitgrid=function(){
if(!ColdFusion.Grid){
ColdFusion.Grid={};
}
var $G=ColdFusion.Grid;
if(!$G.GridBindelementsMap){
$G.GridBindelementsMap={};
}
var $L=ColdFusion.Log;
$G.init=function(id,_4,_5,_6,_7,_8,_9,_a,_b,_c,_d,_e,_f,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19,_1a,_1b,_1c,_1d,_1e,_1f){
var _20;
var _21;
var _22=false;
if(_14&&typeof (_14)!="undefined"){
_21=_14;
_22=true;
}else{
_21="rowmodel";
}
var _23=_b;
var _24={store:_c,columns:_b,selModel:_21,autoSizeColumns:_9,autoSizeHeaders:_9,stripeRows:_f,autoExpandColumnId:_a};
if(_1e!=null&&typeof _1e!="undefined"){
_24.plugins=_1e;
}
var _25=ColdFusion.objectCache[id];
var _26=document.getElementById(_25.gridId);
if(_26!=null){
var _27=_26.style.cssText;
if(typeof _27=="undefined"){
_27="";
}
_27="width:"+_d+"px;"+_27;
_26.style.cssText=_27;
}
_24.width=_d;
if(_9===true){
_24.viewConfig={forceFit:true};
_24.forceFit=true;
}else{
if(_14&&typeof (_14)!="undefined"){
_24.autoExpandColumn=_a;
}else{
_24.autoExpandColumn=_a;
}
}
if(_e){
_24.height=_e;
}else{
_24.autoHeight=true;
var _28=".x-grid3-header {position: relative;}";
Ext.util.CSS.createStyleSheet(_28,"_cf_grid"+id);
}
if(_16&&typeof (_16)!="undefined"){
_24.features={ftype:"grouping"};
}
_24.title=_17;
_24.collapsible=_15;
if(_15&&_17==null){
_24.title="  ";
}
var _29=ColdFusion.objectCache[id];
_29.bindOnLoad=_8;
_29.dynamic=_6;
_29.styles=_10;
_29.grouping=_16;
_29.onLoadFunction=_1d;
_29.multiRowSelection=_22;
_24.renderTo=_29.gridId;
Ext.onReady(function(){
_24.dockedItems={xtype:"toolbar",dock:"top"};
_24.tbar=new Ext.Toolbar({hidden:true});
if(_6){
_24.bbar=new Ext.PagingToolbar({pageSize:_11,store:_c});
if(_1b&&(_18||_19)){
var _2a=_24.bbar;
if(_18){
_2a.add({xtype:"button",text:_18,handler:$G.insertRow,scope:_29});
_2a.add({xtype:"button",text:" save ",handler:$G.saveNewRecord,scope:_29});
_2a.add({xtype:"button",text:" cancel ",handler:$G.cancelNewRecord,scope:_29});
}
if(_19){
_2a.add({xtype:"button",text:_19,handler:$G.deleteRow,scope:_29});
}
}
}
if(_7&&!_6){
var _2b=new Ext.Toolbar();
if(_18||_19){
if(_18){
_2b.add({xtype:"button",text:_18,handler:$G.insertRow,scope:_29});
}
if(_19){
_2b.add({xtype:"button",text:_19,handler:$G.deleteRow,scope:_29});
}
}else{
var _2b=new Ext.Toolbar({hidden:true});
}
_24.bbar=_2b;
}
_c.pageSize=_11;
_20=Ext.create("Ext.grid.Panel",_24);
$G.Ext_caseInsensitive_sorting();
_c.addListener("load",$G.Actions.onLoad,_29,{delay:50});
_20.view.addListener("beforeshow",function(_2c){
var _2d=_23.getColumnCount();
for(var i=0;i<_2d;i++){
if("CFGRIDROWINDEX"==_23.getDataIndex(i)){
_2c.remove(_2c.items["items"][i]);
break;
}
}
},this);
_29.grid=_20;
if(!_6){
_c.addListener("load",$G.Actions.onLoad,_29,{delay:50});
_c.load();
}
if(_6){
_c._cf_errorHandler=_1c;
_c.proxy._cf_actions=_29;
_c.load({params:{start:0,limit:_11}});
}else{
$G.applyStyles(_29);
}
if(_1f){
ColdFusion.Bind.register(_1f,{actions:_29},$G.bindHandler,false);
}
$L.info("grid.init.created","widget",[id]);
_29.init(id,_4,_5,_1a,_6,_7,_1b,_1c,_13,_11,_12,_16);
});
};
$G.applyStyles=function(_2f){
Ext.util.CSS.createStyleSheet(_2f.styles);
_2f.stylesApplied=true;
};
$G.bindHandler=function(e,_31){
$G.refresh(_31.actions.id);
};
$G.bindHandler._cf_bindhandler=true;
$G.refresh=function(_32,_33){
var _34=ColdFusion.objectCache[_32];
if(_34&&$G.Actions.prototype.isPrototypeOf(_34)==true){
var _35=_34.grid.getStore();
if(_34.dynamic){
_34.editOldValue=null;
_34.selectedRow=-1;
var _36=$G.GridBindelementsMap[_32];
if(_36){
var url=_35.proxy.url;
var _38=_36.split(";");
for(i=0;i<_38.length;i++){
var _39=_38[i].split(",");
indx=url.indexOf(_39[0]);
url1=url.substring(0,indx);
nxtindx=url.indexOf("&",indx);
url2=url.substring(nxtindx);
var _3a=ColdFusion.Bind.getBindElementValue(_39[1],_39[2],_39[3]);
url=url1+"&"+_39[0]+"="+_3a+url2;
}
_35.proxy.url=url;
}
if(_33){
_35.lastOptions.page=1;
_35.currentPage=1;
_35.reload();
}else{
_35.reload({params:{start:0,limit:_34.pageSize}});
}
}
}else{
ColdFusion.handleError(null,"grid.refresh.notfound","widget",[_32],null,null,true);
return;
}
if(_34.multiRowSelection){
}
$L.info("grid.refresh.success","widget",[_32]);
};
$G.Ext_caseInsensitive_sorting=function(){
Ext.data.Store.prototype.sortData=function(f,_3c){
_3c=_3c||"ASC";
var st=this.fields.get(f).sortType;
var fn=function(r1,r2){
var v1=st(r1.data[f]),v2=st(r2.data[f]);
if(v1.toLowerCase){
v1=v1.toLowerCase();
v2=v2.toLowerCase();
}
return v1>v2?1:(v1<v2?-1:0);
};
this.data.sort(_3c,fn);
if(this.snapshot&&this.snapshot!=this.data){
this.snapshot.sort(_3c,fn);
}
};
};
$G.getTopToolbar=function(_42){
var _43=ColdFusion.objectCache[_42];
if(!_43){
ColdFusion.handleError(null,"grid.getTopToolbar.notfound","widget",[_42],null,null,true);
return;
}
return _43.grid.getDockedItems()[1];
};
$G.showTopToolbar=function(_44){
var _45=ColdFusion.objectCache[_44];
if(!_45){
ColdFusion.handleError(null,"grid.showTopToolbar.notfound","widget",[_44],null,null,true);
return;
}
var _46=_45.grid.getDockedItems()[1];
if(!_46){
ColdFusion.handleError(null,"grid.showTopToolbar.toolbarNotDefined","widget",[_44],null,null,true);
return;
}
_46.show();
};
$G.hideTopToolbar=function(_47){
var _48=ColdFusion.objectCache[_47];
if(!_48){
ColdFusion.handleError(null,"grid.hideTopToolbar.notfound","widget",[_47],null,null,true);
return;
}
var _49=_48.grid.getDockedItems()[1];
if(!_49){
ColdFusion.handleError(null,"grid.hideTopToolbar.toolbarNotDefined","widget",[_47],null,null,true);
return;
}
_49.hide();
};
$G.refreshTopToolbar=function(_4a){
var _4b=ColdFusion.objectCache[_4a];
if(!_4b){
ColdFusion.handleError(null,"grid.refreshTopToolbar.notfound","widget",[_4a],null,null,true);
return;
}
var _4c=_4b.grid.getDockedItems()[1];
if(!_4c){
ColdFusion.handleError(null,"grid.refreshTopToolbar.toolbarNotDefined","widget",[_4a],null,null,true);
return;
}
_4c.doLayout();
if(_4c.isVisible()==false){
_4c.show();
}
};
$G.getBottomToolbar=function(_4d){
var _4e=ColdFusion.objectCache[_4d];
if(!_4e){
ColdFusion.handleError(null,"grid.getBottomToolbar.notfound","widget",[_4d],null,null,true);
return;
}
return _4e.grid.getDockedItems()[_4e.grid.getDockedItems().length-1];
};
$G.showBottomToolbar=function(_4f){
var _50=ColdFusion.objectCache[_4f];
if(!_50){
ColdFusion.handleError(null,"grid.showBottomToolbar.notfound","widget",[_4f],null,null,true);
return;
}
var _51=_50.grid.getDockedItems()[_50.grid.getDockedItems().length-1];
if(!_51){
ColdFusion.handleError(null,"grid.showBottomToolbar.toolbarNotDefined","widget",[_4f],null,null,true);
return;
}
_51.show();
};
$G.hideBottomToolbar=function(_52){
var _53=ColdFusion.objectCache[_52];
if(!_53){
ColdFusion.handleError(null,"grid.hideBottomToolbar.notfound","widget",[_52],null,null,true);
return;
}
var _54=_53.grid.getDockedItems()[_53.grid.getDockedItems().length-1];
if(!_54){
ColdFusion.handleError(null,"grid.hideBottomToolbar.toolbarNotDefined","widget",[_52],null,null,true);
return;
}
_54.hide();
};
$G.refreshBottomToolbar=function(_55){
var _56=ColdFusion.objectCache[_55];
if(!_56){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.notfound","widget",[_55],null,null,true);
return;
}
var _57=_56.grid.getDockedItems()[_56.grid.getDockedItems().length-1];
if(!_57){
ColdFusion.handleError(null,"grid.refreshBottomToolbar.toolbarNotDefined","widget",[_55],null,null,true);
return;
}
_57.doLayout();
if(_57.isVisible()==false){
_57.show();
}
};
$G.sort=function(_58,_59,_5a){
var _5b=ColdFusion.objectCache[_58];
if(!_5b){
ColdFusion.handleError(null,"grid.sort.notfound","widget",[_58],null,null,true);
return;
}
_59=_59.toUpperCase();
var _5c=-1;
var _5d=_5b.grid.columns;
for(var i=0;i<_5d.length-1;i++){
if(_59==_5d[i].colName){
_5c=i;
break;
}
}
if(_5c==-1){
ColdFusion.handleError(null,"grid.sort.colnotfound","widget",[_59,_58],null,null,true);
return;
}
if(!_5a){
_5a="ASC";
}
_5a=_5a.toUpperCase();
if(_5a!="ASC"&&_5a!="DESC"){
ColdFusion.handleError(null,"grid.sort.invalidsortdir","widget",[_5a,_58],null,null,true);
return;
}
var _5f=_5b.grid.getStore();
_5f.sort(_59,_5a);
};
$G.getGridObject=function(_60){
if(!_60){
ColdFusion.handleError(null,"grid.getgridobject.missinggridname","widget",null,null,null,true);
return;
}
var _61=ColdFusion.objectCache[_60];
if(_61==null||$G.Actions.prototype.isPrototypeOf(_61)==false){
ColdFusion.handleError(null,"grid.getgridobject.notfound","widget",[_60],null,null,true);
return;
}
return _61.grid;
};
$G.getSelectedRows=function(_62){
if(!_62){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _63=ColdFusion.objectCache[_62];
var _64=new Array();
var _65=_63.grid.getSelectionModel();
var _66=_65.selected;
var _67=_63.grid.columns;
var _68=0;
if(_63.multiRowSelection===true&&_63.dynamic===false){
_68++;
}
for(i=0;i<_66.length;i++){
var _69=_66.items[i].data;
var _6a={};
for(var _6b=_68;_6b<_67.length-1;_6b++){
var key=_67[_6b].dataIndex;
_6a[key]=_69[key];
}
_64[i]=_6a;
}
return _64;
};
$G.clearSelectedRows=function(_6d){
if(!_6d){
ColdFusion.handleError(null,"grid.getSelectedRowData.missinggridname","widget",null,null,null,true);
return;
}
var _6e=ColdFusion.objectCache[_6d];
var _6f=_6e.grid.getSelectionModel();
_6f.deselectAll();
if(_6e.multiRowSelection){
}
};
$G.Actions=function(_70){
this.gridId=_70;
this.init=$G.Actions.init;
this.onChangeHandler=$G.Actions.onChangeHandler;
this.onChangeHandler_MultiRowsDelete=$G.Actions.onChangeHandler_MultiRowsDelete;
this.selectionChangeEvent=new ColdFusion.Event.CustomEvent("cfGridSelectionChange",_70);
this.fireSelectionChangeEvent=$G.fireSelectionChangeEvent;
this._cf_getAttribute=$G.Actions._cf_getAttribute;
this._cf_register=$G.Actions._cf_register;
this.loaded=false;
};
$G.Actions.init=function(id,_72,_73,_74,_75,_76,_77,_78,_79,_7a,_7b,_7c){
this.id=id;
this.gridName=_72;
this.formId=_73;
this.form=document.getElementById(_73);
this.cellClickInfo=_74;
this.edit=_76;
this.onChangeFunction=_77;
this.onErrorFunction=_78;
this.preservePageOnSort=_79;
this.pageSize=_7a;
this.selectedRow=-1;
this.selectOnLoad=_7b;
this.grouping=_7c;
this.grid.addListener("cellclick",$G.cellClick,this,true);
this.editField=document.createElement("input");
this.editField.setAttribute("name",_72);
this.editField.setAttribute("type","hidden");
this.form.appendChild(this.editField);
if(_76){
if(!_75){
var _7d=this.grid.columns;
this.editFieldPrefix="__CFGRID__EDIT__=";
var i=0;
var _7f=_7d.length-1;
if(this.multiRowSelection===true&&this.dynamic===false){
i++;
_7f--;
}
this.editFieldPrefix+=_7f+$G.Actions.fieldSep;
var _80=true;
for(i;i<_7d.length-1;i++){
if(!_80){
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldPrefix+=_7d[i].colName;
this.editFieldPrefix+=$G.Actions.valueSep;
if(_7d[i].getEditor()){
this.editFieldPrefix+="Y";
}else{
this.editFieldPrefix+="N";
}
_80=false;
}
this.editFieldPrefix+=$G.Actions.fieldSep;
}
this.editFieldState=[];
this.editFieldState.length=this.grid.getStore().getTotalCount();
$G.Actions.computeEditField(this);
this.insertInProgress=false;
this.insertEvent=null;
this.grid.addListener("beforeedit",$G.Actions.beforeEdit,this);
this.grid.addListener("edit",$G.Actions.afterEdit,this,true);
}
if(_75){
this.grid.getStore().addListener("beforeload",$G.Actions.beforeLoad,this,true);
}
this.grid.getSelectionModel().addListener("select",$G.rowSelect,this,true);
this.grid.getSelectionModel().addListener("beforerowselect",$G.beforeRowSelect,this,true);
};
$G.Actions.beforeLoad=function(_81,_82){
var _83=_81.sortInfo;
var _84=(_82.sorters[0]&&_82.sorters[0].property!=this.sortCol);
if(_84&&!this.preservePageOnSort){
_82.start=0;
_82.page=1;
_81.currentPage=1;
}
if(_82.sorters[0]){
this.sortCol=_82.sorters[0].property;
this.sortDir=_82.sorters[0].direction;
}
};
$G.Actions.onLoad=function(_85){
this.editOldValue=null;
this.selectedRow=-1;
this.insertInProgress=false;
var _86=0;
if((this.bindOnLoad||!this.dynamic)&&this.selectOnLoad&&!this.grouping){
this.grid.getSelectionModel().select(_86,false);
}
if(!this.gridRendered&&this.onLoadFunction&&typeof this.onLoadFunction=="function"){
this.gridRendered=true;
this.onLoadFunction.call(null,this.grid);
}
$G.applyStyles(_85);
try{
var _87=Ext.ComponentQuery.query("tabpanel");
if(_87&&this.grid&&this.loaded==false){
for(var i=0;i<_87.length;i++){
if(_87[i].body.dom.innerHTML.indexOf(this.grid.id)>0){
_87[i].doComponentLayout();
this.loaded=true;
}
}
}
}
catch(exception){
}
};
$G.Actions._cf_getAttribute=function(_89){
_89=_89.toUpperCase();
var _8a=this.selectedRow;
var _8b=null;
if(_8a!=0&&(!_8a||_8a==-1)){
return _8b;
}
var ds=this.grid.getStore();
var _8d=(this.dynamic)?ds.getAt(_8a):ds.getById(_8a);
_8b=_8d.get(_89);
return _8b;
};
$G.Actions._cf_register=function(_8e,_8f,_90){
this.selectionChangeEvent.subscribe(_8f,_90);
};
$G.rowSelect=function(_91,_92,row){
var _94="";
var _95=_91.selected.items;
if(_95.length==0){
return;
}
var _96=_95[0].get("CFGRIDROWINDEX")||row;
if(this.selectedRow!=_96){
this.selectedRow=_96;
var _97=true;
for(col in _95[0].data){
if(col=="CFGRIDROWINDEX"){
continue;
}
if(typeof col=="undefined"||col=="undefined"){
continue;
}
if(!_97){
_94+="; ";
}
_94+="__CFGRID__COLUMN__="+col+"; ";
_94+="__CFGRID__DATA__="+_95[0].data[col];
_97=false;
}
this.fireSelectionChangeEvent();
this.insertInProgress=false;
}
};
$G.beforeRowSelect=function(_98,row){
var ds=this.grid.getStore();
var _9b=ds.getAt(row);
return !$G.isNullRow(_9b.data);
};
$G.isNullRow=function(_9c){
var _9d=true;
for(col in _9c){
if(_9c[col]!=null){
_9d=false;
break;
}
}
return _9d;
};
$G.fireSelectionChangeEvent=function(){
$L.info("grid.fireselectionchangeevent.fire","widget",[this.id]);
this.selectionChangeEvent.fire();
};
$G.cellClick=function(_9e,td,_a0,_a1,tr,_a3,e,_a5){
var _a6=this.cellClickInfo.colInfo[_a0];
if(_a6){
var _a7=_9e.getSelectionModel().selected;
var url;
if(_a7.items.length>0&&_a7.items[0].raw){
url=_a7.items[0].raw[_a6.href.toUpperCase()];
}
if(!url){
url=_a6.href;
}
var _a9=_a6.hrefKey;
var _aa=_a6.target;
var _ab=this.appendKey;
if(this.cellClickInfo.appendKey){
var _ac;
if(_a9||_a9==0){
var _ad=_9e.getStore().getAt(_a3);
var _ae=_9e.panel.columns[_a9].dataIndex;
_ac=_ad.get(_ae);
}else{
var _af=this.grid.columns;
_ac=_a7.items[0].get(_af[0].dataIndex);
for(var i=1;i<_af.length-1;i++){
_ac+=","+_a7.items[0].get(_af[i].dataIndex);
}
}
if(url.indexOf("?")!=-1){
url+="&CFGRIDKEY="+_ac;
}else{
url+="?CFGRIDKEY="+_ac;
}
}
if(_aa){
_aa=_aa.toLowerCase();
if(_aa=="_top"){
_aa="top";
}else{
if(_aa=="_parent"){
_aa="parent";
}else{
if(_aa=="_self"){
_aa=window.name;
}else{
if(_aa=="_blank"){
window.open(encodeURI(url));
return;
}
}
}
}
if(!parent[_aa]){
ColdFusion.handleError(null,"grid.cellclick.targetnotfound","widget",[_aa]);
return;
}
parent[_aa].location=encodeURI(url);
}else{
window.location=encodeURI(url);
}
}
};
$G.insertRow=function(){
if(this.insertInProgress&&this.dynamic){
ColdFusion.handleError(null,"Multiple row insert is not supported","Grid",[this.gridId],null,null,true);
return;
}
var _b1={action:"I",values:[]};
var _b2=this.grid.columns;
var _b3=this.grid.getStore();
var _b4={};
var _b5="{[";
for(var i=0;i<_b2.length-1;i++){
var _b7="";
_b1.values[i]=[_b7,_b7];
_b4[_b2[i].dataIndex]=_b7;
_b5=_b5+_b2[i].colName+":'"+_b7+"',";
}
_b4["CFGRIDROWINDEX"]=_b3.getCount()+1;
_b5=_b5+"CFGRIDROWINDEX:'"+(_b3.getCount()+1)+"']}";
_b3.add(_b5);
_b3.getAt(_b3.getCount()-1).data["CFGRIDROWINDEX"]=_b3.getCount();
if(this.dynamic==true){
this.selectedRow=_b3.getCount();
}
this.editFieldState.push(_b1);
this.grid.getSelectionModel().select(_b3.getCount()-1);
this.insertInProgress=true;
$G.Actions.computeEditField(this);
};
$G.saveNewRecord=function(){
if(!this.insertInProgress){
return;
}
var _b8=this.selectedRow;
var _b9=this.insertEvent;
if(_b8==-1){
return;
}
if(this.onChangeFunction){
this.onChangeHandler("I",_b8-1,_b9,$G.insertRowCallback);
}else{
if(this.dynamic==false){
var _ba=this.grid.getStore();
var _bb=_b9.record;
var _bc=new Array(1);
_bc[0]=_bb;
var _bd=_ba.getAt(this.selectedRow-1);
_ba.remove(_bd);
_ba.add(_bc);
}
}
this.insertInProgress=false;
this.insertEvent=null;
};
$G.cancelNewRecord=function(){
if(!this.insertInProgress){
return;
}
this.editFieldState.pop();
var _be=this.grid.getStore();
var _bf=_be.getAt(this.selectedRow-1);
_be.remove(_bf);
this.insertInProgress=false;
this.insertEvent=null;
this.selectedRow=this.selectedrow-1;
};
$G.deleteRow=function(){
var _c0=null;
var _c1;
if(this.multiRowSelection===true){
var _c2=this.grid.getSelectionModel();
_c0=_c2.selected;
}
if(_c0==null){
_c1=this.selectedRow;
}
if(_c1==-1&&_c0==null){
return;
}
if(this.onChangeFunction){
if(_c0!=null){
this.onChangeHandler_MultiRowsDelete("D",_c0,null,$G.deleteRowCallback);
}else{
this.onChangeHandler("D",_c1,null,$G.deleteRowCallback);
}
}else{
if(!this.dynamic){
var _c3=this.grid.getStore();
if(_c0!=null){
for(i=0;i<_c0.length;i++){
var _c4=_c3.indexOf(_c0[i]);
var _c5=this.editFieldState[_c4];
if(_c5){
_c5.action="D";
}else{
_c5=$G.Actions.initEditState(this,"D",_c0[i],_c4+1);
}
}
for(i=0;i<_c0.length;i++){
_c3.remove(_c0[i]);
}
}else{
var _c5=this.editFieldState[_c1-1];
if(_c5){
_c5.action="D";
}else{
var _c6=this.grid.getStore().getById(_c1);
_c5=$G.Actions.initEditState(this,"D",_c6,_c1);
}
_c3.remove(this.grid.getSelectionModel().getSelection());
}
$G.Actions.computeEditField(this);
this.grid.editingPlugin.completeEdit();
this.selectedRow=-1;
}
}
};
$G.deleteRowCallback=function(_c7,_c8){
var _c9=_c8._cf_grid.getStore();
var _ca=_c8._cf_grid_properties;
var _c8=_c9.lastOptions;
var key="start";
if(_c9.getCount()==1){
if(_c8.start>=_c8.limit){
_c8.start=_c8.start-_c8.limit;
}
_c8.page=_c8.page-1;
_c9.reload(_c8);
}else{
_c9.reload();
}
if(_ca.multiRowSelection){
var _cc=_ca.grid.getView().headerCt(0);
if(_cc!=null){
var _cd=Ext.Element.get(_cc).first();
if(_cd){
_cd.replaceClass("x-grid3-hd-checker-on");
}
}
}
};
$G.insertRowCallback=function(_ce,_cf){
var _d0=_cf._cf_grid.getStore();
var _d1=_cf._cf_grid.actions;
_d0.reload();
};
$G.Actions.beforeEdit=function(_d2,e,_d4){
if($G.isNullRow(e.record.data)){
return false;
}
this.editColumn=e.column;
this.editOldValue=e.value;
};
$G.Actions.afterEdit=function(_d5,_d6,_d7){
var _d8=_d6.value;
if(_d8==this.editOldValue){
return;
}
if(this.insertInProgress==false&&this.onChangeFunction){
this.onChangeHandler("U",this.selectedRow,_d6);
}else{
if(!this.dynamic){
rowidx=_d6.rowIdx;
if(!rowidx&&rowidx!=0){
rowidx=_d6.row;
}
var _d9=$G.computeActualRow_editField(this.editFieldState,rowidx+1);
var _da=this.editFieldState[_d9-1];
var _db=_d6.colIdx;
if(!_db&&_db!=0){
_db=_d6.column;
}
if(_da){
if(this.multiRowSelection===true&&this.insertInProgress==true){
_db=_db-1;
}
_da.values[_db][1]=_d8;
}else{
var _dc=this.grid.getStore().getById(this.selectedRow);
_da=$G.Actions.initEditState(this,"U",_dc,_d9);
var _dd=this.editOldValue+"";
if(_d8.getDayOfYear){
if(_dd&&typeof _dd=="string"){
_dd=new Date(_dd);
}
_da.values[_db][1]=_d8.format("F, j Y H:i:s");
_da.values[_db][0]=_dd?_dd.format("F, j Y H:i:s"):_dd;
}else{
_da.values[_db][0]=_dd;
_da.values[_db][1]=_d8;
}
}
$G.Actions.computeEditField(this);
}
}
this.editOldValue=null;
this.fireSelectionChangeEvent();
};
$G.computeActualRow_editField=function(_de,_df){
if(_de.length==_df){
return _df;
}
var _e0=0;
var _e1=0;
for(;_e1<_de.length&&_e0<_df;_e1++){
var _e2=_de[_e1];
if(!_e2||_e2.action!="D"){
_e0++;
}
}
return _e1;
};
$G.Actions.onChangeHandler=function(_e3,_e4,_e5,_e6){
var _e7={};
var _e8={};
var _e9="";
if(null==_e5){
_e9=this.grid.getStore().getAt(_e4).data;
}else{
_e9=_e5?_e5.record.data:this.grid.getStore().getAt(_e4).data;
}
for(col in _e9){
_e7[col]=_e9[col];
}
if(_e3=="U"){
if((_e5.value==null||_e5.value=="")&&(_e5.originalValue==null||_e5.originalValue=="")){
return;
}
if(_e5.value&&_e5.value.getDayOfYear){
if(typeof _e5.originalValue=="string"){
var _ea=new Date(_e5.originalValue);
}
if(_ea!=null&&_ea.getElapsed(_e5.value)==0){
return;
}else{
_e7[_e5.field]=_e5.originalValue;
_e8[_e5.field]=_e5.value.format("F, j Y H:i:s");
}
}else{
_e7[_e5.field]=_e5.originalValue;
_e8[_e5.field]=_e5.value;
}
}
this.onChangeFunction(_e3,_e7,_e8,_e6,this.grid,this.onErrorFunction,this);
};
$G.Actions.onChangeHandler_MultiRowsDelete=function(_eb,_ec,_ed,_ee){
var _ef=new Array();
var _f0={};
for(i=0;i<_ec.length;i++){
_ef[i]=_ec.items[i].data;
}
this.onChangeFunction(_eb,_ef,_f0,_ee,this.grid,this.onErrorFunction,this);
};
$G.Actions.initEditState=function(_f1,_f2,_f3,_f4){
var _f5={action:_f2,values:[]};
var _f6=_f1.grid.columns;
var _f7=_f6.length-1;
_f5.values.length=_f7;
var i=0;
if(_f1.multiRowSelection===true&&_f1.dynamic===false){
i=i++;
}
for(i;i<_f7;i++){
var _f9=_f3.get(_f6[i].colName);
_f5.values[i]=[_f9,_f9];
}
_f1.editFieldState[_f4-1]=_f5;
return _f5;
};
$G.Actions.fieldSep=eval("'\\u0001'");
$G.Actions.valueSep=eval("'\\u0002'");
$G.Actions.nullValue=eval("'\\u0003'");
$G.Actions.computeEditField=function(_fa){
if(_fa.dynamic){
return;
}
var _fb=_fa.editFieldPrefix;
var _fc=_fa.editFieldState;
var _fd=_fa.grid.columns;
var _fe=0;
var _ff="";
for(var i=0;i<_fc.length;i++){
var _101=_fc[i];
if(_101){
_fe++;
_ff+=$G.Actions.fieldSep;
_ff+=_101.action+$G.Actions.valueSep;
var _102=_101.values;
if(_fa.multiRowSelection===true&&_fa.dynamic===false&&_101.action!="I"){
_102=_102.slice(1,_102.length);
}
for(var j=0;j<_102.length;j++){
if(j>0){
_ff+=$G.Actions.valueSep;
}
var _104=($G.Actions.isNull(_102[j][0]))?$G.Actions.nullValue:_102[j][0];
var _105=($G.Actions.isNull(_102[j][1]))?$G.Actions.nullValue:_102[j][1];
var _106=j;
if(_fa.multiRowSelection===true){
_106++;
}
if(_fd[_106].getEditor()&&_105==$G.Actions.nullValue&&_fd[_106].editor.xtype=="checkbox"){
_105="0";
}
if(_101.action!="I"||(_101.action=="I"&&_fd[_106].getEditor())){
if(_fd[_106].type=="date"){
if(_105!=null&&_105!=$G.Actions.nullValue){
if(typeof _105=="string"){
_105=new Date(_105);
}
_105=Ext.Date.format(_105,"F, j Y H:i:s");
}
if(_104!=null&&_104!=$G.Actions.nullValue){
if(typeof _104=="string"){
_104=new Date(_104);
}
_104=Ext.Date.format(_104,"F, j Y H:i:s");
}
}
_ff+=_105;
if(_101.action=="U"&&_fd[_106].getEditor()){
_ff+=$G.Actions.valueSep+_104;
}
}
}
}
}
_fb+=_fe+_ff;
_fa.editField.setAttribute("value",_fb);
};
$G.Actions.isNull=function(val){
var ret=(val==null||typeof (val)=="undefined"||val.length==0);
return ret;
};
$G.loadData=function(data,_10a){
_10a._cf_gridDataProxy.loadResponse(data,_10a);
var _10b=ColdFusion.objectCache[_10a._cf_gridname];
$G.applyStyles(_10b);
$L.info("grid.loaddata.loaded","widget",[_10a._cf_gridname]);
if($G.Actions.isNull(data.TOTALROWCOUNT)==false&&data.TOTALROWCOUNT==0){
_10b.fireSelectionChangeEvent();
}
};
$G.printObject=function(obj){
var str="";
for(key in obj){
str=str+"  "+key+"=";
value=obj[key];
str+=value;
}
return str;
};
$G.formatBoolean=function(v,p,_110){
return "<div class=\"x-grid3-check-col"+(v?"-on":"")+" x-grid3-cc-"+this.id+"\">&#160;</div>";
};
$G.formatDate=function(_111,p,_113){
if(_111&&!_111.dateFormat){
_111=new Date(_111);
}
var _114=this.dateFormat?this.dateFormat:"m/d/y";
return _111?Ext.Date.dateFormat(_111,_114):"";
};
$G.convertDate=function(_115,p,_117){
if(_115&&!_115.dateFormat){
_115=new Date(_115);
}
var _118=this.dateFormat?this.dateFormat:"m/d/y";
return _115;
};
$G.ExtProxy=function(_119,_11a){
this.api={load:true,create:undefined,save:undefined,destroy:undefined};
$G.ExtProxy.superclass.constructor.call(this);
this.bindHandler=_119;
this.errorHandler=_11a;
};
Ext.extend($G.ExtProxy,Ext.data.DataProxy,{_cf_firstLoad:true,load:function(_11b,_11c,_11d,_11e,arg){
if(!this._cf_actions.bindOnLoad){
var _120={"_cf_reader":_11c,"_cf_grid_errorhandler":this.errorHandler,"_cf_scope":_11e,"_cf_gridDataProxy":this,"_cf_gridname":this._cf_gridName,"_cf_arg":arg,"_cf_callback":_11d,"ignoreData":true};
var data=[];
for(i=0;i<_11b.limit;i++){
data.push(new Ext.data.Record({}));
}
this.loadResponse(data,_120);
this._cf_actions.bindOnLoad=true;
}else{
var _122=(_11b.start/_11b.limit)+1;
if(!_11b.sort){
_11b.sort="";
}
if(!_11b.dir){
_11b.dir="";
}
this.bindHandler(this,_122,_11b.limit,_11b.sort,_11b.dir,this.errorHandler,_11d,_11e,arg,_11c);
}
},loadResponse:function(data,_124){
var _125=null;
if(_124.ignoreData){
_125={success:true,records:data,totalRecords:data.length};
}else{
var _126;
if(!data){
_126="grid.extproxy.loadresponse.emptyresponse";
}else{
if(!data.TOTALROWCOUNT&&data.TOTALROWCOUNT!=0){
_126="grid.extproxy.loadresponse.totalrowcountmissing";
}else{
if(!ColdFusion.Util.isInteger(data.TOTALROWCOUNT)){
_126="grid.extproxy.loadresponse.totalrowcountinvalid";
}else{
if(!data.QUERY){
_126="grid.extproxy.loadresponse.querymissing";
}else{
if(!data.QUERY.COLUMNS||!ColdFusion.Util.isArray(data.QUERY.COLUMNS)||!data.QUERY.DATA||!ColdFusion.Util.isArray(data.QUERY.DATA)||(data.QUERY.DATA.length>0&&!ColdFusion.Util.isArray(data.QUERY.DATA[0]))){
_126="grid.extproxy.loadresponse.queryinvalid";
}
}
}
}
}
if(_126){
ColdFusion.handleError(_124._cf_grid_errorHandler,_126,"widget");
this.fireEvent("loadexception",this,_124,data,e);
return;
}
_125=_124._cf_reader.readRecords(data);
}
this.fireEvent("load",this,_124,_124._cf_arg);
_124._cf_callback.call(_124._cf_scope,_125,_124._cf_arg,true);
},update:function(_127){
},updateResponse:function(_128){
}});
$G.ExtReader=function(_129){
this.recordType=Ext.data.Record.create(_129);
};
Ext.extend($G.ExtReader,Ext.data.DataReader,{readRecords:function(_12a){
var _12b=[];
var cols=_12a.QUERY.COLUMNS;
var data=_12a.QUERY.DATA;
for(var i=0;i<data.length;i++){
var _12f={};
for(var j=0;j<cols.length;j++){
_12f[cols[j]]=data[i][j];
}
_12b.push(new Ext.data.Record(_12f));
}
return {success:true,records:_12b,totalRecords:_12a.TOTALROWCOUNT};
}});
$G.CheckColumn=function(_131){
Ext.apply(this,_131);
if(!this.id){
this.id=Ext.id();
}
this.renderer=this.renderer.bind(this);
};
$G.findColumnIndex=function(grid,_133){
var _134=grid.headerCt.getGridColumns();
for(var i=0;i<_134.length;i++){
if(_134[i].dataIndex==_133){
return i;
}
}
};
$G.CheckColumn.prototype={init:function(grid){
this.grid=grid;
this.count=0;
this.columnIndex=$G.findColumnIndex(this.grid,this.dataIndex);
this.grid.on("render",function(){
var view=this.grid.getView();
if(this.editable==true){
this.grid.addListener("itemmousedown",this.onMouseDown,this);
}
},this);
},onMouseDown:function(thi,_139,item,_13b,e,_13d){
var t=e.target;
if(t.className&&t.className.indexOf("x-grid-cc-"+this.id)!=-1){
e.stopEvent();
var _13f=ColdFusion.clone(_139);
_13f.data=ColdFusion.clone(_139.data);
this.grid.getSelectionModel().select(_13b);
this.grid.getSelectionModel().fireEvent("rowselect",this.grid.getSelectionModel(),_13b);
this.grid.fireEvent("beforeedit",this,{grid:this.grid,row:_13b,record:_139,column:this.columnIndex,field:this.dataIndex,value:_139.data[this.dataIndex]});
_139.set(this.dataIndex,this.toggleBooleanValue(_139.data[this.dataIndex]));
this.grid.fireEvent("edit",this,{grid:this.grid,row:_13b,record:_13f,column:this.columnIndex,field:this.dataIndex,value:_139.data[this.dataIndex],originalValue:_13f.data[this.dataIndex]});
}
},toggleBooleanValue:function(v){
v=typeof v=="undefined"?"N":(typeof v=="string"?v.toUpperCase():v);
if(v==="Y"){
return "N";
}
if(v==="N"){
return "Y";
}
if(v===true){
return false;
}
if(v===false){
return true;
}
if(v===0){
return 1;
}
if(v===1){
return 0;
}
if(v==="YES"){
return "NO";
}
if(v==="NO"){
return "YES";
}
if(v==="T"){
return "F";
}
if(v==="F"){
return "T";
}
return "Y";
},renderer:function(v,p,_143){
p.css+=" x-grid-check-col-td";
var _144=false;
v=(typeof v=="string")?v.toUpperCase():v;
if(typeof v!="undefined"&&(v==1||v=="1"||v=="Y"||v=="YES"||v=="TRUE"||v===true||v==="T")){
_144=true;
}
return "<div style=\"background-repeat: no-repeat;background-position:center center;width:auto\" class=\"x-grid-cell-checker"+(_144!=true?"-off":"")+" x-grid-cc-"+this.id+"\">&#160;</div>";
}};
$G.convertBoolean=function(v,_146){
v=typeof v=="undefined"?"N":(typeof v=="string"?v.toUpperCase():v);
if(v==="Y"){
return "YES";
}
if(v==="N"){
return "NO";
}
if(v===true){
return "YES";
}
if(v===false){
return "NO";
}
if(v===0){
return "NO";
}
if(v===1){
return "YES";
}
if(v==="YES"){
return "YES";
}
if(v==="NO"){
return "NO";
}
if(v==="T"){
return "YES";
}
if(v==="F"){
return "NO";
}
if(v==="FALSE"){
return "NO";
}
if(v==""){
return "NO";
}
if(v.toUpperCase()=="NULL"){
return "NO";
}
return "YES";
};
Ext.define("MyReader",{extend:"Ext.data.reader.Json",alias:"reader.my-json",read:function(_147){
var _148=_147.responseText;
if(!_148){
_148=_147;
}
var _149="";
if(!this.proxy._cf_actions.bindOnLoad){
_149="{  totalrows:0, data :[] }";
this.proxy._cf_actions.bindOnLoad=true;
}else{
_149=$G.queryToJson(_148);
}
$G.applyStyles(this.proxy._cf_actions);
return this.callParent([Ext.decode(_149)]);
}});
Ext.define("customcfajax",{extend:"Ext.data.proxy.Ajax",alias:"proxy.customcfajax",getParams:function(_14a){
params=this.callParent(arguments);
if(!(this.sortParam&&_14a.sorters&&_14a.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
}});
Ext.define("Ext.data.proxy.JsProxy",{requires:["Ext.util.MixedCollection","Ext.Ajax"],extend:"Ext.data.proxy.Server",alias:"proxy.jsajax",alternateClassName:["Ext.data.HttpProxy","Ext.data.JsProxy"],actionMethods:{create:"POST",read:"GET",update:"POST",destroy:"POST"},binary:false,jsfunction:"",extraparams:[],getParams:function(_14b){
params=this.callParent(arguments);
if(!(this.sortParam&&_14b.sorters&&_14b.sorters.length>0)){
params[this.sortParam]="";
params[this.directionParam]="ASC";
}
return params;
},processResponse:function(_14c,_14d,_14e,_14f,_150,_151){
var me=this,reader,result;
if(_14c===true){
reader=me.getReader();
reader.applyDefaults=_14d.action==="read";
result=reader.read(me.extractResponseData(_14f));
if(result.success!==false){
Ext.apply(_14d,{response:_14f,resultSet:result});
_14d.commitRecords(result.records);
_14d.setCompleted();
_14d.setSuccessful();
}else{
_14d.setException(result.message);
me.fireEvent("exception",this,_14f,_14d);
}
}else{
me.setException(_14d,_14f);
me.fireEvent("exception",this,_14f,_14d);
}
if(typeof _150=="function"){
_150.call(_151||me,_14d);
}
},doRequest:function(_153,_154,_155){
var me=this;
op=_153;
sorters=_153.sorters;
sortcol="";
sortdir="ASC";
if(sorters.length>0){
sortcol=sorters[0].property;
sortdir=sorters[0].direction;
}
if(this._cf_actions.bindOnLoad){
result=eval(this.jsfunction);
}else{
var _157=[];
for(i=0;i<this._cf_actions.grid.columns.length;i++){
var _158=this._cf_actions.grid.columns[i];
_157[i]=_158.colName;
}
result="{  totalrows:0, QUERY : { COLUMNS : "+_157+" data :[] }}";
}
me.processResponse(true,_153,"",result,_154,_155);
return null;
},getMethod:function(_159){
return this.actionMethods[_159.action];
},createRequestCallback:function(_15a,_15b,_15c,_15d){
var me=this;
return function(_15f,_160,_161){
me.processResponse(_160,_15b,_15a,_161,_15c,_15d);
};
}},function(){
Ext.data.HttpProxy=this;
});
$G.queryToJson=function(data){
var _163=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _165="{  totalrows:"+jsondata.TOTALROWCOUNT+", data :[";
for(var i=0;i<data.length;i++){
var _167={};
_165=_165+"{";
for(var j=0;j<cols.length;j++){
if(data[i][j]==null){
data[i][j]="";
}
_167[cols[j]]=data[i][j];
encodedata=ColdFusion.AjaxProxy.JSON.encode(data[i][j]);
_165=_165+cols[j]+":"+encodedata;
if(j!=cols.length-1){
_165=_165+",";
}
}
_165=_165+"}";
if(i!=data.length-1){
_165=_165+",";
}
}
_165=_165+"]}";
return _165;
};
$G.queryToArray=function(data){
var _16a=[];
jsondata=ColdFusion.AjaxProxy.JSON.decode(data);
var cols=jsondata.QUERY.COLUMNS;
var data=jsondata.QUERY.DATA;
var _16c=new Array();
for(var i=0;i<data.length;i++){
var _16e=new Array(1);
for(var j=0;j<cols.length;j++){
_16e[j]=data[i][j];
}
_16c[i]=_16e;
}
return _16c;
};
};
cfinitgrid();
