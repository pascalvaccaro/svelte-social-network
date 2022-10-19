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
	<form on:submit|preventDefault={() => updateProfile(profile)}>
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
	<h2>Les dernières publication de {profile.firstname} {profile.lastname}</h2>
	<div class="posts">
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
		flex-direction: column;
		width: 100%;
		align-items: center;
		gap: 1rem;

		form {
			width: 420px !important;
			gap: 1rem;
			flex-grow: 1;

			label p {
				font-size: 0.6rem;
				margin: 0;
				padding: 0;
				align-items: flex-start;
			}
		}
		h2 {
			margin: 1rem 0;
		}
		.posts {
			padding: 0 2rem;
		}
	}
</style>
