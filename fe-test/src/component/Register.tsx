import React, { Component } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';

interface StateRegister {
    username: string,
    email: string,
    country: string,
    password: string,
    formErrors: any
}

interface PropsRegister extends RouteComponentProps<any> {
}


class Register extends Component<PropsRegister, StateRegister>{
    constructor(props: PropsRegister) {
        super(props);

        this.state = {
            username: '',
            email: '',
            country: '',
            password: '',
            formErrors: {}

        }
        this.handleInput = this.handleInput.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
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
        if (nameInput === "email") {
            this.setState({
                email: value
            })
        }
        if (nameInput === "password") {
            this.setState({
                password: value
            })
        }
    }
    handleSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            country: e.target.value
        })
    }
    handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let flag = true
        const errorSubmit = this.state.formErrors
        const username = this.state.username
        const email = this.state.email
        const password = this.state.password
        const country = this.state.country

        if (!username) {
            flag = false
            errorSubmit.name = "Please input username"
        } else {
            delete errorSubmit.name
        }
        if (!email) {
            flag = false
            errorSubmit.email = "Please input email"
        } else {
            delete errorSubmit.email
        }
        if (!password) {
            flag = false
            errorSubmit.password = "Please input password"
        } else {
            delete errorSubmit.password
        }
        if (!country) {
            flag = false
            errorSubmit.country = "Please select country"
        } else {
            delete errorSubmit.country
        }
        if (!flag) {
            this.setState({
                formErrors: errorSubmit
            })
            console.log(errorSubmit)
        } else {
            this.setState({
                formErrors: ''
            })
            this.props.history.push('/')

        }
    }
    renderError() {
        const formErrors = this.state.formErrors
        return (
            <div className='formErrors'>
                {Object.keys(formErrors).map((fieldName, i) => {
                    if (formErrors[fieldName].length > 0) {
                        return (
                            <p key={i}>{fieldName}: {formErrors[fieldName]}</p>
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
                                    <h4>New here?</h4>
                                    <h6 className="font-weight-light">Signing up is easy. It only takes a few steps</h6>
                                    <div className='formErrors'>
                                        {this.renderError()}
                                    </div>
                                    <form className="pt-3" onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <input type="text" className="form-control form-control-lg" id="exampleInputUsername1" placeholder="Username" name="username" onChange={this.handleInput} />
                                        </div>
                                        <div className="form-group">
                                            <input type="email" className="form-control form-control-lg" id="exampleInputEmail1" placeholder="Email" name="email" onChange={this.handleInput} />
                                        </div>
                                        <div className="form-group">
                                            <select className="form-control form-control-lg" id="exampleFormControlSelect2" name="country" onChange={this.handleSelect}>
                                                <option>Country</option>
                                                <option>United States of America</option>
                                                <option>United Kingdom</option>
                                                <option>India</option>
                                                <option>Germany</option>
                                                <option>Argentina</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <input type="password" className="form-control form-control-lg" id="exampleInputPassword1" placeholder="Password" name="password" onChange={this.handleInput} />
                                        </div>
                                        <div className="mb-4">
                                            <div className="form-check">
                                                <label className="form-check-label text-muted">
                                                    <input type="checkbox" className="form-check-input" />
                                                    I agree to all Terms &amp; Conditions
                                                    </label>
                                            </div>
                                        </div>
                                        <div className="mt-3">
                                            <button className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" type="submit">SIGN UP</button>
                                        </div>
                                        <div className="text-center mt-4 font-weight-light">
                                            Already have an account? <Link to="/" className="text-primary">Login</Link>
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

export default Register;
