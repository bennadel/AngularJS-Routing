(function( ng, app ) {
	
	"use strict";

	// I provide information about the current route request.
	app.service(
		"requestContext",
		function( RenderContext ) {


			// I get the current action.
			function getAction() {

				return( action );

			}


			// I get the next section at the given location on the action path.
			function getNextSection( prefix ) {

				// Make sure the prefix is actually in the current action.
				if ( ! startsWith( prefix ) ) {

					return( null );
					
				}

				// If the prefix is empty, return the first section.
				if ( prefix === "" ) {

					return( sections[ 0 ] );

				}

				// Now that we know the prefix is valid, lets figure out the depth 
				// of the current path.
				var depth = prefix.split( "." ).length;

				// If the depth is out of bounds, meaning the current action doesn't
				// define sections to that path (they are equal), then return null.
				if ( depth === sections.length ) {

					return( null );

				}

				// Return the section.
				return( sections[ depth ] );

			}


			// I return the param with the given name, or the default value (or null).
			function getParam( name, defaultValue ) {

				if ( ng.isUndefined( defaultValue ) ) {

					defaultValue = null;

				}

				return( params[ name ] || defaultValue );

			}


			// I return the param as an int. If the param cannot be returned as an 
			// int, the given default value is returned. If no default value is 
			// defined, the return will be zero.
			function getParamAsInt( name, defaultValue ) {

				// Try to parse the number.
				var valueAsInt = ( this.getParam( name, defaultValue || 0 ) * 1 );

				// Check to see if the coersion failed. If so, return the default.
				if ( isNaN( valueAsInt ) ) {

					return( defaultValue || 0 );

				} else {

					return( valueAsInt );

				}

			}


			// I return the render context for the given action prefix and sub-set of 
			// route params.
			function getRenderContext( requestActionLocation, paramNames ) {

				// Default the requestion action.
				requestActionLocation = ( requestActionLocation || "" );

				// Default the param names. 
				paramNames = ( paramNames || [] );

				// The param names can be passed in as a single name; or, as an array
				// of names. If a single name was provided, let's convert it to the array.
				if ( ! ng.isArray( paramNames ) ) {

					paramNames = [ paramNames ];

				}

				return(
					new RenderContext( this, requestActionLocation, paramNames )
				);

			}


			// I determine if the action has changed in this particular request context.
			function hasActionChanged() {

				return( action !== previousAction );

			}


			// I determine if the given param has changed in this particular request 
			// context. This change comparison can be made against a specific value 
			// (paramValue); or, if only the param name is defined, the comparison will 
			// be made agains the previous snapshot.
			function hasParamChanged( paramName, paramValue ) {

				// If the param value exists, then we simply want to use that to compare 
				// against the current snapshot. 
				if ( ! ng.isUndefined( paramValue ) ) {

					return( ! isParam( paramName, paramValue ) );

				}

				// If the param was NOT in the previous snapshot, then we'll consider
				// it changing.
				if (
					! previousParams.hasOwnProperty( paramName ) &&
					params.hasOwnProperty( paramName )
					) {

					return( true );

				// If the param was in the previous snapshot, but NOT in the current, 
				// we'll consider it to be changing.
				} else if (
					previousParams.hasOwnProperty( paramName ) &&
					! params.hasOwnProperty( paramName )
					) {

					return( true );

				}

				// If we made it this far, the param existence has not change; as such,
				// let's compare their actual values.
				return( previousParams[ paramName ] !== params[ paramName ] );

			}


			// I determine if any of the given params have changed in this particular
			// request context.
			function haveParamsChanged( paramNames ) {

				for ( var i = 0, length = paramNames.length ; i < length ; i++ ) {

					if ( hasParamChanged( paramNames[ i ] ) ) {

						// If one of the params has changed, return true - no need to
						// continue checking the other parameters.
						return( true );

					}

				}

				// If we made it this far then none of the params have changed.
				return( false );

			}


			// I check to see if the given param is still the given value.
			function isParam( paramName, paramValue ) {

				// When comparing, using the coersive equals since we may be comparing 
				// parsed value against non-parsed values.
				if (
					params.hasOwnProperty( paramName ) &&
					( params[ paramName ] == paramValue )
					) {

					return( true );

				}

				// If we made it this far then param is either a different value; or, 
				// is no longer available in the route.
				return( false );

			}


			// I set the new request context conditions.
			function setContext( newAction, newRouteParams ) {

				// Copy the current action and params into the previous snapshots.
				previousAction = action;
				previousParams = params;

				// Set the action.
				action = newAction;

				// Split the action to determine the sections.
				sections = action.split( "." );

				// Update the params collection.
				params = ng.copy( newRouteParams );

			}


			// I determine if the current action starts with the given path.
			function startsWith( prefix ) {

				// When checking, we want to make sure we don't match partial sections for false
				// positives. So, either it matches in entirety; or, it matches with an additional
				// dot at the end.
				if (
					! prefix.length || 
					( action === prefix ) ||
					( action.indexOf( prefix + "." ) === 0 )
					) {

					return( true );

				}

				return( false );

			}


			// ---------------------------------------------- //
			// ---------------------------------------------- //


			// Store the current action path.
			var action = "";

			// Store the action as an array of parts so we can more easily examine 
			// parts of it.
			var sections = [];

			// Store the current route params.
			var params = {};

			// Store the previous action and route params. We'll use these to make 
			// a comparison from one route change to the next.
			var previousAction = "";
			var previousParams = {};


			// ---------------------------------------------- //
			// ---------------------------------------------- //


			// Return the public API.
			return({
				getNextSection: getNextSection,
				getParam: getParam,
				getParamAsInt: getParamAsInt,
				getRenderContext: getRenderContext,
				hasActionChanged: hasActionChanged,
				hasParamChanged: hasParamChanged,
				haveParamsChanged: haveParamsChanged,
				isParam: isParam,
				setContext: setContext,
				startsWith: startsWith
			});


		}
	);

})( angular, Demo );