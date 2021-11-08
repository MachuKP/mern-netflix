import { InfoOutlined, PlayArrow } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import "./feature.scss";
import axios from "axios";

const Feature = ({type}) => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        const getRandomContent = async() => {
            try{
                const res = await axios.get(`/movie/random?type=${type}`,
                    {
                        headers: {
                        token:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM1MDFjODc5ZGY3MmE3ZjZkYzkzNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDYzNDk1MiwiZXhwIjoxNjM0NzIxMzUyfQ.5PvZ9VEBSceiBEj8zpcrgfXY3GP-Vvbg2biejm-Riz4",
                        },
                    }
                );
                setContent(res.data[0]);
                console.log(content)
            } catch(err) {
                console.log(err);
            }
        }
        getRandomContent();
    },[type]);

    return (
        <div className="feature">
            {type &&
                <div className="categories">
                    <span>{type === "movie" ? "Movies" : "Series"}</span>
                    <select name="genre" id="genre">
                        <option value="">Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="thriller">Thriller</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            }
            <img src={content.img} alt="" />
            <div className="info">
                <img src={content.imgTitle} alt="" />
                <span className="desc">{content.desc}</span>
                <div className="button">
                    <button className="play">
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className="more">
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Feature
