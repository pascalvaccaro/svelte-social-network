<script lang="ts">
	import { isLoggedIn } from '$lib/store/auth';
	import { type TPost, addComment, addLike } from '$lib/store/posts';

	export let post: TPost;
	let content = '';
	let showComments = false;

	async function createComment() {
		await addComment(post._id, content);
		content = '';
	}
</script>

<div class="postcard">
	<h2>
		{post.title}
		<button on:click={() => addLike(post._id)}>❤ {post.likes.length}</button>
	</h2>
	<small>
		- Par
		<a href={`/profile/${post.userId}`}>
			{post.firstname}
			{post.lastname}
		</a>
		le
		{new Intl.DateTimeFormat('fr').format(new Date(post.date))}
	</small>
	<p>{post.content}</p>

	{#if showComments}
		<ul class="comments">
			{#each post.comments as comment}
				<li class="comment">
					<p style="text-decoration: underline">
						{comment.firstname}
						{comment.lastname} a répondu
					</p>
					<p>{comment.content}</p>
				</li>
			{/each}
			{#if $isLoggedIn}
				<li class="post-comment">
					<textarea bind:value={content} rows="2" />
					<button on:click={createComment}>Commenter</button>
				</li>
			{/if}
		</ul>
	{/if}
  {#if post.comments?.length || $isLoggedIn}
	<button
		class="link"
		style="text-align: right"
		on:click={() => (showComments = !showComments)}
	>
		{showComments ? 'Masquer' : 'Voir'} les commentaires
	</button>
  {/if}
</div>

<style lang="scss">
	.postcard {
		display: flex;
		padding: 1rem 2rem;
		gap: 0.85rem;
		flex-direction: column;
		border: 1px solid var(--color-border);
	}

	.comments {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		list-style-type: none;
		padding: 0;

		.post-comment {
			margin-top: 0.35rem;
			display: flex;
			flex-direction: row;
			width: 100%;
			gap: 1rem;

			textarea {
				flex-grow: 1;
				padding: 8px;
			}
			button {
				padding: 8px;
				background: transparent;
				font-weight: normal;
				border: 1px solid var(--color-primary);
				color: var(--color-primary);
				width: 100px;
				border-radius: 8px;
				&:hover {
					background: var(--color-primary);
					color: white;
					font-weight: bold;
				}
			}
		}

		.comment {
			font-size: small;
			display: flex;
			flex-direction: column;
			gap: 8px;
			padding: 1rem;
			border: 1px solid var(--color-border);
			background-color: var(--color-primary-transparent);
			border-radius: 8px;
		}
	}
</style>
