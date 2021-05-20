import { all } from 'redux-saga/effects';

export default function* rootSaga(){
    console.log('rootSaga', 'started')
    yield all( [
        // saga watcher here
    ])    
}
