<script>
	import { onMount } from 'svelte';

	import Header from '$lib/header/Header.svelte';
	import '../app.css';

	onMount(async () => {
		// setup some globals
		import('buffer').then((Buffer) => {
			global.Buffer = Buffer.Buffer;
		});
	});
</script>

<!-- src/routes/__layout.svelte -->
<svelte:head>
	<script>
		global = globalThis; // for solana web3 repo
	</script>
</svelte:head>

<Header />

<main>
	<slot />
</main>

<footer>
	<p>(C) Copyright 2021 Doug Anderson aka @DougAnderson444</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	/* footer a {
		font-weight: bold;
	} */

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
