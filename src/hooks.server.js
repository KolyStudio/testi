/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
   // Récupérer le User-Agent
   const userAgent = event.request.headers.get('user-agent') || '';
   
   // Liste des patterns pour détecter les applications mobiles
   const inAppBrowserPatterns = [
     'FB_IAB', 'FBAN', 'FBAV', // Facebook
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
   
   // Vérifier si l'utilisateur est dans une application mobile
   const isInApp = inAppBrowserPatterns.some(pattern => userAgent.includes(pattern));
   
   // Si l'utilisateur est dans une application mobile et que ce n'est pas déjà une redirection
   if (isInApp && !event.url.pathname.includes('redirected')) {
     // Détecter le système (iOS ou Android)
     const isIOS = /iPhone|iPad|iPod/.test(userAgent);
     const isAndroid = /Android/.test(userAgent);
 
     let redirectUrl = 'https://testi-4c8n.vercel.app/'; // Par défaut, redirection vers Safari
 
     if (isIOS) {
       // Si sur iOS, redirection vers Safari (exemple x-safari-URL)
       redirectUrl = `x-safari-${redirectUrl}`;
     } else if (isAndroid) {
       // Si sur Android, redirection via intent:// (pour Chrome)
       const cleaned = redirectUrl.replace(/^https?:\/\//, '');
       redirectUrl = `intent://${cleaned}#Intent;scheme=https;package=com.android.chrome;end`;
     }
 
     // Ajouter le paramètre "redirected" pour ne pas boucler dans la redirection
     return new Response('Redirecting...', {
       status: 302,
       headers: {
         Location: redirectUrl
       }
     });
   }
   
   // Continuer normalement si ce n'est pas une application mobile ou si déjà redirigé
   return await resolve(event);
 }
 