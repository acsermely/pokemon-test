<script lang="ts">
	import type { LeaderData } from "../../lib/models/Pokemon";
	import { capFirstL } from "../utils/format.utils";

	let { pokemon, ranking }: {pokemon:LeaderData, ranking: number} = $props();
</script>

<div class="flex flex-col w-full items-center p-5 my-5 border-2 rounded-2xl max-w-[400px]"
	class:border-amber-400={ranking == 0}
	class:border-white={ranking == 1}
	class:border-amber-800={ranking == 2}
	class:border-neutral-content={ranking > 2}
>
	<img class="max-w-[200px]" src={pokemon.img} alt={`${pokemon.name}_img`}>
	<div class="text-2xl p-2">{capFirstL(pokemon.name)}</div>
	<div class="flex flex-col items-center">
		<div class="text-xs">Score:</div>
		<div class="text-lg">
			{pokemon.vote_count}
		</div>
		
	</div>
</div>