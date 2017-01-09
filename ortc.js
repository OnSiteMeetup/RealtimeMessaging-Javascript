
/**********************************************************
* API ortc.js
***********************************************************/
var IbtRealTimeSJType = 'IbtRealTimeSJ';

function loadOrtcFactory(ortcType, loadedCallback) {
    var sockJsFactory = new OrtcFactory(ortcType);

    loadedCallback(sockJsFactory,null);
}

function OrtcFactory(ortcType) {
    var ortcClientType = ortcType;
    var buildVersion = '2.1.26.20160817.1';


    this.createClient = function () {
        return new IbtRealTimeSJ();
    };
}

function OrtcError(code) {
    this.code = code;
    switch (code) {
        case 3:
            this.message = 'Is not possible to load more than one factory of each ORTC type';
            break;
        case 4:
            this.message = 'Unknown ORTC type';
            break;
        default:
            this.message = 'Unknown error';
            break;
    }
}

String.prototype.ortcTreatUrl = function () {
    var url = this;

    if (url) {
        url = url.replace(/\s+/g, '');

        if (url.charAt(url.length - 1) == '/') {
            url = url.substring(0, url.length - 1);
        }
    }

    return url;
};

function ortcIsValidUrl(input) {
    return (/^\s*(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?\s*$/).exec(input) ? true : false;
};

function ortcIsValidInput (input) {
    return (/^[\w-:\/\.]*$/).exec(input) ? true : false;
};

function ortcIsValidBoolean (input) {
    return (/^(true|false|0|1)$/).exec(input) ? true : false;
};

function ortcIsFunction(input) {
    return typeof (input) == 'function' ? true : false;
};

function ortcIsString(input) {
    return typeof (input) == 'string' ? true : false;
};

function ortcIsArray(input) {
    return input instanceof Array;
};

function ortcStrToArray(input){
    try{
        input = input.replace(/[^\w,]/gi, '');
        if(input.length>0)
            return input.split(',');
        else
            return [];
        // return input.replace(/[^\w,]/gi, '').split(',');
    }catch(e){
        return [];
    }
}


//=====================Validation============================

//=====================IbtRealTimeSJCrossDomain.js============================

/* SockJS client, version 0.2.0, http://sockjs.org, MIT License

Copyright (C) 2011 VMware, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// JSON2 by Douglas Crockford (minified).
var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()

SockJS=function(){var a=document,b=window,c={},d=function(){};d.prototype.addEventListener=function(a,b){this._listeners||(this._listeners={}),a in this._listeners||(this._listeners[a]=[]);var d=this._listeners[a];c.arrIndexOf(d,b)===-1&&d.push(b);return},d.prototype.removeEventListener=function(a,b){if(!(this._listeners&&a in this._listeners))return;var d=this._listeners[a],e=c.arrIndexOf(d,b);if(e!==-1){d.length>1?this._listeners[a]=d.slice(0,e).concat(d.slice(e+1)):delete this._listeners[a];return}return},d.prototype.dispatchEvent=function(a){var b=a.type,c=Array.prototype.slice.call(arguments,0);this["on"+b]&&this["on"+b].apply(this,c);if(this._listeners&&b in this._listeners)for(var d=0;d<this._listeners[b].length;d++)this._listeners[b][d].apply(this,c)};var e=function(a,b){this.type=a;if(typeof b!="undefined")for(var c in b){if(!b.hasOwnProperty(c))continue;this[c]=b[c]}};e.prototype.toString=function(){var a=[];for(var b in this){if(!this.hasOwnProperty(b))continue;var c=this[b];typeof c=="function"&&(c="[function]"),a.push(b+"="+c)}return"SimpleEvent("+a.join(", ")+")"};var f=function(a){this.events=a||[]};f.prototype.emit=function(a){var b=this,d=Array.prototype.slice.call(arguments,1);!b.nuked&&b["on"+a]&&b["on"+a].apply(b,d),c.arrIndexOf(b.events,a)===-1&&c.log("Event "+JSON.stringify(a)+" not listed "+JSON.stringify(b.events)+" in "+b)},f.prototype.nuke=function(a){var b=this;b.nuked=!0;for(var c=0;c<b.events.length;c++)delete b[b.events[c]]};var g="abcdefghijklmnopqrstuvwxyz0123456789_";c.random_string=function(a,b){b=b||g.length;var c,d=[];for(c=0;c<a;c++)d.push(g.substr(Math.floor(Math.random()*b),1));return d.join("")},c.random_number=function(a){return Math.floor(Math.random()*a)},c.random_number_string=function(a){var b=(""+(a-1)).length,d=Array(b+1).join("0");return(d+c.random_number(a)).slice(-b)},c.getOrigin=function(a){a+="/";var b=a.split("/").slice(0,3);return b.join("/")},c.isLocalUrl=function(a){var c=b.location.href.split("/").slice(0,3).join("/");return a.slice(0,c.length)===c},c.objectExtend=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a};var h="_jp";c.polluteGlobalNamespace=function(){h in b||(b[h]={})},c.closeFrame=function(a,b){return"c"+JSON.stringify([a,b])},c.userSetCode=function(a){return a===1e3||a>=3e3&&a<=4999},c.countRTO=function(a){var b;return a>100?b=3*a:b=a+200,b},c.log=function(){b.console&&console.log&&console.log.apply&&console.log.apply(console,arguments)},c.bind=function(a,b){return a.bind?a.bind(b):function(){return a.apply(b,arguments)}},c.amendUrl=function(b){var c=a.location;if(!b)throw new Error("Wrong url for SockJS");return b.indexOf("//")===0&&(b=c.protocol+b),b.indexOf("/")===0&&(b=c.protocol+"//"+c.host+b),b=b.replace(/[/]+$/,""),b},c.arrIndexOf=function(a,b){for(var c=0;c<a.length;c++)if(a[c]===b)return c;return-1},c.arrSkip=function(a,b){var d=c.arrIndexOf(a,b);if(d===-1)return a.slice();var e=a.slice(0,d);return e.concat(a.slice(d+1))},c.isArray=Array.isArray||function(a){return{}.toString.call(a).indexOf("Array")>=0},c.delay=function(a,b){return typeof a=="function"&&(b=a,a=0),setTimeout(b,a)};var i=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,j={"\0":"\\u0000","\x01":"\\u0001","\x02":"\\u0002","\x03":"\\u0003","\x04":"\\u0004","\x05":"\\u0005","\x06":"\\u0006","\x07":"\\u0007","\b":"\\b","\t":"\\t","\n":"\\n","\x0b":"\\u000b","\f":"\\f","\r":"\\r","\x0e":"\\u000e","\x0f":"\\u000f","\x10":"\\u0010","\x11":"\\u0011","\x12":"\\u0012","\x13":"\\u0013","\x14":"\\u0014","\x15":"\\u0015","\x16":"\\u0016","\x17":"\\u0017","\x18":"\\u0018","\x19":"\\u0019","\x1a":"\\u001a","\x1b":"\\u001b","\x1c":"\\u001c","\x1d":"\\u001d","\x1e":"\\u001e","\x1f":"\\u001f",'"':'\\"',"\\":"\\\\","\x7f":"\\u007f","\x80":"\\u0080","\x81":"\\u0081","\x82":"\\u0082","\x83":"\\u0083","\x84":"\\u0084","\x85":"\\u0085","\x86":"\\u0086","\x87":"\\u0087","\x88":"\\u0088","\x89":"\\u0089","\x8a":"\\u008a","\x8b":"\\u008b","\x8c":"\\u008c","\x8d":"\\u008d","\x8e":"\\u008e","\x8f":"\\u008f","\x90":"\\u0090","\x91":"\\u0091","\x92":"\\u0092","\x93":"\\u0093","\x94":"\\u0094","\x95":"\\u0095","\x96":"\\u0096","\x97":"\\u0097","\x98":"\\u0098","\x99":"\\u0099","\x9a":"\\u009a","\x9b":"\\u009b","\x9c":"\\u009c","\x9d":"\\u009d","\x9e":"\\u009e","\x9f":"\\u009f","\xad":"\\u00ad","\u0600":"\\u0600","\u0601":"\\u0601","\u0602":"\\u0602","\u0603":"\\u0603","\u0604":"\\u0604","\u070f":"\\u070f","\u17b4":"\\u17b4","\u17b5":"\\u17b5","\u200c":"\\u200c","\u200d":"\\u200d","\u200e":"\\u200e","\u200f":"\\u200f","\u2028":"\\u2028","\u2029":"\\u2029","\u202a":"\\u202a","\u202b":"\\u202b","\u202c":"\\u202c","\u202d":"\\u202d","\u202e":"\\u202e","\u202f":"\\u202f","\u2060":"\\u2060","\u2061":"\\u2061","\u2062":"\\u2062","\u2063":"\\u2063","\u2064":"\\u2064","\u2065":"\\u2065","\u2066":"\\u2066","\u2067":"\\u2067","\u2068":"\\u2068","\u2069":"\\u2069","\u206a":"\\u206a","\u206b":"\\u206b","\u206c":"\\u206c","\u206d":"\\u206d","\u206e":"\\u206e","\u206f":"\\u206f","\ufeff":"\\ufeff","\ufff0":"\\ufff0","\ufff1":"\\ufff1","\ufff2":"\\ufff2","\ufff3":"\\ufff3","\ufff4":"\\ufff4","\ufff5":"\\ufff5","\ufff6":"\\ufff6","\ufff7":"\\ufff7","\ufff8":"\\ufff8","\ufff9":"\\ufff9","\ufffa":"\\ufffa","\ufffb":"\\ufffb","\ufffc":"\\ufffc","\ufffd":"\\ufffd","\ufffe":"\\ufffe","\uffff":"\\uffff"},k=/[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,l,m=JSON&&JSON.stringify||function(a){return i.lastIndex=0,i.test(a)&&(a=a.replace(i,function(a){return j[a]})),'"'+a+'"'},n=function(a){var b,c={},d=[];for(b=0;b<65536;b++)d.push(String.fromCharCode(b));return a.lastIndex=0,d.join("").replace(a,function(a){return c[a]="\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4),""}),a.lastIndex=0,c};c.quote=function(a){var b=m(a);return k.lastIndex=0,k.test(b)?(l||(l=n(k)),b.replace(k,function(a){return l[a]})):b};var o=["websocket","xdr-streaming","xhr-streaming","iframe-eventsource","iframe-htmlfile","xdr-polling","xhr-polling","iframe-xhr-polling","jsonp-polling"];c.probeProtocols=function(){var a={};for(var b=0;b<o.length;b++){var c=o[b];a[c]=t[c]&&t[c].enabled()}return a},c.detectProtocols=function(a,b,c){var d={},e=[];b||(b=o);for(var f=0;f<b.length;f++){var g=b[f];d[g]=a[g]}var h=function(a){var b=a.shift();d[b]?e.push(b):a.length>0&&h(a)};return c.websocket!==!1&&h(["websocket"]),d["xdr-streaming"]&&!c.cookie_needed?e.push("xdr-streaming"):h(["xhr-streaming","iframe-eventsource","iframe-htmlfile"]),d["xdr-polling"]&&!c.cookie_needed?e.push("xdr-polling"):h(["xhr-polling","iframe-xhr-polling","jsonp-polling"]),e};var p="_sockjs_global";c.createHook=function(){var a="a"+c.random_string(8);if(!(p in b)){var d={};b[p]=function(a){return a in d||(d[a]={id:a,del:function(){delete d[a]}}),d[a]}}return b[p](a)},c.attachMessage=function(a){c.attachEvent("message",a)},c.attachEvent=function(c,d){typeof b.addEventListener!="undefined"?b.addEventListener(c,d,!1):(a.attachEvent("on"+c,d),b.attachEvent("on"+c,d))},c.detachMessage=function(a){c.detachEvent("message",a)},c.detachEvent=function(c,d){typeof b.addEventListener!="undefined"?b.removeEventListener(c,d,!1):(a.detachEvent("on"+c,d),b.detachEvent("on"+c,d))};var q={};c.unload_add=function(a){var b=c.random_string(8);return q[b]=a,b},c.unload_del=function(a){a in q&&delete q[a]},c.attachEvent("unload",function(){for(var a in q)q[a]()}),c.createIframe=function(b,d){var e=a.createElement("iframe"),f,g=function(){clearTimeout(f);try{e.onload=null}catch(a){}e.onerror=null},h=function(){e&&(g(),e.src="about:blank",setTimeout(function(){e&&e.parentNode.removeChild(e),e=null},0),c.detachEvent("unload",h))},i=function(a){e&&(h(),d(a))};return e.src=b,e.style.display="none",e.style.position="absolute",e.onerror=function(){i("onerror")},e.onload=function(){clearTimeout(f),f=setTimeout(function(){i("onload timeout")},2e3)},a.body.appendChild(e),f=setTimeout(function(){i("timeout")},5e3),c.attachEvent("unload",h),{iframe:e,cleanup:h,loaded:g}},c.createHtmlfile=function(a,d){var e=new ActiveXObject("htmlfile"),f,g,i=function(){clearTimeout(f)},j=function(){if(e){i(),c.detachEvent("unload",j);try{g.src="about:blank"}catch(a){}g.parentNode.removeChild(g),g=e=null,CollectGarbage()}},k=function(a){e&&(j(),d(a))};e.open(),e.write('<html><script>document.domain="'+document.domain+'";'+"</s"+"cript></html>"),e.close(),e.parentWindow[h]=b[h];var l=e.createElement("div");return e.body.appendChild(l),g=e.createElement("iframe"),l.appendChild(g),g.src=a,f=setTimeout(function(){k("timeout")},5e3),c.attachEvent("unload",j),{iframe:g,cleanup:j,loaded:i}};var r=c.XHRObject=function(a,b,d){var e=this;c.delay(function(){e._start(a,b,d)})};r.prototype=new f(["chunk","finish"]),r.prototype._start=function(a,d,e){var f=this;if(b.ActiveXObject){d+=(d.indexOf("?")===-1?"?":"&")+"t="+ +(new Date);try{f.xhr=new ActiveXObject("Microsoft.XMLHTTP")}catch(g){}}f.xhr||(f.xhr=new XMLHttpRequest),f.unload_ref=c.unload_add(function(){f._cleanup(!0)});try{f.xhr.open(a,d,!0)}catch(h){f.emit("finish",0,""),f._cleanup();return}"withCredentials"in f.xhr&&(f.xhr.withCredentials="true"),f.xhr.onreadystatechange=function(){if(f.xhr){var a=f.xhr;switch(a.readyState){case 3:try{var b=a.status,c=a.responseText;f.emit("chunk",b,c)}catch(a){}break;case 4:f.emit("finish",a.status,a.responseText),f._cleanup(!1)}}},f.xhr.send(e)},r.prototype._cleanup=function(a){var b=this;if(!b.xhr)return;c.unload_del(b.unload_ref),b.xhr.onreadystatechange=function(){};if(a)try{b.xhr.abort()}catch(d){}b.unload_ref=b.xhr=null},r.prototype.close=function(){var a=this;a.nuke(),a._cleanup(!0)};var s=c.XDRObject=function(a,b,d){var e=this;c.delay(function(){e._start(a,b,d)})};s.prototype=new f(["chunk","finish"]),s.prototype._start=function(a,b,d){var e=this,f=new XDomainRequest;b+=(b.indexOf("?")===-1?"?":"&")+"t="+ +(new Date);var g=f.ontimeout=f.onerror=function(){e.emit("finish",0,""),e._cleanup(!1)};f.onprogress=function(){e.emit("chunk",200,f.responseText)},f.onload=function(){e.emit("finish",200,f.responseText),e._cleanup(!1)},e.xdr=f,e.unload_ref=c.unload_add(function(){e._cleanup(!0)});try{e.xdr.open(a,b),e.xdr.send(d)}catch(h){g()}},s.prototype._cleanup=function(a){var b=this;if(!b.xdr)return;c.unload_del(b.unload_ref),b.xdr.ontimeout=b.xdr.onerror=b.xdr.onprogress=b.xdr.onload=null;if(a)try{b.xdr.abort()}catch(d){}b.unload_ref=b.xdr=null},s.prototype.close=function(){var a=this;a.nuke(),a._cleanup(!0)},c.isXHRCorsCapable=function(){return b.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest?1:b.XDomainRequest?2:G.enabled()?3:4};var t=function(a,b,d){var e=this,f;e._options={devel:!1,debug:!1,protocols_whitelist:[],info:undefined,rtt:undefined},d&&c.objectExtend(e._options,d),e._base_url=c.amendUrl(a),e._server=e._options.server||c.random_number_string(1e3),e._options.protocols_whitelist&&e._options.protocols_whitelist.length?f=e._options.protocols_whitelist:(typeof b=="string"&&b.length>0?f=[b]:c.isArray(b)?f=b:f=null,f&&e._debug('Deprecated API: Use "protocols_whitelist" option instead of supplying protocol list as a second parameter to SockJS constructor.')),e._protocols=[],e.protocol=null,e.readyState=t.CONNECTING;var g=N(e._base_url);g.onfinish=function(a,b){a?(e._options.info&&(a=e._options.info),e._options.rtt&&(b=e._options.rtt),e._applyInfo(a,b,f),e._didClose()):e._didClose(1002,"Can't connect to server",!0)}};t.prototype=new d,t.version="0.2.1",t.CONNECTING=0,t.OPEN=1,t.CLOSING=2,t.CLOSED=3,t.prototype._debug=function(){this._options.debug&&c.log.apply(c,arguments)},t.prototype._dispatchOpen=function(){var a=this;a.readyState===t.CONNECTING?(a._transport_tref&&(clearTimeout(a._transport_tref),a._transport_tref=null),a.readyState=t.OPEN,a.dispatchEvent(new e("open"))):a._didClose(1006,"Server lost session")},t.prototype._dispatchMessage=function(a){var b=this;if(b.readyState!==t.OPEN)return;b.dispatchEvent(new e("message",{data:a}))},t.prototype._dispatchHeartbeat=function(a){var b=this;if(b.readyState!==t.OPEN)return;b.dispatchEvent(new e("heartbeat",{}))},t.prototype._didClose=function(a,b,d){var f=this;if(f.readyState!==t.CONNECTING&&f.readyState!==t.OPEN&&f.readyState!==t.CLOSING)throw new Error("INVALID_STATE_ERR");f._transport&&f._transport.doCleanup(),f._transport=null;var g=new e("close",{code:a,reason:b,wasClean:c.userSetCode(a)});if(!c.userSetCode(a)&&f.readyState===t.CONNECTING&&!d){if(f._try_next_protocol(g))return;g=new e("close",{code:2e3,reason:"All transports failed",wasClean:!1,last_event:g})}f.readyState=t.CLOSED,c.delay(function(){f.dispatchEvent(g)})},t.prototype._didMessage=function(a){var b=this,c=a.slice(0,1);switch(c){case"o":b._dispatchOpen();break;case"a":var d=JSON.parse(a.slice(1)||"[]");for(var e=0;e<d.length;e++)b._dispatchMessage(d[e]);break;case"m":var d=JSON.parse(a.slice(1)||"null");b._dispatchMessage(d);break;case"c":var d=JSON.parse(a.slice(1)||"[]");b._didClose(d[0],d[1]);break;case"h":b._dispatchHeartbeat()}},t.prototype._try_next_protocol=function(b){var d=this;d.protocol&&(d._debug("Closed transport:",d.protocol,""+b),d.protocol=null),d._transport_tref&&(clearTimeout(d._transport_tref),d._transport_tref=null);for(;;){var e=d.protocol=d._protocols.shift();if(!e)return!1;if(t[e]&&t[e].need_body===!0&&!a.body)return d._protocols.unshift(e),d.protocol="waiting-for-load",c.attachEvent("load",function(){d._try_next_protocol()}),!0;if(!t[e]||!t[e].enabled(d._options))d._debug("Skipping transport:",e);else{var f=t[e].roundTrips||1,g=(d._options.rto||0)*f||5e3;d._transport_tref=c.delay(g,function(){d.readyState===t.CONNECTING&&d._didClose(2007,"Transport timeouted")});var h=c.random_string(8),i=d._base_url+"/"+d._server+"/"+h;return d._debug("Opening transport:",e," url:"+i," RTO:"+d._options.rto),d._transport=new t[e](d,i,d._base_url),!0}}},t.prototype.close=function(a,b){var d=this;if(a&&!c.userSetCode(a))throw new Error("INVALID_ACCESS_ERR");return d.readyState!==t.CONNECTING&&d.readyState!==t.OPEN?!1:(d.readyState=t.CLOSING,d._didClose(a||1e3,b||"Normal closure"),!0)},t.prototype.send=function(a){var b=this;if(b.readyState===t.CONNECTING)throw new Error("INVALID_STATE_ERR");return b.readyState===t.OPEN&&b._transport.doSend(c.quote(""+a)),!0},t.prototype._applyInfo=function(a,b,d){var e=this;e._options.info=a,e._options.rtt=b,e._options.rto=c.countRTO(b);var f=c.probeProtocols();e._protocols=c.detectProtocols(f,d,a)};var u=t.websocket=function(a,d){var e=this,f=d+"/websocket";f.slice(0,5)==="https"?f="wss"+f.slice(5):f="ws"+f.slice(4),e.ri=a,e.url=f;var g=b.WebSocket||b.MozWebSocket;e.ws=new g(e.url),e.ws.onmessage=function(a){e.ri._didMessage(a.data)},e.unload_ref=c.unload_add(function(){e.ws.close()}),e.ws.onclose=function(){e.ri._didMessage(c.closeFrame(1006,"WebSocket connection broken"))}};u.prototype.doSend=function(a){this.ws.send(a)},u.prototype.doCleanup=function(){var a=this,b=a.ws;b&&(b.onmessage=b.onclose=null,b.close(),c.unload_del(a.unload_ref),a.unload_ref=a.ri=a.ws=null)},u.enabled=function(){return!!b.WebSocket||!!b.MozWebSocket};var v=function(){};v.prototype.send_constructor=function(a){var b=this;b.send_buffer=[],b.sender=a},v.prototype.doSend=function(a){var b=this;b.send_buffer.push(a),b.send_stop||b.send_schedule()},v.prototype.send_schedule_wait=function(){var a=this,b;a.send_stop=function(){a.send_stop=null,clearTimeout(b)},b=c.delay(25,function(){a.send_stop=null,a.send_schedule()})},v.prototype.send_schedule=function(){var a=this;if(a.send_buffer.length>0){var b="["+a.send_buffer.join(",")+"]";a.send_stop=a.sender(a.trans_url,b,function(){a.send_stop=null,a.send_schedule_wait()}),a.send_buffer=[]}},v.prototype.send_destructor=function(){var a=this;a._send_stop&&a._send_stop(),a._send_stop=null};var w=function(b,d,e){var f=this;if(!("_send_form"in f)){var g=f._send_form=a.createElement("form"),h=f._send_area=a.createElement("textarea");h.name="d",g.style.display="none",g.style.position="absolute",g.method="POST",g.enctype="application/x-www-form-urlencoded",g.acceptCharset="UTF-8",g.appendChild(h),a.body.appendChild(g)}var g=f._send_form,h=f._send_area,i="a"+c.random_string(8);g.target=i,g.action=b+"/jsonp_send?i="+i;var j;try{j=a.createElement('<iframe name="'+i+'">')}catch(k){j=a.createElement("iframe"),j.name=i}j.id=i,g.appendChild(j),j.style.display="none";try{h.value=d}catch(l){alert("Your browser is seriously broken. Go home! "+l.message)}g.submit();var m=function(a){if(!j.onerror)return;j.onreadystatechange=j.onerror=j.onload=null,c.delay(500,function(){j.parentNode.removeChild(j),j=null}),h.value=null,e()};return j.onerror=j.onload=m,j.onreadystatechange=function(a){j.readyState=="complete"&&m()},m},x=function(a){return function(b,c,d){var e=new a("POST",b+"/xhr_send",c);return e.onfinish=function(a,b){d(a)},function(a){d(0,a)}}},y=function(b,d){var e,f=a.createElement("script"),g,h=function(a){g&&(g.parentNode.removeChild(g),g=null),f&&(clearTimeout(e),f.parentNode.removeChild(f),f.onreadystatechange=f.onerror=f.onload=f.onclick=null,f=null,d(a),d=null)},i=!1,j=null;f.id="a"+c.random_string(8),f.src=b,f.type="text/javascript",f.charset="UTF-8",f.onerror=function(a){j||(j=setTimeout(function(){i||h(c.closeFrame(1006,"JSONP script loaded abnormally (onerror)"))},1e3))},f.onload=function(a){h(c.closeFrame(1006,"JSONP script loaded abnormally (onload)"))},f.onreadystatechange=function(a){if(/loaded|closed/.test(f.readyState)){if(f&&f.htmlFor&&f.onclick){i=!0;try{f.onclick()}catch(b){}}f&&h(c.closeFrame(1006,"JSONP script loaded abnormally (onreadystatechange)"))}};if(typeof f.async=="undefined"&&a.attachEvent)if(!/opera/i.test(navigator.userAgent)){try{f.htmlFor=f.id,f.event="onclick"}catch(k){}f.async=!0}else g=a.createElement("script"),g.text="try{var a = document.getElementById('"+f.id+"'); if(a)a.onerror();}catch(x){};",f.async=g.async=!1;typeof f.async!="undefined"&&(f.async=!0),e=setTimeout(function(){h(c.closeFrame(1006,"JSONP script loaded abnormally (timeout)"))},35e3);var l=a.getElementsByTagName("head")[0];return l.insertBefore(f,l.firstChild),g&&l.insertBefore(g,l.firstChild),h},z=t["jsonp-polling"]=function(a,b){c.polluteGlobalNamespace();var d=this;d.ri=a,d.trans_url=b,d.send_constructor(w),d._schedule_recv()};z.prototype=new v,z.prototype._schedule_recv=function(){var a=this,b=function(b){a._recv_stop=null,b&&(a._is_closing||a.ri._didMessage(b)),a._is_closing||a._schedule_recv()};a._recv_stop=A(a.trans_url+"/jsonp",y,b)},z.enabled=function(){return!0},z.need_body=!0,z.prototype.doCleanup=function(){var a=this;a._is_closing=!0,a._recv_stop&&a._recv_stop(),a.ri=a._recv_stop=null,a.send_destructor()};var A=function(a,d,e){var f="a"+c.random_string(6),g=a+"?c="+escape(h+"."+f),i=function(a){delete b[h][f],e(a)},j=d(g,i);b[h][f]=j;var k=function(){b[h][f]&&b[h][f](c.closeFrame(1e3,"JSONP user aborted read"))};return k},B=function(){};B.prototype=new v,B.prototype.run=function(a,b,c,d,e){var f=this;f.ri=a,f.trans_url=b,f.send_constructor(x(e)),f.poll=new V(a,d,b+c,e)},B.prototype.doCleanup=function(){var a=this;a.poll&&(a.poll.abort(),a.poll=null)};var C=t["xhr-streaming"]=function(a,b){this.run(a,b,"/xhr_streaming",$,c.XHRObject)};C.prototype=new B,C.enabled=function(){return b.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest},C.roundTrips=2;var D=t["xdr-streaming"]=function(a,b){this.run(a,b,"/xhr_streaming",$,c.XDRObject)};D.prototype=new B,D.enabled=function(){return!!b.XDomainRequest},D.roundTrips=2;var E=t["xhr-polling"]=function(a,b){this.run(a,b,"/xhr",$,c.XHRObject)};E.prototype=new B,E.enabled=C.enabled,E.roundTrips=2;var F=t["xdr-polling"]=function(a,b){this.run(a,b,"/xhr",$,c.XDRObject)};F.prototype=new B,F.enabled=D.enabled,F.roundTrips=2;var G=function(){};G.prototype.i_constructor=function(a,b,d){var e=this;e.ri=a,e.origin=c.getOrigin(d),e.base_url=d,e.trans_url=b;var f=d+"/iframe.html";e.ri._options.devel&&(f+="?t="+ +(new Date)),e.window_id=c.random_string(8),f+="#"+e.window_id,e.iframeObj=c.createIframe(f,function(a){e.ri._didClose(1006,"Unable to load an iframe ("+a+")")}),e.onmessage_cb=c.bind(e.onmessage,e),c.attachMessage(e.onmessage_cb)},G.prototype.doCleanup=function(){var a=this;if(a.iframeObj){c.detachMessage(a.onmessage_cb);try{a.iframeObj.iframe.contentWindow&&a.postMessage("c")}catch(b){}a.iframeObj.cleanup(),a.iframeObj=null,a.onmessage_cb=a.iframeObj=null}},G.prototype.onmessage=function(a){var b=this;if(a.origin!==b.origin)return;var c=a.data.slice(0,8),d=a.data.slice(8,9),e=a.data.slice(9);if(c!==b.window_id)return;switch(d){case"s":b.iframeObj.loaded(),b.postMessage("s",JSON.stringify([t.version,b.protocol,b.trans_url,b.base_url]));break;case"t":b.ri._didMessage(e)}},G.prototype.postMessage=function(a,b){var c=this;c.iframeObj.iframe.contentWindow.postMessage(c.window_id+a+(b||""),c.origin)},G.prototype.doSend=function(a){this.postMessage("m",a)},G.enabled=function(){var a=navigator&&navigator.userAgent&&navigator.userAgent.indexOf("Konqueror")!==-1;return(typeof b.postMessage=="function"||typeof b.postMessage=="object")&&!a};var H,I=function(a,d){parent!==b?parent.postMessage(H+a+(d||""),"*"):c.log("Can't postMessage, no parent window.",a,d)},J=function(){};J.prototype._didClose=function(a,b){I("t",c.closeFrame(a,b))},J.prototype._didMessage=function(a){I("t",a)},J.prototype._doSend=function(a){this._transport.doSend(a)},J.prototype._doCleanup=function(){this._transport.doCleanup()},t.bootstrap_iframe=function(){var d;H=a.location.hash.slice(1);var e=function(a){if(a.source!==parent)return;var e=a.data.slice(0,8),f=a.data.slice(8,9),g=a.data.slice(9);if(e!==H)return;switch(f){case"s":var h=JSON.parse(g),i=h[0],j=h[1],k=h[2],l=h[3];i!==t.version&&c.log('Incompatibile SockJS! Main site uses: "'+i+'", the iframe:'+' "'+t.version+'".');if(!c.isLocalUrl(k)||!c.isLocalUrl(l)){c.log("Can't connect to different domain from within an iframe. ("+JSON.stringify([b.location.href,k,l])+")");return}d=new J,d._transport=new J[j](d,k,l);break;case"m":d._doSend(g);break;case"c":d&&d._doCleanup(),d=null}};c.attachMessage(e),I("s")};var K=function(a,b){var d=this;c.delay(function(){d.doXhr(a,b)})};K.prototype=new f(["finish"]),K.prototype.doXhr=function(a,b){var d=this,e=(new Date).getTime(),f=new b("GET",a+"/info",null),g=c.delay(8e3,function(){f.ontimeout()});f.onfinish=function(a,b){clearTimeout(g),g=null;if(a===200){var c=(new Date).getTime()-e,f=JSON.parse(b);typeof f!="object"&&(f={}),d.emit("finish",f,c)}else d.emit("finish")},f.ontimeout=function(){f.close(),d.emit("finish")}};var L=function(b){var d=this,e=function(){var a=new G;a.protocol="w-iframe-info-receiver";var c=function(b){if(typeof b=="string"&&b.substr(0,1)==="m"){var c=JSON.parse(b.substr(1)),e=c[0],f=c[1];d.emit("finish",e,f)}else d.emit("finish");a.doCleanup(),a=null},e={_options:{},_didClose:c,_didMessage:c};a.i_constructor(e,b,b)};a.body?e():c.attachEvent("load",e)};L.prototype=new f(["finish"]);var M=function(){var a=this;c.delay(function(){a.emit("finish",{},2e3)})};M.prototype=new f(["finish"]);var N=function(a){if(c.isLocalUrl(a))return new K(a,c.XHRObject);switch(c.isXHRCorsCapable()){case 1:return new K(a,c.XHRObject);case 2:return new K(a,c.XDRObject);case 3:return new L(a);default:return new M}},O=J["w-iframe-info-receiver"]=function(a,b,d){var e=new K(d,c.XHRObject);e.onfinish=function(b,c){a._didMessage("m"+JSON.stringify([b,c])),a._didClose()}};O.prototype.doCleanup=function(){};var P=t["iframe-eventsource"]=function(){var a=this;a.protocol="w-iframe-eventsource",a.i_constructor.apply(a,arguments)};P.prototype=new G,P.enabled=function(){return"EventSource"in b&&G.enabled()},P.need_body=!0,P.roundTrips=3;var Q=J["w-iframe-eventsource"]=function(a,b){this.run(a,b,"/eventsource",W,c.XHRObject)};Q.prototype=new B;var R=t["iframe-xhr-polling"]=function(){var a=this;a.protocol="w-iframe-xhr-polling",a.i_constructor.apply(a,arguments)};R.prototype=new G,R.enabled=function(){return b.XMLHttpRequest&&G.enabled()},R.need_body=!0,R.roundTrips=3;var S=J["w-iframe-xhr-polling"]=function(a,b){this.run(a,b,"/xhr",$,c.XHRObject)};S.prototype=new B;var T=t["iframe-htmlfile"]=function(){var a=this;a.protocol="w-iframe-htmlfile",a.i_constructor.apply(a,arguments)};T.prototype=new G,T.enabled=function(){return G.enabled()},T.need_body=!0,T.roundTrips=3;var U=J["w-iframe-htmlfile"]=function(a,b){this.run(a,b,"/htmlfile",Z,c.XHRObject)};U.prototype=new B;var V=function(a,b,c,d){var e=this;e.ri=a,e.Receiver=b,e.recv_url=c,e.AjaxObject=d,e._scheduleRecv()};V.prototype._scheduleRecv=function(){var a=this,b=a.poll=new a.Receiver(a.recv_url,a.AjaxObject),c=0;b.onmessage=function(b){c+=1,a.ri._didMessage(b.data)},b.onclose=function(c){a.poll=b=b.onmessage=b.onclose=null,a.poll_is_closing||(c.reason==="permanent"?a.ri._didClose(1006,"Polling error ("+c.reason+")"):a._scheduleRecv())}},V.prototype.abort=function(){var a=this;a.poll_is_closing=!0,a.poll&&a.poll.abort()};var W=function(a){var b=this,d=new EventSource(a);d.onmessage=function(a){b.dispatchEvent(new e("message",{data:unescape(a.data)}))},b.es_close=d.onerror=function(a,f){var g=f?"user":d.readyState!==2?"network":"permanent";b.es_close=d.onmessage=d.onerror=null,d.close(),d=null,c.delay(200,function(){b.dispatchEvent(new e("close",{reason:g}))})}};W.prototype=new d,W.prototype.abort=function(){var a=this;a.es_close&&a.es_close({},!0)};var X,Y=function(){if(X===undefined)if("ActiveXObject"in b)try{X=!!(new ActiveXObject("htmlfile"))}catch(a){}else X=!1;return X},Z=function(a){var d=this;c.polluteGlobalNamespace(),d.id="a"+c.random_string(6,26),a+=(a.indexOf("?")===-1?"?":"&")+"c="+escape(h+"."+d.id);var f=Y()?c.createHtmlfile:c.createIframe,g;b[h][d.id]={start:function(){g.loaded()},message:function(a){d.dispatchEvent(new e("message",{data:a}))},stop:function(){d.iframe_close({},"network")}},d.iframe_close=function(a,c){g.cleanup(),d.iframe_close=g=null,delete b[h][d.id],d.dispatchEvent(new e("close",{reason:c}))},g=f(a,function(a){d.iframe_close({},"permanent")})};Z.prototype=new d,Z.prototype.abort=function(){var a=this;a.iframe_close&&a.iframe_close({},"user")};var $=function(a,b){var c=this,d=0;c.xo=new b("POST",a,null),c.xo.onchunk=function(a,b){if(a!==200)return;for(;;){var f=b.slice(d),g=f.indexOf("\n");if(g===-1)break;d+=g+1;var h=f.slice(0,g);c.dispatchEvent(new e("message",{data:h}))}},c.xo.onfinish=function(a,b){c.xo.onchunk(a,b),c.xo=null;var d=a===200?"network":"permanent";c.dispatchEvent(new e("close",{reason:d}))}};return $.prototype=new d,$.prototype.abort=function(){var a=this;a.xo&&(a.xo.close(),a.dispatchEvent(new e("close",{reason:"user"})),a.xo=null)},t.getUtils=function(){return c},t.getIframeTransport=function(){return G},t}(),"_sockjs_onload"in window&&setTimeout(_sockjs_onload,1)

//=====================IbtRealTimeSJCrossDomain.js============================

//=====================IbtRealTimeSJCore.js============================

/* SockJS client, version 0.3.1, http://sockjs.org, MIT License

Copyright (c) 2011-2012 VMware, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

// JSON2 by Douglas Crockford (minified).
var JSON;JSON||(JSON={}),function(){function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i&&typeof i=="object"&&typeof i.toJSON=="function"&&(i=i.toJSON(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g;return e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g;return e}}function quote(a){escapable.lastIndex=0;return escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function f(a){return a<10?"0"+a:a}"use strict",typeof Date.prototype.toJSON!="function"&&(Date.prototype.toJSON=function(a){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")}),typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})}()


//     [*] Including lib/index.js
// Public object
SockJS = (function(){
              var _document = document;
              var _window = window;
              var utils = {};


//         [*] Including lib/reventtarget.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */
var REventTarget = function() {};
REventTarget.prototype.addEventListener = function (eventType, listener) {
    if(!this._listeners) {
         this._listeners = {};
    }
    if(!(eventType in this._listeners)) {
        this._listeners[eventType] = [];
    }
    var arr = this._listeners[eventType];
    if(utils.arrIndexOf(arr, listener) === -1) {
        arr.push(listener);
    }
    return;
};

REventTarget.prototype.removeEventListener = function (eventType, listener) {
    if(!(this._listeners && (eventType in this._listeners))) {
        return;
    }
    var arr = this._listeners[eventType];
    var idx = utils.arrIndexOf(arr, listener);
    if (idx !== -1) {
        if(arr.length > 1) {
            this._listeners[eventType] = arr.slice(0, idx).concat( arr.slice(idx+1) );
        } else {
            delete this._listeners[eventType];
        }
        return;
    }
    return;
};

REventTarget.prototype.dispatchEvent = function (event) {
    var t = event.type;
    var args = Array.prototype.slice.call(arguments, 0);
    if (this['on'+t]) {
        this['on'+t].apply(this, args);
    }
    if (this._listeners && t in this._listeners) {
        for(var i=0; i < this._listeners[t].length; i++) {
            this._listeners[t][i].apply(this, args);
        }
    }
};
//         [*] End of lib/reventtarget.js


//         [*] Including lib/simpleevent.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var SimpleEvent = function(type, obj) {
    this.type = type;
    if (typeof obj !== 'undefined') {
        for(var k in obj) {
            if (!obj.hasOwnProperty(k)) continue;
            this[k] = obj[k];
        }
    }
};

