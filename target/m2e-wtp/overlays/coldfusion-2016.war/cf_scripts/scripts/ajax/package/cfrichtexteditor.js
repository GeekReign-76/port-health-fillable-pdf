/*ADOBE SYSTEMS INCORPORATED
Copyright 2012 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the
terms of the Adobe license agreement accompanying it.  If you have received this file from a
source other than Adobe, then your use, modification, or distribution of it requires the prior
written permission of Adobe.*/
if(!ColdFusion.RichText){
ColdFusion.RichText={};
}
ColdFusion.RichText.editorState={};
ColdFusion.RichText.buffer=null;
ColdFusion.RichText.initialize=function(id,name,_58e,_58f,_590,_591,_592,_593,_594,skin,_596,_597,_598,_599,_59a){
var _59b=new FCKeditor(id);
ColdFusion.RichText.editorState[id]=false;
_59b.Value=_58e;
_59b.richtextid=id;
if(_58f!=null){
_59b.BasePath=_58f;
}
if(_590!=null){
_59b.Width=_590;
}
if(_591!=null){
_59b.Height=_591;
}
if(_592!=null){
_59b.Config.FontNames=_592;
}
if(_593!=null){
_59b.Config.FontSizes=_593;
}
if(_594!=null){
_59b.Config.FontFormats=_594;
}
_59b.Config.LinkBrowserURL=_59b.BasePath+"editor/filemanager/browser/default/browser.html?Connector=../../connectors/cfm/connector.cfm";
_59b.Config.LinkUploadURL=_59b.BasePath+"editor/filemanager/connectors/cfm/upload.cfm";
_59b.Config.ImageBrowserURL=_59b.BasePath+"editor/filemanager/browser/default/browser.html?Type=Image&Connector=../../connectors/cfm/connector.cfm";
_59b.Config.ImageUploadURL=_59b.BasePath+"editor/filemanager/connectors/cfm/upload.cfm?Type=Image";
_59b.Config.FlashBrowserURL=_59b.BasePath+"editor/filemanager/browser/default/browser.html?Type=Flash&Connector=../../connectors/cfm/connector.cfm";
_59b.Config.FlashUploadURL=_59b.BasePath+"editor/filemanager/connectors/cfm/upload.cfm?Type=Flash";
if(window._cf_clientid){
_59b.Config.LinkBrowserURL=_59b.Config.LinkBrowserURL+"&_cf_clientid="+_cf_clientid;
_59b.Config.LinkUploadURL=_59b.Config.LinkUploadURL+"?_cf_clientid="+_cf_clientid;
_59b.Config.ImageBrowserURL=_59b.Config.ImageBrowserURL+"&_cf_clientid="+_cf_clientid;
_59b.Config.ImageUploadURL=_59b.Config.ImageUploadURL+"&_cf_clientid="+_cf_clientid;
_59b.Config.FlashBrowserURL=_59b.Config.FlashBrowserURL+"&_cf_clientid="+_cf_clientid;
_59b.Config.FlashUploadURL=_59b.Config.FlashUploadURL+"&_cf_clientid="+_cf_clientid;
}
if(skin!=null){
var _59c=_59b.BasePath+"editor/skins/"+skin+"/";
_59b.Config.SkinPath=_59c;
}
if(_596==true){
_59b.Config.ToolbarStartExpanded=false;
_59b.Config.Toolbaronfocus=true;
}
if(_597!=null){
_59b.ToolbarSet=_597;
}
if(_598!=null){
_59b.Config.StylesXmlPath=_598;
}
if(_599!=null){
_59b.Config.TemplatesXmlPath=_599;
}
_59b.Config.AutoDetectLanguage=false;
if(_59a!=null){
_59b.Config.DefaultLanguage=_59a;
}
_59b.ReplaceTextarea();
var _59d=function(_59e){
ColdFusion.RichText.setValue(id,_59e);
};
_59b._cf_setValue=_59d;
var _59f=function(){
if(ColdFusion.RichText.editorState[id]){
var _5a0=FCKeditorAPI.GetInstance(id);
return _5a0.GetXHTML();
}else{
ColdFusion.Log.error("richtext.initialize.getvalue.notready","widget",[id]);
return null;
}
};
_59b._cf_getAttribute=_59f;
var _5a1=function(_5a2,_5a3,_5a4){
var _5a5=document.getElementById(id);
if(_5a5){
ColdFusion.Event.addListener(_5a5,_5a2,_5a3,_5a4);
}
};
_59b._cf_register=_5a1;
_59b._cf_name=name;
ColdFusion.objectCache[name]=_59b;
ColdFusion.objectCache[id]=_59b;
ColdFusion.RichText.registerAfterSet(id);
ColdFusion.Log.info("richtext.initialize.success","widget",[name]);
};
ColdFusion.RichText.editor_onfocus=function(_5a6){
_5a6.ToolbarSet.Expand();
};
ColdFusion.RichText.editor_onblur=function(_5a7){
_5a7.ToolbarSet.Collapse();
};
ColdFusion.RichText.setChangeBuffer=function(_5a8){
ColdFusion.RichText.buffer=FCKeditorAPI.GetInstance(_5a8.Name).GetXHTML();
};
ColdFusion.RichText.resetChangeBuffer=function(_5a9){
if(ColdFusion.RichText.buffer!=FCKeditorAPI.GetInstance(_5a9.Name).GetXHTML()){
ColdFusion.RichText.fireChangeEvent(_5a9.Name);
}
ColdFusion.RichText.buffer=null;
};
ColdFusion.RichText.registerAfterSet=function(_5aa){
if(ColdFusion.RichText.editorState[_5aa]){
var _5ab=function(){
ColdFusion.RichText.fireChangeEvent(_5aa);
};
var _5ac=FCKeditorAPI.GetInstance(_5aa);
_5ac.Events.AttachEvent("OnAfterSetHTML",_5ab);
}else{
setTimeout("ColdFusion.RichText.registerAfterSet('"+_5aa+"')",1000);
}
};
ColdFusion.RichText.getEditorObject=function(_5ad){
if(!_5ad){
ColdFusion.handleError(null,"richtext.geteditorobject.missingtextareaname","widget",null,null,null,true);
return;
}
var _5ae=ColdFusion.objectCache[_5ad];
if(_5ae==null||FCKeditor.prototype.isPrototypeOf(_5ae)==false){
ColdFusion.handleError(null,"richtext.geteditorobject.notfound","widget",[_5ad],null,null,true);
return;
}
return FCKeditorAPI.GetInstance(_5ae.richtextid);
};
ColdFusion.RichText.setValue=function(_5af,_5b0){
if(ColdFusion.RichText.editorState[_5af]){
var _5b1=FCKeditorAPI.GetInstance(_5af);
_5b1.SetHTML(_5b0);
}else{
setTimeout("ColdFusion.RichText.setValue(\""+_5af+"\",\""+_5b0+"\")",1000);
}
};
ColdFusion.RichText.fireChangeEvent=function(_5b2){
var _5b3=ColdFusion.objectCache[_5b2];
ColdFusion.Log.info("richtext.firechangeevent.firechange","widget",[_5b3._cf_name]);
var _5b4=document.getElementById(_5b2);
if(_5b4){
if(_5b4.fireEvent){
_5b4.fireEvent("onchange");
}
if(document.createEvent){
var evt=document.createEvent("HTMLEvents");
if(evt.initEvent){
evt.initEvent("change",true,true);
}
if(_5b4.dispatchEvent){
_5b4.dispatchEvent(evt);
}
}
}
ColdFusion.Event.callBindHandlers(_5b2,null,"change");
};
function FCKeditor_OnComplete(_5b6){
if(_5b6.Config.Toolbaronfocus){
_5b6.Events.AttachEvent("OnBlur",ColdFusion.RichText.editor_onblur);
_5b6.Events.AttachEvent("OnFocus",ColdFusion.RichText.editor_onfocus);
}
_5b6.Events.AttachEvent("OnFocus",ColdFusion.RichText.setChangeBuffer);
_5b6.Events.AttachEvent("OnBlur",ColdFusion.RichText.resetChangeBuffer);
ColdFusion.RichText.editorState[_5b6.Name]=true;
if(ColdFusion.RichText.OnComplete){
ColdFusion.RichText.OnComplete(_5b6);
}
}
