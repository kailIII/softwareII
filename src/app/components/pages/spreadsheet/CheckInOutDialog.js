import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import SpreadsheetDates from './SpreadsheetDates'
import AccountBox from 'material-ui/svg-icons/action/account-box';
import { cyan800 } from 'material-ui/styles/colors'

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
        this.setState(this.getDefaultState())
        this.props.cancel()
    }

    onGuardarBtnClick(){
        if(this.state.guestName.length > 0){
            const waitingReservs = ReservationBroker.findTodaysReservationsOfGuest(
              this.props.reservations, this.state.guestName)
            if(this.props.status === SpreadsheetStatus.checkInDialog)
                this.props.checkIn(waitingReservs)
            else
                this.props.checkOut(waitingReservs)
        } else {
            this.setState({guestNameError: "No se encontraron reservaciones para ese huésped"})
        }
    }

    onGuestSelected(guest, index){
        if(index === -1){
            this.setState({guestNameError: "No se encontraron reservaciones para ese huésped"})
        } else {
            this.setState({guestName: guest.clientName, guestNameError: ''})
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

        //copiado y pegado de NewReservationDialog:S
        const iconStyle = {position: 'absolute', marginTop: '4px', marginLeft: '16px',
        marginRight: '24px', height: '96px', width: '96px'}
        const divStyle = {position: 'relative', display: 'block'}
        const inputStyle = {marginLeft: '80px'}
        return (
          <Dialog open={this.props.status === SpreadsheetStatus.checkInDialog ||
              this.props.status === SpreadsheetStatus.checkOutDialog}
            title={title} actions={actions} modal={true}>
            <div style={divStyle}>
                <AccountBox color={cyan800} style={iconStyle} viewBox={'0 0 48 48'}/>
                <AutoComplete
                filter={AutoComplete.fuzzyFilter} maxSearchResults={5}
                onNewRequest={this.onGuestSelected} style={inputStyle}
                dataSourceConfig={{text: 'clientName', value: 'clientName'}}
                errorText={this.state.guestNameError} dataSource={this.props.reservations}
                hintText="Nombre del huésped" />
              </div>
          </Dialog>
        )
    }
}


export default CheckInOutDialog;
