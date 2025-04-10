import { error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, params }) => {
	const res = await fetch(`http://localhost:3000/votes`, { signal: AbortSignal.timeout(2000)});
	const items: Array<any> = await res.json();

	if (!items) error(404);
	
	
	return { leaders: items };
};

export const actions = {
	default: async () => {
		const response = await fetch(`http://localhost:3000/reset`, {
			method: 'POST',
			signal: AbortSignal.timeout(2000)
		});
	
		if (response.status != 200) fail(response.status)
  
	  return { status: 'success' };
	}
  };