(function( ng, app ){

	"use strict";

	app.controller(
		"AppController",
		function( $scope, $route, $routeParams, $location, requestContext ) {


			// --- Define Controller Methods. ------------------- //


			// I check to see if the given route is a valid route; or, is the route being
			// re-directed to the default route (due to failure to match pattern).
			function isRouteRedirect( route ) {

				// If there is no action, then the route is redirection from an unknown 
				// route to a known route.
				return( ! route.current.action );

			}


			// --- Define Scope Methods. ------------------------ //


			// I update the title tag.
			$scope.setWindowTitle = function( title ) {

				$scope.windowTitle = title;

			};


			// --- Define Controller Variables. ----------------- //


			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext()

			
			// --- Define Scope Variables. ---------------------- //


			// Set up the default window title.
			$scope.windowTitle = "Adopt-A-Pet";

			// The subview indicates which view is going to be rendered on the page.
			$scope.subview = renderContext.getNextSection();
			

			// --- Bind To Scope Events. ------------------------ //


			// I handle changes to the request context.
			$scope.$on(
				"requestContextChanged",
				function() {

					// Make sure this change is relevant to this controller.
					if ( ! renderContext.isChangeRelevant() ) {

						return;

					}

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();

				}
			);


			// Listen for route changes so that we can trigger request-context change events.
			$scope.$on( 
				"$routeChangeSuccess",
				function( event ) {

					// If this is a redirect directive, then there's no taction to be taken.
					if ( isRouteRedirect( $route ) ) {
						
						return;

					}

					// Update the current request action change.
					requestContext.setContext( $route.current.action, $routeParams );

					// Announce the change in render conditions.
					$scope.$broadcast( "requestContextChanged", requestContext );

				}
			);


			// --- Initialize. ---------------------------------- //


			// ...


		}
	);

})( angular, Demo );