import { Component } from 'react';
import Menu from "./components/Menu"
import {BrowserRouter as Router, Routes,Route} from'react-router-dom'
import PageDeportes from './components/PageDeportes';
import PageEquipos from './components/PageEquipos';
import PageEventos from './components/PageEventos';
import PageInicio from './components/PageInicio';
import PageSesion from './components/PageSesion';
import PageUsuarios from './components/PageUsuarios';
import MenuInicial from './components/MenuInicial';
import PageEntrar from './components/PageEntrar';
import PageSalir from './components/PageSalir';

class App extends Component {

  render(){
    return (
      <>
      <Router>
        <MenuInicial />
        <Routes>
          <Route path="/PageInicio" element={<PageInicio />}/>
          <Route path="/PageEntrar" element ={<PageEntrar />}/>
          <Route path="/PageSalir" element={<PageSalir />}/>
        </Routes>
      </Router>
      </>
    );
  }
}

export default App;
