import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();

  const [detailMovies, setDetailMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetailMovies(json.data.movie);
    console.log(detailMovies.genres);
    console.log(detailMovies.title);
    console.log(detailMovies.description_full);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? <h1>Loading...</h1> : null}
      <div style={{ display: 'flex' }} className="main_grid">
        <div className="left">
          <img src={detailMovies.large_cover_image} />
        </div>

        <div className="right">
          <div className="title">
            <h2>{detailMovies.title}</h2>
          </div>
          <div className="items">
            <div>{detailMovies.year}</div>
            <div>{detailMovies.runtime}</div>
            <div>{detailMovies.rating}</div>
            <div>{detailMovies.like_count}</div>
          </div>
          <div className="genres">
            <ul>
              {detailMovies.genres == null || undefined
                ? null
                : detailMovies.genres.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
          <div className="description">
            <p>{detailMovies.description_full}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
