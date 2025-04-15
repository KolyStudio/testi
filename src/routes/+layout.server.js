/** @type {import('./$types').LayoutServerLoad} */
export function load({ request }) {
  // Récupérer le User-Agent pour l'utiliser dans les composants si nécessaire
  const userAgent = request.headers.get('user-agent') || '';
  
  return {
    userAgent
  };
}
