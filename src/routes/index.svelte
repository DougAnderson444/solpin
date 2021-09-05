<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Counter from '$lib/Counter.svelte';

	const tweetUrl =
		'https://twitter.com/intent/tweet?url=' +
		'https://peerpiper.io' +
		'&text=' +
		encodeURIComponent(
			'Hey @DougAnderson444 can you make me a handle so I can use #peerpiper @PeerPiper? Thanks!'
		);
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		<div class="welcome">
			<picture>
				<a sveltekit:prefetch href="/app">
					<img src="/Paste.png" alt="Welcome" />
				</a>
			</picture>
		</div>

		your your data in<br />Web 3.0
	</h1>

	<h2>
		<a sveltekit:prefetch href="/app">try it</a> <strong>free</strong> in exchange for a
		<a href={tweetUrl} target="_blank">tweet</a>
	</h2>
	<a href={tweetUrl} target="_blank">
		<div class="col">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.2 112.2">
				<defs />
				<circle cx="56.1" cy="56.1" r="56.1" fill="#55acee" />
				<path
					fill="#f1f2f2"
					d="M90.5 40.3c-2.4 1-5 1.8-7.7 2.1 2.7-1.6 4.9-4.3 5.9-7.4a26.8 26.8 0 01-8.6 3.3 13.4 13.4 0 00-22.8 12.2 38 38 0 01-27.6-14 13.4 13.4 0 004.1 17.9c-2.2 0-4.3-.7-6-1.7v.2c0 6.5 4.6 11.9 10.7 13.1a13.4 13.4 0 01-6 .3C34 71.6 39 75.5 45 75.6A26.9 26.9 0 0125 81c6 3.8 13 6 20.6 6a37.9 37.9 0 0038-39.8c2.7-2 5-4.3 6.8-7z"
				/>
			</svg>
		</div>
	</a>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		width: 100%;
		height: auto;
	}

	.welcome img {
		width: 60%;
		max-width: 350px;
		margin: 0.5em;
		height: auto;
		display: inline-block;
	}
</style>
