<script>
	import { onMount, onDestroy } from 'svelte';
	import { key } from '../stores.js';

	$: publicKey = '';

	const unsubscribe = key.subscribe((value) => (publicKey = value));

	onDestroy(unsubscribe);

	onMount(async () => {
		if (localStorage['publicKey']) {
			publicKey = localStorage['publicKey'];
			key.set(publicKey);
		} else localStorage.publicKey = '';
	});

	// import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	// import {
	// 	WalletProvider,
	// 	WalletMultiButton,
	// 	ConnectionProvider
	// } from '@svelte-on-solana/wallet-adapter-ui';
	// import { clusterApiUrl } from '@solana/web3.js';
	// import {
	// 	PhantomWalletAdapter,
	// 	SolflareWalletAdapter,
	// 	// LedgerWalletAdapter
	// } from '@solana/wallet-adapter-wallets';

	// const localStorageKey = 'walletAdapter';
	// const network = clusterApiUrl('devnet'); // localhost or mainnet

	// let wallets = [
	// 	new PhantomWalletAdapter(),
	// 	new SolflareWalletAdapter(),
	// 	// new LedgerWalletAdapter()
	// ];
	let connectPhantom = async () => {
		console.log('connect Phantom');
		try {
			const resp = await window.solana.connect();
			publicKey = resp.publicKey.toString();
		} catch (err) {
			console.log('Error: ' + err);
		}
	};

	let connectExodus = async () => {
		console.log('connect Exodus');
		// console.log('isExodus: ' + window.solana.isExodus);
		try {
			const resp = await window.exodus.solana.connect();
			publicKey = resp.publicKey.toString();
		} catch (err) {
			console.log('Error: ' + err);
		}
	};

	let connectSolflare = async () => {
		// const isSolflareInstalled = window.solflare && window.solflare.isSolflare;

		console.log('connect Solflare');
		try {
			const resp = await window.solflare.connect();
			console.log(JSON.stringify(resp));

			if (resp) publicKey = await window.solflare.publicKey.toString();
		} catch (err) {
			console.log('Error: ' + err);
		}
	};

	let disconnectPhantom = async () => {
		// if (window.exodus && window.exodus.solana) {
		// 	window.exodus.solana.disconnect();
		// 	window.exodus.solana.on('disconnect', () => console.log('exodus disconnected!'));
		// }
		if (window.solana) {
			window.solana.disconnect();
			window.solana.on('disconnect', () => console.log('phantom disconnected!'));
		}
		if (window.solflare) {
			window.solflare.disconnect();
			window.solflare.on('disconnect', () => console.log('solflare disconnected!'));
		}
		publicKey = '';
		key.set(publicKey);
		localStorage.publicKey = '';
	};
</script>

<nav
	class="flex gap-6 justify-end container px-8 my-8 uppercase text-xl place-items-baseline place-content-end"
>
	<a href=".">Home</a>
	<a href="meme-creator">Meme Creator</a>
	<a href="tweet-creator">Tweet Creator</a>
	<a href="banner-creator">Twitter Banner Creator</a>
	<!-- <WalletProvider {localStorageKey} {wallets} autoConnect />
	<ConnectionProvider {network} />

	<WalletMultiButton /> -->

	{#if publicKey.length == 0}
		<div class="group relative">
			<button class="accent-button">Connect Wallet</button>
			<nav
				tabindex="0"
				class="border border-2 bg-red-800 invisible border-gray-800 rounded absolute w-full left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1"
			>
				<ul class="text-gray-200 cursor-pointer">
					<li class="px-4 py-3 hover:bg-gray-200 hover:text-alt-500" on:click={connectPhantom}>
						Phantom
					</li>
					<li class="px-4 py-3 hover:bg-gray-200 hover:text-alt-500" on:click={connectSolflare}>
						Solflare
					</li>
					<!-- <li class="px-4 py-3 hover:bg-gray-200 hover:text-alt-500" on:click={connectExodus}>
						Exodus
					</li> -->
				</ul>
			</nav>
		</div>
		<!-- </div> -->
	{:else}
		<button
			type="button"
			on:click={disconnectPhantom}
			class="inline-flex mx-auto items-center px-3 py-1.5 border border-transparent text-sm font-semibold rounded-xl shadow-sm bg-alt-500 hover:bg-white text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-alt-500"
		>
			Disconnect ({publicKey.substring(0, 4)}...{publicKey.substring(publicKey.length - 4)})
		</button>
		<!-- <button on:click={disconnectPhantom}
		>Disconnect Wallet ({publicKey.substring(0, 4)}...{publicKey.substring(
			publicKey.length - 4
		)})</button
	> -->
	{/if}
</nav>

<!-- {#if $walletStore?.connected}
	Wallet with public key {$walletStore.publicKey}
	successfully connected!
{/if} -->
