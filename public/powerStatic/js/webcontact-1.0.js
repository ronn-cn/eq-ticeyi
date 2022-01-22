/*--------------------------------------------------------------------------
* wc.js - web contact for JavaScript
* ver 0.0.1.0 (2020-03-23)
*
* created and maintained by wanglong
*--------------------------------------------------------------------------*/

WebContact = function(addr){
    var _this = this;
    var _ws = null;
    var _config = {
        debug:true
    };
    var _listenerList = { 
        //插件事件数组
        "onopen":function(e){
            _this._console("onopen");
            _this._console(e);
        },
        "onclose":function(e){
            _this._console("onclose");
            _this._console(e);
        },
        "onerror":function(e){
            _this._console("onerror");
            _this._console(e);
        },
        "resAppInfo":function(data){
            _this._console(data);
        },
        "resUserList":function(data){
            _this._console(data);
        },
        "resDefaultUser":function(data){
            _this._console(data);
        },
        "resSetDefaultUser":function(data){
            _this._console(data);
        },
        "resLoginQrcode":function(data){
            _this._console(data);
        },
        "resLessonAction":function(data){
            _this._console(data);
        }
     };
    var _ev = {
        dispatch : function(eventKey){
            var args = Array.prototype.slice.call(arguments,1);
            _listenerList[eventKey].apply(this,args);
            return this;
        },
        listener : function(eventKey, callback) {
            if(typeof eventKey ==="string"&& typeof callback==="function"){
               _listenerList[eventKey] = callback;
            }
            return this;
        }
    }
    _this._console = function(e){
        if (_config.debug){
            console.log(e);
        }
    };
    _this.on = _ev.listener;
    _this.trigger = _ev.dispatch;

    _this.connect = function(addr){
        if (typeof addr === "string" && addr != ""){
            _ws = new WebSocket(addr);
            if (_ws){
                _this._console(addr+" is ok!");
            }
            _ws.onopen = function(e){
                _this.trigger("onopen",e);
            }
            _ws.onmessage = function(e){
                var obj = null;
                if (typeof e.data === "object"){
                    obj = e.data;
                } else if(typeof e.data === "string"){
                    obj = JSON.parse(e.data);
                } else {
                    _this.trigger("onerror",e);
                    return;
                }
                switch(obj.cmd) {
                    case "resAppInfo":
                        _this.trigger("resAppInfo",obj.data);
                        break;
                    case "resUserList":
                        _this.trigger("resUserList",obj.data);
                        break;
                    case "resDefaultUser":
                        _this.trigger("resDefaultUser",obj.data);
                        break;
                    case "resSetDefaultUser":
                        _this.trigger("resSetDefaultUser",obj.data);
                        break;
                    case "resLoginQrcode":
                        _this.trigger("resLoginQrcode",obj.data);
                        break;
                    case "resLessonAction":
                        _this.trigger("resLessonAction",obj.data);
                        break;
                    default:
                        if(_listenerList[obj.cmd]){
                            _this.trigger(obj.cmd,obj.data);
                        } else {
                            _this.trigger("onerror", e);
                        }
                        break;
                }
            }
            _ws.onclose = function(e){
                _this.trigger("onclose",e);
            }
            _ws.onerror = function(e){
                _this.trigger("onerror",e);
            }
        } else {
            _this._console(addr+"is not err!");
        }
    }
    if (typeof addr === "string" && addr != ""){
        _this.connect(addr);
    }

    _this.send = function(msg){
        _this._console("wc:send");
        _this._console(msg);
        if (_ws && _ws.readyState == _ws.OPEN){
            _ws.send(msg);
        } else {
            _this.trigger("onerror");
        }
    }

    _this.disconnect = function(){
        _this._console("wc:disconnect");
    }
    return _this;
};