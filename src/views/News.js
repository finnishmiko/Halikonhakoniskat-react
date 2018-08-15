import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Image from '../images/HaHa-kansalliset2016-naiset.jpg';

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
	},
});

class News extends React.Component {
	// componentDidMount() {
	// }
	render() {
		const {classes, valueResults} = this.props;
		return (
			<div>
				<Helmet>
					<title>Uutiset</title>
				</Helmet>
				{/* Hero unit */}
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography variant="display3" align="center" className={classes.whitetext} gutterBottom>
							Uutiset
						</Typography>
					</div>
				</div>
				{/* End hero unit */}
				<div className="App-intro">
					Results at <code>views/News.js</code>.<br />
				</div>
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
)(withStyles(styles)(translate()(News)));
