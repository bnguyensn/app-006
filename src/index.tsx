import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

/**
 * This HOC injects the ServiceWorker registration into the <App /> component.
 * */
function withSW<P extends object>(C: React.ComponentType<P>) {
  return class WithSW extends React.PureComponent<P> {
    constructor(props: P) {
      super(props);

      // Register service worker
      if ('serviceWorker' in window.navigator) {
        window.navigator.serviceWorker.register('/sw.js')
          .then(
            (swReg) => {
              console.log(
                'ServiceWorker registration successful with scope: '
                + swReg.scope,
              );
            },
            (err) => {
              console.log(`ServiceWorker registration failed: ${err}`);
            });
      }

      // Install service worker
      window.addEventListener('install', this.installSW);
    }

    componentWillUnmount() {
      // Remove the service worker installation event
      window.removeEventListener('install', this.installSW);
    }

    installSW = (e) => {
      const CACHE_NAME = 'my-cache-v1';
      const CACHE_URLS = [
        '/',
      ];

      e.waitUntil(
        // 1. Open a cache
        window.caches.open(CACHE_NAME)
          .then(
            (cache) => {
              console.log(`Opened cache ${CACHE_NAME}`);
              return cache.addAll(CACHE_URLS);
            },
            (err) => {
              console.log(`Error opening cache: ${err}`);
            })
      );
    };

    render() {
      return (
        <C />
      )
    }
  }
}

const AppWithSW = withSW(App);

ReactDOM.render(
  <AppWithSW />, document.getElementById('root'),
);
