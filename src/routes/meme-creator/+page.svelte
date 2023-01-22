<script>
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import * as htmlToImage from 'html-to-image';
	import download from 'downloadjs';

	let nft = '';

	import { onMount, afterUpdate, tick, onDestroy } from 'svelte';
	onMount(async () => {
		test();
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
		nft = newData[0].image;
		// console.log(JSON.stringify(newData));
	};

	let downloadPNG = () => {
		htmlToImage.toPng(document.getElementById('preview')).then(function (dataUrl) {
			download(dataUrl, 'my-node.png');
		});
	};
	let scale = 1;
</script>

<br />
New {$walletStore.publicKey}

<button on:click={test}>Get</button>
<br />
<button on:click={downloadPNG}>Download Image</button>

<h2>Select the images for the banner</h2>

<div class="flex items-center justify-center">
	<form class="grid grid-cols-3 gap-2 w-full max-w-screen-lg">
		{#each newData as mint, i}
			<div>
				<input
					class="hidden"
					id="radio_{i}"
					bind:group={nft}
					type="radio"
					name="nft"
					value={mint.image}
				/>
				<label
					class="flex flex-col p-4 border-2 border-gray-400 cursor-pointer rounded-xl"
					for="radio_{i}"
				>
					<span class="text-xs font-semibold uppercase">{mint.name}</span>
					<img src={mint.image} alt={mint.name} />
				</label>
			</div>
		{/each}
	</form>
</div>

<div class="mx-auto p-8 flex place-content-center">
	<div id="preview">
		<div class="w-full h-full overflow-clip flex place-content-center justify-center">
			<img class="object-contain" alt="Meme" src={nft} style="transform: scale({scale});" />
		</div>
	</div>
</div>

Scale
<div>
	<input
		id="scale"
		type="range"
		min="0.3"
		max="1"
		step="0.05"
		class="w-full sm:w-1/4 h-3 bg-blue-200 accent-blue-600 rounded-lg appearance-none"
		bind:value={scale}
	/>
</div>

<style>
	#preview {
		/* width: 1500px;
		height: 500px; */
		aspect-ratio: 1/1;
		background-color: rebeccapurple;
	}
	input:checked + label {
		border-color: orange;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
</style>
