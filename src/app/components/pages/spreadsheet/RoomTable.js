import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RoomStatusIcon from './RoomStatusIcon';
import * as RoomTypes from '../../../../../constants/RoomTypes'

const firstColumnWidth = '30px'
const firstHeaderStyle = {
    width: firstColumnWidth,
}

const fakeRoomList = [
    {
        roomNumber: 1,
        roomStatus: [
            { day: 1, status: RoomTypes.ocupado },
            { day: 2, status: RoomTypes.disponible },
            { day: 3, status: RoomTypes.disponible },
            { day: 4, status: RoomTypes.disponible },
            { day: 5, status: RoomTypes.reservado },
            { day: 6, status: RoomTypes.reservado },
        ],
    }, 
    {
        roomNumber: 2,
        roomStatus: [
            { day: 1, status: RoomTypes.ocupado },
            { day: 2, status: RoomTypes.disponible },
            { day: 3, status: RoomTypes.disponible },
            { day: 4, status: RoomTypes.disponible },
            { day: 5, status: RoomTypes.reservado },
            { day: 6, status: RoomTypes.reservado },
        ],
    },
    {
        roomNumber: 3,
        roomStatus: [
            { day: 1, status: RoomTypes.ocupado },
            { day: 2, status: RoomTypes.disponible },
            { day: 3, status: RoomTypes.disponible },
            { day: 4, status: RoomTypes.disponible },
            { day: 5, status: RoomTypes.reservado },
            { day: 6, status: RoomTypes.reservado },
        ],
    },
]

class RoomTable extends React.Component {

    getRoomNumberStyle() {
      return  {
        backgroundColor: this.context.muiTheme.palette.primary1Color,
        color: 'white',
        width: firstColumnWidth,
        textAlign: 'center',
        fontSize: '22px',
        }
    }

    fromJsonToRoomRow(roomData){
        return (
            <TableRow  key={roomData.roomNumber}>
              <TableRowColumn style={this.getRoomNumberStyle()}>
                <div >{roomData.roomNumber}</div>
              </TableRowColumn>
              {roomData.roomStatus.map(function(roomDay) {
                  return (
                    <TableRowColumn key={roomDay.day}>
                      <RoomStatusIcon roomStatus={roomDay.status}/>
                    </TableRowColumn>)
                })
              }
            </TableRow>)
    }

    renderTableBody(){
        return (
          <TableBody displayRowCheckbox={false}>
            {fakeRoomList.map(function (room) {
                return this.fromJsonToRoomRow(room)
              }, this)
            }
          </TableBody>)
    }



    render() {
        return (
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={firstHeaderStyle}></TableHeaderColumn>
              <TableHeaderColumn>14-JUN</TableHeaderColumn>
              <TableHeaderColumn>15-JUN</TableHeaderColumn>
              <TableHeaderColumn>16-JUN</TableHeaderColumn>
              <TableHeaderColumn>17-JUN</TableHeaderColumn>
              <TableHeaderColumn>18-JUN</TableHeaderColumn>
              <TableHeaderColumn>19-JUN</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {this.renderTableBody()}
        </Table>)
    }

};

RoomTable.contextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
};

export default RoomTable;
