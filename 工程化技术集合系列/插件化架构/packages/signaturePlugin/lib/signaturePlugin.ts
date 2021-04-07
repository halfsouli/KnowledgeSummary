/*
 * 插件名称：通用加签插件
 * 插件类型：自研插件
 * 插件文档：
 * 使用示例：需要配合拦截器处理（以 axios 请求拦截器为例），支持以请求拦截器形式使用和插件（后期）。
 */

import {
  splitUrlParams,
  parseParamsObjToString,
} from "@eft-security-library/shared";

import md5 from "md5";

interface SignaturePluginOptions {
  baseUrl?: string;
  data?: any;
  dataType?: string;
  header?: any;
  method?: string;
  responseType?: string;
  url?: string;
}

interface ConfigOptions {
  ak?: string;
  sk?: string;
}

const SIGNATURE_AK = "1378d9d7bf71466e8b120caa0674bde8";
const SIGNATURE_SK = "bade9d78da2b45f68156e506caaed97e";

const SignaturePlugin = {
  signatureV1Interceptor (userId = ''){
    const nonce = Math.random().toString().slice(2, 10);
    const timeStamp = (+new Date()).toString();
    const signValue = [userId, timeStamp, nonce].join('&');
    const md5SignValue = md5(signValue);
    const md5SignValueLen = md5SignValue.length;
    const md5SignArr = md5SignValue.split('');
    const firstPart = md5SignArr.slice(0, 6).reverse();
    const lastPart = md5SignArr.slice(md5SignValueLen - 8, md5SignValueLen).reverse();
    const midPart = lastPart.concat(firstPart).join('');
    const signature = md5(md5(midPart)).toUpperCase();
    return {
        timeStamp,
        nonce,
        signature,
    };
  },

  signatureInterceptor(options: SignaturePluginOptions = {}, config: ConfigOptions = {}) {
    const { url, data, method } = options;
    const { ak = SIGNATURE_AK, sk = SIGNATURE_SK } = config;
    if(!url) return {};
    const timestamp = (+new Date()).toString();
    const nonce = Math.random().toString().slice(2, 10) + (+new Date()).toString();
    const sign_version = "V2";
    const x_ca_key = ak;
    const x_sk = sk;
    const apiUrl = url.includes("http") ? new URL(url) : url;

    const reqMethod = method && method.toUpperCase();
    console.log(0, options)
    const body  = reqMethod == "POST" && data ? data : {};
    const query = reqMethod == "GET" && data ? data : {};

    let signature = "";

    if (typeof apiUrl === "object") {
      console.log(1, query)
      let urlResultStr = parseParamsObjToString(query);
      console.log(2, urlResultStr)
      if (apiUrl.search) {
        const urlReqParams = splitUrlParams(apiUrl.search);
        console.log(3, urlReqParams)
        const urlResult = Object.assign(query, urlReqParams);
        console.log(4, urlResult)
        if (urlResult.url) {
          urlResult.url = decodeURIComponent(urlResult.url);
        }
        urlResultStr = parseParamsObjToString(urlResult);
        console.log(5, urlResultStr)
      }
      signature = apiUrl.pathname.replace(/\/$/g, "");
      console.log(6, signature)
      if (urlResultStr) {
        signature += "\\n" + urlResultStr;
      }
    }

    if (body && JSON.stringify(body) !== "{}") {
      signature = signature + "\\n" + btoa(md5(JSON.stringify(body)));
    }
    console.log(7, signature)
    signature += "\\n" + timestamp + "\\n" + nonce + "\\n" + sign_version + "\\n" + x_ca_key + "\\n" + x_sk;
    console.log(8, signature)
    signature = md5(signature);

    let signatureHeader = {
      timestamp,
      nonce,
      signature,
      sign_version,
      x_ca_key,
    }
    Object.assign(options.header, signatureHeader)
    return options;
  }
};

export const Signature = {
  name: "Signature",
  useValue: SignaturePlugin,
};
