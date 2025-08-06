var adobeid = {
		uses_redirect_mode: true,
		client_id: adobeGnavProps.ImsClientId,
		target_env: (typeof adobeGnavLandscape != 'undefined') ? adobeGnavLandscape : '',
		scope: (typeof adobeGnavScope != 'undefined') ? adobeGnavScope : 'creative_cloud,AdobeID,openid,gnav,read_organizations,additional_info.projectedProductContext',
		is_mandatory_sign_in: (typeof adobeGnavSignIn != 'undefined') ? adobeGnavSignIn : false,
		api_parameters: (typeof adobeGnavApiParams != 'undefined') ? adobeGnavApiParams : null,
		onProfile: function(profile)
		{
			try
			{
				window.profile = profile;
				if(profile)
				{
					adobe.dom.signIn();
					adobe.dom.profile(profile);
				}
				else
				{
					adobe.dom.signOut();
				}
			}
			catch(e){}
		},
		onError: function(error)
		{
			return false;
		},
		signIn: function(done)
		{
			adobe.dom.signIn();
			done();
		},
		signOut: function(done)
		{
			adobe.dom.signOut();
			done();
		},
		onReady: function()
		{
			if(typeof jQuery != 'undefined')
			{
				jQuery('body').trigger("adobeGNav:Ready");
			}
		}
	};

	if(typeof adobeGnavRedirectUrl != 'undefined')
	{
		adobeid.redirect_uri = adobeGnavRedirectUrl;
	}

	var adobeGlobalNav = new window.AdobeGlobalNav({
		adobeid: adobeid,
		progressiveEnhancement: (typeof adobeGnavPE != 'undefined') ? adobeGnavPE : true,
		defaultSitemapSection: (typeof adobeGnavSitemap != 'undefined') ? adobeGnavSitemap : 'explore-products',
		locale: adobeGnavProps.Locale,
		parentSelector: '.site-header-global-menu',
		sections: (typeof adobeGnavSections != 'undefined') ? adobeGnavSections : ['sitemap', 'search', 'profile', 'logo'],
		styles:
		{
			buttonTextColor: (typeof adobeGnavColor != 'undefined') ? adobeGnavColor : 'rgb(75%, 75%, 75%)',
			buttonTextHoverColor: (typeof adobeGnavHoverColor != 'undefined') ? adobeGnavHoverColor : 'white',
			overlayZIndex: (typeof adobeGnavZIndex != 'undefined') ? adobeGnavZIndex : 2147483647
		},
		events:
		{
			signIn: function(done)
			{
				adobe.dom.signIn();
				done();
			},
			signOut: function(done)
			{
				adobe.dom.signOut();
				done();
			},
			avatar: function(avatarPath)
			{
				adobe.dom.GNav.avatar = avatarPath;
				if(typeof jQuery != 'undefined')
				{
					jQuery('body').trigger("adobeGNav:avatar");
				}
			},
			closedSection: function()
			{
				if(typeof adobeGnavClosedSection != 'undefined' && typeof adobeGnavClosedSection == 'function')
				{
					adobeGnavClosedSection();
				}
			},
			openedSection: function(sectionId)
			{
				if(typeof adobeGnavOpenedSection != 'undefined' && typeof adobeGnavOpenedSection == 'function')
				{
					adobeGnavOpenedSection();
				}
			}
		}
	});
var gnavImsPrefix = 'https://adobeid-na1'+adobeGnavProps.ImsJS+'.services.adobe.com',
	gnavImsFile = gnavImsPrefix+'/ims/imslib.js?client_id='+adobeGnavProps.ImsClientId+'&locale='+adobeGnavProps.Locale;
document.writeln('\x3Cscript src="'+gnavImsFile+'">\x3C/script>');
