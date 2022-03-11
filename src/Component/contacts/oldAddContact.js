import React, { Component } from 'react';
import { Consumer } from "../../context";
import TextInputGroup from '../layout/TextInputGroup';
import axios from 'axios';

 class AddContact extends Component {
    state = {
        name :"",
        email :"",
        phone :"",
        errors : {}
    };


    onSubmit= async (dispatch, e)=>{
        e.preventDefault();
     
      const { name, email, phone } = this.state;

// Check For Errors
if (name === '') {
    this.setState({ errors: { name: 'Name is required' } });
    return;
  }

  if (email === '') {
    this.setState({ errors: { email: 'Email is required' } });
    return;
  }

  if (phone === '') {
    this.setState({ errors: { phone: 'Phone is required' } });
    return;
  }
const newContact={
    name,
    email,
    phone
};
   const res = await axios.post('https://jsonplaceholder.typicode.com/users', newContact);
  
  dispatch({type: 'ADD_CONTACT', payload: res.data });
     
  
  this.setState({
          name:"",
          email:"",
          phone:"",
          errors:{}
      });

      this.props.history.push("/")
    };
        
    onChange = (e) => this.setState({ [e.target.name] :e.target.value});
    
    render() {
        const { name, email, phone, errors} = this.state;   
    return(
        <Consumer>
            {(value)=>{
                const{ dispatch }= value;
                return (
                    <div className="card mb-3">
                    <div className="card-header">
                        Add Contact</div>    
                        <div className="card-body">                            
                           <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                           <TextInputGroup
                           label="Name"
                           name="name"
                           placeholder="Enter Name"
                           value={name}
                           onchange={this.onChange}
                           error={errors.name}
                           />
                           <TextInputGroup
                           label="Email"
                           name="Email"
                           placeholder="Enter Email"
                           value={email}
                           onchange={this.onChange}
                           error={errors.email}
                           />
                           <TextInputGroup
                           label="Phone"
                           name="Phone"
                           placeholder="Enter Phone"
                           value={phone}
                           onchange={this.onChange}
                           error={errors.phone}
                           />
                         
                                    <input
                                     type="Submit" 
                                    value="Add Contact"
                                    className="btn btn-primary btn-block mt-3" /> 
                            </form>
                        </div>
                        </div>  
                    );
            }}
        </Consumer>
    );

    }
    }
export default AddContact;