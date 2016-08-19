import React from 'react';
import Avatar from 'material-ui/Avatar';
import { primaryColor700 } from '../../../../TabubaTheme'
import { yellow500, lightBlueA400, grey400 } from 'material-ui/styles/colors'
import * as ReservationStatus from '../../../../../constants/ReservationStatus.js';


class RoomStatusIcon extends React.Component {

    getIcon(){
        //style to center the avatar. lineHeight is 40 because the avatar from material-ui
        // has height of 40px
        const centerStyle = {margin: 'auto', display: 'block', textAlign:'center', lineHeight:'40px'}
        switch(this.props.roomStatus){
        case ReservationStatus.disponible:
            return <div />
        case ReservationStatus.waiting:
            return <Avatar style={centerStyle} backgroundColor={yellow500} >R</Avatar>
        case ReservationStatus.checkedIn:
            return <Avatar style={centerStyle} backgroundColor={lightBlueA400} >I</Avatar>
        case ReservationStatus.checkedOut:
            return <Avatar style={centerStyle} backgroundColor={grey400} >O</Avatar>
        }

        return <p>RIP</p>

    }

    render() {
        return this.getIcon()
    }
}

RoomStatusIcon.propTypes = {
    roomStatus: React.PropTypes.oneOf([
        ReservationStatus.disponible,
        ReservationStatus.waiting,
        ReservationStatus.checkedIn,
        ReservationStatus.checkedOut,
    ]),
};

export default RoomStatusIcon;
