<script>
	// v1.2 - added keyboard nav for colors
	// @todo still a bug when the dropdown opens, we should focus on the already selected color, this only works when you click it open, close it and open again

	import { v4 as uuid } from '@lukeed/uuid';
	import { clickOutside } from './clickOutside.js';
	import { tick, onMount } from 'svelte';

	// Initial value
	export let id = uuid();
	export let value = '#f44336';

	// Our color set
	let values = [
		['#f44336', '#e15283', '#9c27b0', '#805ad5', '#3f51b5'],
		['#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a'],
		['#cddc39', '#ffeb3b', '#ecc94b', '#EC9740', '#ffffff', '#000000', '#15202b', '#808080']
	];

	// Keyboard shortcut
	let trigger = 'Escape';
	function handleKeydown(e) {
		if (e.key == trigger) {
			ddActive = false;
		}
	}

	let windowHeight;
	let top;

	let ddActive = false;

	let ddHeight = 158;
	// ddHeight is initially undefined so we can't get the correct values from binding; that's why we have a default
	// todo render offscreen for .1sec to get the height automatically?

	let inputHeight;

	async function toggleDropdown(e) {
		if (e.clientY + inputHeight < ddHeight || windowHeight - ddHeight - inputHeight - e.clientY > 0) {
			top = false;
		} else {
			top = true;
		}

		ddActive = !ddActive;

		await tick();
		if (ddActive) {
			//document.querySelector('.color-block.active').focus();
		}
	}

	function clickOutsideDropdown() {
		ddActive = false;
	}

	function changeValue(innerValue) {
		value = innerValue;
		// ddActive = false;
	}

	function keyboardGridNav(e, index) {
		const focussedElement = document.activeElement.id;

		let myRow = parseInt(focussedElement.charAt(focussedElement.length - 3));
		let myIndex = parseInt(focussedElement.charAt(focussedElement.length - 1));
		let nextRow;
		let prevRow;
		let nextIndex;
		let prevIndex;

		switch (e.keyCode) {
			// left arrow
			case 37:
				prevIndex = myIndex - 1;
				if (prevIndex > -1) {
					document.getElementById(id + '-' + myRow + '-' + prevIndex).focus();
				}
				break;
			// top arrow
			case 38:
				prevRow = myRow - 1;
				if (prevRow > -1) {
					document.getElementById(id + '-' + prevRow + '-' + myIndex).focus();
				}
				break;
			// right arrow
			case 39:
				nextIndex = myIndex + 1;
				if (nextIndex < values[0].length) {
					document.getElementById(id + '-' + myRow + '-' + nextIndex).focus();
				}
				break;
			// down arrow
			case 40:
				nextRow = myRow + 1;
				if (nextRow < values.length) {
					document.getElementById(id + '-' + nextRow + '-' + myIndex).focus();
				}
				break;
		}
	}
</script>

<svelte:window bind:innerHeight={windowHeight} on:keydown={handleKeydown} />

<div class="color-picker-holder">
	<div class="color-picker-inner">
		<button bind:clientHeight={inputHeight} class="select-color" on:click={(e) => toggleDropdown(e)} class:fake-focus={ddActive}>
			<div class="flex">
				<div style="background: {value};" class="color-block" />
			</div>
		</button>
		<input class="rounded focus:outline-none text-xl px-4 py-2" type="text" bind:value />
	</div>

	{#if ddActive}
		<div class:top bind:clientHeight={ddHeight} class="values-dropdown" use:clickOutside on:click_outside={clickOutsideDropdown}>
			<div class="values-dropdown-grid">
				{#each values as val, index}
					{#each val as innerValue, innerIndex}
						<button
							id="{id}-{index}-{innerIndex}"
							class:active={innerValue == value}
							on:keydown={(e) => keyboardGridNav(e, innerIndex)}
							style="background: {innerValue};"
							on:click={() => {
								changeValue(innerValue);
							}}
							class="color-block"
						/>
					{/each}
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.color-picker-holder {
		position: relative;
	}

	.color-picker-inner {
		display: grid;
		height: 44px;
		grid-auto-flow: column;
		place-content: start;
		gap: 0.5em;
	}

	.select-color {
		border: 2px solid var(--border-color);
		padding: 3px;
		border-radius: var(--border-radius);
		/* margin-right: 0.4rem; */
		/* background: #fff; */
		background-color: var(--card-bg);
		height: 44px;
		width: 44px;
		display: grid;
		place-content: center;
	}

	.active {
		box-shadow: inset 0 0 0 1px #fff, 0 0 3px 1px rgba(0, 0, 0, 0.25);
	}

	.fake-focus,
	input:focus,
	button:focus {
		outline: 0;
		box-shadow: 0 0 0 2px var(--accent-color);
		border-color: var(--accent-color);
	}

	input {
		border: 2px solid var(--border-color);
		color: var(--body-text);
		height: 44px;
		background-color: var(--body-bg);
		max-width: 128px;
	}
	input:focus {
		border: 1px solid var(--accent-color);
	}

	.color-block {
		border-radius: var(--border-radius);
		width: 32px;
		height: 32px;
		line-height: 0;
		font-size: 0;
	}

	.values-dropdown {
		padding: 1rem;
		position: absolute;
		z-index: 1;
		top: 40px;
		background: var(--card-bg);
		border: 1px solid #ccc;
		border-radius: 0.3rem;
	}

	.values-dropdown-grid {
		grid-template-columns: repeat(6, 32px);
		/* grid-template-rows: 24px 32px; */
		grid-gap: 10px;
		display: grid;
	}

	.values-dropdown.top {
		top: auto;
		bottom: 40px;
	}

	.values-dropdown button {
		border: none;
		border: 1px solid #7e7e7e;
	}

	@media all and (max-width: 540px) {
		.values-dropdown-grid {
			grid-template-columns: repeat(4, 32px);
		}
	}

	@media all and (max-width: 440px) {
		input {
			max-width: 100px;
		}
	}
</style>
