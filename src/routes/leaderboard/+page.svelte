<script lang="ts">
	import LeaderboardCard from "../../lib/components/LeaderboardCard.svelte";
	import type { LeaderData } from "../../lib/models/Pokemon";

	let { data }: {data: {leaders: Array<LeaderData>}} = $props();
</script>

<div class="flex flex-col flex-1 p-5 w-full items-center">
	{#if data.leaders.length}
		<h1 class="text-3xl w-full text-center">Top 10 Pokemons</h1>

		<form method="POST">
			<button class="btn btn-outline my-5">Reset Scores</button>
		</form>

		{#each data.leaders as pokemon, i}
			<LeaderboardCard {pokemon} ranking={i}/>
		{/each}
	{:else}
		 No votes yet!
	{/if}
</div>
