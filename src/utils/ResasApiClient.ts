import axios, { AxiosInstance } from "axios";

export class ResasApiClient {
  axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: "https://opendata.resas-portal.go.jp",
      headers: {
        "X-API-KEY": process.env.RESAS_API_KEY,
      },
    });
  }

  async getPrefectures() {
    type GetPrefectureResponseType = {
      message: string;
      result: {
        prefCode: number;
        prefName: string;
      }[];
    };
    return await this.axiosClient.get<GetPrefectureResponseType>("/api/v1/prefectures");
  }
}
