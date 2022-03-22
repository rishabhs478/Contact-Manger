import React, { Component } from "react";
import { Consumer } from "../../context";

import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {},
  };
  
  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
    );


    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === "") {
      this.setState({ errors: { name: "Name is requird" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "email is requird" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is requird" } });
      return;
    }
    const updContact = {
      name,
      email,
      phone,
    };
    const { id } = this.props.match.params;

    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",

      error: {},
    });
    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-Header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <div className="form-group">
                    
                    <TextInputGroup
                      label="Name"
                      name="name"
                      placeholder="Enter Name"
                      error={errors.name}
                      value={name}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="form-group">
                    
                    <TextInputGroup
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Enter Email"
                      value={email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                  </div>
                  <div className="form-group">
                    
                    <TextInputGroup
                      label="Phone"
                      name="phone"
                      placeholder="Enter Phone"
                      value={phone}
                      onChange={this.onChange}
                      error={errors.phone}
                    />
                  </div>

                  <input
                    type="submit"
                    value="Update Contact"
                    className="btn btn-block btn-success  my-3"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
export default EditContact;
