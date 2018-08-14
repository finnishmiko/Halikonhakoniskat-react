export const ACTION_TYPES = Object.freeze({
	HAHA_CALENDAR_DATA: 'HAHA_CALENDAR_DATA',
	HAHA_RESULTS_DATA: 'HAHA_RESULTS_DATA',
	HAHA_DATA_CLEAN: 'HAHA_DATA_CLEAN',
});

export default (
	state = {
		valueCalendar: [],
		valueResults: [],
		etagCalendar: null,
		etagResults: null,
	},
	{type, value, etag, valueCalendar, valueResults, etagCalendar, etagResults},
) => {
	switch (type) {
		case ACTION_TYPES.HAHA_CALENDAR_DATA:
			return Object.assign({}, state, {
				valueCalendar: valueCalendar,
				etagCalendar: etagCalendar,
			});
		case ACTION_TYPES.HAHA_RESULTS_DATA:
			return Object.assign({}, state, {
				valueResults: valueResults,
				etagResults: etagResults,
			});
		case ACTION_TYPES.HAHA_DATA_CLEAN:
			return Object.assign({}, state, {
				valueCalendar: [],
				valueResults: [],
				etagCalendar: null,
				etagResults: null,
			});
		default:
			return state;
	}
};
