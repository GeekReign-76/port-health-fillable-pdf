

	


if(typeof adobe == 'undefined')
{
	/** @namespace */
	adobe = {};
}

if(typeof adobe.dom == 'undefined')
{
	/** @namespace */
	adobe.dom = {};
}

// extract out the parameters
adobe.dom.parseSrc = function(param,item)
{
	param = param.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");
	var parsed = (new RegExp("[\\?&]"+param+"=([^&#]*)")).exec(item);
	return (parsed === null) ? "" : parsed[1];
};

adobe.dom.GNav = function()
{
	var scriptSrc = document.querySelector('script[src*="/ubi/globalnav/_all/gnav.js"]').getAttribute('src'),
	gnav = {
		ImsHost: window.location.hostname,
		ImsJS: '',
		ImsClientId: (typeof adobeGnavClientOverride != 'undefined' && adobeGnavClientOverride != '') ? adobeGnavClientOverride : 'adobedotcom2',
		ImsTestClientId: (typeof adobeGnavClientOverride != 'undefined' && adobeGnavClientOverride != '') ? adobeGnavClientOverride : 'adobedotcom2',
		Version: 'v1.1.4-stage',
		CDN: 'https://wwwimages2.stage.adobe.com',
		Locale: adobe.dom.parseSrc('locale',scriptSrc),
		Typekit: '//fonts.adobe.com/whd3raw.js',
		JSFile: '/assets/globalnav/v1.1.4-stage/js/globalnav.js',
		InjectCSS: (typeof adobeGnavInjectCSS != 'undefined') ? adobeGnavInjectCSS : false
	};

	if(gnav.ImsHost.indexOf('stage') > -1 || gnav.ImsHost.indexOf('.wa.') > -1 || gnav.ImsHost.indexOf('helpx') > -1 || gnav.ImsHost.indexOf('localhost.adobe') > -1 || gnav.ImsHost.indexOf('aceui.') > -1 || gnav.ImsHost.indexOf('con-a.') > -1)
	{
		if(gnav.ImsHost.indexOf('stage2') > -1)
		{
			gnav.ImsJS = '-stg1';
		}
		else
		{
			gnav.ImsJS = '-stg1';
		}
	}
	else if(gnav.ImsHost.indexOf('qa') > -1 && gnav.ImsHost.indexOf('helpx.qa') == -1)
	{
		if(gnav.ImsHost.indexOf('qa05') > -1)
		{
			gnav.ImsJS = '-stg1';
		}
		else if(gnav.ImsHost.indexOf('qa04') > -1)
		{
			gnav.ImsJS = '-stg1';
		}
		else
		{
			gnav.ImsJS = '-stg1';
		}

		gnav.ImsClientId = gnav.ImsTestClientId;
	}
	else if(gnav.ImsHost.indexOf('dev04') > -1)
	{
		gnav.ImsJS = '-stg1';
		gnav.ImsClientId = gnav.ImsTestClientId;
	}
	else if(gnav.ImsHost.indexOf('dev') > -1)
	{
		gnav.ImsJS = '-stg1';
		gnav.ImsClientId = gnav.ImsTestClientId;
	}
	else if(gnav.ImsHost.indexOf('localhost') > -1 || gnav.ImsHost.indexOf('day.adobe.com') > -1 || gnav.ImsHost.indexOf('macromedia.com') > -1 || gnav.ImsHost.indexOf('127.0.0.1') > -1 && gnav.ImsHost.indexOf('localhost.adobe') == -1)
	{
		gnav.ImsJS = '-stg1';
		gnav.ImsClientId = gnav.ImsTestClientId;
		gnav.CDN = 'https://wwwimages2.dev04.adobe.com';
		gnav.Typekit = '//use.typekit.com/whd3raw.js';
		gnav.InjectCSS = true;
	}

	if(typeof Typekit == 'undefined')
	{
		if(typeof jQuery != 'undefined')
		{
			jQuery(function()
			{
				// Wait for DOM ready, then check again.
				if(typeof Typekit == 'undefined')
				{
					if(typeof adobeGNavTypekit == 'undefined')
					{
						adobe.dom.injectFile(gnav.Typekit,'js',adobe.dom.Typekit);
					}
				}
			});
		}
		else
		{
			if(typeof adobeGNavTypekit == 'undefined')
			{
				adobe.dom.injectFile(gnav.Typekit,'js',adobe.dom.Typekit);
			}
		}
	}

	adobe.dom.gnavAlign();

	window.onresize = function()
	{
		adobe.dom.gnavAlign();
	};

	return gnav;
};

