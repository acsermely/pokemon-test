import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
	const res = await fetch(`http://localhost:3000/votes`, { signal: AbortSignal.timeout(2000)});
	const items: Array<any> = await res.json();

	if (!items) error(404);
	
	
	return { leaders: items };
};