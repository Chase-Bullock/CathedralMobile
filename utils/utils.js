const baseUrl = 'http://172.31.98.127:5001';

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