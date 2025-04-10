<script>
	import { page } from '$app/state';
</script>

<div class="fixed top-1/2 left-1/2 -translate-1/2 flex flex-col items-center">
	<h1 class="text-2xl">Server is down!</h1>
	<h2 class="text-lg py-5">Please try again later</h2>
	<h4 class="text-error">Error:</h4>
	<h4 class="text-error">{page.error.message}</h4>
</div>

