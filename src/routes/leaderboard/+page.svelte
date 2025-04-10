<script lang="ts">
	let { data } = $props();

	console.log(data)
</script>
<div class="flex flex-col sm:flex-row items-center justify-center">
	{#if data.leaders.length}
		 asdasd
	{:else}
		 No votes yet!
	{/if}
</div>
