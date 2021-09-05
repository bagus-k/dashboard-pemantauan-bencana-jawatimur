
import API_ENDPOINT from "../globals/api-endpoint.js";

class DisasterSource {
  static async showDisaster() {
    // const response = await fetch(API_ENDPOINT.DATA.BASE_URL, API_ENDPOINT.DATA.HEADERS);
    // const response = await fetch('./src/scripts/data/data.json');
    const response = await fetch('./src/scripts/data/filtered-data.php');
    const responseJson = await response.json();
    // return responseJson.data;
    return responseJson;
  }
}

export default DisasterSource;