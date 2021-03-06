/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
	
    setupPush: function() {
        console.log('calling push init');
        var push = PushNotification.init({
            "android": {
                //"senderID": "eElVSOVofa8"
				 "senderID": 71408143043
				//eElVSOVofa8
            },
            "browser": {},
            "ios": {
                "sound": true,
                "vibration": true,
                "badge": true
            },
            "windows": {}
        });
        console.log('after init');

        push.on('registration', function(data) {
          //alert('registration event: ' + data.registrationId);
			//localStorage.setItem('registrationId', data.registrationId);
//alert(data.registrationId);
            var oldRegId = localStorage.getItem('registrationId');
			//localStorage.setItem('registrationId', data.registrationId);
			
			
			x = new XMLHttpRequest();
				//alert(device.model+ " " +device.uuid +" "+device.platform)
				var sendData  = "?regid="+data.registrationId;
					sendData += "&appName="+escape(appName);
					sendData += "&appCategory="+escape(appCategory);
					sendData += "&appRegistration="+escape(appRegistration);
					sendData += "&deviceModel="+escape(device.model);
					sendData += "&uuid="+escape(device.uuid);
					sendData += "&devicePlatform="+escape(device.platform);
					
					
				x.open("GET", "http://45graphics.net/curlTest/deliveryserviceapp.php"+sendData, true);
				x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				x.onreadystatechange = function(){
						if(x.readyState == 4 && x.status == 200){
							alert(x.responseText);
						}
				}
		
			x.send();

			
			
			alert(data.registrationId);
             
			var appName = "deliveryApp";
 			var appCategory = "pushNotifications";
			var d = new Date();
			var appRegistration = d.getFullYear()+"-"+ d.getMonth() +"-"+ d.getDate();
 			//var appUserName = prompt("your name", "");
			
				
			//if (oldRegId) {
			if(oldRegId !== data.registrationId) { //working one
                // Save new registration ID
                localStorage.setItem('registrationId', data.registrationId);
               
				// Post registrationId to your app server as the value has changed
				
				x = new XMLHttpRequest();
				//alert(device.model+ " " +device.uuid +" "+device.platform)
				var sendData  = "?regid="+data.registrationId;
					sendData += "&appName="+escape(appName);
					sendData += "&appCategory="+escape(appCategory);
					sendData += "&appRegistration="+escape(appRegistration);
					sendData += "&deviceModel="+escape(device.model);
					sendData += "&uuid="+escape(device.uuid);
					sendData += "&devicePlatform="+escape(device.platform);
					
					
				x.open("GET", "http://45graphics.net/curlTest/deliveryserviceapp.php"+sendData, true);
				x.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				x.onreadystatechange = function(){
						if(x.readyState == 4 && x.status == 200){
							alert(x.responseText);
						}
				}
		
			x.send();
			
				}
/*
            var parentElement = document.getElementById('registration');
            var listeningElement = parentElement.querySelector('.waiting');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
  */
        });

        push.on('error', function(e) {
            console.log("push error = " + e.message);
        });
	

        push.on('notification', function(data) {
            //console.log('notification event');
			//var ul = document.getElementById("targetbaby");
			//var li = document.createElement("li");
				//li.innerHTML =  data.title+" "+data.message;
				//ul.appendChild(li); 
            navigator.notification.alert(
                data.message,          // message
                null,                 // callback
               data.title,           // title
				'Ok'                // buttonName
            );
			
       });
    }
};

