<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ supabase } = data);

	let loading = false;
	let token: string;

	const verify = async () => {
		try {
			loading = true;
			const { error } = await supabase.auth.verifyOtp({
				email: data.email!,
				token,
				type: 'signup'
			});
			if (error) throw error;
			await goto('/');
		} catch (error) {
			return alert('Verification code is invalid. Try signing in again.');
		} finally {
			loading = false;
		}
	};

	if (data.token) {
		token = data.token;
	}
</script>

<div class="sm:mx-auto sm:w-full sm:max-w-md">
	<h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
		Verify your email address
	</h2>
	<p class="mt-4 text-center text-md text-gray-500">
		Check your email for a magic link. If the link does not log you in automatically, enter the
		verification code below.
	</p>
	<div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
		<div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
			<form class="py-4 space-y-6" on:submit|preventDefault={verify}>
				<div>
					<label for="email" class="block text-sm font-medium text-gray-700"
						>Verification code</label
					>
					<div class="mt-1">
						<input
							type="text"
							autocomplete="off"
							placeholder="Code provided in email"
							bind:value={token}
							class="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
						/>
					</div>
					<p class="mt-1 text-sm text-left text-gray-500">
						You should receive an email containing your sign in code at {' '}
						<span class="font-semibold">{data.email}</span>
					</p>
				</div>

				<div>
					<button
						disabled={loading}
						type="submit"
						class="flex w-full justify-center rounded-md border border-transparent bg-green-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						{#if loading}
							Signing in...
						{:else}
							Verify
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
</div>

<p class="mt-10 text-center text-sm text-gray-500">
	Didn't receive an email?
	<a href="/login" class="font-semibold leading-6 text-green-600 hover:text-green-500"
		>Try signing in again.</a
	>
</p>
