<script>
	$: tweetText = '';

	async function getTweet() {
		console.log('getTweet');
		tweetText = await (
			await fetch(`https://cloudflare-worker-nft.solswatch.workers.dev/dojo-tweets`)
		)
			// await fetch(`https://dojotweets.naveencs.repl.co/tweets`)
			.json();
		console.log(tweetText);
	}

	import { onMount, afterUpdate, tick, onDestroy } from 'svelte';
	onMount(async () => {
		test();
		getTweet();
	});

	let newData = [];
	let test = async () => {
		// console.log($walletStore.publicKey);
		newData = await (
			await fetch(
				// `https://cloudflare-worker-nft.solswatch.workers.dev/dojo/${$walletStore.publicKey}`
				`https://cloudflare-worker-nft.solswatch.workers.dev/dojo/5HmSmywQTELaR1BY4jJXfUfhTxrGGHhWi6CddySd9Z3n`
			)
		).json();
		// console.log(JSON.stringify(newData));
	};

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

<section>
	<div class="px-10 py-24 mx-auto md:px-12 max-w-7xl">
		<div class="w-full mx-auto text-center xl:w-1/2 lg:w-3/4">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				class="inline-block w-8 h-8 mb-8 text-grey-600"
				viewBox="0 0 975.036 975.036"
				><path
					d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"
				/></svg
			>
			<p class="text-base leading-relaxed md:text-lg">{tweetText}</p>
			<span class="inline-block w-10 h-1 mt-8 mb-6 bg-std-accent-600 rounded" />
			<div class="flex place-content-center gap-4 mx-auto">
				<button
					on:click={getTweet}
					class="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
					>Generate Tweet</button
				>
				<button
					id="copyTweet"
					on:click={copyText}
					class="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
					>Copy Tweet</button
				>
				<a
					class="inline-flex items-center mt-4 px-4 py-2 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
					rel="noopener noreferrer"
					title="Post Tweet"
					target="_blank"
					href="https://twitter.com/intent/tweet?text={tweetText
						.replace(/ /g, '%20')
						.replace(/#/g, '%23')
						.replace(/@/g, '%40')}"
				>
					Post Tweet
				</a>
			</div>
		</div>
	</div>
</section>
