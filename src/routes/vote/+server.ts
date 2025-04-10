import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const { id } = await request.json();

	return json({ id }, { status: 200 });
}