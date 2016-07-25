import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const styles = {
    radioButton: {
        marginTop: 16,
    },
};

const showCheckB = false;
import {grey400, grey900, blueGrey50, darkBlack, lightBlack, blue50, cyan200, blue900} from 'material-ui/styles/colors';

const divTableStyle = {
    padding:'10%',
    background:blue50,

};

const headerTableStyle = {
    color:blue900,
};

export default class ShowPaymentsForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            payments: [],
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    handleOpen(){
        this.setState({open: true});

    }

    handleClose(){
        this.setState({open: false});
    }

    /*Here we load all the payments from a guest just using its id*/
    componentWillMount() {
        console.log("cargar componentes por id");
        let cedula = this.props.cedula;
        let all_payments = this.props.payments;
        /*Load the payments  from the selected guest*/
        let temp_payments = all_payments.filter(function (payment) {
            return payment["cedula"] === this.props.cedula;
        },this);
	console.log("imprimiendo payments");
	console.log(temp_payments);
        this.setState({payments: temp_payments});
    }

    render() {
        const actions = [
            <FlatButton
                label="Cerrar"
                primary={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div>
              <RaisedButton label="Mostrar Pagos" onTouchTap={this.handleOpen} />
              <Dialog
                  title="Scrollable Dialog"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  autoScrollBodyContent={true}>

              <div style={divTableStyle}>
                 <Table onRowSelection={this.onRowSelection}>
                    <TableHeader
                        displaySelectAll={showCheckB}
                        adjustForCheckbox={showCheckB}>
                      <TableRow>
                        <TableHeaderColumn colSpan="4" style={{textAlign: 'center'}}>
                          <span style={{color: darkBlack}}><h3>Pagos</h3></span>
                </TableHeaderColumn>
                </TableRow>
                <TableRow>
                  <TableHeaderColumn>Cantidad</TableHeaderColumn>
                  <TableHeaderColumn>Descripcion</TableHeaderColumn>
                  <TableHeaderColumn>Pagado?</TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={showCheckB}>
                  {this.state.payments.map(function (payment,i) {
                       return (
                           <TableRow key={i}>
                             <TableRowColumn key={i}>{payment.valor}</TableRowColumn>
                             <TableRowColumn key={i}>{payment.description}</TableRowColumn>
			     {(payment.pagado
			      ? <TableRowColumn key={i}>Item pagado</TableRowColumn>
			      : <TableRowColumn key={i}>Item no pagado</TableRowColumn>
			      )}
                            </TableRow>
                       );
                   },this)}
                </TableBody>
               </Table>
              </div>
        </Dialog>
       </div>
        );
    }
}

export default ShowPaymentsForm;
