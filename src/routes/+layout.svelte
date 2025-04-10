<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex flex-col-reverse sm:flex-col w-full min-h-[100dvh]">
	<nav class="fixed bottom-0 left-0 sm:top-0	 w-full">
		<div class=" flex w-full items-center justify-evenly p-3 bg-base-100">
			<a class="btn" href="/game">game</a>
			<a class="btn" href="/leaderboard">leaderboard</a>
		</div>
	</nav>
	<div class="mt-10 w-full max-h-full flex flex-col sm:flex-row content-stretch flex-1 justify-center overflow-auto">
		{@render children()}
	</div>
</div>
