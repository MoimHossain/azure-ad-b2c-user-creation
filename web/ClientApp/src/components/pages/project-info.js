
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';


class ProjectInfo extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {

        };
    }

    componentDidMount() {
        
        
    }
    

    render() {
        let projectId = this.context.router.route.match.params.projectId;
        return (
            <div></div>
        );
    }
}

ProjectInfo.contextTypes = {
    router: PropTypes.object
};
function mapStateToProps(state) {
    return {

    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProjectInfo);