import request from "@/util/request"

const testApi = {
  cook: "/cook/query.php"
}

export function getCooking(menu) {
  return request({
    url: textApi.cook,
    params: {
      menu,
      pn: true,
      rn: 3,
      key: '2eqweqweqrfqra'
    }
  })
}