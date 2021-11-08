import {useState, useEffect} from 'react';
import axios from 'axios';
import "./listItem.scss";
import { Add, PlayArrow, ThumbDownAltOutlined, ThumbsUpDownOutlined } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const ListItem = ({index, item}) => {
    const [isHover, setIsHover] = useState(false);
    const [movie, setMovie] = useState({});

    useEffect(() => {
      const getMovie = async () => {
        try {
          const res = await axios.get("/movie/find/" + item, {
            headers: {
              token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM1MDFjODc5ZGY3MmE3ZjZkYzkzNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTQ4MDcxNywiZXhwIjoxNjM1NTY3MTE3fQ.UZY1Fn-znNQ_FUGbIhxzR0PlhaBt6yLW6XAny-219E8",
            },
          });
          setMovie(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      getMovie();
    }, [item]);

    return (
      <Link to={{pathname:"/watch", movie:movie}}>
        <div 
            className="listItem"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{ left: isHover && index * 225 - 50 + index * 2.5 }}
            >
            <img src={movie.img} alt="" />
            {isHover && (
              <>
                    <video src={movie.video} autoPlay loop />
                    <div className="itemInfo">
                        <div className="icons">
                            <PlayArrow className="icon" />
                            <Add className="icon" />
                            <ThumbDownAltOutlined className="icon" />
                            <ThumbsUpDownOutlined className="icon" />
                        </div>
                        <div className="itemInfoTop">
                            <span>{movie.duration}</span>
                            <span className="limit">+{movie.limit}</span>
                            <span>{movie.year}</span>
                        </div>
                        <div className="desc">
                            {movie.desc}
                        </div>
                        <div className="genre">{movie.genre}</div>
                    </div>
                </>
            )}
        </div>
      </Link>
    )
}

export default ListItem;
