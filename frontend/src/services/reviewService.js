import sendRequest from "./sendRequest";

const BASE_URL = "/api/auth";

export function index() {
  return sendRequest(BASE_URL);
}
