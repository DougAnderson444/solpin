# SOL-PIN

## The problem

The problem with Web3 data is it's usually immutable, like when you save to IPFS or Arweave -- once the data is saved, you get a Transaction ID (or IPFS Content ID) back and that's it. 

What if you want to update your website? You'd have to refresh the Tx ID every time? Pfft, I don't think so.

Solutions like IPNS don't really work well. P2P attempts such as [HyPNS](https://github.com/DougAnderson444/hypns) require a server to be kept online to pin the data.

But Solana costs pennies for mutable posts, so why not just make life easy and use Solana?

What if you want to hand out a link to someone, that points to the latest updates?

That's what SOLPIN solves. It gives you a permanent but mutable link on Solana that points to the latest version of your saved Web3 data. Want an old version? Just go back in the SOLPIN transaction history and grab it.


Pin Web3 data using [Solana](https://solana.com/). Publish and update using [IPFS](https://ipfs.io/) and [Arweave](https://www.arweave.org/) style ecosystems with ease.

Goal is to integrate this product into Web3 Repl so people can update their Web3 apps easily.

## Design Options

To point to the latest data, we could use:

- a program address (smart contract) and store the value in the program state

- an SPL token address (address and access token) to track who can sign (authorize) updates to the latest data

- Use [name-service](https://spl.solana.com/name-service) ([source code](https://github.com/solana-labs/solana-program-library/tree/master/name-service/js/src)) to point to the program address (smart contract) so we can give it a human readable name

Then add code interface & UI for trasaction id's

Then add crypto multisignatures using Solana ed25519 keys from wallets

## Code structure

- Code in src/lib is the library
- Code in src/routes/ is the demo front end

## Deploying

Code needs to be deployed to Arweave, so we use [sveltejs-adapter-ipfs](https://github.com/wighawag/sveltejs-adapter-ipfs) in the svelte config file to build for a static site

## Team

- @DougAnderson444
- Your name here?

## Contributing

1. Create a fork
2. Create your feature branch: git checkout -b my-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request 🚀