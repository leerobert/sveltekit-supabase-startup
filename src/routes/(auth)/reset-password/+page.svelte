<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ supabase } = data);

	let loading = false;
	let password1: string;
	let password2: string;

	async function reset() {
		if (!password1 || !password2) {
			return alert('enter an email to reset password');
		}
		if (password1 !== password1) {
			return alert('passwords dont match');
		}
		const { error } = await supabase.auth.updateUser({
			password: password2
		});
		if (error) console.error(error);
		goto('/');
	}
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-md">
	<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
		Reset your password
	</h2>
	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form class="py-4 space-y-6" on:submit|preventDefault={reset}>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Password</label>
					<div class="mt-1">
						<input
							type="password"
							placeholder="Enter a password"
							bind:value={password1}
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
						/>
					</div>
				</div>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700">Confirm password</label
					>
					<div class="mt-1">
						<input
							type="password"
							placeholder="Confirm your password"
							bind:value={password2}
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
							Sending reset password email
						{:else}
							Reset your password
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>
