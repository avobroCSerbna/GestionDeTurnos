import React, { Component } from 'react';
import {PostData} from '../Services/PostData';
import {Redirect} from 'react-router-dom';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Badge } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
class Login extends Component {

  constructor(props){
    super(props);
    this.state ={
      usuario: '',
      contraseña: '',
      redirect: false
    }
  

  this.login = this.login.bind(this);
  this.onChange = this.onChange.bind(this);
  }
  
  login(){

   if(this.state.usuario && this.state.contraseña){
    PostData('login', this.state).then ((result) =>{
    let responseJSON = result;  
    if (responseJSON.userData) {
      sessionStorage.setItem('userData', responseJSON);
      this.setState({redirect: true});
    }
    else{
      console.log("Login error");
    }
    });

   }
   
   fetch('http://localhost:3000/Usuario/iniciarsesion', {
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          method: "POST",
          body: const parametros = JSON.stringify({usuario: "dato del input",
 contraseña:"dato del input"});
      }).then((response) => response.json())
      }).then((response) => response.json())
      .then((responseJson) => {      
        console.log(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });

      this.setState({
        modal:false      
      }); 
    
  }

  

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
    
  }


  render() {

    if(this.state.redirect){
     return (<Redirect to={'/Home'}/>)
    }

    if(sessionStorage.getItem("userData")){
     return (<Redirect to={'/Home'}/>)
    }



    return (
      <div>
      <Col sm="12" md={{ size: 7, offset: 4 }}>
      <h2><Badge color="secondary">Iniciar Sesión</Badge></h2>
      </Col>
     <Form>
        <FormGroup>
        <Col sm="12" md={{ size: 3, offset: 4 }}>        
    <Label for="Usuario">Usuario</Label>
    <Input type="text" name="usuario" id="Usuario" placeholder="Ingrese su usuario"  onChange={this.onChange}/>
    </Col>
    </FormGroup>
    <FormGroup>
    <Col sm="12" md={{ size: 3, offset: 4 }}>
    <Label for="Contraseña">Contraseña</Label>
    <Input type="password" name="contraseña" id="Contraseña" placeholder="Ingrese su contraseña"  onChange={this.onChange}/>
    </Col>
    </FormGroup>
    <Col sm="12" md={{ size: 1, offset: 5 }}>
    <Input type="submit" value="Iniciar Sesión" className="button" onClick={this.login} />
    </Col>
    </Form>
    </div>
    );
  }
}

export default Login;
