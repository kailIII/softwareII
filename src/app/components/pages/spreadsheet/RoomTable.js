import React from 'react';
import Avatar from 'material-ui/Avatar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import dateformat from 'dateformat';
import RoomStatusIcon from './RoomStatusIcon';
import * as RoomTypes from '../../../../../constants/RoomTypes'

const firstColumnWidth = '30px'
const firstHeaderStyle = {
    width: firstColumnWidth,
}

class RoomCell extends React.Component {
	constructor (props) {
		super(props);
		this.pickRoomDate = this.pickRoomDate.bind(this)
	}

	pickRoomDate() {
		console.log("click", "clickedRoom: " + this.props.roomStatus+ '/' + RoomTypes.disponible)
		if(this.props.roomStatus === RoomTypes.disponible)
			this.props.dispatch(this.props.roomId, this.props.day)
	}

	render (){
		return (
			<TableRowColumn onClick={this.pickRoomDate}>
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
															return (
																<RoomCell key={i} day={this.props.indexToDate(j)}
																    dayIndex={j} roomStatus={status} roomIndex={i}
																	dispatch={this.props.escogerHabitacion}/>)
														}, this)
													}
												</TableRow>)
									}, this)
								}
							</TableBody>
					</Table>
        )
    }

};

RoomTable.contextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
};

export default RoomTable;
