import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
import {Link} from 'react-router-dom';


class Menu extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>
                        <img src="./im_deportes.png" alt="" width="70"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link active" to='/PageInicio'>Inicio</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/PageSesion'>Iniciar Sesión</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/PageUsuarios'>Usuarios</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/PageEventos'>Eventos</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/PageDeportes'>Deportes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='PageEquipos'>Equipos</Link>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled">Menú Marcadores Deportivos</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Menu;