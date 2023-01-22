<script>
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import * as htmlToImage from 'html-to-image';
	import download from 'downloadjs';

	const url =
		'https://nwsdqoqflmkwq3colqikn7xn7yuxyx5ue7sooodif6i3bqvrjhqq.arweave.net/baQ4OgVbFWhsTlwQpv7t_il8X7Qn5Oc4aC-RsMKxSeE?ext=png';
	// const outputFile = `./img-removed-from-file.png`;

	// removeBackgroundFromImageUrl({
	// 	url,
	// 	apiKey: '1xnNe9hMWhpHNFC6dRbL2gDj',
	// 	size: 'regular',
	// 	format: 'png'
	// 	// outputFile
	// })
	// 	.then((result) => {
	// 		// console.log(`File saved to ${outputFile}`);
	// 		base64img = result.base64img;
	// 		// console.log(base64img);
	// 	})
	// 	.catch((errors) => {
	// 		console.log(JSON.stringify(errors));
	// 	});

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

<section class="flex py-8 justify-center items-center text-black bg-red-700">
	<div class="grid grid-cols-3 gap-4">
		{#each newData as item}
			<label class="card">
				<input
					class="card__input absolute block outline-0 border-none bg-none p-0 m-0 appearance-none"
					type="checkbox"
				/>
				<div class="card__body">
					<div class="card__body-cover">
						<img class="card__body-cover-image" src={item.image} /><span
							class="card__body-cover-checkbox"
						>
							<svg class="card__body-cover-checkbox--svg" viewBox="0 0 12 10">
								<polyline points="1.5 6 4.5 9 10.5 1" />
							</svg></span
						>
					</div>
					<header class="card__body-header">
						<h2 class="card__body-header-title">{item.name}</h2>
					</header>
				</div>
			</label>
		{/each}
	</div>
</section>

<div class="flex items-center justify-center">
	<!-- Component Start -->
	<form class="grid grid-cols-3 gap-2 w-full max-w-screen-sm">
		<div>
			<input class="hidden" id="radio_1" type="radio" name="radio" checked />
			<label class="flex flex-col p-4 border-2 border-gray-400 cursor-pointer" for="radio_1">
				<span class="text-xs font-semibold uppercase">Small</span>
				<span class="text-xl font-bold mt-2">$10/mo</span>
				<ul class="text-sm mt-2">
					<li>Thing 1</li>
					<li>Thing 2</li>
				</ul>
			</label>
		</div>
		<div>
			<input class="hidden" id="radio_2" type="radio" name="radio" />
			<label class="flex flex-col p-4 border-2 border-gray-400 cursor-pointer" for="radio_2">
				<span class="text-xs font-semibold uppercase">Medium</span>
				<span class="text-xl font-bold mt-2">$40/mo</span>
				<ul class="text-sm mt-2">
					<li>Thing 1</li>
					<li>Thing 2</li>
					<img src="https://arweave.net/Hx-fWqNUppU2AxISqPwcIsIZiPf3VGQV6syTO3KWD1A?ext=png" />
				</ul>
			</label>
		</div>
		<div>
			<input class="hidden" id="radio_3" type="radio" name="radio" />
			<label class="flex flex-col p-4 border-2 border-gray-400 cursor-pointer" for="radio_3">
				<span class="text-xs font-semibold uppercase">Big</span>
				<span class="text-xl font-bold mt-2">$100/mo</span>
				<ul class="text-sm mt-2">
					<li>Thing 1</li>
					<li>Thing 2</li>
					<img src="https://arweave.net/baQ4OgVbFWhsTlwQpv7t_il8X7Qn5Oc4aC-RsMKxSeE?ext=png" />
				</ul>
			</label>
		</div>
	</form>
	<!-- Component End  -->
</div>

<div class="mx-auto p-8 flex place-content-center">
	<div id="preview">
		{#if newData.length >= 3}
			<div class="w-full h-full overflow-clip grid grid-cols-3 place-content-center justify-center">
				{#each newData as mint}
					<img
						src={mint.image}
						alt={mint.name}
						class="object-contain"
						style="transform: scale({scale});"
					/>
				{/each}
			</div>
		{:else if newData.length == 2}
			<div class="w-full h-full overflow-clip grid grid-cols-2 place-content-center justify-center">
				{#each newData as mint}
					<img
						src={mint.image}
						alt={mint.name}
						class="object-contain"
						style="transform: scale({scale});"
					/>
				{/each}
			</div>
		{:else}
			<div class="w-full h-full overflow-clip grid grid-cols-3 place-content-center justify-center">
				{#each newData as mint}
					<img
						class="col-start-2 object-contain"
						alt={mint.name}
						src={mint.image}
						style="transform: scale({scale});"
					/>
				{/each}
			</div>
		{/if}
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
		class="w-full sm:w-1/4 h-3 bg-red-200 accent-red-600 rounded-lg appearance-none"
		bind:value={scale}
	/>
</div>

<style>
	#preview {
		/* width: 1500px;
		height: 500px; */
		aspect-ratio: 3/1;
		background-color: rebeccapurple;
	}
	input:checked + label {
		border-color: black;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	.card {
		--background: #fff;
		--background-checkbox: #0082ff;
		--background-image: #fff, rgba(0, 107, 175, 0.2);
		--text-color: #666;
		--text-headline: #000;
		--card-shadow: #0082ff;
		--card-height: 300px;
		--card-width: 300px;
		--card-radius: 12px;
		/* --header-height: 47px; */
		--blend-mode: overlay;
		--transition: 0.15s;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
	.card:nth-child(odd) .card__body-cover-image {
		--x-y1: 100% 98%;
		--x-y2: 67% 91%;
		--x-y3: 33% 98%;
		--x-y4: 0% 93%;
	}
	.card:nth-child(even) .card__body-cover-image {
		--x-y1: 100% 93%;
		--x-y2: 73% 98%;
		--x-y3: 25% 93%;
		--x-y4: 0% 98%;
	}
	.card__input:checked ~ .card__body {
		--shadow: 0 0 0 3px var(--card-shadow);
	}
	.card__input:checked ~ .card__body .card__body-cover-checkbox {
		--check-bg: var(--background-checkbox);
		--check-border: #fff;
		--check-scale: 1;
		--check-opacity: 1;
	}
	.card__input:checked ~ .card__body .card__body-cover-checkbox--svg {
		--stroke-color: #fff;
		--stroke-dashoffset: 0;
	}
	.card__input:checked ~ .card__body .card__body-cover:after {
		--opacity-bg: 0;
	}
	.card__input:checked ~ .card__body .card__body-cover-image {
		--filter-bg: grayscale(0);
	}
	.card__input:disabled ~ .card__body {
		cursor: not-allowed;
		opacity: 0.5;
	}
	.card__input:disabled ~ .card__body:active {
		--scale: 1;
	}
	.card__body {
		display: grid;
		grid-auto-rows: calc(var(--card-height) - var(--header-height)) auto;
		background: var(--background);
		height: var(--card-height);
		width: var(--card-width);
		border-radius: var(--card-radius);
		overflow: hidden;
		position: relative;
		cursor: pointer;
		box-shadow: var(--shadow, 0 4px 4px 0 rgba(0, 0, 0, 0.02));
		transition: transform var(--transition), box-shadow var(--transition);
		transform: scale(var(--scale, 1)) translateZ(0);
	}
	.card__body:active {
		--scale: 0.96;
	}
	.card__body-cover {
		--c-border: var(--card-radius) var(--card-radius) 0 0;
		--c-width: 100%;
		--c-height: 100%;
		position: relative;
		overflow: hidden;
	}
	.card__body-cover:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: var(--c-width);
		height: var(--c-height);
		border-radius: var(--c-border);
		background: linear-gradient(to bottom right, var(--background-image));
		mix-blend-mode: var(--blend-mode);
		opacity: var(--opacity-bg, 1);
		transition: opacity var(--transition) linear;
	}
	.card__body-cover-image {
		width: var(--c-width);
		height: var(--c-height);
		-o-object-fit: cover;
		object-fit: cover;
		border-radius: var(--c-border);
		filter: var(--filter-bg, grayscale(1));
		clip-path: polygon(
			0% 0%,
			100% 0%,
			var(--x-y1, 100% 98%),
			var(--x-y2, 67% 91%),
			var(--x-y3, 33% 98%),
			var(--x-y4, 0% 93%)
		);
	}
	.card__body-cover-checkbox {
		background: var(--check-bg, var(--background-checkbox));
		border: 2px solid var(--check-border, #fff);
		position: absolute;
		right: 10px;
		top: 10px;
		z-index: 1;
		width: 28px;
		height: 28px;
		border-radius: 50%;
		opacity: var(--check-opacity, 0);
		transition: transform var(--transition), opacity calc(var(--transition) * 1.2) linear;
		transform: scale(var(--check-scale, 0));
	}
	.card__body-cover-checkbox--svg {
		width: 13px;
		height: 11px;
		display: inline-block;
		vertical-align: top;
		fill: none;
		margin: 7px 0 0 5px;
		stroke: var(--stroke-color, #fff);
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-dasharray: 16px;
		stroke-dashoffset: var(--stroke-dashoffset, 16px);
		transition: stroke-dashoffset 0.4s ease var(--transition);
	}
	.card__body-header {
		/* height: var(--header-height); */
		background: var(--background);
		padding: 0 10px 0px 10px;
	}
	.card__body-header-title {
		color: var(--text-headline);
		font-weight: 700;
		margin-bottom: 6px;
	}

	/* .grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 1rem; */
	/* } */
</style>
