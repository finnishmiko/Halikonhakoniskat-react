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
	daterow: {
		fontSize: '90%',
		fontWeight: 'bold',
		border: 'none',
		padding: '0 0 0 1rem',
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
		// width: '100%',
		overflowX: 'auto',
	},
	resultContainer: {
		height: '20rem',
	},
});

const days = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai'];
const months = [
	'tammikuuta',
	'helmikuuta',
	'maaliskuuta',
	'huhtikuuta',
	'toukokuuta',
	'kesäkuuta',
	'heinäkuuta',
	'elokuuta',
	'syyskuuta',
	'lokakuuta',
	'marraskuuta',
	'joulukuuta',
];

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
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography variant="display3" align="center" className={classes.whitetext} gutterBottom>
							Kalenteri
						</Typography>
					</div>
				</div>
				{/* End hero unit */}
				<div className="calendar-container">
					<Paper className={classes.hahaGrid}>
						<Typography className={classes.hahascaling} variant="display1" color="textPrimary" align="center" paragraph>
							Tulevat tapahtumat:
						</Typography>
						<Grid container className={classes.resultContainer} justify="center">
							<Grid item xl={5} sm={6} xs={12}>
								<Table className={classes.table}>
									<TableBody>
										{valueCalendar
											? valueCalendar.map((row, idx) => {
												let weekday = new Date(row.start).getDay();
												let monthname = new Date(row.start).getMonth();
												return [
													<TableRow className={classes.row} key={idx + 'a'}>
														<TableCell className={classes.daterow} colSpan="2">
															{days[weekday] + ', ' + new Date(row.start).getDate() + ' ' + months[monthname]}
														</TableCell>
													</TableRow>,
													<TableRow className={classes.row} key={idx + 'b'}>
														<TableCell className={classes.eventrow}>
															{(new Date(row.start).getHours() < 10 ? '0' + new Date(row.start).getHours() : new Date(row.start).getHours()) +
																':' +
																(new Date(row.start).getMinutes() < 10 ? '0' + new Date(row.start).getMinutes() : new Date(row.start).getMinutes())}
														</TableCell>
														<TableCell className={classes.eventrow}>{row.summary}</TableCell>
													</TableRow>,
												];
											})
											: null}
									</TableBody>
								</Table>
							</Grid>
						</Grid>
					</Paper>
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
