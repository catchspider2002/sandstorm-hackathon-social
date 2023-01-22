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
	let scaleTop = 40,
		scaleBottom = 40;
	let imgScale = 1;
	let topText = 'Top Text';
	let bottomText = 'Bottom Text';
</script>

<!-- <br />
New {$walletStore.publicKey}

<button on:click={test}>Get</button>
<br /> -->
<button class="accent-button" on:click={downloadPNG}>Download Image</button>

<h2>Select the image for the meme</h2>

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
		<div class="w-full h-full overflow-clip flex place-content-center justify-center relative">
			<img class="object-contain" alt="Meme" src={nft} style="transform: scale({imgScale});" />
			<span
				class="absolute top-4 impact text-white uppercase text-center mx-4 leading-tight"
				style="font-size: {scaleTop}px;">{topText}</span
			>
			<span
				class="absolute bottom-4 impact text-white uppercase text-center mx-4 leading-tight"
				style="font-size: {scaleBottom}px;">{bottomText}</span
			>
		</div>
	</div>
</div>

Top Text

<input
	type="text"
	name="top_text"
	id="top_text"
	class="focus:ring-red-500 focus:border-red-500 block w-full sm:w-1/4 pl-2 pr-2 sm:text-sm border-gray-300 rounded-lg"
	bind:value={topText}
	placeholder="Top Text"
/>

Bottom Text

<input
	type="text"
	name="bottom_text"
	id="bottom_text"
	class="focus:ring-red-500 focus:border-red-500 block w-full sm:w-1/4 pl-2 pr-2 sm:text-sm border-gray-600 border-2 rounded-lg"
	bind:value={bottomText}
	placeholder="Bottom Text"
/>

Image Scale
<div>
	<input
		id="imgScale"
		type="range"
		min=".3"
		max="1"
		step=".05"
		class="w-full sm:w-1/4 h-3 bg-red-200 accent-red-600 rounded-lg appearance-none"
		bind:value={imgScale}
	/>
</div>

Font Scale
<div>
	<input
		id="scaleTop"
		type="range"
		min="28"
		max="80"
		step="1"
		class="w-full sm:w-1/4 h-3 bg-red-200 accent-red-600 rounded-lg appearance-none"
		bind:value={scaleTop}
	/>
</div>
<div>
	<input
		id="scaleBottom"
		type="range"
		min="28"
		max="80"
		step="1"
		class="w-full sm:w-1/4 h-3 bg-red-200 accent-red-600 rounded-lg appearance-none"
		bind:value={scaleBottom}
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
		border-color: red;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
	.impact {
		font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
		-webkit-text-stroke: 0.15rem black;
	}
</style>
