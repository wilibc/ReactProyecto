import React, { Component } from "react";

import '../css/Login.css'
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import Cookies from "universal-cookie";//variables para conseervar los datos del usuario (variables de sesion)


const urlLogin="http://localhost:5000/usuarios"

const cookies = new Cookies();


class PageEntrar extends Component{

    state={
        form:{// variables de estado para captura de datos
            username:'',
            password:''
        }
    }

    handleChange=async e=>{// funcion para captura de datos
        await this.setState({
          form:{
            ...this.state.form,//conserva los datos anteriores
            [e.target.name]:e.target.value //añade el nuevo valor a las variables de estado
          }
        })
        console.log(this.state.form)
    }

    iniciarSesion=async()=>{
        let name=this.state.form.username
        let pwd=this.state.form.password
        if(name.length<=0 || pwd.length<=0){
            alert('se requieren todos los datos')
            return "Datos Vacios"
        }

        //await axios.get(urlLogin+"/"+name+"/"+pwd)
        await axios.get(urlLogin+"{'usu_nombres':'"+name+"'}")
        .then(response=>{
            console.log(response.data)
            return response.data
        }).then(response=>{
            if(response.length>0){
                var resp=response[0]
                cookies.set("usu_id",resp._id,{path:"/"})//el path es para que se puedan acceder de cualquier pagina
                cookies.set("usu_email",resp.usu_email,{path:"/"})
                cookies.set("usu_nombres",resp.usu_nombres,{path:"/"})
                cookies.set("usu_apellidos",resp.usu_apellidos,{path:"/"})
                alert("Bienvenido "+resp.usu_nombres)
                window.location.href="./"//permite acceso a todo
            }else{
                alert("Datos incorrestos")
            }
        })
        .catch(error=>{
            console.log(error)
        })
    }


    render(){
        return(
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <div className="form-group">
                        <label>Usuario: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <br />
                        <label>Contraseña: </label>
                        <br />
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={this.handleChange}
                        />
                        <br />
                        <button className="btn btn-primary" onClick={()=> this.iniciarSesion()}>Iniciar Sesión</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageEntrar