/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask nasa Geek for a Nasa fact"
 *  Alexa: "Here's your nasa fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing nasa facts.
 */

/* this could break . orig SPACE_FACTS */
var NASA_FACTS = [
    "A year on Mercury is just 88 days long.",
    "Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.",
    "Venus rotates counter-clockwise, possibly because of a collision in the past with an asteroid.",
    "On Mars, the Sun appears about half the size as it does on Earth.",
    "Earth is the only planet not named after a god.",
    "Jupiter has the shortest day of all the planets.",
    "The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.",
    "The Sun contains 99.86% of the mass in the Solar System.",
    "The Sun is an almost perfect sphere.",
    "A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.",
    "Saturn radiates two and a half times more energy into space than it receives from the sun.",
    "The temperature inside the Sun can reach 15 million degrees Celsius.",
    "The Moon is moving approximately 3.8 cm away from our planet every year."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');


var Nasafacts = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Nasafacts.prototype = Object.create(AlexaSkill.prototype);
Nasafacts.prototype.constructor = Nasafacts;

Nasafacts.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("Nasafacts onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Nasafacts.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("Nasafacts onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Nasafacts.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("Nasafacts onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Nasafacts.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Nasa facts tell me a nasa fact, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    var speechOutput = "Here's your Nasa fact: " + fact;

    response.tellWithCard(speechOutput, "Nasafacts", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Nasafacts skill.
    var Nasafacts = new Nasafacts();
    Nasafacts.execute(event, context);
};

