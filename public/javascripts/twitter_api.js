/**
 * 
 * @file dealing with Twitter API
 * @author Adrian McGee <adrianpmcgee@gmail.com>
 *
 *
 */


/**
 * Twitter API Client(Twit) Configuration
 */
var Twit = require('twit');
var config = require('./config')
var T = new Twit(config);
var params = {
    q: '#BobDylan',
    count: 100
}

var createTable = require('./create_table.js');


/**
 * Twitter Search API
 */
T.get('search/tweets', params, searchedData);

function searchedData(err, data, response) {
    if (!err) {
        /**
         * Call Create Table function and pass json search data
         */
        createTable(data);
    } else {
        console.log('The following error was returned while trying to access the Twitter API:- ', err);
    }
}


/**
 *  Expose the Twitter API call to search tweets
 */

module.exports = function () { 
    T.get('search/tweets', params, searchedData);
};