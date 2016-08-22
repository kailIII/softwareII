import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
import DatePicker from 'material-ui/DatePicker';
import ReservationBroker from './ReservationBroker'
import SpreadsheetDates from './SpreadsheetDates'
import AccountBox from 'material-ui/svg-icons/action/account-box';
import DateRange from 'material-ui/svg-icons/action/date-range';
import Today from 'material-ui/svg-icons/action/today';
import Hotel from 'material-ui/svg-icons/maps/hotel';

import dateformat from 'dateformat'
import roomTypes from '../../../data/roomTypes'
import API from '../../../../clientAPI'
import { primaryColor800 } from '../../../../TabubaTheme'

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
        return {
            suggestions: [],
            desiredRoom: "",
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
        this.setState(this.getDefaultState())
        this.props.cancelarNuevaReservacion()
    }

    onGuardarBtnClick() {
        const validation = ReservationBroker.validateNewReservation(this.state.desiredRoom,
          this.state.guestName, this.props.firstDate, this.state.startDate, this.state.endDate)

        if(validation.error){
            this.setState(validation.newState);
            return;
        }

        console.log('new reserva')
        API.newReservation(this.state.desiredRoom, this.state.guestName,
          this.state.startDate, this.state.endDate, (err, res) => {
              if(!err && res.statusCode === 200){
                  console.log(JSON.stringify(res))
                  const response = JSON.parse(res.text)
                  const firstDateStr = dateformat(this.state.startDate, 'dddd, mmmm, dS')
                  this.setState(this.getDefaultState())
                  this.props.reservarHabitacion(response.newReservation,
                    firstDateStr, response.reservationIndex, 
                    this.props.rooms[response.newReservation.roomIndex].roomId)
                  //this.props.reservarHabitacion()
              }
          })

          /*
        if(roomToReserve !== -1){
            const newReservation = {
                roomIndex: roomToReserve,
                startIndex: startIndex,
                totalDays: endIndex - startIndex + 1,
                clientName: this.state.guestName,
            }
            this.props.reservarHabitacion(newReservation, firstDateStr,
               this.props.rooms[roomToReserve].roomId)
        }
        */
    }

    onInputUpdated(value) {
        this.setState({
            guestNameError: "",
            suggestions : [ value ],
            guestName : value,
        })
    }

    getStartPicker(style){
        const hintText = "Inicio de la reservación"
        const minDate = new Date()
        const setStartDate = (e, newDate) => {this.setState({startDate: newDate, startDateError: ''})}
        return (<DatePicker minDate={minDate} value={this.state.startDate} style={style}
          onChange={ setStartDate } errorText={this.state.startDateError} hintText={hintText} />)
    }

    getEndPicker(style){
        const hintText = "Fin de la reservación"
        const minDate = this.state.startDate || new Date()
        const setEndDate = (e, newDate) => {this.setState({endDate: newDate, endDateError: ""})}
        return (<DatePicker minDate={minDate} value={this.state.endDate}
          errorText={this.state.endDateError} style={style}
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
        const iconStyle = {position: 'absolute', margin: '12px'}
        const divStyle = {position: 'relative', display: 'block'}
        const inputStyle = {marginLeft: '48px'}
        return (
          <Dialog open={this.props.open}
            title={"Nueva Reservación"}
            actions={actions}
            modal={true}>
              <div style={divStyle}>
                <AccountBox color={primaryColor800} style={iconStyle}/>
                <AutoComplete style={inputStyle} onUpdateInput={this.onInputUpdated} dataSource={roomTypes}
                  hintText="Huésped" errorText={this.state.guestNameError}/>
              </div>
              <div style={divStyle}>
                <Today color={primaryColor800} style={iconStyle}/>
                { this.getStartPicker(inputStyle) }
              </div>
              <div style={divStyle}>
                <DateRange color={primaryColor800} style={iconStyle}/>
                { this.getEndPicker(inputStyle) }
              </div>
              <div style={divStyle}>
                <Hotel color={primaryColor800} style={iconStyle}/>
                <AutoComplete onUpdateInput={(input) =>
                  this.setState({desiredRoom: "", roomTypeError: ""})}
                  filter={AutoComplete.fuzzyFilter} openOnFocus={true}
                  onNewRequest={(req, i) => {this.setState({desiredRoom: req})}}
                  style={inputStyle}
                  errorText={this.state.roomTypeError} dataSource={this.state.roomTypes} hintText="Tipo de habitación" />
              </div>
          </Dialog>
        )
    }

}


export default NewReservationDialog;
