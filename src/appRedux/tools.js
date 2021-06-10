import { put } from 'redux-saga/effects';


export async function callApi(url, method='POST', header={}, body={}){
    let headers = {
        ...header,
        'Content-Type': 'application/json',
    }
    let result = {
        ok: null,
        data: null, 
        code: null,
        message: null
    }
    try{
        const response = await fetch(url, {
            method: method,
            headers: headers,
            body: method !== 'GET' ? JSON.stringify(body) : null
        })
        if (response.status === 204){
            result.data = {'success': true}
        } else {
            result.data = await response.json()
        }
        return {...result, ok: response.ok, code: response.status, message: response.statusText}
    } catch (error){
        throw error
    }
}


export function* processApiRequest(
    url,
    method,
    headers,
    body,
    successCbs,
    errorCbs,
    unAuthorizedCbs
){
    try {
        // console.log('processApiRequest', 'body', body )
        const response = yield callApi(url, method, headers, body)
        if (response.code === 401){
            if (Array.isArray(unAuthorizedCbs)){
                for (let Cbx of unAuthorizedCbs){
                    yield put(Cbx())
                }
            }  else {
                yield put(unAuthorizedCbs())
            }
            // console.log('processApiRequest', 'url', url, 'response', response, 'put unAuthorizedCb')
            return
        }
        if (200 <= response.code && response.code < 300){
            if (Array.isArray(successCbs)){
                for (let Cbx of successCbs){
                    yield put(Cbx(response))
                }
            }  else {
                yield put(successCbs(response))
            }
            // console.log('processApiRequest', 'url', url, 'response', response, 'put successCb')
            return
        }
        if (!response.ok){
            
            if (Array.isArray(errorCbs)){
                for (let Cbx of errorCbs){
                    yield put(Cbx({message: response.message}))
                }
            }  else {
                yield put(errorCbs({message: response.message}))
            }
            // console.log('processApiRequest', 'url', url, 'response', response, 'put errorCb')
            return
        }
    } catch (error) {
        if (Array.isArray(errorCbs)){
            for (let Cbx of errorCbs){
                yield put(Cbx(error))
            }
        }  else {
            yield put(errorCbs({message: error}))
        }
    }
}


export function createAction(actionType, actionPayload){
    return {
        type: actionType,
        payload: actionPayload
    }
}

export function createHeaderJwt(token){
    return {Authorization: "Bearer " + token}
}
