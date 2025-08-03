const API_BASE = 'http://localhost:8081';

export async function fetchSchools(params = {}) {
    const cleanParams = Object.fromEntries(
        Object.entries(params).filter(([, v]) => v !== '' && v !== null && v !== undefined)
    );
    const query = new URLSearchParams(cleanParams).toString();
    const res = await fetch(`${API_BASE}/schools?${query}`);

    if (!res.ok) {
        const errorData = await res.json();
        const err = new Error(errorData.detail || 'Failed to fetch schools');
        err.response = {
            status: res.status,
            json: async () => errorData,
        };
        throw err;
    }
    return res.json();
}

export async function createSchool(data) {
    const res = await fetch(`${API_BASE}/schools`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function deactivateSchool(id) {
    const res = await fetch(`${API_BASE}/schools/${id}/deactivate`, {
        method: 'PATCH',
    });
    if (!res.ok) {
        const errorData = await res.json();

        const err = new Error(errorData.detail || 'Server error');
        err.response = {
            status: res.status,
            json: async () => errorData,
        };
        throw err;
    }
}