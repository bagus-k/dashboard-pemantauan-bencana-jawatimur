import RightBar from "./rightbar.js";

class LeftBar {
  static showDisasterCheckbox() {
    let listDisaster = document.querySelector('#drawer-leftbar-content');
    let disasterName = [
      ["tornado","Puting Beliung"],
      ["flood" , "Banjir"],
      ["landslide" , "Tanah Longsor"],
      ["earthquake" , "Gempa Bumi"],
      ["highsurf" , "Gelombang Tinggi"],
      ["drought" , "Kekeringan"],
      ["wildfire" , "Kebakaran Hutan"],
      ["incident" , "Kejadian Lain"],
      ["highwind" , "Angin Kencang"],
      ["volcano" , "Letusan Gunung Api"]
    ];
    listDisaster.innerHTML = '';
    disasterName.forEach((disaster) => {
      const listDisasterElement = document.createElement('div');
      listDisasterElement.setAttribute('class', 'nav-item');
      listDisasterElement.innerHTML = `
          <img src="./src/public/image/disaster-icon/${disaster[0].toUpperCase()}.svg" alt="${disaster[0]}Layer">
          <label class="nav-item-layer" for="${disaster[0]}Layer">${disaster[1]}</label>
          <label class="switch">
            <input type="checkbox"  id="${disaster[0]}Layer" checked>
            <span class="slider round"></span>
          </label>
      `;
      listDisaster.appendChild(listDisasterElement);
    });
  }

  static showDisasterList(item){
    const listDisasterLayer = document.querySelector('#list-disaster-layer');
    listDisasterLayer.innerHTML = "";

    item.forEach((disaster) => {
      const disasterLayerElement = document.createElement('article');
      disasterLayerElement.setAttribute('class', 'disaster-item');

      disasterLayerElement.onclick = function(){
        let disasterDetailContainer = document.querySelector('#disaster-detail-container');
        if(!disasterDetailContainer.classList.contains('disaster-open')) {
          disasterDetailContainer.classList.toggle('disaster-open');
        }
        return false;
    }

      disasterLayerElement.innerHTML = `
      <div class="disaster-item-img">
        <img src="./src/public/image/disaster-icon/${disaster.typeid}.svg">
      </div>
      <div class="disaster-item-detail">
        <h3>${disaster.disastertype}</h3>
        <p>${disaster.eventdate}</p>
        <p>${disaster.regency_city.split(' ').reverse().join(' ')}</p>
      </div>
      <div class="disaster-detail-status-container">
        <div class="disaster-detail-status" style="background-color:${disaster.status == "BELUM" ? 'red' : 'green'};">
        <p>${disaster.status}</p>
        </div>
      </div>
      `;

      listDisasterLayer.appendChild(disasterLayerElement);
      RightBar.setDetailBar(disasterLayerElement, disaster);
    });
  }
}

export default LeftBar;