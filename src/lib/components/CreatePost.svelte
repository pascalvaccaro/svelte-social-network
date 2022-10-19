<script lang="ts">
	export let onCreatePost: (post: { title: string; content: string }) => Promise<unknown>;

	let title = '';
	let content = '';
	async function onSubmit() {
		try {
			await onCreatePost({ title, content });
			title = '';
			content = '';
		} catch (err) {
			console.error(err);
		}
	}
</script>

<template>
	<form on:submit|preventDefault={onSubmit}>
		<label>
			<p>Titre</p>
			<input bind:value={title} name="title" />
		</label>
		<label>
			<p>Contenu</p>
			<textarea rows="4" bind:value={content} name="content" />
		</label>
		<button type="submit">Poster</button>
	</form>
</template>

<style scoped lang="scss">
	form {
		gap: 1rem;

		label p {
			font-size: 0.6rem;
			margin: 0;
			padding: 0;
			align-items: flex-start;
		}
		textarea {
			resize: vertical;
		}
		button[type='submit'] {
			align-self: flex-end;
			padding: 1rem 2rem;
		}
	}
</style>
