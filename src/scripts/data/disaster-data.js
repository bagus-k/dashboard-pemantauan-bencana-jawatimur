import DisasterSource from "./disaster-source.js";
import RightBar from "../component/rightbar.js";

class DisasterData {
  static async getAllDisaster() {
    let markers = [];
    const disaster = await DisasterSource.showDisaster();
    let iconUrl;
    let shouldSkip = false;

    disaster.forEach((marker) => {
      let dateTemp = marker.eventdate.split(" ");
      let dayTemp = new Date(dateTemp);
      let today = new Date();
      let threeDays = new Date(today.getTime() - (3 * 24 * 60 * 60 * 1000));
      today.setHours(0,0,0,0);

      if (marker.longitude !== null && marker.latitude !== null) {
        if (shouldSkip) {
          return;
        }
        if(dayTemp >= threeDays || marker.status == "BELUM") {

          iconUrl = 'src/public/image/disaster-icon/'+ marker.typeid +'.svg';
           let popups = `
            <div id="popup-marker" class="popup-marker-container">
              <h4 class="popup-disaster-name">${marker.disastertype.toUpperCase()}</h4>
              <p class="popup-disaster-detail">${marker.eventdate}</p>
              <p class="popup-disaster-detail">${marker.regency_city.split(' ').reverse().join(' ')}</p>
              <button type="submit" class="popup-disaster-detail-button" id="detail-button-${marker.id_logs}" data-id="${marker.id_logs}">Detail Bencana</button>
            </div>
          `;
          markers.push({
              id_logs: marker.id_logs,
              pos: [marker.latitude, marker.longitude],
              popup:popups,
              iconUrl:iconUrl,
              typeid: marker.typeid,
              eventdate: marker.eventdate,
              disastertype: marker.disastertype,
              regency_city: marker.regency_city,
              area: marker.area,
              chronology: marker.chronology,
              dead: marker.dead,
              missing: marker.missing,
              serious_wound: marker.serious_wound,
              minor_injuries: marker.minor_injuries,
              damage: marker.damage,
              losses: marker.losses,
              response: marker.response,
              status: marker.status,
              level: marker.level
          });
        } else {
          shouldSkip = true;
           return;
        }
      }
    });
    return markers;
  }
}

export default DisasterData;
