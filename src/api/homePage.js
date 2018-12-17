import http from '@/plugins/flyio/request'
const { rootUrl } = CONFIG;

export default {
  /**
   * 商铺也查询
   */
  async index (data) {
    const url = `${rootUrl}/admin/index`;
    return await http.get(url, data);
  }
}
