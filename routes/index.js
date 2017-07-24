/**
 * 
 * @a file to configure the index route.
 * @author Adrian McGee <adrianpmcgee@gmail.com>
 *
 *
 */



/**
 * sqlite database definition
 * 
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database/twitter.db');


var express = require('express');
var router = express.Router();

/**
 *  Decalre a function expression that points to the Twitter API search call
 */
var searchTweets = require('../public/javascripts/twitter_api.js');

/**
 *  GET home page.
 */
router.get('/', function(req, res, next) {

	/**
    *  Call the Twitter API Search function
    */
    searchTweets();

    console.log("Serving " + __filename);


    /**
     *  Retrieve Tweets from table
     */
    var dbpath = 'database/' + db;
    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='tweets'", function(error, row) {

        if (row !== undefined) {
            db.all(" select * FROM tweets", function(err, rows) {

                /**
                 * Webpage title text
                 */
                var titleHeadingText = rows.length > 0 ? "Twitter Search Bot" : "Error with twitter database";

                /**
                 * Render tweets table view
                 */
                res.render('index', { title: titleHeadingText, rows: rows });
            });

        } else {

            /**
             * Render error view
             */
            console.log('table doesnt exist');
            res.render('error', { title: 'Error with the TwitterBot database' });

        }

    });

});


/**
 *  Export express router module
 */
module.exports = router;
