/*
IMS Authentication for Creative Cloud Tutorials and Creative Cloud Team pages
*/

CHL_IMS = {
    current_user_token: 'none',
    page_language: '',
    imsURL: (document.location.hostname.indexOf("helpx.adobe.com") == 0) ? 'https://adobeid-na1.services.adobe.com' : 'https://adobeid-na1-stg1.services.adobe.com',
    signInLoc: 'https://www.adobe.com/account/sign-in.adobedotcom.html?returnURL=',
    ccRedirectLoc: 'https://helpx.adobe.com/creative-cloud/topics/getting-started.html',
    teamPage: 'creative-cloud/team/creative-cloud-teams.html',
    redirectPage: 'creative-cloud/topics/getting-started.html', 
    clientId: 'CHLCC1',

    authenticate_user: function(memberType, pageType) {     
        // Check whether user has signed in
        var wcdCookie = CHL_IMS.get_cookie('WCDServer') || 'none';
        var chlUCookie = CHL_IMS.get_cookie('chl_u_t') || 'none';
        var chlLCookie = CHL_IMS.get_cookie('chl_u_l') || 'none';
        var chlTCookie = CHL_IMS.get_cookie('chl_u_tm') || 'none';
        
        if (wcdCookie != 'none' && wcdCookie == chlUCookie &&  (chlLCookie == 'lvl2' || chlLCookie == 'lvl1' || chlLCookie == 'none')) { // same user
        	if (chlTCookie == 'none') {
        		CHL_IMS.check_user_profile(memberType, pageType);
        	} else if (chlTCookie == 'yes' && pageType == 'ccTeam') {
                $("#maincontent").attr("style","visibility:visible");
            } else if (chlTCookie == 'no' && pageType == 'ccTeam') {
                //window.location = CHL_IMS.ccRedirectLoc;
                CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
            } else if (chlTCookie == 'no' && pageType == 'ccTeamRedirect') {
                $("#maincontent").attr("style","visibility:visible");
            } else if (chlLCookie == 'lvl1') {
                //window.location = CHL_IMS.ccRedirectLoc;
                CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
            } else if (chlLCookie == 'none') {
                CHL_IMS.check_user_profile(memberType, pageType);
            } else {
                $(".page_training").attr("style","visibility:visible");
            }
        } else if (wcdCookie != 'none') { //cookie exists
            if (chlUCookie == 'none' || chlUCookie != wcdCookie) { // first visit or different user             
                CHL_IMS.current_user_token = wcdCookie;
                CHL_IMS.set_cookie('chl_u_t', wcdCookie);
                CHL_IMS.check_user_profile(memberType, pageType);
            }
        } else if (wcdCookie == 'none') { //cookies doesn't exist
            CHL_IMS.check_user_profile(memberType, pageType);
            var newtoken = CHL_IMS.get_cookie('WCDServer') || 'none';
            CHL_IMS.set_cookie('chl_u_t', newtoken);
            CHL_IMS.current_user_token = newtoken;
        }
    },
    
    set_configs: function(pageType) {
        var ssName = document.location.pathname;
        if (ssName.charAt('3') == '/') {
            CHL_IMS.page_language = ssName.substring(1, 3) + '/';
        } else if (ssName.charAt('4') == '/') {
            CHL_IMS.page_language = ssName.substring(1, 4) + '/';
        }   
        
        var prdSvr = "http://helpx.adobe.com/";
        if (pageType == "ccTeamRedirect") {
        	CHL_IMS.ccRedirectLoc = prdSvr + CHL_IMS.page_language + CHL_IMS.teamPage;
        } else {
        	CHL_IMS.ccRedirectLoc = prdSvr + CHL_IMS.page_language + CHL_IMS.redirectPage;
        }
        
		// ** settings for production ** //
		CHL_IMS.signInLoc = "https://www.adobe.com/"+CHL_IMS.page_language+"account/sign-in.adobedotcom.html?returnURL=";
        // ** //
        // ** settings for non-production environments ** //
        if (document.URL.indexOf(".stage.") > 0 || document.URL.indexOf(".qa.") > 0) {
            CHL_IMS.imsURL = "https://adobeid-na1-stg1.services.adobe.com";
            CHL_IMS.signInLoc = "https://www.stage.adobe.com/"+CHL_IMS.page_language+"account/sign-in.adobedotcom.html?returnURL=";
            var qaSvr = "http://helpx.qa.adobe.com/";
            var stgSvr = "http://helpx.stage.adobe.com/";
            
            if (pageType == 'ccTeamRedirect') {
                CHL_IMS.ccRedirectLoc = stgSvr + CHL_IMS.page_language + CHL_IMS.teamPage;
            } else {
                CHL_IMS.ccRedirectLoc = stgSvr + CHL_IMS.page_language + CHL_IMS.redirectPage;
            }
            if (document.URL.indexOf(".qa.") > 0) {
                if (pageType == 'ccTeamRedirect') {
                    CHL_IMS.ccRedirectLoc = qaSvr + CHL_IMS.page_language + CHL_IMS.teamPage;
                } else {
                    CHL_IMS.ccRedirectLoc = qaSvr + CHL_IMS.page_language + CHL_IMS.redirectPage;
                }
            }
        }
        // ** //
        
    },
    
    check_user_profile: function (memberType, pageType) {
        CHL_IMS.set_configs(pageType);
        $.support.cors = true;
        var pagePath = document.URL;
        
        var wcdCookie = CHL_IMS.get_cookie('WCDServer') || 'none';
        if (wcdCookie == 'none' && pageType == 'ccTeamRedirect') {
        	$("#maincontent").attr("style","visibility:visible");
        } else {
			var request = $.ajax({
			  url: CHL_IMS.imsURL+"/ims/check/v1/token?client_id="+CHL_IMS.clientId+"&scope=openid%2Ccreative_cloud%2Cread_organizations",
			  type: "GET",
			  dataType: "jsonp"
			});
			request.done(function(msg) {
				try {
					var ret = msg.name;
					var teamMember = memberType;
					if (typeof ret == "undefined" ) { 
						//window.location = CHL_IMS.signInLoc+pagePath;
                        CHL_IMS.signinWithAdobeId(pagePath);
					} else {
						var userlvl = (msg.serviceAccounts && msg.serviceAccounts[0]) ? msg.serviceAccounts[0].serviceLevel : null;
						if (userlvl != null) {
							if ((teamMember.indexOf("free") != -1) && userlvl == "CS_LVL_1") {
								CHL_IMS.set_cookie('chl_u_l', 'lvl1');
								//window.location = CHL_IMS.ccRedirectLoc;
								CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
							} else if ((teamMember.indexOf("paid") != -1) && userlvl == "CS_LVL_1") {
								CHL_IMS.set_cookie('chl_u_l', 'lvl1');
								//window.location = CHL_IMS.ccRedirectLoc;
								CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
							} else if ((teamMember.indexOf("paid") != -1) && userlvl == "CS_LVL_2") {
								CHL_IMS.set_cookie('chl_u_l', 'lvl2');
								$(".page_training").attr("style","visibility:visible");
							} else if (teamMember.indexOf("team") != -1) {
								var token = msg.access_token;
								$.ajax({
									url: CHL_IMS.imsURL+"/ims/organizations/v1?bearer_token="+token+"&client_id="+CHL_IMS.clientId,
									type: "GET",
									dataType: "jsonp",
									success: function(msg) {
										var orgs = msg.orgs || [];
										if(orgs.length == 0) {
											CHL_IMS.set_cookie('chl_u_tm', 'no');
											if (teamMember.indexOf("team_redirect") > -1) {
												$("#maincontent").attr("style","visibility:visible");
											} else if (teamMember.indexOf("team_member") > -1) {
												//window.location = CHL_IMS.ccRedirectLoc;
												CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
											}	
										} else {
											CHL_IMS.set_cookie('chl_u_tm', 'yes');
											if (teamMember.indexOf("team_redirect") > -1) {
												//window.location = CHL_IMS.ccRedirectLoc;
												CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
											} else if (teamMember.indexOf("team_member") > -1) {
												$("#maincontent").attr("style","visibility:visible");
											}
										}
									},
									error: function(xhr, status, error) {
										alert("An error occurred while loading the page. Please try again later.");
										//window.location = CHL_IMS.ccRedirectLoc;
										CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
									}
								});
							}
						} else {
							//window.location = CHL_IMS.ccRedirectLoc;
							CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
						}
					}
				} catch (e) {
					//window.location = CHL_IMS.signInLoc+pagePath;
					CHL_IMS.signinWithAdobeId(pagePath);
				}
			});
			request.fail(function(jqXHR, textStatus) {
				alert("An error occurred while loading the page. Please try again later.");
				//window.location = CHL_IMS.ccRedirectLoc;
				CHL_IMS.signinWithAdobeId(CHL_IMS.ccRedirectLoc);
			});
		}
    },
    
    set_cookie: function(name, value, hours) {
        var expires = "";
        
        if (hours) {
          var date = new Date();
          date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
          expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    
    get_cookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');  
        var i = 0;
        
        for (i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') { c = c.substring(1, c.length); }
          if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
        }
        
        return null;
    },
    
    signinWithAdobeId: function(url) {
        if (typeof(adobeid) != "undefined" && typeof(adobeGlobalNav) != "undefined") {
			adobeid.redirect_uri = url;
			adobeGlobalNav._ims.signIn();
		}
    }
    
    
};
