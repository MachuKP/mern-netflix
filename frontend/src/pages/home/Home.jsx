import "./home.scss";
import Navbar from "../../components/navbar/Navbar";
import Feature from "../../components/feature/Feature";
import List from "../../components/list/List";
import axios from "axios";
import { useState, useEffect } from "react";

const Home = ({type}) => {
    const [list, setList] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
          try {
            const res = await axios.get(
              `list/find${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,
              {
                headers: {
                  token:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM1MDFjODc5ZGY3MmE3ZjZkYzkzNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNDYzNDk1MiwiZXhwIjoxNjM0NzIxMzUyfQ.5PvZ9VEBSceiBEj8zpcrgfXY3GP-Vvbg2biejm-Riz4",
                },
              }
            );
            setList(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        getRandomLists();
      }, [type, genre]);
    
    return (
        <div className="home">
            <Navbar />
            <Feature type={type} setGenre={genre} />
            {list.map((list, index) => (
              <List list={list} key={index} />
            ))}
        </div>
    )
}

export default Home
