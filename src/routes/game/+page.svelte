<script lang="ts">
	import PokemonCard from "../../lib/components/PokemonCard.svelte";
	import type { PokemonData } from "../../lib/models/Pokemon";

	let { data }: {data: {pokemons: Array<PokemonData>}} = $props();
</script>
<div class="flex flex-col sm:flex-row items-center justify-center">
	{#if data.pokemons.length > 1}
	<form method="POST">
		<PokemonCard details={data.pokemons[0]} />
		<div class="sm:p-5 font-bold sm:text-2xl text-center">OR</div>
		<PokemonCard details={data.pokemons[1]} />
	</form>
	{:else}
		Missing datas
	{/if}

</div>
