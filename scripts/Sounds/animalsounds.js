// Hash associating words to their sounds
(function() {
	var animalSounds = {
		"cluck": {
			"url": "http://soundcloud.com/olpc-samples/chicken2-wav",
			"css": {
				"color": "#dfc644"
			}
		},
		"woof": {
			"url": "https://soundcloud.com/sfxsource-sound-effects/sfxsource-com-dog-bark-sound-effect-mp3",
			"css": {
				"color": "brown"
			}
		},
		"gobble": {
			"url": "https://soundcloud.com/cmqueen/swsfx_turkey-gobble",
			"css": {
				"color": "#5d91b6"
			}
		},
		"moo": {
			"url": "https://soundcloud.com/boyley-1/moo",
			"css": {
				"color": "#4e44b6"
			}
		}
	};
	if (typeof SOUNDS !== "undefined") {
		jQuery.extend(SOUNDS, animalSounds);
	}
	else {
		SOUNDS = animalSounds;
	}
}());