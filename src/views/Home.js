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
	},
});

class Home extends React.Component {
	componentDidMount() {
		this.props.getHome(this.props.etag);
	}

	render() {
		const {classes} = this.props;
		return (
			<div>
				<Helmet>
					<title>Home</title>
				</Helmet>

				{/* Hero unit */}
				<div className={classes.heroUnit}></div>
				{/* End hero unit */}

				<div className="App-intro">
					<Typography variant="display3" align="center" color="textPrimary" gutterBottom>
						Halikon Hakoniskat ry
					</Typography>
					<Grid container spacing={16} justify="center">
						<Grid item xl={5} sm={6} xs={12}>
							<Link to="/kalenteri">
								<Paper className={classes.hahaGrid}>Kalenteri</Paper>
							</Link>
						</Grid>
						<Grid item xl={5} sm={6} xs={12}>
							<Link to="/tulokset">
								<Paper className={classes.hahaGrid}>Tulokset</Paper>
							</Link>
						</Grid>
					</Grid>
					<Grid container spacing={16} justify="center">
						<Grid item xl={5} xs={6}>
							<Paper className={classes.hahaGrid}>HaHan kansallisen aj 2018</Paper>
						</Grid>
						<Grid item xl={5} xs={6}>
							<Paper className={classes.hahaGrid}>Kesän kilpailukalenteri</Paper>
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
		value: state.app.value,
		etag: state.app.etag,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(withStyles(styles)(translate()(Home)));
