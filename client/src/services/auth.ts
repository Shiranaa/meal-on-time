export const TOKEN_KEY = 'token';

export const getToken = function (): string {
    return localStorage.getItem(TOKEN_KEY) || '';
}

export const verifyToken = function (): boolean {
    const token = getToken();
    return token.length > 0;
}