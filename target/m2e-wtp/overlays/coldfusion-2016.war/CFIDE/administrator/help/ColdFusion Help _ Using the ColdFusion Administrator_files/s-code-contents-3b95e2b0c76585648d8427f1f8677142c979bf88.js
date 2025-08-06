//mxchl - Community Help and Learning

/************************** Global Config *************************************/
var namespace = 'adobecorp';
var sObjectName = 's_mxchl';
// so that the variable s_mxchl is set globally on IE8 and below
var s_mxchl;
/************************** Global Config End *********************************/

/************************** VisitorAPI.js Config ******************************/
//var visitor = new Visitor(namespace); // not yet...
//visitor.trackingServer = 'stats.adobe.com'; // not yet...
//visitor.trackingServerSecure = 'sstats.adobe.com'; // not yet...
/************************** VisitorAPI.js Config End **************************/

/************************** AppMeasurement.js Config **************************/
window[sObjectName] = new AppMeasurement();
var s_chl = window[sObjectName]; // for backwards compatibility

function getAnalyticsAccount() {
    for (var toolid in _satellite.tools) {
        if (_satellite.tools[toolid].settings.engine == 'sc' &&
            _satellite.tools[toolid].settings.renameS == sObjectName) {
            return _satellite.tools[toolid].settings.account;
        }
    }
}

window[sObjectName].account = getAnalyticsAccount();

//--------------------- Visitor Config -----------------------------------------
//window[sObjectName].visitorNamespace = namespace; //technically not needed
//window[sObjectName].visitor = Visitor.getInstance(namespace); // not yet...
//window[sObjectName].visitorID = ''; // not yet...

//--------------------- Other Config -------------------------------------------
window[sObjectName].charSet = 'UTF-8';
window[sObjectName].trackingServer = 'stats.adobe.com';
window[sObjectName].trackingServerSecure = 'sstats.adobe.com';
window[sObjectName].cookieDomainPeriods = _satellite._getDomainPeriods();
window[sObjectName].fpCookieDomainPeriods = _satellite._getDomainPeriods();
//window[sObjectName].cookieLifetime = ''; //set in UI
//window[sObjectName].currencyCode = ''; //set in UI
//window[sObjectName].debugTracking = false; // not going to set yet...
//window[sObjectName].dynamicVariablePrefix = 'D='; //set in UI
//window[sObjectName].mobile = ''; //not going to set here...not applicable

//--------------------- Link Tracking Config -----------------------------------
//window[sObjectName].maxDelay = 1000; // not going to set yet...
window[sObjectName].trackInlineStats = true; // ClickMap
window[sObjectName].trackDownloadLinks = true;
window[sObjectName].trackExternalLinks = true;
window[sObjectName].linkLeaveQueryString = false;
window[sObjectName].linkTrackEvents = "None";
window[sObjectName].linkTrackVars = [
    'campaign',
    'channel',
    'events',
    'eVar1',
    'eVar2',
    'eVar3',
    'eVar4',
    'eVar5',
    'eVar6',
    'eVar7',
    'eVar8',
    'eVar9',
    'list1',
    'list2'].join(',');
window[sObjectName].linkDownloadFileTypes = [
    'adpp',
    'air',
    'apk',
    'avi',
    'bin',
    'cptx',
    'css',
    'csv',
    'dmg',
    'doc',
    'docx',
    'eps',
    'exe',
    'flv',
    'hqx',
    'jar',
    'jpg',
    'js',
    'm4v',
    'mov',
    'mp3',
    'mpg',
    'msi',
    'mxp',
    'pdf',
    'png',
    'ppt',
    'pptx',
    'rar',
    'svg',
    'swc',
    'tab',
    'tbz2',
    'txt',
    'vsd',
    'vxd',
    'wav',
    'wma',
    'wmv',
    'xls',
    'xlsx',
    'xml',
    'zip',
    'zxp'].join(',');
window[sObjectName].linkExternalFilters = ''; //none
window[sObjectName].linkInternalFilters = [
    'javascript:', // jshint ignore:line
    'adobe.com'].join(',');


//--------------------- doPlugins ----------------------------------------------
window[sObjectName].usePlugins = true;
window[sObjectName].doPlugins = function (s) {
    s.eVar4 = _satellite.getQueryParam('q');
    s.campaign = s.pageName;
    s.plugins = '';
    s.eVar55 = s.eVar56 = s.eVar57 = s.eVar58 = '';
    
    if (s.eVar2 === '' && 
        (s.events.indexOf('event1') !== -1 || 
        s.events.indexOf('event2') !== -1)) {
        s.abort = true;
    }
};

//--------------------- Plugins ------------------------------------------------
//TODO:

/************************** AppMeasurement.js Config End **********************/

/************************** AppMeasurement_Module_media.js Config *************/
//window[sObjectName].Media.trackEvents = ''; // not going to set yet...
//window[sObjectName].Media.trackVars = ''; // not going to set yet...
/************************** AppMeasurement_Module_media.js Config End *********/

/************************** AppMeasurement_Module_Integrate.js Config *********/
/************************** AppMeasurement_Module_Integrate.js Config End *****/

// VisitorAPI.js Library in Page Load Rule
// AppMeasurement.js Library in Page Load Rule
// AppMeasurement_Module_media.js in Page Load Rule
// AppMeasurement_Module_Integrate.js in Page Load Rule
