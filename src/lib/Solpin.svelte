<script>
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
</script>

Solpin.svelte