SimpleEvent.prototype.toString = function() {
    var r = [];
    for(var k in this) {
        if (!this.hasOwnProperty(k)) continue;
        var v = this[k];
        if (typeof v === 'function') v = '[function]';
        r.push(k + '=' + v);
    }
    return 'SimpleEvent(' + r.join(', ') + ')';
};
//         [*] End of lib/simpleevent.js


//         [*] Including lib/eventemitter.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var EventEmitter = function(events) {
    this.events = events || [];
};
EventEmitter.prototype.emit = function(type) {
    var that = this;
    var args = Array.prototype.slice.call(arguments, 1);
    if (!that.nuked && that['on'+type]) {
        that['on'+type].apply(that, args);
    }
    if (utils.arrIndexOf(that.events, type) === -1) {
        utils.log('Event ' + JSON.stringify(type) +
                  ' not listed ' + JSON.stringify(that.events) +
                  ' in ' + that);
    }
};

EventEmitter.prototype.nuke = function(type) {
    var that = this;
    that.nuked = true;
    for(var i=0; i<that.events.length; i++) {
        delete that[that.events[i]];
    }
};
//         [*] End of lib/eventemitter.js


//         [*] Including lib/utils.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var random_string_chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
utils.random_string = function(length, max) {
    max = max || random_string_chars.length;
    var i, ret = [];
    for(i=0; i < length; i++) {
        ret.push( random_string_chars.substr(Math.floor(Math.random() * max),1) );
    }
    return ret.join('');
};
utils.random_number = function(max) {
    return Math.floor(Math.random() * max);
};
utils.random_number_string = function(max) {
    var t = (''+(max - 1)).length;
    var p = Array(t+1).join('0');
    return (p + utils.random_number(max)).slice(-t);
};

