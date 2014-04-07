function bookmarkItem(stopId){
    	var targetStopDOM = document.getElementById(stopId);
    	if (targetStopDOM){
    		var bookmarkIcon = targetStopDOM.children[0]; 
    		if (targetStopDOM.getAttribute("bookmarkflag") == "false"){
    			bookmarkIcon.src = "../../images/bookmark.png";
    			targetStopDOM.setAttribute("bookmarkflag", "true");
    			TINY.box.show({html:'Added Bookmark!',animate:false,close:false,mask:false,boxid:'success',autohide:2,top:200,width:140})
    		} else {
    			bookmarkIcon.src = "../../images/bookmark_shaded.png";
    			targetStopDOM.setAttribute("bookmarkflag", "false");
    			TINY.box.show({html:'Removed Bookmark!',animate:false,close:false,mask:false,boxid:'success',autohide:2,top:200,width:150})
    		}
    	}
    	
    }