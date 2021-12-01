
let config;

if (process.env.NODE_ENV === "production") {
  config = require("./config_default").default.production_url
} else {
  switch (process.env.VUE_APP_PAGE_ID) {
    case '0':
      config = require("./config_default").default.websocket_power
      break
    case '1':
      config = require("./config_default").default.websocket_body
      break
    case '2':
      config = require("./config_default").default.websocket_treadmill
      break
  }
}



module.exports = {
  config: config,
  // api_url: 'http://172.16.8.21:8808',
  api_url: 'http://172.16.7.100:8809',
  teststatus: false
}