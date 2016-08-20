import React from 'react';
import Avatar from 'material-ui/Avatar';
import { primaryColor700 } from '../../../../TabubaTheme'
import * as RoomTypes from '../../../../../constants/RoomTypes.js';


class RoomStatusIcon extends React.Component {



    getIcon(){
        //style to center the avatar. lineHeight is 40 because the avatar from material-ui
        // has height of 40px
        const centerStyle = {margin: 'auto', display: 'block', textAlign:'center', lineHeight:'40px'}
        switch(this.props.roomStatus){
        case RoomTypes.disponible:
            return (<div />)
        case RoomTypes.reservado:
            return (<Avatar style={centerStyle} backgroundColor={primaryColor700} >R</Avatar>)
        case RoomTypes.ocupado:
            return (<Avatar style={centerStyle} backgroundColor={primaryColor700} >O</Avatar>)
        case RoomTypes.sucio:
            return (<Avatar backgroundColor={primaryColor700} >S</Avatar>)
        case RoomTypes.mantenimiento:
            return (<Avatar backgroundColor={primaryColor700} >M</Avatar>)
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
