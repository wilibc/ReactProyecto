import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
import {Link} from 'react-router-dom';
import Cookies from "universal-cookie/cjs/Cookies";
const cookies=new Cookies();


class MenuInicial extends Component {
    state={// variables de estado para mostrar componentes
        estadoLogin: false
    }

    componentDidMount(){
        if(cookies.get("usu_nombres")){
            this.setState({estadoLogin:true})
        }else{
            this.setState({estadoLogin:false})
        }
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to='/'>
                        <img src="./im_deportes.png" alt="" width="70" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item" hidden={this.state.estadoLogin}>
                                <Link className="nav-link active" to='/PageInicio'>Inicio</Link>
                            </li>
                            <li className="nav-item" hidden={this.state.estadoLogin}>
                                <Link className="nav-link" to='/PageEntrar' >Iniciar Sesión</Link>
                            </li>
                            <li className="nav-item" hidden={!this.state.estadoLogin}>
                                <Link className="nav-link" to='/PageSalir'>Salir</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default MenuInicial;