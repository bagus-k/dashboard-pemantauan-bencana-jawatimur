import DisasterData from "../data/disaster-data.js";
import LeftBar from "../component/leftbar.js";
import RightBar from "../component/rightbar.js";

const main = () => {
  const main = document.querySelector('main');
  const disasterDetail = document.querySelector('#disaster');
  const hamburgerButton = document.querySelector('#hamburger');
  const drawerLeftBar = document.querySelector('#drawer-leftbar');
  const closeButton = document.querySelector('#close-disaster-detail-container');
  const sideBarNav = document.querySelector('#sidebar-nav');
  const layerList = document.querySelector('#layer-list');
  const disasterList = document.querySelector('#disaster-list');
  const listDisaster = document.querySelector('#drawer-leftbar-content');
  const listDisasterLayer = document.querySelector('#list-disaster');
  const map = L.map('map', {zoomControl: false, attributionControl: false
  }).setView([-7.5468636, 111.9801192], 8);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.control.zoom({
    position:'bottomright'
  }).addTo(map);

  map.doubleClickZoom.disable();
  // markerClusterGroup
  //featureGroup
  let tornadoLayer = L.featureGroup();
  map.addLayer(tornadoLayer);
  let floodLayer = L.featureGroup();
  map.addLayer(floodLayer);
  let landslideLayer = L.featureGroup();
  map.addLayer(landslideLayer);
  let earthquakeLayer = L.featureGroup();
  map.addLayer(earthquakeLayer);
  let tsunamiLayer = L.featureGroup();
  map.addLayer(tsunamiLayer);
  let highsurfLayer = L.featureGroup();
  map.addLayer(highsurfLayer);
  let droughtLayer = L.featureGroup();
  map.addLayer(droughtLayer);
  let wildfireLayer = L.featureGroup();
  map.addLayer(wildfireLayer);
  let incidentLayer = L.featureGroup();
  map.addLayer(incidentLayer);
  let volcanoLayer = L.featureGroup();
  map.addLayer(volcanoLayer);
  let highwindLayer = L.featureGroup();
  map.addLayer(highwindLayer);

  async function showMarker() {
    const disaster = await DisasterData.getAllDisaster();
    return disaster;
  }

  showMarker().then((disaster) => {
    disaster.forEach((disasterMarker) => {
      let MarkerCluster = eval(disasterMarker.typeid.toLowerCase() + "Layer" );
      let marker = L.marker(disasterMarker.pos, {
            icon: L.icon({
                iconUrl: disasterMarker.iconUrl,
                iconSize: [25, 25],
                iconAnchor: [15, 1]
            }),
            draggable:true
        }).addTo(MarkerCluster),
        popUp = new L.Popup({ autoClose: false, closeOnClick: false })
                .setContent(disasterMarker.popup)
                .setLatLng(disasterMarker.pos);
        map.addLayer(marker);
        marker.bindPopup(popUp)
        ;
        RightBar.setDetailBar(marker, disasterMarker);
    });
    return disaster;
  })
  .then((item) => {
    LeftBar.showDisasterList(item);
  })
  .then(() => {
    LeftBar.showDisasterCheckbox();
    checkboxDisaster();
  });

  // Memunculkan icon sesuai checkbox
  function checkboxDisaster() {
    let checkBoxDisaster = document.getElementsByClassName("nav-item");
    for (var i = 0; i < checkBoxDisaster.length; ++i) {
      let getId = checkBoxDisaster[i].childNodes[3].control;
      getId.addEventListener('change', function() {
        if (this.checked) {
          map.addLayer(eval(getId.id));
        } else {
          map.removeLayer(eval(getId.id));
        }
      });
    }
  }

  hamburgerButton.addEventListener('click', function (event) {
    sideBarNav.classList.toggle('sidebar-nav-open');
    if(drawerLeftBar.classList.contains('leftbar-open')) {
      drawerLeftBar.classList.toggle('leftbar-open');
    }
    if(listDisasterLayer.classList.contains('list-disaster-open')) {
      listDisasterLayer.classList.toggle('list-disaster-open');
    }
    event.stopPropagation();
  });

  layerList.addEventListener('click', function (event) {
    if(listDisasterLayer.classList.contains('list-disaster-open')){
      listDisasterLayer.classList.toggle('list-disaster-open');
      disasterList.classList.remove('sidebar-nav-item-active')
    }
    drawerLeftBar.classList.toggle('leftbar-open');
    layerList.classList.toggle('sidebar-nav-item-active')
    event.stopPropagation();
  });

  disasterList.addEventListener('click', function (event) {
    if(drawerLeftBar.classList.contains('leftbar-open')){
      drawerLeftBar.classList.toggle('leftbar-open');
      layerList.classList.remove('sidebar-nav-item-active')
    }
    listDisasterLayer.classList.toggle('list-disaster-open');
    disasterList.classList.toggle('sidebar-nav-item-active')
    event.stopPropagation();
  });


  main.addEventListener('click', function (event) {
    drawerLeftBar.classList.remove('leftbar-open');
    event.stopPropagation();
  });


  closeButton.addEventListener('click', function (event) {
  const disasterDetailContainer = document.querySelector('#disaster-detail-container');
    disasterDetailContainer.classList.remove('disaster-open');
    event.stopPropagation();
  });
}



export default main;
/*
  Jenis Bencana :
  typeid /disastertype

  TORNADO / Angin Puting Beliung
  FLOOD / Banjir
  LANDSLIDE / Tanah Longsor
  EARTHQUAKE / Gempa Bumi
  TSUNAMI / Tsunami
  HIGHSURF / Gelombang Tinggi
  DROUGHT / Kekeringan
  WILDFIRE / Kebakaran Hutan
  INCIDENT / Kejadian Lain
  VOLCANO / Letusan Gunung Api
  HIGHWIND / Angin Kencang

*/