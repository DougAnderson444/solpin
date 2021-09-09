<script lang="ts">
	// @ts-ignore
	import Solpin from './Solpin.svx';
	import CheckBalance from './checkBalance.svelte';

	// import solana stuff
	import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
	import {
		Keypair,
		Connection,
		BpfLoader,
		BPF_LOADER_PROGRAM_ID,
		PublicKey,
		LAMPORTS_PER_SOL,
		SystemProgram,
		TransactionInstruction,
		Transaction,
		sendAndConfirmTransaction
	} from '@solana/web3.js';

	import { onMount } from 'svelte';

	export let address;
	export let devNet = true;

	let soldeets = { address: '' };
	let balance, connection, keypair, airdropHash, subaccount, programId, greetedPubkey;
	let borsh;

	// The state of a greeting account managed by the hello world program
	class GreetingAccount {
		counter = 0;
		constructor(fields: { counter: number } | undefined = undefined) {
			if (fields) {
				this.counter = fields.counter;
			}
		}
	}

	// Borsh schema definition for greeting accounts
	const GreetingSchema = new Map([
		[GreetingAccount, { kind: 'struct', fields: [['counter', 'u32']] }]
	]);

	let GREETING_SIZE;
	// Develop program template code
	// Deploy a template program for the client in the browser
	// Save the Tx ID to save
	// Program updates the saved value if the owner's key is used
	// Program gives latest value upon query
	// App shows tx history of past saved values

	// Buttons / Steps
	// Create a new Paste (aka deploy a new copy of a program)
	// Load an existing Paste
	// Update a Paste

	onMount(async () => {
		borsh = await import('borsh');
		GREETING_SIZE = borsh.serialize(GreetingSchema, new GreetingAccount()).length;

		if (devNet) {
			try {
				const url = 'https://api.devnet.solana.com';
				connection = new Connection(url, 'confirmed');
				soldeets = { ...soldeets, connection };

				const version = await connection.getVersion();
				console.log({ version }, version?.['solana-core']);

				keypair = Keypair.generate();
				address = keypair?.publicKey.toString();
				const secret = JSON.stringify(Array.from(keypair?.secretKey));
				soldeets = { ...soldeets, keypair, address, secret, connection };
				airdropHash = await connection.requestAirdrop(keypair.publicKey, LAMPORTS_PER_SOL);
			} catch {
				console.error('network error');
			}
		}
	});

	async function createSubAccount() {
		const GREETING_SEED = 'GREETING_SEED';
		try {
			greetedPubkey = await PublicKey.createWithSeed(keypair.publicKey, GREETING_SEED, programId);
		} catch (error) {
			console.error('accounts error');
		}

		const lamports = await connection.getMinimumBalanceForRentExemption(GREETING_SIZE);

		const transaction = new Transaction().add(
			SystemProgram.createAccountWithSeed({
				fromPubkey: keypair.publicKey,
				basePubkey: keypair.publicKey,
				seed: GREETING_SEED,
				newAccountPubkey: greetedPubkey,
				lamports,
				space: GREETING_SIZE,
				programId
			})
		);
		const hash = await sendAndConfirmTransaction(connection, transaction, [keypair.publicKey]);
	}
</script>

<!-- <Solpin {soldeets} /> -->

### Account {soldeets?.address}<br />

Balance <CheckBalance {soldeets} /><br />

<input bind:value={programId} />
<button on:click={createSubAccount}>Create sub-account</button><br />

{subaccount}