adobe.dom.gnavAlign = function()
{
	var bodyTarget = '';
	if(document.querySelector("#body_container") != null)
	{
		bodyTarget = "#body_container";
	}
	else if(document.querySelector("#layoutLogic") != null)
	{
		bodyTarget = "#layoutLogic";
	}
	else if(document.querySelector(".LayoutGrid") != null)
	{
		bodyTarget = ".LayoutGrid";
	}

	if(bodyTarget != '')
	{
		var bodyWidth = document.querySelector(bodyTarget).offsetWidth;
		document.querySelector('.site-header-global-nav').style.width = bodyWidth+"px";
	}
};

adobe.dom.injectFile = function(url, type, callback)
{
	if(url !== null && type !== null)
	{
		var newFile = '';
		if(type == 'js')
		{
			newFile = document.createElement("script");
			newFile.setAttribute("src", url);
		}

		if(type == 'css')
		{
			newFile = document.createElement("link");
			newFile.setAttribute("rel", "stylesheet");
			newFile.setAttribute("type", "text/css");
			newFile.setAttribute("href", url);
		}

		if(newFile != null && newFile != '')
		{
			document.getElementsByTagName("head")[0].appendChild(newFile);
		}

		if(typeof callback != 'undefined' && typeof callback == 'function')
		{
			newFile.onload = function()
			{
				callback();
			}
		}
	}
};

adobe.dom.signOut = function()
{
	try
	{
		if(typeof jQuery != 'undefined' && typeof jQuery.cookies != 'undefined' && typeof jQuery.cookies.del != 'undefined')
		{
			jQuery.cookies.del('AUID', {domain: 'adobe.com'});
			jQuery.cookies.del('SCREENNAME', {domain: 'adobe.com'});
			jQuery.cookies.del('WCDServer', {domain: 'adobe.com'});
			setTimeout('jQuery(document).trigger("user_signedout")', 1000);
		}
		else if(typeof Prototype != 'undefined' && typeof Prototype.Version != 'undefined')
		{
			adobe.Cookie.set('AUID', '', -1, '/', '.adobe.com');
			adobe.Cookie.set('SCREENNAME', '', -1, '/', '.adobe.com');
			adobe.Cookie.set('WCDServer', '', -1, '/', '.adobe.com');
		}

	}
	catch(e){}
	if(typeof jQuery != 'undefined')
	{
		jQuery('body').trigger("adobeGNav:SignOut");
	}
};

adobe.dom.signIn = function()
{
	if(typeof jQuery != 'undefined')
	{
		jQuery('body').trigger("adobeIMS_SignIn");
	}
};

adobe.dom.profile = function(profile)
{
	if(typeof jQuery != 'undefined' && typeof Adobe != 'undefined')
	{
		try
		{
			if(typeof Adobe.Sso.SsoController.setUserName != 'undefined')
			{
				Adobe.Sso.SsoController.setUserName(profile.displayName);
			}

			jQuery.createNs("Adobe.User.Profile");
			Adobe.User.Profile = {
				Data: profile
			};

			if(typeof jQuery.cookie == 'function' && (window.location.href.indexOf('cart.html') > -1) || window.location.href.indexOf('cart.edu.html') > -1)
			{
				jQuery.cookie("uasi", true, {path:"/", domain:".adobe.com"});
			}
		}
		catch(e){}
	}
};

adobe.dom.Typekit = function()
{
	try{Typekit.load();}catch(e){}
};
