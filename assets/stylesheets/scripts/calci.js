var Calci = {
  init: function() {
    $('#calculator .input').click(function(){
      if(this.dataset.keyType == "digit") {
        Calci.handleInput(this.dataset.digit);
      } else if (this.dataset.keyType == "operator") {
        Calci.handleOperator(this.dataset.operator);
      } else if (this.dataset.keyType == "delete") {
        Calci.handleDelete();
      } else if (this.dataset.keyType == "equals") {
        Calci.evaluateResult();
      }
    });
    $('#calculator #delete').dblclick(function() {
      Calci.clearPreview();
      Calci.clearResult();
    });
    ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].forEach(function(digit) {
      $(document).bind('keyup', digit, function() {
        Calci.handleInput(digit);
      });
    });
    ['/', '*', '+', '-'].forEach(function(digit) {
      $(document).bind('keyup', digit, function() {
        Calci.handleOperator(digit);
      });
    });
    $(document).bind('keyup', '.', function() {
      lastNumber = Calci.getLastNumber();
      if(lastNumber.indexOf('.') == -1) {
        if (lastNumber.length == 0) {
          Calci.handleInput(0);
        }
        Calci.handleInput('.');
      }
    });
    $(document).bind('keyup', 'backspace', function() {
     Calci.handleDelete();
    });
    $(document).bind('keyup', 'c', function() {
    $('#preview').html('');
     $('#result').html('');
    });
    $(document).bind('keyup', 'shift+=', function() {
      Calci.handleOperator('+');
    });
    ['=', 'return'].forEach(function(key) {
      $(document).bind('keyup', key, function() {
        Calci.evaluateResult();
      });
    });
  },
  handleInput: function(input) {
    $('#preview').html($('#preview').html() + input);
  },
  handleOperator: function(operator) {
    if ($('#preview').html().length == 0) {
      if (operator == '-') {
        Calci.handleInput('-');
      }
    } else {
      lastChar = Calci.getLastChar();
      if (['+', '-', '*', '/'].indexOf(lastChar) != -1) {
        Calci.handleDelete();
      }
      Calci.handleInput(operator);
    }
  },
  handleDelete: function() {
    $('#preview').html($('#preview').html().slice(0, -1));
    if ($('#preview').html().length == 0) {
      Calci.clearResult();    
    }
  },
  evaluateResult: function() {
    $('#result').html(eval($('#preview').html()));  
  },
  clearResult: function() {
    $('#result').html('');
  },
  clearPreview: function() {
    $('#preview').html('');
  },
  getLastNumber: function() {
    str = $('#preview').html();
    regexp = /[+\-*\/]([0-9.])*$/
    matches = str.match(regexp);
    if(matches == null) {
      return str;
    } else {
      return matches[0].slice(1);
    }
  },
  getLastChar: function() {
    str = $('#preview').html();
    if (str.length == 0) {
      return str;
    } else {
      return str[str.length - 1];
    }
  }
};


$(document).ready(function() {
  Calci.init();
});