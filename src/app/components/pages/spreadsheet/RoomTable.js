import React from 'react';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ListItem from 'material-ui/List/ListItem';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import { purple500 } from 'material-ui/styles/colors'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import dateformat from 'dateformat';
import RoomStatusIcon from './RoomStatusIcon';
import NewReservationDialog from './NewReservationDialog';
import * as RoomTypes from '../../../../../constants/RoomTypes'
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

        let subtitle = ""
        if(dayStatus === RoomTypes.ocupado)
            subtitle = 'Ocupado por:'
        else if(dayStatus === RoomTypes.reservado)
            subtitle = 'Reservado para:'

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

    render() {
        let columns = Array(this.props.totalDays)
        let i = 0;
        for(i = 0; i < columns.length; i++) columns[i] = 0

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
                      return (
  												<TableRow  key={roomData.roomId}>
  													<TableRowColumn key={-1} style={this.getRoomNumberStyle()}>
  														<div >{roomData.roomId}</div>
  													</TableRowColumn>

  												{roomData.days.map(function(status, j) {
                              const roomIsSelected = i === this.props.newReservation.roomIndex
                              const openRoomInfo = () =>
                              { this.props.displayInfo(i, j, 'Gabriela Garcia',
                              new Date(), new Date())  }
  															return (
  																<RoomCell key={i} dayIndex={j} openRoomInfo = {openRoomInfo}
                                    roomStatus={status} roomIndex={i}
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
