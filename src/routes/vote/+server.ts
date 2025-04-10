import { error, json } from '@sveltejs/kit';

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