/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/


var APP_ID = "amzn1.echo-sdk-ams.app.ce2ed65a-3349-4276-9f7b-f833118d45ff"; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing nasa facts.
 */
var NASA_FACTS = [
    "The acronym NASA stands for National Aeronautics and Space Administration.",
"The Altus II unmanned robot plane can circle for up to 24 hours over wildfires, beaming images and data back to computers via satellite. Originally introduced as part of the Environmental Research and Sensor Technology (ERAST) Program, Altus II can map dozens of fires in a day with no risk to a pilot..",
"The Dryden Flight Research Center (DFRC) is NASA's center for aeronautical flight research and atmospheric flight operations. DFRC is chartered to research, develop, verify, and transfer advanced aeronautics, space and related technologies. It also serves as a backup landing site for the Space Shuttle and a facility to test and validate design concepts and systems used in development and operation of the Orbiters.",
"On January 31, 1958, Explorer 1 became the first artificial satellite launched into space by the United States. Onboard was a cosmic ray detector designed to measure the radiation environment in Earth orbit.	",
"On March 16, 1926, Dr. Robert H. Goddard successfully launched the first liquid fueled rocket. The launch took place at Auburn, Massachusetts, and is regarded by flight historians to be as significant as the Wright Brothers flight at Kitty Hawk.",
"NASA's Environmental Research Aircraft and Sensor Technology program (known as ERAST) develops pilotless airplane technology. It also works on making science instruments very small so that they can be carried on remote-controlled aircraft.",
"On August 25, 1932 Amelia Earhart set three records for women flyers: the first non-stop U.S. crossing, the longest distance record, and a coast-to-coast record time.",
"The term aeronautics originated in France, and was derived from the Greek words for air and to sail.",
"Cumulonimbus clouds, or rain producing clouds, may stretch from their base near the Earth's surface to an altitude of 10 kilometers (33,000 feet) or higher.",
"Did you know that data from satellite instruments are used by fishermen to find areas where fish are most likely to be found? Fish find food in zones where cold and warm water mix.	",
"A geostationary satellite travels at an altitude of approximately 36,000 kilometers (22,000 miles) above the Earth and at a speed of about 11,000 kph (7,000 mph).	",
"Flatfish (halibut, flounder, turbot, and sole) hatch like any other normal fish. As they grow, they turn sideways and one eye moves around so they have two eyes on the side that faces up.",
"On October 14, 1947, in the rocket powered Bell X-1, Capt. Charles E. Yeager flew faster than sound for the first time."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Nasafact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Nasafact.prototype = Object.create(AlexaSkill.prototype);
Nasafact.prototype.constructor = Nasafact;

Nasafact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Nasafact onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Nasafact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Nasafact onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Nasafact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Nasafact onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Nasafact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Nasa Fact tell me a nasa fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random nasa fact from the nasa facts list
    var factIndex = Math.floor(Math.random() * NASA_FACTS.length);
    var fact = NASA_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your nasa fact: " + fact;

    response.tellWithCard(speechOutput, "Nasafact", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the NasaFact skill.
    var nasaFact = new Nasafact();
    nasaFact.execute(event, context);
};

