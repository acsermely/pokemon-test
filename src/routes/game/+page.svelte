<script lang="ts">
	import PokemonCard from "../../lib/components/PokemonCard.svelte";
	import type { PokemonData } from "../../lib/models/Pokemon";


	let { data }: {data: {pokemons: Array<PokemonData>}} = $props();

	console.log(data.pokemons)
</script>
<div class="flex flex-col sm:flex-row items-center justify-center">
	{#if data.pokemons.length > 1}
		<PokemonCard details={data.pokemons[0]} />
		<div class="p-5 font-bold text-2xl">OR</div>
		<PokemonCard details={data.pokemons[1]} />
	{:else}
		Missing datas
	{/if}

</div>
