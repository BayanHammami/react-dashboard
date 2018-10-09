let localStore;
const localStorageKey = 'react-dashboard';

export const readStore = () => {
	if (!localStore) {
		localStore = {};
		const storeRaw = window.localStorage[localStorageKey];
		if (typeof storeRaw === 'string') {
			try {
				const store = JSON.parse(storeRaw);
				if (store && typeof store === 'object') {
					localStore = store;
				}
			} catch (e) {
				console.error('Failed to read store from local storage', e);
			}
		}
	}
	return localStore;
};

export const writeStore = data => {
	localStore = data;
	let storeRaw;
	try {
		storeRaw = JSON.stringify(data);
	} catch (e) {
		console.error('Failed to stringify JSON data', e);
	}
	if (typeof storeRaw === 'string') {
		try {
			window.localStorage[localStorageKey] = storeRaw;
		} catch (e) {
			console.error('Failed to store data in local storage', e);
		}
	}
};