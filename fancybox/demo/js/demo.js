/*
 * jQuery Simple Instagram Fancybox
 *
 *
 * Author: Chris Rivers
 * xxcriversxx@gmail.com
 *
 * Changelog: 
 * Version: 2.2
 *
 */


$(document).ready(function(){
	
	// Calling the Plugin
	$('.demo').simpleInstagramFancybox({
		captionOn : true,
		mode : 'user',
		userID: '', // This a mandatory setting that allows you to specify a userid.
		accessToken : '', // This a mandatory setting that allows you to specify an access token.
	});
	
	// Demo Starter
	$('.start-demo').click(function(){
		$(window).scrollTop(600);
	});
	
	// Pretty-fy Demo	
	prettyPrint();
	
});