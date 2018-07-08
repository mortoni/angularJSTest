import * as angular from 'angular';
import './styles.scss'

class MainComponentController {
    constructor(NgMap, $uibModal) {
      this.uibModal = $uibModal;
      NgMap.getMap().then((map) => {
        this.map = map;
      });
      
      this.markers = [
          {
              latitude:-27.4591736,
              longitude:153.0359869,
              name: "RCL"
          },
          {
              latitude: -27.4636424,
              longitude: 153.0433826,
              name: "Powerhouse"
          }
      ];

      this.openDialog = this.openDialog.bind(this);
    }

    selectMarker(marker) {
      this.map.setZoom(14);
      this.map.setCenter(new google.maps.LatLng(marker.latitude, marker.longitude));
    }

    openDialog(event, marker, modal) {
      modal.open({
        animation: true,
        templateUrl: 'modal.html',
        controllerAs: 'ctrl',
        controller: ModalInstanceController,
        resolve: {
          marker: () => {
            return marker;
          }
        }
      });
    }

}

class ModalInstanceController {
  constructor($uibModalInstance, marker) {
    this.marker = marker;
    this.uibModalInstance = $uibModalInstance;
  }

  ok() {
    this.uibModalInstance.close();
  }
}

angular.module('demo')
    .component('mainComponent',
    {
        templateUrl: 'map.html',
        controller: MainComponentController
    })
