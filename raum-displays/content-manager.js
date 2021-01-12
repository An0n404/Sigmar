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
	//console.log(lastCsvData);
	var d = new Date();
	var roomData=[];
	for(i=0; i<lastCsvData.length; i++) {
		var h = lastCsvData[i].rs_end.split(":")[0];
		var m = lastCsvData[i].rs_end.split(":")[1];
		//console.log(h+":"+m);
		//console.log(d.getHours()+":"+d.getMinutes());
		if(lastCsvData[i].rs_roomnum!=room||d.getHours()>h||(d.getHours()==h&&d.getMinutes()>m))
			continue;
		roomData.push(lastCsvData[i]);	
	}
	//console.log(roomData);
	displayText(roomData, d);
	
}

function displayText(data, date) {
	if(data[0])
		updateAnzeige01(data[0].rs_begin,data[0].rs_end, data[0].rs_event, data[0].rs_group, data[0].rs_info);
	if(data[1])
		updateAnzeige02(data[1].rs_begin,data[1].rs_end, data[1].rs_event, data[1].rs_group, data[1].rs_info);
	if(data[2])
		updateAnzeige03(data[2].rs_begin,data[2].rs_end, data[2].rs_event);
	document.getElementById("clock").textContent = date.getHours()+":"+date.getMinutes();
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