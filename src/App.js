import "./App.css";
// import du package axios
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import UnderNav from "./components/UnderNav";

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [basket, setBasket] = useState([]);

  // console.log("basket==>", basket[0].title);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3100/"); // à changer quand cela sera sur heroku
        // console.log(response.data);
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
        <div className="underMain">
          <UnderNav data={data}></UnderNav>
        </div>
        <section>
          <div>
            {data.categories.map((element, index) => {
              return (
                <div key={index} className="contain">
                  <h2>{element.name}</h2>
                  <div className="underH2">
                    {element.meals.map((element, index) => {
                      return (
                        <div className="box">
                          <div
                            key={index}
                            onClick={() => {
                              const addBasket = [...basket];
                              addBasket.push(element);
                              setBasket(addBasket);
                            }}
                          >
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
          </div>
          {/* -----------------------------------------basket------------------------- */}
          <div className="basket">
            <button type="text">Valider mon panier</button>

            <div className="order">
              {basket.map((element, index) => {
                console.log(element);
                return (
                  <div className="choice" key={index}>
                    <button
                      onClick={() => {
                        const copy = [...basket];
                        copy.pop();
                        setBasket(copy);

                        // alert("c'est le click moins");
                      }}
                    >
                      -
                    </button>

                    <span>{basket.length}</span>

                    <button
                      onClick={() => {
                        const copy = [...basket];
                        copy.push(element);
                        setBasket(copy);

                        // alert("cest le plus");
                        // element.price = (element.price * copy.length).toFixed(
                        //   2
                        // );
                      }}
                    >
                      +
                    </button>
                    <div className="wrapTitlePrice">
                      <div className="orderDescription">
                        <p>{element.title}</p>
                      </div>
                      <span>{element.price} €</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* pour l'affichage du panier vide à gérer plus tard avec condition... */}
            <div className="emptyBasket">
              <p>Votre panier est vide</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
