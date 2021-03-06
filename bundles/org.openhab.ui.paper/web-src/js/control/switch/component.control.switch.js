;
(function() {
    'use strict';

    angular.module('PaperUI.control').component('switchControl', {
        bindings : {
            item : '<'
        },
        templateUrl : 'partials/control/switch/component.control.switch.html',
        controller : SwitchItemController
    });

    SwitchItemController.$inject = [ 'controlItemService', 'eventService' ];

    function SwitchItemController(controlItemService, eventService) {
        var ctrl = this;

        this.updateState = updateState;
        this.getIcon = controlItemService.getIcon;
        this.getLabel = controlItemService.getLabel;
        this.isOptionList = controlItemService.isOptionList;
        this.isCommandOptions = isCommandOptions;

        this.$onInit = activate;

        function activate() {
            ctrl.item = angular.copy(ctrl.item);
            if (ctrl.item.state === 'UNDEF' || ctrl.item.state === 'NULL') {
                ctrl.item.state = '-';
            }

            controlItemService.onStateChange(ctrl.item.name, function(stateObject) {
                ctrl.item.state = stateObject.value;
                controlItemService.updateStateText(ctrl.item);
            });
        }

        function updateState() {
            controlItemService.sendCommand(ctrl.item, ctrl.item.state);
        }

        function isCommandOptions() {
            var commandDescription = ctrl.item.commandDescription;
            return commandDescription && commandDescription.commandOptions && commandDescription.commandOptions.length > 0;
        }

    }

})()
