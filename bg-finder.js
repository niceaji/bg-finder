var jes={};
jes.$=function(s) { return document.getElementById(s) };
jes.getEl=function(e){var E=jes.getE(e);return E.target || E.srcElement}
jes.getE=function(e){return e || window.event}
jes.addEvent=function(object, type, listener) {	
	if(object.addEventListener) {if(type=='mousewheel')type='DOMMouseScroll'; object.addEventListener(type, listener, false)}
	else { object.attachEvent("on"+type, listener); }
};
jes.stopEvent=function(event) {
	var e=event || window.event;
	if(e.preventDefault) {e.preventDefault(); e.stopPropagation(); }
	else {e.returnValue = false; e.cancelBubble = true;}

};
jes.getStyle=function(el, style) {
	var value = el.style[style];
	if(!value)
	{
		if(document.defaultView && document.defaultView.getComputedStyle) 
		{
			var css = document.defaultView.getComputedStyle(el, null);
			value = css ? css[style] : null;
		} 
		else if (el.currentStyle) value = el.currentStyle[style];
	}
	return value == 'auto' ? null : value;
};
jes.getScroll=function () {
	if(document.all && typeof document.body.scrollTop != "undefined")
	{
		var cont=document.compatMode!="CSS1Compat"?document.body:document.documentElement;
		return {left:cont.scrollLeft, top:cont.scrollTop, width:cont.clientWidth, height:cont.clientHeight}
	}
	else 
		return {left:window.pageXOffset, top:window.pageYOffset, width:window.innerWidth, height:window.innerHeight}
};

jes.findBGImg=function(event){
	var e=jes.getE(event);
	var el=jes.getEl(event);
	
	if(el.tagName=='A' && el.className=='bglist')
	{
		return;
	}

	jes.$('bgImgInfo').style.display='none';

	var bg = '';
	var arr=[];
	
	
	while(el.tagName!="HTML")
	{
		bg = jes.getStyle(el,'backgroundImage');
		
		if(bg!='none')
		{
			bg = bg.replace(/url\("?(.+[^"])"?\)/,'$1');
			arr[arr.length] = bg;
		}
		el = el.parentNode;
	}
	
	if(arr.length>0)
	{
		var s='';
		for(var i=0; i<arr.length; i++)
		{
			s+= '<a href="'+arr[i]+'" target="_blank" class="bglist">'+arr[i]+'</a><br>';
		}

		jes.$('bgImgInfo').innerHTML = s;


	
		var scroll = jes.getScroll();

		jes.$('bgImgInfo').style.left=(e.clientX+scroll.left)+"px";
		jes.$('bgImgInfo').style.top=(e.clientY+scroll.top+20)+"px";
		jes.$('bgImgInfo').style.display='block';
	}
	else
	{
		//alert('none');
	}

	jes.stopEvent(event);
};

jes.addEvent(document, 'click',jes.findBGImg);


/*
var styles = document.createElement('style');
styles.setAttribute('type', 'text/css');
//styles.innerHTML = '#bgImgInfo{position:absolute;top:0;left:0;background-color:#FFFFF7;display:none;border:1px solid #666;z-index:10000;padding:5px;line-height:1.5;text-align:left;}#bgImgInfo a{color:#000;font:11px verdana;letter-spacing:-1px;text-decoration:none}'
//styles.addRule("#bgImgInfo", "position:absolute;top:0;left:0;background-color:#FFFFF7;display:none;border:1px solid #666;z-index:10000;padding:5px;line-height:1.5;text-align:left;", 0);
//styles.addRule("#bgImgInfo a", "color:#000;font:11px verdana;letter-spacing:-1px;text-decoration:none", 0);

document.getElementsByTagName('head')[0].appendChild(styles);
<link rel="stylesheet" href="http://photo-section.daum-img.net/css/tvzone/tvzone_new3.css" type="text/css">
*/

var link = document.createElement('link');
link.rel="stylesheet"; 
link.type="text/css"; 
link.href="http://asanal.byus.net/bm/bg.css"; 
document.getElementsByTagName('head')[0].appendChild(link);

var d=document.createElement("div");
d.id='bgImgInfo';
document.body.appendChild(d);

//iframe표시
var ifa= document.getElementsByTagName('iframe');
var div=null;
for(var i=0; i < ifa.length; i++)
{
	ifa[i].onmouseover=function(){		
		this.style.border="1px dashed red";
		if(confirm("iframe에 마우스를 올리셨군요^^\n이 메세지는 iframe에 마우스를 올릴때 마다 나와요~;\n\n새창으로 iframe을 열어재끼까요?\n(팝업이 허용되어야 합니다)")) 
		{
			window.open(this.src);
		}
	};
	ifa[i].onmouseout=function(){
		this.style.border="none";
	};
}

alert("BG Finder 로딩 완료!\n\nBG이미지를 찾고자 하는 부분에 클릭 해주세요!");
