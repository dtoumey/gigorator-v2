angular.module('angularfireSlackApp')
  .factory('Priority', function(){
    function padZero(num, size) {
        return ('000000000' + num).slice(-size);
    }

    function convertToUCCode(inputStr, cb) {
      var pad = 'aaaaaaaaaaaaaaaaaaaaaaaa',
      reader = new FileReader(),
      blob;

      inputStr = inputStr.toLowerCase();
      inputStr = inputStr.replace(/\s/g, '');
      inputStr = inputStr.replace(/\./g, '');
      inputStr = inputStr.substring(0, 14);
      inputStr += pad.substring(0, pad.length - inputStr.length);
      blob = new Blob([inputStr]);

      reader.onload = function(e) {
        var typedArray = new Uint8Array(e.target.result);
        var array = Array.prototype.slice.call(typedArray);
        var i;
        var numberStr = '';

        for (i = 0; i < array.length; i++) {
          numberStr += padZero(array[i], 3);
        }
        if (cb) {
          cb(parseInt(numberStr));
        }
      };
      reader.readAsArrayBuffer(blob);
	}

    var Priority = {
      // Given a string this returns the Unicode number string equivalent
      startPriority: function (inputStr, cb) {
        convertToUCCode(inputStr, cb);
        return;
      },
      // Given a string this returns the Unicode number string equivalent
      // but with the last char code incremented. (Given 'aaa' it will 
      // return the code string for 'aab')
      endPriority: function (inputStr, cb) {
        inputStr = inputStr.replace(/\s/g, '');
        inputStr = inputStr.replace(/\./g, '');
	    var next = String.fromCharCode(inputStr.charCodeAt(inputStr.length -1) +1);
	    next = inputStr.substring(0, inputStr.length -1) +next;
	    convertToUCCode(next, cb);
	    return;
      }
	};

	return Priority;
  });
  