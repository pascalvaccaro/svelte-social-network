<script>
	import { onMount } from 'svelte';
	import ReadPost from '$lib/components/ReadPost.svelte';
	import CreatePost from '$lib/components/CreatePost.svelte';
	import { isLoggedIn } from '$lib/store/auth';
	import { getPosts, createPost, posts } from '$lib/store/posts';

	onMount(getPosts);
</script>

<div class="wrapper">
	<h1>Bienvenue sur le réseau des chercheurs !</h1>
	{#if $isLoggedIn}
		<CreatePost onCreatePost={createPost} />
	{/if}

	<div class="postlist">
		{#each $posts as post}
			<ReadPost {post} />
		{/each}
	</div>
</div>

<style>
	h1 {
		text-align: center;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		padding: 1rem 2rem;
	}
	.postlist {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