// Assuming that url looks like: http://asdasd:111/asd
utils.getOrigin = function(url) {
    url += '/';
    var parts = url.split('/').slice(0, 3);
    return parts.join('/');
};

utils.isSameOriginUrl = function(url_a, url_b) {
    // location.origin would do, but it's not always available.
    if (!url_b) url_b = _window.location.href;

    return (url_a.split('/').slice(0,3).join('/')
                ===
            url_b.split('/').slice(0,3).join('/'));
};

utils.getParentDomain = function(url) {
    // ipv4 ip address
    if (/^[0-9.]*$/.test(url)) return url;
    // ipv6 ip address
    if (/^\[/.test(url)) return url;
    // no dots
    if (!(/[.]/.test(url))) return url;

    var parts = url.split('.').slice(1);
    return parts.join('.');
};

utils.objectExtend = function(dst, src) {
    for(var k in src) {
        if (src.hasOwnProperty(k)) {
            dst[k] = src[k];
        }
    }
    return dst;
};

var WPrefix = '_jp';

utils.polluteGlobalNamespace = function() {
    if (!(WPrefix in _window)) {
        _window[WPrefix] = {};
    }
};

utils.closeFrame = function (code, reason) {
    return 'c'+JSON.stringify([code, reason]);
};

utils.userSetCode = function (code) {
    return code === 1000 || (code >= 3000 && code <= 4999);
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
utils.countRTO = function (rtt) {
    var rto;
    if (rtt > 100) {
        rto = 3 * rtt; // rto > 300msec
    } else {
        rto = rtt + 200; // 200msec < rto <= 300msec
    }
    return rto;
}

utils.log = function() {
    if (_window.console && console.log && console.log.apply) {
        console.log.apply(console, arguments);
    }
};

utils.bind = function(fun, that) {
    if (fun.bind) {
        return fun.bind(that);
    } else {
        return function() {
            return fun.apply(that, arguments);
        };
    }
};

utils.flatUrl = function(url) {
    return url.indexOf('?') === -1 && url.indexOf('#') === -1;
};

utils.amendUrl = function(url) {
    var dl = _document.location;
    if (!url) {
        throw new Error('Wrong url for SockJS');
    }
    if (!utils.flatUrl(url)) {
        throw new Error('Only basic urls are supported in SockJS');
    }

    //  '//abc' --> 'http://abc'
    if (url.indexOf('//') === 0) {
        url = dl.protocol + url;
    }
    // '/abc' --> 'http://localhost:80/abc'
    if (url.indexOf('/') === 0) {
        url = dl.protocol + '//' + dl.host + url;
    }
    // strip trailing slashes
    url = url.replace(/[/]+$/,'');
    return url;
};

// IE doesn't support [].indexOf.
utils.arrIndexOf = function(arr, obj){
    for(var i=0; i < arr.length; i++){
        if(arr[i] === obj){
            return i;
        }
    }
    return -1;
};

utils.arrSkip = function(arr, obj) {
    var idx = utils.arrIndexOf(arr, obj);
    if (idx === -1) {
        return arr.slice();
    } else {
        var dst = arr.slice(0, idx);
        return dst.concat(arr.slice(idx+1));
    }
};

// Via: https://gist.github.com/1133122/2121c601c5549155483f50be3da5305e83b8c5df
utils.isArray = Array.isArray || function(value) {
    return {}.toString.call(value).indexOf('Array') >= 0
};

utils.delay = function(t, fun) {
    if(typeof t === 'function') {
        fun = t;
        t = 0;
    }
    return setTimeout(fun, t);
};


// Chars worth escaping, as defined by Douglas Crockford:
//   https://github.com/douglascrockford/JSON-js/blob/47a9882cddeb1e8529e07af9736218075372b8ac/json2.js#L196
var json_escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    json_lookup = {
"\u0000":"\\u0000","\u0001":"\\u0001","\u0002":"\\u0002","\u0003":"\\u0003",
"\u0004":"\\u0004","\u0005":"\\u0005","\u0006":"\\u0006","\u0007":"\\u0007",
"\b":"\\b","\t":"\\t","\n":"\\n","\u000b":"\\u000b","\f":"\\f","\r":"\\r",
"\u000e":"\\u000e","\u000f":"\\u000f","\u0010":"\\u0010","\u0011":"\\u0011",
"\u0012":"\\u0012","\u0013":"\\u0013","\u0014":"\\u0014","\u0015":"\\u0015",
"\u0016":"\\u0016","\u0017":"\\u0017","\u0018":"\\u0018","\u0019":"\\u0019",
"\u001a":"\\u001a","\u001b":"\\u001b","\u001c":"\\u001c","\u001d":"\\u001d",
"\u001e":"\\u001e","\u001f":"\\u001f","\"":"\\\"","\\":"\\\\",
"\u007f":"\\u007f","\u0080":"\\u0080","\u0081":"\\u0081","\u0082":"\\u0082",
"\u0083":"\\u0083","\u0084":"\\u0084","\u0085":"\\u0085","\u0086":"\\u0086",
"\u0087":"\\u0087","\u0088":"\\u0088","\u0089":"\\u0089","\u008a":"\\u008a",
"\u008b":"\\u008b","\u008c":"\\u008c","\u008d":"\\u008d","\u008e":"\\u008e",
"\u008f":"\\u008f","\u0090":"\\u0090","\u0091":"\\u0091","\u0092":"\\u0092",
"\u0093":"\\u0093","\u0094":"\\u0094","\u0095":"\\u0095","\u0096":"\\u0096",
"\u0097":"\\u0097","\u0098":"\\u0098","\u0099":"\\u0099","\u009a":"\\u009a",
"\u009b":"\\u009b","\u009c":"\\u009c","\u009d":"\\u009d","\u009e":"\\u009e",
"\u009f":"\\u009f","\u00ad":"\\u00ad","\u0600":"\\u0600","\u0601":"\\u0601",
"\u0602":"\\u0602","\u0603":"\\u0603","\u0604":"\\u0604","\u070f":"\\u070f",
"\u17b4":"\\u17b4","\u17b5":"\\u17b5","\u200c":"\\u200c","\u200d":"\\u200d",
"\u200e":"\\u200e","\u200f":"\\u200f","\u2028":"\\u2028","\u2029":"\\u2029",
"\u202a":"\\u202a","\u202b":"\\u202b","\u202c":"\\u202c","\u202d":"\\u202d",
"\u202e":"\\u202e","\u202f":"\\u202f","\u2060":"\\u2060","\u2061":"\\u2061",
"\u2062":"\\u2062","\u2063":"\\u2063","\u2064":"\\u2064","\u2065":"\\u2065",
"\u2066":"\\u2066","\u2067":"\\u2067","\u2068":"\\u2068","\u2069":"\\u2069",
"\u206a":"\\u206a","\u206b":"\\u206b","\u206c":"\\u206c","\u206d":"\\u206d",
"\u206e":"\\u206e","\u206f":"\\u206f","\ufeff":"\\ufeff","\ufff0":"\\ufff0",
"\ufff1":"\\ufff1","\ufff2":"\\ufff2","\ufff3":"\\ufff3","\ufff4":"\\ufff4",
"\ufff5":"\\ufff5","\ufff6":"\\ufff6","\ufff7":"\\ufff7","\ufff8":"\\ufff8",
"\ufff9":"\\ufff9","\ufffa":"\\ufffa","\ufffb":"\\ufffb","\ufffc":"\\ufffc",
"\ufffd":"\\ufffd","\ufffe":"\\ufffe","\uffff":"\\uffff"};

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
var extra_escapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g,
    extra_lookup;

// JSON Quote string. Use native implementation when possible.
var JSONQuote = (JSON && JSON.stringify) || function(string) {
    json_escapable.lastIndex = 0;
    if (json_escapable.test(string)) {
        string = string.replace(json_escapable, function(a) {
            return json_lookup[a];
        });
    }
    return '"' + string + '"';
};

// This may be quite slow, so let's delay until user actually uses bad
// characters.
var unroll_lookup = function(escapable) {
    var i;
    var unrolled = {}
    var c = []
    for(i=0; i<65536; i++) {
        c.push( String.fromCharCode(i) );
    }
    escapable.lastIndex = 0;
    c.join('').replace(escapable, function (a) {
        unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
        return '';
    });
    escapable.lastIndex = 0;
    return unrolled;
};

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
//    http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
utils.quote = function(string) {
    var quoted = JSONQuote(string);

    // In most cases this should be very fast and good enough.
    extra_escapable.lastIndex = 0;
    if(!extra_escapable.test(quoted)) {
        return quoted;
    }

    if(!extra_lookup) extra_lookup = unroll_lookup(extra_escapable);

    return quoted.replace(extra_escapable, function(a) {
        return extra_lookup[a];
    });
}

var _all_protocols = ['websocket',
                      'xdr-streaming',
                      'xhr-streaming',
                      'iframe-eventsource',
                      'iframe-htmlfile',
                      'xdr-polling',
                      'xhr-polling',
                      'iframe-xhr-polling',
                      'jsonp-polling'];

utils.probeProtocols = function() {
    var probed = {};
    for(var i=0; i<_all_protocols.length; i++) {
        var protocol = _all_protocols[i];
        // User can have a typo in protocol name.
        probed[protocol] = SockJS[protocol] &&
                           SockJS[protocol].enabled();
    }
    return probed;
};

utils.detectProtocols = function(probed, protocols_whitelist, info) {
    var pe = {},
        protocols = [];
    if (!protocols_whitelist) protocols_whitelist = _all_protocols;
    for(var i=0; i<protocols_whitelist.length; i++) {
        var protocol = protocols_whitelist[i];
        pe[protocol] = probed[protocol];
    }
    var maybe_push = function(protos) {
        var proto = protos.shift();
        if (pe[proto]) {
            protocols.push(proto);
        } else {
            if (protos.length > 0) {
                maybe_push(protos);
            }
        }
    }

    // 1. Websocket
    if (info.websocket !== false) {
        maybe_push(['websocket']);
    }

    // 2. Streaming
    if (pe['xhr-streaming'] && !info.null_origin) {
        protocols.push('xhr-streaming');
    } else {
        if (pe['xdr-streaming'] && !info.cookie_needed && !info.null_origin) {
            protocols.push('xdr-streaming');
        } else {
            maybe_push(['iframe-eventsource',
                        'iframe-htmlfile']);
        }
    }

    // 3. Polling
    if (pe['xhr-polling'] && !info.null_origin) {
        protocols.push('xhr-polling');
    } else {
        if (pe['xdr-polling'] && !info.cookie_needed && !info.null_origin) {
            protocols.push('xdr-polling');
        } else {
            maybe_push(['iframe-xhr-polling',
                        'jsonp-polling']);
        }
    }
    return protocols;
}
//         [*] End of lib/utils.js


//         [*] Including lib/dom.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

// May be used by htmlfile jsonp and transports.
var MPrefix = '_sockjs_global';
utils.createHook = function() {
    var window_id = 'a' + utils.random_string(8);
    if (!(MPrefix in _window)) {
        var map = {};
        _window[MPrefix] = function(window_id) {
            if (!(window_id in map)) {
                map[window_id] = {
                    id: window_id,
                    del: function() {delete map[window_id];}
                };
            }
            return map[window_id];
        }
    }
    return _window[MPrefix](window_id);
};



utils.attachMessage = function(listener) {
    utils.attachEvent('message', listener);
};
utils.attachEvent = function(event, listener) {
    if (typeof _window.addEventListener !== 'undefined') {
        _window.addEventListener(event, listener, false);
    } else {
        // IE quirks.
        // According to: http://stevesouders.com/misc/test-postmessage.php
        // the message gets delivered only to 'document', not 'window'.
        _document.attachEvent("on" + event, listener);
        // I get 'window' for ie8.
        _window.attachEvent("on" + event, listener);
    }
};

utils.detachMessage = function(listener) {
    utils.detachEvent('message', listener);
};
utils.detachEvent = function(event, listener) {
    if (typeof _window.addEventListener !== 'undefined') {
        _window.removeEventListener(event, listener, false);
    } else {
        _document.detachEvent("on" + event, listener);
        _window.detachEvent("on" + event, listener);
    }
};


var on_unload = {};
// Things registered after beforeunload are to be called immediately.
var after_unload = false;

var trigger_unload_callbacks = function() {
    for(var ref in on_unload) {
        on_unload[ref]();
        delete on_unload[ref];
    };
};

var unload_triggered = function() {
    if(after_unload) return;
    after_unload = true;
    trigger_unload_callbacks();
};

// Onbeforeunload alone is not reliable. We could use only 'unload'
// but it's not working in opera within an iframe. Let's use both.
// ORTC - See sockjs-client issue #90
// utils.attachEvent('beforeunload', unload_triggered);
utils.attachEvent('unload', unload_triggered);

utils.unload_add = function(listener) {
    var ref = utils.random_string(8);
    on_unload[ref] = listener;
    if (after_unload) {
        utils.delay(trigger_unload_callbacks);
    }
    return ref;
};
utils.unload_del = function(ref) {
    if (ref in on_unload)
        delete on_unload[ref];
};


utils.createIframe = function (iframe_url, error_callback) {
    var iframe = _document.createElement('iframe');
    var tref, unload_ref;
    var unattach = function() {
        clearTimeout(tref);
        // Explorer had problems with that.
        try {iframe.onload = null;} catch (x) {}
        iframe.onerror = null;
    };
    var cleanup = function() {
        if (iframe) {
            unattach();
            // This timeout makes chrome fire onbeforeunload event
            // within iframe. Without the timeout it goes straight to
            // onunload.
            setTimeout(function() {
                if(iframe) {
                    iframe.parentNode.removeChild(iframe);
                }
                iframe = null;
            }, 0);
            utils.unload_del(unload_ref);
        }
    };
    var onerror = function(r) {
        if (iframe) {
            cleanup();
            error_callback(r);
        }
    };
    var post = function(msg, origin) {
        try {
            // When the iframe is not loaded, IE raises an exception
            // on 'contentWindow'.
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(msg, origin);
            }
        } catch (x) {};
    };

    iframe.src = iframe_url;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function(){onerror('onerror');};
    iframe.onload = function() {
        // `onload` is triggered before scripts on the iframe are
        // executed. Give it few seconds to actually load stuff.
        clearTimeout(tref);
        tref = setTimeout(function(){onerror('onload timeout');}, 2000);
    };
    _document.body.appendChild(iframe);
    tref = setTimeout(function(){onerror('timeout');}, 15000);
    unload_ref = utils.unload_add(cleanup);
    return {
        post: post,
        cleanup: cleanup,
        loaded: unattach
    };
};

utils.createHtmlfile = function (iframe_url, error_callback) {
    var doc = new ActiveXObject('htmlfile');
    var tref, unload_ref;
    var iframe;
    var unattach = function() {
        clearTimeout(tref);
    };
    var cleanup = function() {
        if (doc) {
            unattach();
            utils.unload_del(unload_ref);
            iframe.parentNode.removeChild(iframe);
            iframe = doc = null;
            CollectGarbage();
        }
    };
    var onerror = function(r)  {
        if (doc) {
            cleanup();
            error_callback(r);
        }
    };
    var post = function(msg, origin) {
        try {
            // When the iframe is not loaded, IE raises an exception
            // on 'contentWindow'.
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(msg, origin);
            }
        } catch (x) {};
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[WPrefix] = _window[WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframe_url;
    tref = setTimeout(function(){onerror('timeout');}, 15000);
    unload_ref = utils.unload_add(cleanup);
    return {
        post: post,
        cleanup: cleanup,
        loaded: unattach
    };
};
//         [*] End of lib/dom.js


//         [*] Including lib/dom2.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var AbstractXHRObject = function(){};
AbstractXHRObject.prototype = new EventEmitter(['chunk', 'finish']);

AbstractXHRObject.prototype._start = function(method, url, payload, opts) {
    var that = this;

    try {
        that.xhr = new XMLHttpRequest();
    } catch(x) {};

    if (!that.xhr) {
        try {
            that.xhr = new _window.ActiveXObject('Microsoft.XMLHTTP');
        } catch(x) {};
    }
    if (_window.ActiveXObject || _window.XDomainRequest) {
        // IE8 caches even POSTs
        url += ((url.indexOf('?') === -1) ? '?' : '&') + 't='+(+new Date);
    }

    // Explorer tends to keep connection open, even after the
    // tab gets closed: http://bugs.jquery.com/ticket/5280
    that.unload_ref = utils.unload_add(function(){that._cleanup(true);});
    try {
        that.xhr.open(method, url, true);
    } catch(e) {
        // IE raises an exception on wrong port.
        that.emit('finish', 0, '');
        that._cleanup();
        return;
    };

    if (!opts || !opts.no_credentials) {
        // Mozilla docs says https://developer.mozilla.org/en/XMLHttpRequest :
        // "This never affects same-site requests."
        that.xhr.withCredentials = 'true';
    }
    if (opts && opts.headers) {
        for(var key in opts.headers) {
            that.xhr.setRequestHeader(key, opts.headers[key]);
        }
    }

    that.xhr.onreadystatechange = function() {
        if (that.xhr) {
            var x = that.xhr;
            switch (x.readyState) {
            case 3:
                // IE doesn't like peeking into responseText or status
                // on Microsoft.XMLHTTP and readystate=3
                try {
                    var status = x.status;
                    var text = x.responseText;
                } catch (x) {};
                // IE does return readystate == 3 for 404 answers.
                if (text && text.length > 0) {
                    that.emit('chunk', status, text);
                }
                break;
            case 4:
                that.emit('finish', x.status, x.responseText);
                that._cleanup(false);
                break;
            }
        }
    };
    that.xhr.send(payload);
};

AbstractXHRObject.prototype._cleanup = function(abort) {
    var that = this;
    if (!that.xhr) return;
    utils.unload_del(that.unload_ref);

    // IE needs this field to be a function
    that.xhr.onreadystatechange = function(){};

    if (abort) {
        try {
            that.xhr.abort();
        } catch(x) {};
    }
    that.unload_ref = that.xhr = null;
};

AbstractXHRObject.prototype.close = function() {
    var that = this;
    that.nuke();
    that._cleanup(true);
};

var XHRCorsObject = utils.XHRCorsObject = function() {
    var that = this, args = arguments;
    utils.delay(function(){that._start.apply(that, args);});
};
XHRCorsObject.prototype = new AbstractXHRObject();

var XHRLocalObject = utils.XHRLocalObject = function(method, url, payload) {
    var that = this;
    utils.delay(function(){
        that._start(method, url, payload, {
            no_credentials: true
        });
    });
};
XHRLocalObject.prototype = new AbstractXHRObject();



// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx
var XDRObject = utils.XDRObject = function(method, url, payload) {
    var that = this;
    utils.delay(function(){that._start(method, url, payload);});
};
XDRObject.prototype = new EventEmitter(['chunk', 'finish']);
XDRObject.prototype._start = function(method, url, payload) {
    var that = this;
    var xdr = new XDomainRequest();
    // IE caches even POSTs
    url += ((url.indexOf('?') === -1) ? '?' : '&') + 't='+(+new Date);

    var onerror = xdr.ontimeout = xdr.onerror = function() {
        that.emit('finish', 0, '');
        that._cleanup(false);
    };
    xdr.onprogress = function() {
        that.emit('chunk', 200, xdr.responseText);
    };
    xdr.onload = function() {
        that.emit('finish', 200, xdr.responseText);
        that._cleanup(false);
    };
    that.xdr = xdr;
    that.unload_ref = utils.unload_add(function(){that._cleanup(true);});
    try {
        // Fails with AccessDenied if port number is bogus
        that.xdr.open(method, url);
        that.xdr.send(payload);
    } catch(x) {
        onerror();
    }
};

XDRObject.prototype._cleanup = function(abort) {
    var that = this;
    if (!that.xdr) return;
    utils.unload_del(that.unload_ref);

    that.xdr.ontimeout = that.xdr.onerror = that.xdr.onprogress =
        that.xdr.onload = null;
    if (abort) {
        try {
            that.xdr.abort();
        } catch(x) {};
    }
    that.unload_ref = that.xdr = null;
};

XDRObject.prototype.close = function() {
    var that = this;
    that.nuke();
    that._cleanup(true);
};

// 1. Is natively via XHR
// 2. Is natively via XDR
// 3. Nope, but postMessage is there so it should work via the Iframe.
// 4. Nope, sorry.
utils.isXHRCorsCapable = function() {
    if (_window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()) {
        return 1;
    }
    // XDomainRequest doesn't work if page is served from file://
    if (_window.XDomainRequest && _document.domain) {
        return 2;
    }
    if (IframeTransport.enabled()) {
        return 3;
    }
    return 4;
};
//         [*] End of lib/dom2.js


//         [*] Including lib/sockjs.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var SockJS = function(url, dep_protocols_whitelist, options) {
    var that = this, protocols_whitelist;
    that._options = {devel: false, debug: false, protocols_whitelist: [],
                     info: undefined, rtt: undefined};
    if (options) {
        utils.objectExtend(that._options, options);
    }
    that._base_url = utils.amendUrl(url);
    that._server = that._options.server || utils.random_number_string(1000);
    if (that._options.protocols_whitelist &&
        that._options.protocols_whitelist.length) {
        protocols_whitelist = that._options.protocols_whitelist;
    } else {
        // Deprecated API
        if (typeof dep_protocols_whitelist === 'string' &&
            dep_protocols_whitelist.length > 0) {
            protocols_whitelist = [dep_protocols_whitelist];
        } else if (utils.isArray(dep_protocols_whitelist)) {
            protocols_whitelist = dep_protocols_whitelist
        } else {
            protocols_whitelist = null;
        }
        if (protocols_whitelist) {
            that._debug('Deprecated API: Use "protocols_whitelist" option ' +
                        'instead of supplying protocol list as a second ' +
                        'parameter to SockJS constructor.');
        }
    }
    that._protocols = [];
    that.protocol = null;
    that.readyState = SockJS.CONNECTING;
    that._ir = createInfoReceiver(that._base_url);
    that._ir.onfinish = function(info, rtt) {
        that._ir = null;
        if (info) {
            if (that._options.info) {
                // Override if user supplies the option
                info = utils.objectExtend(info, that._options.info);
            }
            if (that._options.rtt) {
                rtt = that._options.rtt;
            }
            that._applyInfo(info, rtt, protocols_whitelist);
            that._didClose();
        } else {
            that._didClose(1002, 'Can\'t connect to server', true);
        }
    };
};
// Inheritance
SockJS.prototype = new REventTarget();

SockJS.version = "0.3.1";

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._debug = function() {
    if (this._options.debug)
        utils.log.apply(utils, arguments);
};

SockJS.prototype._dispatchOpen = function() {
    var that = this;
    if (that.readyState === SockJS.CONNECTING) {
        if (that._transport_tref) {
            clearTimeout(that._transport_tref);
            that._transport_tref = null;
        }
        that.readyState = SockJS.OPEN;
        that.dispatchEvent(new SimpleEvent("open"));
    } else {
        // The server might have been restarted, and lost track of our
        // connection.
        that._didClose(1006, "Server lost session");
    }
};

SockJS.prototype._dispatchMessage = function(data) {
    var that = this;
    if (that.readyState !== SockJS.OPEN)
            return;

// By ORTC
    data = JSON.parse(data);

    switch (data.op) {
        case "ortc-validated":
            that.dispatchEvent(new SimpleEvent("ortcvalidated", {data: data.up, set: data.set}));
            break;
        case "ortc-subscribed":
            that.dispatchEvent(new SimpleEvent("ortcsubscribed", {data: data.ch}));
            break;
        case "ortc-unsubscribed":
            that.dispatchEvent(new SimpleEvent("ortcunsubscribed", {data: data.ch}));
            break;
        case "ortc-error":
            that.dispatchEvent(new SimpleEvent("ortcerror", {data: data.ex}));
            break;
        case "ortc-ack":
            that.dispatchEvent(new SimpleEvent("ortcack", {msgId: data.m, msgPart: data.p, curSeq: data.seq, err: data.err}));
            break;
        default:
            that.dispatchEvent(new SimpleEvent("message", {data: data}));
            break;
    }

//    that.dispatchEvent(new SimpleEvent("message", {data: data}));
// End ORTC
};

SockJS.prototype._dispatchHeartbeat = function(data) {
    var that = this;
    if (that.readyState !== SockJS.OPEN)
        return;
    that.dispatchEvent(new SimpleEvent('heartbeat', {}));
};

SockJS.prototype._didClose = function(code, reason, force) {
    var that = this;
    if (that.readyState !== SockJS.CONNECTING &&
        that.readyState !== SockJS.OPEN &&
        that.readyState !== SockJS.CLOSING)
            throw new Error('INVALID_STATE_ERR');
    if (that._ir) {
        that._ir.nuke();
        that._ir = null;
    }

    if (that._transport) {
        that._transport.doCleanup();
        that._transport = null;
    }

    var close_event = new SimpleEvent("close", {
        code: code,
        reason: reason,
        wasClean: utils.userSetCode(code)});

    if (!utils.userSetCode(code) &&
        that.readyState === SockJS.CONNECTING && !force) {
        if (that._try_next_protocol(close_event)) {
            return;
        }
        close_event = new SimpleEvent("close", {code: 2000,
                                                reason: "All transports failed",
                                                wasClean: false,
                                                last_event: close_event});
    }
    that.readyState = SockJS.CLOSED;

    utils.delay(function() {
                   that.dispatchEvent(close_event);
                });
};

SockJS.prototype._didMessage = function(data) {
    var that = this;
    var type = data.slice(0, 1);
    switch(type) {
    case 'o':
        that._dispatchOpen();
        break;
    case 'a':
        var payload = JSON.parse(data.slice(1) || '[]');
        for(var i=0; i < payload.length; i++){
            that._dispatchMessage(payload[i]);
        }
        break;
    case 'm':
        var payload = JSON.parse(data.slice(1) || 'null');
        that._dispatchMessage(payload);
        break;
    case 'c':
        var payload = JSON.parse(data.slice(1) || '[]');
        that._didClose(payload[0], payload[1]);
        break;
    case 'h':
        that._dispatchHeartbeat();
        break;
    }
};

SockJS.prototype._try_next_protocol = function(close_event) {
    var that = this;
    if (that.protocol) {
        that._debug('Closed transport:', that.protocol, ''+close_event);
        that.protocol = null;
    }
    if (that._transport_tref) {
        clearTimeout(that._transport_tref);
        that._transport_tref = null;
    }

    while(1) {
        var protocol = that.protocol = that._protocols.shift();
        if (!protocol) {
            return false;
        }
        // Some protocols require access to `body`, what if were in
        // the `head`?
        if (SockJS[protocol] &&
            SockJS[protocol].need_body === true &&
            (!_document.body ||
             (typeof _document.readyState !== 'undefined'
              && _document.readyState !== 'complete'))) {
            that._protocols.unshift(protocol);
            that.protocol = 'waiting-for-load';
            utils.attachEvent('load', function(){
                that._try_next_protocol();
            });
            return true;
        }

        if (!SockJS[protocol] ||
              !SockJS[protocol].enabled(that._options)) {
            that._debug('Skipping transport:', protocol);
        } else {
            var roundTrips = SockJS[protocol].roundTrips || 1;
            var to = ((that._options.rto || 0) * roundTrips) || 5000;
            that._transport_tref = utils.delay(to, function() {
                if (that.readyState === SockJS.CONNECTING) {
                    // I can't understand how it is possible to run
                    // this timer, when the state is CLOSED, but
                    // apparently in IE everythin is possible.
                    that._didClose(2007, "Transport timeouted");
                }
            });

            var connid = utils.random_string(8);
            var trans_url = that._base_url + '/' + that._server + '/' + connid;
            that._debug('Opening transport:', protocol, ' url:'+trans_url,
                        ' RTO:'+that._options.rto);
            that._transport = new SockJS[protocol](that, trans_url,
                                                   that._base_url);
            return true;
        }
    }
};

SockJS.prototype.close = function(code, reason) {
    var that = this;
    if (code && !utils.userSetCode(code))
        throw new Error("INVALID_ACCESS_ERR");
    if(that.readyState !== SockJS.CONNECTING &&
       that.readyState !== SockJS.OPEN) {
        return false;
    }
    that.readyState = SockJS.CLOSING;
    that._didClose(code || 1000, reason || "Normal closure");
    return true;
};

SockJS.prototype.send = function(data) {
    var that = this;
    if (that.readyState === SockJS.CONNECTING)
        throw new Error('INVALID_STATE_ERR');
    if (that.readyState === SockJS.OPEN) {
        that._transport.doSend(utils.quote('' + data));
    }
    return true;
};

SockJS.prototype._applyInfo = function(info, rtt, protocols_whitelist) {
    var that = this;
    that._options.info = info;
    that._options.rtt = rtt;
    that._options.rto = utils.countRTO(rtt);
    that._options.info.null_origin = !_document.domain;
    var probed = utils.probeProtocols();
    that._protocols = utils.detectProtocols(probed, protocols_whitelist, info);
};
//         [*] End of lib/sockjs.js


//         [*] Including lib/trans-websocket.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var WebSocketTransport = SockJS.websocket = function(ri, trans_url) {
    var that = this;
    var url = trans_url + '/websocket';
    if (url.slice(0, 5) === 'https') {
        url = 'wss' + url.slice(5);
    } else {
        url = 'ws' + url.slice(4);
    }
    that.ri = ri;
    that.url = url;
    var Constructor = _window.WebSocket || _window.MozWebSocket;

    that.ws = new Constructor(that.url);
    that.ws.onmessage = function(e) {
        that.ri._didMessage(e.data);
    };
    // Firefox has an interesting bug. If a websocket connection is
    // created after onbeforeunload, it stays alive even when user
    // navigates away from the page. In such situation let's lie -
    // let's not open the ws connection at all. See:
    // https://github.com/sockjs/sockjs-client/issues/28
    // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
    that.unload_ref = utils.unload_add(function(){that.ws.close()});
    that.ws.onclose = function() {
        that.ri._didMessage(utils.closeFrame(1006, "WebSocket connection broken"));
    };
};

