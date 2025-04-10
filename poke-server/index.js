import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fetch from 'node-fetch';
import fs from 'fs';

const app = express();
const port = 3000;

async function initializeDatabase() {
		if (fs.existsSync('./pokemon.db')) {
			return;
		}
		console.log('Creating database...');

		const db = await open({
			filename: './pokemon.db',
			driver: sqlite3.Database
		});

		await db.exec(`
			CREATE TABLE IF NOT EXISTS pokemon (
				id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				img TEXT NOT NULL,
				height INTEGER NOT NULL,
				abilities TEXT NOT NULL
			)
		`);

		const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
		const { results } = await response.json();

		for (const pokemon of results) {
			const {sprites, abilities, height} = await fetch(pokemon.url).then(res=> res.json())
			const pokeImg = sprites.other.dream_world.front_default || "";
			const pokeAbilityList = abilities.map(item => item.ability.name).join(",")
			await db.run('INSERT INTO pokemon (name, img, height, abilities) VALUES (?, ?, ?, ?)', [
				pokemon.name,
				pokeImg,
				height,
				pokeAbilityList,
			]);
		}

		console.log('Inserted 100 Pokémon into database');
		await db.close();
}


// API endpoint to get all Pokémon
app.get('/pokemon', async (req, res) => {
	try {
		const db = await open({
			filename: './pokemon.db',
			driver: sqlite3.Database
		});

		const pokemon = await db.all('SELECT * FROM pokemon');
		await db.close();

		res.json(pokemon);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

app.get('/pokemon/opponents', async (req, res) => {
	try {
	  const db = await open({
		filename: './pokemon.db',
		driver: sqlite3.Database
	  });
	  
	  const pokemon = await db.all(`
		SELECT * FROM pokemon 
		ORDER BY RANDOM() 
		LIMIT 2
	  `);
	  
	  await db.close();
	  
	  res.json(pokemon);
	} catch (err) {
	  res.status(500).json({ error: err.message });
	}
  });

try {
	await initializeDatabase();
} catch (err) {
	console.error('Initialization failed:', err);
};

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});