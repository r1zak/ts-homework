import renderSingleMovie from './components/movie/movie';
import renderRandomMovie from './components/random-movie';
import IMovie from './components/movie/movie.interface';
import { getMovies } from './api/api';
import { config } from './constans/config';
import { getRandomNumber } from './helpers/randomNumber';
import { fetchData } from './api/fetchData';

const API_KEY = config.api_key;
const BASE_URL = config.api_base_url;
const IMAGE_URL = config.image_base_url;
const SEARCH_URL = `${BASE_URL}search/movie?&api_key=${API_KEY}&query=`;

const search = document.getElementById('search') as HTMLInputElement;
const movieWrapper = document.querySelector('#film-container') as HTMLElement;
const loadMoreBtn = document.getElementById('load-more') as HTMLElement;
const buttonWrapper = document.getElementById('button-wrapper') as HTMLElement;

let page = 1;
let inSearchPage = false;

const URL = `${BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`;

export async function render(): Promise<void> {
    const fetchAndShowResults = async (URL: string) => {
        const data = await fetchData(URL);
        data && showResults(data.results);
    };

    buttonWrapper.addEventListener('click', async (e: Event) => {
        const target = e.target as HTMLElement;
        switch (target.id) {
            case 'popular': {
                const movies = await getMovies(page, 'popular');
                renderMovies(movies);
                break;
            }
            case 'upcoming': {
                const movies = await getMovies(page, 'upcoming');
                renderMovies(movies);
                break;
            }
            case 'top_rated': {
                const movies = await getMovies(page, 'top_rated');
                renderMovies(movies);
                break;
            }
            default: {
                const movies = await getMovies(page, 'popular');
                renderMovies(movies);
                break;
            }
        }
    });

    const getSpecificPage = (type: string, page: number) => {
        const URL = `${BASE_URL}movie/${type}?api_key=${API_KEY}&page=${page}`;
        fetchAndShowResults(URL);
    };

    const showResults = (movies: Array<IMovie>) => {
        let content = !inSearchPage ? movieWrapper.innerHTML : '';
        if (movies && movies.length > 0) {
            movies.map((movie: IMovie) => {
                let {
                    original_title,
                    poster_path,
                    release_date,
                    overview,
                    isFavorite,
                }: IMovie = movie;

                if (poster_path) {
                    poster_path = IMAGE_URL + poster_path;
                } else {
                    poster_path =
                        'https://www.gamerevolution.com/assets/uploads/2019/10/Twitter-Something-Went-Wrong-1280x720.jpg';
                }

                if (!overview) {
                    overview = 'No overview yet...';
                }

                if (!release_date) {
                    release_date = 'No release date';
                }

                if (!original_title) {
                    original_title = 'No original title';
                }

                isFavorite = false;

                const movieItem = {
                    original_title,
                    poster_path,
                    release_date,
                    overview,
                    isFavorite,
                };

                content += renderSingleMovie(movieItem);
            });
        } else {
            content += '<p>Something went wrong!</p>';
        }

        movieWrapper.innerHTML = content;
        getRandomMovie(movies);
    };

    const handleLoadMore = () => {
        getSpecificPage('popular', ++page);
    };

    const detectEndAndLoadMore = () => {
        if (!inSearchPage) {
            handleLoadMore();
        }
    };

    fetchAndShowResults(URL);

    search.addEventListener('change', (e: Event) => {
        inSearchPage = true;
        e.preventDefault();
        const searchTerm = search.value;
        searchTerm && fetchAndShowResults(SEARCH_URL + searchTerm);
        search.value = '';
    });

    loadMoreBtn.addEventListener('click', detectEndAndLoadMore);
}

const renderMovies = (movies: Array<IMovie>) => {
    movieWrapper.innerHTML = movies
        ?.map((movie: IMovie) => renderSingleMovie(movie))
        .join('');
};

const getRandomMovie = (movies: Array<IMovie>) => {
    const randomMovie = document.getElementById('random-movie') as HTMLElement;
    randomMovie.innerHTML = '';
    randomMovie.innerHTML += renderRandomMovie(movies[getRandomNumber()]);
};
