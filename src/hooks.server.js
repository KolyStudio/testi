/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
   const url = event.url;
   const userAgent = event.request.headers.get('user-agent') || '';
 
   const inAppBrowserPatterns = [
     'FB_IAB', 'FBAN', 'FBAV',
     'Instagram',
     'Twitter', 'TwitterAndroid',
     'Line/',
     'KAKAOTALK',
     'NAVER',
     'WhatsApp',
     'WeChat', 'MicroMessenger',
     'QQ/',
     'Snapchat',
     'Pinterest',
     'LinkedInApp'
   ];
 
   const isInApp = inAppBrowserPatterns.some(pattern => userAgent.includes(pattern));
   const isIOS = /iPhone|iPad|iPod/.test(userAgent);
 
   const extractIOSVersion = (userAgent) => {
     const match = userAgent.match(/(?:OS|iOS|Version)[\s/]*(\d+)[._]/);
     if (match) {
       return parseInt(match[1], 10);
     }
     return null;
   };
 
   const iosVersion = isIOS ? extractIOSVersion(userAgent) : null;
   const isIOSGreaterThan17 = iosVersion && iosVersion > 17;
 
   if (isInApp && !url.pathname.includes('redirected')) {
     let redirectUrl = url.origin + url.pathname;
 
     if (isIOS) {
       redirectUrl = `x-safari-${redirectUrl}`;
     } else if (/Android/.test(userAgent)) {
       const cleaned = redirectUrl.replace(/^https?:\/\//, '');
       redirectUrl = `intent://${cleaned}#Intent;scheme=https;package=com.android.chrome;end`;
     }
 
     return new Response('Redirecting...', {
       status: 302,
       headers: {
         Location: redirectUrl
       }
     });
   }
 
   return await resolve(event);
 }
 