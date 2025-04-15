import { browser } from '$app/environment';

export function load() {
  if (browser) {
    const ua = navigator.userAgent;
    if (
      /FBAN|FBAV|Twitter|TwitterAndroid|Instagram|LinkedIn|Pinterest|MicroMessenger|WhatsApp|Snapchat|Line\/|KAKAOTALK/.test(ua)
    ) {
      window.location.href = "x-safari-https://testi-4c8n.vercel.app/";
      return new Promise(() => {}); // Bloque le chargement pendant la redirection
    }
  }
  return {};
}
