var matcher = function(text, pattern, cb) {
  var radix = 10;
  var prime = 11;

  var text_length = text.length;
  var pattern_length = pattern.length;

  var mod = function(a, b) {
    return a - b * (Math.floor((a/b)));
  };

  var h = (Math.pow(radix,(pattern_length - 1))) % prime;
  var p = 0;
  var t = 0;

  for (var i = 1; i < pattern_length; i++) {
    p = ((radix * p) + pattern[i]) % prime;
    t = ((radix * t) + text[i]) % prime;
  }

  for (var s = 0; s <= (text_length - pattern_length); s++) {
    console.log("Iteration " + s + "=> Text: " + text.slice(s, s+pattern_length).join(''));
    console.log("P: " + p);
    console.log("T: " + t);
    console.log("s: " + s);
    if (p == t) {
      console.log("Spurious hit?");
      console.log("Text: " + text.slice(s, s+pattern_length).join(''));
      if (pattern.join('') == text.slice(s, s+pattern_length).join('')) {
        console.log("Verfied match.");
        match_string = text.slice(s, s+pattern_length).join('');
        cb(match_string);
      }
    }
    if (s < (text_length - pattern_length)) {
      t = ((radix * (t + (text[s+1]*h))) + text[s+pattern_length]) % prime;
      console.log("Calculating next iteration, ts");
      console.log("Hash for " + text.slice(s+1, s+pattern_length).join('') + ": " + t);
      console.log("--------------------------------------------");
    }
  }
};

var hit_callback = function(string_matched) {
  console.log("In callback, matched " + string_matched);
};

var text = [3,1,4,1,5,9,2,6,5,3,2,6,9,7,9,3];
var pattern = [2,6,5,3,2];

matcher(text, pattern, hit_callback);
