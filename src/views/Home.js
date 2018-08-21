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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import logo from '../logo.svg';
import Image from '../images/HaHa-kansalliset2016-naiset.jpg';
import ImageBox from '../images/HaHa-kansallinen2015-Pasi.jpg';

const styles = (theme) => ({
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
	hahaGrid: {
		textAlign: 'center',
		color: theme.palette.text.primary,
		margin: theme.spacing.unit,
		backgroundColor: 'lightblue',
		width: '90%',
		overflowX: 'auto',
	},
	whitetext: {
		color: 'white',
		textDecoration: 'none',
		textShadow: '0 0 3px rgba(0, 0, 0, 0.5)',
		fontSize: '8vmin',
	},
	hahalink: {
		textDecoration: 'none',
	},
	hahascaling: {
		fontSize: '5vmin',
	},
	card: {
		// maxWidth: 345,
	},
	media: {
		height: 140,
	},
	mediaLogo: {
		minWidth: '100px',
		maxHeight: '150px',
		width: 'auto',
		height: 'auto',
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
				<div className={classes.heroUnit}>
					<div className={classes.heroContent}>
						<Typography className={classes.whitetext} variant="display3" align="center" gutterBottom>
							HaHa Biathlon
						</Typography>
					</div>
				</div>
				{/* End hero unit */}

				<Grid container spacing={32} justify="center">
					<Grid item xl={5} sm={6} xs={12}>
						<Link className={classes.hahalink} to="/kalenteri">
							<Paper className={classes.hahaGrid}>
								<Typography className={classes.hahascaling} variant="display1" color="textPrimary" align="center" paragraph>
									Seuraavat tapahtumat:
								</Typography>
								<Table className={classes.table}>
									<TableBody>
										{valueCalendar
											? valueCalendar.slice(0, 3).map((row, idx) => {
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
							</Paper>
						</Link>
					</Grid>
					<Grid item xl={5} sm={6} xs={12}>
						<Link className={classes.hahalink} to="/tulokset">
							<Paper className={classes.hahaGrid}>
								<Typography className={classes.hahascaling} variant="display1" color="textPrimary" align="center" paragraph>
									Viimeisimmät tulokset:
								</Typography>
								<Table className={classes.table}>
									<TableBody>
										{valueResults
											? valueResults.slice(0, 6).map((row, idx) => {
												return (
													<TableRow className={classes.row} key={idx}>
														<TableCell className={classes.eventrow}>{row.name}</TableCell>
													</TableRow>
												);
											})
											: null}
									</TableBody>
								</Table>
							</Paper>
						</Link>
					</Grid>
				</Grid>
				<Grid container spacing={32} justify="center">
					<Grid item xl={5} xs={6}>
						<Link className={classes.hahalink} to="/uutiset">
							<Paper className={classes.hahaGrid}>
								<Typography className={classes.hahascaling} variant="display1" color="textPrimary" align="center" paragraph>
									Uutiset
								</Typography>
								<Card className={classes.card}>
									<CardMedia className={classes.media} image={ImageBox} title="HaHa image" />
									<CardContent>
										<Typography gutterBottom variant="headline" component="h2">
											HaHan kansallisen AJ-kisan kuvia
										</Typography>
										<Typography component="p">
											Kesä 2018.
										</Typography>
									</CardContent>
								</Card>
							</Paper>
						</Link>
					</Grid>
					<Grid item xl={5} xs={6}>
						<Link className={classes.hahalink} to="/seura">
							<Paper className={classes.hahaGrid}>
								<Typography className={classes.hahascaling} variant="display1" color="textPrimary" align="center" paragraph>
									Seura
								</Typography>
								<Card className={classes.card}>
									<img src={logo} className={classes.mediaLogo} alt="HaHa logo" />
									{/* <CardMedia className={classes.mediaLogo} image={logo} title="Halikon Hakoniskat ry logo" /> */}
								</Card>
							</Paper>
						</Link>
					</Grid>
				</Grid>
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
