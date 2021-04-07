// 将请求对象 Map 形式转换为 Object 形式
export function getReqParamsMapToObj(params: any) {
  if (!params) return {};
  const obj = Object.create(null),
    list = params.keys(params);
  for (const k of list) {
    obj[k] = params.get(k);
  }
  return obj;
}

/**
 * 将 url 的查询字符串转换为键值对形式的对象
 *
 * @export
 * @param {string} queryString
 * @returns {{ [key: string]: string }}
 */
export function splitUrlParams(queryString: string): { [key: string]: string } {
  const params = Object.create(null);

  if (!queryString) {
    return params;
  }

  for (const item of queryString.replace(/^.*[\?#]/, "").split("&")) {
    const [key, value] = item.split("=");
    if (key && key.trim()) {
      params[key] = value;
    }
  }

  return params;
}

/**
 * 将普通 url 参数对象根据 key 排序，并转换为 key=value&key=value 形式。
 *
 * @export
 * @param {*} params 普通 url 参数对象。
 * @returns {string} key=value&key=value 形式的字符串。
 */
export function parseParamsObjToString(params: any): string {
  if(!params) return "";
  const sortParamsKeys = Object.keys(params).sort();
  const sortParams = {};
  sortParamsKeys.map((item) => (sortParams[item] = params[item]));
  const keyList = Object.keys(sortParams);
  let result = "";
  keyList.map((item) => (result += `${item}=${sortParams[item]}&`));
  const sortResult = result.replace(/\=\&/g, "&").replace(/(&|=)$/g, "");
  return sortResult;
}
/**
 * 将 Angular 的 url 参数对象根据 key 排序，并转换为 key=value&key=value 形式。
 *
 * @export
 * @param {*} params Angular 的 url 参数对象。
 * @returns {string} key=value&key=value 形式的字符串。
 */
export function parseParamsToString(params: any): string {
  const sortParamsKeys = params.keys().sort();
  const sortParams = {};
  sortParamsKeys.map((item) => (sortParams[item] = params.get(item)));
  const keyList = Object.keys(sortParams);
  let result = "";
  keyList.map((item) => (result += `${item}=${sortParams[item]}&`));
  const sortResult = result.replace(/\=\&/g, "&").replace(/(&|=)$/g, "");
  return sortResult;
}
