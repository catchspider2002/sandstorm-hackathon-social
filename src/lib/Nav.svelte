<script>
	import { onMount, onDestroy } from 'svelte';
	import { key, keyData } from '../stores.js';

	$: publicKey = '';
	let newData = [];

	const unsubscribe = key.subscribe((value) => (publicKey = value));
	const unsubscribeData = keyData.subscribe((value) => (newData = value));

	onDestroy(unsubscribe);
	onDestroy(unsubscribeData);

	onMount(async () => {
		if (localStorage['publicKey']) {
			publicKey = localStorage['publicKey'];
			key.set(publicKey);
			test();
		} else localStorage.publicKey = '';
	});

	let test = async () => {
		newData = await (
			await fetch(
				`https://cloudflare-worker-nft.solswatch.workers.dev/dojo/${$key}`
				// `https://cloudflare-worker-nft.solswatch.workers.dev/dojo/5HmSmywQTELaR1BY4jJXfUfhTxrGGHhWi6CddySd9Z3n` //2 holding
				// `https://cloudflare-worker-nft.solswatch.workers.dev/dojo/HGvHae7XzXDP9qJo99g4w7NjQA2sNdHhVKhGJZ3nbz9a` //12 holding
			)
		).json();
		console.log(JSON.stringify(newData));
		keyData.set(newData);
	};

	let connectPhantom = async () => {
		console.log('connect Phantom');
		try {
			const resp = await window.solana.connect();
			publicKey = resp.publicKey.toString();
			key.set(publicKey);
			localStorage.publicKey = publicKey;
			test();
		} catch (err) {
			console.log('Error: ' + err);
		}
	};

	// let connectExodus = async () => {
	// 	console.log('connect Exodus');
	// 	// console.log('isExodus: ' + window.solana.isExodus);
	// 	try {
	// 		const resp = await window.exodus.solana.connect();
	// 		publicKey = resp.publicKey.toString();
	// 	} catch (err) {
	// 		console.log('Error: ' + err);
	// 	}
	// };

	let connectSolflare = async () => {
		// const isSolflareInstalled = window.solflare && window.solflare.isSolflare;

		console.log('connect Solflare');
		try {
			const resp = await window.solflare.connect();
			console.log(JSON.stringify(resp));

			if (resp) {
				publicKey = await window.solflare.publicKey.toString();
				key.set(publicKey);
				localStorage.publicKey = publicKey;
				test();
			}
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
		newData = [];
		keyData.set(newData);
	};
</script>

<nav class="flex gap-6 justify-end px-8 my-8 uppercase text-xl place-items-baseline place-content-end">
	<a href=".">Home</a>
	<a href="meme-creator">Meme Creator</a>
	<a href="profile-pic-creator">Profile Pic Creator</a>
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
					<li class="px-4 py-3 hover:bg-red-900 hover:text-red-200" on:click={connectPhantom}>Phantom</li>
					<li class="px-4 py-3 hover:bg-red-900 hover:text-red-200" on:click={connectSolflare}>Solflare</li>
					<!-- <li class="px-4 py-3 hover:bg-gray-200 hover:text-red-300" on:click={connectExodus}>
						Exodus
					</li> -->
				</ul>
			</nav>
		</div>
		<!-- </div> -->
	{:else}
		<button type="button" on:click={disconnectPhantom} class="accent-button">
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
