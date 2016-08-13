import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import ReservationBroker from './ReservationBroker'
import SpreadsheetDates from './SpreadsheetDates'

import dateformat from 'dateformat'

class NewReservationDialog extends React.Component {


    constructor(props){
        super(props)
        this.onCancelBtnClick = this.onCancelBtnClick.bind(this)
        this.onGuardarBtnClick = this.onGuardarBtnClick.bind(this)
        this.onInputUpdated = this.onInputUpdated.bind(this)
        this.getStartPicker = this.getStartPicker.bind(this)
        this.getEndPicker = this.getEndPicker.bind(this)
        this.getDefaultState = this.getDefaultState.bind(this)

        this.state = this.getDefaultState()
    }

    getDefaultState() {
        const roomTypes = ["sencilla", "doble", "matrimonial"]
        return {
            suggestions: [],
            roomSuggestions: [...roomTypes],
            desiredRoom: null,
            roomTypes: roomTypes, //eventualmente tengo que sacar esto del state
            roomTypeError: "",
            guestName: "",
            guestNameError: "",
            startDate: null,
            startDateError: "",
            endDate: null,
            endDateError: "",
        }
    }

    onCancelBtnClick() {
        this.props.cancelarNuevaReservacion()
    }

    onGuardarBtnClick() {
        let error = false
        const newState = {
            roomTypeError: "",
            guestNameError: "",
            startDateError: "",
            endDateError: "",
        }

        if(!this.state.desiredRoom || this.state.desiredRoom.length === 0){
            error = true
            newState.roomTypeError = "Tipo de habitación inválido"
        } else if(!this.state.roomTypes.includes(this.state.desiredRoom)){
            error = true
            newState.roomTypeError = "Tipo de habitación inválido"
        }

        if(this.state.guestName.length < 3){
            error = true
            newState.guestNameError = "Nombre de huésped inválido"
        }

        const startReservDate = this.state.startDate
        const endReservDate = this.state.endDate
        const startIndex = SpreadsheetDates.dateToIndex(this.props.firstDate, startReservDate)
        const endIndex = SpreadsheetDates.dateToIndex(this.props.firstDate, endReservDate)
        if(!startReservDate || !endReservDate){
            error = true
            if(!startReservDate){
                newState.startDateError = "Por favor ingresa la fecha inicial"
            }
            if(!endReservDate){
                newState.endDateError = "Por favor ingresa la fecha final"
            }
        } else if(endIndex < startIndex){
            error = true
            newState.endDateError = "La fecha final no puede ser anterior a la inicial"
        }

        if(error){
            console.log("error: " + JSON.stringify(errorState))
            this.setState(errorState);
            return;
        }

        const roomToReserve = ReservationBroker.findAvailableRoom(this.props.rooms,
        this.props.reservations, this.state.desiredRoom, startIndex, endIndex)
        if(roomToReserve !== -1){
            const newReservation = {
                roomIndex: roomToReserve,
                startIndex: startIndex,
                totalDays: endIndex - startIndex + 1,
                clientName: this.state.guestName,
            }
            this.setState(this.getDefaultState())
            this.props.reservarHabitacion(newReservation, this.props.rooms[roomToReserve].roomId)
        }
    }

    onInputUpdated(value) {
        this.setState({
            guestNameError: "",
            suggestions : [ value ],
            guestName : value,
        })
    }

    getStartPicker(){
        const hintText = "Inicio de la reservación"
        const minDate = new Date()
        const setStartDate = (e, newDate) => {this.setState({startDate: newDate, startDateError: ''})}
        return (<DatePicker minDate={minDate} value={this.state.startDate}
          onChange={ setStartDate } errorText={this.state.startDateError} hintText={hintText} />)
    }

    getEndPicker(){
        const hintText = "Fin de la reservación"
        const minDate = this.state.startDate || new Date()
        const setEndDate = (e, newDate) => {this.setState({endDate: newDate, endDateError: ""})}
        return (<DatePicker minDate={minDate} value={this.state.endDate}
          errorText={this.state.endDateError}
          onChange={ setEndDate } hintText={hintText} />)
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

        let startPicker, endPicker

        return (
          <Dialog open={this.props.open}
            title={"Nueva Reservación"}
            actions={actions}
            modal={true}>
              <AutoComplete onUpdateInput={this.onInputUpdated} dataSource={this.state.suggestions}
                hintText="Huésped" errorText={this.state.guestNameError}/>
              { this.getStartPicker() }
              { this.getEndPicker() }
              <AutoComplete onUpdateInput={(input) => this.setState({roomTypeError: ""})}
              filter={AutoComplete.fuzzyFilter} openOnFocus={true}
              onNewRequest={(req, i) => {this.setState({desiredRoom: req})}}
              errorText={this.state.roomTypeError} dataSource={this.state.roomTypes} hintText="Tipo de habitación" />
          </Dialog>
        )
    }

}


export default NewReservationDialog;
