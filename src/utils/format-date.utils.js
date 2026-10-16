import { format } from "date-fns";

export function formatExactDate(date) {
  // NOTE - "Never" should only be returned by null results from the db.
  if (!date) {
    return "Never";
  } else {
    return format(new Date(date), "MMM d, yyyy h:mm a");
  }
}
