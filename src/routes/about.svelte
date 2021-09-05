<script context="module">
	import { browser, dev } from '$app/env';

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<h1>About this app</h1>

	<p>
		The problem with Web3 data is it's usually immutable, like when you save to IPFS or Arweave --
		once the data is saved, you get a Transaction ID (or IPFS Content ID) back and that's it.
	</p>

	<p>
		What if you want to update your website? You'd have to refresh the Tx ID every time? Pfft, I
		don't think so.
	</p>

	<p>
		Solutions like IPNS don't really work well. P2P attempts such as
		[HyPNS](https://github.com/DougAnderson444/hypns) require a server to be kept online to pin the
		data.
	</p>

	<p>But Solana costs pennies for mutable posts, so why not just make life easy and use Solana?</p>

	<p>What if you want to hand out a link to someone, that points to the latest updates?</p>

	<p>
		That's what SOLPIN solves. It gives you a permanent but mutable link on Solana that points to
		the latest version of your saved Web3 data. Want an old version? Just go back in the SOLPIN
		transaction history and grab it.
	</p>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>
