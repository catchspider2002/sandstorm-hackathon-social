<script>
	import * as htmlToImage from 'html-to-image';
	import download from 'downloadjs';
	import { key, keyData } from '../../stores.js';

	let downloadPNG = () => {
		htmlToImage.toPng(document.getElementById('preview')).then(function (dataUrl) {
			download(dataUrl, 'Twitter-Profile-Pic.png');
		});
	};

	const max = 2;
	let selectedOptions = [];

	if ($keyData) selectedOptions = $keyData.slice(0, 2);

	let nft = 'layout1';

	let swapImage = () => {
		if (document.getElementById('image1').src == selectedOptions[0].image) {
			document.getElementById('image1').src = selectedOptions[1].image;
			document.getElementById('image2').src = selectedOptions[0].image;
		} else {
			document.getElementById('image1').src = selectedOptions[0].image;
			document.getElementById('image2').src = selectedOptions[1].image;
		}
	};
</script>

<section class="px-2 py-32 md:px-0">
	<div class="container items-center max-w-6xl px-5 mx-auto space-y-6 text-center">
		<h1 class="text-4xl font-extrabold tracking-tight text-left sm:text-5xl md:text-6xl md:text-center">
			<span class="block uppercase glorybolditalic">Profile Pic Creator</span>
		</h1>
		<p class="w-full mx-auto text-base text-left text-gray-400 gloryItalic sm:text-lg lg:text-2xl md:max-w-3xl md:text-center">
			Stand out on Twitter with a custom profile picture created by collaging 2 of your Cyber Samurai NFT
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
	<section class="mx-auto p-8 flex place-content-center">
		<div id="preview">
			<div class="flex relative w-full h-full">
				<!-- {#each selectedOptions as mint} -->
				{#if selectedOptions.length > 0}
					<img id="image1" src={selectedOptions[0].image} alt={selectedOptions[0].name} class="object-contain" />
				{/if}
				{#if selectedOptions.length > 1}
					<img id="image2" src={selectedOptions[1].image} alt={selectedOptions[1].name} class="object-contain w-full absolute {nft}" />
				{/if}
				<!-- {/each} -->
			</div>
		</div>
	</section>

	<div class="flex place-content-center gap-8 mx-auto">
		<button class="accent-button col-span-2" on:click={swapImage}>Swap Images</button>
		<button class="accent-button col-span-2" on:click={downloadPNG}>Download Profile Pic</button>
	</div>

	<h2 class="text-2xl pt-32 pb-8 gloryItalic text-center">Choose your collage layout</h2>

	<div class="flex items-center justify-center">
		<form class="grid grid-cols-5 gap-2 w-full max-w-screen-lg">
			{#each Array(10) as _, index (index)}
				<div class="flex w-full h-full">
					<input class="hidden" id="radio_{index + 1}" bind:group={nft} type="radio" name="nft" value="layout{index + 1}" />
					<label class="flex flex-col relative border-2 border-gray-400 cursor-pointer rounded-xl overflow-hidden" for="radio_{index + 1}">
						<!-- <img class="rounded-lg" src={mint.image} alt={mint.name} /> -->
						{#if selectedOptions.length > 0}
							<img src={selectedOptions[0].image} alt={selectedOptions[0].name} class="object-contain" />
						{/if}
						{#if selectedOptions.length > 1}
							<img src={selectedOptions[1].image} alt={selectedOptions[1].name} class="object-contain w-full absolute layout{index + 1}" />
						{/if}
					</label>
				</div>
			{/each}
		</form>
	</div>

	<h2 class="text-2xl pt-32 gloryItalic text-center">
		Choose max. {max} of your Cyber Samurai NFT
	</h2>

	<section class="flex pt-8 pb-32 justify-center items-center text-black">
		<div class="grid grid-cols-3 gap-4">
			{#each $keyData as item, index}
				<label class="card">
					<input
						class="card__input absolute block outline-0 border-none bg-none p-0 m-0 appearance-none opacity-0"
						type="checkbox"
						bind:group={selectedOptions}
						value={item}
						id="item{index}"
						disabled={selectedOptions.length === max && !selectedOptions.includes(item)}
					/>
					<div class="card__body">
						<div class="card__body-cover">
							<img class="card__body-cover-image" src={item.image} /><span class="card__body-cover-checkbox">
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
{/if}

<style>
	#preview {
		aspect-ratio: 1/1;
	}

	.card {
		--background: #fff;
		--background-checkbox: #a22525;
		--background-image: #fff, rgba(0, 107, 175, 0.2);
		--text-color: #666;
		--text-headline: #000;
		--card-shadow: #a22525;
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
		clip-path: polygon(0% 0%, 100% 0%, var(--x-y1, 100% 98%), var(--x-y2, 67% 91%), var(--x-y3, 33% 98%), var(--x-y4, 0% 93%));
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

	/* https://codepen.io/aaw3k/pen/zYBxEWX */

	.layout1 {
		clip-path: polygon(50% 0, 100% 0%, 100% 100%, 50% 100%);
	}
	.layout2 {
		clip-path: polygon(100% 0, 0% 100%, 100% 100%);
	}
	.layout3 {
		clip-path: polygon(0 0, 0% 100%, 100% 100%);
	}
	.layout4 {
		clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
	}
	.layout5 {
		clip-path: circle(35% at 50% 50%);
	}
	.layout6 {
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	}
	.layout7 {
		clip-path: polygon(100% 100%, 100% 0, 0 50%);
	}
	.layout8 {
		clip-path: polygon(100% 50%, 0 0, 0 100%);
	}
	.layout9 {
		clip-path: polygon(50% 0, 75% 0, 100% 50%, 0 100%, 0% 100%);
	}
	.layout10 {
		clip-path: polygon(25% 0, 50% 0, 100% 100%, 0 50%);
	}
	input:checked + label {
		border-color: red;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
</style>
