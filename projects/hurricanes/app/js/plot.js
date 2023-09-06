
  

    var streets=L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
           //maxZoom: 18,
           id: 'mapbox.streets',
          continuousWorld: 'true',
          noWrap: 'true'
       });

       var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
           //maxZoom: 18,
           id: 'mapbox.streets-satellite',
          continuousWorld: 'true',
          noWrap: 'true'
       });

       var dark = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
           //maxZoom: ,
           id: 'mapbox.dark',
          continuousWorld: 'true',
          noWrap: 'true'
       });
      
       var outdoors = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
           //maxZoom: 18,
           id: 'mapbox.outdoors',
          continuousWorld: 'true',
          noWrap: 'true'
       });

       var pirates = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
           //maxZoom: 18,
           id: 'mapbox.pirates',
          continuousWorld: 'false',
          noWrap: 'false'
       });
    var windLayer = L.layerGroup([]);
    var heatLayer = L.layerGroup([]);
     
     var map=L.map('map',{layers: [satellite,windLayer],
                center: [30.8833, -97.0167],
               zoom: 6,
              continuousWorld: 'false',
              noWrap: 'false'
                  });
     

 var baseMaps = { "Streets" : streets,
             "Satellite" : satellite,
             "Dark": dark,
             "Outdoors": outdoors,
             "Pirates" : pirates
         };
    var myIcon = L.icon({
    iconUrl: 'images/hurricane.gif',  	//This is a rotating marker that is used during Season Playback
    iconSize: [38, 38],
    iconAnchor: [19, 37],
	});
       

        var myTropicalIcon = L.icon({
    iconUrl: 'images/Tornado-512.png',	// This is a static marker that is used during general playback
    iconSize: [38, 38],
    iconAnchor: [19, 37],
	});	 
        var tomorrow = 0;
      var step=1000;
      var speed=step/4;
      var markerLayer = []; 						// Create Layer for each component related to the hurricane
	  var polyLayer = [];
	  var quadrophonicLayer= [];
      var pointsPlotted = []; 						// This variable keeps track of latlong values added for each hurricane 
	  var var_ret=[];								// Stores the values fetched from php query
	  var limit= [];								// Stores the total lat long values for a particular hurricane
	  var identity= [];
	  var hurricanenames = [];
	  var startdates=[];
	  var enddates=[];
	  var j=0; 
	  var timer=0;  //timer clock tick - ticks at 1 day per second by default
	  var flag=true; // 
	  var resume=false;
	  var playstate=[];
	  var playbySeason=true;
	  var season=true;

	  //create_date();
	  //var tomorrow = new Date(startdates[0]);
	  //****************------------------------------***********************
	  //**********-----------------------------------------------************
	  
	  
	  
	  function get_Identity(hurr_list,hurr_name,sdates,edates,pbs)  //This function accepts list of hurricanes, start date , end date of each hurricane and plotbyseason bool value
	  {
	  	
	  	step=1000;
       speed=step/4;
       markerLayer = []; 						// Create Layer for each component related to the hurricane
	   polyLayer = [];
	   quadrophonicLayer= [];
       pointsPlotted = []; 						// This iable keeps track of latlong values added for each hurricane 
	   var_ret=[];								// Stores the values fetched from php query
	   limit= [];								// Stores the total lat long values for a particular hurricane
	   identity= [];
	   startdates=[];
	   enddates=[];
	   j=0; 
	   timer=0;  //timer clock tick - ticks at 1 day per second by default
	   flag=true; // 
	   resume=false;
	   playstate=[];
	   playbySeason=true;
	   season=true;
	  		
	  windLayer.eachLayer(function(layer)
	  {
	      map.removeLayer(layer);
	  });

	  pressureLayer.eachLayer(function(layer)
	  {
	      map.removeLayer(layer);
	  });

	  circleLayer.eachLayer(function(layer)
	  {
	      map.removeLayer(layer);
	  });
  
	  typeLayer.eachLayer(function(layer)
	  {
	      map.removeLayer(layer);
	  });
 			pointsPlotted=[];
 			limit=[];
	  		j=0;
	  		
	  		identity=hurr_list;
	  		hurricanenames=hurr_name;
	  		startdates=sdates;
	  		enddates=edates;
	  		playbySeason=pbs;
			create_date();
			
	  		if(playbySeason)
	  		{
	  			tomorrow = new Date(startdates[0]);
	  			start_Timer();
	  		}
	  		else
	  			plot_all_hurricanes();

	  }

	 
	 function create_date()
	 {
	 	for(s=0; s<startdates.length;s++)
	 	{
	 		startdates[s]=new Date(startdates[s].toString().substring(0, 4)+"/"+startdates[s].toString().substring(4,6)+"/"+startdates[s].toString().substring(6,8));
	 		enddates[s]= new Date(enddates[s].toString().substring(0, 4)+"/"+enddates[s].toString().substring(4,6)+"/"+enddates[s].toString().substring(6,8));
	 	}
	 	
	 }
	 function start_Timer() //Timer Function that plays hurricanes based on date
	{
		
		document.getElementById("progressBar").setAttribute("max",(Math.floor((enddates[enddates.length-1] - startdates[0]) /(60*60*24*1000)))) ;
		 document.getElementById("progressBar").setAttribute("value",(Math.floor((tomorrow - startdates[0]	) /(60*60*24*1000)))) ;

		if(j<identity.length && +startdates[j]===+tomorrow)
		{
			
				map.removeLayer(map._layers);
			
			
			get_Data(identity[j],j);

			j++;
		}
		tomorrow.setDate(tomorrow.getDate() + 1)
		
		document.getElementById("details").innerHTML=tomorrow +"<br>"+"Next Hurricane is "+hurricanenames[j]+"("+identity[j]+")"+"<br>"+"and will start forming on :"+startdates[j];	
		
		
		//alert(pointsPlotted+" "+pointsPlotted[j-1]);

		 if ( tomorrow < enddates[enddates.length-1] && season==true ) window.setTimeout(function(){start_Timer();},step);
		 /*if(timer == identity.length)
		 {
		 	
		 	timer=0;
		 	j=0;
		 }*/
}

	 
function resume_plotting()  // Reload State variables once resumed
{

	//markerLayer.clearLayers();
	flag=true;
	if(playbySeason)markerLayer[j-1].clearLayers();
	else markerLayer[j].clearLayers();
	var resume_state = localStorage.getItem("current_state");
	pointsPlotted = JSON.parse(resume_state);
	if(playbySeason==true)
	{
		season=true;
		for(x=0;x<j;x++)
		{
			if(pointsPlotted[x]<limit[x])
				get_Data(identity[x],x);

		}
		
		start_Timer();
	}
	else
		plot_all_hurricanes();
	
	
}

