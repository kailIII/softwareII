import React from 'react';
import Avatar from 'material-ui/Avatar';
import {
    purple500,
} from 'material-ui/styles/colors'
import * as RoomTypes from '../../../../../constants/RoomTypes.js';

  
class RoomStatusIcon extends React.Component {

    

    getIcon(){
        switch(this.props.roomStatus){
        case RoomTypes.disponible:
            return (<div />)
        case RoomTypes.reservado:
            return (<Avatar backgroundColor={purple500} >R</Avatar>)
        case RoomTypes.ocupado:
            return (<Avatar backgroundColor={purple500} >O</Avatar>)
        case RoomTypes.sucio:
            return (<Avatar backgroundColor={purple500} >S</Avatar>)
        case RoomTypes.mantenimiento:
            return (<Avatar backgroundColor={purple500} >M</Avatar>)
        }

        return (<p>RIP</p>)

    }

    render() {
        return this.getIcon()
    }
};

RoomStatusIcon.propTypes = {
    roomStatus: React.PropTypes.oneOf([
        RoomTypes.disponible, 
        RoomTypes.reservado, 
        RoomTypes.ocupado, 
        RoomTypes.sucio, 
        RoomTypes.mantenimiento, 
    ]),
};

export default RoomStatusIcon;
