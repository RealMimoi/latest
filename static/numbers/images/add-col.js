var w,h,my={};function addcolMain(){w=360;h=130;my.adda=getQueryVariable('adda');my.addb=getQueryVariable('addb');if(!my.adda)my.adda=16;if(!my.addb)my.addb=16;my.adda=String(my.adda);my.addb=String(my.addb);my.bad=getQueryVariable('bad');if(!my.bad)my.bad=0;my.colMax=Math.max(my.adda.length,my.addb.length);my.cols=[];for(var i=0;i<my.colMax;i++){var col=new Col();col.a=parseInt(my.adda.charAt(my.colMax-i-1));col.b=parseInt(my.addb.charAt(my.colMax-i-1));col.n=i;my.cols.push(col);}
var s="";s+='<div style="position:relative; width:'+w+'px; min-height:'+h+'px; border: none; border-radius: 20px; background-color: white; margin:auto; display:block;">';s+='<div style="position:absolute; left:10px; top:10px;">';s+=getPlayHTML(36);s+='</div>';for(i=0;i<my.colMax;i++){s+='<div id="col'+i+'" style="font: 21px Arial; color: blue; position:absolute; left:'+(100-i*15)+'px; top:10px; width:100px; text-align:center; transition: all linear 1s; z-index: 100;">';s+=my.cols[i].getHTML();s+='</div>';}
s+='<div id="plus" style="position:absolute; left:55px; top:45px; font: 20px Arial;">+</div>';s+='<div id="lines" style="position:absolute; left:55px; top:70px; width:80px; height:27px; border-top: 2px solid black;  border-bottom: 2px solid black;  "></div>';s+='<div id="bad" style="position:absolute; left:150px; top:65px; font:bold 23px Verdana; color:red  ">(Bad)</div>';s+='<div id="frame" style="position:absolute; left:150px; top:95px; font: 18px Verdana;"></div>';s+='</div>';document.write(s);my.resetQ=true;my.colNo=0;my.playQ=true;togglePlay();}
function reset(){document.getElementById('bad').style.opacity=0;for(var i=0;i<my.colMax;i++){var col=my.cols[i];col.reset();col.frame=0;}
my.colNo=0;}
function doNext(carry){my.colNo++;if(my.colNo<my.colMax){var col=my.cols[my.colNo];col.frame=0;col.carry=carry;col.reset();col.anim();}else{togglePlay();my.resetQ=true;if(my.bad==1)document.getElementById('bad').style.opacity=1;}}
function togglePlay(){if(my.resetQ){reset();my.resetQ=false;}
if(this.frame>=this.frameMax){this.frame=0;}
var btn='playBtn';if(my.playQ){my.playQ=false;document.getElementById(btn).classList.add("play");document.getElementById(btn).classList.remove("pause");}else{my.playQ=true;document.getElementById(btn).classList.add("pause");document.getElementById(btn).classList.remove("play");}
if(my.colNo<my.colMax)my.cols[my.colNo].anim();}
function setId(id,visQ,v,x,y){var div=document.getElementById(id);if(typeof visQ!=='undefined'){if(visQ){div.style.opacity=1;}else{div.style.opacity=0;}}
if(v!=-1)div.innerHTML=v;if(typeof x!=='undefined')div.style.left=x+'px';if(typeof y!=='undefined')div.style.top=y+'px';}
function Point(x,y){this.x=x;this.y=y;}
Point.prototype.set=function(x,y){this.x=x;this.y=y;};function Col(){this.carry=0;this.a=0;this.b=0;this.sum=0;this.frame=0;this.frameMax=500;this.n=0;this.isMovingQ=false;}
Col.prototype.getHTML=function(){var id='c'+this.n;var s='';var hiClr='rgba(0,0,255,0.1)';var hiClr2='rgba(200,200,255,0.5)';var std='transition: all linear 1s;';s+='<div id="'+id+'a" style="position: absolute; left:0px; top:10px; text-align: right;width:25px;'+std+'">a</div>';s+='<div id="'+id+'b" style="position: absolute; left:0px; top:34px; text-align: right;width:25px;'+std+'">b</div>';s+='<div id="'+id+'hi" style="position: absolute; left:7px; top:-5px; width:25px; height:95px; border: none; background-color:'+hiClr+'; border-radius:20px;'+std+'"></div>';s+='<div id="'+id+'line" style="position: absolute; left:30px; top:20px; width:42px; border-top: 5px solid '+hiClr+';'+std+'"></div>';s+='<div id="'+id+'eq" style="position: absolute; left:70px; top:0px; width:150px; height:33px; border: 5px solid '+hiClr2+'; border-radius:20px;'+std+'">';s+='<div id="'+id+'eqlhs" style="position: absolute; left:10px; top:5px; color:goldenrod;  width:100px; text-align: center; '+std+'">a</div>';s+='<div id="'+id+'eqc" style="position: absolute; left:110px; top:5px; color:goldenrod;'+std+'">c</div>';s+='</div>';s+='<div id="'+id+'lblten" style="position: absolute; left:115px; top:45px; text-align: center;width:40px;font: bold 16px Arial; color: black;'+std+'">tens</div>';s+='<div id="'+id+'lblone" style="position: absolute; left:145px; top:45px; text-align: center;width:40px;font: bold 16px Arial; color: black;'+std+'">ones</div>';s+='<div id="'+id+'sum" style="position: absolute; left:150px; top:65px; text-align: right;width:30px; letter-spacing: 2px; color:goldenrod; '+std+'">45</div>';s+='<div id="'+id+'sumten" style="position: absolute; left:130px; top:65px; text-align: right;width:30px; color:goldenrod; '+std+'">4</div>';s+='<div id="'+id+'sumone" style="position: absolute; left:170px; top:65px; text-align: right;width:30px; color:goldenrod; '+std+'">5</div>';return s;};Col.prototype.reset=function(){var id='c'+this.n;setId(id+'a',true,this.a);setId(id+'b',true,this.b);setId(id+'hi',false,'');document.getElementById(id+'line').style.opacity=0;document.getElementById(id+'eq').style.opacity=0;setId(id+'eqlhs',false);setId(id+'eqc',false);setId(id+'sum',false,-1,175,10);setId(id+'sumone',false,-1,175,10);setId(id+'sumten',false,-1,175,10);document.getElementById(id+'sumten').style.fontSize='20px';setId(id+'lblten',false,-1,125,47);setId(id+'lblone',false,-1,175,47);};Col.prototype.anim=function(){this.frame++;var id='c'+this.n;var sum=this.carry+this.a+this.b;var tens=0;var ones=0;var carryQ=false;if(sum>=10&&this.n<my.colMax-1&&my.bad!=1){carryQ=true;tens=(sum/10)<<0;ones=sum%10;}
switch(this.frame){case 2:this.reset();break;case 20:setId(id+'hi',true,-1);break;case 50:var lhs='';if(this.carry>0){lhs+=this.carry+'+'+this.a+'+'+this.b+' =';}else{lhs+=this.a+' + '+this.b+' = ';}
setId(id+'eqlhs',true,lhs);document.getElementById(id+'line').style.opacity=1;document.getElementById(id+'eq').style.opacity=1;break;case 100:setId(id+'eqc',true,sum);break;case 150:setId(id+'sum',true,sum,170,10);break;case 170:setId(id+'sum',true,-1,150,65);break;case 240:setId(id+'sumten',false,-1,135,65);setId(id+'sumone',false,-1,150,65);if(!carryQ){setId(id+'sum',true,-1,-4,63);}
break;case 300:if(carryQ){setId(id+'sum',false,sum);setId(id+'sumten',true,tens,110,65);setId(id+'sumone',true,ones,175,65);setId(id+'lblten',true,-1,115,47);setId(id+'lblone',true,-1,175,47);}else{}
break;case 350:document.getElementById(id+'line').style.opacity=0;document.getElementById(id+'eq').style.opacity=0;break;case 450:document.getElementById(id+'hi').style.opacity=0;if(carryQ){setId(id+'lblten',false,-1);setId(id+'lblone',false,-1);setId(id+'sumten',true,-1,-24,-2);document.getElementById(id+'sumten').style.fontSize='15px';setId(id+'sumone',true,-1,-6,63);}
break;default:}
if(this.frame==this.frameMax){doNext(tens);}else{if(my.playQ)requestAnimationFrame(this.anim.bind(this));}};function getQueryVariable(variable){var query=window.location.search.substring(1);var vars=query.split("&");for(var i=0;i<vars.length;i++){var pair=vars[i].split("=");if(pair[0]==variable){return pair[1];}}
return false;}
function getPlayHTML(w){var s='';s+='<style type="text/css">';s+='.btn {display: inline-block; position: relative; text-decoration: none; cursor: pointer;  outline-style:none; width:'+w+'px; height:'+w+'px; margin-right:'+w*0.2+'px; padding: .6em; border: 0 solid rgba(208,208,248,1); border-radius: 10em; background: linear-gradient(#fff, #ccf), #c9c5c9; box-shadow: 0 3 4 rgba(0,0,0,.4); }';s+='.btn:hover {background: linear-gradient(#f5f5f5, #b9b9b9), #c9c5c9; }';s+='.btn:before, button:after {content: " "; position: absolute; }';s+='.btn:active {top:'+w*0.05+'px; box-shadow: 0 '+w*0.02+'px '+w*0.03+'px rgba(0,0,0,.4); }';s+='.play:before {  left: '+w*0.36+'px; top: '+w*0.22+'px; width: 0; height: 0; border: '+w*0.3+'px solid transparent; border-left-width: '+w*0.4+'px; border-left-color: blue;  }';s+='.play:hover:before {border-left-color: yellow; }';s+='.pause:before, .pause:after {display: block; left: '+w*0.29+'px; top: '+w*0.28+'px; width: '+w*0.19+'px; height: '+w*0.47+'px; background-color: blue; }';s+='.pause:after {left: '+w*0.54+'px; }';s+='.pause:hover:before, .pause:hover:after {background-color: yellow; }';s+='</style>';s+='<button id="playBtn" class="btn play" onclick="togglePlay()" ></button>';return s;}