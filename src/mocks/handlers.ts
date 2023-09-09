import { RequestHandler } from "next/experimental/testmode/playwright/msw";

import { getPopulationResas } from "./handlers/getPopulationResas";
import { getPrefecturesResas } from "./handlers/getPrefectureResas";

export const handlers: RequestHandler[] = [getPrefecturesResas, getPopulationResas];
