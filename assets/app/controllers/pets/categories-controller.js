(function( ng, app ){

	"use strict";

	app.controller(
		"pets.CategoriesController",
		function( $scope, requestContext, categoryService, _ ) {


			// --- Define Controller Methods. ------------------- //


			// I apply the remote data to the local view model.
			function applyRemoteData( categories ) {

				$scope.categories = _.sortOnProperty( categories, "name", "asc" );

			}


			// I load the "remote" data from the server.
			function loadRemoteData() {

				$scope.isLoading = true;

				var promise = categoryService.getCategories();

				promise.then(
					function( response ) {

						$scope.isLoading = false;

						applyRemoteData( response );

					},
					function( response ) {

						$scope.openModalWindow( "error", "For some reason we couldn't load the categories. Try refreshing your browser." );

					}
				);

			}


			// --- Define Scope Methods. ------------------------ //


			// ...


			// --- Define Controller Variables. ----------------- //


			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard.pets.categories" );

			
			// --- Define Scope Variables. ---------------------- //


			// I flag that data is being loaded.
			$scope.isLoading = true;

			// I hold the categories to render.
			$scope.categories = [];

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


			// --- Initialize. ---------------------------------- //


			// Set the window title.
			$scope.setWindowTitle( "Choose Your Snuggle Bunny" );

			// Load the "remote" data.
			loadRemoteData();


		}
	);

})( angular, Demo );