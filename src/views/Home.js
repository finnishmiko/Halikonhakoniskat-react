import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';

import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import Image from '../images/HaHa-kansalliset2016-naiset.jpg';

const styles = (theme) => ({
	appBar: {
		position: 'relative',
	},
	icon: {
		marginRight: theme.spacing.unit * 2,
	},
	heroUnit: {
		backgroundColor: theme.palette.background.paper,
		backgroundImage: `url(${Image})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '100%',
		height: '30vh',
	},
	container: {
		display: 'grid',
		gridTemplateColumns: 'repeat(12, 1fr)',
		gridGap: `${theme.spacing.unit * 3}px`,
	},
	HaHaGridRoot: {
		flexGrow: 1,
	},
	hahaGrid: {
		padding: '10vh 0',
		textAlign: 'center',
		color: theme.palette.text.secondary,
		margin: theme.spacing.unit,
		backgroundColor: 'lightblue',
	},
});

class Home extends React.Component {
	componentDidMount() {
		this.props.getGoogleDocs(this.props.etagResults).then(() => {
			// console.log('Did mount: All loaded', this.props.valueResults);
		});
		this.props.getGoogleCalendar(this.props.etagCalendar).then(() => {
			// console.log('Did mount: All loaded', this.props.valueCalendar);
		});
	}

	render() {
		const {classes, valueResults, valueCalendar} = this.props;
		return (
			<div>
				<Helmet>
					<title>Home</title>
				</Helmet>

				{/* Hero unit */}
				<div className={classes.heroUnit} />
				{/* End hero unit */}

				<div className="App-intro">
					<Typography variant="display3" align="center" color="textPrimary" gutterBottom>
						Halikon Hakoniskat ry
					</Typography>
					<Grid container spacing={16} justify="center">
						<Grid item xl={5} sm={6} xs={12}>
							<Link to="/kalenteri">
								<Paper className={classes.hahaGrid}>
									Kalenteri:
									<br />
									{valueCalendar[0] ? <p>{valueCalendar[0].start}</p> : null}
									{valueCalendar[0] ? <p>{valueCalendar[0].summary}</p> : null}
								</Paper>
							</Link>
						</Grid>
						<Grid item xl={5} sm={6} xs={12}>
							<Link to="/tulokset">
								<Paper className={classes.hahaGrid}>
									Viimeisin tulos:
									<br />
									{valueResults[0] ? <p>{valueResults[0].name}</p> : null}
								</Paper>
							</Link>
						</Grid>
					</Grid>
					<Grid container spacing={16} justify="center">
						<Grid item xl={5} xs={6}>
							<Paper className={classes.hahaGrid}>Uutiset</Paper>
						</Grid>
						<Grid item xl={5} xs={6}>
							<Paper className={classes.hahaGrid}>Seura</Paper>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

Home.propTypes = {
	classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		valueResults: state.haha.valueResults,
		etagResults: state.haha.etagResults,
		valueCalendar: state.haha.valueCalendar,
		etagCalendar: state.haha.etagCalendar,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(withStyles(styles)(translate()(Home)));
