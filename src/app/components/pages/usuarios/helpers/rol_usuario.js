import React, {Component, PropTypes} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const styles = {
    customWidth: {
        width: 150,
    },
};
export default class Rol_Usuario extends Component {
    constructor(props, context) {
        super(props);
        this.state = {value: 1};
    }
    handleChange(event, index, value){
        this.setState({value});
    }

    render() {
        return (
                <div>
                <SelectField value={this.state.value} onChange={this.handleChange}>
                <MenuItem value={1} primaryText="ADMINISTRADOR" />
                <MenuItem value={2} primaryText="SECRETARIO" />
                  <MenuItem value={3} primaryText="CONTADOR" />
                </SelectField>
                <br />
	</div>);
    }

}