WebSocketTransport.prototype.doSend = function(data) {
    this.ws.send('[' + data + ']');
};

WebSocketTransport.prototype.doCleanup = function() {
    var that = this;
    var ws = that.ws;
    if (ws) {
        ws.onmessage = ws.onclose = null;
        ws.close();
        utils.unload_del(that.unload_ref);
        that.unload_ref = that.ri = that.ws = null;
    }
};

WebSocketTransport.enabled = function() {
    return !!(_window.WebSocket || _window.MozWebSocket);
};

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;
//         [*] End of lib/trans-websocket.js


//         [*] Including lib/trans-sender.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var BufferedSender = function() {};
BufferedSender.prototype.send_constructor = function(sender) {
    var that = this;
    that.send_buffer = [];
    that.sender = sender;
};
BufferedSender.prototype.doSend = function(message) {
    var that = this;
    that.send_buffer.push(message);
    if (!that.send_stop) {
        that.send_schedule();
    }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.send_schedule_wait = function() {
    var that = this;
    var tref;
    that.send_stop = function() {
        that.send_stop = null;
        clearTimeout(tref);
    };
    tref = utils.delay(25, function() {
        that.send_stop = null;
        that.send_schedule();
    });
};

BufferedSender.prototype.send_schedule = function() {
    var that = this;
    if (that.send_buffer.length > 0) {
        var payload = '[' + that.send_buffer.join(',') + ']';
        that.send_stop = that.sender(that.trans_url,
                                     payload,
                                     function() {
                                         that.send_stop = null;
                                         that.send_schedule_wait();
                                     });
        that.send_buffer = [];
    }
};

BufferedSender.prototype.send_destructor = function() {
    var that = this;
    if (that._send_stop) {
        that._send_stop();
    }
    that._send_stop = null;
};

var jsonPGenericSender = function(url, payload, callback) {
    var that = this;

    if (!('_send_form' in that)) {
        var form = that._send_form = _document.createElement('form');
        var area = that._send_area = _document.createElement('textarea');
        area.name = 'd';
        form.style.display = 'none';
        form.style.position = 'absolute';
        form.method = 'POST';
        form.enctype = 'application/x-www-form-urlencoded';
        form.acceptCharset = "UTF-8";
        form.appendChild(area);
        _document.body.appendChild(form);
    }
    var form = that._send_form;
    var area = that._send_area;
    var id = 'a' + utils.random_string(8);
    form.target = id;
    form.action = url + '/jsonp_send?i=' + id;

    var iframe;
    try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        iframe = _document.createElement('<iframe name="'+ id +'">');
    } catch(x) {
        iframe = _document.createElement('iframe');
        iframe.name = id;
    }
    iframe.id = id;
    form.appendChild(iframe);
    iframe.style.display = 'none';

    try {
        area.value = payload;
    } catch(e) {
        utils.log('Your browser is seriously broken. Go home! ' + e.message);
    }
    form.submit();

    var completed = function(e) {
        if (!iframe.onerror) return;
        iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
        // Opera mini doesn't like if we GC iframe
        // immediately, thus this timeout.
        utils.delay(500, function() {
                       iframe.parentNode.removeChild(iframe);
                       iframe = null;
                   });
        area.value = '';
        callback();
    };
    iframe.onerror = iframe.onload = completed;
    iframe.onreadystatechange = function(e) {
        if (iframe.readyState == 'complete') completed();
    };
    return completed;
};

var createAjaxSender = function(AjaxObject) {
    return function(url, payload, callback) {
        var xo = new AjaxObject('POST', url + '/xhr_send', payload);
        xo.onfinish = function(status, text) {
            callback(status);
        };
        return function(abort_reason) {
            callback(0, abort_reason);
        };
    };
};
//         [*] End of lib/trans-sender.js


//         [*] Including lib/trans-jsonp-receiver.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

// Parts derived from Socket.io:
//    https://github.com/LearnBoost/socket.io/blob/0.6.17/lib/socket.io/transports/jsonp-polling.js
// and jQuery-JSONP:
//    https://code.google.com/p/jquery-jsonp/source/browse/trunk/core/jquery.jsonp.js
var jsonPGenericReceiver = function(url, callback) {
    var tref;
    var script = _document.createElement('script');
    var script2;  // Opera synchronous load trick.
    var close_script = function(frame) {
        if (script2) {
            script2.parentNode.removeChild(script2);
            script2 = null;
        }
        if (script) {
            clearTimeout(tref);
            script.parentNode.removeChild(script);
            script.onreadystatechange = script.onerror =
                script.onload = script.onclick = null;
            script = null;
            callback(frame);
            callback = null;
        }
    };

    // IE9 fires 'error' event after orsc or before, in random order.
    var loaded_okay = false;
    var error_timer = null;

    script.id = 'a' + utils.random_string(8);
    script.src = url;
    script.type = 'text/javascript';
    script.charset = 'UTF-8';
    script.onerror = function(e) {
        if (!error_timer) {
            // Delay firing close_script.
            error_timer = setTimeout(function() {
                if (!loaded_okay) {
                    close_script(utils.closeFrame(
                        1006,
                        "JSONP script loaded abnormally (onerror)"));
                }
            }, 1000);
        }
    };
    script.onload = function(e) {
        close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (onload)"));
    };

    script.onreadystatechange = function(e) {
        if (/loaded|closed/.test(script.readyState)) {
            if (script && script.htmlFor && script.onclick) {
                loaded_okay = true;
                try {
                    // In IE, actually execute the script.
                    script.onclick();
                } catch (x) {}
            }
            if (script) {
                close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (onreadystatechange)"));
            }
        }
    };
    // IE: event/htmlFor/onclick trick.
    // One can't rely on proper order for onreadystatechange. In order to
    // make sure, set a 'htmlFor' and 'event' properties, so that
    // script code will be installed as 'onclick' handler for the
    // script object. Later, onreadystatechange, manually execute this
    // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
    // set. For reference see:
    //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
    // Also, read on that about script ordering:
    //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
    if (typeof script.async === 'undefined' && _document.attachEvent) {
        // According to mozilla docs, in recent browsers script.async defaults
        // to 'true', so we may use it to detect a good browser:
        // https://developer.mozilla.org/en/HTML/Element/script
        if (!/opera/i.test(navigator.userAgent)) {
            // Naively assume we're in IE
            try {
                script.htmlFor = script.id;
                script.event = "onclick";
            } catch (x) {}
            script.async = true;
        } else {
            // Opera, second sync script hack
            script2 = _document.createElement('script');
            script2.text = "try{var a = document.getElementById('"+script.id+"'); if(a)a.onerror();}catch(x){};";
            script.async = script2.async = false;
        }
    }
    if (typeof script.async !== 'undefined') {
        script.async = true;
    }

    // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
    tref = setTimeout(function() {
                          close_script(utils.closeFrame(1006, "JSONP script loaded abnormally (timeout)"));
                      }, 35000);

    var head = _document.getElementsByTagName('head')[0];
    head.insertBefore(script, head.firstChild);
    if (script2) {
        head.insertBefore(script2, head.firstChild);
    }
    return close_script;
};
//         [*] End of lib/trans-jsonp-receiver.js


