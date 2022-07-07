import { config } from '../constans/config';

const BASE_URL = config.api_base_url;
const API_KEY = config.api_key;

export async function getMovies(page: number, type: string): Promise<any> {
    let data = [];
    try {
        const response = await fetch(
            `${BASE_URL}movie/${type}?api_key=${API_KEY}&page=${page}`
        );
        const responseData = await response.json();
        data = responseData?.results;
    } catch (error) {
        console.log(error);
    }
    return data;
}
