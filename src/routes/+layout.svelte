<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex flex-col-reverse sm:flex-col w-full min-h-[100dvh]">
	<nav class="fixed bottom-0 left-0 sm:top-0	h-fit w-full flex justify-center">
		<div class=" flex w-full items-center justify-evenly p-1 sm:m-1 bg-gray-500/90 sm:rounded-2xl sm:max-w-[600px]">
			<a class="btn btn-link text-neutral-content" href="/">Home</a>
			<a class="btn btn-link text-neutral-content" href="/game">Game</a>
			<a class="btn btn-link text-neutral-content" href="/leaderboard">Leaderboard</a>
		</div>
	</nav>
	<div class="mb-10 sm:mt-14 sm:mb-0 w-full flex flex-col sm:flex-row flex-1 justify-center overflow-auto">
		{@render children()}
	</div>
</div>
