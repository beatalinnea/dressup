import React from 'react'
import './App.css';

import Navigate from './components/navigation';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import ClothesContextProvider, { ClothesContext } from './context/ClothesContext';
import OutfitContextProvider, { OutfitContext } from './context/OutfitContext';
import AuthContextProvider, { AuthContext } from './context/AuthContext';

const App = () => {
  return (
    <ClothesContextProvider>
      <OutfitContextProvider>
        <AuthContextProvider>

          <ClothesContext.Consumer>
            {() => (
              <OutfitContext.Consumer>
                {() => (
                  <AuthContext.Consumer>
                    {() => (

                      <>
                        <div className='container'>
                          <Header text='dressup' />
                          <Navigate />
                          </div>
                          <Footer />
                        
                      </>

                    )}
                  </AuthContext.Consumer>
                )}
              </OutfitContext.Consumer>
            )}
          </ClothesContext.Consumer>

        </AuthContextProvider>
      </OutfitContextProvider>
    </ClothesContextProvider>
  );
};

export default App;
