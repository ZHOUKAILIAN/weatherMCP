process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
import Request from "./request.js";
import to from "await-to-js";
import type { forecast24hoursParams, Forecast24hoursResult } from "./type";
export class WeatherClient {
  private appCode: string;
  private request: Request;
  constructor(appCode: string) {
    this.appCode = appCode;
    this.request = new Request(appCode);
  }

  // 获取天气预报
  async getWeather(): Promise<Forecast24hoursResult> {
    const data = {
      cityId: 143,
    };
    // 直接用 request 实例的 post 方法
    const [err, res] = await to(
      this.request.post<forecast24hoursParams, Forecast24hoursResult>(
        "forecast24hours",
        data
      )
    );
    if (err) {
      throw new Error(err.message || "获取天气失败");
    }
    return res;
  }
}
