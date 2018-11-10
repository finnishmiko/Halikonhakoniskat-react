import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Image from '../images/HaHa-kansalliset2016-naiset.jpg';
import Image from '../images/HaHa-Team-SM-2018.jpg';

const styles = (theme) => ({
	heroUnit: {
		backgroundColor: theme.palette.background.paper,
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${Image})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '100%',
		height: '30vh',
	},
	heroContent: {
		maxWidth: 600,
		margin: '0 auto',
		padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
	},
	whitetext: {
		color: 'white',
		textDecoration: 'none',
		textShadow: '0 0 3px rgba(0, 0, 0, 0.5)',
		fontSize: '8vmin',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		// backgroundColor: '#f00',
		flexGrow: 1,
		padding: theme.spacing.unit * 3,
		// height: '100vh',
		// overflow: 'auto',
	},
	paper: {
		backgroundColor: '#f00',
	},
	paper2: {
		backgroundColor: '#0f0',
	},
	paper3: {
		backgroundColor: '#00f',
	},
	paper4: {
		backgroundColor: '#ff0',
	},
});

class Team extends React.Component {
	// componentDidMount() {
	// }
	render() {
		const {classes} = this.props;
		return (
			<div>
				<Helmet>
					<title>Seura</title>
				</Helmet>
				{/* Hero unit */}
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography variant="display3" align="center" className={classes.whitetext} gutterBottom>
							Seura
						</Typography>
					</div>
				</div>
				{/* End hero unit */}

				<main className={classes.content}>
					<Paper className={classes.mainFeaturedPost}>
						<Grid container justify="center">
							<Grid item md={6}>
								<Typography variant="display2" color="inherit" gutterBottom>
									Halikon Hakoniskat
								</Typography>
								<ul align="left">
									<li>perustettu 1932</li>
									<li>jäseniä n. 800</li>
									<li>yleisseura, jonka jaostoja ovat</li>
									<ul>
										<li>ampumajuoksu- ja ampumahiihtojaosto</li>
										<li>hiihtojaosto</li>
										<li>naisjaosto</li>
										<li>suunnistusjaosto</li>
										<li>yleisurheilujaosto</li>
									</ul>
								</ul>
							</Grid>
						</Grid>
					</Paper>
				</main>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		// valueResults: state.haha.valueResults,
		// etagResults: state.haha.etagResults,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(withStyles(styles)(translate()(Team)));
