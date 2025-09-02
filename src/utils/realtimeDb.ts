import { getDatabase, ref, set, get, push, update, remove, DataSnapshot } from 'firebase/database';
import { db } from './firebase';

// Save data to a specific path
export async function saveData(path: string, data: any): Promise<void> {
	const dbRef = ref(db, path);
	await set(dbRef, data);
}

// Load data from a specific path
export async function loadData<T = any>(path: string): Promise<T | null> {
	const dbRef = ref(db, path);
	const snapshot: DataSnapshot = await get(dbRef);
	return snapshot.exists() ? (snapshot.val() as T) : null;
}

// Push data to a list (returns the new key)
export async function pushData(path: string, data: any): Promise<string> {
	const dbRef = ref(db, path);
	const newRef = await push(dbRef, data);
	return newRef.key as string;
}

// Update data at a specific path
export async function updateData(path: string, data: any): Promise<void> {
	const dbRef = ref(db, path);
	await update(dbRef, data);
}

// Remove data at a specific path
export async function removeData(path: string): Promise<void> {
	const dbRef = ref(db, path);
	await remove(dbRef);
}
