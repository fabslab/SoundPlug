// # SoundPlug - plug sounds into your text

// DEPENDENCIES: jQuery, SoundManager 2, findAndReplaceDomText
var soundPlug = (function( $, soundManager, findAndReplaceDOMText ) {

	// Set SoundManager 2 options
	soundManager.url = 'src/SoundManager/swf';
	soundManager.flashVersion = 9;
	soundManager.preferFlash = false;
	soundManager.useFastPolling = true;
	soundManager.useHighPerformance = true;

	// SoundCloud app identifier
	var client_id = 'c5c59525a62c84a5c23c3187ab2d3a29';

	function soundplug (sounds, options) {

		var settings = {
			event: 'hover',
			selector: 'body',
			css: {
				"font-weight": "bold"
			}
		};
		// Deep extend in order to merge the CSS properties object as well
		$.extend(true, settings, options);

		function fetchSound (word) {
			$.getJSON('http://api.soundcloud.com/resolve?url=' + sounds[word].url + '&format=json&client_id=' + client_id + '&callback=?', function processSound (sound) {
					
				var css = sounds[word].css,
						url = sound.stream_url,
						event = settings.event,
						$selected = null;

				// Get appropriate stream url depending on whether the playlist is private or public
				if (url.indexOf("secret_token") == -1) url = url + '?';
				else url = url + '&';

				url = url + 'client_id=' + client_id;

				soundManager.createSound({
					id: sound.id,
					url: url
				});

				// Add span tags with appropriate class around all instances of the word
				var $span = $('<span class="sp-' + word + '"></span>');

				// Apply globally set CSS, then apply individual word CSS on top of it
				if (settings.css !== null) {
					$span.css(settings.css);
				}
				if (css !== null) {
					$span.css(css);
				}

				// Go to James Padolsey's [findAndReplaceDomText](https://github.com/padolsey/findAndReplaceDOMText) script for details on its use
				findAndReplaceDOMText(new RegExp(word, 'ig'), $(settings.selector).get(0), $span.get(0));

				// Attach event handler to play sound on given event associated with the span element
				// If event is hover, add handlers for both play sound on mouseenter and stop play on mouseleave
				if (settings.event === 'hover') {
					event = 'mouseenter';
				}
				$selected = $(settings.selector).on(event, '.sp-' + word, function streamSound() {
					soundManager.stopAll();
					soundManager.play(sound.id);
				});
				if (settings.event === 'hover') {
					$selected.on('mouseleave', '.sp-' + word, function stopSound() {
						soundManager.stopAll();
					});
				}

			});
		}

		soundManager.onready(function () {

			for (var word in sounds)
			{
				if (sounds.hasOwnProperty(word)) {
					fetchSound(word);
				}
			}

		});

	}

	return soundplug;

}( jQuery, soundManager, findAndReplaceDOMText ));