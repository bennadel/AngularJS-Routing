(function( ng, app ){

	"use strict";

	app.controller(
		"pets.ListController",
		function( $scope, $location, $q, requestContext, categoryService, petService, _ ) {


			// --- Define Controller Methods. ------------------- //


			// I apply the remote data to the local view model.
			function applyRemoteData( category, pets ) {

				$scope.category = category;
				$scope.pets = _.sortOnProperty( pets, "name", "asc" );

				$scope.setWindowTitle( category.name );
				
			}


			// I load the remote data from the server.
			function loadRemoteData() {

				$scope.isLoading = true;

				var promise = $q.all(
					[
						categoryService.getCategoryByID( $scope.categoryID ),
						petService.getPetsByCategoryID( $scope.categoryID )
					]
				);

				promise.then(
					function( response ) {

						$scope.isLoading = false;

						applyRemoteData( response[ 0 ], response[ 1 ] );

					},
					function( response ) {

						// The category couldn't be loaded for some reason - possibly someone hacking with the URL. 
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

					// Get the relevant route IDs.
					$scope.categoryID = requestContext.getParam( "categoryID" );

					// Update the view that is being rendered.
					$scope.subview = renderContext.getNextSection();

					// If the relevant IDs have changed, refresh the view.
					if ( requestContext.hasParamChanged( "categoryID" ) ) {

						loadRemoteData();

					}

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