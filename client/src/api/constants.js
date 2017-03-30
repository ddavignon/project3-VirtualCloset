// const BASE_URL = 'https://dustind.net/api/v1/closet';
const BASE_URL = 'https://glacial-everglades-16804.herokuapp.com'; //'http://localhost:5000';

// const HEROKU_BASE_URL = 'https://mighty-chamber-19968.herokuapp.com/virtual/api/v1.0/upload';

export const AUTH_USER = BASE_URL.concat('/auth'); //'https://dustind.net/api/v1/account/register';
export const REGISTER_USER = BASE_URL.concat('/register');
export const REGISTER_USER_CLOSET = BASE_URL.concat('/closet/');

export const GET_CLOTHING_ITEMS = BASE_URL.concat('/items'); // 'http://localhost:8080/virtual/api/v1.0/closet'; //BASE_URL; //'https://mighty-chamber-19968.herokuapp.com/virtual/api/v1.0/closet'; //
export const ADD_CLOTHING_ITEM = BASE_URL.concat('/item/');  // 'https://mighty-chamber-19968.herokuapp.com/virtual/api/v1.0/confirmation'; // BASE_URL.concat('/add'); //
// export const ADD_CLOTHING_ITEM_IMAGE = 'http://localhost:8080/virtual/api/v1.0/closet/add_image';

export const UPLOAD_ITEM_IMAGE = BASE_URL.concat('/virtual/api/v1.0/upload'); //'http://localhost:8080/virtual/api/v1.0/upload';//
