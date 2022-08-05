import React from 'react';
import styles from './App.module.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import data from './utils/data';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients ingredients={data}/>
        <BurgerConstructor construct={data}/>
      </main>
    </div>
  );
}

export default App;


// import React from 'react';
// import styles from './App.module.css';
// import AppHeader from './components/app-header/app-header';
// import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
// import BurgerConstructor from './components/burger-constructor/burger-constructor';
// import data from './utils/data';

// function App() {
//   return (
//     <div className="App">
//       <AppHeader />
//       <main className={styles.main}>
//         <BurgerIngredients ingredients={data}/>
//         <BurgerConstructor constructor={data}/>
//       </main>
//     </div>
//   );
// }

// export default App;






// import React from 'react';

// import AppHeader from './components/AppHeader/app-header';
// import BurgerConstructor from './components/BurgerConstructor/burger-constructor';
// import './App.css';

// function App() {
//   return (
//     <>
//     <AppHeader />
//     <BurgerConstructor />
//     </>

// export default App;
