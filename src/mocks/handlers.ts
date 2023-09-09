import { RequestHandler } from "msw";

import { getPopulationResas } from "./handlers/getPopulationResas";
import { getPrefecturesResas } from "./handlers/getPrefectureResas";

export const handlers: RequestHandler[] = [getPrefecturesResas, getPopulationResas];