//         [*] Including lib/trans-jsonp-polling.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// mssage could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors


var JsonPTransport = SockJS['jsonp-polling'] = function(ri, trans_url) {
    utils.polluteGlobalNamespace();
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(jsonPGenericSender);
    that._schedule_recv();
};

// Inheritnace
JsonPTransport.prototype = new BufferedSender();

JsonPTransport.prototype._schedule_recv = function() {
    var that = this;
    var callback = function(data) {
        that._recv_stop = null;
        if (data) {
            // no data - heartbeat;
            if (!that._is_closing) {
                that.ri._didMessage(data);
            }
        }
        // The message can be a close message, and change is_closing state.
        if (!that._is_closing) {
            that._schedule_recv();
        }
    };
    that._recv_stop = jsonPReceiverWrapper(that.trans_url + '/jsonp',
                                           jsonPGenericReceiver, callback);
};

JsonPTransport.enabled = function() {
    return true;
};

JsonPTransport.need_body = true;


JsonPTransport.prototype.doCleanup = function() {
    var that = this;
    that._is_closing = true;
    if (that._recv_stop) {
        that._recv_stop();
    }
    that.ri = that._recv_stop = null;
    that.send_destructor();
};


// Abstract away code that handles global namespace pollution.
var jsonPReceiverWrapper = function(url, constructReceiver, user_callback) {
    var id = 'a' + utils.random_string(6);
    var url_id = url + '?c=' + escape(WPrefix + '.' + id);
    // Callback will be called exactly once.
    var callback = function(frame) {
        delete _window[WPrefix][id];
        user_callback(frame);
    };

    var close_script = constructReceiver(url_id, callback);
    _window[WPrefix][id] = close_script;
    var stop = function() {
        if (_window[WPrefix][id]) {
            _window[WPrefix][id](utils.closeFrame(1000, "JSONP user aborted read"));
        }
    };
    return stop;
};
//         [*] End of lib/trans-jsonp-polling.js


//         [*] Including lib/trans-xhr.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var AjaxBasedTransport = function() {};
AjaxBasedTransport.prototype = new BufferedSender();

AjaxBasedTransport.prototype.run = function(ri, trans_url,
                                            url_suffix, Receiver, AjaxObject) {
    var that = this;
    that.ri = ri;
    that.trans_url = trans_url;
    that.send_constructor(createAjaxSender(AjaxObject));
    that.poll = new Polling(ri, Receiver,
                            trans_url + url_suffix, AjaxObject);
};

AjaxBasedTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.poll) {
        that.poll.abort();
        that.poll = null;
    }
};

// xhr-streaming
var XhrStreamingTransport = SockJS['xhr-streaming'] = function(ri, trans_url) {
    this.run(ri, trans_url, '/xhr_streaming', XhrReceiver, utils.XHRCorsObject);
};

XhrStreamingTransport.prototype = new AjaxBasedTransport();

XhrStreamingTransport.enabled = function() {
    // Support for CORS Ajax aka Ajax2? Opera 12 claims CORS but
    // doesn't do streaming.
    return (_window.XMLHttpRequest &&
            'withCredentials' in new XMLHttpRequest() &&
            (!/opera/i.test(navigator.userAgent)));
};
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
XhrStreamingTransport.need_body = true;


// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/


// xdr-streaming
var XdrStreamingTransport = SockJS['xdr-streaming'] = function(ri, trans_url) {
    this.run(ri, trans_url, '/xhr_streaming', XhrReceiver, utils.XDRObject);
};

XdrStreamingTransport.prototype = new AjaxBasedTransport();

XdrStreamingTransport.enabled = function() {
    return !!_window.XDomainRequest;
};
XdrStreamingTransport.roundTrips = 2; // preflight, ajax



// xhr-polling
var XhrPollingTransport = SockJS['xhr-polling'] = function(ri, trans_url) {
    this.run(ri, trans_url, '/xhr', XhrReceiver, utils.XHRCorsObject);
};

XhrPollingTransport.prototype = new AjaxBasedTransport();

XhrPollingTransport.enabled = XhrStreamingTransport.enabled;
XhrPollingTransport.roundTrips = 2; // preflight, ajax


// xdr-polling
var XdrPollingTransport = SockJS['xdr-polling'] = function(ri, trans_url) {
    this.run(ri, trans_url, '/xhr', XhrReceiver, utils.XDRObject);
};

XdrPollingTransport.prototype = new AjaxBasedTransport();

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.roundTrips = 2; // preflight, ajax
//         [*] End of lib/trans-xhr.js


//         [*] Including lib/trans-iframe.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

// Few cool transports do work only for same-origin. In order to make
// them working cross-domain we shall use iframe, served form the
// remote domain. New browsers, have capabilities to communicate with
// cross domain iframe, using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var IframeTransport = function() {};

IframeTransport.prototype.i_constructor = function(ri, trans_url, base_url) {
    var that = this;
    that.ri = ri;
    that.origin = utils.getOrigin(base_url);
    that.base_url = base_url;
    that.trans_url = trans_url;

    var iframe_url = base_url + '/iframe.html';
    if (that.ri._options.devel) {
        iframe_url += '?t=' + (+new Date);
    }
    that.window_id = utils.random_string(8);
    iframe_url += '#' + that.window_id;

    that.iframeObj = utils.createIframe(iframe_url, function(r) {
                                            that.ri._didClose(1006, "Unable to load an iframe (" + r + ")");
                                        });

    that.onmessage_cb = utils.bind(that.onmessage, that);
    utils.attachMessage(that.onmessage_cb);
};

IframeTransport.prototype.doCleanup = function() {
    var that = this;
    if (that.iframeObj) {
        utils.detachMessage(that.onmessage_cb);
        try {
            // When the iframe is not loaded, IE raises an exception
            // on 'contentWindow'.
            if (that.iframeObj.iframe.contentWindow) {
                that.postMessage('c');
            }
        } catch (x) {}
        that.iframeObj.cleanup();
        that.iframeObj = null;
        that.onmessage_cb = that.iframeObj = null;
    }
};

IframeTransport.prototype.onmessage = function(e) {
    var that = this;
    if (e.origin !== that.origin) return;
    var window_id = e.data.slice(0, 8);
    var type = e.data.slice(8, 9);
    var data = e.data.slice(9);

    if (window_id !== that.window_id) return;

    switch(type) {
    case 's':
        that.iframeObj.loaded();
        that.postMessage('s', JSON.stringify([SockJS.version, that.protocol, that.trans_url, that.base_url]));
        break;
    case 't':
        that.ri._didMessage(data);
        break;
    }
};

IframeTransport.prototype.postMessage = function(type, data) {
    var that = this;
    that.iframeObj.post(that.window_id + type + (data || ''), that.origin);
};

IframeTransport.prototype.doSend = function (message) {
    this.postMessage('m', message);
};

IframeTransport.enabled = function() {
    // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
    // huge delay, or not at all.
    var konqueror = navigator && navigator.userAgent && navigator.userAgent.indexOf('Konqueror') !== -1;
    return ((typeof _window.postMessage === 'function' ||
            typeof _window.postMessage === 'object') && (!konqueror));
};
//         [*] End of lib/trans-iframe.js


//         [*] Including lib/trans-iframe-within.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var curr_window_id;

var postMessage = function (type, data) {
    if(parent !== _window) {
        parent.postMessage(curr_window_id + type + (data || ''), '*');
    } else {
        utils.log("Can't postMessage, no parent window.", type, data);
    }
};

var FacadeJS = function() {};
FacadeJS.prototype._didClose = function (code, reason) {
    postMessage('t', utils.closeFrame(code, reason));
};
FacadeJS.prototype._didMessage = function (frame) {
    postMessage('t', frame);
};
FacadeJS.prototype._doSend = function (data) {
    this._transport.doSend(data);
};
FacadeJS.prototype._doCleanup = function () {
    this._transport.doCleanup();
};

utils.parent_origin = undefined;

SockJS.bootstrap_iframe = function() {
    var facade;
    curr_window_id = _document.location.hash.slice(1);
    var onMessage = function(e) {
        if(e.source !== parent) return;
        if(typeof utils.parent_origin === 'undefined')
            utils.parent_origin = e.origin;
        if (e.origin !== utils.parent_origin) return;

        var window_id = e.data.slice(0, 8);
        var type = e.data.slice(8, 9);
        var data = e.data.slice(9);
        if (window_id !== curr_window_id) return;
        switch(type) {
        case 's':
            var p = JSON.parse(data);
            var version = p[0];
            var protocol = p[1];
            var trans_url = p[2];
            var base_url = p[3];
            if (version !== SockJS.version) {
                utils.log("Incompatibile SockJS! Main site uses:" +
                          " \"" + version + "\", the iframe:" +
                          " \"" + SockJS.version + "\".");
            }
            if (!utils.flatUrl(trans_url) || !utils.flatUrl(base_url)) {
                utils.log("Only basic urls are supported in SockJS");
                return;
            }

            if (!utils.isSameOriginUrl(trans_url) ||
                !utils.isSameOriginUrl(base_url)) {
                utils.log("Can't connect to different domain from within an " +
                          "iframe. (" + JSON.stringify([_window.location.href, trans_url, base_url]) +
                          ")");
                return;
            }
            facade = new FacadeJS();
            facade._transport = new FacadeJS[protocol](facade, trans_url, base_url);
            break;
        case 'm':
            facade._doSend(data);
            break;
        case 'c':
            if (facade)
                facade._doCleanup();
            facade = null;
            break;
        }
    };

    // alert('test ticker');
    // facade = new FacadeJS();
    // facade._transport = new FacadeJS['w-iframe-xhr-polling'](facade, 'http://host.com:9999/ticker/12/basd');

    utils.attachMessage(onMessage);

    // Start
    postMessage('s');
};
//         [*] End of lib/trans-iframe-within.js


//         [*] Including lib/info.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var InfoReceiver = function(base_url, AjaxObject) {
    var that = this;
    utils.delay(function(){that.doXhr(base_url, AjaxObject);});
};

InfoReceiver.prototype = new EventEmitter(['finish']);

InfoReceiver.prototype.doXhr = function(base_url, AjaxObject) {
    var that = this;

    //BY ORTC

    //var t0 = (new Date()).getTime();
    //var xo = new AjaxObject('GET', base_url + '/info');

    //var tref = utils.delay(8000,
    //                       function(){xo.ontimeout();});

    //xo.onfinish = function(status, text) {
    //    clearTimeout(tref);
    //    tref = null;
    //    if (status === 200) {
            var rtt = 5000; //(new Date()).getTime() - t0;
            var info = {"websocket":true,
                        "origins":["*:*"],
                        "cookie_needed":false,
                        "entropy":(+new Date())}; //JSON.parse(text);
            //if (typeof info !== 'object') info = {};
            that.emit('finish', info, rtt);
        //} else {
        //    that.emit('finish');
        //}
    //};
    //xo.ontimeout = function() {
    //    xo.close();
    //    that.emit('finish');
    //};
    //END BY ORTC

};

var InfoReceiverIframe = function(base_url) {
    var that = this;
    var go = function() {
        var ifr = new IframeTransport();
        ifr.protocol = 'w-iframe-info-receiver';
        var fun = function(r) {
            if (typeof r === 'string' && r.substr(0,1) === 'm') {
                var d = JSON.parse(r.substr(1));
                var info = d[0], rtt = d[1];
                that.emit('finish', info, rtt);
            } else {
                that.emit('finish');
            }
            ifr.doCleanup();
            ifr = null;
        };
        var mock_ri = {
            _options: {},
            _didClose: fun,
            _didMessage: fun
        };
        ifr.i_constructor(mock_ri, base_url, base_url);
    }
    if(!_document.body) {
        utils.attachEvent('load', go);
    } else {
        go();
    }
};
InfoReceiverIframe.prototype = new EventEmitter(['finish']);


var InfoReceiverFake = function() {
    // It may not be possible to do cross domain AJAX to get the info
    // data, for example for IE7. But we want to run JSONP, so let's
    // fake the response, with rtt=2s (rto=6s).
    var that = this;
    utils.delay(function() {
        // By ORTC
        //that.emit('finish', {}, 2000);
        that.emit('finish', {}, 5000);
        // End ORTC
    });
};
InfoReceiverFake.prototype = new EventEmitter(['finish']);

var createInfoReceiver = function(base_url) {
    if (utils.isSameOriginUrl(base_url)) {
        // If, for some reason, we have SockJS locally - there's no
        // need to start up the complex machinery. Just use ajax.
        return new InfoReceiver(base_url, utils.XHRLocalObject);
    }
    switch (utils.isXHRCorsCapable()) {
    case 1:
        return new InfoReceiver(base_url, utils.XHRCorsObject);
    case 2:
        return new InfoReceiver(base_url, utils.XDRObject);
    case 3:
        // Opera
        return new InfoReceiverIframe(base_url);
    default:
        // IE 7
        return new InfoReceiverFake();
    };
};


var WInfoReceiverIframe = FacadeJS['w-iframe-info-receiver'] = function(ri, _trans_url, base_url) {
    var ir = new InfoReceiver(base_url, utils.XHRLocalObject);
    ir.onfinish = function(info, rtt) {
        ri._didMessage('m'+JSON.stringify([info, rtt]));
        ri._didClose();
    }
};
WInfoReceiverIframe.prototype.doCleanup = function() {};
//         [*] End of lib/info.js


//         [*] Including lib/trans-iframe-eventsource.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var EventSourceIframeTransport = SockJS['iframe-eventsource'] = function () {
    var that = this;
    that.protocol = 'w-iframe-eventsource';
    that.i_constructor.apply(that, arguments);
};

EventSourceIframeTransport.prototype = new IframeTransport();

EventSourceIframeTransport.enabled = function () {
    return ('EventSource' in _window) && IframeTransport.enabled();
};

EventSourceIframeTransport.need_body = true;
EventSourceIframeTransport.roundTrips = 3; // html, javascript, eventsource


// w-iframe-eventsource
var EventSourceTransport = FacadeJS['w-iframe-eventsource'] = function(ri, trans_url) {
    this.run(ri, trans_url, '/eventsource', EventSourceReceiver, utils.XHRLocalObject);
}
EventSourceTransport.prototype = new AjaxBasedTransport();
//         [*] End of lib/trans-iframe-eventsource.js


//         [*] Including lib/trans-iframe-xhr-polling.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var XhrPollingIframeTransport = SockJS['iframe-xhr-polling'] = function () {
    var that = this;
    that.protocol = 'w-iframe-xhr-polling';
    that.i_constructor.apply(that, arguments);
};

XhrPollingIframeTransport.prototype = new IframeTransport();

XhrPollingIframeTransport.enabled = function () {
    return _window.XMLHttpRequest && IframeTransport.enabled();
};

XhrPollingIframeTransport.need_body = true;
XhrPollingIframeTransport.roundTrips = 3; // html, javascript, xhr


// w-iframe-xhr-polling
var XhrPollingITransport = FacadeJS['w-iframe-xhr-polling'] = function(ri, trans_url) {
    this.run(ri, trans_url, '/xhr', XhrReceiver, utils.XHRLocalObject);
};

XhrPollingITransport.prototype = new AjaxBasedTransport();
//         [*] End of lib/trans-iframe-xhr-polling.js


//         [*] Including lib/trans-iframe-htmlfile.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

// This transport generally works in any browser, but will cause a
// spinning cursor to appear in any browser other than IE.
// We may test this transport in all browsers - why not, but in
// production it should be only run in IE.

var HtmlFileIframeTransport = SockJS['iframe-htmlfile'] = function () {
    var that = this;
    that.protocol = 'w-iframe-htmlfile';
    that.i_constructor.apply(that, arguments);
};

// Inheritance.
HtmlFileIframeTransport.prototype = new IframeTransport();

HtmlFileIframeTransport.enabled = function() {
    return IframeTransport.enabled();
};

HtmlFileIframeTransport.need_body = true;
HtmlFileIframeTransport.roundTrips = 3; // html, javascript, htmlfile


// w-iframe-htmlfile
var HtmlFileTransport = FacadeJS['w-iframe-htmlfile'] = function(ri, trans_url) {
    this.run(ri, trans_url, '/htmlfile', HtmlfileReceiver, utils.XHRLocalObject);
};
HtmlFileTransport.prototype = new AjaxBasedTransport();
//         [*] End of lib/trans-iframe-htmlfile.js


//         [*] Including lib/trans-polling.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var Polling = function(ri, Receiver, recv_url, AjaxObject) {
    var that = this;
    that.ri = ri;
    that.Receiver = Receiver;
    that.recv_url = recv_url;
    that.AjaxObject = AjaxObject;
    that._scheduleRecv();
};

Polling.prototype._scheduleRecv = function() {
    var that = this;
    var poll = that.poll = new that.Receiver(that.recv_url, that.AjaxObject);
    var msg_counter = 0;
    poll.onmessage = function(e) {
        msg_counter += 1;
        that.ri._didMessage(e.data);
    };
    poll.onclose = function(e) {
        that.poll = poll = poll.onmessage = poll.onclose = null;
        if (!that.poll_is_closing) {
            if (e.reason === 'permanent') {
                that.ri._didClose(1006, 'Polling error (' + e.reason + ')');
            } else {
                that._scheduleRecv();
            }
        }
    };
};

Polling.prototype.abort = function() {
    var that = this;
    that.poll_is_closing = true;
    if (that.poll) {
        that.poll.abort();
    }
};
//         [*] End of lib/trans-polling.js


//         [*] Including lib/trans-receiver-eventsource.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var EventSourceReceiver = function(url) {
    var that = this;
    var es = new EventSource(url);
    es.onmessage = function(e) {
        that.dispatchEvent(new SimpleEvent('message',
                                           {'data': unescape(e.data)}));
    };
    that.es_close = es.onerror = function(e, abort_reason) {
        // ES on reconnection has readyState = 0 or 1.
        // on network error it's CLOSED = 2
        var reason = abort_reason ? 'user' :
            (es.readyState !== 2 ? 'network' : 'permanent');
        that.es_close = es.onmessage = es.onerror = null;
        // EventSource reconnects automatically.
        es.close();
        es = null;
        // Safari and chrome < 15 crash if we close window before
        // waiting for ES cleanup. See:
        //   https://code.google.com/p/chromium/issues/detail?id=89155
        utils.delay(200, function() {
                        that.dispatchEvent(new SimpleEvent('close', {reason: reason}));
                    });
    };
};

EventSourceReceiver.prototype = new REventTarget();

EventSourceReceiver.prototype.abort = function() {
    var that = this;
    if (that.es_close) {
        that.es_close({}, true);
    }
};
//         [*] End of lib/trans-receiver-eventsource.js


