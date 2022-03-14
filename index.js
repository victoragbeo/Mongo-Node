const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');
// dboper is "database operation"


const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
// assert() allows checks on val. first arg is the value we're checking,
// 2nd arg is the expected val we are checking to see if they strictly equal
// if err equals null, that means there were no err
    assert.strictEqual(err, null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);

    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection:', result);

        dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
                    { description: "Updated Test Description" }, 'campsites',
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Documents:', docs);
                            
                            dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleted Document Count:', result.deletedCount);

                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});



// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert').strict;
// const dboper = require('./operations');

// const url = 'mongodb://localhost:27017/';
// const dbname = 'nucampsite';

// // mongClient connect to database

// MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

// // assert() allows checks on val. first arg is the value we're checking,
// // 2nd arg is the expected val we are checking to see if they strictly equal
// // when assert() fails, app is canceled
//     assert.strictEqual(err, null);

//     console.log('Connected correctly to server');

//     const db = client.db(dbname);

// // 'drop'  means to delete in database
// db.dropCollection('campsites', (err, result) => {
//     assert.strictEqual(err, null);
//     console.log('Dropped Collection:', result);

//     dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"},
//         'campsites', result => {
//         console.log('Insert Document:', result.ops);

//         dboper.findDocuments(db, 'campsites', docs => {
//             console.log('Found Documents:', docs);

//             dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" },
//                 { description: "Updated Test Description" }, 'campsites',
//                 result => {
//                     console.log('Updated Document Count:', result.result.nModified);

//                     dboper.findDocuments(db, 'campsites', docs => {
//                         console.log('Found Documents:', docs);
                        
//                         dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
//                             'campsites', result => {
//                                 console.log('Deleted Document Count:', result.deletedCount);

//                                 client.close();
//                             }
//                         );
//                     });
//                 }
//             );
//         });
//     });
// });
// });

