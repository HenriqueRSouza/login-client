import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

import api from '../../services/api';
import {login} from '../../services/auth';

import { Form, Container } from "./styles";

class SignIn extends Component{
  state={
    email: "",
    password: "",
    error: ""
  }

  handleSignIn = async e =>{
    e.preventDefault();
    const {email, password} = this.state;
    if(!email || !password){
      this.setState({error: 'Preencha corretamente os campos a cima'});
    }else{
      try {
        const response = await api.post('/sessions', {email, password});
        login(response.data.token);
        this.props.history.push('/app');
      } catch (error) {
        this.setState({
          error: 'Houve um erro ao verificar suas credenciais'
        });
      }
    }
  }
  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);