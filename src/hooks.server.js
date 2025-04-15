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
    // Rediriger vers l'URL spécifiée
    return new Response('Redirecting...', {
      status: 302,
      headers: {
        Location: 'x-safari-https://testtest-one-beta.vercel.app/'
      }
    });
  }
  
  // Continuer normalement si ce n'est pas une application mobile
  return await resolve(event);
}
