// import { format } from "date-fns"; // Not using a bundler, this is causing problems for this import
import { format } from "https://esm.sh/date-fns@4.4.0"; // trying a CDN, pinning this at 4.4.0, uninstalling "date-fns" via npm uninstall date-fns

export function formatExactDate(date) {
  // NOTE - "Never" should only be returned by null results from the db.
  if (!date) {
    return "Never";
  } else {
    return format(new Date(date), "MMM d, yyyy h:mm a");
  }
}
