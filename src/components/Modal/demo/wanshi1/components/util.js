import defaultsDeep from 'lodash/fp/defaultsDeep';

/**
 * 解析 URL 中的参数为 JSON
 * @param  {[type]} searchString [description]
 * @return {[type]}              [description]
 */
export function searchToObject(search) {
  return search.substring(1).split("&").reduce(function(result, value) {
    var parts = value.split('=');
    if (parts[0]) result[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
    return result;
  }, {})
}

/**
 * 对请求的接口数据进行 data 取值处理（暂时不建议使用，已在ajax API 中封装）
 * @param  {[type]} response       [返回数据]
 * @param  {[type]} errormessage   [自定义错误信息]
 * @param  {[type]} successmessage [自定义成功信息]
 * @return {[type]}                [description]
 */
export function lintData(response,errormessage,successmessage) {

  if(!response) return;

  let flag = response.flag;

  if(flag != 0) {
    summer.toast({msg:response.msg || errormessage});  //优先显示后台返回的错误信息
  }
  if(successmessage) {
    summer.toast({msg:successmessage});
  }

  return response;
}

/**
 * 基于 UA 判断设备情况
 * @return {[type]} [description]
 */
export function browserRedirect() {
  var browser={
    info:function(){
      var ua = navigator.userAgent, app = navigator.appVersion;
      return { //移动终端浏览器版本信息
        //trident: ua.indexOf('Trident') > -1, //IE内核
        //presto: ua.indexOf('Presto') > -1, //opera内核
        webKit: ua.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        //gecko: ua.indexOf('Gecko') > -1 && ua.indexOf('KHTML') == -1, //火狐内核
        mobile: !!ua.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: ua.indexOf('Android') > -1 || ua.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: ua.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: ua.indexOf('iPad') > -1, //是否iPad
        //webApp: ua.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        platform: navigator.platform
      };
    }(),
    lang:(navigator.browserLanguage || navigator.language).toLowerCase()
  };
  if(browser.info.platform.toLowerCase().indexOf("win")>= 0 || browser.info.platform.toLowerCase().indexOf("mac")>= 0){
    return "pc";
  }else if(browser.info.android){
    return "android";
  }else if(browser.info.ios || browser.info.iPhone || browser.info.iPad){
    return "ios";
  }else{
    return "";
  }
}

export function getQueryString (name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  
    if (r != null) return unescape(r[2]);  
    return null;  
} 

/**
 * 对请求的接口数据进行 data 取值处理（暂时不建议使用，已在ajax API 中封装）
 * @param  {[type]} response       [返回数据]
 * @param  {[type]} errormessage   [自定义错误信息]
 * @param  {[type]} successmessage [自定义成功信息]
 * @return {[type]}                [description]
 */
/** 用法：仅仅修改头部名字
 * param = {
  actionBar: {
        title: "兑换中心",//标题
  }
}*/
export function summerHeader(param){

    let defaultParam = {
        id: "guidaaaefasfdzf",//页面id
        url: "html/main.html",//页面路径
        create: "false",
        type: "actionBar",
        actionBar: {
            title: "我是测试",//标题
            titleColor: "#333333",//标题颜色
            backgroundColor: "#ffffff",//头部背景色
            leftItem:{
                image: "static/img/go_back.png",//头部左边
                text: "返回",
                textColor: "#333333",
                method:""//执行的回调，不传默认为closeWin
            },
            rightItems:[ {//右侧部分，可以传递一个数组
                type:"text",
                text: "完成",
                textColor: "#333333",
                method: "aaaa2()"//点击回调的方法
            },
             {
                type:"image",
                image: "img/speech.png",
                method: "aaaa1()"//点击回调的方法
            }]
        },
        isKeep: true,
        animation: {
            duration: 0
        }
    }

    let newParam = defaultsDeep(defaultParam,param);
    if (param.actionBar.rightItems) {
      newParam.actionBar.rightItems = param.actionBar.rightItems
    }else {
      delete newParam.actionBar.rightItems
    }

    summer.openWin(newParam);
}

/*
 * CircleType 0.36
 * Peter Hrynkow
 * Copyright 2014, Licensed GPL & MIT
 *
*/


/**
  options = {
    tagName:"demo", // 目标元素的类名
    radius:60       // 圆半径
    dir: 1,         // 文字环绕方向[1，-1]
    position: 'relative',
    fitText: false,   //自适应屏幕
    fontSizeUnit:'px',  //自适应屏幕字体单位
    kompressor:1, //自适应缩放比
    fontSize: 20  //默认文字大小
  }
 */

export function circleType(options) {

    function injector(name,t='', splitter='', klass='char', after='') {
        if(t=='') return;
        var text = name
        , a = text.split(splitter)
        , inject = '';
        if (a.length) {
            a.map(function(item, i) {
                inject += '<span class="'+klass+(i+1)+'" aria-hidden="true">'+item+'</span>'+after;
            });
            t.setAttribute("aria-label",text);
            t.textContent = "";
            t.innerHTML = inject;

        }
    }

    function fitText(options) {
        let target = document.getElementsByClassName(options.tagName)[0];
        debugger;
        // Setup options
        var compressor = options.kompressor || 1,
            settings = defaultsDeep({
              'minFontSize' : Number.NEGATIVE_INFINITY,
              'maxFontSize' : Number.POSITIVE_INFINITY
            }, options);
        

        target.style.fontSize = Math.max(Math.min(target.clientWidth / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + options.fontSizeUnit;

        window.onresize =function(){
            target.style.fontSize = Math.max(Math.min(target.clientWidth / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)) + options.fontSizeUnit;
        }

    };

    if(!options.tagName) return;

    var target = document.getElementsByClassName(options.tagName)[0];

    var self = this,
        settings = {
        dir: 1,
        position: 'relative',
        fitText: false,
        fontSizeUnit:'px',
        kompressor:1,
        fontSize: 20
    };

    function init(options) {
    
        if (options) { 
           settings = defaultsDeep(settings, options);
        }

        let elem = target, 
            delta = (180 / Math.PI),
            fs = parseInt(target.style.fontSize || settings.fontSize, 10),
            ch = parseInt(target.style.lineHeight, 10) || fs,
            txt = elem.innerHTML.replace(/^\s+|\s+$/g, '').replace(/\s/g, '&nbsp;'),
            letters, 
            center;

        elem.innerHTML = txt;
        //$(elem).lettering();
        injector(settings.name,target);

        elem.style.position =  settings.position;

        letters = elem.getElementsByTagName('span');
        center = Math.floor(letters.length / 2)
                
        let layout = function () {
            let tw = 0, 
                i,
                offset = 0,
                minRadius, 
                origin, 
                innerRadius,
                l, style, r, transform;
                                                
            for (i = 0; i < letters.length; i++) {
                tw += letters[i].offsetWidth;
            }

            minRadius = (tw / Math.PI) / 2 + ch;
            
            if (settings.fluid && !settings.fitText) {
                settings.radius = Math.max(elem.offsetWidth / 2, minRadius);
            }    
            else if (!settings.radius) {
                settings.radius = minRadius;
            }   
            
            if (settings.dir === -1) {
                origin = 'center ' + (-settings.radius + ch) / fs + 'em';
            } else {
                origin = 'center ' + settings.radius / fs + 'em';
            }

            innerRadius = settings.radius - ch;
                
            for (i = 0; i < letters.length; i++) {
                l = letters[i];
                offset += l.offsetWidth / 2 / innerRadius * delta;
                l.rot = offset;                      
                offset += l.offsetWidth / 2 / innerRadius * delta;
            }   
            for (i = 0; i < letters.length; i++) {
                l = letters[i];
                style = l.style;

                if(false) { // $summer.os == "android"
                    r = (-offset*2 * settings.dir / 2) + l.rot*2 * settings.dir;
                }else {
                    r = (-offset * settings.dir / 2) + l.rot * settings.dir;
                }
                
         
                transform = 'rotate(' + r + 'deg)';
                    
                style.position = 'absolute';
                style.left = '50%';
                style.marginLeft = -(l.offsetWidth / 2) / fs + 'em';

                style.webkitTransform = transform;
                style.MozTransform = transform;
                style.OTransform = transform;
                style.msTransform = transform;
                style.transform = transform;

                style.webkitTransformOrigin = origin;
                style.MozTransformOrigin = origin;
                style.OTransformOrigin = origin;
                style.msTransformOrigin = origin;
                style.transformOrigin = origin;
                if(settings.dir === -1) {
                    style.bottom = 0;
                }
            }
            
            if (settings.fitText) {
                fitText(settings);

                window.onresize = function() {
                  updateHeight();
                }
            }  

            updateHeight();
            
            if (typeof settings.callback === 'function') {
                // Execute our callback with the element we transformed as `this`
                settings.callback.apply(elem);
            }
        };
        
        var getBounds = function (elem) {
            var docElem = document.documentElement,
                box = elem.getBoundingClientRect();
            return {
                top: box.top + window.pageYOffset - docElem.clientTop,
                left: box.left + window.pageXOffset - docElem.clientLeft,
                height: box.height
            };
        };       
        
        var updateHeight = function () {
            var mid = getBounds(letters[center]),
                first = getBounds(letters[0]),
                h;
            if (mid.top < first.top) {
                h = first.top - mid.top + first.height;
            } else {
                h = mid.top - first.top + first.height;
            }
            elem.style.height = h + 'px';  
        }

        if (settings.fluid && !settings.fitText) {
            window.onresize = function() {
              layout();
            }
        }    

        if (document.readyState !== "complete") {
            elem.style.visibility = 'hidden';
            window.onload = function() {
              elem.style.visibility = 'visible';
              layout();
            }
            
        } else {
            layout();
        }
    };

    init(options)
};



export function  generateQRCode(code,type,imgId){
    let param={
        type:type,
        data:code
    }
    param=JSON.stringify(param)
    var codeImg = summer.generateQRCode({
      size : 240,//二维码正方形的宽高
      content : param//生成二维码所需的源文字 string类型
    });
    var MyCode = $summer.byId(imgId);
    $summer.attr(MyCode,"src",codeImg);
  }


export const customStyles = 
  {
  overlay : {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 4000,
    backgroundColor   : 'rgba(0, 0, 0, 0.65)',
  },
  content : {
    position: 'absolute',
    border: '1px solid #eee',
    height: '2.6rem',
    width: '5rem',
    background: '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                 : '0.5rem 0.2rem 0.4rem .2rem ',
    textAlign:'center'

  }
    };

export const shareCustomStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
    content: {
        position: 'absolute',
        border: '1px solid #eee',
        width: '100%',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        outline: 'none',
        padding: '.2rem 0 0 0',
        textAlign: 'center',
        left: 0,
        bottom: 0
    }
}


