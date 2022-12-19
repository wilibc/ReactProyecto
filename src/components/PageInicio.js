import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';

const url = 'http://localhost:5000/usuarios';

class PageInicio extends Component {

  state = {
    data:[],
    modalInsertar: false,
    modalEliminar: false,
    tipoModal:'',
    form:{
      usu_id:'',
      usu_email:'',
      usu_clave:'',
      usu_nombres:'',
      usu_apellidos:''
    }
  } 

  peticionGet = ()=>{
    axios.get(url).then(response => {
      //console.log(response.data)
      this.setState({data: response.data})
    })
    .catch(error =>{// control de errores
      console.log(error.message)
    })
  }

  peticionPost = async() => {
    delete this.state.form.usu_id
    await axios.post(url, this.state.form).then (response =>{
      this.modalInsertar()
      this.peticionGet()
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

  peticionPut = ()=>{
    //console.log(url+'/'+fileid+'/'+this.state.form.usu_id, this.state.form)// imprimepor consola
    //axios.put(url+'/'+fileid+'/'+this.state.form.usu_id, this.state.form).then (response => {
    axios.put(url+'/'+this.state.form.usu_id, this.state.form).then (response => {
      this.modalInsertar()
      this.peticionGet()
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

  peticionDelete = ()=>{
    //axios.delete(url+'/'+fileid+'/'+this.state.form.usu_id).then (response => {
    axios.delete(url+'/'+this.state.form.usu_id).then (response => {
      this.modalEliminar()
      this.peticionGet()// funcion get para actualizar el put
    })
    .catch(error =>{
      console.log(error.message)
    })
  }

  sleccionarUsuario=(usuarios)=>{// funcion para capturar los datos
    this.setState({
      tipoModal: 'actualizar',
      form:{
        usu_id: usuarios._id,
        usu_email: usuarios.usu_email,
        usu_clave: usuarios.usu_clave,
        usu_nombres: usuarios.usu_nombres,
        usu_apellidos: usuarios.usu_apellidos
      }
    })
  }

  modalInsertar=()=>{
    this.setState({modalInsertar:! this.state.modalInsertar})
  }

  modalEliminar=()=>{
    this.setState({modalEliminar:! this.state.modalEliminar})
  }

  handleChange=async e=>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value 
      }
    });
    console.log(this.state.form);// probar por consola lo que se guarda

  }

  componentDidMount(){ // se ejecuta cuando el proyecto arranca
    this.peticionGet();
  }

  render(){

    const form = this.state.form

    return (
      <div className = "App">
        <br />Tabla de usuarios
        <br />
        <br />
        <button className='btn btn-success' onClick={()=> {this.setState({form:null, tipoModal: 'insertar'});this.modalInsertar()}}>Agregar Usuarios</button>
        <br />
        <br />
        <table className='table '>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Clave</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(usuarios =>{
              return(
                <tr>
                  <td>{usuarios._id}</td>
                  <td>{usuarios.usu_email}</td>
                  <td>{usuarios.usu_clave}</td>
                  <td>{usuarios.usu_nombres}</td>
                  <td>{usuarios.usu_apellidos}</td>
                  <td>
                    <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit} onClick={()=>{this.sleccionarUsuario(usuarios); this.modalInsertar()}}/></button>
                    {" "}
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} onClick={()=>{this.sleccionarUsuario(usuarios); this.modalEliminar()}}/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{dsiplay: 'block'}}> Información de usuario
          </ModalHeader>
          <ModalBody>
            <div>
              <label htmlFor='usu_id'>Nuevo ID </label>
              <input 
                //value={this.state.data.length+1}
                className='form-control' 
                type="hidden" 
                name='usu_id' 
                id='usu_id' 
                readOnly //solo sectura 
                onChange={this.handleChange} //llama la funcion handleChange para captura de datos
                value = {form ? form.usu_id : this.state.data.length+1}// valor a mostrar en los textos (valor capturado o vacio)
              ></input><br/>
              <label htmlFor='usu_email'>Email</label>
              <input className='form-control' type="text" name='usu_email' id='usu_email' onChange={this.handleChange} value = {form ? form.usu_email : ''}></input><br/>
              <label htmlFor='usu_clave'>Clave</label>
              <input className='form-control' type="text" name='usu_clave' id='usu_clave' onChange={this.handleChange} value = {form ? form.usu_clave : ''}></input><br/>
              <label htmlFor='usu_nombres'>Nombre</label>
              <input className='form-control' type="text" name='usu_nombres' id='usu_nombres' onChange={this.handleChange} value = {form ? form.usu_nombres : ''}></input><br/>
              <label htmlFor='usu_apellidos'>Apellido</label>
              <input className='form-control' type="text" name='usu_apellidos' id='usu_apellidos' onChange={this.handleChange} value = {form ? form.usu_apellidos : ''}></input><br/>
            </div>
          </ModalBody>
          <ModalFooter>
            {
              this.state.tipoModal==='insertar' ?
              <button className='btn btn-success' onClick={()=> this.peticionPost()}>Insertar</button>
              :<button className='btn btn-success' onClick={()=> this.peticionPut()}>Modificar</button>
            }
            <button className='btn btn-danger' onClick={()=> this.modalInsertar()}>Cancelar</button>

          </ModalFooter>

        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Confirmación de eliminar... ¿desea eliminar?
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-danger' onClick={()=>this.peticionDelete()}>Eliminar</button>
            <button className='btn btn-success' onClick={()=>this.modalEliminar()}>Cancelar</button>

          </ModalFooter>
        </Modal>

      </div>
    )
  };
}

export default PageInicio;