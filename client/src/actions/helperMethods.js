import { setAlert } from './alert';
export const sendIfNot200 = async(_res, errorHandler, dispatcher) => {
    let errors = null;
    if(_res.status === 422) errors = (await _res.json()).errors;
    if(!_res.ok || _res.status !== 200) {
        dispatcher(errorHandler({
            status: _res.status,
            message: 'XHR didn\'t respond with status 200'
        }));
        if(errors) errors.forEach(error => dispatcher(setAlert({message: error, time: 3000, classToHave: 'danger' })))
        return true;
    }
    return false;
}

export function parseQueryParam(params) {
	var esc = encodeURIComponent;
	var query = Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
	.join('&')
	return '?'+query;
};