function pause_plotting() //Pause Plotting when pause is pressed
{	
	
	season=false;
	flag=false;
	for(k=0;k<pointsPlotted.length;k++)
	var hurricane_state = pointsPlotted;
	localStorage.setItem("current_state", JSON.stringify(hurricane_state));
	var resume_state = localStorage.getItem("current_state");
	//console.log(resume_state);

}


 function plot_all_hurricanes() //Plot hurricanes that do not have a particular chronological order
{
	
	
	flag=false;
	playbySeason=false;

	document.getElementById("progressBar").setAttribute("max",(identity.length-1)) ;
		 document.getElementById("progressBar").setAttribute("value",(j) );
	
			document.getElementById("details").innerHTML="<br>"+"Current Hurricane is "+ hurricanenames[j]+" ("+identity[j]+")"+"<br>"+"and started forming on :"+startdates[j];
				
			
			get_Data(identity[j],j);
			
	
	
} 

function increase_speed() //Speed Controller function
{
	if(playbySeason)
	{
		step=step-100;
		speed=step/4;
	}
	else
	{
		
		speed=speed-100;
	}
}
function decrease_speed()
{
	if(playbySeason)
	{
		step=step+100;
		speed=step/4;
	}
	else
	{
		speed=speed+100;
	}
	
}



