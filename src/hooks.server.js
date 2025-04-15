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

   // Fonction pour extraire la version d'iOS
   /** @param {string} userAgent */
   const extractIOSVersion = (userAgent) => {
     const match = userAgent.match(/OS (\d+)_/); // Extrait la version iOS
     if (match) {
       return parseInt(match[1], 10); // Retourne la version majeure (ex. 16 ou 17)
     }
     return null;
   };

   // Vérifier si l'utilisateur est sur iOS et obtenir la version
   const isIOS = /iPhone|iPad|iPod/.test(userAgent);
   const iosVersion = isIOS ? extractIOSVersion(userAgent) : null;

   // Vérifier si la version d'iOS est supérieure à 17
   const isIOSGreaterThan17 = iosVersion && iosVersion > 17;

   // Si l'utilisateur est dans une application mobile et que ce n'est pas déjà une redirection
   if (isInApp && !url.pathname.includes('redirected')) {
     // Récupérer l'URL de la requête et nettoyer la partie après le ?
     let redirectUrl = url.origin + url.pathname;

     // Si sur iOS et la version est supérieure à 17, redirection vers Safari
     if (isIOS && isIOSGreaterThan17) {
       redirectUrl = `x-safari-${redirectUrl}`;
     } else if (isIOS) {
       // Si sur iOS mais version inférieure ou égale à 17, gestion spécifique si besoin
       redirectUrl = `x-safari-${redirectUrl}`;
     } else if (/Android/.test(userAgent)) {
       // Si sur Android, redirection via intent:// pour ouvrir dans Chrome
       const cleaned = redirectUrl.replace(/^https?:\/\//, '');
       redirectUrl = `intent://${cleaned}#Intent;scheme=https;end`;
     }

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
