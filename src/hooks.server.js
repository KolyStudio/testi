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
   const isAndroid = /Android/.test(userAgent);
 
   const extractIOSVersion = (userAgent) => {
     const match = userAgent.match(/iPhone OS (\d+)_(\d+)/);
     if (match) {
       return parseFloat(`${match[1]}.${match[2]}`);
     }
     return null;
   };
 
   const iosVersion = isIOS ? extractIOSVersion(userAgent) : null;
   const isIOSGreaterThan17 = iosVersion && iosVersion >= 17;
   console.log(iosVersion)
   console.log(isIOSGreaterThan17)
   if (isInApp) {
     let redirectUrl = url.origin + url.pathname;
      
   //   if (isIOS & isIOSGreaterThan17) {
   //     redirectUrl = `x-safari-${redirectUrl}`;
   //   } else if (isAndroid) {
   //     const cleaned = redirectUrl.replace(/^https?:\/\//, '');
   //     redirectUrl = `intent://${cleaned}#Intent;scheme=https;package=com.android.chrome;end`;
   //   }
 
   //   return new Response('Redirecting...', {
   //     status: 302,
   //     headers: {
   //       Location: redirectUrl
   //     }
   //   });
   }
 
   return await resolve(event);
 }
 