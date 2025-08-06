<cfsetting enablecfoutputonly="true">
<!---

 ADOBE CONFIDENTIAL
 ___________________

  Copyright 2012 Adobe Systems Incorporated
  All Rights Reserved.
  NOTICE:  Adobe permits you to use, modify, and distribute this file in accordance with the 
  terms of the Adobe license agreement accompanying it.  If you have received this file from a 
  source other than Adobe, then your use, modification, or distribution of it requires the prior 
  written permission of Adobe.

  _____________________________
  Refactor 05.21.2013 Steve "Cutter" Blades webDOTadminATcutterscrossing.com
  * Changed type "subscriber" to "subscribe" to match the documentation provided
  * Removed "count=horizontal" option from the "tweet" type, as it is no longer supported,
    as well as adding that "count" to the output, to match documentation
  * Rewrote udf's to ColdFusion standards
  * Scope all variables
  
  _____________________________
  Refactor 04.27.2014 Aaron Neff itisdesign.com
  * Added CGI.path_info and CGI.query_string to getCurrentUrl()
  * For the Twitter Tweet Button, added the missing style="#ATTRIBUTES.style#" to the 'a' tag
  * For the Facebook Like Button, added support for these options: appid,kiddirectedsite,ref
  * For the Facebook Like Button, removed this unsupported (and unused) option: font
  * For the Facebook Like Button, un-hardcoded this option: height (changed height:90px; to #ATTRIBUTES.height#px;)
  * For the Facebook Like Button, removed the trailing &amp from the iframe's src attribute
  * For the Facebook Like Button, changed =#LCase(Replace(ATTRIBUTES.layout, ' ', '_', 'all'))# to =#LCase(ATTRIBUTES.layout)# b/c the layout options are hardcoded
  * For the Facebook Like Box, added support for these options: appid,show_border,force_wall
  * For the Facebook Like Box, removed this unsupported (and unused) option: border_color
  * For the Facebook Comment Box, added support for these options: data-order-by,data-mobile
  * For the Facebook Comment Box, added the missing data-colorscheme="#LCase(ATTRIBUTES.colorscheme)#" to the div tag
  
  _____________________________
  Refactor 01.08.2015-01.09.2015 Aaron Neff itisdesign.com
  * For the Facebook Like Button, added support for this option: share
  * For the Facebook Like Button, removed this unsupported option: send
  * For the Facebook Like Button, added "button" as a possible ATTRIBUTES.layout value
  * For the Facebook Like Box, changed the url attribute's default from getCurrentUrl() to "https://www.facebook.com/FacebookDevelopers" and added the following comment: "must be a Facebook Page URL"
  * For the Facebook Comment Box, added support for these options: appid
  * For the Facebook Comment Box, added the missing style attribute to the div tag
  * For the Facebook Comment Box, added support for 100% for width to match Facebook's doc
  * For the Facebook Activity Feed, added support for these options: filter,maxage,ref
  * For the Facebook Activity Feed, removed these unsupported (and unused) options: border_color,font
  * For the Facebook Activity Feed, disabled the ATTRIBUTES.linktarget validation since specifying a frame name is supported
  * For the Facebook Activity Feed, removed the unnecessary LCase() from around the following: ATTRIBUTES.appid, ATTRIBUTES.action and ATTRIBUTES.linktarget
  * For the Facebook Follow Button (formerly the Subscribe Button), added support for these options: appid,kiddirectedsite
  * For the Facebook Follow Button (formerly the Subscribe Button), removed these unsupported options: send,font (font was unused)
  * For the Facebook Follow Button (formerly the Subscribe Button), changed subscribe.php to follow.php per Facebook's doc b/c the Subscribe Button is now the Follow Button
  * For the Facebook Follow Button (formerly the Subscribe Button), removed the trailing &amp from the iframe's src attribute
  * For the Facebook Follow Button (formerly the Subscribe Button), changed =#LCase(Replace(ATTRIBUTES.layout, ' ', '_', 'all'))# to =#LCase(ATTRIBUTES.layout)# b/c the layout options are hardcoded
  * For the Twitter Follow Button, added support for the following options: width,height,align,dnt
  * For the Twitter Follow Button, changed =#ATTRIBUTES.showusername# to ="#ATTRIBUTES.showusername#" (quotes were missing)
  * For the Twitter Follow Button, removed unsupported "small" from possible values for size and changed default from small to medium to match Twitter's default (which was the size CF was actually displaying by default)
  * For the Twitter Follow Button, added language validation
  * For the Twitter Tweet Button, added support for these options: dnt,countURL
  * For the Twitter Tweet Button, changed encodeForURL(ATTRIBUTES.url) to encodeForHTMLAttribute(ATTRIBUTES.url)
  * For the Twitter Tweet Button, added the tweettype="share(default),mention,hashtag" attribute and validation and the username="" attribute in order to support the mention and hashtag buttons
  * For the Twitter Tweet Button, changed twitter-share-button to twitter-#ATTRIBUTES.tweettype#-button in order to support the mention and hashtag buttons
  * For the Twitter Tweet Button, changed the ATTRIBUTES.buttonsize validation from 'small,large' to 'medium,large' b/c medium and large are currently the only supported values
  * For the Twitter Tweet Button, changed the default for size from small to medium to match Twitter's default (which was the size CF was actually displaying by default)
  * For the Twitter Tweet Button, added "vertical" as a possible ATTRIBUTES.count value
  * For the Twitter Tweet Button, added the missing data-lang attribute to the 'a' tag
  * For the Twitter Tweet Button, removed the unnecessary len() check from around ATTRIBUTES.tweettext
  * For the Twitter Tweet Button, changed the default for count from none to horizontal to match Twitter's default and to match the PlusOne button's default which is bubble
  * For the Twitter Tweet Button, added language validation
  * For the Google PlusOne button, added support for this option: align
  * For the Google PlusOne button, changed annotaion to annotation
  * For the Google PlusOne button, changed encodeForURL(ATTRIBUTES.url) to encodeForHTMLAttribute(ATTRIBUTES.url)
  * For the Google PlusOne button, renamed the buttonsize attribute's unsupported "large" option to "standard" and changed the default from small to medium to match the height of the Facebook and Twitter buttons
  * For the Google PlusOne button, changed the default for language from en to en-US to match Google's doc
  * For the Google PlusOne button, added language validation

  _____________________________
  Refactor 01.10.2015 Aaron Neff itisdesign.com
  * Added the div option for Facebook's like, likebox, activityfeed and subscribe
  * Added the iframe option for Twitter's Tweet and Follow buttons
  * Added the format="html4|html5(default)" attribute to all types. (format="html4" renders iframe; format="html5" renders div) (Facebook and Twitter support iframe and div. Google only supports div.)
  * Added the apiversion="1.0|2.0(default)|.." attribute to all Facebook types, since Facebook's API now support versioning.
  * Encapsulated the JavaScript for Facebook, Twitter and Google into a getJavaScript() function
  * Added the render="all(default)|html|javascript" attribute to all types (render="javascript" returns only the JS; render="html" returns only the iframe/div; render="both" returns the whole widget) (this give developers control over where they want to place the JS and the iframe/div)
  
  _____________________________
  Refactor 01.16.2015 Aaron Neff itisdesign.com
  * Added the encodeOutput="true(default)|false" attribute to all types. When true, output is canonicalized and encoded for its context.
  * Added the udfCanonicalizeURL() for canonicalizing URLs b/c canonicalize() converts, for example, &pi to the Pi symbol in the query string ?foo=bar&pid=product_id
  
  _____________________________
  Refactor 01.20.2015 Aaron Neff itisdesign.com
  * For the Facebook Follow Button (formerly the Subscribe Button), added "button" as a possible ATTRIBUTES.layout value
--->

<!---
  Implementation of various social plugins
--->

<!--- START Internal Functions, used only by this tag --->
<cfscript>
	// Validates type attribute.
	private void function validateType (required string type) {
		var validValues = ["like","likebox","tweet","commentbox","activityfeed","subscribe","follow","plusone"];
		if (!ArrayFindNoCase(LOCAL.validValues, ARGUMENTS.type))
			throw(message = "Type attribute has invalid value. Valid values are : " & UCase(ArrayToList(LOCAL.validValues)));
	}

	// Returns current URL.
	private string function getCurrentUrl () {
		return "http" & ((CGI.https eq "off") ? "" : "s") & "://" & CGI.http_host & CGI.script_name & CGI.path_info & (len(trim(CGI.query_string))?'?'&CGI.query_string:'');
	}

	// Validates values of a given attribute.
	private void function validate (required string attributeValue, required string attributeName, required string validValues) {
		if (!ListFindNoCase(ARGUMENTS.validValues, ARGUMENTS.attributeValue))
			throw(message = UCase(ARGUMENTS.attributeName) & " attribute has invalid value. Valid values are : " & ARGUMENTS.validValues);
	}

	// Validates if for a given type these attributes are allowed or not.
	private void function validateAttributes (required string validValues, required string type) {
		var keys = StructKeyArray(ATTRIBUTES);
		ARGUMENTS.validValues = ARGUMENTS.validValues & ",extraoptions";
		for (var i=1; LOCAL.i <= ArrayLen(LOCAL.keys); LOCAL.i++) {
			if (!ListFindNoCase(ARGUMENTS.validValues, LOCAL.keys[LOCAL.i]))
				//throw(message = "Some attribute(s) are not valid for this type. Valid attributes for " & ARGUMENTS.type & " type are : " & ARGUMENTS.validValues);
				
				throw(message = "The following attribute is not valid for this type: " & LOCAL.keys[LOCAL.i] & ". Valid attributes for " & ARGUMENTS.type & " type are : " & ARGUMENTS.validValues);
				
		}
	}

	// Validates numeric data types.
	private void function validateNumber (required string value, required string type) {
		if (!IsNumeric(ARGUMENTS.value) or ARGUMENTS.value < 1)
			throw (message = "Attribute " & ARGUMENTS.type & " can only have positive numeric values");
	}
	
	// Canonicalizes a URL b/c canonicalize() converts, for example, &pi to the Pi symbol in the query string ?foo=bar&pid=product_id
	private string function udfCanonicalizeURL(required string inputString, required boolean restrictMultiple, required boolean restrictMixed, boolean throwOnError=false) {
		var canonicalizedURL="";
		ARGUMENTS.inputString = trim(ARGUMENTS.inputString);
		if(isValid("url", ARGUMENTS.inputString)) {
			var pattern = "([^?##]*)?(\?([^##]*))?(##(.*))?";//parses the URL into schemeHostPath, querystring and fragment
			var parsedURL = reFind(pattern, ARGUMENTS.inputString, 1, true);
			if(parsedURL.len[2]) {//2=schemeHostPath 
				canonicalizedURL &= canonicalize(mid(ARGUMENTS.inputString, parsedURL.pos[2], parsedURL.len[2]), ARGUMENTS.restrictMultiple, ARGUMENTS.restrictMixed, ARGUMENTS.throwOnError);
				if(parsedURL.len[4]) {//4=querystring
					var qs = mid(ARGUMENTS.inputString, parsedURL.pos[4], parsedURL.len[4]);
					var canonicalizedQS="";
					var qsPairs = reMatch("[\&;]?[^\&;]+", qs);
					for(var qsPair in qsPairs) {
						var qsPairNoDelim = listLast(qsPair, "&;");
						canonicalizedQS &= ((reFind("^[\&;].*", qsPair)?left(qsPair, 1):'') & canonicalize(listFirst(qsPairNoDelim, "="), ARGUMENTS.restrictMultiple, ARGUMENTS.restrictMixed, ARGUMENTS.throwOnError));
						var qsValueStartPos = find("=", qsPairNoDelim);
						if(qsValueStartPos and (len(qsPairNoDelim) gt qsValueStartPos)) {
						  canonicalizedQS &= ('=' & canonicalize(right(qsPairNoDelim, len(qsPairNoDelim) - qsValueStartPos), ARGUMENTS.restrictMultiple, ARGUMENTS.restrictMixed, ARGUMENTS.throwOnError));
						}
					}
					if(len(canonicalizedQS)) {
						canonicalizedURL &= ('?' & canonicalizedQS);
					}
				}
				if(parsedURL.len[6]) {//6=fragment
					canonicalizedURL &= ("##" & canonicalize(mid(ARGUMENTS.inputString, parsedURL.pos[6], parsedURL.len[6]), ARGUMENTS.restrictMultiple, ARGUMENTS.restrictMixed, ARGUMENTS.throwOnError));
				}
			}
		} else if(throwOnError) {
			throw(message = "URL is not valid");
		}
		return canonicalizedURL;
	}
</cfscript>
<cffunction name="getJavaScript" access="private" returntype="void">
  <cfargument name="type" type="string" required="yes">
  <cfargument name="apiversion" type="numeric" required="no" hint="Used only for Facebook.">
  <cfargument name="appid" type="string" default="" hint="Used only for Facebook.">
  <cfargument name="language" type="string" default="" hint="Used only for Google.">
  <cfset validateType(ARGUMENTS.type)>
  <cfoutput>
  <cfswitch expression="#ARGUMENTS.type#">
    <cfcase value="like,likebox,commentbox,activityfeed,subscribe">
    <div id="fb-root"></div>
    <script>
        (function (d, s, id) {
            var js
                , fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js##xfbml=1#structKeyExists(ARGUMENTS, 'apiversion')?'&version=v'&ARGUMENTS.apiversion:''#&appId=#encodeForJavaScript(encodeForURL(canonicalize(ARGUMENTS.appid, true, true, false)))#";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    </cfcase>
    <cfcase value="follow,tweet">
	<script>
        !function (d, s, id) {
            var js
                ,fjs=d.getElementsByTagName(s)[0];
            if (!d.getElementById(id)) {
                js=d.createElement(s);
                js.id=id;
                js.src="//platform.twitter.com/widgets.js";
                fjs.parentNode.insertBefore(js,fjs);
            }
        }(document, "script", "twitter-wjs");
    </script>
    </cfcase>
    <cfcase value="plusone">
	<script>
        window.___gcfg = {lang: '#encodeForJavaScript(canonicalize(ARGUMENTS.language, true, true, false))#'};
        (function () {
            var po = document.createElement('script'); 
            po.type = 'text/javascript'; 
            po.async = true;
            po.src = 'https://apis.google.com/js/plusone.js';//must be https
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(po, s);
        })();
    </script>
    </cfcase>
  </cfswitch>
  </cfoutput>
</cffunction>
<!--- END Internal Functions, used only by this tag --->
<cfscript>
	// Stop action if end tag
	if (thisTag.ExecutionMode is 'end')
		return;

	// Is there a valid "type"?
	param name="ATTRIBUTES.type" default="";

	if (Len(ATTRIBUTES.type)) {
		validateType(LCase(ATTRIBUTES.type));
	} else {
		throw(message = "Type is a mandatory attribute");
	}
</cfscript>

<!-----------------------LIKE Button Starts---------------------->
<cfif ATTRIBUTES.type eq "like">
	<cfscript>
		validateAttributes('type,format,render,encodeOutput,apiversion,layout,width,height,colorscheme,showfaces,verb,style,url,appid,kiddirectedsite,referral,share', ATTRIBUTES.type);
		param name="ATTRIBUTES.format" type="string" default="html5";
		param name="ATTRIBUTES.render" type="string" default="all";
		param name="ATTRIBUTES.encodeOutput" type="boolean" default=true;
		param name="ATTRIBUTES.apiversion" type="numeric" default="1.0";//when v1.0 is no longer supported, Facebook will automatically use the oldest supported version
		param name="ATTRIBUTES.layout" type="string" default="standard";
		param name="ATTRIBUTES.verb" type="string" default="like";
		param name="ATTRIBUTES.width" type="numeric" default="450";
		param name="ATTRIBUTES.height" type="numeric" default="90";
		param name="ATTRIBUTES.colorscheme" type="string" default="light";
		param name="ATTRIBUTES.showfaces" type="boolean" default=true;
		param name="ATTRIBUTES.appid" type="string" default="";
		param name="ATTRIBUTES.kiddirectedsite" type="boolean" default=false;
		param name="ATTRIBUTES.referral" type="string" default="";
		param name="ATTRIBUTES.share" type="boolean" default=false;
		param name="ATTRIBUTES.style" type="string" default="";
		param name="ATTRIBUTES.url" type="string" default=getCurrentUrl();
		param name="ATTRIBUTES.extraoptions" type="string" default="";

		validate(ATTRIBUTES.format, 'format', 'html4,html5');
		validate(ATTRIBUTES.render, 'render', 'all,html,javascript');
		ATTRIBUTES.encodeOutput = (ATTRIBUTES.encodeOutput) ? "true" : "false";
		validateNumber(ATTRIBUTES.apiversion, 'apiversion');
		validate(ATTRIBUTES.layout, 'layout', 'standard,button_count,button,box_count');
		validate(ATTRIBUTES.verb, 'verb', 'like,recommend');
		validateNumber(ATTRIBUTES.width, 'width');
		validateNumber(ATTRIBUTES.height, 'height');
		validate(ATTRIBUTES.colorscheme, 'colorscheme', 'dark,light');
		ATTRIBUTES.showfaces = (ATTRIBUTES.showfaces) ? "true" : "false"; // force it to true string rep of boolean value
		ATTRIBUTES.kiddirectedsite = (ATTRIBUTES.kiddirectedsite) ? "true" : "false";
		if(len(ATTRIBUTES.referral) > 49) {throw(message = "Maximum length of referral is 49 characters.");}
		ATTRIBUTES.share = (ATTRIBUTES.share) ? "true" : "false";
	</cfscript>

	<cfswitch expression="#ATTRIBUTES.format#">
      <cfcase value="html4">
      <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForURL(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.appid = encodeForURL(canonicalize(ATTRIBUTES.appid, true, true, false));
			ATTRIBUTES.referral = encodeForURL(canonicalize(ATTRIBUTES.referral, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfoutput>
          <iframe src="//www.facebook.com/#ATTRIBUTES.apiversion#/plugins/like.php?href=#ATTRIBUTES.url#&amp;layout=#LCase(ATTRIBUTES.layout)#&amp;width=#ATTRIBUTES.width#&amp;show_faces=#ATTRIBUTES.showfaces#&amp;action=#LCase(ATTRIBUTES.verb)#&amp;colorscheme=#LCase(ATTRIBUTES.colorscheme)#&amp;height=#ATTRIBUTES.height#&amp;appId=#ATTRIBUTES.appid#&amp;kid_directed_site=#ATTRIBUTES.kiddirectedsite#&amp;ref=#ATTRIBUTES.referral#&amp;share=#ATTRIBUTES.share#" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:#ATTRIBUTES.width#px; height:#ATTRIBUTES.height#px;#ATTRIBUTES.style#" allowTransparency="true" #ATTRIBUTES.extraoptions#></iframe>
      </cfoutput>
      </cfcase>
      <cfcase value="html5">
      <cfscript>
		if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForHTMLAttribute(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.referral = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.referral, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfif listFindNoCase("all,html", ATTRIBUTES.render)>
		<cfoutput>
            <div class="fb-like" data-href="#ATTRIBUTES.url#" data-layout="#LCase(ATTRIBUTES.layout)#" data-width="#ATTRIBUTES.width#" data-show-faces="#ATTRIBUTES.showfaces#" data-action="#LCase(ATTRIBUTES.verb)#" data-colorscheme="#LCase(ATTRIBUTES.colorscheme)#" data-kid-directed-site="#ATTRIBUTES.kiddirectedsite#" data-ref="#ATTRIBUTES.referral#" data-share="#ATTRIBUTES.share#" style="#ATTRIBUTES.style#" #ATTRIBUTES.extraoptions#></div>
        </cfoutput>
      </cfif>
      <cfif listFindNoCase("all,javascript", ATTRIBUTES.render)>
          <cfset getJavaScript(type=ATTRIBUTES.type, apiversion=ATTRIBUTES.apiversion, appid=ATTRIBUTES.appid)>
      </cfif>
      </cfcase>
    </cfswitch>
<!-----------------------LIKE Button Ends---------------------->

<!-----------------------LIKE BOX Starts---------------------->
<cfelseif ATTRIBUTES.type eq "likebox">
	<cfscript>
		validateAttributes('type,format,render,encodeOutput,apiversion,height,width,colorscheme,showfaces,showstream,showheader,style,url,appid,showborder,forcewall', ATTRIBUTES.type);
		param name="ATTRIBUTES.format" type="string" default="html5";
		param name="ATTRIBUTES.render" type="string" default="all";
		param name="ATTRIBUTES.encodeOutput" type="boolean" default=true;
		param name="ATTRIBUTES.apiversion" type="numeric" default="1.0";//when v1.0 is no longer supported, Facebook will automatically use the oldest supported version
		param name="ATTRIBUTES.width" type="numeric" default="292";
		param name="ATTRIBUTES.height" type="numeric" default="590";
		param name="ATTRIBUTES.colorscheme" type="string" default="light";
		param name="ATTRIBUTES.showfaces" type="boolean" default=true;
		param name="ATTRIBUTES.showstream" type="boolean" default=true;
		param name="ATTRIBUTES.showheader" type="boolean" default=true;
		param name="ATTRIBUTES.appid" type="string" default="";
		param name="ATTRIBUTES.showborder" type="boolean" default=true;
		param name="ATTRIBUTES.forcewall" type="boolean" default=false;
		param name="ATTRIBUTES.style" type="string" default="";
		param name="ATTRIBUTES.url" type="string" default="https://www.facebook.com/FacebookDevelopers";//must be a Facebook Page URL
		param name="ATTRIBUTES.extraoptions" type="string" default="";

		validate(ATTRIBUTES.format, 'format', 'html4,html5');
		validate(ATTRIBUTES.render, 'render', 'all,html,javascript');
		ATTRIBUTES.encodeOutput = (ATTRIBUTES.encodeOutput) ? "true" : "false";
		validateNumber(ATTRIBUTES.apiversion, 'apiversion');
		validateNumber(ATTRIBUTES.width, 'width');
		validateNumber(ATTRIBUTES.height, 'height');
		validate(ATTRIBUTES.colorscheme, 'colorscheme', 'dark,light');
		ATTRIBUTES.showfaces = (ATTRIBUTES.showfaces) ? "true" : "false"; // force it to true string rep of boolean value
		ATTRIBUTES.showstream = (ATTRIBUTES.showstream) ? "true" : "false";
		ATTRIBUTES.showheader = (ATTRIBUTES.showheader) ? "true" : "false";
		ATTRIBUTES.showborder = (ATTRIBUTES.showborder) ? "true" : "false";
		ATTRIBUTES.forcewall = (ATTRIBUTES.forcewall) ? "true" : "false";
		if(!len(ATTRIBUTES.url)) {throw(message = "URL is a mandatory attribute");}
	</cfscript>

	<cfswitch expression="#ATTRIBUTES.format#">
      <cfcase value="html4">
	  <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForURL(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.appid = encodeForURL(canonicalize(ATTRIBUTES.appid, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfoutput>
          <iframe src="//www.facebook.com/#ATTRIBUTES.apiversion#/plugins/likebox.php?href=#ATTRIBUTES.url#&amp;width=#ATTRIBUTES.width#&amp;height=#ATTRIBUTES.height#&amp;colorscheme=#LCase(ATTRIBUTES.colorscheme)#&amp;show_faces=#ATTRIBUTES.showfaces#&amp;stream=#ATTRIBUTES.showstream#&amp;header=#ATTRIBUTES.showheader#&amp;appId=#ATTRIBUTES.appid#&amp;show_border=#ATTRIBUTES.showborder#&amp;force_wall=#ATTRIBUTES.forcewall#" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:#ATTRIBUTES.width#px; height:#ATTRIBUTES.height#px;#ATTRIBUTES.style#" allowTransparency="true" #ATTRIBUTES.extraoptions#></iframe>
      </cfoutput>
      </cfcase>
      <cfcase value="html5">
	  <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForHTMLAttribute(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfif listFindNoCase("all,html", ATTRIBUTES.render)>
		<cfoutput>
            <div class="fb-like-box" data-href="#ATTRIBUTES.url#" data-width="#ATTRIBUTES.width#" data-height="#ATTRIBUTES.height#" data-colorscheme="#LCase(ATTRIBUTES.colorscheme)#" data-show-faces="#ATTRIBUTES.showfaces#" data-stream="#ATTRIBUTES.showstream#" data-header="#ATTRIBUTES.showheader#" data-show-border="#ATTRIBUTES.showborder#" data-force-wall="#ATTRIBUTES.forcewall#" style="#ATTRIBUTES.style#" #ATTRIBUTES.extraoptions#></div>
        </cfoutput>
      </cfif>
	  <cfif listFindNoCase("all,javascript", ATTRIBUTES.render)>
          <cfset getJavaScript(type=ATTRIBUTES.type, apiversion=ATTRIBUTES.apiversion, appid=ATTRIBUTES.appid)>
      </cfif>
      </cfcase>
    </cfswitch>
<!-----------------------LIKE BOX Ends---------------------->

<!-----------------------COMMENT BOX Starts---------------------->
<cfelseif ATTRIBUTES.type eq 'commentbox'>
	<cfscript>
		validateAttributes('type,format,render,encodeOutput,apiversion,width,colorscheme,numberofposts,style,url,appid,orderby,mobile', ATTRIBUTES.type);
		param name="ATTRIBUTES.format" type="string" default="html5";
		param name="ATTRIBUTES.render" type="string" default="all";
		param name="ATTRIBUTES.encodeOutput" type="boolean" default=true;
		param name="ATTRIBUTES.apiversion" type="numeric" default="1.0";//when v1.0 is no longer supported, Facebook will automatically use the oldest supported version
		param name="ATTRIBUTES.width" type="string" default="292";
		param name="ATTRIBUTES.colorscheme" type="string" default="light";
		param name="ATTRIBUTES.numberofposts" type="numeric" default="2";
		param name="ATTRIBUTES.appid" type="string" default="";
		param name="ATTRIBUTES.orderby" type="string" default="social";
		param name="ATTRIBUTES.mobile" type="string" default="";//by default, this is auto-detected by Facebook
		param name="ATTRIBUTES.style" type="string" default="";
		param name="ATTRIBUTES.url" type="string" default=getCurrentUrl();
		param name="ATTRIBUTES.extraoptions" type="string" default="";

		validate(ATTRIBUTES.format, 'format', 'html5');
		validate(ATTRIBUTES.render, 'render', 'all,html,javascript');
		ATTRIBUTES.encodeOutput = (ATTRIBUTES.encodeOutput) ? "true" : "false";
		validateNumber(ATTRIBUTES.apiversion, 'apiversion');
		if(ATTRIBUTES.width != "100%") {validateNumber(ATTRIBUTES.width, 'width');}
		validateNumber(ATTRIBUTES.numberofposts, 'numberofposts');
		validate(ATTRIBUTES.colorscheme, 'colorscheme', 'dark,light');
		validate(ATTRIBUTES.orderby, 'orderby', 'social,reverse_time,time');
	</cfscript>

	<cfswitch expression="#ATTRIBUTES.format#">
      <cfcase value="html5">
	  <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForHTMLAttribute(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfif listFindNoCase("all,html", ATTRIBUTES.render)>
		<cfoutput>
            <div class="fb-comments" data-href="#ATTRIBUTES.url#" data-num-posts="#ATTRIBUTES.numberofposts#" data-width="#ATTRIBUTES.width#" data-colorscheme="#LCase(ATTRIBUTES.colorscheme)#" data-order-by="#LCase(ATTRIBUTES.orderby)#"<cfif isBoolean(ATTRIBUTES.mobile)> data-mobile="#(ATTRIBUTES.mobile)?"true":"false"#"</cfif> style="#ATTRIBUTES.style#" #ATTRIBUTES.extraoptions#></div>
        </cfoutput>
      </cfif>
	  <cfif listFindNoCase("all,javascript", ATTRIBUTES.render)>
          <cfset getJavaScript(type=ATTRIBUTES.type, apiversion=ATTRIBUTES.apiversion, appid=ATTRIBUTES.appid)>
      </cfif>
      </cfcase>
    </cfswitch>
<!-----------------------COMMENT BOX Ends---------------------->

<!-----------------------ACTIVITYFEED Starts---------------------->
<cfelseif ATTRIBUTES.type eq 'activityfeed'>
	<cfscript>
		validateAttributes('type,format,render,encodeOutput,apiversion,height,width,colorscheme,showheader,style,url,linktarget,recommendations,appid,action,filter,maxage,referral', ATTRIBUTES.type);
		param name="ATTRIBUTES.format" type="string" default="html5";
		param name="ATTRIBUTES.render" type="string" default="all";
		param name="ATTRIBUTES.encodeOutput" type="boolean" default=true;
		param name="ATTRIBUTES.apiversion" type="numeric" default="1.0";//when v1.0 is no longer supported, Facebook will automatically use the oldest supported version
		param name="ATTRIBUTES.width" type="numeric" default="300";
		param name="ATTRIBUTES.height" type="numeric" default="300";
		param name="ATTRIBUTES.colorscheme" type="string" default="light";
		param name="ATTRIBUTES.showheader" type="boolean" default=true;
		param name="ATTRIBUTES.appid" type="string" default="";
		param name="ATTRIBUTES.action" type="string" default="";
		param name="ATTRIBUTES.linktarget" type="string" default="_blank";
		param name="ATTRIBUTES.recommendations" type="boolean" default=false;
		param name="ATTRIBUTES.filter" type="string" default="";
		param name="ATTRIBUTES.maxage" type="numeric" default=0;
		param name="ATTRIBUTES.referral" type="string" default="";
		param name="ATTRIBUTES.style" type="string" default="";
		param name="ATTRIBUTES.url" type="string" default=getCurrentUrl();
		param name="ATTRIBUTES.extraoptions" type="string" default="";

		validate(ATTRIBUTES.format, 'format', 'html4,html5');
		validate(ATTRIBUTES.render, 'render', 'all,html,javascript');
		ATTRIBUTES.encodeOutput = (ATTRIBUTES.encodeOutput) ? "true" : "false";
		validateNumber(ATTRIBUTES.apiversion, 'apiversion');
		validateNumber(ATTRIBUTES.width, 'width');
		validateNumber(ATTRIBUTES.height, 'height');
		validate(ATTRIBUTES.colorscheme, 'colorscheme', 'dark,light');
		//validate(ATTRIBUTES.linktarget, 'linktarget', '_blank,_self,_top,_parent');// disabling since specifying any frame name is also allowed
		ATTRIBUTES.showheader = (ATTRIBUTES.showheader) ? "true" : "false"; // force it to true string rep of boolean value
		ATTRIBUTES.recommendations = (ATTRIBUTES.recommendations) ? "true" : "false";
		if((ATTRIBUTES.maxage < 0) or (ATTRIBUTES.maxage > 180)) {throw(message = "Maxage must be in the range of 0-180.");}
		if(ATTRIBUTES.maxage != 0) {validateNumber(ATTRIBUTES.maxage, 'maxage');}
		if(len(ATTRIBUTES.referral) > 49) {throw(message = "Maximum length of referral is 49 characters.");}
	</cfscript>

	<cfswitch expression="#ATTRIBUTES.format#">
      <cfcase value="html4">
	  <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForURL(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.appid = encodeForURL(canonicalize(ATTRIBUTES.appid, true, true, false));
			ATTRIBUTES.action = encodeForURL(canonicalize(ATTRIBUTES.action, true, true, false));
			ATTRIBUTES.linktarget = encodeForURL(canonicalize(ATTRIBUTES.linktarget, true, true, false));
			ATTRIBUTES.filter = encodeForURL(canonicalize(ATTRIBUTES.filter, true, true, false));
			ATTRIBUTES.referral = encodeForURL(canonicalize(ATTRIBUTES.referral, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfoutput>
          <iframe src="//www.facebook.com/#ATTRIBUTES.apiversion#/plugins/activity.php?site=#ATTRIBUTES.url#&amp;app_id=#ATTRIBUTES.appid#&amp;action=#ATTRIBUTES.action#&amp;width=#ATTRIBUTES.width#&amp;height=#ATTRIBUTES.height#&amp;header=#ATTRIBUTES.showheader#&amp;colorscheme=#LCase(ATTRIBUTES.colorscheme)#&amp;linktarget=#ATTRIBUTES.linktarget#&amp;recommendations=#ATTRIBUTES.recommendations#&amp;filter=#ATTRIBUTES.filter#&amp;max_age=#ATTRIBUTES.maxage#&amp;ref=#ATTRIBUTES.referral#" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:#ATTRIBUTES.width#px; height:#ATTRIBUTES.height#px;#ATTRIBUTES.style#" allowTransparency="true" #ATTRIBUTES.extraoptions#></iframe>
      </cfoutput>
      </cfcase>
      <cfcase value="html5">
	  <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForHTMLAttribute(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.action = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.action, true, true, false));
			ATTRIBUTES.linktarget = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.linktarget, true, true, false));
			ATTRIBUTES.filter = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.filter, true, true, false));
			ATTRIBUTES.referral = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.referral, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfif listFindNoCase("all,html", ATTRIBUTES.render)>
		<cfoutput>
            <div class="fb-activity" data-site="#ATTRIBUTES.url#" data-action="#ATTRIBUTES.action#" data-width="#ATTRIBUTES.width#" data-height="#ATTRIBUTES.height#" data-header="#ATTRIBUTES.showheader#" data-colorscheme="#LCase(ATTRIBUTES.colorscheme)#" data-linktarget="#ATTRIBUTES.linktarget#" data-recommendations="#ATTRIBUTES.recommendations#" data-filter="#ATTRIBUTES.filter#" data-max-age="#ATTRIBUTES.maxage#" data-ref="#ATTRIBUTES.referral#" style="#ATTRIBUTES.style#" #ATTRIBUTES.extraoptions#></div>
        </cfoutput>
      </cfif>
	  <cfif listFindNoCase("all,javascript", ATTRIBUTES.render)>
          <cfset getJavaScript(type=ATTRIBUTES.type, apiversion=ATTRIBUTES.apiversion, appid=ATTRIBUTES.appid)>
      </cfif>
      </cfcase>
    </cfswitch>
<!-------------------ACTIVITYFEED Ends----------------------->


<!-------------------SUBSCRIBE Button Starts----------------------->
<cfelseif ATTRIBUTES.type eq 'subscribe'>
	<cfscript>
		validateAttributes('type,format,render,encodeOutput,apiversion,layout,width,colorscheme,showfaces,style,url,appid,kiddirectedsite', ATTRIBUTES.type);
		param name="ATTRIBUTES.format" type="string" default="html5";
		param name="ATTRIBUTES.render" type="string" default="all";
		param name="ATTRIBUTES.encodeOutput" type="boolean" default=true;
		param name="ATTRIBUTES.apiversion" type="numeric" default="1.0";//when v1.0 is no longer supported, Facebook will automatically use the oldest supported version
		param name="ATTRIBUTES.layout" type="string" default="standard";
		param name="ATTRIBUTES.width" type="numeric" default="450";
		param name="ATTRIBUTES.colorscheme" type="string" default="light";
		param name="ATTRIBUTES.showfaces" type="boolean" default=true;
		param name="ATTRIBUTES.appid" type="string" default="";
		param name="ATTRIBUTES.kiddirectedsite" type="boolean" default=false;
		param name="ATTRIBUTES.style" type="string" default="";
		param name="ATTRIBUTES.url" type="string" default="";
		param name="ATTRIBUTES.extraoptions" type="string" default="";

		validate(ATTRIBUTES.format, 'format', 'html4,html5');
		validate(ATTRIBUTES.render, 'render', 'all,html,javascript');
		ATTRIBUTES.encodeOutput = (ATTRIBUTES.encodeOutput) ? "true" : "false";
		validateNumber(ATTRIBUTES.apiversion, 'apiversion');
		validate(ATTRIBUTES.layout, 'layout', 'standard,button_count,box_count,button');
		validateNumber(ATTRIBUTES.width, 'width');
		validate(ATTRIBUTES.colorscheme, 'colorscheme', 'dark,light');
		ATTRIBUTES.showfaces = (ATTRIBUTES.showfaces) ? "true" : "false"; // force it to true string rep of boolean value
		if (!Len(ATTRIBUTES.url))
			throw(message = "URL is a mandatory attribute");
		ATTRIBUTES.kiddirectedsite = (ATTRIBUTES.kiddirectedsite) ? "true" : "false"; // force it to true string rep of boolean value
	</cfscript>

	<cfswitch expression="#ATTRIBUTES.format#">
      <cfcase value="html4">
	  <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForURL(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfoutput>
          <iframe src="//www.facebook.com/#ATTRIBUTES.apiversion#/plugins/follow.php?href=#ATTRIBUTES.url#&amp;layout=#LCase(ATTRIBUTES.layout)#&amp;width=#ATTRIBUTES.width#&amp;show_faces=#ATTRIBUTES.showfaces#&amp;colorscheme=#LCase(ATTRIBUTES.colorscheme)#&amp;kid_directed_site=#ATTRIBUTES.kiddirectedsite#" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:#ATTRIBUTES.width#px;#ATTRIBUTES.style#" allowTransparency="true" #ATTRIBUTES.extraoptions#></iframe>
      </cfoutput>
      </cfcase>
      <cfcase value="html5">
	  <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForHTMLAttribute(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfif listFindNoCase("all,html", ATTRIBUTES.render)>
		<cfoutput>
            <div class="fb-follow" data-href="#ATTRIBUTES.url#" data-layout="#LCase(ATTRIBUTES.layout)#" data-width="#ATTRIBUTES.width#" data-show-faces="#ATTRIBUTES.showfaces#" data-colorscheme="#LCase(ATTRIBUTES.colorscheme)#" data-kid-directed-site="#ATTRIBUTES.kiddirectedsite#" style="#ATTRIBUTES.style#" #ATTRIBUTES.extraoptions#></div>
        </cfoutput>
      </cfif>
	  <cfif listFindNoCase("all,javascript", ATTRIBUTES.render)>
          <cfset getJavaScript(type=ATTRIBUTES.type, apiversion=ATTRIBUTES.apiversion, appid=ATTRIBUTES.appid)>
      </cfif>
      </cfcase>
    </cfswitch>
<!-----------------------SUBSCRIBE Button Ends---------------------->

<!-------------------FOLLOW Button Starts----------------------->
<cfelseif ATTRIBUTES.type eq 'follow'>
	<cfscript>
		validateAttributes('type,format,render,encodeOutput,username,showusername,buttonsize,language,showcount,style,width,height,align,dnt', ATTRIBUTES.type);
		param name="ATTRIBUTES.format" type="string" default="html5";
		param name="ATTRIBUTES.render" type="string" default="all";
		param name="ATTRIBUTES.encodeOutput" type="boolean" default=true;
		param name="ATTRIBUTES.username" type="string" default="twitter";
		param name="ATTRIBUTES.buttonsize" type="string" default="medium";
		param name="ATTRIBUTES.showusername" type="boolean" default=true;
		param name="ATTRIBUTES.language" type="string" default="en";
		param name="ATTRIBUTES.showcount" type="boolean" default=false;
		param name="ATTRIBUTES.width" type="numeric" default=100;
		param name="ATTRIBUTES.height" type="numeric" default=20;
		param name="ATTRIBUTES.align" type="string" default="left";
		param name="ATTRIBUTES.dnt" type="boolean" default=false;
		param name="ATTRIBUTES.style" type="string" default="";
		param name="ATTRIBUTES.extraoptions" type="string" default="";
		
		validate(ATTRIBUTES.format, 'format', 'html4,html5');
		validate(ATTRIBUTES.render, 'render', 'all,html,javascript');
		ATTRIBUTES.encodeOutput = (ATTRIBUTES.encodeOutput) ? "true" : "false";
		validate(ATTRIBUTES.buttonsize, 'buttonsize', 'medium,large');
		ATTRIBUTES.showusername = (ATTRIBUTES.showusername) ? "true" : "false"; // force it to true string rep of boolean value
		ATTRIBUTES.showcount = (ATTRIBUTES.showcount) ? "true" : "false";
		validateNumber(ATTRIBUTES.width, 'width');
		validateNumber(ATTRIBUTES.height, 'height');
		validate(ATTRIBUTES.align, 'align', 'left,right');
		ATTRIBUTES.dnt = (ATTRIBUTES.dnt) ? "true" : "false";
		validate(ATTRIBUTES.language, 'language', 'en,fr,de,it,es,ko,ja');
	</cfscript>

	<cfswitch expression="#ATTRIBUTES.format#">
      <cfcase value="html4">
      <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.username = encodeForURL(canonicalize(ATTRIBUTES.username, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
      <cfoutput>
      <iframe src="//platform.twitter.com/widgets/follow_button.html?screen_name=#ATTRIBUTES.username#&amp;show_count=#ATTRIBUTES.showcount#&amp;lang=#ATTRIBUTES.language#&amp;show_screen_name=#ATTRIBUTES.showusername#&amp;dnt=#ATTRIBUTES.dnt#" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:#ATTRIBUTES.width#px; height:#ATTRIBUTES.height#px;#ATTRIBUTES.style#" allowtransparency="true" #ATTRIBUTES.extraoptions#></iframe>
      </cfoutput>
      </cfcase>
      <cfcase value="html5">
	  <cfscript>
		usernameForURL = usernameForHTML = ATTRIBUTES.username;//username is output in two contexts
		if(ATTRIBUTES.encodeOutput) {
			usernameForURL = encodeForURL(canonicalize(ATTRIBUTES.username, true, true, false));
			usernameForHTML = encodeForHTML(canonicalize(ATTRIBUTES.username, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfif listFindNoCase("all,html", ATTRIBUTES.render)>
        <cfoutput>
            <a style="#ATTRIBUTES.style#" href="https://twitter.com/#usernameForURL#" class="twitter-follow-button" data-show-count="#ATTRIBUTES.showcount#" data-lang="#ATTRIBUTES.language#" data-size="#ATTRIBUTES.buttonsize#" data-show-screen-name="#ATTRIBUTES.showusername#" data-align="#ATTRIBUTES.align#"<cfif len(ATTRIBUTES.width)> data-width="#ATTRIBUTES.width#px"</cfif> data-dnt="#ATTRIBUTES.dnt#" #ATTRIBUTES.extraoptions#>Follow @#usernameForHTML#</a>
        </cfoutput>
      </cfif>
	  <cfif listFindNoCase("all,javascript", ATTRIBUTES.render)>
        <cfset getJavaScript(type=ATTRIBUTES.type)>
      </cfif>
      </cfcase>
    </cfswitch>
<!-----------------------FOLLOW Button Ends---------------------->

<!-------------------TWEET Button Starts----------------------->
<cfelseif ATTRIBUTES.type eq 'tweet'>
	<cfscript>
		validateAttributes('type,format,render,encodeOutput,url,tweettext,via,count,recommend,language,hashtag,buttonsize,style,tweettype,username,dnt,countURL', ATTRIBUTES.type);
		param name="ATTRIBUTES.format" type="string" default="html5";
		param name="ATTRIBUTES.render" type="string" default="all";
		param name="ATTRIBUTES.encodeOutput" type="boolean" default=true;
		param name="ATTRIBUTES.buttonsize" type="string" default="medium";
		param name="ATTRIBUTES.recommend" type="string" default="";
		param name="ATTRIBUTES.hashtag" type="string" default="";
		param name="ATTRIBUTES.count" type="string" default="horizontal";
		param name="ATTRIBUTES.via" type="string" default="";
		param name="ATTRIBUTES.tweettext" type="string" default="";
		param name="ATTRIBUTES.language" type="string" default="en";
		param name="ATTRIBUTES.showcount" type="boolean" default=false;
		param name="ATTRIBUTES.tweettype" type="string" default="share";//html5-only
		param name="ATTRIBUTES.username" type="string" default="twitter";//html5-only
		param name="ATTRIBUTES.dnt" type="boolean" default=false;
		param name="ATTRIBUTES.countURL" type="string" default="";
		param name="ATTRIBUTES.style" type="string" default="";
		param name="ATTRIBUTES.url" type="string" default=getCurrentUrl();
		param name="ATTRIBUTES.extraoptions" type="string" default="";
		
		validate(ATTRIBUTES.format, 'format', 'html4,html5');
		validate(ATTRIBUTES.render, 'render', 'all,html,javascript');
		ATTRIBUTES.encodeOutput = (ATTRIBUTES.encodeOutput) ? "true" : "false";
		validate(ATTRIBUTES.buttonsize, 'buttonsize', 'medium,large');
		validate(ATTRIBUTES.count, 'count', 'none,horizontal,vertical');
		ATTRIBUTES.showcount = (ATTRIBUTES.showcount) ? "true" : "false"; // force it to true string rep of boolean value
		validate(ATTRIBUTES.tweettype, 'tweettype', 'share,mention,hashtag');
		ATTRIBUTES.dnt = (ATTRIBUTES.dnt) ? "true" : "false";
		validate(ATTRIBUTES.language, 'language', 'en,fr,de,it,es,ko,ja');
	</cfscript>

	<cfswitch expression="#ATTRIBUTES.format#">
      <cfcase value="html4">
      <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForURL(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.via = encodeForURL(canonicalize(ATTRIBUTES.via, true, true, false));
			ATTRIBUTES.tweettext = encodeForURL(canonicalize(ATTRIBUTES.tweettext, true, true, false));
			ATTRIBUTES.recommend = encodeForURL(canonicalize(ATTRIBUTES.recommend, true, true, false));
			ATTRIBUTES.countURL = encodeForURL(udfCanonicalizeURL(ATTRIBUTES.countURL, true, true, false));
			ATTRIBUTES.hashtag = encodeForURL(canonicalize(ATTRIBUTES.hashtag, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfoutput>
      <iframe src="//platform.twitter.com/widgets/tweet_button.html?url=#ATTRIBUTES.url#&amp;via=#ATTRIBUTES.via#&amp;text=#ATTRIBUTES.tweettext#&amp;related=#ATTRIBUTES.recommend#&amp;count=#LCase(ATTRIBUTES.count)#&amp;lang=#ATTRIBUTES.language#&amp;counturl=#ATTRIBUTES.countURL#&amp;hashtags=#ATTRIBUTES.hashtag#&amp;size=#ATTRIBUTES.buttonsize#&amp;dnt=#ATTRIBUTES.dnt#" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:#ATTRIBUTES.width#px; height:#ATTRIBUTES.height#px;#ATTRIBUTES.style#" allowtransparency="true" #ATTRIBUTES.extraoptions#></iframe>
	  </cfoutput>
      </cfcase>
      <cfcase value="html5">
	  <cfscript>
        hashtagForURL = hashtagForAttribute = ATTRIBUTES.hashtag;//hashtag is output in two contexts
		if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.username = encodeForURL(canonicalize(ATTRIBUTES.username, true, true, false));
			hashtagForURL = encodeForURL(canonicalize(ATTRIBUTES.hashtag, true, true, false));
			ATTRIBUTES.url = encodeForHTMLAttribute(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.tweettext = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.tweettext, true, true, false));
			ATTRIBUTES.via = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.via, true, true, false));
			ATTRIBUTES.recommend = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.recommend, true, true, false));
			hashtagForAttribute = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.hashtag, true, true, false));
			ATTRIBUTES.countURL = encodeForHTMLAttribute(udfCanonicalizeURL(ATTRIBUTES.countURL, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfif listFindNoCase("all,html", ATTRIBUTES.render)>
        <cfoutput>
            <a style="#ATTRIBUTES.style#" href="https://twitter.com/share<cfif (ATTRIBUTES.tweettype is 'mention') and len(ATTRIBUTES.username)>?screen_name=#ATTRIBUTES.username#<cfelseif (ATTRIBUTES.tweettype is 'hashtag') and len(ATTRIBUTES.hashtag)>?button_hashtag=#listFirst(hashtagForURL)#</cfif>" class="twitter-#ATTRIBUTES.tweettype#-button" data-count="#LCase(ATTRIBUTES.count)#" data-url="#ATTRIBUTES.url#" data-text="#ATTRIBUTES.tweettext#" data-via="#ATTRIBUTES.via#" data-size="#ATTRIBUTES.buttonsize#" data-related="#ATTRIBUTES.recommend#" data-hashtags="#hashtagForAttribute#" data-dnt="#ATTRIBUTES.dnt#" data-lang="#ATTRIBUTES.language#" data-counturl="#ATTRIBUTES.countURL#" #ATTRIBUTES.extraoptions#>Tweet</a>
        </cfoutput>
      </cfif>
	  <cfif listFindNoCase("all,javascript", ATTRIBUTES.render)>
        <cfset getJavaScript(type=ATTRIBUTES.type)>
      </cfif>
      </cfcase>
    </cfswitch>
<!-----------------------TWEET Button Ends---------------------->

<!-------------------PLUSONE Button Starts----------------------->
<cfelseif ATTRIBUTES.type eq 'plusone'>
	<cfscript>
		validateAttributes('type,format,render,encodeOutput,buttonsize,language,annotation,width,url,style,align', ATTRIBUTES.type);
		param name="ATTRIBUTES.format" type="string" default="html5";
		param name="ATTRIBUTES.render" type="string" default="all";
		param name="ATTRIBUTES.encodeOutput" type="boolean" default=true;
		param name="ATTRIBUTES.annotation" type="string" default="bubble";
		param name="ATTRIBUTES.width" type="numeric" default="450";
		param name="ATTRIBUTES.buttonsize" type="string" default="medium";//Google's default is 'standard', but 'medium' matches the default height of Facebook and Twitter's buttons
		param name="ATTRIBUTES.language" type="string" default="en-US";
		param name="ATTRIBUTES.align" type="string" default="left";
		param name="ATTRIBUTES.style" type="string" default="";
		param name="ATTRIBUTES.url" type="string" default=getCurrentUrl();
		param name="ATTRIBUTES.extraoptions" type="string" default="";
		
		validate(ATTRIBUTES.format, 'format', 'html5');
		validate(ATTRIBUTES.render, 'render', 'all,html,javascript');
		ATTRIBUTES.encodeOutput = (ATTRIBUTES.encodeOutput) ? "true" : "false";
		validateNumber(ATTRIBUTES.width, 'width');
		if (ATTRIBUTES.width < 121)
			throw(message = "Minimum value of width is 120.");
		validate(ATTRIBUTES.annotation, 'annotation', 'inline,bubble,none');
		validate(ATTRIBUTES.buttonsize, 'buttonsize', 'small,medium,standard,tall');
		validate(ATTRIBUTES.align, 'align', 'left,right');
		validate(ATTRIBUTES.language, 'language', 'af,am,ar,eu,bn,bg,ca,zh-HK,zh-CN,zh-TW,hr,cs,da,nl,en-GB,en-US,et,fil,fi,fr,fr-CA,gl,de,el,gu,iw,hi,hu,is,id,it,ja,kn,ko,lv,lt,ms,ml,mr,no,fa,pl,pt-BR,pt-PT,ro,ru,sr,sk,sl,es,es-419,sw,sv,ta,te,th,tr,uk,ur,vi,zu');
	</cfscript>

	<cfswitch expression="#ATTRIBUTES.format#">
      <cfcase value="html5">
	  <cfscript>
        if(ATTRIBUTES.encodeOutput) {
			ATTRIBUTES.url = encodeForHTMLAttribute(udfCanonicalizeURL(ATTRIBUTES.url, true, true, false));
			ATTRIBUTES.style = encodeForHTMLAttribute(canonicalize(ATTRIBUTES.style, true, true, false));
		}
      </cfscript>
	  <cfif listFindNoCase("all,html", ATTRIBUTES.render)>
        <cfoutput>
            <div class="g-plusone" style="#ATTRIBUTES.style#" data-size="#ATTRIBUTES.buttonsize#" data-annotation="#ATTRIBUTES.annotation#" data-width="#ATTRIBUTES.width#" data-href="#ATTRIBUTES.url#" data-align="#ATTRIBUTES.align#" #ATTRIBUTES.extraoptions#></div>
        </cfoutput>
      </cfif>
	  <cfif listFindNoCase("all,javascript", ATTRIBUTES.render)>
        <cfset getJavaScript(type=ATTRIBUTES.type, language=ATTRIBUTES.language)>
      </cfif>
      </cfcase>
    </cfswitch>
<!-----------------------PLUSONE Button Ends---------------------->
</cfif>

<cfsetting enablecfoutputonly="false">