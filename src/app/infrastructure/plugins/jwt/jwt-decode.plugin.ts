import {jwtDecode} from 'jwt-decode';

export const tokenDecoded = (token: string) => {
    try {
        const tokenDecoded = jwtDecode(token);
        return tokenDecoded;
    } catch (error) {
        throw error;
    }
}