import Solana from './solana.js';
import bs58 from 'bs58';

export class Blockchain {
	/**
	 * @dev Reads data from an account
	 */
	static async get(env, accountName) {
		let solana = new Solana(env.config);
		let account = env.config.programInfo.programAccounts[accountName];
		if (!account) {
			throw new Error(`Account ${accountName} does not exist.`);
		}

		console.log({ account: account.publicKey });
		let accountInfo = await solana.getAccountInfo(account.publicKey); // Convert from base58
		let layoutItem = Solana.getDataLayouts().filter((item) => {
			return item.name === accountName;
		});
		let layout = layoutItem.length > 0 ? layoutItem[0].layout : null;
		let resultData = null;

		if (accountInfo && layout) {
			// console.log({ accountInfo });
			// resultData = layout.decode(Buffer.from(accountInfo.data));
			// console.log({ resultData });
			resultData = Buffer.from(accountInfo.data).toString().substr(4, 84).trim();
			console.log({ resultData });
		}

		return {
			callAccount: account.publicKey,
			callData: resultData
		};
	}

	/**
	 * @dev Updates an account's data
	 */
	static async put(env, accountName, data) {
		let solana = new Solana(env.config);
		// Payer privateKey is hardcoded for Beta

		const payer = Solana.getSigningAccount(
			bs58.decode(env.config.programInfo.programAccounts['payer'].privateKey)
		);

		console.log({ payer });

		let txReceipt = await solana.submitTransaction({
			keys: [
				{
					pubkey: Solana.getPublicKey(
						env.config.programInfo.programAccounts[accountName].publicKey
					),
					isSigner: false,
					isWritable: true
				}
			],
			payer,
			programId: Solana.getPublicKey(env.config.programInfo.programId),
			data
		});

		let network = env.config.httpUri.indexOf('devnet') ? 'devnet' : 'mainnet';
		return {
			txHash: txReceipt,
			explorer: `<a href="https://explorer.solana.com/tx/${txReceipt}?cluster=${network}" target="_new" style="text-decoration:underline;">View Transaction Details</a>`
		};
	}

	/**
	 * @dev Calls a program function
	 */
	static async post(env, tx, args) {
		return 'Not implemented';
	}
}
