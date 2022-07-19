import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import UnderNav from "./components/UnderNav";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/");
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response); // contrairement au error.message d'express
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <div className="App">
      <Header></Header>
      <main>
        <UnderNav data={data}></UnderNav>
        <section>
          {data.categories.map((element, index) => {
            return (
              <div className="contain">
                <h2 key={index}>{element.name}</h2>
                <div className="underH2">
                  {element.meals.map((element, index) => {
                    return (
                      <div className="box">
                        <div>
                          <h3>{element.title}</h3>
                          {element.description && (
                            <div className="description">
                              <p>{element.description}</p>
                            </div>
                          )}
                          <div className="price">
                            <span>{element.price} €</span>
                            {element.popular && (
                              <span className="popular">★ Populaire</span>
                            )}
                          </div>
                        </div>

                        <div className="boxImg">
                          {element.picture && (
                            <img src={element.picture} alt="plat" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;
