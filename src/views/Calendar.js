import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';

class Calendar extends React.Component {
	componentDidMount() {
		this.props.getHome(this.props.etag);
	}
	render() {
		return (
			<div>
				<Helmet>
					<title>Calendar</title>
				</Helmet>
				<div className="App-intro">
					Calendar at <code>views/Calendar.js</code>.
					<br />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		value: state.app.value,
		etag: state.app.etag,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(translate()(Calendar));
