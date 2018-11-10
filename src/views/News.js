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
import ImageBox from '../images/HaHa-kansallinen2015-Pasi.jpg';

let posts = require('../news');

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
		width: '10rem',
	},
	media: {
		height: '100%',
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
										<Typography variant="subheading" color="inherit">
											{posts ? posts[posts.length - 1].date : null}
										</Typography>
										<Typography variant="display2" color="inherit" gutterBottom>
											{posts ? posts[posts.length - 1].title : null}
										</Typography>
										<Typography variant="headline" color="inherit" paragraph>
											{posts ? posts[posts.length - 1].description : null}
										</Typography>
									</div>
								</Grid>
								<Grid item md={6}>
									<CardMedia className={classes.media} image={ImageBox} title="HaHa image" />
								</Grid>
							</Grid>
						</Paper>
						{/* End main featured post */}
						{/* Sub featured posts */}
						<Grid container spacing={40} className={classes.cardGrid}>
							{posts.slice(-3, -1).map((post) => (
								<Grid item key={post.title} xs={12} md={6}>
									<Card className={classes.card}>
										<div className={classes.cardDetails}>
											<CardContent>
												<Typography variant="subheading" color="textSecondary">
													{post.date}
												</Typography>
												<Typography variant="headline">{post.title}</Typography>
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
												image={ImageBox}
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
								<Grid container spacing={40} className={classes.cardGrid}>
									{posts.slice(0, -3).map((post) => (
										<Grid item key={post.title} xs={12}>
											<Typography variant="subheading" color="textSecondary">
												{post.date}
											</Typography>
											<Typography variant="headline">{post.title}</Typography>
											<Typography variant="subheading" paragraph>
												{post.description}
											</Typography>
											<Typography variant="subheading" color="primary">
												Lue lisää...
											</Typography>
										</Grid>
									))}
								</Grid>
							</Grid>
							{/* End main content */}
							{/* Sidebar */}
							<Grid item xs={12} md={4}>
								<Paper elevation={0} className={classes.sidebarAboutBox}>
									<Typography variant="title" gutterBottom>
										Tietoja
									</Typography>
									<Typography>Halikon Hakoniskojen tapahtumia.</Typography>
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
