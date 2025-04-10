<script lang="ts">
	import type { PokemonData } from "../models/Pokemon";
	import { capFirstL } from "../utils/format.utils";

	const {details}: {details: PokemonData} = $props();

	function submitVote(): void {
		fetch('/vote', {
			method: 'POST',
			body: JSON.stringify({ id: details.id }),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then(()=> location.reload());
	}
</script>

<button class="flex flex-col w-full sm:max-h-full max-w-[400px] max-h-[40dvh] py-5 rounded-2xl hover:bg-base-content/30 transition p-3 cursor-pointer" onclick={submitVote}>
	<img class="flex-1 h-full w-full max-h-[300px] sm:min-h-[400px]" src={details.img} alt={details.name + "_img"}>
	<div class="p-3"><span class="text-2xl font-bold">{capFirstL(details.name)}</span>, {details.height}</div>
	<div class="flex flex-wrap justify-center">
		{#each details.abilities.split(",") as item}
			 <p class="badge badge-accent text-xs p-1 font-bold ml-2 border-2 border-base-100">{item}</p>
		{/each}
	</div>
</button>