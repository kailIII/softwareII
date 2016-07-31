import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import Add from 'material-ui/svg-icons/content/add';


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
            <MenuItem primaryText="Realizar check-in" />
            <MenuItem primaryText="Realizar check-out" />
          </IconMenu>
        )
    }
}

export default SpreadsheetMenu;
