<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex flex-col-reverse sm:flex-col w-full min-h-[100dvh]">
	<nav class="flex w-full items-center justify-evenly p-3">
		<a href="/game">game</a>
		<a href="/leaderboard">leaderboard</a>
	</nav>
	<div class="w-full h-full flex flex-col sm:flex-row content-stretch flex-1 justify-center">
		{@render children()}
	</div>
</div>
