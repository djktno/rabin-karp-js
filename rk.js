var matcher = function(text, pattern, cb) {
  var radix = 32;
  var prime = 33554393;

  var text_length = text.length;
  var pattern_length = pattern.length;

  //If the pattern is longer than the
  //text, return - there's no way to
  //compute that.
  if (pattern_length > text_length)
    return;

  //Calculates a mod b even if a < 0
  var mod = function(a, b) {
    return (a % b + b) % b;
  }

  //Precalculate radix^(pattern_length - 1) (mod prime)
  //This is used to compute the t(s+1) from t(s) "Rolling hash".
  var h = mod(Math.pow(radix, pattern_length - 1), prime);
  var p = 0;
  var t = 0;

  for (var i = 0; i < pattern_length; i++) {
    p = mod(radix * p + pattern[i], prime);
    t = mod(radix * t + text[i], prime);
  }

  if (p == t) {
    if (pattern.join('') + ":" + text.slice(s, s+pattern_length).join('')) {
        cb();
    }
  }

  for (var s = pattern_length; s < text_length; s++) {
    t = mod(t + radix * prime - text[s-pattern_length] * h, prime);
    t = mod(t * radix + text[s], prime);

    if (p == t){
      if (pattern.join('') + ":" + text.slice(s, s+pattern_length).join('')) {
        cb();
      }
    }
  }
};

var hit_callback = function() {
  console.log("In callback, matched.");
};

var text = [3,1,4,1,5,9,2,6,5,3,2,6,9,7,9,3,2,6];
var pattern = [2,6,5];

matcher(text, pattern, hit_callback);
