
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Input, Button, Table, Segment } from 'semantic-ui-react';
import Backend from '../../services/api';
import changeRoute from '../../actions/routing/change-route-action';

class Projects extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            searchKey : '',
            projects: []
        };
    }


    componentDidMount() {

        Backend.getProjects('').then(response => {
            this.setState({
                projects: response.data.value
            });
        });
    }

    search(searchKey) {
        Backend.getProjects(searchKey).then(response => {
            this.setState({
                projects: response.data.value
            });
        });
    }

    getName(user) {
        if (user.signInNames && user.signInNames.length > 0) {
            for (var x = 0; x < user.signInNames.length; ++x) {
                if (user.signInNames[x].type === 'emailAddress') {
                    return user.signInNames[x].value;
                }
            }
        }
        if (user.otherMails && user.otherMails.length > 0) {
            for (var x = 0; x < user.otherMails.length; ++x) {
                if (user.otherMails[x]) {
                    return user.otherMails[x];
                }
            }
        }
        return 'Failed to read name';
    }

    renderList() {
        if (!this.state.projects) {
            return;
        };
        return this.state.projects.map((dataItem) => {
            return (
                <Table.Row key={dataItem.objectId}>
                    <Table.Cell>
                        {dataItem.displayName}
                    </Table.Cell>
                    <Table.Cell singleLine>{dataItem.createdDateTime}</Table.Cell>
                    <Table.Cell singleLine>{this.getName(dataItem)}</Table.Cell>
                    <Table.Cell singleLine>{dataItem.objectId}</Table.Cell>
                    
                </Table.Row>
            );
        });
    }

    render() {
        return (
            <React.Fragment>
                <Segment>
                    
                    <Input placeholder='Search...' onChange={(e) => {
                        this.setState(Object.assign({}, this.state, {
                            searchKey: e.target.value
                        }));

                        this.search(e.target.value);

                    }} />

                    <Button style={{
                        marginLeft: 300
                    }} onClick={() => this.props.changeRoute('/users/new', this.context.router.history)} primary>New</Button>
                </Segment>
                <Table celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Created at</Table.HeaderCell>
                            <Table.HeaderCell>SignIn Email</Table.HeaderCell>
                            <Table.HeaderCell>Object ID</Table.HeaderCell>
                            
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {this.renderList()}
                    </Table.Body>
                </Table>
            </React.Fragment>

        );
    }
}



Projects.contextTypes = {
    router: PropTypes.object
};


function mapStateToProps() {
    return {
        empty: {}
    };
}


function matchDispatchToProps(dispatch) {
    return bindActionCreators({ changeRoute: changeRoute }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Projects);