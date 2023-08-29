import axios, { AxiosInstance } from "axios";

// https://opendata.resas-portal.go.jp/docs/api/v1/index.html
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
    type ResponseType = {
      message: string | null;
      result: {
        prefCode: number;
        prefName: string;
      }[];
    };
    return await this.axiosClient.get<ResponseType>("/api/v1/prefectures");
  }

  async getPopulation(params: { prefCode: number; cityCode: string }) {
    type ResponseType = {
      message: string | null;
      result: {
        boundaryYear: number;
        data: {
          label: string;
          data: {
            year: number;
            value: number;
            rate?: number;
          }[];
        }[];
      }[];
    };
    return await this.axiosClient.get<ResponseType>("/api/v1/population/composition/perYear", { params });
  }
}
