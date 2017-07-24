/**
 * 
 * @file dealing with sqlite table creation
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



/**
 * Create the Tweets table and insert the values from JSON object.
 */
function create_table(data) {

    db.serialize(() => {
        db.run('create table if not exists ' + 'tweets (' + 'id INTEGER PRIMARY KEY, ' + 'tweet TEXT, ' + 'screen_name TEXT, ' + 'created_date TEXT )', function(err) {
            if (err) {
                console.log('Error when creating table. Error = ', err);
                return;
            }
        });


        db.run('delete from tweets', function(err) {
            if (err) {
                console.log('Error removing old data from table. Error = ', err);
                return;
            }
        }); //or drop the table first.

        var stmt = db.prepare('insert into tweets values (?,?,?,?)', function(err) {
            if (err) {
                console.log('Error while preparing database. Error = ', err);
                return;
            }
        });

        /**
         * Process json data and insert(id, tweet, screenname, creation date) in database table
         */
        var statuesObject = data["statuses"];

        for (var key in statuesObject) {
            var currentObject = statuesObject[key];
            if (currentObject['text']) {
                var userObject = currentObject['user'];

                if (userObject['screen_name']) {
                    stmt.run(currentObject['id'], currentObject['text'], userObject['screen_name'], currentObject['created_at'], function(err) {
                        if (err) {
                            console.log('Error when inserting values to table. Error = ', err);
                            return;
                        }
                    });
                }
            }
        }

        stmt.finalize();

    });

}

/**
 *  Expose the create_table function
 */
module.exports = function (msg) { 
    create_table(msg);
};