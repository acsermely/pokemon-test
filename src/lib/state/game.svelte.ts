import { getContext, setContext } from "svelte";
import type { PokemonData } from "../models/Pokemon";

export class GameState {
	opponents: PokemonData[] = $state([]);
	isLoading: boolean = $state(false);

	async refresh(): Promise<void> {
		this.isLoading = true;
		return fetch('game/opponents')
			.then(res => res.json())
			.then(data => this.opponents = data.items)
			.catch(e => console.error("Failed to fetch opponents!", e))
			.finally(()=> this.isLoading = false);
	}

	async vote(id: number): Promise<void> {
		this.isLoading = true;
		return fetch('game/opponents', {
			method: "POST",
			body: JSON.stringify({ id }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then(() => this.refresh())
			.finally(()=> this.isLoading = false);
	}

}

const GAME_KEY = 'game-state';

export function setGameState(): GameState {
	return setContext(GAME_KEY, new GameState());
}

export function getGameState(): GameState {
	return getContext<GameState>(GAME_KEY);
}