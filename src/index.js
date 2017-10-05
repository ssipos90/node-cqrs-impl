"use strict";
const eventstore = require('eventstore');
const UserAggregator = require('./UserAggregator.js');

const es = eventstore({
    // type: 'mongodb',
    // maxSnapshotsCount: 3
});

es.init();

const getNewId = () => new Promise((resolve, reject) => es.getNewId((err, id) => err ? reject(err) : resolve(id)));

getEventStream({ aggregateId: 'someId' }, (error, stream) => {
    stream.addEvents([
        {
            _event: 'UserCreated',
            username: 'Peste',
            password: 'inzalacmaroz',
            status: 1
        },
        {
            _event: 'UserActivated',
            status: 2
        },
        {
            _event: 'UserBoarded',
            name: {
                first: 'Peste',
                last: 'Maroz'
            },
            status: 3
        },
        {
            _event: 'UserUsernameChanged',
            username: 'Fish'
        },
        {
            _event: 'UserPasswordChanged',
            password: 'InZaLacMaRoz'
        },
        {
            _event: 'UserLoggedIn'
        }
    ]);

    stream.commit();
});


es.getFromSnapshot(
    { aggregateId: 'someId' },
    (err, snapshot, stream) => {
        const agreg = UserAggregator(snapshot);

        console.log(agreg.play(stream.events));
    }
);
