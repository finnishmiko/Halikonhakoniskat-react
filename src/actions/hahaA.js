import {ACTION_TYPES as APP_TYPES} from '../reducers/appReducer';
import {ACTION_TYPES as TYPES} from '../reducers/hahaR';

/**
 * Get result documents from Google Drive
 * @param {*} etag 
 */
export const getGoogleDocs = (etag) => (dispatch) => {
	dispatch({type: APP_TYPES.LOADING});
	let headers = {};
	if (etag) {
		headers['if-none-match'] = etag;
	}

	return fetch('https://webuibe.azurewebsites.net/apiv1/googleapi', {headers: headers})
		.then((response) => {
			dispatch({type: APP_TYPES.LOADING_DONE});
			let etag = null;
			if (response.status === 304) {
				return null;
			} else {
				if (response.headers.has('ETag')) {
					etag = response.headers.get('ETag').replace(/"/g, '');
					if (etag.match(/^W\//)) {
						// weak etag, ignore
						etag = null;
					}
				}
				return response.json().then((json) => {
					return {etag, json};
				});
			}
		})
		.then((data) => {
			if (data) {
				const {etag, json} = data;
				// console.log('HaHa Dispatch changes', json, etag);
				if (json) {
					return Promise.resolve(dispatch({type: TYPES.HAHA_RESULTS_DATA, valueResults: json, etagResults: etag}));
				} else {
					throw new Error('no value found!');
				}
			} else {
				return Promise.resolve();
			}
		})
		.catch((error) => {
			dispatch({type: TYPES.HAHA_DATA_CLEAN});
			dispatch({type: APP_TYPES.LOADING_ERROR, error});
		});
};

/**
 * Get Google calendar items
 */
export const getGoogleCalendar = (etag) => (dispatch) => {
	dispatch({type: APP_TYPES.LOADING});
	let headers = {};
	if (etag) {
		headers['if-none-match'] = etag;
	}

	return fetch('http://webuibe.azurewebsites.net/api/v1/googlecalendar', {headers: headers})
		.then((response) => {
			dispatch({type: APP_TYPES.LOADING_DONE});
			let etag = null;
			if (response.status === 304) {
				return null;
			} else {
				if (response.headers.has('ETag')) {
					etag = response.headers.get('ETag').replace(/"/g, '');
					if (etag.match(/^W\//)) {
						// weak etag, ignore
						etag = null;
					}
				}
				return response.json().then((json) => {
					return {etag, json};
				});
			}
		})
		.then((data) => {
			if (data) {
				const {etag, json} = data;
				// console.log('HaHa Dispatch changes', json, etag);
				if (json) {
					return Promise.resolve(dispatch({type: TYPES.HAHA_CALENDAR_DATA, valueCalendar: json, etagCalendar: etag}));
				} else {
					throw new Error('no value found!');
				}
			} else {
				return Promise.resolve();
			}
		})
		.catch((error) => {
			dispatch({type: TYPES.HAHA_DATA_CLEAN});
			dispatch({type: APP_TYPES.LOADING_ERROR, error});
		});
};