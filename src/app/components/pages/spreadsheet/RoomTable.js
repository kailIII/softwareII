import React from 'react';
import Avatar from 'material-ui/Avatar';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {
    purple500,
    cyan800,
} from 'material-ui/styles/colors'

const firstColumnWidth = '30px'
const firstHeaderStyle = {
    width: firstColumnWidth,
}

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
          <TableBody displayRowCheckbox={false}>
            <TableRow>

              <TableRowColumn style={this.getRoomNumberStyle()}>
                <div >1</div>
              </TableRowColumn>
              <TableRowColumn>
                <Avatar backgroundColor={purple500} >R</Avatar>
              </TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={this.getRoomNumberStyle()}>
                <div >2</div>
              </TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn style={this.getRoomNumberStyle()}>
                <div >3</div>
              </TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
              <TableRowColumn>Blue</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>)
    }

};

RoomTable.contextTypes = {
      muiTheme: React.PropTypes.object.isRequired,
};

export default RoomTable;
