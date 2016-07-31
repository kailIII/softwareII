import React from 'react';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import { purple500 } from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import dateformat from 'dateformat';
import RoomStatusIcon from './RoomStatusIcon';
import NewReservationDialog from './NewReservationDialog';
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
            if(this.props.roomStatus === RoomTypes.disponible)
                this.props.escogerHabitacion(this.props.roomIndex, this.props.dayIndex)
            else
                this.props.openRoomInfo()
            break;
        case SpreadsheetStatus.selectFecha:
            if(this.props.roomIsSelected && this.props.dayIndex >= this.props.startIndex
              && this.props.roomStatus === RoomTypes.disponible)
                this.props.escogerIntervalo(this.props.dayIndex)
            else if(this.props.roomStatus !== RoomTypes.disponible)
                this.props.openRoomInfo()
            break;
        }
    }

    render (){
        return (
			       <TableRowColumn onTouchTap={this.onRoomCellClicked}>
					        <RoomStatusIcon roomStatus={this.props.roomStatus}/>
			       </TableRowColumn>
	  )}
}

class Sidebar extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        const info = this.props.roomInfo
        if(info.roomIndex === -1)
            return(<Drawer open={false} openSecondary={true}/>)

        const room = this.props.rooms[info.roomIndex]
        const title = `Habitación #${room.roomId}`
        const dayStatus = room.days[info.dayIndex]

        let subtitle, checkboxLabel
        if(dayStatus === RoomTypes.ocupado){
            subtitle = 'Ocupado por:'
            checkboxLabel = "Checked-out"
        } else if(dayStatus === RoomTypes.reservado){
            subtitle = 'Reservado para:'
            checkboxLabel = "Checked-in"
        }

        const desde = dateformat(info.startDate, "dddd, mmmm dS")
        const hasta = dateformat(info.endDate, "dddd, mmmm dS")

        //const useSecondary = (100 * info.dayIndex / room.days.length) < 50
        return(
        <Drawer open={(this.props.status === SpreadsheetStatus.displayInfo) } openSecondary={true}>
          <ListItem style={{marginTop: '15px', fontWeight: '400'}} disabled={true}
            leftAvatar={ <Avatar style={{fontWeight: 'normal'}} backgroundColor={purple500} >R</Avatar> } >
            {title}
          </ListItem>
          <Divider style={{marginTop: '15px'}}/>
          <Subheader>{subtitle}</Subheader>
          <ListItem disabled={true} style={{textAlign:'center'}}>{info.clientName}</ListItem>
          <Subheader>Desde: </Subheader>
          <ListItem disabled={true} style={{textAlign:'center'}}>{desde}</ListItem>
          <Subheader disabled={true}>Hasta: </Subheader>
          <ListItem disabled={true} style={{textAlign:'center'}}>{hasta}</ListItem>
          <Divider style={{marginTop: '15px', marginBottom: '15px'}}/>
          <Checkbox style={{marginLeft: '15px', fontSize: 'medium'}} label={checkboxLabel} />
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
    * (reservations - roomReservations)
    */
    getAllReservationsForRoom(reservations, roomIndex){
        const roomReservations = []
        let i
        console.log(`reservs for #${roomIndex}: ${JSON.stringify(reservations)}`)
        if(reservations.length > 0)
            for(i = 0; reservations[i] && reservations[i].roomIndex <= roomIndex; i++){
                const reserv = reservations[i]
                console.log(`${roomIndex} got ${JSON.stringify(reserv)}`)
                if(reserv.roomIndex === roomIndex)
                    roomReservations.push(reserv)
            }

        return {
            updatedReservations: reservations.slice(i),
            roomReservations: roomReservations,
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

        throw new Exception(`${reservationStatus} no es un estado conocido`)
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
    */
    getStatusForRoomDay(roomReservations, dayIndex){
        if(roomReservations.length > 0){
            const firstReservation = roomReservations[0]
            const firstReservationStart = firstReservation.startIndex
            const firstReservationEnd = firstReservationStart + firstReservation.totalDays -1
            if(firstReservationEnd < dayIndex)
                throw new Exception("el indice del dia es mayor que el final de la " +
                "primera reservacion. Tienes que llamar a esta funcion incrementando " +
                "dayIndex ordenadamente")

            if(firstReservationEnd === dayIndex){
                let updatedRR = []
                if(roomReservations.length > 1)
                    updatedRR =  roomReservations.slice(1)
                return {
                    status: this.mapReservationStatusToRoomTypes(firstReservation.status),
                    updatedRoomReservations: updatedRR,
                }
            } else if(firstReservationStart <= dayIndex) {
                return {
                    status: this.mapReservationStatusToRoomTypes(firstReservation.status),
                    updatedRoomReservations: roomReservations,
                }
            }
        }

        return {
            status: RoomTypes.disponible,
            updatedRoomReservations: roomReservations,
        }
    }

    render() {
        let columns = Array(this.props.totalDays)
        let i = 0;
        for(i = 0; i < columns.length; i++) columns[i] = 0
        let reservations = [ ...this.props.reservations ]
        return (
          <div>
  					<Table height={this.state.height} selectable={false} fixedHeader={true}>
  						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn key={-1} style={firstHeaderStyle}></TableHeaderColumn>
                  { columns.map(function(it, i) {
                      return (
                        <TableHeaderColumn key={i}>
                          {dateformat(this.props.indexToDate(i), "dd-mmm")}
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
                      const roomIsSelected = i === this.props.newReservation.roomIndex
                      return (
  												<TableRow  key={roomData.roomId}>
  													<TableRowColumn key={-1} style={this.getRoomNumberStyle()}>
  														<div >{roomData.roomId}</div>
  													</TableRowColumn>

  												{Array.apply(null, new Array(this.props.totalDays)).map(function(status, j) {
                              const statusObject = this.getStatusForRoomDay(roomReservations, j)
                              roomReservations = statusObject.updatedRoomReservations
                              const dayStatus = statusObject.status
                              console.log(`room #${i} is ${dayStatus} on ${j}. ${JSON.stringify(roomReservations)}`)
                              const openRoomInfo = () =>
                              { this.props.displayInfo(i, j, 'Gabriela Garcia',
                              new Date(), new Date())  }
  															return (
  																<RoomCell key={i} dayIndex={j} openRoomInfo = {openRoomInfo}
                                    roomStatus={dayStatus} roomIndex={i}
                                      roomIsSelected={roomIsSelected}
                                      spreadsheetStatus={this.props.status}
                                      startIndex={this.props.newReservation.startIndex}
                                      escogerIntervalo={this.props.escogerIntervalo}
  																	escogerHabitacion={this.props.escogerHabitacion}/>)
  														}, this)
  													}
  												</TableRow>)
  									}, this)
  								}
  						</TableBody>
  					</Table>
            <Sidebar rooms={this.props.rooms} roomInfo={this.props.roomInfo}
              cancelarDisplayInfo={this.props.cancelarDisplayInfo} status={this.props.status} />
            <NewReservationDialog open={this.props.status === SpreadsheetStatus.selectCliente}
                newReservation={this.props.newReservation}
                reservarHabitacion={this.props.reservarHabitacion}
                indexToDate={this.props.indexToDate} rooms={this.props.rooms}
                cancelarNuevaReservacion={this.props.cancelarNuevaReservacion}/>
          </div>
        )
    }

};

RoomTable.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};

export default RoomTable;
