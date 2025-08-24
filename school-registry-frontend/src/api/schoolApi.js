import {getAuthHeaders} from "./authApi.js";

const API_BASE = 'http://localhost:8081';

export async function fetchSchools(params = {}) {
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );
    const query = new URLSearchParams(cleanParams).toString();

    const res = await fetch(`${API_BASE}/schools?${query}`, {
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const err = new Error(errorData.detail || 'Failed to fetch schools');
        err.response = { status: res.status, json: async () => errorData };
        throw err;
    }
    return res.json();
}

export async function createSchool(data) {
    const res = await fetch(`${API_BASE}/schools`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Failed to create school');
    }
    return res.json();
}

export async function deactivateSchool(id) {
    const res = await fetch(`${API_BASE}/schools/${id}/deactivate`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
    });
    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const err = new Error(errorData.detail || 'Server error');
        err.response = { status: res.status, json: async () => errorData };
        throw err;
    }
}
