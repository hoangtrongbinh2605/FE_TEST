import React, { Component } from 'react';
import axios from 'axios';
import { Link, RouteComponentProps } from 'react-router-dom';

interface StateLogin {
  username: string,
  password: string,
  formErrors: any
}

interface PropsLogin extends RouteComponentProps<any> {
}

class Login extends Component<PropsLogin, StateLogin>{
  constructor(props: PropsLogin) {
    super(props);
    this.state = {
      username: '',
      password: '',
      formErrors: {}

    }
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const nameInput = e.target.name;
    const value = e.target.value;
    if (nameInput === "username") {
      this.setState({
        username: value
      })
    }
    if (nameInput === "password") {
      this.setState({
        password: value
      })
    }
  }
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let flag = true
    const errorSubmit = this.state.formErrors
    const username = this.state.username
    const password = this.state.password

    if (!username) {
      flag = false
      errorSubmit.username = "Please input username"
    } else {
      delete errorSubmit.username
    }
    if (!password) {
      flag = false
      errorSubmit.password = "Please input password"
    } else {
      delete errorSubmit.password
    }
    if (!flag) {
      this.setState({
        formErrors: errorSubmit
      })
    } else {
      this.setState({
        formErrors: ''
      })
      const member = {
        username: this.state.username,
        password: this.state.password
      };
      axios.post('https://cyb06ylby6.execute-api.ap-southeast-1.amazonaws.com/v1/login', member)
        .then(res => {
            this.setState({
              formErrors: ''
            })
            localStorage.setItem("user", JSON.stringify(res.data))
            this.props.history.push('/user')
          }
        )
        .catch(error => {
          errorSubmit.login = "Incorrect password or username"
          this.setState({ 
              formErrors: errorSubmit
            })
        });
    }
  }
  renderError() {
    const formErrors = this.state.formErrors
    return (
      <div className='formErrors'>
        {Object.keys(formErrors).map((fieldName, i) => {
          if (formErrors[fieldName].length > 0) {
            return (
              <p key={i}>{formErrors[fieldName]}</p>
            )
          } else {
            return '';
          }
        })}
      </div>
    )
  }
  render() {
    return (
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper full-page-wrapper">
          <div className="content-wrapper d-flex align-items-center auth px-0">
            <div className="row w-100 mx-0">
              <div className="col-lg-4 mx-auto">
                <div className="auth-form-light text-left py-5 px-4 px-sm-5">
                  <div className="brand-logo">
                    <img src="../../template/images/logo.svg" alt="logo" />
                  </div>
                  <h4>Hello! let&apos;s get started</h4>
                  <h6 className="font-weight-light">Sign in to continue.</h6>
                  <div className='formErrors'>
                    {this.renderError()}
                  </div>
                  <form className="pt-3" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <input type="text" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Username" name="username" onChange={this.handleInput} />
                    </div>
                    <div className="form-group">
                      <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" name="password" onChange={this.handleInput} />
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN IN</button>
                    </div>
                    <div className="my-2 d-flex justify-content-between align-items-center">
                      <div className="form-check">
                        <label className="form-check-label text-muted">
                          <input type="checkbox" className="form-check-input" />
                          Keep me signed in
                        </label>
                      </div>
                      <a href="/#" className="auth-link text-black">Forgot password?</a>
                    </div>
                    <div className="mb-2">
                      <button type="button" className="btn btn-block btn-facebook auth-form-btn">
                        <i className="ti-facebook mr-2" />Connect using facebook
                      </button>
                    </div>
                    <div className="text-center mt-4 font-weight-light">
                      Don&apos;t have an account? <Link to="/register" className="text-primary">Create</Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
