/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint-disable */

function janrainUtilityFunctions() {
    function getCaptureFormItem(formName, fieldName) {
        return document.getElementById('capture_'+ formName +'_form_item_' + fieldName);
    }
    function getCaptureField(formName, fieldName) {
        return document.getElementById('capture_'+ formName +'_'+ fieldName);
    }
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
    function showEvents() {
        function addEventHandler(e) {
            janrain.events[e].addHandler(function(result) {
               // console.log(e, result);
            });
        }
        if (window.console && window.console.log) {
            for (var janrainEvent in janrain.events) {
                try {
                    var eventName = janrainEvent;

                    if(janrainEvent.hasOwnProperty('eventName')) {
                        eventName = janrainEvent.eventName;
                    }

                    addEventHandler(eventName);
                } catch(err) {
                    // No op.
                    // If we got here, the object it was working with was not an
                    // event and can safely be ignored.
                }
            }
        }
    }
    return {
        getCaptureFormItem: getCaptureFormItem,
        getCaptureField: getCaptureField,
        getParameterByName: getParameterByName,
        showEvents: showEvents
    };
}
