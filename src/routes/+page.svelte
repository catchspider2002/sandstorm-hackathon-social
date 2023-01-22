<script>
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { onMount, afterUpdate, tick, onDestroy } from 'svelte';
	import { each } from 'svelte/internal';
	// import { SocialProtocol } from '@spling/social-protocol';
	// import { Keypair } from '@solana/web3.js';

	// // const wallet = Keypair.generate();
	// // const payerWallet = Keypair.generate();
	// const options = {
	// 	rpcUrl: 'https://api.mainnet-beta.solana.com/',
	// 	useIndexer: true
	// };
	// let groups;

	// let test = async () => {
	// 	// Initialize the social protocol
	// 	const socialProtocol = await new SocialProtocol(walletStore, walletStore, options).init();

	// 	// You can call now functions like:
	// 	const user = await socialProtocol.getUser(1);
	// 	console.log(JSON.stringify(user));

	// 	// const newUser = await socialProtocol.createUser('testUser');
	// 	// console.log(JSON.stringify(user));

	// 	// groups = await socialProtocol.getAllGroups(null, null, null);
	// 	// console.log(groups);
	// };

	// test();

	// export let data;
	// console.log('Data');
	// console.log(JSON.stringify(data));

	// let newData = data.groups;
	// let newData = data.newPosts;
	// console.log(newData);
	// let publicKey;

	// let connectPhantom = async () => {
	// 	console.log('connect Phantom');
	// 	try {
	// 		const resp = await window.solana.connect();
	// 		publicKey = resp.publicKey.toString();

	// 		// if (publicKey) await updateAccounts(publicKey);
	// 	} catch (err) {
	// 		console.log('Error: ' + err);
	// 	}
	// };
	onMount(async () => {
		test();
	});
	let newData = [];
	let test = async () => {
		console.log($walletStore.publicKey);
		newData = await (
			await fetch(
				// `https://cloudflare-worker-nft.solswatch.workers.dev/dojo/${$walletStore.publicKey}`
				`https://cloudflare-worker-nft.solswatch.workers.dev/dojo/5HmSmywQTELaR1BY4jJXfUfhTxrGGHhWi6CddySd9Z3n`
			)
		).json();
		console.log(JSON.stringify(newData));
	};
</script>

<!-- <button
	type="button"
	on:click={connectPhantom}
	title="Connect your wallet"
	class="accent-button"
>
	Connect Wallet
</button> -->

<!-- {#if newData}
	{JSON.stringify(newData)}
{/if} -->

<!-- {#each newData as group}
	<div class="m-6 px-4">
		Timestamp: {group.timestamp}<br />
		publicKey: {group.publicKey}<br />
		groupId: {group.groupId}<br />
		status: {group.status}<br />
		shdw: {group.shdw}<br />
		name: {group.name}<br />
		bio: {group.bio}<br />
		avatar: {group.avatar}<br />
		banner: {group.banner}<br />
		license: {group.license}<br />
	</div>
{/each} -->

<!-- {JSON.stringify(newData)} -->

<!-- {#each newData as post}
	<div class="m-6 px-4">
		<img src={post.media[0].file} />
	</div>
{/each} -->
<br />
New {$walletStore.publicKey}

<button on:click={test}>Get</button>

{#if newData.length >= 3}
	<!-- <div class="grid grid-cols-3 gap-4 m-4">
		{#each newData as mint}
			<img src={mint.image} />
		{/each}
	</div>
{:else if newData.length == 2} -->
	<div class="grid grid-cols-2 gap-4 m-4">
		{#each newData as mint}
			<img src={mint.image} />
		{/each}
	</div>
{:else}
	<div class="grid grid-cols-3  gap-4 m-4">
		{#each newData as mint}
			<img class="col-start-2" src={mint.image} />
		{/each}
	</div>
{/if}
