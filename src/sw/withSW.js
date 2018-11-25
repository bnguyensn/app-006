var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
export default function withSW(C) {
    var CACHE_NAME = 'my-cache-v1';
    var CACHE_URLS = [
        '/',
    ];
    var CACHE_WHITELIST = [
        'my-cache-v1',
    ];
    return (function (_super) {
        __extends(WithSW, _super);
        function WithSW(props) {
            var _this = _super.call(this, props) || this;
            _this.installSW = function (e) {
                var preCache = function () { return __awaiter(_this, void 0, void 0, function () {
                    var cache;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, window.caches.open(CACHE_NAME)];
                            case 1:
                                cache = _a.sent();
                                return [4, cache.addAll(CACHE_URLS)];
                            case 2: return [2, _a.sent()];
                        }
                    });
                }); };
                e.waitUntil(preCache());
            };
            _this.SWRespond = function (e) {
                var res = function () { return __awaiter(_this, void 0, void 0, function () {
                    var m, fetchReq, fetchRes, fetchResClone, cache;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, window.caches.match(e.request)];
                            case 1:
                                m = _a.sent();
                                if (m) {
                                    return [2, m];
                                }
                                fetchReq = e.request.clone();
                                return [4, fetch(fetchReq)];
                            case 2:
                                fetchRes = _a.sent();
                                if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== 'basic') {
                                    return [2, fetchRes];
                                }
                                fetchResClone = fetchRes.clone();
                                return [4, window.caches.open(CACHE_NAME)];
                            case 3:
                                cache = _a.sent();
                                cache.put(e.request, fetchResClone);
                                return [2, fetchRes];
                        }
                    });
                }); };
                e.respondWith(res());
            };
            _this.SWActivate = function (e) {
                var f = function () { return __awaiter(_this, void 0, void 0, function () {
                    var cacheNames;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, window.caches.keys()];
                            case 1:
                                cacheNames = _a.sent();
                                return [2, Promise.all(cacheNames
                                        .reduce(function (acc, cacheName) {
                                        if (CACHE_WHITELIST.indexOf(cacheName) === -1) {
                                            acc.push(window.caches.delete(cacheName));
                                        }
                                        return acc;
                                    }, []))];
                        }
                    });
                }); };
                e.waitUntil(f());
            };
            if ('serviceWorker' in window.navigator) {
                window.navigator.serviceWorker.register('/sw.js')
                    .then(function (swReg) {
                    console.log('ServiceWorker registration successful with scope: '
                        + swReg.scope);
                }, function (err) {
                    console.log("ServiceWorker registration failed: " + err);
                });
            }
            window.addEventListener('install', _this.installSW);
            window.addEventListener('fetch', _this.SWRespond);
            window.addEventListener('activate', _this.SWActivate);
            return _this;
        }
        WithSW.prototype.componentWillUnmount = function () {
            window.removeEventListener('install', this.installSW);
            window.removeEventListener('fetch', this.SWRespond);
            window.removeEventListener('activate', this.SWActivate);
        };
        WithSW.prototype.render = function () {
            return (React.createElement(C, null));
        };
        return WithSW;
    }(React.PureComponent));
}
//# sourceMappingURL=withSW.js.map