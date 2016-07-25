import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {List, Drawer, ListItem, Dialog, FlatButton} from 'material-ui';
import {deepOrange500} from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete';
import ActionsSettingsApplications from 'material-ui/svg-icons/action/settings-applications';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CreatePaymentForm from './create_payment';
import ShowPaymentsForm from './show_detailed_payments';
const showCheckB = false;
import {grey400, grey900, blueGrey50, darkBlack, lightBlack, blue50, cyan200, blue900} from 'material-ui/styles/colors';

const divTableStyle = {
    padding:'10%',
    background:blue50,

};

const headerTableStyle = {
    color:blue900,
};


class Show_Payments extends React.Component {
    constructor(props){
        super(props);
        this.state = {open: false,}
        this.handleClick = this.handleClick.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handleAddOpen = this.handleAddOpen.bind(this);
        this.handleShowPayments = this.handleShowPayments.bind(this);
        this.iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left">
              <MoreVertIcon color={grey400} /></IconButton>
        );
    }
    handleAddOpen() {
        console.log("add new payment to guest");
    }

    componentWillMount() {

    }

    handleShowPayments() {
    }
    handleClick(){
        this.props.addPayment("o8989",100,"adasd");
        return true;
    }

    render() {
        let guests = Array(this.props.guests);
        let payments = Array(this.props.payments);
	console.log(this.props.payments);
        for(var i = 0; i < guests.length; i++) {
            for(var j = 0; j < payments.length; j++) {
                console.log(i);
            }
        };

        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={null}
            />,
            <FlatButton
                label="Aceptar"
                primary={true}
                onTouchTap={null}
            />,
        ];

        return (


            <div>
              <CreatePaymentForm ref='create_payment' url='/#/null'  onTouchTap={null} />
              <Dialog
                  title="Eliminar pago"
                  actions={actions}
                  modal={true}
                  open={this.state.open}>
                Esta seguro que desea eliminar este pago?
                </Dialog>
                <div style={divTableStyle}>
                  <Table onRowSelection={this.onRowSelection}>

                    <TableHeader
                        displaySelectAll={showCheckB}
                        adjustForCheckbox={showCheckB}>
                      <TableRow>
                        <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                          <span style={{color: darkBlack}}><h3>Pagos</h3></span>
                </TableHeaderColumn>
                <TableHeaderColumn colSpan="1" tooltip="Agregar Pago" style={{textAlign: 'center'}}>
                  <span ><FloatingActionButton mini={true} onTouchTap={this.handleAddOpen}>
                    <ContentAdd />
                </FloatingActionButton>
                  </span>
                </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>Cliente</TableHeaderColumn>
                  <TableHeaderColumn>Identificacion</TableHeaderColumn>
                  <TableHeaderColumn>Mostrar Pagos</TableHeaderColumn>
                </TableRow>
                </TableHeader>

                <TableBody
                    displayRowCheckbox={showCheckB}>
                  {this.props.guests.map(function (guest,i) {
                       return (
                           <TableRow key={i}>
                             <TableRowColumn key={i}>{guest.nombre}</TableRowColumn>
                             <TableRowColumn key={i}>{guest.cedula}</TableRowColumn>
                             <TableRowColumn><span>
                               <ShowPaymentsForm
				   payments ={this.props.payments}
				   cedula = {guest["cedula"]}
			       />
                             </span></TableRowColumn>
                            </TableRow>
                       );
                   },this)}
            </TableBody>
            </Table>
                </div>

                <Snackbar
                    open={false}
                    message={null}
                    autoHideDuration={1500}
                    onRequestClose={null}
                />
            </div>
        );
    }

};

export default Show_Payments;
