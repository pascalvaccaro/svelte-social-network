<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let value: string | number | undefined = '';
	export let type: 'text' | 'email' | 'number' = 'text';
	export let editable = false;
	const dispatch = createEventDispatcher();

	let editing = false;
	let myInput: HTMLInputElement;
	function toggleEditing() {
		if (editable) {
			editing = !editing;
			if (myInput) myInput.focus();
		}
	}
</script>

<template>
	<div on:mousedown={toggleEditing} on:keydown={undefined} class="field">
		{#if editing}
			<input
				{type}
				{value}
				bind:this={myInput}
				on:change={(e) => dispatch('updateValue', e.currentTarget.value)}
			/>
		{:else}
			{value}
		{/if}
	</div>
</template>

<style lang="scss">
	.field {
		cursor: pointer;
		display: flex;
		flex-direction: row;
		width: 100%;
		gap: 1rem;
		border: 1px solid var(--color-border);
		padding: 0.25rem;
		min-height: 35px;

		input {
			padding: 4px;
		}
	}
</style>
