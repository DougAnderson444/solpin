import fs from 'fs';
import path from 'path';
import bs58 from 'bs58';
import spawn from 'cross-spawn';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import Solana from '../solana.js';
import { setUncaughtExceptionCaptureCallback } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SLASH = path.sep;
const PAYER = 'payer';

const dappConfigFile = path.resolve(`${__dirname}${SLASH}..${SLASH}dapp-config.json`);

const solConfigFile = path.resolve(`${__dirname}${SLASH}..${SLASH}solana-config.json`);

(async () => {
	const networks = JSON.parse(fs.readFileSync(solConfigFile, 'utf8'));

	let config = networks.development.config;
	let accountCount = 5;

	// Unpopulated dappConfig
	let dappConfig = {
		httpUri: config.httpUri,
		contracts: {},
		accounts: [],
		wallets: [],
		programInfo: null
	};

	if (fs.existsSync(dappConfigFile)) {
		dappConfig = JSON.parse(fs.readFileSync(dappConfigFile, 'utf8'));
	}

	if (dappConfig.accounts.length < accountCount) {
		await createTestAccounts(accountCount);
	}

	// One account is created for each data layout in the array passed to deployProgram
	// In addition, the payer account is automatically funded with lamports based on the
	// data layout size

	let dataLayouts = Solana.getDataLayouts();
	if (dataLayouts.length > 0) {
		await deployProgram(dataLayouts);
	}

	console.log(`\n\n\🚀 Dapp configuration file updated at ${dappConfigFile}\n\n`);

	async function createTestAccounts(count) {
		let solana = new Solana(config);
		for (let a = 0; a < count; a++) {
			// Create the account with the public keys
			let accountObj = await solana.createAccount({
				lamports: 1000000,
				entropy: null
			});
			let account = {
				publicKey: accountObj.publicKey.toBase58(),
				privateKey: bs58.encode(accountObj.secretKey)
			};
			dappConfig.wallets.push(account);
			dappConfig.accounts.push(account.publicKey);
		}
	}

	async function deployProgram(accountDataLayouts) {
		let programsPath = path.resolve(__dirname, '..', '..', 'programs');
		let programFile = `${programsPath}${SLASH}build${SLASH}dapp.so`;
		console.log(`\n\n\⚙️  Building program...\n${programFile}\n`);

		if (!fs.existsSync(programFile)) {
			console.log(
				`\n\n\ Note: The first build is slow due to Rust library download and pre-compilation \n\n`
			);
		}
		spawn.sync(
			'cargo',
			[
				'build-bpf',
				`--manifest-path=${programsPath}${SLASH}Cargo.toml`,
				`--bpf-out-dir=${programsPath}${SLASH}build`
			],
			{ stdio: 'inherit' }
		);

		let program = fs.readFileSync(programFile);
		let solana = new Solana(config);

		console.log(`\n\n\⚙️  Deploying program to blockchain...\n\n`);

		let result = await solana.deployProgram(program, accountDataLayouts);

		console.log(
			`\n\n\💰 Payer account ${result.programAccounts[PAYER].publicKey} created with ${result.programAccounts[PAYER].lamports} lamports for fees.\n\n`
		);

		for (let accountName in result.programAccounts) {
			if (accountName !== PAYER) {
				console.log(
					`\n\n\📄 State account ${result.programAccounts[accountName].publicKey} created with ${result.programAccounts[accountName].lamports} lamports for fees.\n\n`
				);
			}
		}

		console.log('Program loaded to account ', result.programId);

		dappConfig.programInfo = result;
		fs.writeFileSync(dappConfigFile, JSON.stringify(dappConfig, null, '\t'), 'utf8');

		return result;
	}
})();
