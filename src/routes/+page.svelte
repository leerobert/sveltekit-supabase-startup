<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ supabase, session } = data);

	async function logout() {
		await supabase.auth.signOut();
	}
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<button on:click={logout}> logout</button>
<pre>{JSON.stringify(session)}</pre>
