let sound = new Audio('/WhatsApp.mp3');
sound.loop = true;

let h2 = document.getElementById('clock');


setInterval(function(){
	let date = new Date();
	
	let hours = 12 - date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();
	let ampm = date.getHours() < 12 ? 'AM' : 'PM';

	hours = hours < 0 ? hours * -1 : (hours === 0 ? 12 : hours);
	
	h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + ampm;
}, 1000);

function addZero(time) {
	return (time < 10) ? "0" + time : time;
}

function populateOptions(select, start, end) {
	for (let i = start; i <= end; i++) {
		select.options[select.options.length] = new Option(i < 10 ? "0" + i : i, i);
	}
}

function setOptions(id, start, end) {
	let select = document.getElementById(id);
	populateOptions(select, start, end);
}

setOptions('alarmhrs', 1, 12);
setOptions('alarmmins', 0, 59);
setOptions('alarmsecs', 0, 59);

function alarmSet() {
	let hr = document.getElementById('alarmhrs');
	let min = document.getElementById('alarmmins');
	let sec = document.getElementById('alarmsecs');
	let ap = document.getElementById('ampm');
    
    let selectedHour = hr.options[hr.selectedIndex].value;
    let selectedMin = min.options[min.selectedIndex].value;
    let selectedSec = sec.options[sec.selectedIndex].value;
    let selectedAP = ap.options[ap.selectedIndex].value;

    let alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + selectedAP;

    hr.disabled = true;
	min.disabled = true;
	sec.disabled = true;
	ap.disabled = true;

	setInterval(function() {
		let date = new Date();
		let hours = 12 - date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		let ampm = date.getHours() < 12 ? 'AM' : 'PM';

		hours = hours < 0 ? hours * -1 : (hours === 0 ? 12 : hours);
		let currentTime = h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + ampm;

		if (alarmTime == currentTime) {
			sound.play();
		}
	}, 1000);
}

function alarmClear() {
	document.getElementById('alarmhrs').disabled = false;
	document.getElementById('alarmmins').disabled = false;
	document.getElementById('alarmsecs').disabled = false;
	document.getElementById('ampm').disabled = false;
	sound.pause();
}
