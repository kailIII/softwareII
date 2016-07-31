module.exports = {
    indexToDate: function(firstDate, i){
        return new Date(firstDate.getFullYear(),
                    firstDate.getMonth(),
                    firstDate.getDate() + i)
    },

    dateToIndex: function(firstDate, myDate){
        return Math.floor((myDate - firstDate) / (1000 * 60 * 60 * 24))
    }
}
