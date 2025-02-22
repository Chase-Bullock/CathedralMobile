//const baseUrl = 'http://172.31.98.11:5001';
//const baseUrl = 'http://192.168.0.109:5001';
const baseUrl = 'http://192.168.0.108:5001';



export async function getMenuItems() {
  try{
  let result = await fetch(baseUrl + '/api/menu/active',);
  let resultJson = await result.json();
  //console.log(resultJson);
  return resultJson;
  } catch (error) {
    console.error(error);
  }
};

export async function getBuilders() {
  try{
  let result = await fetch(baseUrl + '/api/builders',);
  let resultJson = await result.json();
  return resultJson;
  } catch (error) {
    console.error(error);
  }
};


export async function getOrderStatus(id) {
  try{
  let result = await fetch(baseUrl + `/api/orders/${id}`,);
  let resultJson = await result.json();
  return resultJson;
  } catch (error) {
    console.error(error);
  }
};

export async function getCities() {
  try{
  let result = await fetch(baseUrl + '/api/locations/cities',);
  let resultJson = await result.json();
  return resultJson;
  } catch (error) {
    console.error(error);
  }
};

export async function getCommunities() {
  try{
  let result = await fetch(baseUrl + '/api/locations/communities',);
  let resultJson = await result.json();
  console.log(resultJson);
  return resultJson;
  } catch (error) {
    console.error(error);
  }
};


export async function getToppingsForMenuItem(type, toppingsType) {
  try{
  let result = await fetch(baseUrl + `/api/menu/${type}/toppings/${toppingsType}`,);
  let resultJson = await result.json();
  //console.log(resultJson);
  return resultJson;
  } catch (error) {
    console.error(error);
  }
};

export async function submitOrder(orderObj) {
  console.log(orderObj);
  try{
  let result = await fetch(baseUrl + `/api/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderObj)});
  let resultJson = await result.json();
  //console.log(resultJson);
  return resultJson;
  } catch (error) {
    console.error(error);
  }
};


export async function submitCode(codeObj) {
  console.log(codeObj);
  try{
  let result = await fetch(baseUrl + `/api/code`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(codeObj)});
  let resultJson = await result.json();
  //console.log(resultJson);
  return resultJson;
  } catch (error) {
    console.error(error);
  }
};

export async function login(userObj) {
  try{
  let result = await fetch(baseUrl + `/api/accounts/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)});
  let resultJson = await result.json();

  return resultJson;
  } catch (error) {
    console.error(error);
  }
};

export async function registerUser(userObj) {
  try{
  let result = await fetch(baseUrl + `/api/accounts/`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)});
  let resultJson = await result.json();

  return resultJson;
  } catch (error) {
    console.error(error);
  }
};


export async function updateUser(userObj) {
  try{
  let result = await fetch(baseUrl + `/api/accounts/users/${userObj.id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)});
  let resultJson = await result.json();

  return resultJson;
  } catch (error) {
    console.error(error);
  }
};