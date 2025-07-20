const API_BASE = 'http://localhost:8081';

export async function fetchSchools(params = {}) {
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== '')
    );
    const query = new URLSearchParams(cleanParams).toString();
    const res = await fetch(`${API_BASE}/schools?${query}`);
    return res.json();
}

export async function createSchool(data) {
    const res = await fetch(`${API_BASE}/schools`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deactivateSchool(id) {
    await fetch(`${API_BASE}/schools/${id}/deactivate`, {
        method: 'PATCH',
    });
}
