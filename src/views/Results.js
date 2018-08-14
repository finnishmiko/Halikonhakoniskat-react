import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import {translate} from 'react-i18next';
import actions from '../actions';
import {withStyles} from '@material-ui/core/styles';
import Image from '../images/HaHa-kansalliset2016-naiset.jpg';

const styles = (theme) => ({
	heroUnit: {
		backgroundColor: theme.palette.background.paper,
		backgroundImage: `url(${Image})`,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover',
		width: '100%',
		height: '30vh',
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
				<div className={classes.heroUnit}></div>
				{/* End hero unit */}
				<div className="App-intro">
					Results at <code>views/Results.js</code>.
					<br />
					<div className="calendar-container">
						<h3>Tulokset</h3>

						<table className="table table-sm table-dark">
							<thead>
								<tr>
									<th scope="col">Viimeisimmät tulokset</th>
								</tr>
							</thead>
							<tbody>
								{valueResults
									? valueResults.map((doc, idx) => {
										return (
											<tr key={idx}>
												<td>
													<a href={doc.link}>{doc.name}</a>
												</td>
											</tr>
										);
									})
									: null}
							</tbody>
						</table>
					</div>
				</div>
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
