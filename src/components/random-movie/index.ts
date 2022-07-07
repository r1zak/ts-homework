import IMovie from '../movie/movie.interface';

export function renderRandomMovie({
    original_title,
    overview,
}: IMovie): string {
    return `<div class="row py-lg-5">
                 <div
                     class="col-lg-6 col-md-8 mx-auto"
                     style="background-color: #2525254f"
                 >
                     <h1
                         id="random-movie-name"
                         class="fw-light text-light"
                     >
                         ${original_title}
                     </h1>
                     <p
                         id="random-movie-description"
                         class="lead text-white"
                     >
                         ${overview}
                     </p>
                 </div>
             </div>`;
}

export default renderRandomMovie;
