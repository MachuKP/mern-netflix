import { ArrowBackIosOutlined, Movie } from '@material-ui/icons';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import "./watch.scss";

export default function Watch() {
    const location = useLocation();
    const movie = location.movie;

    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackIosOutlined />
                    Home
                </div>
            </Link>
            <video src={movie.video} autoPlay onProgress controls className="video" />
        </div>
    )
}
