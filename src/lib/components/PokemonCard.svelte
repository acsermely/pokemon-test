<script lang="ts">
	import { fade } from "svelte/transition";
	import type { PokemonData } from "../models/Pokemon";
	import { capFirstL } from "../utils/format.utils";

	const {details, submit}: {details: PokemonData, submit: (id:number) => Promise<void>} = $props();
	let clicked = $state(false)
</script>

<button in:fade class="flex flex-col w-full sm:max-h-full max-w-[400px] max-h-[40dvh] py-5 rounded-2xl hover:bg-base-content/30 transition p-3 cursor-pointer"
	onclick={()=> {
		clicked = true;
		submit(details.id)
		.finally(()=> clicked = false)
	}}
>
	<img class="h-full w-full max-h-[250px] min-h-[200px] min-w-[200px]" src={details.img} alt={details.name + "_img"}>
	<div class="p-3"><span class="text-2xl font-bold">{capFirstL(details.name)}</span>, {details.height}</div>
	<div class="flex flex-wrap justify-center">
		{#each details.abilities.split(",") as item}
			 <p class="badge badge-accent text-xs p-1 font-bold ml-2 border-2 border-base-100">{item}</p>
		{/each}
	</div>
</button>