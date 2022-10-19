<script lang="ts">
	import { login, register } from '$lib/store/auth';

	let isRegistering = false;
	let email = '';
	let password = '';
	let firstname = '';
	let lastname = '';
	let errorMessage = '';

	async function onSubmit() {
		try {
			const userObject = {
				email,
				password: password
			} as Record<string, string>;
			if (isRegistering) {
				userObject.firstname = firstname;
				userObject.lastname = lastname;
				const success = await register(userObject);
				isRegistering = !success;
			} else {
				const success = await login(userObject);
				if (success) window.location.href = '/';
			}
		} catch (err) {
			console.error(err);
			errorMessage = (err as any).message;
		}
	}
</script>

<div class="wrapper">
	<h1>Ravi de vous revoir !</h1>
	<p>
		{isRegistering ? 'Déjà enregistré ' : 'Pas encore de compte '}?
		<button class="link" on:click={() => (isRegistering = !isRegistering)}>
			{isRegistering ? 'Me connecter ' : 'Créez-en un'} !
		</button>
	</p>
	<form on:submit|preventDefault={onSubmit}>
		<label>
			<p>Email</p>
			<input type="email" bind:value={email} />
		</label>
		<label>
			<p>Password</p>
			<input type="password" bind:value={password} />
		</label>
		{#if isRegistering}
			<label>
				<p>Prénom</p>
				<input type="text" bind:value={firstname} />
			</label>
			<label>
				<p>Nom de famille</p>
				<input type="text" bind:value={lastname} />
			</label>
		{/if}
		<button type="submit">Envoyer</button>
	</form>
</div>

<style scoped lang="scss">
	.wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		form {
			padding: 1rem;
			width: 380px;
			min-height: 500px;
			gap: 2rem;

			label p {
				font-size: 0.6rem;
				margin: 0;
				padding: 0;
				align-items: flex-start;
			}
			label input {
				width: 100%;
				padding: 0.65rem;
				outline: none;
				border: 1px solid var(--color-border);
				border-radius: 4px;
			}
			button {
				width: 100%;
				height: 2.5rem;
			}
		}
	}
</style>
