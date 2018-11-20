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
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
function withSW(C) {
    return (function (_super) {
        __extends(WithSW, _super);
        function WithSW(props) {
            var _this = _super.call(this, props) || this;
            _this.installSW = function (e) {
                var CACHE_NAME = 'my-cache-v1';
                var CACHE_URLS = [
                    '/',
                ];
                e.waitUntil(window.caches.open(CACHE_NAME)
                    .then(function (cache) {
                    console.log("Opened cache " + CACHE_NAME);
                    return cache.addAll(CACHE_URLS);
                }, function (err) {
                    console.log("Error opening cache: " + err);
                }));
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
            return _this;
        }
        WithSW.prototype.componentWillUnmount = function () {
            window.removeEventListener('install', this.installSW);
        };
        WithSW.prototype.render = function () {
            return (React.createElement(C, null));
        };
        return WithSW;
    }(React.PureComponent));
}
var AppWithSW = withSW(App);
ReactDOM.render(React.createElement(AppWithSW, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map