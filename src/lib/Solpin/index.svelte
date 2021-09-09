<script>
	import { onMount } from 'svelte';

	import { DappLib } from '../../dapplib/src/dapp-lib.js';

	let hellos = [];
	let random;
	let increment;

	onMount(async () => {
		increment = async () => {
			await DappLib.saveString(random);
			getHellos();
		};

		setRandom();
		getHellos();
	});

	async function getHellos() {
		hellos = [...hellos, await DappLib.countHellos({})];
		console.log({ hellos });
	}

	function setRandom() {
		random = '_' + Math.random().toString(36).substr(2, 9);
	}
</script>

{random}<br />
{#if hellos}
	<button on:click={increment}>+</button><br />
	Hellos: <br />
	{#each hellos as hello}
		{hello?.result}<br />
	{/each}<br />
{/if}
