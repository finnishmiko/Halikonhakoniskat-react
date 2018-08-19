import React from 'react';
import {Route, Switch, HashRouter as Router, Link} from 'react-router-dom';
import loadable from 'react-loadable';
import {translate} from 'react-i18next';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
// import PrivateRoute from './components/PrivateRoute';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListIcon from '@material-ui/icons/List';
import GroupIcon from '@material-ui/icons/Group';
import CalendarToday from '@material-ui/icons/CalendarToday';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';

import CssBaseline from '@material-ui/core/CssBaseline';

const Loading = () => <div>Loading!...</div>;

// views code split
const Home = loadable({
	loader: () => import('./views/Home' /* webpackChunkName: "home-view" */),
	loading: Loading,
});
const Calendar = loadable({
	loader: () => import('./views/Calendar' /* webpackChunkName: "calendar-view" */),
	loading: Loading,
});
const Results = loadable({
	loader: () => import('./views/Results' /* webpackChunkName: "results-view" */),
	loading: Loading,
});
const News = loadable({
	loader: () => import('./views/News' /* webpackChunkName: "news-view" */),
	loading: Loading,
});
const Team = loadable({
	loader: () => import('./views/Team' /* webpackChunkName: "team-view" */),
	loading: Loading,
});
// const Login = loadable({
// 	loader: () => import('./views/Login' /* webpackChunkName: "login-view" */),
// 	loading: Loading,
// });
// const Secret = loadable({
// 	loader: () => import('./views/Secret' /* webpackChunkName: "secret-view" */),
// 	loading: Loading,
// });

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex',
		width: '100%',
	},
	appBar: {
		position: 'absolute',
		marginLeft: drawerWidth,
		[theme.breakpoints.up('md')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},
	},
	navIconHide: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('md')]: {
			position: 'relative',
		},
		backgroundColor: 'rgba(0,0,0,0.6)',
	},
	content: {
		flexGrow: 1,
		// backgroundColor: theme.palette.background.default,
		// padding: theme.spacing.unit * 3,
	},
	whitetext: {
		color: 'white',
		textDecoration: 'none',
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		marginTop: theme.spacing.unit * 8,
		padding: `${theme.spacing.unit * 6}px 0`,
	},
});

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mobileOpen: false,
		};
		this.onLanguageChange = this.onLanguageChange.bind(this);
		this.checkLogin = this.checkLogin.bind(this);
	}
	onLanguageChange(lng) {
		this.props.i18n.changeLanguage(lng);
	}
	checkLogin() {
		return this.props.username === 'test' && this.props.password === 'password';
	}

	handleDrawerToggle = () => {
		this.setState((state) => ({mobileOpen: !state.mobileOpen}));
	};

	render() {
		// const {isLoggedIn} = this.props;
		const {classes} = this.props;

		const drawer = (
			<div>
				<div className={classes.toolbar} />
				<Divider />
				<List>
					<div>
						<Link to="/" className={classes.whitetext}>
							<ListItem>
								<ListItemIcon>
									<HomeIcon className={classes.whitetext} />
								</ListItemIcon>
								<ListItemText primary="Etusivu" disableTypography />
							</ListItem>
						</Link>
						<Link to="/kalenteri" className={classes.whitetext}>
							<ListItem>
								<ListItemIcon>
									<CalendarToday className={classes.whitetext} />
								</ListItemIcon>
								<ListItemText primary="Kalenteri" disableTypography />
							</ListItem>
						</Link>
						<Link to="/tulokset" className={classes.whitetext}>
							<ListItem>
								<ListItemIcon>
									<ListIcon className={classes.whitetext} />
								</ListItemIcon>
								<ListItemText disableTypography primary="Tulokset" className={classes.whitetext} />
							</ListItem>
						</Link>
						<Link to="/uutiset" className={classes.whitetext}>
							<ListItem>
								<ListItemIcon>
									<InboxIcon className={classes.whitetext} />
								</ListItemIcon>
								<ListItemText primary="Uutiset" disableTypography className={classes.whitetext} />
							</ListItem>
						</Link>
						<Link to="/seura" className={classes.whitetext}>
							<ListItem>
								<ListItemIcon>
									<GroupIcon className={classes.whitetext} />
								</ListItemIcon>
								<ListItemText primary="Seura" disableTypography className={classes.whitetext} />
							</ListItem>
						</Link>
						{/* <Link to="/" className={classes.whitetext}>
							<ListItem>
								<ListItemIcon>
									<PlaceIcon className={classes.whitetext} />
								</ListItemIcon>
								<ListItemText primary="Salakallio Caravan" disableTypography className={classes.whitetext} />
							</ListItem>
						</Link> */}
						{/* <Link to="/login" className={classes.whitetext}>
							<ListItem>
								<ListItemIcon>
									<StarIcon className={classes.whitetext} />
								</ListItemIcon>
								<ListItemText primary="Login" disableTypography className={classes.whitetext} />
							</ListItem>
						</Link>
						<Link to="/secret" className={classes.whitetext}>
							<ListItem>
								<ListItemIcon>
									<SendIcon className={classes.whitetext} />
								</ListItemIcon>
								<ListItemText primary="Secret" disableTypography className={classes.whitetext} />
							</ListItem>
						</Link> */}
					</div>
				</List>
			</div>
		);

		return (
			<div className="App">
				<CssBaseline />
				<Router>
					<div>
						<div className={classes.root}>
							<AppBar className={classes.appBar}>
								<Toolbar>
									<IconButton color="inherit" aria-label="Open drawer" onClick={this.handleDrawerToggle} className={classes.navIconHide}>
										<MenuIcon />
									</IconButton>
									<Typography variant="title" color="inherit" noWrap>
										<Link to="/" className={classes.whitetext}>
											<ListItem>
												<ListItemIcon>
													<img src={logo} className="App-logo" alt="HaHa logo" />
												</ListItemIcon>

												{/* <ListItemText> */}
												<span>Halikon Hakoniskat ry</span>
												{/* </ListItemText> */}
											</ListItem>
										</Link>
									</Typography>
								</Toolbar>
							</AppBar>
							<Hidden mdUp>
								<Drawer
									variant="temporary"
									open={this.state.mobileOpen}
									onClose={this.handleDrawerToggle}
									classes={{
										paper: classes.drawerPaper,
									}}
									ModalProps={{
										keepMounted: true, // Better open performance on mobile.
									}}
								>
									{drawer}
								</Drawer>
							</Hidden>
							<Hidden smDown implementation="css">
								<Drawer
									variant="permanent"
									open
									classes={{
										paper: classes.drawerPaper,
									}}
								>
									{drawer}
								</Drawer>
							</Hidden>
							<main className={classes.content}>
								<div className={classes.toolbar} />
								<Switch>
									<Route exact={true} path="/" component={Home} />
									<Route exact={true} path="/kalenteri" component={Calendar} />
									<Route exact={true} path="/tulokset" component={Results} />
									<Route exact={true} path="/uutiset" component={News} />
									<Route exact={true} path="/seura" component={Team} />
									{/* <Route exact={true} path="/login" component={Login} />
									<PrivateRoute isValid={isLoggedIn} failPath="/login" exact={true} path="/secret" component={Secret} /> */}
								</Switch>
								<br />
								{this.props.isLoading ? 'Fetching API data ..' : ''}
								<br />
								{this.props.error ? <h2 style={{color: 'red'}}>Error: {this.props.error.message}</h2> : null}
								<br />

								<br />
								<pre>Service Worker status: {this.props.workerState}</pre>
								<br />
								{process.env.NODE_ENV !== 'production' ? <pre style={{textAlign: 'left'}}>Errors: {this.props.error && this.props.error.stack}</pre> : null}
							</main>
						</div>
						<footer>
							<Paper className={classes.footer} elevation={1}>
								<Typography variant="headline" component="h3">
									
								</Typography>
								<Grid container>
									<Grid item xs={6}>
										<Typography component="p">Veikko Virta</Typography>
										<Typography component="p">0500 783745</Typography>
										<Typography component="p">veikko.virta(at)luukku.com</Typography>
									</Grid>
									<Grid item xs={6}>
										<Typography component="p">Reino Heikkilä</Typography>
										<Typography component="p">050 5678904</Typography>
										<Typography component="p">reino.heikkila(at)halikko.salonseutu.fi</Typography>
									</Grid>
								</Grid>
								<Typography variant="title">&copy; 2018 Halikon Hakoniskat ry</Typography>
							</Paper>
						</footer>
					</div>
				</Router>
			</div>
		);
	}
}

App.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
	return {
		error: state.app.error,
		isLoading: state.app.isLoading,
		isLoggedIn: state.app.isLoggedIn,
	};
};
export default connect(mapStateToProps)(withStyles(styles, {withTheme: true})(translate()(App)));
