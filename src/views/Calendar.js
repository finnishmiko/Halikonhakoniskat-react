import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';
import {withStyles} from '@material-ui/core/styles';
import Image from '../images/HaHa-kansalliset2016-naiset.jpg';

const styles = (theme) => ({
	heroUnit: {
		backgroundColor: theme.palette.background.paper,
		backgroundImage: `url(${Image})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '100%',
		height: '30vh',
	},
});

class Calendar extends React.Component {
	componentDidMount() {
		this.props.getGoogleCalendar(this.props.etagCalendar).then(() => {
			// console.log('HaHa did mount: All loaded', this.props.value);
		});
	}
	render() {
		const {classes, valueCalendar} = this.props;
		return (
			<div>
				<Helmet>
					<title>Calendar</title>
				</Helmet>
				{/* Hero unit */}
				<div className={classes.heroUnit} />
				{/* End hero unit */}
				<div className="App-intro">

					<div className="calendar-container">
						<h3>Seuraavat tapahtumat</h3>

						<table className="table table-sm table-dark">
							<tbody>
								{valueCalendar
									? valueCalendar.map((doc, idx) => {
										return (
											<tr key={idx}>
												<td>
													{doc.start}
												</td>
												<td>
													{doc.summary}
												</td>
											</tr>
										);
									})
									: null}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		valueCalendar: state.haha.valueCalendar,
		etagCalendar: state.haha.etagCalendar,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(withStyles(styles)(translate()(Calendar)));