//         [*] Including lib/trans-receiver-htmlfile.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var _is_ie_htmlfile_capable;
var isIeHtmlfileCapable = function() {
    if (_is_ie_htmlfile_capable === undefined) {
        if ('ActiveXObject' in _window) {
            try {
                _is_ie_htmlfile_capable = !!new ActiveXObject('htmlfile');
            } catch (x) {}
        } else {
            _is_ie_htmlfile_capable = false;
        }
    }
    return _is_ie_htmlfile_capable;
};


var HtmlfileReceiver = function(url) {
    var that = this;
    utils.polluteGlobalNamespace();

    that.id = 'a' + utils.random_string(6, 26);
    url += ((url.indexOf('?') === -1) ? '?' : '&') +
        'c=' + escape(WPrefix + '.' + that.id);

    var constructor = isIeHtmlfileCapable() ?
        utils.createHtmlfile : utils.createIframe;

    var iframeObj;
    _window[WPrefix][that.id] = {
        start: function () {
            iframeObj.loaded();
        },
        message: function (data) {
            that.dispatchEvent(new SimpleEvent('message', {'data': data}));
        },
        stop: function () {
            that.iframe_close({}, 'network');
        }
    };
    that.iframe_close = function(e, abort_reason) {
        iframeObj.cleanup();
        that.iframe_close = iframeObj = null;
        delete _window[WPrefix][that.id];
        that.dispatchEvent(new SimpleEvent('close', {reason: abort_reason}));
    };
    iframeObj = constructor(url, function(e) {
                                that.iframe_close({}, 'permanent');
                            });
};

HtmlfileReceiver.prototype = new REventTarget();

HtmlfileReceiver.prototype.abort = function() {
    var that = this;
    if (that.iframe_close) {
        that.iframe_close({}, 'user');
    }
};
//         [*] End of lib/trans-receiver-htmlfile.js


//         [*] Including lib/trans-receiver-xhr.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

var XhrReceiver = function(url, AjaxObject) {
    var that = this;
    var buf_pos = 0;

    that.xo = new AjaxObject('POST', url, null);
    that.xo.onchunk = function(status, text) {
        if (status !== 200) return;
        while (1) {
            var buf = text.slice(buf_pos);
            var p = buf.indexOf('\n');
            if (p === -1) break;
            buf_pos += p+1;
            var msg = buf.slice(0, p);
            that.dispatchEvent(new SimpleEvent('message', {data: msg}));
        }
    };
    that.xo.onfinish = function(status, text) {
        that.xo.onchunk(status, text);
        that.xo = null;
        var reason = status === 200 ? 'network' : 'permanent';
        that.dispatchEvent(new SimpleEvent('close', {reason: reason}));
    }
};

XhrReceiver.prototype = new REventTarget();

XhrReceiver.prototype.abort = function() {
    var that = this;
    if (that.xo) {
        that.xo.close();
        that.dispatchEvent(new SimpleEvent('close', {reason: 'user'}));
        that.xo = null;
    }
};
//         [*] End of lib/trans-receiver-xhr.js


//         [*] Including lib/test-hooks.js
/*
 * ***** BEGIN LICENSE BLOCK *****
 * Copyright (c) 2011-2012 VMware, Inc.
 *
 * For the license see COPYING.
 * ***** END LICENSE BLOCK *****
 */

// For testing
SockJS.getUtils = function(){
    return utils;
};

SockJS.getIframeTransport = function(){
    return IframeTransport;
};
//         [*] End of lib/test-hooks.js

                  return SockJS;
          })();
if ('_sockjs_onload' in window) setTimeout(_sockjs_onload, 1);

// AMD compliance
if (typeof define === 'function' && define.amd) {
    define('sockjs', [], function(){return SockJS;});
}
//     [*] End of lib/index.js

// [*] End of lib/all.js

//=====================IbtRealTimeSJCore.js============================

//=====================IbtRealTimeSJ.js============================

/**********************************************************
* API IbtRealTimeSJ.js
***********************************************************/

