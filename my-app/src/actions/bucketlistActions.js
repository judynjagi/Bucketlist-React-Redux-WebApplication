import * as types from './actionTypes';
import axios from 'axios';

export function CreateBucketlistSuccess(newBucketlist){
  return { type: types.CREATE_BUCKETLIST_SUCCESS, newBucketlist};
}

export function DisplayBucketlistSuccess(bucketlists){
  return {type: types.DISPLAY_BUCKETLIST_SUCCESS, bucketlists};
}

export function UpdateBucketlistSuccess(bucketlist){
  return {type: types.UPDATE_BUCKETLIST_SUCCESS, bucketlist};
}

export function DeleteBuckelistSuccess(bucketlist){
  return {type: types.DELETE_BUCKETLIST_SUCCESS, bucketlist};
}


let token = localStorage.getItem('token') || null;
let config = {};

if(token) {
  config = {
    headers: { 'Authorization': `${token}` }
  };
} else {
  throw "No token saved!";
}

export function CreateBucketlist(newBucketlist){
  return function (dispatch, getState) {
    return axios.post('http://127.0.0.1:5000/bucketlists/', newBucketlist, config).then(bucketlistDetails =>{
      dispatch(CreateBucketlistSuccess(bucketlistDetails.data));
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
      }
    });
  };
}

export function DisplayBucketList(){
  return function(dispatch){
    return axios.get('http://127.0.0.1:5000/bucketlists/', config).then(bucketlists=>{
      dispatch(DisplayBucketlistSuccess(bucketlists.data.bucket_lists));
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
      }
    });
  };
}

export function UpdateBucketList(id, bucketlist){
  return function(dispatch, getState){
    return axios.put('http://127.0.0.1:5000/bucketlists/'+ id, bucketlist, config).then(bucketlists=>{
      dispatch(UpdateBucketlistSuccess(bucketlists.data.bucket_list));
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
      }
    });
  };
}

export function DeleteBucketList(id){
  return function(dispatch, getState){
    return axios.delete('http://127.0.0.1:5000/bucketlists/' + id, config).then(response =>{
      dispatch(DeleteBuckelistSuccess(response.data.message));
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
      }
    });
  };
}
