const ReservationStatus = require('../../../constants/ReservationStatus.js')
const reservations = [{roomIndex:0, clientName:"Wilson Nieto", startIndex: 0, totalDays: 2, status: ReservationStatus.checkedOut},
{roomIndex:2, clientName:"Dolores Baquerizo", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedIn},
{roomIndex:2, clientName:"Maria Jose Riera", startIndex: 3, totalDays: 3, status: ReservationStatus.waiting},
{roomIndex:4, clientName:"Ana Davila", startIndex: 1, totalDays: 3, status: ReservationStatus.checkedIn},
{roomIndex:5, clientName:"Jose Coronel", startIndex: 1, totalDays: 3, status: ReservationStatus.checkedIn},
{roomIndex:7, clientName:"Gabriela Garcia", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedOut},
{roomIndex:8, clientName:"Gabriela Garcia", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedOut},
{roomIndex:10, clientName:"Ruben Carvajal", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedOut},
{roomIndex:11, clientName:"Ruben Carvajal", startIndex: 0, totalDays: 1, status: ReservationStatus.checkedOut},
{roomIndex:14, clientName:"Charlie Medina", startIndex: 1, totalDays: 4, status: ReservationStatus.checkedIn},
{roomIndex:15, clientName:"Charlie Medina", startIndex: 1, totalDays: 4, status: ReservationStatus.checkedIn},
{roomIndex:16, clientName:"Charlie Medina", startIndex: 1, totalDays: 4, status: ReservationStatus.checkedIn},
{roomIndex:18, clientName:"Fausto Yerovi", startIndex: 6, totalDays: 3, status: ReservationStatus.waiting},
{roomIndex:19, clientName:"Fausto Yerovi", startIndex: 6, totalDays: 3, status: ReservationStatus.waiting},
{roomIndex:20, clientName:"Cesar Madrid", startIndex: 9, totalDays: 2, status: ReservationStatus.waiting},
{roomIndex:21, clientName:"Cesar Madrid", startIndex: 9, totalDays: 2, status: ReservationStatus.waiting},
]

export default reservations;
