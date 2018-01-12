import * as types from './actionTypes';
import axios from 'axios';

function CreateBucketlistitemSuccess(item){
  return { type: types.CREATE_BUCKETLISTITMES_SUCCESS, item};
}

function UpdateBucketlistitemSuccess(item){
  return { type: types.UPDATE_BUCKETLISTITMES_SUCCESS, item};
}

function DisplayBucketlistsitemsSuccess(items){
  return {type: types.DISPLAY_BUCKETLISTITEM_SUCCESS, items };
}


let token = localStorage.getItem('token') || null;
let config = {};

if (token) {
  config = {
    headers: { 'Authorization': `${token}` }
  };
}else{
  throw('No token');
}

export function CreateBucketlistItems(id, items){
  return function(dispatch){
    return axios.post('http://127.0.0.1:5000/bucketlists/' + id + '/items/', items, config).then(bucketlist => {
      dispatch(CreateBucketlistitemSuccess(bucketlist.data.bucketlistitems));
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
      }
    });
  };
}

export function DisplayBucketListitems(){
  return function(dispatch){
    return axios.get('http://127.0.0.1:5000/bucketlists/', config).then(bucketlists=>{
      dispatch(DisplayBucketlistsitemsSuccess(bucketlists.data.bucket_lists.items));
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
      }
    });
  };
}

export function UpdateBucketlistItems(id, items, item_id){
  return function(dispatch){
    return axios.put('http://127.0.0.1:5000/bucketlists/' + id + '/items/' + item_id, items, config).then(bucketlist => {
      dispatch(UpdateBucketlistitemSuccess(bucketlist.data.bucket_list));
    }).catch(error =>{
      if (error.response) {
        throw(error.response.data.message);
      }
    });
  };
}
