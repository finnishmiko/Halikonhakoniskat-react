import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
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
		fontSize: '8vmin',
	},
	table: {
		border: '3px solid black',
		overflowX: 'auto',
	},
	row: {
		'&:nth-of-type(odd)': {
			// backgroundColor: theme.palette.background.default,
			backgroundColor: '#aaa',
		},
	},
	eventrow: {
		fontSize: '90%',
		border: 'none',
		padding: '0 0 0 1rem',
	},
	hahaGrid: {
		textAlign: 'center',
		color: theme.palette.text.primary,
		margin: theme.spacing.unit,
		// backgroundColor: 'lightblue',
		// width: '90%',
		// height: '20rem',
		overflowX: 'auto',
	},
	hahalink: {
		textDecoration: 'none',
		color: theme.palette.text.primary,
	},
	hahascaling: {
		fontSize: '5vmin',
	},
	resultContainer: {
		height: '20rem',
	},
});

class Results extends React.Component {
	componentDidMount() {
		this.props.getGoogleDocs(this.props.etagResults).then(() => {
			console.log('HaHa did mount: All loaded', this.props.valueResults);
		});
	}
	render() {
		const {classes, valueResults} = this.props;
		return (
			<div>
				<Helmet>
					<title>Tulokset</title>
				</Helmet>
				{/* Hero unit */}
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography variant="display3" align="center" className={classes.whitetext} gutterBottom>
							Tulokset
						</Typography>
					</div>
				</div>
				{/* End hero unit */}

				<Paper className={classes.hahaGrid}>
					<Typography className={classes.hahascaling} variant="display1" color="textPrimary" align="center" paragraph>
						Tulokset:
					</Typography>
					<Grid container justify="center">
						<Grid item className={classes.resultContainer} xl={5} sm={6} xs={12}>
							<Table className={classes.table}>
								<TableBody>
									{valueResults
										? valueResults.map((row, idx) => {
											return (
												<TableRow className={classes.row} key={idx}>
													<TableCell className={classes.eventrow}>
														<a className={classes.hahalink} href={row.link}>
															{row.name}
														</a>
													</TableCell>
												</TableRow>
											);
										})
										: null}
								</TableBody>
							</Table>
						</Grid>
					</Grid>
				</Paper>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		valueResults: state.haha.valueResults,
		etagResults: state.haha.etagResults,
	};
};

export default connect(
	mapStateToProps,
	actions,
)(withStyles(styles)(translate()(Results)));
