(function( ng, app, _ ) {
	
	"use strict";

	// I provide an augmented lodash library.
	app.factory(
		"_",
		function() {


			// I find the first collection item with the given property value.
			_.findWithProperty = function( collection, name, value ) {

				var result = _.find(
					collection,
					function( item ) {

						return( item[ name ] === value );

					}
				);

				return( result );

			};


			// ---------------------------------------------- //
			// ---------------------------------------------- //


			// Return the public API.
			return( _ );


		}
	);

})( angular, Demo, _.noConflict() );
// Release the global reference to the lodash library. This way, we make sure that everyone goes
// through our service object in order to get to the utility library.