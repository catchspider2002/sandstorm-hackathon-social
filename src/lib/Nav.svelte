<script>
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import {
		WalletProvider,
		WalletMultiButton,
		ConnectionProvider
	} from '@svelte-on-solana/wallet-adapter-ui';
	import { clusterApiUrl } from '@solana/web3.js';
	import {
		PhantomWalletAdapter,
		SolflareWalletAdapter,
		// LedgerWalletAdapter
	} from '@solana/wallet-adapter-wallets';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet'); // localhost or mainnet

	let wallets = [
		new PhantomWalletAdapter(),
		new SolflareWalletAdapter(),
		// new LedgerWalletAdapter()
	];
</script>

<nav class="flex gap-6 justify-end container px-8 my-8 items-center">
	<a href=".">Home</a>
	<a href="meme-generator">Meme Generator</a>
	<a href="banner-creator">Twitter Banner Creator</a>
	<WalletProvider {localStorageKey} {wallets} autoConnect />
	<ConnectionProvider {network} />

	<WalletMultiButton />
</nav>

{#if $walletStore?.connected}
	Wallet with public key {$walletStore.publicKey}
	successfully connected!
{/if}
