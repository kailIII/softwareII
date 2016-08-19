import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500, cyan100, cyan700, cyan800} from 'material-ui/styles/colors';


{/* declarar theme en una variable para customizarlo */}
const myTheme = getMuiTheme({
    palette: {
        primary1Color: cyan500,
    },
});

module.exports = {
    muiTheme: myTheme,
    primaryColor: cyan500,
    primaryColor100: cyan100,
    primaryColor700: cyan700,
    primaryColor800: cyan800,
}
