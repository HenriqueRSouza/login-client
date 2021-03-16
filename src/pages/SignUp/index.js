import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Form, Container } from './styled';
import api from '../../services/api';

class SignUp extends Component{
  state = {
    username: "",
    email: "",
    password: "",
    error: "",
  };

handleSignUp = async e => {
  e.preventDefault();
  const {username, email, password} = this.state;  
  
  if(!username || !email || !password){
    this.state({error: 'Preencha os dados !!'});
  }
  else{
    try {
      await api.post('/users', {username,email,password});
      this.props.history.push('/');
    } catch (error) {
      console.log(error)
      this.setState({error: 'Erro aoregistrar a conta !'})
    }
  }
};

render(){
  return(
    <Container>
      <Form onSubmit={this.handleSignUp}>
        {this.state.error && <p>{this.state.error}</p>}
        <input 
          type='text'
          placeholder='Nome de usuário'
          onChange={e => this.setState ({username: e.target.value})}
        />
        <input 
          type='email'
          placeholder='Email'
          onChange={e => this.setState ({email: e.target.value})}
        />
        <input 
          type='password'
          placeholder='Sua senha'
          onChange={e => this.setState ({password: e.target.value})}
        />
        <button type='submit'>Cadatrar</button>
        <hr/>
        <Link to='/'>Fazer Login</Link>
      </Form>
    </Container>
  )
}

}

export default withRouter(SignUp);