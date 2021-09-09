<script>
	// load the component
	import Solpin from '$lib/Solpin/index.svelte';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<svelte:component this={Solpin} />
{/if}
