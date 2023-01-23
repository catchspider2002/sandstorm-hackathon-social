<script>
	import * as htmlToImage from 'html-to-image';
	import download from 'downloadjs';
	import ColorPicker from '$lib/ColorPicker.svelte';
	import { key, keyData } from '../../stores.js';
	import { onMount, afterUpdate, tick, onDestroy } from 'svelte';

	// $: publicKey = '';
	// let newData = [];

	// const unsubscribe = key.subscribe((value) => (publicKey = value));
	// const unsubscribeData = keyData.subscribe((value) => (newData = value));

	// onDestroy(unsubscribe);
	// onDestroy(unsubscribeData);

	let nft = '';
	let count = 0;

	// onMount(async () => {
	// 	test();
	// });

	// afterUpdate(async (promise) => {
	// 	if (publicKey && count == 0) {
	// 		await tick();
	// 		await test();

	// 		count++;
	// 	}
	// });

	// let newData = [];
	// let test = async () => {
	// 	newData = await (
	// 		await fetch(
	// 			`https://cloudflare-worker-nft.solswatch.workers.dev/dojo/${$key}`
	// 			// `https://cloudflare-worker-nft.solswatch.workers.dev/dojo/5HmSmywQTELaR1BY4jJXfUfhTxrGGHhWi6CddySd9Z3n` //2 holding
	// 			// `https://cloudflare-worker-nft.solswatch.workers.dev/dojo/HGvHae7XzXDP9qJo99g4w7NjQA2sNdHhVKhGJZ3nbz9a` //12 holding
	// 		)
	// 	).json();
	// 	nft = newData[0].image;
	// 	// console.log(JSON.stringify(newData));
	// };
	console.log($key);
	console.log($keyData);

	let downloadPNG = () => {
		htmlToImage.toPng(document.getElementById('preview')).then(function (dataUrl) {
			download(dataUrl, 'Meme.png');
		});
	};

	let scaleTop = 40,
		scaleBottom = 40;
	let imgScale = 1;
	let topText = 'Top Text';
	let bottomText = 'Bottom Text';
	let bgColor = '#f44336';
</script>

<section class="px-2 py-32 md:px-0">
	<div class="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
		<h1 class="text-4xl font-extrabold tracking-tight text-left sm:text-5xl md:text-6xl md:text-center">
			<span class="block uppercase glorybolditalic">Meme Creator</span>
		</h1>
		<p class="w-full mx-auto text-base text-left text-gray-400 gloryItalic sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
			Add humor to your Cyber Samurai NFT collection by turning them into memes
		</p>
	</div>
</section>

{#if $key == ''}
	<div class="text-2xl text-center mx-auto gloryItalic">Please connect your wallet.</div>
{:else if $keyData.length == 0}
	<div class="text-2xl text-center mx-auto gloryItalic">
		It looks like the wallet you are using does not contain a Cyber Samurai NFT, please connect the wallet that does contain the Cyber Samurai NFT.
	</div>
{:else}
	<section class="container mx-auto pb-32 text-xl gloryItalic">
		<div class="grid grid-cols-2 m-4">
			<div class="grid grid-cols-2 gap-4">
				<div class="px-4 sm:px-0">
					<h3 class="text-2xl font-medium leading-6">Top Text</h3>
					<p class="mt-1 text-lg text-gray-300">Easily add top text and adjust font size.</p>
				</div>
				<div class="w-full">
					<input type="text" name="top_text" id="top_text" class="accent-input mb-8" bind:value={topText} placeholder="Top Text" />
					<input id="scaleTop" type="range" min="28" max="100" step="1" class="accent-range" bind:value={scaleTop} />
				</div>
				<div class="px-4 sm:px-0">
					<h3 class="text-2xl font-medium leading-6">Bottom Text</h3>
					<p class="mt-1 text-lg text-gray-300">Easily add bottom text and adjust font size.</p>
				</div>
				<div class="w-full">
					<input type="text" name="bottom_text" id="bottom_text" class="accent-input mb-4" bind:value={bottomText} placeholder="Bottom Text" />
					<input id="scaleBottom" type="range" min="28" max="100" step="1" class="accent-range" bind:value={scaleBottom} />
				</div>
				<div class="px-4 sm:px-0">
					<h3 class="text-2xl font-medium leading-6">Background and Zoom</h3>
					<p class="mt-1 text-lg text-gray-300">Easily add background color and adjust the image zoom.</p>
				</div>
				<div class="grid w-full">
					<!-- <span class="text-start">Background Color</span> -->
					<ColorPicker bind:value={bgColor} />
					<!-- <span class="text-end">Image Zoom</span> -->

					<input id="imgScale" type="range" min=".3" max="1" step=".05" class="accent-range" bind:value={imgScale} />
				</div>
				<button class="accent-button col-span-2 mx-auto " on:click={downloadPNG}>Download Meme</button>
			</div>

			<div class="mx-auto p-8 flex place-content-center">
				<div id="preview" style="background-color: {bgColor};">
					<div class="w-full h-full overflow-clip flex place-content-center justify-center relative">
						<img class="object-contain" alt="Meme" src={nft} style="transform: scale({imgScale});" />
						<span class="absolute top-4 impact text-white uppercase text-center mx-4 leading-tight" style="font-size: {scaleTop}px;">{topText}</span>
						<span class="absolute bottom-4 impact text-white uppercase text-center mx-4 leading-tight" style="font-size: {scaleBottom}px;"
							>{bottomText}</span
						>
					</div>
				</div>
			</div>
		</div>

		<div class="text-2xl mb-6">Select the image for the meme</div>
		<div class="flex items-center justify-center">
			<form class="grid grid-cols-3 gap-2 w-full max-w-screen-lg">
				{#each $keyData as mint, i}
					<div>
						<input class="hidden" id="radio_{i}" bind:group={nft} type="radio" name="nft" value={mint.image} />
						<label class="flex flex-col p-2 border-2 border-gray-400 cursor-pointer rounded-xl" for="radio_{i}">
							<span class="text-xs pb-2 font-semibold uppercase">{mint.name}</span>
							<img class="rounded-lg" src={mint.image} alt={mint.name} />
						</label>
					</div>
				{/each}
			</form>
		</div>
	</section>
{/if}

<style>
	#preview {
		/* width: 1500px;
		height: 500px; */
		aspect-ratio: 1/1;
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
