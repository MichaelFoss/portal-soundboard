var portal = {
	_chainIsPlaying: false,
	_clipIsPlaying: false,
	$clips: null, // $('#Clips')
	$chain: null, // $('#Chain')
	chainHowl: null,

	init: function() {
		// Find common DOM elements
		portal.$clips = $('#Clips');
		portal.$chain = $('#Chain');

		// Wire events
		portal.$clips.find('.AddButton').on('click', portal.addAudio);
		portal.$clips.find('.PlayButton').on('click', portal.playClip);
		$('#PlayChain').on('click', portal.togglePlayChain);
		$('#ClearChain').on('click', portal.clearChain);
	},

	addAudio: function() {
		if (portal._chainIsPlaying) {
			return false;
		}
		var $clip = $(this).closest('li').clone();
		$clip.find('.AddButton')
			.removeClass('AddButton')
			.addClass('RemoveButton')
			.text('-');
		portal.$chain.append($clip);
		$clip.find('.RemoveButton').on('click', portal.removeClip);
		$clip.find('.PlayButton').on('click', portal.playClip);
		return true;
	},

	playClip: function() {
		if (portal._clipIsPlaying || portal._chainIsPlaying) {
			return false;
		}
		portal._clipIsPlaying = true;
		new Howl({
			src: [$(this).closest('li').data('src')],
			onend: function() {
				portal._clipIsPlaying = false;
			}
		}).play();
		return true;
	},

	removeClip: function() {
		if (portal._chainIsPlaying) {
			return false;
		}
		$(this).closest('li').remove();
		return true;
	},

	_playNext: function() {
		if (portal.howlUrls.length == 0) {
			$('ChainPlay').val('Play');
			portal._chainIsPlaying = false;
			portal.chainHowl = null;
		}
		else {
			portal.chainHowl = new Howl({
				autoplay: true,
				src: [portal.howlUrls.shift()],
				onend: portal._playNext
			});
		}
	},

	togglePlayChain: function() {
		if (portal._clipIsPlaying) {
			return false;
		}
		if (!portal._chainIsPlaying) {
			// Start playing
			$(this).val('Stop');
			portal.howlUrls = [];
			$('#Chain li').each(function() {
				portal.howlUrls.push($(this).data('src'));
			});
			portal._chainIsPlaying = true;
			portal._playNext();
		}
		else {
			// Stop playing
			$(this).val('Play');
			portal.chainHowl.stop();
			portal.chainHowl = null;
			portal._chainIsPlaying = false;
		}
	},

	clearChain: function() {
		if (portal._chainIsPlaying) {
			portal.chainHowl.stop();
			portal.chainHowl = null;
			portal._chainIsPlaying = false;
		}
		portal.$chain.find('li').remove();
	}
};

$(function() {
	portal.init();
});
