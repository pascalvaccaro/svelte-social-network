<script lang="ts">
	import { isLoggedIn } from '$lib/store/auth';
</script>

<div id="app">
	<header>
		<nav>
			<a href="/">Home</a>
			{#if $isLoggedIn}
				<a href="/profile">My Profile</a>
				<a href="/logout">Logout</a>
			{:else}
				<a href="/signin">Login/Register</a>
			{/if}
		</nav>
	</header>

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	header {
		line-height: 1.5;
		height: 4rem;
	}
	main {
		width: 100%;
		flex-grow: 1;
		height: calc(100% - 4rem);
	}

	nav {
		width: 100%;
		height: 100%;
		font-size: 12px;
		text-align: center;
		margin-top: 2rem;
	}

	nav a {
		color: var(--color-text);
	}

	nav a:hover {
		background-color: transparent;
	}

	nav a {
		display: inline-block;
		padding: 0 1rem;
		border-left: 1px solid var(--color-border);
	}

	nav a:first-of-type {
		border: 0;
	}
</style>
