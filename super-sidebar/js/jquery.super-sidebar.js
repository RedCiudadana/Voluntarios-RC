/*!
 * Super Sidebar v3.1.0
 * (c) CreativeTier
 * contact@creativetier.com
 * http://www.creativetier.com
 */
(function($) {
	"use strict";

	/**
	 * The plugin main function.
	 * Initializes the sidebar and builds all of the functionality.
	 * @param {Element} element - The sidebar main HTML element.
	 * @param {Object} options - The supplied options during the build call.
	 */
	function SuperSidebar(element, options) {

		// ------------------------------
		// MAIN
		// ------------------------------

		/**
		 * The current plugin version.
		 * @type {String}
		 */
		var VERSION = "3.1.0";

		/**
		 * The current page URL.
		 * @type {String}
		 */
		var PAGE_URL = encodeURIComponent(document.location.href);

		/**
		 * The current page title.
		 * @type {String}
		 */
		var PAGE_TITLE = encodeURIComponent(document.title);

		/**
		 * The default settings.
		 * @type {Object}
		 */
		var defaults = {
			// Main
			position: ["left", "center"],
			offset: [0, 0],
			buttonShape: "round",
			buttonColor: "default",
			buttonOverColor: "default",
			iconColor: "white",
			iconOverColor: "white",
			labelEnabled: true,
			labelColor: "match",
			labelTextColor: "match",
			labelEffect: "slide-out-fade",
			labelAnimate: "default",
			labelConnected: true,
			sideSpace: true,
			buttonSpace: true,
			labelSpace: false,
			// Subbar
			subPosition: ["circular", 105, -90, 90],
			subEffect: ["linear-slide", 40],
			subAnimate: [400, "easeOutQuad"],
			subSpace: false,
			subOpen: "mouseover",
			// Window
			windowPosition: ["center", "center"],
			windowOffset: [0, 0],
			windowCorners: "match",
			windowColor: "match",
			windowShadow: true,
			windowDraggable: true,
			// Other
			showAfterPosition: false,
			barAnimate: [250, "easeOutQuad"],
			hideUnderWidth: false,
			shareTarget: "default",
			animateEngine: "velocity",
			// Share
			shareUrl: null,
			shareTitle: null
		};

		/**
		 * The default label animate settings.
		 * @type {Object}
		 */
		var labelAnimateDefaults = {
			"default": [400, "easeOutQuad"],
			"fade": [200, "easeOutQuad"],
			"slide-in-in": {
				show: [400, "easeOutQuad"],
				hide: [400, "swing"]
			}
		};

		/**
		 * The default share services.
		 * @type {Object}
		 */
		var defaultShareServices = {
			"blogger": {
				type: "popup",
				url: "https://www.blogger.com/blog-this.g?u={URL}&n={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"buffer": {
				type: "popup",
				url: "https://buffer.com/add?text={TITLE}&url={URL}",
				window: {width: 750, height: 500, top: 200, left: "{CENTER}"}
			},
			"diaspora": {
				type: "popup",
				url: "https://share.diasporafoundation.org/?title={TITLE}&url={URL}",
				window: {width: 750, height: 500, top: 200, left: "{CENTER}"}
			},
			"digg": {
				type: "popup",
				url: "http://digg.com/submit?url={URL}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"douban": {
				type: "popup",
				url: "http://www.douban.com/recommend/?url={URL}&title={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"email": {
				type: "popup",
				url: "mailto:?subject={TITLE}&body={URL}",
				window: {width: 750, height: 500, top: 200, left: "{CENTER}"}
			},
			"evernote": {
				type: "popup",
				url: "http://www.evernote.com/clip.action?url={URL}&title={TITLE}",
				window: {width: 950, height: 550, top: 200, left: "{CENTER}"}
			},
			"facebook": {
				type: "popup",
				url: "https://www.facebook.com/sharer.php?u={URL}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"flipboard": {
				type: "popup",
				url: "https://share.flipboard.com/bookmarklet/popout?v=2&title={TITLE}&url={URL}",
				window: {width: 800, height: 550, top: 200, left: "{CENTER}"}
			},
			"google-bookmarks": {
				type: "popup",
				url: "https://www.google.com/bookmarks/mark?op=edit&bkmk={URL}&title={TITLE}",
				window: {width: 1000, height: 550, top: 200, left: "{CENTER}"}
			},
			"hacker-news": {
				type: "popup",
				url: "https://news.ycombinator.com/submitlink?u={URL}&t={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"instapaper": {
				type: "popup",
				url: "http://www.instapaper.com/edit?url={URL}&title={TITLE}",
				window: {width: 700, height: 420, top: 200, left: "{CENTER}"}
			},
			"line": {
				type: "popup",
				url: "https://lineit.line.me/share/ui?url={URL}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"linkedin": {
				type: "popup",
				url: "https://www.linkedin.com/shareArticle?mini=true&url={URL}&title={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"livejournal": {
				type: "popup",
				url: "http://www.livejournal.com/update.bml?subject={TITLE}&event={URL}",
				window: {width: 800, height: 550, top: 200, left: "{CENTER}"}
			},
			"okru": {
				type: "popup",
				url: "https://connect.ok.ru/dk?st.cmd=WidgetSharePreview&st.shareUrl={URL}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"pinterest": {
				type: "popup",
				url: "http://pinterest.com/pin/create/button/?url={URL}",
				window: {width: 1050, height: 650, top: 150, left: "{CENTER}"}
			},
			"pocket": {
				type: "popup",
				url: "https://getpocket.com/edit?url={URL}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"qzone": {
				type: "popup",
				url: "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={URL}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"reddit": {
				type: "popup",
				url: "http://www.reddit.com/submit?url={URL}&title={TITLE}",
				window: {width: 1000, height: 650, top: 150, left: "{CENTER}"}
			},
			"renren": {
				type: "popup",
				url: "http://widget.renren.com/dialog/share?resourceUrl={URL}&srcUrl={URL}&title={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"skype": {
				type: "popup",
				url: "https://web.skype.com/share?url={URL}",
				window: {width: 700, height: 550, top: 200, left: "{CENTER}"}
			},
			"telegram": {
				type: "popup",
				url: "https://telegram.me/share/url?url={URL}&text={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"tumblr": {
				type: "popup",
				url: "https://www.tumblr.com/widgets/share/tool?canonicalUrl={URL}&title={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"twitter": {
				type: "popup",
				url: "https://twitter.com/intent/tweet?url={URL}&text={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"vk": {
				type: "popup",
				url: "http://vk.com/share.php?url={URL}&title={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"weibo": {
				type: "popup",
				url: "http://service.weibo.com/share/share.php?url={URL}&title={TITLE}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			},
			"xing": {
				type: "popup",
				url: "https://www.xing.com/spi/shares/new?url={URL}",
				window: {width: 700, height: 450, top: 200, left: "{CENTER}"}
			}
		};

		/**
		 * The form messages.
		 * @type {Object}
		 */
		var formMessages = {
			empty: "Please fill all of the required fields.",
			badEmail: "The email format is incorrect.",
			working: "Working, please wait...",
			success: "The submission was successful!",
			error: "There was an error! Please try again.",
			noFile: "Form processing file not found."
		};

		/**
		 * The browser window.
		 * @type {jQuery}
		 */
		var $window = $(window);

		/**
		 * The current document.
		 * @type {jQuery}
		 */
		var $document = $(document);

		/**
		 * The page body element.
		 * @type {jQuery}
		 */
		var $pageBody = $("body");

		/**
		 * The current function instance.
		 * @type {SuperSidebar}
		 */
		var root = this;

		/**
		 * The main plugin function.
		 * @type {SuperSidebar}
		 */
		var main = this;

		/**
		 * The sidebar settings.
		 * @type {Object}
		 */
		var settings;

		/**
		 * The sidebar main element.
		 * @type {jQuery}
		 */
		var $main = $(element);

		/**
		 * The bar with buttons.
		 * @type {Bar}
		 * @property
		 */
		this.bar;

		/**
		 * The overlay with windows.
		 * @type {Overlay}
		 * @property
		 */
		this.overlay;

		/**
		 * If the sidebar is located on the right side of the page.
		 * @type {Boolean}
		 */
		var isOnRight = false;


		/**
		 * Initializes the function.
		 * @constructor
		 */
		function init() {
			makeSettings();
			build();
		}

		/**
		 * Creates the settings using the defaults and the options supplied.
		 */
		function makeSettings() {
			settings = $.extend({}, defaults, options);

			// MAIN
			if (settings.labelColor === "match") {
				settings.labelColor = settings.buttonOverColor;
			}
			if (settings.labelTextColor === "match") {
				settings.labelTextColor = settings.iconOverColor;
			}

			if (settings.labelAnimate === "default") {
				if (labelAnimateDefaults[settings.labelEffect]) {
					settings.labelAnimate = labelAnimateDefaults[settings.labelEffect];
				} else {
					settings.labelAnimate = labelAnimateDefaults.default;
				}
			}
			settings.labelAnimate = extendAnimateSetting(settings.labelAnimate);

			if (settings.labelConnected) {
				if (settings.labelEffect === "slide-in" || settings.labelEffect === "slide-out-out" || settings.labelEffect === "slide-in-in") {
					settings.labelConnected = false;
				} else if (settings.labelSpace) {
					settings.labelSpace = false;
				}
			}

			// SUBBAR
			if (typeof settings.subPosition === "string") {
				settings.subPosition = [settings.subPosition];
			}
			if (settings.subPosition[0] === "circular") {
				if (!settings.subPosition[1]) {
					settings.subPosition[1] = defaults.subPosition[1];
				}
				if (typeof settings.subPosition[2] === "undefined") {
					settings.subPosition[2] = defaults.subPosition[2];
				}
				if (typeof settings.subPosition[3] === "undefined") {
					settings.subPosition[3] = defaults.subPosition[3];
				}

				if (settings.subSpace) {
					settings.subSpace = false;
				}
			}

			if (settings.subAnimate === "default") {
				settings.subAnimate = defaults.subAnimate;
			}

			if (typeof settings.subEffect === "string") {
				settings.subEffect = [settings.subEffect];
			}
			if ((settings.subEffect[0] === "linear-fade" || settings.subEffect[0] === "linear-slide") && !settings.subEffect[1]) {
				settings.subEffect[1] = defaults.subEffect[1];
			}

			settings.subAnimate = extendAnimateSetting(settings.subAnimate);

			// WINDOW
			if (settings.windowCorners === "match") {
				if (settings.buttonShape === "round" || settings.buttonShape === "rounded" || settings.buttonShape === "rounded-out") {
					settings.windowCorners = "round";
				}
			}

			if (settings.windowColor === "match") {
				settings.windowColor = settings.buttonColor;
			}

			// OTHER
			if (settings.barAnimate === "default") {
				settings.barAnimate = defaults.barAnimate;
			}

			settings.barAnimate = extendAnimateSetting(settings.barAnimate);

			if (options && options.shareServices) {
				settings.shareServices = $.extend(true, {}, defaultShareServices, options.shareServices);
			} else {
				settings.shareServices = defaultShareServices;
			}
			

			if (settings.animateEngine === "jquery") {
				settings.animateEngine = "jQuery";
			}
		}

		/**
		 * Builds the sidebar.
		 * Creates everything that is needed to make the sidebar functional.
		 */
		function build() {
			var $overlay;

			if (settings.position[0] === "right") {
				isOnRight = true;
			}

			root.bar = new Bar($main.children(".sb-bar")[0]);

			$overlay = $main.children(".sb-overlay");
			if ($overlay.length) {
				root.overlay = new Overlay($overlay[0]);
			}

			resize();
			$window.on("resize", resize);

			$main.addClass("sb-ready");
		}

		/**
		 * Runs initially and when the page is resized.
		 */
		function resize() {
			root.bar.position();

			if (root.overlay) {
				root.overlay.position();
			}

			if (settings.hideUnderWidth) {
				if ($window.width() < settings.hideUnderWidth) {
					$main.addClass("sb-vhide");
				} else {
					$main.removeClass("sb-vhide");
				}
			}
		}

		/**
		 * Converts a string to a number.
		 * @param {String} value - The string to convert.
		 * @return {Number} The converted number.
		 */
		function getInt(value) {
			return parseInt(value, 10);
		}

		/**
		 * Converts the animate setting from an array to an object with properties for show and hide.
		 * @param {Array|Object} animate - The animate setting.
		 * @return {Object} The converted animate setting.
		 */
		function extendAnimateSetting(animate) {
			if (Object.prototype.toString.call(animate) === "[object Array]") {
				return {
					show: animate,
					hide: animate
				};
			} else {
				return animate;
			}
		}

		/**
		 * Splits an offset string.
		 * @param {String} off - The offset string.
		 * @return {Array} The offset values.
		 */
		function splitOffset(off) {
			off = off.split("-");
			off[0] = getInt(off[0]);
			if (off[1]) {
				off[1] = getInt(off[1]);
			}
			return off;
		}

		/**
		 * Positions an object.
		 * @param {jQuery} $target - The target object.
		 * @param {Array} pos - The left and top positions.
		 * @param {Array} off - The left and top offsets.
		 */
		function posObject($target, pos, off) {
			if (pos) {
				var ww = $window.width();
				var wh = $window.height();
				var tw = $target.outerWidth(true);
				var th = $target.outerHeight(true);
				var x, y;
				var p;

				if (typeof pos[0] === "number") x = {"left": pos[0] + off[0]};
				else if (typeof pos[0] === "string") {
					if (pos[0].indexOf("%") !== -1) {
						p = getInt(pos[0].split("%")[0]);
						x = {"left": p / 100 * ww + off[0]};
					} else {
						if (pos[0] === "left") x = {"left": 0 + off[0]};
						else if (pos[0] === "center") x = {"left": (ww - tw) / 2 + off[0]};
						else if (pos[0] === "right") x = {"right": 0 + off[0]};

						else x = {"left": getInt(pos[0]) + off[0]};
					}
				}

				if (typeof pos[1] === "number") y = {"top": pos[1] + off[1]};
				else if (typeof pos[1] === "string") {
					if (pos[1].indexOf("%") !== -1) {
						p = getInt(pos[1].split("%")[0]);
						y = {"top": p / 100 * wh + off[1]};
					} else {
						if (pos[1] === "top") y = {"top": 0 + off[1]};
						else if (pos[1] === "center") y = {"top": (wh - th) / 2 + off[1]};
						else if (pos[1] === "bottom") y = {"bottom": 0 + off[1]};

						else y = {"top": getInt(pos[1]) + off[1]};
					}
				}
				
				if (x.left) x.left = Math.round(x.left);
				if (x.right) x.right = Math.round(x.right);

				if (y.top) y.top = Math.round(y.top);
				if (y.bottom) y.bottom = Math.round(y.bottom);

				$target.css($.extend({}, x, y));
			}
		}

		/**
		 * Verifies if the given string is a valid email.
		 * @param {String} email - The email string to verify.
		 * @return {Boolean} If the email is valid.
		 */
		function validateEmail(email) {
			var exp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return exp.test(email);
		}

		/**
		 * Animates an object using either Velocity or jQuery.
		 * @param {jQuery} target - The object to animate.
		 * @param {Object} props - The properties to animate.
		 * @param {Number} duration - The duration of the animation (in ms).
		 * @param {String} easing - The animation easing.
		 * @param {Function} complete - A function to call when the animation is completed.
		 */
		function animate(target, props, duration, easing, complete) {
			if (settings.animateEngine === "velocity") {
				target.velocity(props, duration, easing, complete);
			} else {
				target.animate(props, duration, easing, complete);
			}
		}

		/**
		 * Stops the Velocity or jQuery animation of an object.
		 * @param {jQuery} target - The object to stop animating.
		 */
		function stopAnimate(target) {
			if (settings.animateEngine === "velocity") {
				target.velocity("stop");
			} else {
				target.stop();
			}
		}

		/**
		 * Verifies if a variable is set and not empty.
		 * @param {*} variable - The variable to test.
		 * @return {Boolean} If the variable is set.
		 */
		function isset(variable) {
			if (typeof variable !== undefined && variable !== null && variable !== '') {
				return true;
			} else {
				return false;
			}
		}

		/**
		 * Returns the plugin version number.
		 * @return {String} The plugin version number.
		 * @method
		 */
		this.getVersion = function() {
			return VERSION;
		};

		/**
		 * Destroys the sidebar.
		 * Removes everything that was created in the build() function.
		 * @method
		 */
		this.destroy = function() {
			root.bar.destroy();

			if (root.overlay) {
				root.overlay.destroy();
			}

			$window.off("resize", resize);

			$main.removeClass("sb-vhide sb-ready");

			$main.data("superSidebar", null);
		};

		// Initializes the function.
		init();

		
		// ------------------------------
		// OBJECTS
		// ------------------------------

		/**
		 * The function of the bar with buttons.
		 * @param {Element} element - The main HTML element.
		 */
		function Bar(element) {

			/**
			 * The current function instance.
			 * @type {Bar}
			 */
			var root = this;

			/**
			 * The main element.
			 * @type {jQuery}
			 */
			var $main = $(element);

			/**
			 * The list of buttons.
			 * @type {jQuery}
			 */
			var $buttons = $main.children();

			/**
			 * The list of buttons.
			 * @type {Array}
			 */
			var list = [];

			/**
			 * If the bar is currently visible.
			 * @type {Boolean}
			 */
			var isVisible = true;

			/**
			 * Next button margins.
			 * @type {Array}
			 * @property
			 */
			this.nextMargins = [];

			/**
			 * The currently open subbar.
			 * @type {jQuery}
			 * @property
			 */
			this.curSub = null;


			/**
			 * Initializes the function.
			 * @constructor
			 */
			function init() {
				build();
			}

			/**
			 * Builds the bar.
			 */
			function build() {
				if (settings.position[0] === "right") {
					$main.addClass("sb-right");
				}

				if (settings.buttonShape !== "square") {
					$main.addClass("sb-" + settings.buttonShape);
				}

				if (settings.labelConnected) {
					$main.addClass("sb-connected");
				}

				if (settings.buttonColor !== "default" && settings.buttonColor !== "custom") {
					$main.addClass("sb-" + settings.buttonColor + "-button");
				}
				if (settings.buttonOverColor !== "default" && settings.buttonOverColor !== "custom") {
					$main.addClass("sb-" + settings.buttonOverColor + "-button-over");
				}

				if (settings.iconColor !== "default" && settings.iconColor !== "custom") {
					$main.addClass("sb-" + settings.iconColor + "-icon");
				}
				if (settings.iconOverColor !== "default" && settings.iconOverColor !== "custom") {
					$main.addClass("sb-" + settings.iconOverColor + "-icon-over");
				}

				if (settings.labelColor !== "default" && settings.labelColor !== "custom") {
					$main.addClass("sb-" + settings.labelColor + "-label");
				}
				if (settings.labelTextColor !== "default" && settings.labelTextColor !== "custom") {
					$main.addClass("sb-" + settings.labelTextColor + "-label-text");
				}
				
				if (settings.sideSpace) {
					$main.addClass("sb-side-space");
				}
				if (settings.buttonSpace) {
					$main.addClass("sb-button-space");
				}
				if (settings.labelSpace) {
					$main.addClass("sb-label-space");
				}

				$main.addClass("sb-css-anim");

				$buttons.each(function(ind) {
					var $button = $buttons.eq(ind);

					if ($button.hasClass("sb-sub")) {
						list[ind] = new Subbar(
							$button[0],
							ind,
							$buttons.eq(ind + 1),
							getInt($buttons.eq(0).css("margin-bottom")),
							getInt($main.css("margin-top"))
						);
					} else {
						list[ind] = new Button($button[0]);
					}

					root.nextMargins[ind] = getInt($button.css("margin-top"));
				});

				if (settings.showAfterPosition) {
					if ($window.scrollTop() < settings.showAfterPosition) {
						$main.css("opacity", 0).addClass("sb-hide");
						isVisible = false;
					}

					$window.on("scroll", setBarVisibility);
				}
			}

			/**
			 * Positions the bar.
			 * @method
			 */
			this.position = function() {
				posObject($main, settings.position, settings.offset);
			};

			/**
			 * Shows or hides the bar based on the scroll position.
			 */
			function setBarVisibility() {
				if ($window.scrollTop() < settings.showAfterPosition) {
					if (isVisible) {
						hide();
					}
				} else {
					if (!isVisible) {
						show();
					}
				}
			}

			/**
			 * Shows the bar.
			 */
			function show() {
				$main.removeClass("sb-hide");
			
				stopAnimate($main);
				animate($main, {"opacity": 1}, settings.barAnimate.show[0], settings.barAnimate.show[1]);

				isVisible = true;
			}

			/**
			 * Hides the bar.
			 */
			function hide() {
				stopAnimate($main);
				animate($main, {"opacity": 0}, settings.barAnimate.show[0], settings.barAnimate.show[1], function() {
					$main.addClass("sb-hide");
				});

				isVisible = false;
			}

			/**
			 * Returns the main bar element.
			 * @return {jQuery} The main element.
			 * @method
			 */
			this.getMain = function() {
				return $main;
			};

			/**
			 * Destroys the bar.
			 * Removes everything that was created in the build() function.
			 * @method
			 */
			this.destroy = function() {
				var i, n;

				$main.attr("class", "sb-bar").removeAttr("style");

				n = list.length;
				for (i = 0; i < n; i++) {
					list[i].destroy();
				}

				if (settings.showAfterPosition) {
					$window.off("scroll", setBarVisibility);
				}
			};

			// Initializes the function.
			init();
		}

		/**
		 * The function of a subbar.
		 * @param {Element} element - The main HTML element.
		 * @param {Number} index - The order index.
		 * @param {jQuery} $nextButton - The button next to the subbar.
		 * @param {Number} buttonMargin - The bottom margin of a button.
		 * @param {Number} topMargin - The top margin of the bar.
		 */
		function Subbar(element, index, $nextButton, buttonMargin, topMargin) {

			/**
			 * The HTML code used to create the hit area element.
			 * @type {String}
			 */
			var HIT_HTML = '<div class="sb-subhit"></div>';

			/**
			 * The current function instance.
			 * @type {Subbar}
			 */
			var root = this;

			/**
			 * The main element.
			 * @type {jQuery}
			 */
			var $main = $(element);

			/**
			 * The icon element.
			 * @type {jQuery}
			 */
			var $icon = $main.children(".sb-icon");

			/**
			 * The subbar element.
			 * @type {jQuery}
			 */
			var $subbar = $main.children(".sb-subbar");

			/**
			 * The list of buttons.
			 * @type {jQuery}
			 */
			var $buttons = $subbar.children();

			/**
			 * The hit area element.
			 * @type {jQuery}
			 */
			var $hit = null;

			/**
			 * The list of buttons.
			 * @type {Array}
			 */
			var list = [];

			/**
			 * The subbar position.
			 * @type {String}
			 */
			var position = settings.subPosition[0];

			/**
			 * The subbar effect.
			 * @type {String}
			 */
			var effect = settings.subEffect[0];

			/**
			 * The side on which the sidebar is on, either left or right.
			 * @type {String}
			 */
			var side = isOnRight ? "right" : "left";

			/**
			 * The number of buttons.
			 * @type {Number}
			 */
			var total = $buttons.length;

			/**
			 * The width of the icon.
			 * @type {Number}
			 */
			var iconWidth = getInt($icon.css("width"));

			/**
			 * The height of the icon.
			 * @type {Number}
			 */
			var iconHeight = getInt($icon.css("height"));

			/**
			 * The positions of the buttons when open.
			 * @type {Array}
			 */
			var positions = [];

			/**
			 * If the subbar is currently open.
			 * @type {Boolean}
			 */
			var isOpen = false;

			/**
			 * The offset before the subbar.
			 * @type {Number}
			 */
			var prevOffset = 0;

			/**
			 * The offset after the subbar.
			 * @type {Number}
			 */
			var nextOffset = 0;

			/**
			 * The top margin of the bar.
			 * @type {Number}
			 */
			var barMargin;

			/**
			 * Properties at the start of the animation.
			 * @type {Object}
			 */
			var startProps = {};

			/**
			 * Properties of the list when it is showing.
			 * @type {Object}
			 */
			var showProps = {};

			/**
			 * The status of the effect, either "show" or "hide".
			 * @type {String}
			 */
			var effectStatus;

			/**
			 * The step interval for the effect.
			 * @type {Number}
			 */
			var effectInterval;


			/**
			 * Initializes the function.
			 * @constructor
			 */
			function init() {
				build();
			}

			/**
			 * Builds the subbar.
			 */
			function build() {
				if (position === "side") {
					$main.addClass("sb-side");
				}

				if (settings.subSpace) {
					$main.addClass("sb-sub-space");
				}

				if (effect === "linear-slide" || position === "circular") {
					$main.addClass("sb-posabs");
				}

				$subbar.addClass("sb-hide");

				if ((position === "under" && effect === "linear-slide") ||
					(position === "circular" && effect === "slide") ||
					(position === "circular" && effect === "linear-slide")) {
					$buttons.each(function(ind) {
						$buttons.eq(ind).css("z-index", 100 - ind);
					});
				}

				$buttons.each(function(ind) {
					var $button = $buttons.eq(ind);

					if ($button.hasClass("sb-sub")) {
						list[ind] = new Subbar($button[0], ind);
					} else {
						list[ind] = new Button($button[0]);
					}
				});

				if (position === "circular") {
					$main.addClass("sb-circular");

					var radius = settings.subPosition[1];
					var startAngle = settings.subPosition[2];
					var endAngle = settings.subPosition[3];
					var startRad = startAngle * Math.PI / 180;
					var endRad = endAngle * Math.PI / 180;
					var stepRad = (endRad - startRad) / (total - 1);
					
					$buttons.each(function(ind) {
						var angle, leftright, top, props;

						angle = ind * stepRad + startRad;
						leftright = Math.round(radius * Math.cos(angle));
						top = Math.round(radius * Math.sin(angle));

						props = {top: top};
						props[side] = leftright;
						$buttons.eq(ind).css(props);
						positions[ind] = [leftright, top];
					});

					$hit = $(HIT_HTML).appendTo($main);
					$hit.css({
						width: radius + iconWidth,
						height: 2 * radius + iconWidth,
						"border-radius": isOnRight ? radius + "px 0 0 " + radius + "px" : "0 " + radius + "px " + radius + "px 0",
						top: -radius
					});

					if (index !== 0) {
						prevOffset = radius + buttonMargin;
						barMargin = topMargin;
						$main.css("margin-top", buttonMargin);
					}

					if ($nextButton) {
						nextOffset = radius + buttonMargin;
					}
				} else {
					if (effect === "linear-slide") {
						var counter = 0;
						$buttons.each(function(ind) {
							var $button = $(this);
							$button.css("top", counter);
							positions[ind] = counter;
							counter += getInt($button.css("height")) + getInt($button.css("margin-bottom"));
						});

						$subbar.css({width: iconWidth, height: counter});
					}

					$hit = $(HIT_HTML).appendTo($main);
					if (position === "side") {
						$hit.css({width: iconWidth + getInt($subbar.css("margin-" + side)), height: iconHeight});
					} else {
						$hit.css({width: iconWidth, height: iconHeight + getInt($subbar.css("margin-top"))});
					}

					if (position === "under" && $nextButton) {
						nextOffset = $subbar.outerHeight(true) + getInt($nextButton.css("margin-top")) + getInt($subbar.css("margin-top"));
					}
				}

				switch (effect) {
					case "fade":
						startProps = {opacity: 0};
						showProps = {opacity: 1};

						$subbar.css(startProps);

						break;
					case "linear-fade":
						startProps = {opacity: 0};
						showProps = {opacity: 1};

						$buttons.css(startProps);

						break;
					case "slide":
						if (position === "circular") {
							startProps = {top: 0, opacity: 0};
							startProps[side] = 0;
							$buttons.css(startProps);
						} else {
							if (position === "side") {
								startProps[side] = 0;
								showProps[side] = iconWidth;
							} else {
								startProps = {top: 0};
								showProps = {top: 42};
							}
							startProps["opacity"] = 0;
							showProps["opacity"] = 1;

							$subbar.css(startProps);
						}

						break;
					case "linear-slide":
						if (position === "side") {
							startProps[side] = -iconWidth;
						} else if (position === "circular") {
							startProps = {top: 0};
							startProps[side] = 0;
						} else {
							startProps = {top: -iconHeight};
						}
						startProps["opacity"] = 0;

						$buttons.css(startProps);

						break;
					case "none":
					default:
						break;
				}

				if (settings.subOpen === "click") {
					$icon.on("click", function(event) {
						if (isOpen) {
							root.close();
						} else {
							if (main.bar.curSub) {
								main.bar.curSub.close();
							}
							root.open();
						}
						event.stopPropagation();
					});
				} else {
					$main.on("mouseenter", root.open);
					$main.on("mouseleave", root.close);
				}
			}

			/**
			 * Open the subbar.
			 * @method
			 */
			this.open = function() {
				var $bar;
				var time = settings.subAnimate.show[0];
				var ease = settings.subAnimate.show[1];

				showButtons();

				if ($hit) {
					$hit.addClass("sb-show");
				}

				if (prevOffset) {
					$bar = main.bar.getMain();
					stopAnimate($bar);
					animate($bar, {"margin-top": barMargin - prevOffset + buttonMargin}, time, ease);
					
					stopAnimate($main);
					animate($main, {"margin-top": prevOffset}, time, ease);
				}

				if (nextOffset) {
					stopAnimate($nextButton);
					animate($nextButton, {"margin-top": nextOffset}, time, ease);
				}

				main.bar.curSub = $main;

				isOpen = true;

				if (settings.subOpen === "click") {
					$document.on("click", maybeClose);
				}
			};

			/**
			 * Close the subbar.
			 * @method
			 */
			this.close = function() {
				var $bar;
				var time = settings.subAnimate.hide[0];
				var ease = settings.subAnimate.hide[1];

				hideButtons();
				
				if ($hit) {
					$hit.removeClass("sb-show");
				}

				if (prevOffset) {
					$bar = main.bar.getMain();
					stopAnimate($bar);
					animate($bar, {"margin-top": barMargin}, time, ease);
					
					stopAnimate($main);
					animate($main, {"margin-top": buttonMargin}, time, ease);
				}

				if (nextOffset) {
					stopAnimate($nextButton);
					animate($nextButton, {"margin-top": main.bar.nextMargins[index + 1]}, time, ease);
				}

				main.bar.curSub = null;

				isOpen = false;

				if (settings.subOpen === "click") {
					$document.off("click", maybeClose);
				}
			};

			/**
			 * Closes the subbar if there is an outside click.
			 * @param {Event} event - The document click event.
			 */
			function maybeClose(event) {
				if (isOpen && !main.overlay.isOpen && !$(event.target).closest($main).length) {
					close();
				}
			}

			/**
			 * Shows the buttons.
			 */
			function showButtons() {
				var time = settings.subAnimate.show[0];
				var ease = settings.subAnimate.show[1];
				var counter;

				switch (effect) {
					case "fade":
						stopAnimate($subbar);
						$subbar.removeClass("sb-hide");
						animate($subbar, showProps, time, ease);

						break;
					case "linear-fade":
						effectStatus = "show";
						$subbar.removeClass("sb-hide");
						stopInterval();
						counter = 0;

						effectInterval = setInterval(function() {
							var $button = $buttons.eq(counter);

							stopAnimate($button);
							animate($button, showProps, time, ease);

							if (counter === total - 1) {
								stopInterval();
							} else {
								counter++;
							}
						}, settings.subEffect[1]);

						break;
					case "slide":
						if (position === "circular") {
							$subbar.removeClass("sb-hide");
							$buttons.each(function(ind) {
								var $button = $buttons.eq(ind);

								showProps = {top: positions[ind][1], opacity: 1};
								showProps[side] = positions[ind][0];
								
								stopAnimate($button);
								animate($button, showProps, time, ease);
							});
						} else {
							stopAnimate($subbar);
							$subbar.removeClass("sb-hide");
							animate($subbar, showProps, time, ease);
						}

						break;
					case "linear-slide":
						effectStatus = "show";
						$subbar.removeClass("sb-hide");
						stopInterval();
						counter = 0;

						effectInterval = setInterval(function() {
							var $button = $buttons.eq(counter);

							if (position === "side") {
								showProps[side] = 0;
							} else if (position === "circular") {
								showProps = {top: positions[counter][1]};
								showProps[side] = positions[counter][0];
							} else {
								showProps = {top: positions[counter]};
							}
							showProps["opacity"] = 1;

							stopAnimate($button);
							animate($button, showProps, time, ease);

							if (counter === total - 1) {
								stopInterval();
							} else {
								counter++;
							}
						}, settings.subEffect[1]);

						break;
					case "none":
					default:
						$subbar.removeClass("sb-hide");

						break;
				}
			};

			/**
			 * Hides the buttons.
			 */
			function hideButtons() {
				var time = settings.subAnimate.hide[0];
				var ease = settings.subAnimate.hide[1];
				var counter;

				switch (effect) {
					case "fade":
						stopAnimate($subbar);
						animate($subbar, startProps, time, ease, function() {
							$subbar.addClass("sb-hide");
						});

						break;
					case "linear-fade":
						effectStatus = "hide";
						stopInterval();
						counter = total - 1;

						effectInterval = setInterval(function() {
							var $button = $buttons.eq(counter);
							var ind = counter;

							stopAnimate($button);
							animate($button, startProps, time, ease, function() {
								if (effectStatus === "hide" && ind === 0) {
									$subbar.addClass("sb-hide");
								}
							});

							if (counter === 0) {
								stopInterval();
							} else {
								counter--;
							}
						}, settings.subEffect[1]);

						break;
					case "slide":
						if (position === "circular") {
							$buttons.each(function(ind) {
								var $button = $buttons.eq(ind);

								stopAnimate($button);
								animate($button, startProps, time, ease, function() {
									if (ind === total - 1) {
										$subbar.addClass("sb-hide");
									}
								});
							});
						} else {
							stopAnimate($subbar);
							animate($subbar, startProps, time, ease, function() {
								$subbar.addClass("sb-hide");
							});
						}

						break;
					case "linear-slide":
						var first, last, step;

						effectStatus = "hide";

						if (position === "side" || position === "circular") {
							first = 0;
							last = total - 1;
							step = 1;
						} else {
							first = total - 1;
							last = 0;
							step = -1;
						}
						
						stopInterval();
						counter = first;

						effectInterval = setInterval(function() {
							var $button = $buttons.eq(counter);
							var ind = counter;
							
							stopAnimate($button);
							animate($button, startProps, time, ease, function() {
								if (effectStatus === "hide" && ind === last) {
									$subbar.addClass("sb-hide");
								}
							});

							if (counter === last) {
								stopInterval();
							} else {
								counter += step;
							}
						}, settings.subEffect[1]);

						break;
					case "none":
					default:
						$subbar.addClass("sb-hide");

						break;
				}
			};

			/**
			 * Clears the interval for linear effects.
			 */
			function stopInterval() {
				clearInterval(effectInterval);
			}

			/**
			 * Destroys the subbar.
			 * Removes everything that was created in the build() function.
			 * @method
			 */
			this.destroy = function() {
				var i, n;

				$main.removeClass("sb-side sb-circular sb-sub-space sb-posabs");
				$main.removeAttr("style");

				$subbar.removeClass("sb-hide");
				$subbar.removeAttr("style");

				$buttons.removeAttr("style");

				n = list.length;
				for (i = 0; i < n; i++) {
					list[i].destroy();
				}

				$main.children(".sb-subhit").remove();

				$main.off("mouseenter mouseleave");

				$icon.off("click");
			};

			// Initializes the function.
			init();
		}

		/**
		 * The function of a button.
		 * @param {Element} element - The main HTML element.
		 */
		function Button(element) {

			/**
			 * The HTML code used to create the mask element.
			 * @type {String}
			 */
			var MASK_HTML = '<div class="sb-mask"></div>';

			/**
			 * The HTML code used to create the hit area element.
			 * @type {String}
			 */
			var HIT_HTML = '<div class="sb-hit"></div>';

			/**
			 * The distance at which the label begins the animation (in px).
			 * @type {Number}
			 */
			var LABEL_DIST = 40;

			/**
			 * The current function instance.
			 * @type {Button}
			 */
			var root = this;

			/**
			 * The main element.
			 * @type {jQuery}
			 */
			var $main = $(element);

			/**
			 * The button anchor element.
			 * @type {jQuery}
			 */
			var $link = $main.children("a");

			/**
			 * The button icon element.
			 * @type {jQuery}
			 */
			var $icon = $link.children(".sb-icon");

			/**
			 * The button label element.
			 * @type {jQuery}
			 */
			var $label = $link.children(".sb-label");

			/**
			 * The button mask element.
			 * @type {jQuery}
			 */
			var $mask = null;

			/**
			 * The button hit area element.
			 * @type {jQuery}
			 */
			var $hit = null;

			/**
			 * The side on which the sidebar is on, either left or right.
			 * @type {String}
			 */
			var side = isOnRight ? "right" : "left";

			/**
			 * If to disable the mask when animations are not being performed.
			 * @type {Boolean}
			 */
			var disableMask = false;

			/**
			 * The width of the icon.
			 * @type {Number}
			 */
			var iconWidth;

			/**
			 * The with of the label.
			 * @type {Number}
			 */
			var labelWidth;

			/**
			 * The properties of the label at the start of the animation.
			 * @type {Object}
			 */
			var startProps = {};

			/**
			 * The properties of the label when it is showing.
			 * @type {Object}
			 */
			var showProps = {};

			/**
			 * The properties of the label at the end of the animation.
			 * @type {Object}
			 */
			var endProps = {};


			/**
			 * Initializes the function.
			 * @constructor
			 */
			function init() {
				build();
			}

			/**
			 * Builds the button.
			 */
			function build() {
				if (settings.labelEnabled && $label.length) {
					iconWidth = getInt($icon.css("width"));
					labelWidth = $label.outerWidth(true);

					if (settings.buttonShape === "round" || settings.buttonShape === "rounded") {
						disableMask = true;
					}

					if (!settings.labelConnected && (settings.labelSpace || settings.buttonShape === "round" || settings.buttonShape === "rounded" || settings.buttonShape === "rounded-out")) {
						$hit = $(HIT_HTML).appendTo($link);
					}

					switch (settings.labelEffect) {
						case "fade":
							startProps = {opacity: 0};
							showProps = {opacity: 1};

							$label.css(startProps);

							break;
						case "slide-out":
							$mask = $link.wrap(MASK_HTML).parent();
							$mask.css("width", iconWidth);
							if (disableMask) {
								$mask.addClass("sb-off");
							}

							startProps[side] = -labelWidth + iconWidth;
							if (settings.labelConnected) {
								showProps[side] = 0;
							} else {
								showProps[side] = iconWidth;
							}

							$label.css(startProps);

							break;
						case "slide-out-fade":
							$mask = $link.wrap(MASK_HTML).parent();
							$mask.css("width", iconWidth);
							if (disableMask) {
								$mask.addClass("sb-off");
							}

							startProps[side] = -labelWidth + iconWidth;
							startProps["opacity"] = 0;
							
							if (settings.labelConnected) {
								showProps[side] = 0;
							} else {
								showProps[side] = iconWidth;
							}
							showProps["opacity"] = 1;

							$label.css(startProps);

							break;
						case "slide-in":
							startProps[side] = iconWidth + LABEL_DIST;
							startProps["opacity"] = 0;

							showProps[side] = iconWidth;
							showProps["opacity"] = 1;

							$label.css(startProps);

							break;
						case "slide-out-out":
							$mask = $link.wrap(MASK_HTML).parent();
							$mask.css("width", iconWidth);
							if (disableMask) {
								$mask.addClass("sb-off");
							}

							startProps[side] = -labelWidth + iconWidth;
							startProps["opacity"] = 0;
							
							showProps[side] = iconWidth;
							showProps["opacity"] = 1;
							
							endProps[side] = iconWidth + LABEL_DIST;
							endProps["opacity"] = 0;

							break;
						case "slide-in-in":
							$mask = $link.wrap(MASK_HTML).parent();
							$mask.css("width", iconWidth);
							if (disableMask) {
								$mask.addClass("sb-off");
							}

							startProps[side] = iconWidth + LABEL_DIST;
							startProps["opacity"] = 0;

							showProps[side] = iconWidth;
							showProps["opacity"] = 1;

							endProps[side] = -labelWidth + iconWidth;
							endProps["opacity"] = 0;

							break;
						case "none":
						default:
							break;
					}

					$link.on("mouseenter", showLabel);
					$link.on("mouseleave", hideLabel);
				}

				var shareVal;
				var shareData;
				var shareUrl;
				var shareTarget;
				var linkHref;
				var targetUrl;
				var targetTitle;

				shareVal = $link.data("share");

				if (shareVal) {
					shareData = settings.shareServices[shareVal];

					if (shareData) {
						if (shareData.type === "file") {
							$link.on("click", function(event) {
								openShareFile(shareData.url);
								event.preventDefault();
							});
						} else {
							targetUrl = isset(settings.shareUrl) ? settings.shareUrl : PAGE_URL;
							targetTitle = isset(settings.shareTitle) ? settings.shareTitle : PAGE_TITLE;

							shareUrl = shareData.url.replace("{URL}", targetUrl)
													.replace("{TITLE}", targetTitle);
							
							$link.attr("href", shareUrl);

							if (shareData.type === "app") {
								$link.attr("target", "_self");
							} else {
								if (settings.shareTarget === "default") {
									shareTarget = shareData.type;
								} else {
									shareTarget = settings.shareTarget;
								}

								if (shareTarget === "popup") {
									$link.on("click", function(event) {
										openSharePopup(shareUrl, shareData.window);
										event.preventDefault();
									});
								} else {
									$link.attr("target", "_blank");
								}
							}
						}
					} else {
						log('There is no share data for "' + shareVal + '".', "warn");
					}
				} else {
					linkHref = $link.attr("href");

					if (linkHref && linkHref.charAt(0) === "#" && linkHref !== "#") {
						$link.on("click", function() {
							main.overlay.open(linkHref);
							return false;
						});
					}
				}
			}

			/**
			 * Shows the button label.
			 */
			function showLabel() {
				var time = settings.labelAnimate.show[0];
				var ease = settings.labelAnimate.show[1];

				switch (settings.labelEffect) {
					case "fade":
						if ($hit) {
							$hit.addClass("sb-show");
						}
							
						stopAnimate($label);
						$label.addClass("sb-show");
						animate($label, showProps, time, ease);

						break;
					case "slide-out":
						$mask.css("width", iconWidth + labelWidth);
						if (disableMask) {
							$mask.removeClass("sb-off");
						}
						if ($hit) {
							$hit.addClass("sb-show");
						}
						
						stopAnimate($label);
						$label.addClass("sb-show");
						animate($label, showProps, time, ease);

						break;
					case "slide-out-fade":
						$mask.css("width", iconWidth + labelWidth);
						if (disableMask) {
							$mask.removeClass("sb-off");
						}
						if ($hit) {
							$hit.addClass("sb-show");
						}
						
						stopAnimate($label);
						$label.addClass("sb-show");
						animate($label, showProps, time, ease);

						break;
					case "slide-in":
						if ($hit) {
							$hit.addClass("sb-show");
						}

						stopAnimate($label);
						$label.addClass("sb-show");
						animate($label, showProps, time, ease);

						break;
					case "slide-out-out":
						$mask.css("width", iconWidth + labelWidth + LABEL_DIST);
						if (disableMask) {
							$mask.removeClass("sb-off");
						}
						if ($hit) {
							$hit.addClass("sb-show");
						}

						stopAnimate($label);
						$label.css(startProps).addClass("sb-show");
						animate($label, showProps, time, ease, function() {
							$mask.css("width", iconWidth + labelWidth);
						});

						break;
					case "slide-in-in":
						$mask.css("width", iconWidth + labelWidth + LABEL_DIST);
						if (disableMask) {
							$mask.removeClass("sb-off");
						}
						if ($hit) {
							$hit.addClass("sb-show");
						}

						stopAnimate($label);
						$label.css(startProps).addClass("sb-show");
						animate($label, showProps, time, ease, function() {
							$mask.css("width", iconWidth + labelWidth);
						});

						break;
					case "none":
					default:
						if ($hit) {
							$hit.addClass("sb-show");
						}
						$label.addClass("sb-show");

						break;
				}
			}

			/**
			 * Hides the button label.
			 */
			function hideLabel() {
				var time = settings.labelAnimate.hide[0];
				var ease = settings.labelAnimate.hide[1];

				switch (settings.labelEffect) {
					case "fade":
						stopAnimate($label);
						animate($label, startProps, time, ease, function() {
							$label.removeClass("sb-show");
							if ($hit) {
								$hit.removeClass("sb-show");
							}
						});

						break;
					case "slide-out":
						stopAnimate($label);
						animate($label, startProps, time, ease, function() {
							$label.removeClass("sb-show");
							$mask.css("width", iconWidth);
							if (disableMask) {
								$mask.addClass("sb-off");
							}
							if ($hit) {
								$hit.removeClass("sb-show");
							}
						});

						break;
					case "slide-out-fade":
						stopAnimate($label);
						animate($label, startProps, time, ease, function() {
							$label.removeClass("sb-show");
							$mask.css("width", iconWidth);
							if (disableMask) {
								$mask.addClass("sb-off");
							}
							if ($hit) {
								$hit.removeClass("sb-show");
							}
						});

						break;
					case "slide-in":
						stopAnimate($label);
						animate($label, startProps, time, ease, function() {
							$label.removeClass("sb-show");
							if ($hit) {
								$hit.removeClass("sb-show");
							}
						});

						break;
					case "slide-out-out":
						$mask.css("width", iconWidth + labelWidth + LABEL_DIST);
						stopAnimate($label);
						animate($label, endProps, time, ease, function() {
							$label.removeClass("sb-show");
							$mask.css("width", iconWidth);
							if (disableMask) {
								$mask.addClass("sb-off");
							}
							if ($hit) {
								$hit.removeClass("sb-show");
							}
						});

						break;
					case "slide-in-in":
						$mask.css("width", iconWidth + labelWidth + LABEL_DIST);
						stopAnimate($label);
						animate($label, endProps, time, ease, function() {
							$label.removeClass("sb-show");
							$mask.css("width", iconWidth);
							if (disableMask) {
								$mask.addClass("sb-off");
							}
							if ($hit) {
								$hit.removeClass("sb-show");
							}
						});

						break;
					case "none":
					default:
						$label.removeClass("sb-show");
						if ($hit) {
							$hit.removeClass("sb-show");
						}

						break;
				}
			}

			/**
			 * Opens a share popup window.
			 * @param {String} url - The window URL.
			 * @param {Object} params - The window params.
			 */
			function openSharePopup(url, params) {
				var winTop, winLeft;
				var winParams;

				if (params.top === "{CENTER}") {
					winTop = (screen.height - params.height) / 2;
				} else {
					winTop = params.top;
				}

				if (params.left === "{CENTER}") {
					winLeft = (screen.width - params.width) / 2;
				} else {
					winLeft = params.left;
				}
				
				winParams = "menubar=no,toolbar=no,location=no,scrollbars=no,status=no,resizable=yes,width=" + params.width + ",height=" + params.height + ",top=" + winTop + ",left=" + winLeft;

				window.open(url, "sbShareWindow", winParams);
			}

			/**
			 * Adds a JS file to the page, for the file share type.
			 * @param {String} url - The file URL.
			 */
			function openShareFile(url) {
				$pageBody.append('<script src="' + url + '" type="text/javascript"></script>');
			}

			/**
			 * Destroys the button.
			 * Removes everything that was created in the build() function.
			 * @method
			 */
			this.destroy = function() {
				if ($link.data("share")) {
					$link.removeAttr("href target");
				}

				if ($hit) {
					$hit.remove();
				}

				if ($mask.length) {
					$link.unwrap();
				}

				$label.removeAttr("style");

				$link.off("mouseenter mouseleave click");
			};

			// Initializes the function.
			init();
		}

		/**
		 * The function of the overlay.
		 * @param {Element} element - The main HTML element.
		 */
		function Overlay(element) {

			/**
			 * The current function instance.
			 * @type {Overlay}
			 */
			var root = this;

			/**
			 * The main element.
			 * @type {jQuery}
			 */
			var $main = $(element);

			/**
			 * The overlay shadow.
			 * @type {jQuery}
			 */
			var $shadow = $main.children(".sb-shadow");

			/**
			 * The list of windows.
			 * @type {jQuery}
			 */
			var $windows = $main.children(".sb-window");

			/**
			 * The list of windows.
			 * @type {Array}
			 */
			var list = [];

			/**
			 * The currently open window.
			 * @type {Window}
			 */
			var curWindow = null;

			/**
			 * If the overlay is currently open.
			 * @type {Boolean}
			 * @property
			 */
			this.isOpen = false;


			/**
			 * Initializes the function.
			 * @constructor
			 */
			function init() {
				build();
			}

			/**
			 * Builds the overlay.
			 */
			function build() {
				if (settings.windowCorners === "round") {
					$main.addClass("sb-round");
				}

				if (settings.windowColor !== "default" && settings.windowColor !== "custom") {
					$main.addClass("sb-" + settings.windowColor);
				}

				if (settings.windowShadow) {
					$main.addClass("sb-winshadow");
				}

				$shadow.on("click", root.close);

				$windows.each(function(ind) {
					var id = $windows.eq(ind).attr("id");
					list[id] = new Window(this);
				});
			}

			/**
			 * Positions the windows.
			 * @method
			 */
			this.position = function() {
				if (curWindow) {
					curWindow.position();
				}
			};

			/**
			 * Opens the overlay.
			 * @param {String} winId - The ID of the window.
			 * @method
			 */
			this.open = function(winId) {
				var name = winId.split("#")[1];

				$main.addClass("sb-show");

				curWindow = list[name];
				curWindow.open();

				root.isOpen = true;
			};

			/**
			 * Closes the overlay.
			 * @method
			 */
			this.close = function() {
				$main.removeClass("sb-show");

				if (curWindow) {
					curWindow.close();
					curWindow = null;
				}

				root.isOpen = false;
			};

			/**
			 * Destroys the overlay.
			 * Removes everything that was created in the build() function.
			 * @method
			 */
			this.destroy = function() {
				var i, n;

				$main.attr("class", "sb-overlay");

				$shadow.off("click");

				n = list.length;
				for (i = 0; i < n; i++) {
					list[i].destroy();
				}
			};

			// Initializes the function.
			init();
		}

		/**
		 * The function of an overlay window.
		 * @param {Element} element - The window HTML element.
		 */
		function Window(element) {

			/**
			 * The current function instance.
			 * @type {Window}
			 */
			var root = this;

			/**
			 * The main element.
			 * @type {jQuery}
			 */
			var $main = $(element);

			/**
			 * The close button.
			 * @type {jQuery}
			 */
			var $closeButton = $main.find(".sb-close");

			/**
			 * The form element.
			 * @type {jQuery}
			 */
			var $form = $main.find(".sb-form");

			/**
			 * The page form.
			 * @type {Form}
			 */
			var form = null;

			/**
			 * If the window is currently open.
			 * @type {Boolean}
			 */
			var isOpen = false;


			/**
			 * Initializes the function.
			 * @constructor
			 */
			function init() {
				build();
			}

			/**
			 * Builds the window.
			 */
			function build() {
				$closeButton.on("click", function(event) {
					main.overlay.close();
					event.stopPropagation();
				});

				if ($form.length) {
					form = new Form($form[0]);
				}

				if (settings.windowDraggable) {
					$main.sbDraggable({
						handle: ".sb-head"
					});
				}
			}

			/**
			 * Positions the window.
			 * @method
			 */
			this.position = function() {
				var pos, off;

				if ($main.data("position")) {
					pos = $main.data("position").split("-");
					if (!pos[1]) {
						pos[1] = defaults.windowPosition[1];
					}
				} else {
					pos = settings.windowPosition;
				}

				if ($main.data("offset")) {
					off = splitOffset($main.data("offset"));
				} else {
					off = settings.windowOffset;
				}

				posObject($main, pos, off);
			};

			/**
			 * Opens the window.
			 * @method
			 */
			this.open = function() {
				$main.addClass("sb-show");

				root.position();

				isOpen = true;
			};

			/**
			 * Closes the window.
			 * @method
			 */
			this.close = function() {
				$main.removeClass("sb-show");

				isOpen = false;
			};

			/**
			 * Destroys the window.
			 * Removes everything that was created in the build() function.
			 * @method
			 */
			this.destroy = function() {
				$main.removeClass("sb-show").removeAttr("style");

				$closeButton.off("click");

				if (form) {
					form.destroy();
				}
			};

			// Initializes the function.
			init();
		}

		/**
		 * The function of a form.
		 * @param {Element} element - The form HTML element.
		 */
		function Form(element) {

			/**
			 * The HTML code used to create the icon element.
			 * @type {String}
			 */
			var ICON_HTML = '<div class="sb-sicon"></div>';

			/**
			 * The HTML code used to create the message element.
			 * @type {String}
			 */
			var MESSAGE_HTML = ' <div class="sb-message"></div>';

			/**
			 * The current function instance.
			 * @type {Form}
			 */
			var root = this;

			/**
			 * The main element.
			 * @type {jQuery}
			 */
			var $main = $(element);

			/**
			 * The list of fields.
			 * @type {jQuery}
			 */
			var $fields = $main.find("input, textarea, select");

			/**
			 * The status element.
			 * @type {jQuery}
			 */
			var $status = $main.find(".sb-status");

			/**
			 * The status icon element.
			 * @type {jQuery}
			 */
			var $statusIcon;

			/**
			 * The status message element.
			 * @type {jQuery}
			 */
			var $statusMessage;

			/**
			 * The form ID.
			 * @type {String}
			 */
			var formId = $main.data("id");

			/**
			 * The submit button.
			 * @type {jQuery}
			 */
			var $submitButton = $main.find(".sb-submit");

			/**
			 * Settings for this specific form.
			 * @type {Object}
			 */
			var formData;

			/**
			 * The name of the status class.
			 * @type {String}
			 */
			var statusClass = null;

			/**
			 * If the form is currently processing.
			 * @type {Boolean}
			 */
			var working = false;


			/**
			 * Initializes the function.
			 * @constructor
			 */
			function init() {
				build();
			}

			/**
			 * Builds the form.
			 */
			function build() {
				if (formId && settings.formData && settings.formData[formId]) {
					formData = settings.formData[formId];
					formData.status = $.extend({}, formMessages, formData.status);
				} else {
					formData = {status: formMessages};
				}

				$statusIcon = $(ICON_HTML);
				$status.append($statusIcon);

				$statusMessage = $(MESSAGE_HTML);
				$status.append($statusMessage);

				$submitButton.on("click", trySubmit);

				$main.on("submit", function(event) {
					trySubmit();
					event.preventDefault();
				});
			}

			/**
			 * Attempts to submit the form.
			 */
			function trySubmit() {
				if (!working) {
					validate();
				}
			}

			/**
			 * Validates the form.
			 */
			function validate() {
				var valid = true;
				var error = null;

				$fields.each(function() {
					var $field = $(this);
					var fvalid = true;
					
					if ($field.attr("required") && $field.val() === "") {
						valid = fvalid = false;
						if (!error) {
							error = "empty";
						}
					}

					if ($field.attr("name") === "email" && !validateEmail($field.val())) {
						valid = fvalid = false;
						if (!error) {
							error = "badEmail";
						}
					}

					if (!fvalid) {
						$field.addClass("sb-fielderror");
						$field.on("focus", function() {
							$(this).removeClass("sb-fielderror").off("focus");
						});
					}
				});

				if (valid) {
					submit();
					showStatus("working");
				} else {
					showStatus(error);
				}
			}

			/**
			 * Submits the form.
			 */
			function submit() {
				var submitData;

				working = true;
				
				submitData = $main.serializeArray();

				if (formData.post) {
					$.each(formData.post, function(key, val) {
						var obj = {};
						obj[key] = val;
						submitData.push(obj);
					});
				}

				$.ajax({
					type: "POST",
					url: $main.attr("action"),
					data: submitData,
					dataType: "json",
					success: function(data) {
						if (data.status) {
							showStatus("success", data.message);
							clear();
						} else {
							showStatus("error", data.message);
						}
						working = false;
					},
					error: function(jqXHR, textStatus, errorThrown) {
						var msg = errorThrown === "Not Found" ? formData.status.noFile : errorThrown;
						showStatus("error", msg);
						working = false;
					}
				});
			}

			/**
			 * Clears the form.
			 */
			function clear() {
				$fields.each(function() {
					$(this).val("");
				});
			}

			/**
			 * Shows a particular status.
			 * @param {String} type - The status type.
			 * @param {String} msg - The status message.
			 */
			function showStatus(type, msg) {
				$status.removeClass(statusClass);
				switch (type) {
					case "empty":
					case "badEmail":
					case "error":
						statusClass = "sb-error";
						break;
					case "working":
						statusClass = "sb-working";
						break;
					case "success":
						statusClass = "sb-success";
						break;
				}
				$status.addClass(statusClass);
				
				if (msg) {
					$statusMessage.text(msg);
				} else {
					$statusMessage.text(formData.status[type]);
				}
				
				$status.addClass("sb-show");
			}

			/**
			 * Destroys the form.
			 * Removes everything that was created in the build() function.
			 * @method
			 */
			this.destroy = function() {
				$fields.removeClass("sb-formerror").off("focus");
				$fields.each(function() {
					$(this).val("");
				});

				$status.attr("class", "sb-status");

				$statusIcon.remove();

				$statusMessage.remove();
				
				$submitButton.off("click");

				$main.off("submit");
			};

			// Initializes the function.
			init();
		}
	}

	/**
	 * Displays a message in the browser console from the plugin.
	 * @param {String} message - The message to be displayed.
	 * @param {String} type - The type of the message: error, warn or log (default);
	 */
	function log(message, type) {
		message = "SuperSidebar: " + message;

		if (window.console) {
			if (type === "error") {
				console.error(message);
			} else if (type === "warn") {
				console.warn(message);
			} else {
				console.log(message);
			}
		}
	}

	/**
	 * The plugin router.
	 * Either creates the plugin or calls a method.
	 * @param {(Object|String)} argument - The settings object or method name.
	 * @return {jQuery|SuperSidebar} The original jQuery object or the plugin instance.
	 */
	$.fn.superSidebar = function(argument) {
		var args = arguments;
		var plugin;

		if (argument === "instance") {
			plugin = this.eq(0).data("superSidebar");

			if (plugin) {
				return plugin;
			} else {
				log("The instance could not be retrieved because the plugin is not instantiated.", "error");
				return this;
			}
		} else {
			this.each(function() {
				var $main = $(this);
				plugin = $main.data("superSidebar");

				if (typeof argument === "object" || !argument) {
					if (plugin) {
						plugin.destroy();
						log("The plugin was already created. It was destroyed and built again.", "warn");
					}
					plugin = new SuperSidebar(this, argument);
					$main.data("superSidebar", plugin);
				} else if (typeof argument === "string") {
					if (plugin) {
						if (plugin[argument] && typeof plugin[argument] === "function") {
							plugin[argument].apply(this, Array.prototype.slice.call(args, 1));
						} else {
							log('The method "' + argument + '" does not exist.', "error");
						}
					} else {
						log('The method "' + argument + '" could not be called because the plugin is not instantiated.', "error");
					}
				} else {
					log("The argument type supplied is not valid.", "error");
				}
			});

			return this;
		}
	};

	/**
	 * jQuery UI easing
	 * http://jqueryui.com
	 */
	(jQuery.effects || (function($, undefined) {
	 
	(function() {

	// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)

	var baseEasings = {};

	$.each( [ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function( i, name ) {
		baseEasings[ name ] = function( p ) {
			return Math.pow( p, i + 2 );
		};
	});

	$.extend( baseEasings, {
		Sine: function ( p ) {
			return 1 - Math.cos( p * Math.PI / 2 );
		},
		Circ: function ( p ) {
			return 1 - Math.sqrt( 1 - p * p );
		},
		Elastic: function( p ) {
			return p === 0 || p === 1 ? p :
				-Math.pow( 2, 8 * (p - 1) ) * Math.sin( ( (p - 1) * 80 - 7.5 ) * Math.PI / 15 );
		},
		Back: function( p ) {
			return p * p * ( 3 * p - 2 );
		},
		Bounce: function ( p ) {
			var pow2,
				bounce = 4;

			while ( p < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
			return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - p, 2 );
		}
	});

	$.each( baseEasings, function( name, easeIn ) {
		$.easing[ "easeIn" + name ] = easeIn;
		$.easing[ "easeOut" + name ] = function( p ) {
			return 1 - easeIn( 1 - p );
		};
		$.easing[ "easeInOut" + name ] = function( p ) {
			return p < 0.5 ?
				easeIn( p * 2 ) / 2 :
				1 - easeIn( p * -2 + 2 ) / 2;
		};
	});

	})();

	})(jQuery));

	/**
	 * Simple draggable using jquery.
	 * https://gist.github.com/yuanchuan/1330150
	 *
	 * Modified name and added props.handle.
	 */
	$.fn.sbDraggable = function(props) {
		var $document = $(document),
			mouse = { update: function(e) {this.x = e.pageX; this.y = e.pageY;} };
	    
		return this.each(function(){
		    var $elem = $(this);
		    var $handle;

		    if (props && props.handle) {
		    	$handle = $elem.find(props.handle);
		    } else {
		    	$handle = $elem;
		    }

		    $handle.bind('mousedown.drag', function(e) {
				mouse.update(e);
				if ( !/^(relative|absolute)$/.test($elem.css('position') ) ) {
					$elem.css('position', 'relative');
				}
				$document.bind('mousemove.drag', function(e) {
					$elem.css({
						left: (parseInt($elem.css('left'))||0) + (e.pageX - mouse.x) + 'px',
						top: (parseInt($elem.css('top'))||0) +  (e.pageY - mouse.y) + 'px'
					});
					mouse.update(e);
					e.preventDefault();
				});
				$document.one('mouseup.drag', function(e) {
					$document.unbind('mousemove.drag');
				});
				e.preventDefault();
		    });  
		});
	};
	
})(jQuery);