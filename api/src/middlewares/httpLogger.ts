import morgan from "morgan";

import { logger } from "../utils";

export const httpLogger = morgan(":method :url :status :response-time ms - :res[content-length]", {
  stream: {
    write: (message: string) => logger.info(message.substring(0, message.lastIndexOf("\n"))),
  },
});
