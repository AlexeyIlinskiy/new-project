import React,{useState, useEffect} from 'react';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const api = 'https://norma.nomoreparties.space/api/ingredients';

function App() {
  const [apiData, setApiData] = useState([]);
  
  useEffect(() => {
    fetch(api)
        .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => setApiData(data.data))
        .catch(e => {
          console.log('Error: ' + e.message);
        });
  }, []);

  return (
    <div className="app">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={apiData}/>
        <BurgerConstructor construct={apiData}/>
      </main>
    </div>
  );
}

export default App;