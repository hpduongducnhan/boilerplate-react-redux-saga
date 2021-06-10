import { Route, Redirect, matchPath } from 'react-router-dom';



export const getRoutesType = (type, routes) => {
    let result = []
    for (let route of routes){
        if (route.type === type){
            result.push(route)
        }
    }
    return result
}


export const createRouteData = (Component, type, path, key, isExact=true) => {
    if (!Array.isArray(type) || typeof(type) !== 'string'){
        throw 'type must be string or string[]'
    }
    if (typeof(path) !== 'string' || typeof(key) !== 'string' || typeof(isExact) !== 'boolean'){
        throw 'path, key must be string, isExact must be boolean'
    }

    if (!Array.isArray(type)){
        type = [type]
    }
    return {
        component: Component,
        exact: isExact,
        key: key ? key : path,
        path: path,
        type: type
    }
}


export function RestrictedRoute({component: Component, token, ...rest}){
    /**
     * If user is NOT logged in -> do NOT allow 
     */
    return (
        <Route 
            {...rest}
            render={props => 
                token 
                ? <Component {...props}/> 
                : <RedirectToLogin location={props.location}/>}
        />
    )
}