import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import { API_URL, API_TOKEN_NAME, handleResponse } from './constants';

const tokenFromStorage = browser ? localStorage.getItem(API_TOKEN_NAME) : "";
export const isLoggedIn = writable(!!tokenFromStorage);
export const apiToken = writable(tokenFromStorage);
if (browser)
	apiToken.subscribe((newValue) =>
		newValue
			? localStorage.setItem(API_TOKEN_NAME, newValue)
			: localStorage.removeItem(API_TOKEN_NAME)
	);

export const authenticate = (options: Parameters<typeof fetch>[1] = {}) => {
	if (!browser) return options;
	options.headers = new Headers(options.headers);
	options.headers.set('Content-Type', 'application/json');
	options.headers.set('Authorization', 'bearer ' + localStorage.getItem(API_TOKEN_NAME));
	return options;
};

export async function login(credentials: { email?: string; password?: string } = {}) {
	const response = await fetch(API_URL + '/login', {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await handleResponse<{ token: string; success: boolean }>(response);
	localStorage.setItem(API_TOKEN_NAME, data.token);
	return data.success;
}

export async function register(credentials: Partial<TProfile> = {}) {
	const response = await fetch(API_URL + '/register', {
		method: 'POST',
		body: JSON.stringify(credentials),
		headers: {
			'Content-Type': 'application/json'
		}
	});
	const data = await handleResponse(response);
	return data.success as boolean;
}

export async function getProfile(id = '') {
	const path = id ? `/user/${id}` : '/user';
	const options = authenticate();
	const response = await fetch(API_URL + path, options);
	const data = await handleResponse<TProfile>(response);
	return data;
}

export async function updateProfile(profile = {} as Partial<TProfile>) {
	const options = authenticate({
		method: 'PUT',
		body: JSON.stringify({
			email: profile.email,
			firstname: profile.firstname,
			lastname: profile.lastname,
			age: Number(profile.age),
			occupation: profile.occupation
		})
	});
	const response = await fetch(API_URL + '/user', options);
	const data = await handleResponse<TProfile>(response);
	return data;
}

export type TProfile = {
	_id: string;
	email: string;
	firstname: string;
	lastname: string;
	occupation: string;
	age: number;
};
