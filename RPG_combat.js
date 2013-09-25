var slime1hp = 10;
var outputElement = document.getElementById('output');

function sendOutput(output, addOrReplace){
   	if(addOrReplace == 'replace'){
       	outputElement.innerHTML = '<p>' + output + '</p>';
    }
   	if(addOrReplace == 'add'){
        outputElement.innerHTML += '<p>' + output + '</p>';
    }
}