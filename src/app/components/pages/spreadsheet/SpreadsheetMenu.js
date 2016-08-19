import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import Add from 'material-ui/svg-icons/content/add';

import SpreadsheetDates from './SpreadsheetDates'


export default class SpreadsheetMenu extends React.Component {

    constructor(props, context) {
        super(props);
    }

    render(){
        return (
          <IconMenu
          iconButtonElement={<IconButton><Add color={"#FFFFFF"}/></IconButton>}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}} >
            <MenuItem primaryText="Reservar habitación"
              onTouchTap={() => { this.props.crearNuevaReservacion() }}/>
            <MenuItem primaryText="Realizar check-in"
              onTouchTap={() => {
                this.props.newCheckIn(SpreadsheetDates.dateToIndex(
                  this.props.firstDate, new Date())) }}/>
            <MenuItem primaryText="Realizar check-out" onTouchTap={() => {
                this.props.newCheckOut(SpreadsheetDates.dateToIndex(
                  this.props.firstDate, new Date())) }}/>
          </IconMenu>
        )
    }
}

export default SpreadsheetMenu;