function get_Data(hurr_id,hurr_no)   // Fetch data for each individual hurricane
	{

		
		 var latvalues=[];
      var lngvalues=[];
      var hwind=[];
      var h34=[];
      var h50=[];
      var h64=[];
      var hstatus=[];
	  var polyline = L.polyline([]);
	  if(markerLayer[hurr_no]==null)
	  {
	  	
	   markerLayer[hurr_no]=L.layerGroup([]);	
	  polyLayer[hurr_no]=L.layerGroup([]);
	   quadrophonicLayer[hurr_no]=L.layerGroup([]);
	  polyLayer[hurr_no].addTo(map);
	  markerLayer[hurr_no].addTo(map);
	  quadrophonicLayer[hurr_no].addTo(map);	
	}
	  if(playbySeason)
		var marker = L.marker([0, 0],{icon: myIcon});
	else
		var marker = L.marker([0,0],{icon: myTropicalIcon});

		flag=true;
		var xmlhttp=false;
		if (!xmlhttp && typeof XMLHttpRequest!='undefined') 
		{
		  xmlhttp = new XMLHttpRequest();
		}
		
		var query = "/php/getPlotData.php?query="+hurr_id;
		xmlhttp.open("GET", query, false);
		xmlhttp.onreadystatechange=function() 
		{
			if (xmlhttp.readyState==4) 
			{			
				
					var_ret = JSON.parse(xmlhttp.responseText);
			}
					//console.log(var_ret[0][6]);
					//console.log(var_ret);
					

				var polyline = L.polyline([]).addTo(polyLayer[hurr_no]);
				//var pointsPlotted = [];
				
				var latvalues = [];
				var lngvalues = [];
				
				if(pointsPlotted[hurr_no]==null)	
					pointsPlotted[hurr_no]=0;
				limit[hurr_no]=var_ret.length-1;
				
				for(i=0;i<var_ret.length;i++)
				{
					latvalues.push(+var_ret[i][6]);
				
					lngvalues.push(0-var_ret[i][7]); 

					hwind.push(+var_ret[i][8]); 

						h34.push((((+var_ret[i][10])+(+var_ret[i][11])+(+var_ret[i][12])+(+var_ret[i][13]))/4)*1852);
						h50.push((((+var_ret[i][14])+(+var_ret[i][15])+(+var_ret[i][16])+(+var_ret[i][17]))/4)*1852);
						h64.push((((+var_ret[i][18])+(+var_ret[i][19])+(+var_ret[i][20])+(+var_ret[i][21]))/4)*1852);

					hstatus.push(var_ret[i][5]);


				}
				
				if(pointsPlotted[hurr_no]==limit[hurr_no])
					pointsPlotted[hurr_no]--;		
				draw_hurricanes();  // Draw each hurricane
				
	
		
			function draw_hurricanes() 
			{

				
				 var colorline='blue';
				// Below code draws polyline along the path of the hurricane
				if(lngvalues[pointsPlotted[hurr_no]]<0)
			   polyline.addLatLng(
			   L.latLng(latvalues[pointsPlotted[hurr_no]],lngvalues[pointsPlotted[hurr_no]]));
			   if(hwind[pointsPlotted[hurr_no]]>40 && playbySeason==true)
			   	  colorline= 'red';
			   	else
			   	 colorline= 'blue';
			   polyline.setStyle(
			   	{
                color: colorline,
                weight: 6,
                opacity: .7,
                dashArray: '15,5',
                lineJoin: 'round'
            });
			  /* L.circle([latvalues[pointsPlotted[hurr_no]],lngvalues[pointsPlotted]],(hwind[pointsPlotted[hurr_no]]-100)*5000,{
			    color: 'red',
			    fillColor: '#f03',
			    fillOpacity: 0.2,
			    stroke: false
			}).addTo(map);*/
      			if(h34[pointsPlotted[hurr_no]]!=(-999) || h50[pointsPlotted[hurr_no]]!=(-999) || h64[pointsPlotted[hurr_no]]!=(-999))
      			{
      				
				      L.circle([latvalues[pointsPlotted[hurr_no]],lngvalues[pointsPlotted[hurr_no]]],h34[pointsPlotted[hurr_no]],{
							    color: 'Green',
							    fillColor: '#009900', //Red
							    fillOpacity: 0.2,
							    stroke: false
							}).addTo(quadrophonicLayer[hurr_no]);
				      L.circle([latvalues[pointsPlotted[hurr_no]],lngvalues[pointsPlotted[hurr_no]]],h50[pointsPlotted[hurr_no]],{
							    color: 'Amber',
							    fillColor: '#FFBF00', //Amber
							    fillOpacity: 0.2,
							    stroke: false
							}).addTo(quadrophonicLayer[hurr_no]);
				      L.circle([latvalues[pointsPlotted[hurr_no]],lngvalues[pointsPlotted[hurr_no]]],h64[pointsPlotted[hurr_no]],{
							    color: 'Red',
							    fillColor: '#C0392B', //Red
							    fillOpacity: 0.2,
							    stroke: false
							}).addTo(quadrophonicLayer[hurr_no]);
		 	 	}

			
			  if(identity.length==1) map.setView([latvalues[pointsPlotted[hurr_no]],lngvalues[pointsPlotted[hurr_no]]]);
			  window.setInterval(function() {
			  	
					marker.bindPopup(hurr_id);
			  	 marker.on('mouseover', function (e) {
            			
       			 });
       			 
        			
       			marker.setLatLng(L.latLng(latvalues[pointsPlotted[hurr_no]],lngvalues[pointsPlotted[hurr_no]]));},speed);
			  	
					
					
       			marker.addTo(markerLayer[hurr_no]);
       			

			   if (++pointsPlotted[hurr_no] < limit[hurr_no] && flag==true) window.setTimeout(function(){draw_hurricanes();},speed);
			   if(flag==false)
			   {
			   		
			   }
			   if(pointsPlotted[hurr_no] == limit[hurr_no] )
			  {
			  	if(!playbySeason)
			  	{
			  		if ( ++j < identity.length) plot_all_hurricanes();
			  	}
			  	map.removeLayer(markerLayer[hurr_no]);
			  	map.removeLayer(polyLayer[hurr_no]);
			  	map.removeLayer(quadrophonicLayer[hurr_no]);

			   	
			  }
			   
			}
		}

	


		
		xmlhttp.send(null);

		return false;	
		
	}
		function clearMap() {
    map.eachLayer(function (layer) {
    map.removeLayer(layer);
});

}

// Integration code
$(document).ready(function(){
	$(".leaflet-control-layers").parent().addClass("bringtobottom")
});