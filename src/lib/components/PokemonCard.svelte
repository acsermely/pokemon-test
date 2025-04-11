<script lang="ts">
	import { fade, scale } from "svelte/transition";
	import type { PokemonData } from "../models/Pokemon";
	import { capFirstL } from "../utils/format.utils";

	const {details, submit}: {details: PokemonData, submit: (id:number) => Promise<void>} = $props();
	let clicked = $state(false)
</script>

<button in:fade class="flex shrink-0 flex-col w-full h-full max-w-[400px] max-h-[min(400px,40vh)] py-5 rounded-2xl hover:bg-base-content/30 transition-all p-3 cursor-pointer justify-center"
	onclick={()=> {
		clicked = true;
		submit(details.id)
		.finally(()=> clicked = false)
	}}
>
	<img in:scale class="object-contain transition-transform h-full w-full min-h-[min(300px,25vh)] max-h-[min(250px,25vh)]" src={details.img} alt={details.name + "_img"}>
	<div class="p-3"><span class="text-2xl font-bold">{capFirstL(details.name)}</span>, {details.height}</div>
	<div class="flex flex-wrap justify-center">
		{#each details.abilities.split(",") as item}
			 <p class="badge badge-accent text-xs p-1 font-bold ml-2 border-2 border-base-100">{item}</p>
		{/each}
	</div>
</button>