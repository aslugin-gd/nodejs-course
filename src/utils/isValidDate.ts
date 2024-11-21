import { DateTime } from "luxon";

export const isValidDate = (date: string | undefined)  => {
  return date ? DateTime.fromFormat(date, 'yyyy-MM-dd').isValid : false;
}
