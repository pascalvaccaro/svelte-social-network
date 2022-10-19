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
	:global(:root) {
		/* color palette from <https://github.com/vuejs/theme> */
		--vt-c-white: #ffffff;
		--vt-c-white-soft: #f8f8f8;
		--vt-c-white-mute: #f2f2f2;

		--vt-c-black: #181818;
		--vt-c-black-soft: #222222;
		--vt-c-black-mute: #282828;

		--vt-c-indigo: #2c3e50;

		--vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
		--vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
		--vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
		--vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);

		--vt-c-text-light-1: var(--vt-c-indigo);
		--vt-c-text-light-2: rgba(60, 60, 60, 0.66);
		--vt-c-text-dark-1: var(--vt-c-white);
		--vt-c-text-dark-2: rgba(235, 235, 235, 0.64);

		/* semantic color variables for this project */
		--color-background: var(--vt-c-white);
		--color-background-soft: var(--vt-c-white-soft);
		--color-background-mute: var(--vt-c-white-mute);

		--color-border: var(--vt-c-divider-light-2);
		--color-border-hover: var(--vt-c-divider-light-1);

		--color-heading: var(--vt-c-text-light-1);
		--color-text: var(--vt-c-text-light-1);
		--color-primary: hsla(160, 100%, 37%, 1);
		--color-primary-transparent: hsla(160, 100%, 37%, 0.1);

		--section-gap: 160px;

		:global(*),
		:global(*::before),
		:global(*::after) {
			box-sizing: border-box;
			margin: 0;
			position: relative;
			font-weight: normal;
		}
	}

	:global(body) {
		min-height: 100vh;
		color: var(--color-text);
		background: var(--color-background);
		transition: color 0.5s, background-color 0.5s;
		line-height: 1.6;
		font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
		font-size: 15px;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	:global(#app) {
		width: 100%;
		height: 100%;
		margin: 0 auto;
		font-weight: normal;
		display: flex;
		flex-direction: column;

		:global(button) {
			outline: none;
			padding: 0.5rem 1rem;
			background-color: var(--color-primary);
			color: white;
			font-weight: bold;
			border: none;
			border-radius: 4px;
			cursor: pointer;
		}
		:global(a),
		:global(.green),
		:global(button.link) {
			text-decoration: none;
			color: var(--color-primary);
			transition: 0.4s;
		}
		:global(button.link) {
			font-weight: normal;
			border: 0;
			background-color: transparent;
			cursor: pointer;
			padding: 0;
		}
		:global(button.link):hover {
			text-decoration: underline;
		}
		:global(form),
		:global(label) {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			width: 100%;
		}
		:global(input),
		:global(textarea) {
			width: 100%;
			padding: 0.5rem;
			outline: none;
			border: 1px solid var(--color-border);
			border-radius: 4px;
			font-family: inherit;
		}
		:global(textarea:focus),
		:global(input:focus) {
			border-width: 2px;
		}

		@media (hover: hover) {
			:global(a:hover) {
				background-color: hsla(160, 100%, 37%, 0.2);
			}
		}
	}

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
