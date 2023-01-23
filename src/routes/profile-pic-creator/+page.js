// // import { error } from '@sveltejs/kit';
// import { SocialProtocol } from '@spling/social-protocol';
// import { Keypair } from '@solana/web3.js';
// import * as solanaWeb3 from '@solana/web3.js';

// const wallet = Keypair.generate();
// const payerWallet = Keypair.generate();
// const options = {
// 	// rpcUrl: 'https://api.mainnet-beta.solana.com/',
// 	rpcUrl: 'https://twilight-bitter-brook.solana-mainnet.discover.quiknode.pro/dd2f24090b4cd4e3c2f515234288425e9e745737/',
// 	useIndexer: true
// };

// export async function load({ params }) {
// 	// console.log('wallet: ' + JSON.stringify(wallet));
// 	// console.log('payerWallet: ' + JSON.stringify(payerWallet));
// 	const publicKey = new solanaWeb3.PublicKey('6SZxDGiHqR2HTwyBKToS1xMxhcJuLNjj1Bo6N2Gyhtbh');

// 	// const socialProtocol = await new SocialProtocol(wallet, payerWallet, options).init();
// 	const socialProtocol = await new SocialProtocol(publicKey, publicKey, options).init();

// 	const user = await socialProtocol.createUser('SolsWatch', null, 'SolsWatch User');
// 	console.log(JSON.stringify(user));

// 	// You can call now functions like:
// 	// const user = await socialProtocol.getUser(1);
// 	// console.log(JSON.stringify(user));

// 	// const newUser = await socialProtocol.createUser('testUser');
// 	// console.log(JSON.stringify(user));

// 	// let groups = await socialProtocol.getAllGroups(null, null, null);
// 	// console.log(groups);

// 	// if (groups) return { groups };

// 	// const group = await socialProtocol.getGroup(12);
// 	// console.log(group);

// 	// 4bRGydNMDHr6YrxsJfPdcrpgBnQFN9gVZdSzvgu91mqz -- userId 1
// 	// 6SZxDGiHqR2HTwyBKToS1xMxhcJuLNjj1Bo6N2Gyhtbh -- Helio

// 	// const user = await socialProtocol.getUserByPublicKey(publicKey);
// 	// console.log(user);

// 	const posts = await socialProtocol.getAllPosts(12, 10, 0);
// 	// console.log(posts);
// 	let newPosts = posts.slice(0, 10);
// 	// console.log(newPosts);

// 	if (newPosts) return { newPosts };
// 	// if (error) throw error(404, 'Not found');
// }
