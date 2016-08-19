import React from 'react';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import { cyan100, cyan700 } from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import dateformat from 'dateformat';
import RoomStatusIcon from './RoomStatusIcon';
import CheckInOutDialog from './CheckInOutDialog';
import NewReservationDialog from './NewReservationDialog';
import SpreadsheetDates from './SpreadsheetDates';
import * as RoomTypes from '../../../../../constants/RoomTypes'
import * as ReservationStatus from '../../../../../constants/ReservationStatus'
import * as SpreadsheetStatus from '../../../../../constants/SpreadsheetStatus'
import ResizableComponent from '../../ResizableComponent'

const firstColumnWidth = '30px'
const firstHeaderStyle = {
    width: firstColumnWidth,
}

class RoomCell extends React.Component {
    constructor (props) {
        super(props);
        this.onRoomCellClicked = this.onRoomCellClicked.bind(this)
    }

    onRoomCellClicked(event) {
        switch(this.props.spreadsheetStatus){
        case SpreadsheetStatus.normal:
        case SpreadsheetStatus.displayInfo:
            if(this.props.roomStatus !== RoomTypes.disponible)
                this.props.openRoomInfo()
            break;
        }
    }

    render (){
        //const centerStyle = {margin: 'auto', display: 'block'}
        return (
			       <TableRowColumn style={this.props.style} onTouchTap={this.onRoomCellClicked}>
					        <RoomStatusIcon roomStatus={this.props.roomStatus}/>
			       </TableRowColumn>
	  )}
}

class NewReservationSnack extends React.Component {
    render(){
        const latestReservation = this.props.latestReservation
        let snackMessage = ""
        const open =  latestReservation.roomIndex !== -1
        if(open){
            const startDate = dateformat(SpreadsheetDates.indexToDate(this.props.firstDate,
              latestReservation.startIndex), "dddd, mmmm dS")
            snackMessage = `Habitación #${latestReservation.roomId} reservada para ` +
            ` el ${startDate} por ${latestReservation.totalDays} días para ${latestReservation.clientName}`
        }
        return (<Snackbar open={open} message={snackMessage} autoHideDuration={15000} />)

    }
}
class Sidebar extends React.Component {
    constructor(props){
        super(props)
        this.getDisplayData = this.getDisplayData.bind(this)
    }

    getDisplayData(reservation){
        const clientName = reservation.clientName
        const title = `Habitación #${reservation.roomIndex + 1}` //HACK
        const dayStatus = reservation.status

        const roomType = this.props.rooms[reservation.roomIndex].type
        const startDate = this.props.indexToDate(reservation.startIndex)
        startDate.setHours(0,0,0,0)
        const endDate = this.props.indexToDate(reservation.startIndex
          + reservation.totalDays - 1)
        endDate.setHours(0,0,0,0)
        const today = new Date()
        let subtitle, checkboxLabel
        let isChecked = true
        let disabled = false
        let iconLetter
        if(dayStatus === ReservationStatus.waiting){
            subtitle = 'Reservado para:'
            checkboxLabel = "Checked-in"
            isChecked = false
            iconLetter = 'R'
            if(today < startDate)
                disabled = true
        } else {
            subtitle = 'Ocupado por:'
            checkboxLabel = "Checked-out"
            iconLetter = 'O'
            if (dayStatus === ReservationStatus.checkedOut)
                isChecked = true
            else if (dayStatus === ReservationStatus.checkedIn)
                isChecked = false
        }

        const desde = dateformat(startDate, "dddd, mmmm dS")
        const hasta = dateformat(endDate, "dddd, mmmm dS")

        return {
            clientName: clientName,
            title: title,
            subtitle: subtitle,
            isChecked: isChecked,
            checkboxLabel: checkboxLabel,
            desde: desde,
            hasta: hasta,
            iconLetter: iconLetter,
            disabled: disabled,
            roomType: roomType,
        }
    }

