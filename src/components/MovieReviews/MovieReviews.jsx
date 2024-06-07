import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from './MovieReviews.module.css';

const MovieReviews = ({ onEmpty }) => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYzFlZjYyNjU5NGZlZWI2MTc4Y2JhNjBhOTU1MjkyZSIsInN1YiI6IjY2NWRkNjg2N2Q2YjY0YTgzMzA5MzUxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZwkcO9-B3T64ay5m1Xyd3F6fCzq78GbTIOQ4fbkzHQ',
          },
        });
        setReviews(response.data.results);
        if (response.data.results.length === 0) {
          onEmpty();
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieReviews();
  }, [movieId, onEmpty]);

  return (
    <div className={css.list}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={css.item}>
            <h3 className={css.reviewAuthor}>{review.author}</h3>
            <p className={css.reviewContent}>{review.content}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default MovieReviews;
