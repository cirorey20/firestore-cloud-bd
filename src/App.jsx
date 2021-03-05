import React, {useState, useEffect} from 'react';
import {store} from './firebaseconf';

function App() {
  const[modoEdicion, setModoEdicion] = useState(null)
  const[idUsuario, setIdUsuario] = useState('')
  const[nombre, setNombre] = useState('')
  const[phone, setPhone] = useState('')
  const[error, setError] = useState('')
  const[usuariosAgenda, setUsuariosAgenda] = useState([])

  useEffect( ()=>{
    const getUsuarios = async()=>{
        const {docs} = await store.collection('agenda').get()
        const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
        setUsuariosAgenda(nuevoArray)
    }
    getUsuarios()
  },[])

  const setUsuarios = async (e) => {
    e.preventDefault()//evita que se recargue la pagina o que viaje ahacia otra pag
    if(!nombre.trim()){
      setError('El campo nombre esta vacio')
    }else if(!phone.trim()){
      setError('El campo telefono esta vacio')
    }
    const usuario = {
      nombre: nombre,
      telefono: phone
    }
    try{
      await store.collection('agenda').add(usuario)
      const data = await store.collection('agenda').add(usuario)
      const {docs} = await store.collection('agenda').get()
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
    }catch(e){
      console.log(e)
    }
    setNombre('')
    setPhone('')
    
  }

  const BorrarUsuario = async (id)=> {
    try{
      await store.collection('agenda').doc(id).delete()
      const {docs} = await store.collection('agenda').get()
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
    }catch(e){
      console.log(e)
    }
  }

  const pulsarActualizar = async (id) => {
    try{
      const data = await store.collection('agenda').doc(id).get()
      const {idUsuario, nombre, telefono} = data.data()
      setNombre(nombre)
      setPhone(telefono)
      setIdUsuario(id)
      setModoEdicion(true)
      console.log(id)
    }catch(e){
      console.log(e)
    }
  }

  const setUpdate = async (e) =>{
    e.preventDefault()
    if(!nombre.trim()){
      setError('El campo nombre esta vacio')
    }else if(!phone.trim()){
      setError('El campo telefono esta vacio')
    }
    const userUpdate = {
      nombre: nombre,
      telefono: phone
    }
    try{
      await store.collection('agenda').doc(idUsuario).set(userUpdate)
      const {docs} = await store.collection('agenda').get()
      const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
      setUsuariosAgenda(nuevoArray)
    }catch(e){
      console.log(e)
    }
      setNombre('')
      setPhone('')
      setIdUsuario('')
      setModoEdicion(false)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de usuarios</h2>
          <form onSubmit={modoEdicion ? setUpdate : setUsuarios} className="form-group">
            <input 
              value={nombre}
              onChange={(e)=> { setNombre(e.target.value) }} Pone el valor que se introduce en el form en el estado
              className="form-control"
              placeholder="introduce el nombre"
              type="text"
            />
            <input 
              value={phone}
              onChange={(e)=> { setPhone(e.target.value) }} Pone el valor que se introduce en el form en el estado
              className="form-control mt-3"
              placeholder="introduce el numero"
              type="text"
            />
            {
              modoEdicion ?
              (
                <input 
                  type="submit"
                  value="Editar"
                  className="btn btn-dark btn-block mt-2"
                />
              )
              :
              (
                <input 
                  type="submit"
                  value="Registrar"
                  className="btn btn-dark btn-block mt-2"
                />
              )
            }
           
          </form>
          {
            error ?
            (
              <div>
                <p>{error}</p>
              </div>
            )
            :
            (
              <span></span>
            )
          }
        </div>
        <div className="col">
          <h2>Lista de agenda</h2>
          <ul className="list-group">
          {
            usuariosAgenda.length !== 0 ?
            (
              usuariosAgenda.map( item => (
                <li className="list-group-item" key={item.id}>{item.nombre} -- {item.telefono}
                <button onClick={(id)=>(BorrarUsuario(item.id))} className="btn btn-danger float-right">Eliminar</button>
                <button onClick={ (id)=>(pulsarActualizar(item.id)) } className="btn btn-warning float-right mr-3">Editar</button>
                </li>
              ))
            )
            :
            (
              <span>
                Lo siento no hay usuarios en tu agenda
              </span>
            )
          }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