    render(){
        const nodata = (<Drawer open={false} openSecondary={true}/>)
        if(this.props.reservations.length === 0)
            return nodata

        const reservation = this.props.reservations[this.props.reservationIndex]
        if(!reservation)
            return nodata

        const display = this.getDisplayData(reservation)
          //const useSecondary = (100 * info.dayIndex / room.days.length) < 50
        return(
        <Drawer open={(this.props.status === SpreadsheetStatus.displayInfo) } openSecondary={true}>
          <ListItem style={{marginTop: '15px', fontWeight: '400'}} disabled={true}
          primaryText={display.title} secondaryText={display.roomType}
            leftAvatar={
              <Avatar style={{fontWeight: 'normal'}} backgroundColor={cyan700} >
                {display.iconLetter}
              </Avatar> } >
          </ListItem>
          <Divider style={{marginTop: '15px'}}/>
          <Subheader>{display.subtitle}</Subheader>
          <ListItem disabled={true} style={{textAlign:'center'}}>{display.clientName}</ListItem>
          <Subheader>Desde: </Subheader>
          <ListItem disabled={true} style={{textAlign:'center'}}>{display.desde}</ListItem>
          <Subheader disabled={true}>Hasta: </Subheader>
          <ListItem disabled={true} style={{textAlign:'center'}}>{display.hasta}</ListItem>
          <Divider style={{marginTop: '15px', marginBottom: '15px'}}/>
          <Checkbox style={{marginLeft: '15px', fontSize: 'medium'}}
          checked={display.isChecked} label={display.checkboxLabel} />
          <div style={{textAlign: 'right', marginRight: '8px', marginTop: '8px'}} >
            <FlatButton label="Cerrar" secondary={true} onTouchTap={this.props.cancelarDisplayInfo} />
          </div>
        </Drawer>
      )
    }
}
class RoomTable extends ResizableComponent {
    constructor(props){
        super(props)
        this.state = { ...this.state, sidebarOpen: false}
        this.getRoomNumberStyle = this.getRoomNumberStyle.bind(this)
    }

    getRoomNumberStyle() {
        return  {
            backgroundColor: this.context.muiTheme.palette.primary1Color,
            color: 'white',
            width: firstColumnWidth,
            textAlign: 'center',
            fontSize: '22px',
        }
    }

    openRoomInfo(){
        this.props.displayInfo('Gabriela Garcia', new Date(), new Date())
    }

    /**
    * obtiene todas las reservaciones para una habitacion en especifico.
    * @param reservations Una lista de reservaciones con la estructura
    * de data/reservations.js.
    * @param roomIndex El indice de la habitacion cuyas reservaciones se desea
    * encontrar
    * @return Un objeto con dos propiedades:
    * 'roomReservations' es una lista con todas las reservaciones de la habitacion.
    * 'updatedReservations' es una nueva lista de la forma
    * 'offset' un entero con la posicion de la primera reservacion que no es
    * de la habitacion deseada en el arreglo 'reservations'
    * (reservations - roomReservations)
    */
    getAllReservationsForRoom(reservations, roomIndex){
        const roomReservations = []
        let i
        if(reservations.length > 0)
            for(i = 0; reservations[i] && reservations[i].roomIndex <= roomIndex; i++){
                const reserv = reservations[i]
                if(reserv.roomIndex === roomIndex)
                    roomReservations.push(reserv)
            }

        return {
            updatedReservations: reservations.slice(i),
            roomReservations: roomReservations,
            offset: i,
        }
    }

    mapReservationStatusToRoomTypes(reservationStatus){
        if(!reservationStatus)
            return RoomTypes.disponible
        if(reservationStatus === ReservationStatus.waiting)
            return RoomTypes.reservado
        else if(reservationStatus === ReservationStatus.checkedIn)
            return RoomTypes.ocupado
        else if(reservationStatus === ReservationStatus.checkedOut)
            return RoomTypes.ocupado

        throw `${reservationStatus} no es un estado conocido`
    }

    /**
    * Obtiene el estado de una habitacion para un dia especifico
    * @param roomReservations lista de reservaciones de la misma habitacion.
    * se asume que la lista de habitaciones esta ordenada en base el indice del
    * inicio de la reservacion
    * @param dayIndex El indice del dia en el cual se quiere conocer el estado
    * de la habitacion
    * @return Un objeto con dos propiedades:
    * 'status' es un valor de 'RoomTypes' con el estado de la habitacion.
    * 'updatedRoomReservations' es la misma lista de 'roomReservations' pero se
    * le sustraen todas las reservaciones que terminan en el dia de 'dayIndex'
    * 'offset' un entero 1 o 0. Es 1 solo si dayIndex es el ultimo dia de la
    * reservacion, lo cual quiere decir que updatedRoomReservations tiene un
    * item menos que roomReservations.
    */
    getStatusForRoomDay(roomReservations, dayIndex){
        if(roomReservations.length > 0){
            const firstReservation = roomReservations[0]
            const firstReservationStart = firstReservation.startIndex
            const firstReservationEnd = firstReservationStart + firstReservation.totalDays -1
            if(firstReservationEnd < dayIndex)
                throw `el indice del dia ${dayIndex} es mayor que el final de la ` +
                `primera reservacion ${firstReservationEnd}. Tienes que llamar a esta ` +
                "funcion incrementando dayIndex ordenadamente"

            if(firstReservationEnd === dayIndex){
                let updatedRR = []
                if(roomReservations.length > 1)
                    updatedRR =  roomReservations.slice(1)
                return {
                    status: this.mapReservationStatusToRoomTypes(firstReservation.status),
                    updatedRoomReservations: updatedRR,
                    offset: 1,
                }
            } else if(firstReservationStart <= dayIndex) {
                return {
                    status: this.mapReservationStatusToRoomTypes(firstReservation.status),
                    updatedRoomReservations: roomReservations,
                    offset: 0,
                }
            }
        }

        return {
            status: RoomTypes.disponible,
            updatedRoomReservations: roomReservations,
            offset: 0,
        }
    }

