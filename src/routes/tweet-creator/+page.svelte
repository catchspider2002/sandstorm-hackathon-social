<script>
	import { onMount, afterUpdate, tick, onDestroy } from 'svelte';
	import { key, keyData } from '../../stores.js';

	$: tweetText = '';

	async function getTweet() {
		console.log('getTweet');
		tweetText = await (
			await fetch(`https://cloudflare-worker-nft.solswatch.workers.dev/dojo-tweets`)
		)
			// await fetch(`https://dojotweets.naveencs.repl.co/tweets`)
			.json();
	}

	onMount(async () => {
		if ($keyData.length > 0) getTweet();
	});

	function copyText() {
		let textArea = document.createElement('textarea');
		textArea.value = tweetText;
		document.body.appendChild(textArea);
		textArea.select();
		document.execCommand('Copy');
		textArea.remove();
		document.getElementById('copyTweet').textContent = 'Copied!';
		setTimeout(function () {
			document.getElementById('copyTweet').textContent = 'Copy Tweet';
		}, 1500);
	}
</script>

<section class="px-2 py-32 md:px-0">
	<div class="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
		<h1 class="text-4xl font-extrabold tracking-tight text-left sm:text-5xl md:text-6xl md:text-center">
			<span class="block uppercase glorybolditalic">Tweet Creator</span>
		</h1>
		<p class="w-full mx-auto text-base text-left text-gray-400 gloryItalic sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
			Introduce yourself and showcase your Cyber Samurai NFT by generating a custom tweet
		</p>
	</div>
</section>

{#if $key == ''}
	<div class="text-2xl text-center mx-auto gloryItalic">Please connect your wallet.</div>
{:else if $keyData.length == 0}
	<div class="text-2xl text-center mx-auto gloryItalic">
		It looks like the wallet you are using does not contain a Cyber Samurai NFT, please connect the wallet that contains the Cyber Samurai NFT.
	</div>
{:else}
	<section class="px-10 py-24 mx-auto md:px-12 max-w-7xl">
		<div class="w-full mx-auto text-center xl:w-1/2 lg:w-3/4">
			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="inline-block w-8 h-8 mb-8 text-gray-500" viewBox="0 0 975.036 975.036"
				><path
					d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
				/></svg
			>
			<p class="text-xl text-gray-300 leading-relaxed md:text-3xl">{tweetText}</p>
			<span class="inline-block w-10 h-1 mt-8 mb-6 bg-std-accent-600 rounded" />
			<div class="flex place-content-center gap-8 mx-auto">
				<button on:click={getTweet} class="accent-button">Generate Tweet</button>
				<button id="copyTweet" on:click={copyText} class="accent-button">Copy Tweet</button>
				<a
					class="accent-button"
					rel="noopener noreferrer"
					title="Post Tweet"
					target="_blank"
					href="https://twitter.com/intent/tweet?text={tweetText.replace(/ /g, '%20').replace(/#/g, '%23').replace(/@/g, '%40')}"
				>
					Post Tweet
				</a>
			</div>
		</div>
	</section>
{/if}
