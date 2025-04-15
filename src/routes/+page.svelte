<script>
   import { browser } from "$app/environment";
   import { onMount } from "svelte";

   onMount(() => {
      if (browser) {
         const ua = navigator.userAgent;
         if (
            /FBAN|FBAV|Twitter|TwitterAndroid|Instagram|LinkedIn|Pinterest|MicroMessenger|WhatsApp|Snapchat|Line\/|KAKAOTALK/.test(
               ua,
            )
         ) {
            window.location.href = "x-safari-https://testi-4c8n.vercel.app/";
         }
      }
   });
</script>
