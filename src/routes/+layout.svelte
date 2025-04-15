<script>
  // Vous pouvez accéder aux données du serveur avec data
  /** @type {import('./$types').LayoutData} */
  export let data;
</script>

<svelte:head>
  <title>Détection d'application mobile</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

<main>
  <slot />
</main>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  
  main {
    width: 100%;
    height: 100%;
  }
</style>
