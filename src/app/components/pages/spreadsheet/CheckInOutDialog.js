import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import SpreadsheetDates from './SpreadsheetDates'

import dateformat from 'dateformat'
import SpreadsheetStatus from '../../../../../constants/SpreadsheetStatus'
import ReservationBroker from './ReservationBroker'

class CheckInOutDialog extends React.Component {

    constructor(props){
        super(props)
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
        this.onGuardarBtnClick = this.onGuardarBtnClick.bind(this)
        this.getDefaultState = this.getDefaultState.bind(this)
        this.onGuestSelected = this.onGuestSelected.bind(this)

        this.state = this.getDefaultState()
    }

    getDefaultState() {
        return {
            guestName: "",
            guestNameError: "",
        }
    }

    onCancelBtnClick(){
        this.props.cancel()
    }

    onGuardarBtnClick(){
        const waitingReservs = ReservationBroker.findTodaysReservationsOfGuest(
          this.props.reservations, this.state.guestName)
        this.props.checkIn(waitingReservs)
    }

    onGuestSelected(guest, index){
        if(index === -1){
            this.setState({guestNameError: "No se encontraron reservaciones para ese huésped"})
        } else {
            this.setState({guestName: guest.clientName})
        }
    }

    render() {

        let title = "Check-In"
        if(this.props.status === SpreadsheetStatus.checkOutDialog)
            title = "Check-Out"

        const actions = [
            <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.onCancelBtnClick}
      />,
            <FlatButton
        label={title} disabled = {this.state.guestName.length === 0}
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onGuardarBtnClick}
      />,
        ]

        return (
          <Dialog open={this.props.open}
            title={title}
            actions={actions}
            modal={true}>
              <AutoComplete
              filter={AutoComplete.fuzzyFilter} maxSearchResults={5}
              onNewRequest={this.onGuestSelected}
              dataSourceConfig={{text: 'clientName', value: 'clientName'}}
              errorText={this.state.guestNameError} dataSource={this.props.reservations}
              hintText="Nombre del huésped" />
          </Dialog>
        )
    }
}


export default CheckInOutDialog;
