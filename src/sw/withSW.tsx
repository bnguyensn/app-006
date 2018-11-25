import * as React from 'react';

/** This HOC injects the ServiceWorker registration into the <App /> component.
 */
export default function withSW<P extends object>(C: React.ComponentType<P>) {
  const CACHE_NAME = 'my-cache-v1';
  const CACHE_URLS = [
    '/',
  ];
  const CACHE_WHITELIST = [
    'my-cache-v1',
  ];

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

      // Listen to fetch events
      window.addEventListener('fetch', this.SWRespond);

      // Listen for activation
      window.addEventListener('activate', this.SWActivate);
    }

    componentWillUnmount() {
      // Remove events
      window.removeEventListener('install', this.installSW);
      window.removeEventListener('fetch', this.SWRespond);
      window.removeEventListener('activate', this.SWActivate);
    }

    installSW = (e: ExtendableEvent) => {
      const preCache = async () => {


        const cache = await window.caches.open(CACHE_NAME);
        return await cache.addAll(CACHE_URLS)
      };

      e.waitUntil(preCache());
    };

    SWRespond = (e: FetchEvent) => {
      const res = async () => {
        const m = await window.caches.match(e.request);
        if (m) {
          return m
        }

        // e.request is a stream which can only be consumed once. Thus we are
        // cloning it to make the fetch() call
        const fetchReq = e.request.clone();
        const fetchRes = await fetch(fetchReq);

        if (!fetchRes || fetchRes.status !== 200 || fetchRes.type !== 'basic') {
          // Error occurred when fetching request. Will fail on any of these:
          // 1. Response invalid
          // 2. Status not 200
          // 3. Request not from our origin (no need to cache 3rd-party assets)
          return fetchRes
        }

        // No errors when fetching request. We clone fetchRes as well, for the
        // same reason
        const fetchResClone = fetchRes.clone();

        // Let's cache the fetch result
        const cache = await window.caches.open(CACHE_NAME);
        cache.put(e.request, fetchResClone);

        return fetchRes
      };

      e.respondWith(res());
    };

    SWActivate = (e: ExtendableEvent) => {
      const f = async () => {
        const cacheNames = await window.caches.keys();

        return Promise.all(
          // Loop through all non-white listed caches and remove them
          cacheNames
            .reduce((acc: Array<Promise<boolean>>, cacheName: string) => {
              if (CACHE_WHITELIST.indexOf(cacheName) === -1) {
                acc.push(window.caches.delete(cacheName));
              }
              return acc
            }, []),
        )
      };

      e.waitUntil(f());
    };

    render() {
      return (
        <C/>
      )
    }
  };
}
