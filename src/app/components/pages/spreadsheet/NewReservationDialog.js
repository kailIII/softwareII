import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';

import dateformat from 'dateformat'

class NewReservationDialog extends React.Component {


    constructor(props){
        super(props)
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
        this.onGuardarBtnClick = this.onGuardarBtnClick.bind(this)
        this.onInputUpdated = this.onInputUpdated.bind(this)
        this.getDialogMessage = this.getDialogMessage.bind(this)

        this.state = {
            suggestions: [],
            guestName: "",
        }

    }

    onCancelBtnClick() {
        this.props.cancelarNuevaReservacion()
    }

    onGuardarBtnClick() {
        if(this.state.guestName.length > 3)
            this.props.reservarHabitacion(this.props.newReservation, this.state.guestName)
    }

    onInputUpdated(value) {
        this.setState({
            suggestions : [ value ],
            guestName : value,
        })
    }

    getDialogMessage() {
        const newReservation = this.props.newReservation
        if(newReservation.endIndex === -1)
            return ""

        const indexToDate = this.props.indexToDate
        const selectedRoomId = this.props.rooms[newReservation.roomIndex].roomId
        let msg = "Reservar habitación #" + selectedRoomId + ' '
        const format = "fullDate"
        const endIndex = newReservation.startIndex + newReservation.totalDays - 1
        if(newReservation.startIndex === newReservation.endIndex)
            msg += " el día " + dateformat(indexToDate(newReservation.startIndex), format) + " para: "
        else {
            const startDate = dateformat(indexToDate(newReservation.startIndex), format)
            const endDate = dateformat(indexToDate(endIndex), format)
            msg += " entre el " + startDate + " y " + endDate + " para:"
        }

        return msg
    }

    render() {

        const actions = [
            <FlatButton
        label="Cancelar"
        primary={true}
        onTouchTap={this.onCancelBtnClick}
      />,
            <FlatButton
        label="Guardar"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onGuardarBtnClick}
      />,
        ]
        let msg = ""
        if(this.props.open)
            msg = this.getDialogMessage()
        return (
      <Dialog open={this.props.open}
        title={"Nueva Reservación"}
        actions={actions}
        modal={true}>
          <div>{msg}</div>
          <AutoComplete onUpdateInput={this.onInputUpdated} dataSource={this.state.suggestions} hintText="Huésped" />
      </Dialog>
    )
    }

}


export default NewReservationDialog;
