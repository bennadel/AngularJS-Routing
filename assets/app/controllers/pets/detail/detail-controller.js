(function( ng, app ){

	"use strict";

	app.controller(
		"pets.detail.DetailController",
		function( $scope, $location, $q, requestContext, categoryService, petService, _ ) {


			// --- Define Controller Methods. ------------------- //


			// I apply the remote data to the local view model.
			function applyRemoteData( category, pet ) {

				$scope.category = category;
				$scope.pet = pet;

				$scope.setWindowTitle( pet.name + " - " + pet.breed );

			}


			// I load the "remote" data from the server.
			function loadRemoteData() {

				$scope.isLoading = true;

				var promise = $q.all(
					[
						categoryService.getCategoryByID( $scope.categoryID ),
						petService.getPetByID( $scope.petID )
					]
				);

				promise.then(
					function( response ) {

						$scope.isLoading = false;

						applyRemoteData( response[ 0 ], response[ 1 ] );

					},
					function( response ) {

						// The pet couldn't be loaded for some reason - possibly someone hacking with the URL. 
						$location.path( "/pets/" + $scope.categoryID );

					}
				);

			}


			// --- Define Scope Methods. ------------------------ //


			// ...


			// --- Define Controller Variables. ----------------- //


			// Get the render context local to this controller (and relevant params).
			var renderContext = requestContext.getRenderContext( "standard.pets.detail", "petID" );

			
			// --- Define Scope Variables. ---------------------- //


			// Get the relevant route IDs.
			$scope.categoryID = requestContext.getParam( "categoryID" );
			$scope.petID = requestContext.getParamAsInt( "petID" );

			// I flag that data is being loaded.
			$scope.isLoading = true;

			// I hold the category and pet to render.
			$scope.category = null;
			$scope.pet = null;

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

					// Get the relevant route IDs.
					$scope.categoryID = requestContext.getParam( "categoryID" );
					$scope.petID = requestContext.getParamAsInt( "petID" );

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();

					// If the relevant ID has changed, refresh the view.
					if ( requestContext.haveParamsChanged( [ "categoryID", "petID" ] ) ) {

						loadRemoteData();

					}

				}
			);


			// --- Initialize. ---------------------------------- //


			// Set the window title.
			$scope.setWindowTitle( "Loading Pet" );

			// Load the "remote" data.
			loadRemoteData();


		}
	);

})( angular, Demo );