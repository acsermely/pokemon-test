import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fetch from 'node-fetch';
import fs from 'fs';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors());

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

		await db.exec(`
			CREATE TABLE IF NOT EXISTS votes (
			  pokemon_id INTEGER PRIMARY KEY,
			  vote_count INTEGER DEFAULT 0,
			  FOREIGN KEY(pokemon_id) REFERENCES pokemon(id)
			)
		`);

		console.log('Import 100 Pokémon from pokeapi');

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

		await db.exec(`INSERT OR IGNORE INTO votes (pokemon_id, vote_count) SELECT id, 0 FROM pokemon`);

		console.log('Initialized votes');

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

app.post('/vote/:id', express.json(), async (req, res) => {
	try {
	  const db = await open({
		filename: './pokemon.db',
		driver: sqlite3.Database
	  });
	  
	  const result = await db.run(
		'UPDATE votes SET vote_count = vote_count + 1 WHERE pokemon_id = ?',
		[req.params.id]
	  );
	  
	  await db.close();
  
	  if (result.changes === 0) {
		return res.status(404).json({ error: 'Pokémon not found' });
	  }
	  
	  res.json({ success: true });
	} catch (err) {
	  res.status(500).json({ error: err.message });
	}
});

app.get('/votes', async (req, res) => {
	try {
		const db = await open({
			filename: './pokemon.db',
			driver: sqlite3.Database
		});
	  const votes = await db.all(`
		SELECT p.name, v.vote_count, p.img 
		FROM votes v
		JOIN pokemon p ON v.pokemon_id = p.id
		ORDER BY v.vote_count DESC
		LIMIT 10
	  `);
	  await db.close();
	  res.json(votes);
	} catch (err) {
	  res.status(500).json({ error: err.message });
	}
});

app.post('/reset', async (req, res) => {
	try {
	  const db = await open({
		filename: './pokemon.db',
		driver: sqlite3.Database
	  });

	  await db.run('UPDATE votes SET vote_count = 0');
	  await db.close();
	  
	  res.json({ 
		success: true,
		message: 'All votes have been reset to 0'
	  });
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