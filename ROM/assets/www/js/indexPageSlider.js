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

var start;
var userId;
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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        // fix and dirty ;)
        $('.listening').remove();
        $('h1').remove();
        $('.app').css('background', 'none');
        $('.app').css('padding', '0');
        $('.app').css('margin', '0');
        $('.app').css('top', '0');
        $('.app').css('left', '0');
        $('.app').css('width', '100%');
        start = app.startTimer();
		userId = app.generateUniqueId();
        /**
         * pagingSlider binding
         */
        
        $$('#wrapper-inner').swipeLeft(function(){
            pages = pagingSlider.slidePageFrom(".myPageContainerClass", 'right');
            currentPage = $(".myPageContainerClass").find(".current")[0];
            prevPage =currentPage.getAttribute("prev-left");
            
            var end = app.stopTimer();
            var totalTime = app.calculateTime(start, end);
            start = app.startTimer();
            app.updateDB(userId, prevPage, totalTime);
        });
        
        $$('#wrapper-inner').swipeRight(function(){
            pages = pagingSlider.slidePageFrom(".myPageContainerClass", 'left');
	        currentPage = currentPage = $(".myPageContainerClass").find(".current")[0];
            prevPage = currentPage.getAttribute("prev-right");
            
            var end = app.stopTimer();
            var totalTime = app.calculateTime(start, end);
            start = app.startTimer();
            
            if (currentPage.id != 1.1 && currentPage.id != 2.1){
		        app.updateDB(userId, prevPage, totalTime);
            }
        });
        
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
	
	startTimer: function() {
		var start = new Date().getTime();
		return start;
	},
	
	stopTimer: function() {
		var end = new Date().getTime();
		return end;
	},
	
	calculateTime: function(start, end) {
		var time = Math.round((end - start) / 1000);
		console.log('Total Time Spent on Stop ' + ': ' + time + ' seconds');
		return time;
	},
	
	updateDB: function(userId, page, totalTime) {
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    document.getElementById("myDiv").innerHTML=xmlhttp.responseText;
		    }
		  }
		
 
		var targetUrl = "http://data.floraliao.cloudbees.net/hello/query?userid=" + userId + "&stop=" + page + "&duration=" + totalTime;
		xmlhttp.open("GET", targetUrl, true);
		xmlhttp.send();
	},
	
	getUserId: function(){
    	return userId;
    },
    
    generateUniqueId: function (){
	    var idstr=String.fromCharCode(Math.floor((Math.random()*25)+65));
	    do {                
	        var ascicode=Math.floor((Math.random()*42)+48);
	        if (ascicode<58 || ascicode>90){
	            idstr+=String.fromCharCode(ascicode);    
	        }                
	    } while (idstr.length<6);
	
	    return (idstr.substring(1,idstr.length));
	},
	
    updateDBbySwitchToPage: function(userId, currentPage, redirectUrl, tourNum){
    	//when currentPage hasn't been updated, which means it's at 1.1
    	var prevPage;
    	if (currentPage == null){
    		prevPage = tourNum + .1;
    	} else {
	    	prevPage = currentPage[0].id;
    	}
        var end = app.stopTimer();
        var totalTime = app.calculateTime(start, end);
        start = app.startTimer();
        app.updateDB(userId, prevPage, totalTime);
        
        //The only case when redirectUrl is not null is when the user is leaving the tour
        //We still need to update the database but we need to wait a second or else the request will be dead
        if (redirectUrl != null){
	        setTimeout(function(){
		        window.location = redirectUrl;
	        }, 1000);
        }
    }
};
