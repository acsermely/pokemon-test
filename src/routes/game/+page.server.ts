import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PokemonData } from "../../lib/models/Pokemon";

export const load: PageServerLoad = async ({ fetch, params }) => {
	const res = await fetch(`http://localhost:3000/pokemon/opponents`, { signal: AbortSignal.timeout(2000)});
	const items: Array<PokemonData> = await res.json();

	if (!items) error(404);
	
	
	return { pokemons: items };
};