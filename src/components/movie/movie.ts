import IMovie from './movie.interface';
import { config } from '../../constans/config';

export function renderSingleMovie({
    poster_path,
    overview,
    release_date,
    isFavorite,
}: IMovie): string {
    return `<div class="col-lg-3 col-md-4 col-12 p-2">
                <div class="card shadow-sm">
                    <img
                        src="${config.image_base_url + poster_path}"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="red"
                        fill="${isFavorite ? 'red' : '#ff000078'}"
                        width="50"
                        height="50"
                        class="bi bi-heart-fill position-absolute p-2"
                        viewBox="0 -2 18 22"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                        />
                    </svg>
                    <div class="card-body">
                        <p class="card-text truncate">
                            ${overview}
                        </p>
                        <div
                            class="d-flex justify-content-between align-items-center"
                        >
                            <small class="text-muted"
                                >${release_date}</small
                            >
                        </div>
                    </div>
                </div>
            </div>`;
}

export default renderSingleMovie;