/*
* Initializes a new instance of the IbtRealTimeSJ class.
*/
function IbtRealTimeSJ() {

    /***********************************************************
    * @attributes
    ***********************************************************/

    var appKey;                     // application key
    var authToken;                  // authentication token
    var clusterUrl;                 // cluster URL to connect
    var waitingClusterResponse;     // indicates whether is waiting for a cluster response
    var connectionTimeout;          // connection timeout in milliseconds
    var messageMaxSize;             // message maximum size in bytes
    var channelMaxSize;             // channel maximum size in bytes
    var channelsMaxSize             // maximum of channels for batchSend
    var messagesBuffer;             // buffer to hold the message parts
    var id;                         // object identifier
    var isConnected;                // indicates whether the client object is connected
    var isConnecting;               // indicates whether the client object is connecting
    var alreadyConnectedFirstTime;  // indicates whether the client already connected for the first time
    var stopReconnecting;           // indicates whether the user disconnected (stop the reconnecting proccess)
    var ortc;                       // represents the object itself
    var sockjs;                     // socket connected to
    var url;                        // URL to connect
    var userPerms;                  // user permissions
    var connectionMetadata;         // connection metadata used to identify the client
    var announcementSubChannel;     // announcement subchannel
    var subscribedChannels;         // subscribed/subscribing channels
    var lastKeepAlive;              // holds the time of the last keep alive received
    var invalidConnection;          // indicates whether the connection is valid
    var reconnectIntervalId;        // id used for the reconnect interval
    var reconnectStartedAt;         // the time which the reconnect started
    var validatedTimeoutId;         // id used for the validated timeout
    var validatedArrived;           // indicates whether the validated message arrived
    var retryingWithSsl;            // indicates whether the connection is being retried with SSL
    var protocol;                   // protocol to use
    var sslSessionCookieName;       // the SSL session cookie name
    var sessionCookieName;          // the session cookie name
    var sessionId;                  // the session ID
    var registrationId;             // browser device token for push notifications
    var pushPlatform;                   // push notifications platform
    var pendingPublishMessages;     // hash with the messages pending publish acknowledge from server
    var publishTimeout;             // Publish method timeout in miliseconds

    /***********************************************************
    * @attributes initialization
    ***********************************************************/

    sslSessionCookieName = 'ortcssl';
    sessionCookieName = 'ortcsession-';

    connectionTimeout = 5000;
    messageMaxSize = 800;
    channelMaxSize = 100;
    connectionMetadataMaxSize = 256;
    channelsMaxSize=50;

    // Time in seconds
    var heartbeatDefaultTime = 15; // Heartbeat default interval time
    var heartbeatDefaultFails = 3; // Heartbeat default max fails

    var heartbeatMaxTime = 60;
    var heartbeatMinTime = 10;

    var heartbeatMaxFails = 6;
    var heartbeatMinFails = 1;

    var heartbeatTime = heartbeatDefaultTime; // Heartbeat interval time
    var heartbeatFails = heartbeatDefaultFails; // Heartbeat max fails

    var heartbeatInterval = null; // Heartbeat interval

    var heartbeatActive = false;

    messagesBuffer = {};
    subscribedChannels = {};
    pendingPublishMessages = {};

    isConnected = false;
    isConnecting = false;
    alreadyConnectedFirstTime = false;
    invalidConnection = false;
    waitingClusterResponse = false;
    validatedArrived = false;
    retryingWithSsl = false;

    ortc = this;
    lastKeepAlive = null;
    userPerms = null;
    reconnectStartedAt = null;

    protocol = undefined;
    pushPlatform = 'GCM';

    publishTimeout = 5000;


    /***********************************************************
    * @properties
    ***********************************************************/

    this.getId = function () { return id; };
    this.setId = function (newId) { id = newId; };

    this.getUrl = function () { return url; };
    this.setUrl = function (newUrl) { url = newUrl; clusterUrl = null; };

    this.getClusterUrl = function () { return clusterUrl; };
    this.setClusterUrl = function (newUrl) { clusterUrl = newUrl; url = null; };

    this.getConnectionTimeout = function () { return connectionTimeout; };
    this.setConnectionTimeout = function (newTimeout) { connectionTimeout = newTimeout; };

    this.getIsConnected = function () { return isConnected && ortc.sockjs != null; };

    this.getConnectionMetadata = function () { return connectionMetadata; };
    this.setConnectionMetadata = function (newConnectionMetadata) { connectionMetadata = newConnectionMetadata; };

    this.getAnnouncementSubChannel = function () { return announcementSubChannel; };
    this.setAnnouncementSubChannel = function (newAnnouncementSubChannel) { announcementSubChannel = newAnnouncementSubChannel; };

    this.getProtocol = function () { return protocol; };
    this.setProtocol = function (newProtocol) { protocol = newProtocol; };

    this.getSessionId = function () { return sessionId; };

    /*
    *  Get heartbeat interval.
    */
    this.getHeartbeatTime = function () { return heartbeatTime; };

    /*
    *  Set heartbeat interval.
    */
    this.setHeartbeatTime = function (newHeartbeatTime) {
        if(newHeartbeatTime && !isNaN(newHeartbeatTime)){
            if(newHeartbeatTime > heartbeatMaxTime || newHeartbeatTime < heartbeatMinTime){
                delegateExceptionCallback(ortc, 'Heartbeat time is out of limits - Min: ' + heartbeatMinTime + ' | Max: ' + heartbeatMaxTime);
            }else{
                heartbeatTime = newHeartbeatTime;
            }
        }else{
            delegateExceptionCallback(ortc, 'Invalid heartbeat time ' + newHeartbeatTime);
        }
    };

    /*
    * Get how many times can the client fail the heartbeat.
    */
    this.getHeartbeatFails = function () { return heartbeatFails; };

    /*
    * Set heartbeat fails. Defines how many times can the client fail the heartbeat.
    */
    this.setHeartbeatFails = function (newHeartbeatFails) {
        if(newHeartbeatFails && !isNaN(newHeartbeatFails)){
            if(newHeartbeatFails > heartbeatMaxFails || newHeartbeatFails < heartbeatMinFails){
                delegateExceptionCallback(ortc, 'Heartbeat fails is out of limits - Min: ' + heartbeatMinFails + ' | Max: ' + heartbeatMaxFails);
            }else{
                heartbeatFails = newHeartbeatFails;
            }
        }else{
            delegateExceptionCallback(ortc, 'Invalid heartbeat fails ' + newHeartbeatFails);
        }
    };

    /*
    * Get heart beat active.
    */
    this.getHeartbeatActive = function(){
        return heartbeatActive;
    }

    /*
    * Set heart beat active. Heart beat provides better accuracy for presence data.
    */
    this.setHeartbeatActive = function(active){
        heartbeatActive = active;
    }

    this.getPublishTimeout = function () { return publishTimeout; };
    this.setPublishTimeout = function (newTimeout) { publishTimeout = newTimeout; };

    /***********************************************************
    * @events
    ***********************************************************/

    this.onConnected = null;
    this.onDisconnected = null;
    this.onSubscribed = null;
    this.onUnsubscribed = null;
    this.onException = null;
    this.onReconnecting = null;
    this.onReconnected = null;

    /***********************************************************
    * @public methods
    ***********************************************************/

    /*
    * Connects to the gateway with the application key and authentication token.
    */
    this.connect = function (appKey, authToken) {
        /*
        Sanity Checks
        */
        if (isConnected) {
            delegateExceptionCallback(ortc, 'Already connected');
        }
        else if (!url && !clusterUrl) {
            delegateExceptionCallback(ortc, 'URL and Cluster URL are null or empty');
        }
        else if (!appKey) {
            delegateExceptionCallback(ortc, 'Application Key is null or empty');
        }
        else if (!authToken) {
            delegateExceptionCallback(ortc, 'Authentication Token is null or empty');
        }
        else if (url && !ortcIsValidUrl(url)) {
            delegateExceptionCallback(ortc, 'Invalid URL');
        }
        else if (clusterUrl && !ortcIsValidUrl(clusterUrl)) {
            delegateExceptionCallback(ortc, 'Invalid Cluster URL');
        }
        else if (!ortcIsValidInput(appKey)) {
            delegateExceptionCallback(ortc, 'Application Key has invalid characters');
        }
        else if (!ortcIsValidInput(authToken)) {
            delegateExceptionCallback(ortc, 'Authentication Token has invalid characters');
        }
        else if (!ortcIsValidInput(announcementSubChannel)) {
            delegateExceptionCallback(ortc, 'Announcement Subchannel has invalid characters');
        }
        else if (connectionMetadata && connectionMetadata.length > connectionMetadataMaxSize) {
            delegateExceptionCallback(ortc, 'Connection metadata size exceeds the limit of ' + connectionMetadataMaxSize + ' characters');
        }
        else {
            ortc.appKey = appKey;
            ortc.authToken = authToken;

            isConnecting = true;
            stopReconnecting = false;
            validatedArrived = false;

            clearValidatedTimeout(self);

            // Read SSL session cookie
            //var sslConn = readCookie(sslSessionCookieName);
            var sslConn = false;

            if (sslConn) {
                changeUrlSsl();
            }

            if (clusterUrl && clusterUrl != null) {
                clusterUrl = clusterUrl.ortcTreatUrl();
                clusterConnection();
            }
            else {
                url = url.ortcTreatUrl();

                ortc.sockjs = createSocketConnection(url);
            }

            //If ssl connection increase connection timeout
            if ((clusterUrl && clusterUrl != null && (clusterUrl.indexOf('/ssl') >= 0)) || (url && (url.indexOf('https') >= 0))) {
                if(!retryingWithSsl){
                    ortc.setConnectionTimeout(30 * 1000);
                }else{
                    if(ortc.getConnectionTimeout() < 300 * 1000){
                        if(ortc.getConnectionTimeout() < 30 * 1000){
                            ortc.setConnectionTimeout(30 * 1000);
                        }else{
                            ortc.setConnectionTimeout((ortc.getConnectionTimeout() + 10) * 1000);
                        }
                    }else{
                        stopReconnecting = true;
                        clearReconnectInterval();
                    }
                }
            }

            if (!ortc.reconnectIntervalId && !stopReconnecting) {
                // Interval to reconnect
                ortc.reconnectIntervalId = setInterval(function () {
                    if (stopReconnecting) {
                        clearReconnectInterval();
                    }
                    else {
                        var currentDateTime = new Date();

                        if (ortc.sockjs == null && !waitingClusterResponse) {
                            reconnectSocket();
                        }

                        // 35 seconds
                        if (lastKeepAlive != null && (lastKeepAlive + 35000 < new Date().getTime())) {
                            lastKeepAlive = null;

                            // Server went down
                            if (isConnected) {
                                disconnectSocket();
                            }
                        }
                    }
                }, ortc.getConnectionTimeout());
            }
        }
    };


    this.setNotificationConfig = function(config){
        config.cmd = 'config';
        this.sendMessageToServiceWorker(config);
    };

    this.showNotification = function(notification){
        notification.cmd = 'notification';
        this.sendMessageToServiceWorker(notification);
    };

    this.sendMessageToServiceWorker = function(message) {
        return new Promise(function(resolve, reject) {
          var messageChannel = new MessageChannel();
          messageChannel.port1.onmessage = function(event) {
            if (event.data.error) {
              reject(event.data.error);
            } else {
              resolve(event.data);
            }
          };
          navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
        });
    }




    /*
    * Subscribes to the channel so the client object can receive all messages sent to it by other clients with Notifications.
    */
    this.subscribeWithNotifications = function(channel, subscribeOnReconnected, regId, onMessageCallback){
        ortc.registrationId = regId;
        this._subscribe(channel, subscribeOnReconnected, regId, null, onMessageCallback);        
    }

    /*
    * Subscribes to the channel so the client object can receive all messages sent that are valid according to the given filter
    */
    this.subscribeWithFilter = function(channel, subscribeOnReconnected, filter, onMessageCallback){
        this._subscribe(channel, subscribeOnReconnected, null, filter, onMessageCallback);        
    }

    /*
    * Subscribes to the channel so the client object can receive all messages sent to it by other clients.
    */
    this.subscribe = function (channel, subscribeOnReconnected, onMessageCallback){
        this._subscribe(channel, subscribeOnReconnected, null, null, onMessageCallback);
    };

    /*
    * Subscribes to the channel using at-least-once delivery mode (buffered messages)
    */
    this.subscribeWithBuffer = function(channel, subscriberId, onMessageWithBufferCallback){
        if(subscriberId) {
            var options = {
                channel: channel,
                subscribeOnReconnected: true,
                subscriberId: subscriberId
            }

            this.subscribeWithOptions(options, function(ortc, msgOptions) {
                onMessageWithBufferCallback(ortc, msgOptions.channel, msgOptions.seqId, msgOptions.message);
            });
        } else {
            delegateExceptionCallback(ortc, 'subscribeWithBuffer called with no subscriberId');
        }        
    }

    /*
    * Subscribes to the channel with multiple options
    */
    this.subscribeWithOptions = function (options, onMessageWithOptionsCallback){
        if(options) {
            this._subscribeOptions(options.channel, options.subscribeOnReconnected, options.regId, options.filter, options.subscriberId, onMessageWithOptionsCallback);
        } else {
            delegateExceptionCallback(ortc, 'subscribeWithOptions called with no options');
        }
    };


    this._subscribe = function(channel, subscribeOnReconnected, regId, filter, onMessageCallback) {
        /*
        Sanity Checks
        */
        if (!isConnected) {
            delegateExceptionCallback(ortc, 'Not connected');
        }
        else if (!channel) {
            delegateExceptionCallback(ortc, 'Channel is null or empty');
        }
        else if (!ortcIsValidInput(channel)) {
            delegateExceptionCallback(ortc, 'Channel has invalid characters');
        }
        else if (subscribedChannels[channel] && subscribedChannels[channel].isSubscribing) {
            delegateExceptionCallback(ortc, 'Already subscribing to the channel \'' + channel + '\'');
        }
        else if (subscribedChannels[channel] && subscribedChannels[channel].isSubscribed) {
            delegateExceptionCallback(ortc, 'Already subscribed to the channel \'' + channel + '\'');
        }
        else if (channel.length > channelMaxSize) {
            delegateExceptionCallback(ortc, 'Channel size exceeds the limit of ' + channelMaxSize + ' characters');
        }
        else if (!ortcIsValidBoolean(subscribeOnReconnected)) {
            delegateExceptionCallback(ortc, 'The argument \'subscribeOnReconnected\' must be a boolean');
        }
        else if (!ortcIsFunction(onMessageCallback)) {
            delegateExceptionCallback(ortc, 'The argument \'onMessageCallback\' must be a function');
        }
        else {
            if (ortc.sockjs != null) {
                var domainChannelCharacterIndex = channel.indexOf(':');
                var channelToValidate = channel;
                var hashPerm = null;

                if (domainChannelCharacterIndex > 0) {
                    channelToValidate = channel.substring(0, domainChannelCharacterIndex + 1) + '*';
                }

                if (userPerms && userPerms != null) {
                    hashPerm = userPerms[channelToValidate] ? userPerms[channelToValidate] : userPerms[channel];
                }

                if (userPerms && userPerms != null && !hashPerm) {
                    delegateExceptionCallback(ortc, 'No permission found to subscribe to the channel \'' + channel + '\'');
                }
                else {
                    if (subscribedChannels[channel]) {
                        subscribedChannels[channel].isSubscribing = true;
                        subscribedChannels[channel].isSubscribed = false;
                        subscribedChannels[channel].subscribeOnReconnected = subscribeOnReconnected;
                        subscribedChannels[channel].onMessageCallback = onMessageCallback;
                        subscribedChannels[channel].filter = filter;
                    }
                    else {
                        subscribedChannels[channel] = { 'isSubscribing': true, 'isSubscribed': false, 'subscribeOnReconnected': subscribeOnReconnected, 'onMessageCallback': onMessageCallback, 'filter': filter };
                    }
                    if (regId) {
                        subscribedChannels[channel].withNotifications = true;
                        ortc.sockjs.send('subscribe;' + ortc.appKey + ';' + ortc.authToken + ';' + channel + ';' + hashPerm  + ';' + regId + ';' + pushPlatform);
                    }else{
                        subscribedChannels[channel].withNotifications = false;

                        if(filter) {
                            ortc.sockjs.send('subscribefilter;' + ortc.appKey + ';' + ortc.authToken + ';' + channel + ';' + hashPerm + ';' + filter);
                        } else {
                            ortc.sockjs.send('subscribe;' + ortc.appKey + ';' + ortc.authToken + ';' + channel + ';' + hashPerm);
                        }
                    }
                }
            }
        }
    };

    this._subscribeOptions = function(channel, subscribeOnReconnected, regId, filter, subscriberId, onMessageCallback) {
        /*
        Sanity Checks
        */
        if (!isConnected) {
            delegateExceptionCallback(ortc, 'Not connected');
        }
        else if (!channel) {
            delegateExceptionCallback(ortc, 'Channel is null or empty');
        }
        else if (!ortcIsValidInput(channel)) {
            delegateExceptionCallback(ortc, 'Channel has invalid characters');
        }
        else if (!ortcIsValidInput(subscriberId)) {
            delegateExceptionCallback(ortc, 'subscriberId has invalid characters');
        }
        else if (subscribedChannels[channel] && subscribedChannels[channel].isSubscribing) {
            delegateExceptionCallback(ortc, 'Already subscribing to the channel \'' + channel + '\'');
        }
        else if (subscribedChannels[channel] && subscribedChannels[channel].isSubscribed) {
            delegateExceptionCallback(ortc, 'Already subscribed to the channel \'' + channel + '\'');
        }
        else if (channel.length > channelMaxSize) {
            delegateExceptionCallback(ortc, 'Channel size exceeds the limit of ' + channelMaxSize + ' characters');
        }
        else if (!ortcIsFunction(onMessageCallback)) {
            delegateExceptionCallback(ortc, 'The argument \'onMessageCallback\' must be a function');
        }
        else {
            
            if (!subscribeOnReconnected) {
                subscribeOnReconnected = true;
            }

            if(!regId) {
                regId = '';
            }

            if(!filter) {
                filter = '';
            }

            if(!subscriberId) {
                subscriberId = '';
            }

            if (ortc.sockjs != null) {
                var domainChannelCharacterIndex = channel.indexOf(':');
                var channelToValidate = channel;
                var hashPerm = null;

                if (domainChannelCharacterIndex > 0) {
                    channelToValidate = channel.substring(0, domainChannelCharacterIndex + 1) + '*';
                }

                if (userPerms && userPerms != null) {
                    hashPerm = userPerms[channelToValidate] ? userPerms[channelToValidate] : userPerms[channel];
                }

                if (userPerms && userPerms != null && !hashPerm) {
                    delegateExceptionCallback(ortc, 'No permission found to subscribe to the channel \'' + channel + '\'');
                }
                else {
                    if (subscribedChannels[channel]) {
                        subscribedChannels[channel].isSubscribing = true;
                        subscribedChannels[channel].isSubscribed = false;
                        subscribedChannels[channel].subscribeOnReconnected = subscribeOnReconnected;
                        subscribedChannels[channel].onMessageCallback = onMessageCallback;
                        subscribedChannels[channel].filter = filter;
                        subscribedChannels[channel].withOptions = true;
                        subscribedChannels[channel].subscriberId = subscriberId;
                    }
                    else {
                        subscribedChannels[channel] = { 
                            'isSubscribing': true, 
                            'isSubscribed': false, 
                            'subscribeOnReconnected': subscribeOnReconnected, 
                            'onMessageCallback': onMessageCallback, 
                            'filter': filter,
                            'withOptions': true,
                            'subscriberId': subscriberId 
                        };
                    }

                    if (regId) {
                        subscribedChannels[channel].withNotifications = true;
                    }else{
                        subscribedChannels[channel].withNotifications = false;
                    }

                    ortc.sockjs.send('subscribeoptions;' + ortc.appKey + ';' + ortc.authToken + ';' + channel + ';' + subscriberId + ';' + regId + ';' + pushPlatform + ';' + hashPerm  + ';' + filter);
                }
            }
        }
    };
    

    /*
    * Unsubscribes from the channel so the client object stops receiving messages sent to it.
    */
    this.unsubscribe = function (channel) {
        /*
        Sanity Checks
        */
        if (!isConnected) {
            delegateExceptionCallback(ortc, 'Not connected');
        }
        else if (!channel) {
            delegateExceptionCallback(ortc, 'Channel is null or empty');
        }
        else if (!ortcIsValidInput(channel)) {
            delegateExceptionCallback(ortc, 'Channel has invalid characters');
        }
        else if (!subscribedChannels[channel] || (subscribedChannels[channel] && !subscribedChannels[channel].isSubscribed)) {
            delegateExceptionCallback(ortc, 'Not subscribed to the channel ' + channel);
        }
        else if (channel.length > channelMaxSize) {
            delegateExceptionCallback(ortc, 'Channel size exceeds the limit of ' + channelMaxSize + ' characters');
        }
        else {
            if (ortc.sockjs != null) {
                if (subscribedChannels[channel].withNotifications == true) {
                    ortc.sockjs.send('unsubscribe;' + ortc.appKey + ';' + channel + ';' + ortc.registrationId + ';' + pushPlatform);
                }else{
                    ortc.sockjs.send('unsubscribe;' + ortc.appKey + ';' + channel);
                }
            }
        }
    };

    this._sendWithMethod = function(channel, message, method, ttl, callback) {
        /*
        Sanity Checks
        */

        var err;

        if (!isConnected || ortc.sockjs == null) {
            err = 'Not connected';
        }
        else if (!method) {
            err = 'Send Method is null or empty';
        }
        else if (!channel) {
            err = 'Channel is null or empty';
        }
        else if (!ortcIsValidInput(channel)) {
            err = 'Channel has invalid characters';
        }
        else if (!message) {
            err = 'Message is null or empty';
        }
        else if (!ortcIsString(message)) {
            err = 'Message must be a string';
        }
        else if (channel.length > channelMaxSize) {
            err = 'Channel size exceeds the limit of ' + channelMaxSize + ' characters';
        } else {
            var domainChannelCharacterIndex = channel.indexOf(':');
            var channelToValidate = channel;
            var hashPerm = null;

            if (domainChannelCharacterIndex > 0) {
                channelToValidate = channel.substring(0, domainChannelCharacterIndex + 1) + '*';
            }

            if (userPerms && userPerms != null) {
                hashPerm = userPerms[channelToValidate] ? userPerms[channelToValidate] : userPerms[channel];
            }

            if (userPerms && userPerms != null && !hashPerm) {
                err = 'No permission found to send to the channel \'' + channel + '\'';
            }
            else {
                // Multi part
                var messageParts = [];
                var messageId = generateId(8);
                var i;
                var allowedMaxSize = messageMaxSize - channel.length;

                for (i = 0; i < message.length; i = i + allowedMaxSize) {
                    // Just one part
                    if (message.length <= allowedMaxSize) {
                        messageParts.push(message);
                        break;
                    }

                    if (message.substring(i, i + allowedMaxSize)) {
                        messageParts.push(message.substring(i, i + allowedMaxSize));
                    }
                }

                if(method === "publish") {
                    if(pendingPublishMessages[messageId]) {
                        err = "Message id conflict. Please retry publishing the message"
                    } else {

                        if(!ttl) {
                            ttl = 0;
                        }

                        // check for acknowledge timeout
                        var ackTimeout = setTimeout(function() {
                            if(pendingPublishMessages[messageId]) {
                                var err = "Message publish timeout after " + publishTimeout / 1000 + " seconds";
                                if(pendingPublishMessages[messageId].callback) {
                                    pendingPublishMessages[messageId].callback(err);
                                }
                                delete pendingPublishMessages[messageId];
                            }
                        }, publishTimeout);

                        var pendingMsg = {
                            totalNumOfParts: messageParts.length,
                            callback: callback,
                            timeout: ackTimeout
                        };

                        pendingPublishMessages[messageId] = pendingMsg;

                    }
                }

                if(!err) {
                    if(method === 'publish') {
                        if (messageParts.length < 20) {
                            for (var j = 1; j <= messageParts.length; j++) {
                                ortc.sockjs.send('publish;' + ortc.appKey + ';' + ortc.authToken + ';' + channel + ';' + ttl + ';' + hashPerm + ';' + messageId + '_' + j + '-' + messageParts.length + '_' + messageParts[j - 1]);
                            }
                        } else {
                            // throttle send to 10 parts/sec to avoid server rate limiting
                            var partsSent = 0;
                            var partSendInterval = setInterval(function() {
                                if(isConnected && ortc.sockjs) {
                                    var currentPart = partsSent + 1;
                                    var totalParts = messageParts.length;
                                    ortc.sockjs.send('publish;' + ortc.appKey + ';' + ortc.authToken + ';' + channel + ';' + ttl + ';' + hashPerm + ';' + messageId + '_' + currentPart + '-' + totalParts + '_' + messageParts[currentPart - 1]);
                                    partsSent++;

                                    if(partsSent === messageParts.length) {
                                        clearInterval(partSendInterval);
                                    }
                                } else {
                                    // socket was disconnected, stop sending
                                    clearInterval(partSendInterval);
                                }                                
                            }, 100);
                        }
                    } else {
                        // send
                        for (var j = 1; j <= messageParts.length; j++) {
                            ortc.sockjs.send(method + ';' + ortc.appKey + ';' + ortc.authToken + ';' + channel + ';' + hashPerm + ';' + messageId + '_' + j + '-' + messageParts.length + '_' + messageParts[j - 1]);
                        }
                    }
                }
            }
        }

        if (err) {
            delegateExceptionCallback(ortc, err);
            callback(err);
        } 
    }

    /*
    * Sends the message to the channel using send method (at-most-once delivery semantics)
    */
    this.send = function (channel, message) {
        this._sendWithMethod(channel, message, "send");
    };

    /*
    * Sends the message to the channel using publish method (at-least-once delivery semantics)
    */
    this.publish = function (channel, message, ttl, callback) {
        this._sendWithMethod(channel, message, "publish", ttl, callback);
    };

    /*
    * Sends the message to multiple channels.
    */
    this.batchSend = function (channels, message) {
        /*
        Sanity Checks
        */
        channels = ortcStrToArray(channels);
        if (!isConnected || ortc.sockjs == null) {
            delegateExceptionCallback(ortc, 'Not connected');
        }
        else if (!ortcIsArray(channels)) {
            delegateExceptionCallback(ortc, 'Channels must be a array');
        }
        else if (!message) {
            delegateExceptionCallback(ortc, 'Message is null or empty');
        }
        else if (!ortcIsString(message)) {
            delegateExceptionCallback(ortc, 'Message must be a string');
        }
        else if(channels.length <= 0){
            delegateExceptionCallback(ortc, 'Channels must be an array at least with one channel');

        }else if(channels.length > channelsMaxSize){
            channels = [];
            delegateExceptionCallback(ortc, 'The channel maximum was reached (>'+ channelsMaxSize +')');

        }

        for(i=0;i<channels.length;i++){
            var channel = channels[i];
            if (channel.length > channelMaxSize) {
                channels.splice(i,1);
                delegateExceptionCallback(ortc, 'Channel '+ channel +' size exceeds the limit of ' + channelMaxSize + ' characters');
            }
        }

         if(channels.length > 0){
            var arrayHashPerm = [];

            for(i=0;i<channels.length;i++){
                var channel = channels[i];

                var domainChannelCharacterIndex = channel.indexOf(':');
                var channelToValidate = channel;
                var hashPerm = null;

                if (domainChannelCharacterIndex > 0) {
                    channelToValidate = channel.substring(0, domainChannelCharacterIndex + 1) + '*';
                }

                if (userPerms && userPerms != null) {
                    hashPerm = userPerms[channelToValidate] ? userPerms[channelToValidate] : userPerms[channel];
                }

                if (userPerms && userPerms != null && !hashPerm) {
                    channels.splice(i,1);
                    delegateExceptionCallback(ortc, 'No permission found to send to the channel \'' + channel + '\'');
                }else{
                    arrayHashPerm.push(hashPerm);
                }
            }

            if(channels.length > 0) {
                var messageParts = [];
                var messageId = generateId(8);
                var allowedMaxSize = messageMaxSize - channels.toString().length;

                for (i = 0; i < message.length; i = i + allowedMaxSize) {
                    // Just one part
                    if (message.length <= allowedMaxSize) {
                        messageParts.push(message);
                        break;
                    }

                    if (message.substring(i, i + allowedMaxSize)) {
                        messageParts.push(message.substring(i, i + allowedMaxSize));
                    }
                }

                for (j = 1; j <= messageParts.length; j++) {
                    ortc.sockjs.send('batchSend;' + ortc.appKey + ';' + ortc.authToken + ';' + JSON.stringify(channels) + ';' + JSON.stringify(arrayHashPerm) + ';' + messageId + '_' + j + '-' + messageParts.length + '_' + messageParts[j - 1]);
                }
            }
        }
    };


    /*
    * Disconnects from the gateway.
    */
    this.disconnect = function () {
        clearReconnectInterval();
        stopReconnectProcess();

        // Clear pending messages and their timeouts (if any)
        for (var messageId in pendingPublishMessages) {
          if (pendingPublishMessages.hasOwnProperty(messageId)) {
            if(pendingPublishMessages[messageId].timeout) {
                clearTimeout(pendingPublishMessages[messageId].timeout);
            }
            delete pendingPublishMessages[messageId];
          }
        }

        // Clear subscribed channels
        subscribedChannels = {};

        /*
        Sanity Checks
        */
        if (!isConnected && !invalidConnection) {
            delegateExceptionCallback(ortc, 'Not connected');
        }
        else {
            disconnectSocket();
        }
    };

    /*
    * Gets a value indicating whether this client object is subscribed to the channel.
    */
    this.isSubscribed = function (channel) {
        /*
        Sanity Checks
        */
        if (!isConnected) {
            delegateExceptionCallback(ortc, 'Not connected');
        }
        else if (!channel) {
            delegateExceptionCallback(ortc, 'Channel is null or empty');
        }
        else if (!ortcIsValidInput(channel)) {
            delegateExceptionCallback(ortc, 'Channel has invalid characters');
        }
        else {
            if (subscribedChannels[channel] && subscribedChannels[channel].isSubscribed) {
                return subscribedChannels[channel].isSubscribed;
            }
            else {
                return false;
            }
        }
    };

    /*
    * Gets a json indicating the subscriptions in a channel.
    */
    this.presence = function (parameters,callback) {
        try{
            var requestUrl = null
            , isCluster = false
            , appKey = ortc.appKey
            , authToken = ortc.authToken;

            if(parameters.url){
                requestUrl = parameters.url.ortcTreatUrl();
                isCluster = parameters.isCluster;
                appKey = parameters.applicationKey;
                authToken = parameters.authenticationToken;
            }else{
                if (clusterUrl && clusterUrl != null) {
                    requestUrl = clusterUrl;
                    isCluster = true;
                }
                else {
                    requestUrl = url.ortcTreatUrl();;
                }
            }

            getServerUrl({
                requestUrl : requestUrl,
                isCluster : isCluster,
                appKey : appKey
            },
            function(error,serverUrl){
                if(error){
                    callback(error,null);
                }else{
                    jsonp(serverUrl + '/presence/' + appKey + '/' + authToken + '/' + parameters.channel,callback);
                }
            });
        }catch(e){
            callback('Unable to get presence data',null);
        }
    };

    var getServerUrl = function(parameters,callback){
        if (parameters.requestUrl && parameters.isCluster) {
            var guid = generateGuid();

            var queryString = 'guid=' + generateGuid();

            queryString = parameters.appKey ? queryString + '&appkey=' + parameters.appKey : queryString;

            loadClusterServerScript(parameters.requestUrl + '/?' + queryString, guid, function (clusterServerResolved, scriptGuid) {
                if (clusterServerResolved) {
                    var resultUrl = SOCKET_SERVER;
                    callback(null,resultUrl);
                }else{
                    callback(null,'Unable to get server from cluster');
                }

                try {
                    clearScripts(scriptGuid);
                } catch (loadError) { }
            });
        }
        else {
            var resultUrl = parameters.requestUrl.ortcTreatUrl();
            callback(null,resultUrl);
        }
    };

    /*
    * Adds the Webspectator bootstrap script for the outmost frame on the same domain.
    */
    this.setMonetizerId = function (publicId) {
        var tempWin;
        var win = tempWin = window;

        while (tempWin != window.top) {
            try {
                if (tempWin.frameElement) {
                    win = tempWin.parent;
                }
            } catch(e) {

            }
            tempWin = tempWin.parent;
        }
        if (!win._WS_BOOT) {
            var s = document.createElement('SCRIPT');
            s.src = '//wfpscripts.webspectator.com/bootstrap/ws-' + publicId + '.js';
            document.getElementsByTagName('head')[0].appendChild(s);
        }
    };

    /***********************************************************
    * @private methods
    ***********************************************************/

    /*
    * Change the current URL to use SSL
    */
    var changeUrlSsl = function () {
        if (!('ActiveXObject' in window)) {
            if (clusterUrl && clusterUrl != null) {
                //clusterUrl = clusterUrl.replace('http://', 'https://');

                if (clusterUrl.indexOf('ssl/') < 0) {
                    var slashAtTheEnd = clusterUrl.search(/\/([\d.]*)\/$/);

                    if (slashAtTheEnd > -1) {
                        clusterUrl = clusterUrl.substring(0, slashAtTheEnd + 1) + 'ssl/' + clusterUrl.substring(slashAtTheEnd + 1, clusterUrl.length)
                    } else {
                        clusterUrl = clusterUrl.substring(0, clusterUrl.lastIndexOf('/') + 1) + 'ssl/' + clusterUrl.substring(clusterUrl.lastIndexOf('/') + 1);
                    }
                }
            }
            else {
                url = url.replace('http://', 'https://');
            }
        }
        // Create session cookie
        //createSessionCookie(sslSessionCookieName, 1);
    };

    /*
    * Clear the reconnecting interval
    */
    var clearReconnectInterval = function () {
        if (ortc.reconnectIntervalId) {
            clearInterval(ortc.reconnectIntervalId);

            ortc.reconnectIntervalId = null;
        }
    };

    /*
    * Clear the validated timeout
    */
    var clearValidatedTimeout = function (self) {
        if (self.validatedTimeoutId) {
            clearTimeout(self.validatedTimeoutId);

            self.validatedTimeoutId = null;
        }
    };

    /*
    * Stop the reconnecting process
    */
    var stopReconnectProcess = function () {
        stopReconnecting = true;
        alreadyConnectedFirstTime = false;
    };

    var startHeartBeatInterval = function(self){
        if(!self.heartbeatInterval && heartbeatActive){
            self.sockjs.send("b");
            self.heartbeatInterval = setInterval(function(){
                if(!heartbeatActive){
                    stopHeartBeatInterval(self);
                }else{
                    self.sockjs.send("b");
                }
            }, heartbeatTime * 1000);
        }
    }

    var stopHeartBeatInterval = function(self){
        if(self.heartbeatInterval){
            clearInterval(self.heartbeatInterval);
            self.heartbeatInterval = null;
        }
    }

    /*
    * Creates a cookie with expiration time.
    */
    var createExpireCookie = function (name, value, minutes) {
        var expires = "";

        if (minutes) {
            var date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }

        document.cookie = name + "=" + value + expires + "; path=/";
    };

    /*
    * Creates a session cookie.
    */
    var createSessionCookie = function (name, value) {
        document.cookie = name + "=" + value + "; path=/";
    };

    /*
    * Reads a cookie.
    */
    var readCookie = function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        var result = null;

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];

            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) == 0) {
                result = c.substring(nameEQ.length, c.length);
                break;
            }
        }

        return result;
    };

    /*
    * Generates an ID.
    */
    var generateId = function (size) {
        var result = '';

        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };

        for (var i = 0; i < size / 4; i++) {
            result += S4();
        }

        return result;
    };

    /*
    * Disconnects the socket.
    */
    var disconnectSocket = function () {
        stopHeartBeatInterval(ortc);

        reconnectStartedAt = null;
        isConnected = false;
        isConnecting = false;
        validatedArrived = false;
        retryingWithSsl = false;        

        clearValidatedTimeout(self);

        if (ortc.sockjs != null) {
            ortc.sockjs.close();
            ortc.sockjs = null;
        }
    };

    /*
    * Reconnects the socket.
    */
    var reconnectSocket = function () {
        stopHeartBeatInterval(ortc);

        if (isConnecting) {
            delegateExceptionCallback(ortc, 'Unable to connect');
        }

        isConnecting = true;

        delegateReconnectingCallback(ortc);

        reconnectStartedAt = new Date().getTime();

        if (clusterUrl && clusterUrl != null) {
            clusterConnection();
        }
        else {
            ortc.sockjs = createSocketConnection(url);
        }
    };

    /*
    * Tries a connection through the cluster gateway with the application key and authentication token.
    */
    var clusterConnection = function () {
        var guid = generateGuid();

        var queryString = 'guid=' + generateGuid();

        queryString = ortc.appKey ? queryString + '&appkey=' + ortc.appKey : queryString;

        loadClusterServerScript(clusterUrl + '/?' + queryString, guid, function (clusterServerResolved, scriptGuid) {
            if (clusterServerResolved) {
                url = SOCKET_SERVER;
                sockjs = createSocketConnection(ortc.getUrl());
            }

            try {
                clearScripts(scriptGuid);
            } catch (loadError) { }
        });
    };

    /*
    * Clears the javascript scripts previously loaded into the page.
    */
    var clearScripts = function (guid) {
        var headChildren = document.getElementsByTagName('head')[0].children;
        var childrenToRemove = [];

        for (var i = 0; i < headChildren.length; i++) {
            if (headChildren[i].attributes != null && headChildren[i].attributes['ortcScriptId'] && headChildren[i].attributes['ortcScriptId'].value == guid) {
                childrenToRemove.push(i);
            }
        }

        for (var child in childrenToRemove) {
            document.getElementsByTagName('head')[0].removeChild(headChildren[childrenToRemove[child]]);
        }
    };

    /*
    * Loads the cluster server javascript script into the page.
    */
    var loadClusterServerScript = function (scriptUrl, guid, callback) {
        var script = document.createElement('script');

        script.type = 'text/javascript';
        script.setAttribute('ortcScriptId', guid);

        waitingClusterResponse = true;

        if (script.readyState) { // IE
            script.onreadystatechange = function () {
                if (script.readyState == 'loaded' || script.readyState == 'complete') {
                    waitingClusterResponse = false;
                    script.onreadystatechange = null;

                    if (typeof (SOCKET_SERVER) != 'undefined' && SOCKET_SERVER.indexOf('undefined') < 0 && SOCKET_SERVER.indexOf('unknown_server') < 0) {
                        callback(true, guid);
                    } else {
                        callback(false, guid);
                    }
                }
            };
        } else { // Others
            script.onload = function () {
                waitingClusterResponse = false;

                if (typeof (SOCKET_SERVER) != 'undefined' && SOCKET_SERVER.indexOf('undefined') < 0 && SOCKET_SERVER.indexOf('unknown_server') < 0) {
                    callback(true, guid);
                } else {
                    callback(false, guid);
                }
            };
        }

        script.onerror = function () {
            waitingClusterResponse = false;
        }

        script.src = scriptUrl;

        document.getElementsByTagName('head')[0].appendChild(script);
    };

    /*
    * Generates a GUID.
    */
    var generateGuid = function () {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    };

    /*
    * Count the dictionary keys.
    */
    var countKeys = function (dic) {
        var count = 0;

        for (var i in dic) {
            count++;
        }

        return count;
    };

    /*
    * Creates a socket connection.
    */
    var createSocketConnection = function (connectionUrl) {
        var self = ortc;

        if (self.sockjs == null) {
            if (navigator && navigator.userAgent && navigator.userAgent.indexOf('PlayStation Vita') >= 0) {
                protocol = 'jsonp-polling';
            }

            self.sockjs = new SockJS(connectionUrl + '/broadcast', protocol);

            // Timeout to receive the validated message
            if(!self.sslFallback){
                var validateTimeoutTime = 5000;
                self.validatedTimeoutId = setTimeout(function () {
                    self.sslFallback = true;
                    stopReconnectProcess();
                    disconnectSocket();

                    invalidConnection = true;
                    retryingWithSsl = true;

                    if(connectionUrl.indexOf('https://') >= 0) {
                        // We are already using SSL, try streaming
                        protocol = "xhr-streaming";
                    } else {
                        protocol = undefined;    
                    }                    

                    changeUrlSsl();
                }, validateTimeoutTime);
            } else if (!self.xhrStreamingFallback) {
                // The SSL fallback failed. Try xhr-streaming

                var validateSslTimeoutTime = 5000;
                self.validatedTimeoutId = setTimeout(function () {
                    self.xhrStreamingFallback = true;
                    stopReconnectProcess();
                    disconnectSocket();

                    invalidConnection = true;
                    retryingWithSsl = true;
                    protocol = "xhr-streaming";
                    
                }, validateSslTimeoutTime);
            }



            // Connect handler
            self.sockjs.onopen = function () {
                protocol = self.sockjs.protocol;

                // Update last keep alive time
                lastKeepAlive = new Date().getTime();

                // If is a reconnect do not count session
                if (alreadyConnectedFirstTime) {
                    sessionId = '';
                }
                else {
                    // Read session cookie
                    sessionId = readCookie(sessionCookieName + self.appKey + '-s');

                    if (!sessionId) {
                        // Read expiration cookie
                        sessionId = readCookie(sessionCookieName + self.appKey);

                        if (!sessionId) {
                            sessionId = generateId(16);
                        }

                        // Create session cookie
                        createSessionCookie(sessionCookieName + self.appKey + '-s', sessionId);

                        // Check if session cookie was created
                        if (!readCookie(sessionCookieName + self.appKey + '-s')) {
                            sessionId = '';
                        }
                    }
                }

                var heartbeatDetails = heartbeatActive ? ';' + self.getHeartbeatTime() + ';' + self.getHeartbeatFails() + ';' : '';

                self.sockjs.send('validate;' + self.appKey + ';' + self.authToken + ';' + (announcementSubChannel ? announcementSubChannel : '') + ';' + sessionId + ';' + connectionMetadata + heartbeatDetails);

            };

            // Disconnect handler
            self.sockjs.onclose = function (e) {
                // e.code=1000 - e.reason=Normal closure
                // e.code=1006 - e.reason=WebSocket connection broken
                // e.code=2000 - e.reason=All transports failed
                stopHeartBeatInterval(ortc);

                if (ortc.sockjs != null) {
                    ortc.sockjs.close();
                    ortc.sockjs = null;
                }

                // Clear user permissions
                userPerms = null;

                if (e.code != 1000) {
                    if (isConnected) {
                        isConnected = false;
                        isConnecting = false;
                        protocol = undefined;

                        delegateDisconnectedCallback(self);
                    }

                    if (!stopReconnecting) {
                        if (!reconnectStartedAt || (reconnectStartedAt + connectionTimeout < new Date().getTime())) {
                            reconnectSocket();
                        }
                    }
                }
                else {
                    if (!invalidConnection) {
                        isConnected = false;
                        isConnecting = false;
                        protocol = undefined;

                        delegateDisconnectedCallback(self);
                    }
                }

                if (retryingWithSsl) {
                    self.connect(self.appKey, self.authToken);
                    retryingWithSsl = false;
                }

                invalidConnection = false;
            };

            // Receive handler
            self.sockjs.onmessage = function (e) {
                // Update last keep alive time
                lastKeepAlive = new Date().getTime();

                var data = e.data;
                var channel = data.ch;
                var message = data.m;
                var filtered = data.f;
                var seqId = data.s;

                // Multi part
                var regexPattern = /^(\w[^_]*)_{1}(\d*)-{1}(\d*)_{1}([\s\S.]*)$/;
                var match = regexPattern.exec(message);

                var messageId = null;
                var messageCurrentPart = 1;
                var messageTotalPart = 1;
                var lastPart = false;

                if (match && match.length > 0) {
                    if (match[1]) {
                        messageId = match[1];
                    }
                    if (match[2]) {
                        messageCurrentPart = match[2];
                    }
                    if (match[3]) {
                        messageTotalPart = match[3];
                    }
                    if (match[4]) {
                        message = match[4];
                    }
                }

                if (messageId) {
                    if (!messagesBuffer[messageId]) {
                        messagesBuffer[messageId] = {};
                    }

                    messagesBuffer[messageId][messageCurrentPart] = message;

                    if (countKeys(messagesBuffer[messageId]) == messageTotalPart) {
                        lastPart = true;
                    }
                }
                else {
                    lastPart = true;
                }

                if (lastPart) {
                    if (messageId) {
                        message = "";

                        for (var i = 1; i <= messageTotalPart; i++) {
                            message += messagesBuffer[messageId][i];

                            delete messagesBuffer[messageId][i];
                        }

                        delete messagesBuffer[messageId];
                    }

                    delegateMessagesCallback(self, channel, filtered, message, seqId);
                }

                // send acknowledge
                if(messageId && seqId != null) {
                    var haveAllParts = lastPart ? "1" : "0";
                    self.sockjs.send('ack;' + self.appKey + ';' + channel + ';' + messageId + ';' + seqId + ';' + haveAllParts);
                }
            };

            self.sockjs.onortcsubscribed = function (e) {
                lastKeepAlive = new Date().getTime();

                var channel = e.data;

                if (subscribedChannels[channel]) {
                    subscribedChannels[channel].isSubscribing = false;
                    subscribedChannels[channel].isSubscribed = true;
                }

                delegateSubscribedCallback(self, channel)
            };

            self.sockjs.onortcunsubscribed = function (e) {
                lastKeepAlive = new Date().getTime();

                var channel = e.data;

                if (subscribedChannels[channel]) {
                    subscribedChannels[channel].isSubscribed = false;
                }

                delegateUnsubscribedCallback(self, channel)
            };

            self.sockjs.onheartbeat = function () {
                lastKeepAlive = new Date().getTime();
            };

            self.sockjs.onortcvalidated = function (e) {
                var sessionExpirationTime = 30;

                if (e.data) {
                    userPerms = e.data;
                }

                if (e.set) {
                    sessionExpirationTime = e.set;
                }

                clearValidatedTimeout(self);

                validatedArrived = true;
                retryingWithSsl = false;
                isConnecting = false;
                isConnected = true;
                reconnectStartedAt = null;

                if (sessionId) {
                    if (!readCookie(sessionCookieName + self.appKey + '-s')) {
                        createSessionCookie(sessionCookieName + self.appKey + '-s', sessionId);
                    }

                    if (!readCookie(sessionCookieName + self.appKey)) {
                        createExpireCookie(sessionCookieName + self.appKey, sessionId, sessionExpirationTime);
                    }
                }

                if (alreadyConnectedFirstTime) {
                    var channelsToRemove = {};

                    // Subscribe to the previously subscribed channels
                    for (var key in subscribedChannels) {
                        // Subscribe again
                        if (subscribedChannels[key].subscribeOnReconnected == true && (subscribedChannels[key].isSubscribing || subscribedChannels[key].isSubscribed)) {
                            subscribedChannels[key].isSubscribing = true;
                            subscribedChannels[key].isSubscribed = false;

                            var domainChannelCharacterIndex = key.indexOf(':');
                            var channelToValidate = key;
                            var hashPerm = null;

                            if (domainChannelCharacterIndex > 0) {
                                channelToValidate = key.substring(0, domainChannelCharacterIndex + 1) + '*';
                            }

                            if (userPerms && userPerms != null) {
                                hashPerm = userPerms[channelToValidate] ? userPerms[channelToValidate] : userPerms[key];
                            }

                            if(subscribedChannels[key].withOptions) {
                                var filter = subscribedChannels[key].filter;
                                var subscriberId = subscribedChannels[key].subscriberId;
                                var regId = ""; // don't resubscribe with notifications
                                ortc.sockjs.send('subscribeoptions;' + self.appKey + ';' + self.authToken + ';' + key + ';' + subscriberId + ';' + regId + ';' + self.pushPlatform + ';' + hashPerm  + ';' + filter);
                            } else if(subscribedChannels[key].filter) {
                                self.sockjs.send('subscribefilter;' + self.appKey + ';' + self.authToken + ';' + key + ';' + hashPerm + ';' + subscribedChannels[key].filter);
                            } else {
                                self.sockjs.send('subscribe;' + self.appKey + ';' + self.authToken + ';' + key + ';' + hashPerm);
                            }                            
                        }
                        else {
                            channelsToRemove[key] = key;
                        }
                    }

                    for (var keyToRemove in channelsToRemove) {
                        delete subscribedChannels[keyToRemove];
                    }

                    messagesBuffer = {};

                    delegateReconnectedCallback(self);
                }
                else {
                    alreadyConnectedFirstTime = true;

                    delegateConnectedCallback(self);
                }
            };

            self.sockjs.onortcerror = function (e) {
                lastKeepAlive = new Date().getTime();

                var data = e.data;
                var operation = data.op;
                var channel = data.ch;
                var error = data.ex ? data.ex : data;

                delegateExceptionCallback(self, error);

                switch (operation) {
                    case 'validate':
                        if(error.indexOf("busy") < 0){
                            invalidConnection = true;
                            clearValidatedTimeout(self);
                            retryingWithSsl = false;
                            stopReconnectProcess();
                        }else{
                            clearValidatedTimeout(self);
                            retryingWithSsl = false;
                        }
                        break;
                    case 'subscribe':
                        if (channel && subscribedChannels[channel]) {
                            subscribedChannels[channel].isSubscribing = false;
                        }
                        break;
                    case 'subscribe_maxsize':
                    case 'unsubscribe_maxsize':
                    case 'shutdown' :
                        clearValidatedTimeout(self);
                        retryingWithSsl = false;
                        break;
                    case 'send_maxsize':
                        if (channel && subscribedChannels[channel]) {
                            subscribedChannels[channel].isSubscribing = false;
                        }

                        stopReconnectProcess();
                        break;
                    default:
                        break;
                }
            };

            self.sockjs.onortcack = function (e) {
                var msgId = e.msgId;
                var msgPart = e.msgPart;
                var curSequenceId = e.curSeq;
                var err = e.err;
                var pendingMsg = pendingPublishMessages[msgId];

                if(pendingMsg) {
                    // clear pending ack timeout
                    clearTimeout(pendingMsg.timeout);

                    if(err) {
                        delete pendingPublishMessages[msgId];
                        if(pendingMsg.callback) {
                            pendingMsg.callback(err);
                        }
                    } else if(msgPart === pendingMsg.totalNumOfParts) {
                        // all message parts acknowledged
                        delete pendingPublishMessages[msgId];
                        if(pendingMsg.callback) {
                            pendingMsg.callback(null, curSequenceId);
                        }
                    }
                }
            }
        }

        return self.sockjs;
    };

    var jsonp = function(url,callback) {
        var head = document.head ? document.head : document.getElementsByTagName('head')[0];
        var script = document.createElement("script");

        var guid = "ortcJsonp" + (+new Date());

        var jsonpCallTimeout = setTimeout(function(){
            try{
                callback('Unable to get data',null);
                window[guid] = undefined;

                delete window[guid];
                head.removeChild(script);
            }catch(e){}
        },15*1000);

        window[guid] = function(data){
            clearTimeout(jsonpCallTimeout);
            if(data.error){
                callback(data.error,null);
            }else{
                callback(null,data.content);
            }

            try{
                window[guid] = undefined;
                delete window[guid];
                head.removeChild(script);
            }catch(e){}
        }

        script.setAttribute("src", url + '?callback='+guid);
        head.appendChild(script);
  }

    var delegateConnectedCallback = function (ortc) {
        if (ortc != null && ortc.onConnected != null) {
            startHeartBeatInterval(ortc);
            ortc.onConnected(ortc);
        }
    };

    var delegateDisconnectedCallback = function (ortc) {
        if (ortc != null && ortc.onDisconnected != null) {
            ortc.onDisconnected(ortc);
        }
    };

    var delegateSubscribedCallback = function (ortc, channel) {
        if (ortc != null && ortc.onSubscribed != null && channel != null) {
            ortc.onSubscribed(ortc, channel);
        }
    };

    var delegateUnsubscribedCallback = function (ortc, channel) {
        if (ortc != null && ortc.onUnsubscribed != null && channel != null) {
            ortc.onUnsubscribed(ortc, channel);
        }
    };

    var delegateMessagesCallback = function (ortc, channel, filtered, message, seqId) {
        if (ortc != null && subscribedChannels[channel] && subscribedChannels[channel].isSubscribed && subscribedChannels[channel].onMessageCallback != null) {
            var withOptions = subscribedChannels[channel].withOptions;

            if(withOptions) {
                // subscription using options 
                var messageObj = {
                    channel: channel,
                    seqId: seqId,
                    filtered: filtered,
                    message: message
                }

                subscribedChannels[channel].onMessageCallback(ortc, messageObj);
            } else {
                if(filtered == null) {
                    // regular subscription
                    subscribedChannels[channel].onMessageCallback(ortc, channel, message);
                } else {
                    // filtered subscription
                    subscribedChannels[channel].onMessageCallback(ortc, channel, filtered, message);
                }
            }
        }
    };

    var delegateExceptionCallback = function (ortc, event) {
        if (ortc != null && ortc.onException != null) {
            ortc.onException(ortc, event);
        }
    };

    var delegateReconnectingCallback = function (ortc) {
        if (ortc != null && ortc.onReconnecting != null) {
            ortc.onReconnecting(ortc);
        }
    };

    var delegateReconnectedCallback = function (ortc) {
        if (ortc != null && ortc.onReconnected != null) {
            startHeartBeatInterval(ortc);
            ortc.onReconnected(ortc);
        }
    };
};

//=====================IbtRealTimeSJ.js============================

// For easier usage of the default client type (without factory instance)
var RealtimeMessaging = {
    createClient: function () {
        return new IbtRealTimeSJ();
    } 
};