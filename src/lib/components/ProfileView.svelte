<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getProfile, updateProfile, isLoggedIn, type TProfile } from '$lib/store/auth';
	import { getPosts, posts } from '$lib/store/posts';
	import SmartField from '$lib/components/SmartField.svelte';
	import ReadPost from './ReadPost.svelte';

	let profile: TProfile = {} as TProfile;

	const fields = [
		{ name: 'email', type: 'email', label: 'Email' },
		{ name: 'firstname', type: 'text', label: 'Prénom' },
		{ name: 'lastname', type: 'text', label: 'Nom de famille' },
		{ name: 'occupation', type: 'text', label: 'Job' },
		{ name: 'age', type: 'number', label: 'Age' }
	] as const;

	onMount(getPosts);
	onMount(async () => {
		profile = await getProfile($page.params.id);
	});

	$: canEditProfile = !!profile._id && !$page.params.id && $isLoggedIn;

	function editProfile(fieldName: keyof TProfile, value: any) {
		// @ts-expect-error any
		profile[fieldName] = value;
	}
</script>

<div class="wrapper">
	<form class="left" on:submit|preventDefault={() => updateProfile(profile)}>
		<h1>Profil</h1>
		{#each fields as field}
			<label for="">
				<p>{field.label}</p>
				<SmartField
					type={field.type}
					value={profile[field.name]}
					on:updateValue={(e) => editProfile(field.name, e.detail)}
					editable={canEditProfile}
				/>
			</label>
		{/each}
		{#if canEditProfile}
			<button type="submit">Modifier mon profil</button>
		{/if}
	</form>
	<div class="right">
		<h1>Posts</h1>
		{#each $posts as post}
			{#if post.userId == profile._id}
				<ReadPost {post} />
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.wrapper {
		display: flex;
		flex-direction: row;
		width: 100%;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: center;
		gap: 2rem;

		h1 {
			text-align: center;
			width: 100%;
		}

		.left,
		.right {
			box-sizing: border-box;
			width: 45%;
			height: 100%;
			display: flex;
			flex-direction: column;
		}
		form {
			width: 420px;
			gap: 1rem;

			label p {
				font-size: 0.6rem;
				margin: 0;
				padding: 0;
				align-items: flex-start;
			}
		}
	}
</style>
