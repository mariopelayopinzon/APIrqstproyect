// Home.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [year, setYear] = useState('');
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const api_key = '94d0a98f'; // Reemplaza con tu clave de API de IMDb

    const searchMovies = async () => {
        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=yourapikey&s=${searchTerm}`);
            setMovies(response.data.results);
            setTotalPages(response.data.pages.total);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    const handleSearch = () => {
        setCurrentPage(1); // Reset current page to 1 when performing new search
        searchMovies();
    };

    useEffect(() => {
        searchMovies();
    }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="container">
            <div className="header">
                <h1>Explora Películas</h1>
                <div className="search-container">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por título" />
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Año" style={{ width: '80px', marginLeft: '10px' }} />
                    <button onClick={handleSearch}>Buscar</button>
                </div>
            </div>

            <div className="movie-list">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie-card">
                        <Link to={`/movie/${movie.id}`}>
                            <img src={movie.image} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Anterior</button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</button>
            </div>
        </div>
    );
};

export default Home;
