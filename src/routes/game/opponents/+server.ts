import { error, json } from '@sveltejs/kit';
import type { PokemonData } from '../../../lib/models/Pokemon';

export async function GET() {
	const res = await fetch(`http://localhost:3000/pokemon/opponents`, { signal: AbortSignal.timeout(2000)});
	const items: Array<PokemonData> = await res.json();
	
	if (res.status != 200) error(res.status);

	return json({ items }, { status: 200 });
}

export async function POST({ request }) {
	const { id } = await request.json();

	const response = await fetch(`http://localhost:3000/vote/${id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		signal: AbortSignal.timeout(2000)
	});

	if (response.status != 200) error(response.status)

	return json({ id }, { status: 200 });
}

