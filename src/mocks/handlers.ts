import { RequestHandler } from "msw";

import { getPopulation } from "./handlers/getPopulation";
import { getPopulationResas } from "./handlers/getPopulationResas";
import { getPrefecturesResas } from "./handlers/getPrefectureResas";
import { getPrefectures } from "./handlers/getPrefectures";

export const handlers: RequestHandler[] = [getPrefectures, getPopulation, getPrefecturesResas, getPopulationResas];
