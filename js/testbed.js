$(document).ready(function() {

	function getString() {
	  var availableChars='';
	  var testString='';
	  
	  for( var i = 32; i <= 126; i++ ) {
	    availableChars += String.fromCharCode( i );
	  }
	  
	  var randomWords = Math.floor(Math.random() * 101);
	  var randomCharacters;

	  	for (i=0;i<randomWords;i++) {
	  		randomCharacters = Math.floor(Math.random() * 26);
	  		for (var j=0;j<randomCharacters;j++) {
	  			testString += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
	  		}

	  		if (i != (randomWords-1)) testString += ' ';
	  	}

	  	return testString;
	}

	getString();
})

var strValue;


for (var i=0;i<100;i++) {
	strValue = getString();

	Test.assertEquals(wordsToHex(strValue), wordsToHexAuthor(strValue));
}