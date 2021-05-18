function updateAnzeige01(begin, end, titel, gruppe, infotext) {
	document.getElementById("uhrzeit01").textContent = begin+"-"+end;
	document.getElementById("titel01").innerHTML = "<h2>"+titel+"</h2>";
	document.getElementById("infotext01").innerHTML = "<p><b>"+gruppe+": </b>"+infotext+"</p>";
}

function updateAnzeige02(begin, end, titel, gruppe, infotext) {
	document.getElementById("uhrzeit02").textContent = begin+"-"+end;
	document.getElementById("titel02").innerHTML = "<h2>"+titel+"</h2>";
	document.getElementById("infotext02").innerHTML = "<p><b>"+gruppe+": </b>"+infotext+"</p>";
}

function updateAnzeige03(begin, end, titel) {
	document.getElementById("uhrzeit03").textContent = begin+"-"+end;
	document.getElementById("titel03").innerHTML = "<h2>"+titel+"</h2>";
}

var getRoom = function (url) {
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	//alert(query);
	return query;
}

function dataParsed(results) {
	lastCsvData = results.data;

	//lastCsvData=fillEmpty(lastCsvData);
	console.log(lastCsvData);
	var d = new Date();
	var roomData=[];
	for(i=0; i<lastCsvData.length; i++) {
		var h = lastCsvData[i].rs_end.split(":")[0];
		var m = lastCsvData[i].rs_end.split(":")[1];
		//console.log(h+":"+m);
		//console.log(d.getHours()+":"+d.getMinutes());
		if((room==3||room==4)&&lastCsvData[i].rs_roomnum==5)
			lastCsvData[i].rs_roomnum=room;

		if(lastCsvData[i].rs_roomnum!=room||d.getHours()>h||(d.getHours()==h&&d.getMinutes()>m))
			continue;
		roomData.push(lastCsvData[i]);	
	}
	//console.log(roomData);
	roomData=fillEmpty(roomData);
	//console.log(roomData);
	displayText(roomData, d);
	
}

function minutes_with_leading_zeros(dt) {
	return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}

function hours_with_leading_zeros(dt) { 
	return (dt.getHours() < 10 ? '0' : '') + dt.getHours();
}

function setClock(date) {
	document.getElementById("clock").textContent = hours_with_leading_zeros(date)+":"+minutes_with_leading_zeros(date);
}

function fillEmpty(data) {
	//data[0].rs_begin,data[0].rs_end, data[0].rs_event, data[0].rs_group, data[0].rs_info;
	
	for(i=0; i<data.length; i++) {
		if(data[i].rs_begin==null)
			data[i].rs_begin="00:00";
		if(data[i].rs_end==null)
			data[i].rs_end="23:59";
		if(data[i].rs_event==null)
			data[i].rs_event="Unbelegt"
		if(data[i].rs_group==null)
			data[i].rs_group="Unbelegt"
		if(data[i].rs_info==null)
			data[i].rs_info="Raum in diesem Zeitraum nicht belegt"
	}
	return data;
}

function displayText(data, date) {
	if(data[0])
		updateAnzeige01(data[0].rs_begin,data[0].rs_end, data[0].rs_event, data[0].rs_group, data[0].rs_info);
	if(data[1])
		updateAnzeige02(data[1].rs_begin,data[1].rs_end, data[1].rs_event, data[1].rs_group, data[1].rs_info);
	if(data[2])
		updateAnzeige03(data[2].rs_begin,data[2].rs_end, data[2].rs_event);
	setClock(date);
}



/*url oder Pfad zur .csv-Datei im Format:
 Raumbezeichnung,Uhrzeit Beginn,Uhrzeit Ende,Gruppe,Titel,Infotext
*/
var csvLocation = "my_data.csv";
var lastCsvData;

var room = getRoom(window.location.href);

Papa.parse(csvLocation, {
			download: true,
      		header: true,
      		dynamicTyping: true,
      		skipEmptyLines: 'greedy',
      		complete: function(results){
      			dataParsed(results);
      		}
    });