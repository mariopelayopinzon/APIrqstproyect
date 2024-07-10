// MovieDetail.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/MovieDetail.css';

const MovieDetail = () => {
    const { id } = useParams();
    const [movieInfo, setMovieInfo] = useState(null);

    const api_key = 'daa03654964a917de586094ef0559501'; // Reemplaza con tu clave de API de IMDb

    useEffect(() => {
        const fetchMovieInfo = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/550?api_key=daa03654964a917de586094ef0559501`);
                setMovieInfo(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieInfo();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!movieInfo) {
        return <div className="container">Cargando...</div>;
    }

    return (
        <div className="container">
            <div className="movie-detail">
                <div className="poster">
                    <img src={movieInfo.image} alt={movieInfo.title} />
                </div>
                <div className="info">
                    <h2>{movieInfo.title}</h2>
                    <p><strong>Año de lanzamiento:</strong> {movieInfo.year}</p>
                    <p><strong>Rating:</strong> {movieInfo.imDbRating}</p>
                    <p><strong>Descripción:</strong> {movieInfo.plot}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
