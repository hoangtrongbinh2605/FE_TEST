import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import { RouteComponentProps } from 'react-router-dom';

interface StateUser {
  listUser: any
}

interface PropsUser extends RouteComponentProps<any> {
}

class User extends Component<PropsUser, StateUser>{
  constructor(props: PropsUser) {
    super(props);
    this.state = {
      listUser: []
    }
    this.renderUser = this.renderUser.bind(this);
  }
  componentDidMount() {
    const url = 'https://cyb06ylby6.execute-api.ap-southeast-1.amazonaws.com/v1/users';
    const accessToken = JSON.parse(localStorage.getItem('user') || '{}').token;
    console.log(accessToken)
    const config = {
      headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    }
    axios.get(url, config)
      .then((res) => {
        this.setState({
          listUser: res.data
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }
  renderUser() {
    const listUser = this.state.listUser
    console.log(listUser)
    return listUser.map((value: any) => {
      return (
        <tr key={value.id}>
          <td className="py-1">
            <img src={value.avatar} alt="" />
          </td>
          <td>
            {value.id}
          </td>
          <td>
            {value.name}
          </td>
          <td>
            {value.email}
          </td>
          <td>
            {value.phone}
          </td>
        </tr>
      )

    })
  }
  render() {
    if (localStorage.getItem("user") == null) {
      this.props.history.push("/");
    }
    return (
      <>
        <Header {...this.props} />
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Striped Table</h4>
              <p className="card-description">
                Add class <code>.table-striped</code>
              </p>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>
                        User
                    </th>
                      <th>
                        Id
                    </th>
                      <th>
                        Name
                    </th>
                      <th>
                        Email
                    </th>
                      <th>
                        Phone
                    </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.renderUser()}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default User;
