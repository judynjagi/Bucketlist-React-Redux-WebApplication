export default function Token(){
  let token = localStorage.getItem('token') || null;
  let config = {};

  if(token) {
    config = {
      headers: { 'Authorization': `${token}` }
    };
    return config;
  } else {
    throw "No token saved!";
  }
}
