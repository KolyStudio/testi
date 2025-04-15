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
            window.location.href =
               "x-safari-https://testtest-one-beta.vercel.app/";
         }
      }
   });
</script>
