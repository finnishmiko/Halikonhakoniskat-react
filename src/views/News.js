import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Paper from '@material-ui/core/Paper';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

import Divider from '@material-ui/core/Divider';

import Image from '../images/HaHa-kansalliset2016-naiset.jpg';

const featuredPosts = [
	{
		title: 'Tapahtuma 1',
		date: '1.1.2018',
		description: 'Tapahtuman kuvaus.',
	},
	{
		title: 'Otsikko 2',
		date: '1.10.2018',
		description: 'Tapahtuman kuvaus.',
	},
];

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

	layout: {
		width: 'auto',
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
			width: 1100,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	toolbarMain: {
		borderBottom: `1px solid ${theme.palette.grey[300]}`,
	},
	toolbarTitle: {
		flex: 1,
	},
	toolbarSecondary: {
		justifyContent: 'space-between',
	},
	mainFeaturedPost: {
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing.unit * 4,
	},
	mainFeaturedPostContent: {
		padding: `${theme.spacing.unit * 6}px`,
		[theme.breakpoints.up('md')]: {
			paddingRight: 0,
		},
	},
	mainGrid: {
		marginTop: theme.spacing.unit * 3,
	},
	card: {
		display: 'flex',
	},
	cardDetails: {
		flex: 1,
	},
	cardMedia: {
		width: 160,
	},
	markdown: {
		padding: `${theme.spacing.unit * 3}px 0`,
	},
	sidebarAboutBox: {
		padding: theme.spacing.unit * 2,
		backgroundColor: theme.palette.grey[200],
	},
	sidebarSection: {
		marginTop: theme.spacing.unit * 3,
	},
});

class News extends React.Component {
	render() {
		const {classes} = this.props;
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
				<br />

				<div className={classes.layout}>
					<main>
						{/* Main featured post */}
						<Paper className={classes.mainFeaturedPost}>
							<Grid container>
								<Grid item md={6}>
									<div className={classes.mainFeaturedPostContent}>
										<Typography variant="display2" color="inherit" gutterBottom>
											Pääuutinen
										</Typography>
										<Typography variant="headline" color="inherit" paragraph>
											Pääuutisen kuvausteksti muutaman rivin tekstillä.
										</Typography>
									</div>
								</Grid>
							</Grid>
						</Paper>
						{/* End main featured post */}
						{/* Sub featured posts */}
						<Grid container spacing={40} className={classes.cardGrid}>
							{featuredPosts.map((post) => (
								<Grid item key={post.title} xs={12} md={6}>
									<Card className={classes.card}>
										<div className={classes.cardDetails}>
											<CardContent>
												<Typography variant="headline">{post.title}</Typography>
												<Typography variant="subheading" color="textSecondary">
													{post.date}
												</Typography>
												<Typography variant="subheading" paragraph>
													{post.description}
												</Typography>
												<Typography variant="subheading" color="primary">
													Lue lisää...
												</Typography>
											</CardContent>
										</div>
										<Hidden xsDown>
											<CardMedia
												className={classes.cardMedia}
												image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
												title="Image title"
											/>
										</Hidden>
									</Card>
								</Grid>
							))}
						</Grid>
						{/* End sub featured posts */}
						<Grid container spacing={40} className={classes.mainGrid}>
							{/* Main content */}
							<Grid item xs={12} md={8}>
								<Typography variant="title" gutterBottom>
									Menneitä tapahtumia
								</Typography>
								<Divider />

							</Grid>
							{/* End main content */}
							{/* Sidebar */}
							<Grid item xs={12} md={4}>
								<Paper elevation={0} className={classes.sidebarAboutBox}>
									<Typography variant="title" gutterBottom>
										Tietoja
									</Typography>
									<Typography>
										Halikon Hakoniskojen tapahtumia.
									</Typography>
								</Paper>
							</Grid>
							{/* End sidebar */}
						</Grid>
					</main>
				</div>
				{/* Footer */}
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
