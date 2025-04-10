import { error, json } from '@sveltejs/kit';

export async function POST() {
	const response = await fetch(`http://localhost:3000/reset`, {
		method: 'POST',
	});

	if (response.status != 200) error(response.status)

	return json({ success: true }, { status: 200 });
}