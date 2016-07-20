import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import dateformat from 'dateformat';
import RoomStatusIcon from './RoomStatusIcon';
import NewReservationDialog from './NewReservationDialog';
import * as RoomTypes from '../../../../../constants/RoomTypes'
import * as SpreadsheetStatus from '../../../../../constants/SpreadsheetStatus'

const firstColumnWidth = '30px'
const firstHeaderStyle = {
    width: firstColumnWidth,
}

class RoomCell extends React.Component {
    constructor (props) {
        super(props);
        this.onRoomCellClicked = this.onRoomCellClicked.bind(this)
    }

    onRoomCellClicked() {
        switch(this.props.spreadsheetStatus){
        case SpreadsheetStatus.normal:
            if(this.props.roomStatus === RoomTypes.disponible)
                this.props.escogerHabitacion(this.props.roomIndex, this.props.dayIndex)
            break;
        case SpreadsheetStatus.selectFecha:
            if(this.props.roomIsSelected && this.props.dayIndex >= this.props.startIndex)
                this.props.escogerIntervalo(this.props.dayIndex)
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

class RoomTable extends React.Component {
    constructor(props){
        super(props)
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


    render() {
        let columns = Array(this.props.totalDays)
        let i = 0;
        for(i = 0; i < columns.length; i++) columns[i] = 0
        return (
          <div>
  					<Table selectable={false}>
  						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn key={-1} style={firstHeaderStyle}></TableHeaderColumn>
                  { columns.map(function(it, i) {
                      return (
                        <TableHeaderColumn>
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
  															return (
  																<RoomCell key={i} dayIndex={j}
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
