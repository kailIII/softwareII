const ReservationStatus = require('../../../constants/ReservationStatus.js')
const reservations = [{roomIndex:0, clientName:"Wilson Nieto", startIndex: 0, totalDays: 2, status: ReservationStatus.waiting},
{roomIndex:2, clientName:"Dolores Baquerizo", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedIn},
{roomIndex:2, clientName:"Maria Jose Riera", startIndex: 3, totalDays: 3, status: ReservationStatus.waiting},
{roomIndex:4, clientName:"Ana Davila", startIndex: 1, totalDays: 3, status: ReservationStatus.waiting},
{roomIndex:5, clientName:"Jose Coronel", startIndex: 1, totalDays: 3, status: ReservationStatus.waiting},
{roomIndex:7, clientName:"Gabriela Garcia", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedIn},
{roomIndex:8, clientName:"Gabriela Garcia", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedIn},
{roomIndex:10, clientName:"Ruben Carvajal", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedIn},
{roomIndex:11, clientName:"Ruben Carvajal", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedIn},
{roomIndex:14, clientName:"Charlie Medina", startIndex: 1, totalDays: 4, status: ReservationStatus.waiting},
{roomIndex:15, clientName:"Charlie Medina", startIndex: 1, totalDays: 4, status: ReservationStatus.waiting},
{roomIndex:16, clientName:"Charlie Medina", startIndex: 1, totalDays: 4, status: ReservationStatus.waiting},
]

export default reservations;
