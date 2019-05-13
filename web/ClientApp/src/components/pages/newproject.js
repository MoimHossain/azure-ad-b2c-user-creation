
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Checkbox, Form } from 'semantic-ui-react';
import Backend from '../../services/api';

class NewProject extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            firstName: 'First Name',
            lastName: 'Last Name',
            email: 'email@address.com'
        };
    }

    AddUser() {
        Backend.createUser(this.state).then(response => {
            if (response.data.success === true) {
                alert("User successfully added!");
            } else {
                alert("Something went wrong! Either you do not have permissions or an invalid operation took place.");
            }
        });
    }


    render() {
        return (
            <Form>
                <Form.Field>
                    <label>First Name</label>
                    <input placeholder='First Name' value={this.state.firstName}
                        onChange={(e) => {
                            this.setState(Object.assign({}, this.state, {
                                firstName: e.target.value
                            }));
                            

                        }}/>
                </Form.Field>
                <Form.Field>
                    <label>Last Name</label>
                    <input placeholder='Last Name' value={this.state.lastName}
                        onChange={(e) => {
                            this.setState(Object.assign({}, this.state, {
                                lastName: e.target.value
                            }));


                        }}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={this.state.email}
                        onChange={(e) => {
                            this.setState(Object.assign({}, this.state, {
                                email: e.target.value
                            }));


                        }}/>
                </Form.Field>
                <Button type='submit' onClick={() => {

                    this.AddUser();

                }}>Add</Button>
            </Form>
        );
    }
}


function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(NewProject);