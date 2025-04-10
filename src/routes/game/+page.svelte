<script lang="ts">
	import { onMount } from "svelte";
	import PokemonCard from "../../lib/components/PokemonCard.svelte";
	import { getGameState } from "../../lib/state/game.svelte";
	import { fade } from "svelte/transition";

	let gameState = getGameState();

	onMount(() => {
		if (!gameState.opponents.length && !gameState.isLoading) {
			gameState.refresh()
		}
	})

	function submit(id: number): Promise<void> {
		return gameState.vote(id);
	}

</script>

<div class="flex flex-col w-full sm:flex-row items-center justify-center">
	{#if !gameState.isLoading && gameState.opponents.length > 1}
		<PokemonCard details={gameState.opponents[0]} {submit} />
		<div class="sm:p-5 font-bold sm:text-2xl text-center">OR</div>
		<PokemonCard details={gameState.opponents[1]} {submit}/>
	{:else}
		<div in:fade class="skeleton w-11/12 sm:w-[40vw] h-[40vh] m-5"></div>
		<div in:fade class="skeleton w-10 h-5"></div>
		<div in:fade class="skeleton w-11/12 sm:w-[40vw] h-[40vh] m-5"></div>
	{/if}
</div>
