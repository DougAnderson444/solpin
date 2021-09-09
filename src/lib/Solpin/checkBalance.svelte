<script>
	import { onMount } from 'svelte';
	export let soldeets;

	onMount(() => {
		var loop = setTimeout(checkBalance, 250);

		async function checkBalance() {
			console.log('checking balance 1', soldeets?.balance);
			if (soldeets?.connection && soldeets?.keypair) {
				console.log('checking balance 2');
				soldeets['balance'] = await soldeets?.connection.getBalance(soldeets?.keypair.publicKey);
				if (soldeets.balance > 0) {
					console.log('clearing loop');
					clearTimeout(loop);
					return;
				}
			}
			loop = setTimeout(checkBalance, 200);
		}
	});
</script>

{soldeets?.balance}
