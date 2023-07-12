<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ supabase } = data);

	let loading = false;
	let name: string;
	let email: string;
	let password: string;

	async function handleLogin() {
		try {
			loading = true;
			const { error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					data: { name }
				}
			});
			if (error) throw error;
			goto(`/verify?email=${email}`);
		} catch (error) {
			if (error instanceof Error) {
				alert(error.message);
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-md">
	<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
		Create an account
	</h2>
	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form class="py-4 space-y-6" on:submit|preventDefault={handleLogin}>
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
					<div class="mt-1">
						<input
							type="text"
							autocomplete="name"
							placeholder="Your name"
							bind:value={name}
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
						/>
					</div>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
					<div class="mt-1">
						<input
							type="email"
							placeholder="Your email"
							bind:value={email}
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
						/>
					</div>
				</div>
				<div>
					<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
					<div class="mt-1">
						<input
							type="password"
							placeholder="Your password"
							bind:value={password}
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
						/>
					</div>
				</div>

				<div>
					<button
						disabled={loading}
						type="submit"
						class="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						{#if loading}
							Creating account...
						{:else}
							Create account
						{/if}</button
					>
				</div>
			</form>
		</div>
	</div>
</div>

<p class="mt-10 text-center text-sm text-gray-500">
	Already have an account?
	<a href="/login" class="font-semibold leading-6 text-green-600 hover:text-green-500">Sign in</a>
</p>
