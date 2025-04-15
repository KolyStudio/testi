/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
   // Récupérer l'URL de la requête
   const url = event.url;
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
   if (isInApp && !url.pathname.includes('redirected')) {
     // Détecter le système (iOS ou Android)
     const isIOS = /iPhone|iPad|iPod/.test(userAgent);
     const isAndroid = /Android/.test(userAgent);
 
     // Récupérer l'URL de la requête pour la redirection
     let redirectUrl = url.toString(); // Cela utilise l'URL complète de la requête
 
     // Si sur iOS, redirection vers Safari (exemple x-safari-URL)
     if (isIOS) {
       redirectUrl = `x-safari-${redirectUrl}`;
     } else if (isAndroid) {
       // Si sur Android, redirection via intent:// pour ouvrir dans Chrome
       const cleaned = redirectUrl.replace(/^https?:\/\//, '');
       redirectUrl = `intent://${cleaned}#Intent;scheme=https;package=com.android.chrome;end`;
     }
 
     // Ajouter le paramètre "redirected" pour éviter une boucle de redirection
     redirectUrl += (redirectUrl.includes('?') ? '&' : '?') + 'redirected=true';
 
     // Retourner une réponse de redirection
     return new Response('Redirecting...', {
       status: 302,
       headers: {
         Location: redirectUrl
       }
     });
   }
 
   // Continuer normalement si ce n'est pas une application mobile ou déjà redirigé
   return await resolve(event);
 }
 