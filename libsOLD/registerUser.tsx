export default async function registerUser(json: JSON) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(json) 
    });

    if (!response.ok) {
        throw new Error('Failed to register user');
    }

    return await response.json();
}