    render() {
        const todayIndex = SpreadsheetDates.dateToIndex(this.props.firstDate, new Date());
        const borderStyle = '1px solid ' + cyan700
        const todayColStyle = { backgroundColor: cyan100}
        let columns = Array(this.props.totalDays)
        let i = 0;
        for(i = 0; i < columns.length; i++) columns[i] = 0;
        let reservations = [ ...this.props.reservations.values]; //BUG IN SPREAD OPERATORRR!??
        let roomOffset = 0
        return (
          <div>
  					<Table height={this.state.height} selectable={false} fixedHeader={true}>
  						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn key={-1} style={firstHeaderStyle}></TableHeaderColumn>
                  { columns.map(function(it, i) {
                      return (
                        <TableHeaderColumn key={i} >
                          <p style={{textAlign:'center'}}>
                          {dateformat(this.props.indexToDate(i), "dd-mmm")}
                        </p>
                        </TableHeaderColumn>)
                  }, this)
                  }
                </TableRow>
              </TableHeader>
  						<TableBody displayRowCheckbox={false}>
  								{this.props.rooms.map(function (roomData, i) {
                      const reservObject = this.getAllReservationsForRoom(reservations, i)
                      reservations = reservObject.updatedReservations
                      let roomReservations = reservObject.roomReservations
                      const currentOffset = roomOffset
                      roomOffset += reservObject.offset
                      let reservOffset = 0
                      return (
  												<TableRow  key={roomData.roomId}>
  													<TableRowColumn key={-1} style={this.getRoomNumberStyle()}>
  														<div >{roomData.roomId}</div>
  													</TableRowColumn>

  												{Array.apply(null, new Array(this.props.totalDays)).map(function(status, j) {
                              const reservationIndex = currentOffset + reservOffset
                              const statusObject = this.getStatusForRoomDay(roomReservations, j)
                              roomReservations = statusObject.updatedRoomReservations
                              const dayStatus = statusObject.status
                              reservOffset += statusObject.offset
                              const openRoomInfo = () =>
                              { this.props.displayInfo(reservationIndex)  }

                              let todayStyle
                              if(j === todayIndex)
                                  todayStyle = todayColStyle
  															return (
  																<RoomCell key={i} style={todayStyle} dayIndex={j}
                                  openRoomInfo = {openRoomInfo}
                                    roomStatus={dayStatus} roomIndex={i}
                                      spreadsheetStatus={this.props.status} />)
  														}, this)
  													}
  												</TableRow>)
  									}, this)
  								}
  						</TableBody>
  					</Table>
            <Sidebar reservations={this.props.reservations.values}
            rooms={this.props.rooms} indexToDate={this.props.indexToDate}
            reservationIndex={this.props.displayReservationIndex}
              cancelarDisplayInfo={this.props.cancelarDisplayInfo} status={this.props.status}
              checkIn={this.props.checkIn} undoCheckIn={this.props.undoCheckIn}
              checkOut={this.props.checkIn} undoCheckOut={this.props.undoCheckOut} />
            <NewReservationSnack firstDate={this.props.firstDate}
            latestReservation={this.props.latestReservation} />
            <NewReservationDialog open={this.props.status === SpreadsheetStatus.reservationDialog}
                reservations={this.props.reservations.values}
                reservarHabitacion={this.props.reservarHabitacion}
                firstDate={this.props.firstDate} rooms={this.props.rooms}
                cancelarNuevaReservacion={this.props.cancelarNuevaReservacion}/>
            <CheckInOutDialog  status={this.props.status} cancel={this.props.cancelCheckInOut}
                reservations={this.props.reservations.suggestions}
                checkIn={this.props.checkIn} checkOut={this.props.checkOut}/>
          </div>
        )
    }

};

RoomTable.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default RoomTable;
