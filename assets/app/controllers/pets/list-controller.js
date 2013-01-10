(function( ng, app ){

	"use strict";

	app.controller(
		"pets.ListController",
		function( $scope, $location, requestContext, categoryService, _ ) {


			// --- Define Controller Methods. ------------------- //


			// I apply the remote data to the local view model.
			function applyRemoteData( category ) {

				$scope.category = category;

				$scope.setWindowTitle( category.name );
				
			}


			// I load the remote data from the server.
			function loadRemoteData() {

				$scope.isLoading = true;

				var promise = categoryService.getCategoryByID( $scope.categoryID );

				promise.then(
					function( response ) {

						$scope.isLoading = false;

						applyRemoteData( response );

					},
					function( response ) {

						// The category couldn't be loaded for some reason.
						$location.path( "/pets" );

					}
				);

			}


			// --- Define Scope Methods. ------------------------ //


			// ...


			// --- Define Controller Variables. ----------------- //


			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard.pets.list", "categoryID" );

			
			// --- Define Scope Variables. ---------------------- //


			// Get the ID of the category.
			$scope.categoryID = requestContext.getParam( "categoryID" );

			// I flag that data is being loaded.
			$scope.isLoading = true;

			// I am the category and the list of pets that are being viewed.
			$scope.category = null;
			$scope.pets = null;

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


			// Set the interim title.
			$scope.setWindowTitle( "Loading Category" );

			// Load the "remote" data.
			loadRemoteData();


		}
	);

})( angular, Demo );