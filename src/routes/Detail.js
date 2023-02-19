import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Detail.module.css';

function Detail() {
  const { id } = useParams();

  const [detailMovies, setDetailMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setDetailMovies(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.header}>
      {loading ? (
        <span className={styles.loader}>Loading...</span>
      ) : (
        <div
          style={{
            backgroundImage: `url("${detailMovies.background_image}")`,
            height: '80%',
            display: 'flex',
            backgroundSize: '100% 100%',
            justifyContent: 'center',
            alignItems: 'center',
            // padding: '100px',
            padding: '100px',
            marginLeft: '50px',
            marginRight: '50px',
          }}
        >
          <div id="main_header" className={styles.main_header}>
            <div className={styles.container}>
              <div className={styles.movie}>
                <div>
                  <img
                    src={detailMovies.large_cover_image}
                    className={styles.movie__img}
                  />
                </div>
                <div className={styles.right}>
                  <div className={styles.movie__title}>
                    <h2>{detailMovies.title}</h2>
                  </div>
                  <div className={styles.movie__content}>
                    <ul>
                      <li>{`📆 ${detailMovies.year}`}</li>
                      <li>{`🕓 ${detailMovies.runtime}`}</li>
                    </ul>
                    <ul>
                      <li>{`⭐ ${detailMovies.rating}`}</li>
                      <li>{`💖 ${detailMovies.like_count}`}</li>
                    </ul>
                  </div>
                  <br />

                  <div>
                    <ul className={styles.movie__genres}>
                      {detailMovies.genres == null || undefined
                        ? null
                        : detailMovies.genres.map((g) => <li key={g}>{g}</li>)}
                    </ul>
                  </div>
                  <div className={styles.movie__description}>
                    <p>{detailMovies.description_full}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
