import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';



export default function (ComposedComponent,PageToShowOnFailure,RouteToPage) {
    class Authenticate extends React.Component {

        render() {
            let toBeRendered = null;
            if (!this.props.isAuthenticated) {
                this.context.router.history.push(RouteToPage);
                toBeRendered = <PageToShowOnFailure {...this.props}/>;
            }else{
                toBeRendered = <ComposedComponent {...this.props} />;
            }

            return (
                toBeRendered
            );
        }
    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired
    };

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    };

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps)(Authenticate);
}
