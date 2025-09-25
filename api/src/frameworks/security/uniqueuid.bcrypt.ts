import { v4 as uuidv4 } from "uuid";

export const generateUniqueId = (prefix: string = "user"): string => {
  return `CRAVE-EVENTS-${prefix}-${uuidv4().slice(10)}`;
};
