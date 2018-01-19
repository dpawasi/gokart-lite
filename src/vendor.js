// produce some terrifying CSS at runtime using browserify-css
import 'leaflet/dist/leaflet.css'

// OpenLayers 3 map widget, including our extensions
import L from 'leaflet'
import $ from 'jquery'

import utils from './utils.js'
//use 1024 as the tile size
L.CRS.EPSG4326.scale = function(zoom) {
    return 1024 * Math.pow(2, zoom);
}
L.CRS.EPSG4326.zoom = function(scale) {
    return Math.log(scale / 1024) / Math.LN2;
}

L.popup = function(){
    var func = L.popup;
    return function(options,source) {
        var _popup = func(options,source)
        _popup._initLayout = function() {
            var func1 = _popup._initLayout
            return function() {
                func1.call(this)
                if (this.options.buttons && this.options.buttons.length > 0) {
                    var buttonDiv = $($.parseHTML("<div class='leaflet-popup-custom-buttons'></div>"))
                    var button = null
                    $.each(this.options.buttons,function(index,b){
                        button = $($.parseHTML("<img src='" +b[0] + "' class='leaflet-popup-custom-button' title='Erase feature info from map'/>"))
                        button.on("click",b[1])
                        buttonDiv.append(button)
                    })
                    $(this._container).append(buttonDiv)
                }
            }
        }()
        return _popup
    }
}()

String.prototype.camelize = function(separator) {
 
  // Assume separator is _ if no one has been provided.
  if(typeof(separator) == "undefined") {
    separator = "_";
  }
 
  // Cut the string into words
  var words = this.split(separator);
 
  // Concatenate all capitalized words to get camelized string
  var result = "";
  var word = null;
  var capitalizedWord = null;
  for (var i = 0 ; i < words.length ; i++) {
    word = words[i].trim();
    if (word.length === 0) continue;
    if (["km","ha","mile","knot"].indexOf(word) >= 0) {
        capitalizedWord = "(" + word + ")"
    } else {
        capitalizedWord = word.charAt(0).toUpperCase() + word.slice(1);
        if (result.length > 0) {
            capitalizedWord = " " + capitalizedWord;
        }
    }
    result += capitalizedWord;
  }
 
  return result;
}
export {
  $,
  L,
  utils
}
