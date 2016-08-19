import request from 'superagent'

module.exports = {
    newReservation: (desiredRoom, guestName, startDate, endDate, callback) => {
        request.post('/api/reservation/new').
          send({desiredRoom: desiredRoom,
            guestName: guestName,
            startDate: startDate.getTime(),
            endDate: endDate.getTime()}).
          set('Accept', 'application/json').
          end(callback)
    },

    checkIn: (indexes, callback) => {
        request.post('/api/reservation/in').
          send({indexes: indexes}).
          set('Accept', 'application/json').
          end(callback)
    },

    checkOut: (indexes, callback) => {
        request.post('/api/reservation/out').
          send({indexes: indexes}).
          set('Accept', 'application/json').
          end(callback)
    },
}
