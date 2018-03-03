// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 482);
/******/ })
/************************************************************************/
/******/ ({

/***/ 482:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var host = 'http://59.110.169.246/movie/';
// var host='http://192.168.1.101:8080/'


exports.default = {

    postShort: function postShort(weg, param, header, start, success, compelete) {
        var modal = weex.requireModule("modal");
        this.postFull(weg, param, header, start, success, function (res) {
            //fail
            modal.toast({ message: res.msg });
        }, function () {
            //exception
            modal.toast({ message: '网络异常！' });
        }, function () {
            //compelete

            compelete();
        });
    },

    postFull: function postFull(weg, param, header, start, success, fail, exception, compelete) {
        var net = weex.requireModule("net");
        var modal = weex.requireModule("modal");
        var self = this;
        var url = host + weg;
        var st = weex.requireModule('static');
        var token = st.getString('token');
        if (token != undefined && token != '') {
            header.token = token;
        }
        // param.token='95d594d7b18fd1c7db37e81dd5bae9c9'
        net.post(url, param, header, function () {
            //start
            start();
        }, function (e) {
            //success
            // modal.toast({message:e.res.err})
            if (e.res.err == 0) {

                success(e.res);
            } else {
                // modal.toast({message:e.res.msg})
                if (token != undefined && token != '') {
                    st.remove('token');
                    return;
                }
                if (e.res.err == 1000) {
                    // var nav=weex.requireModule("navigator")
                    // nav.presentFull('root:busi/account/login.js',{},'transparent',true,function(){
                    //     self.postFull(weg,param,header,start,success,fail,exception,compelete);

                    // },true);
                } else fail(e.res);
            }
        }, function (e) {
            //compelete


            compelete();
        }, function (e) {
            // exception
            exception();
        });
    },

    post: function post(weg, param, success) {
        var progress = weex.requireModule("progress");
        this.postShort(weg, param, {}, function () {
            progress.show();
        }, success, function () {
            progress.dismiss();
        });
    },

    postSilent: function postSilent(weg, param, success) {

        this.postFull(weg, param, {}, function () {}, success, function (res) {
            //fail

        }, function () {
            //exception

        }, function () {
            //compelete


        });
    }

};

/***/ })

/******/ });