import Cookie from "js-cookie";
const AccessTokenKey = "Admin-Token"; // 属性名，自行修改

export function getAccessToken() {
  return Cookie.get(AccessTokenKey);
}

export function setAccessToken(token) {
  return Cookie.set(AccessTokenKey, token);
}

export function removeAccessToken() {
  return Cookie.remove(AccessTokenKey);
}