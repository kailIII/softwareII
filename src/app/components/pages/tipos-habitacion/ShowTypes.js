import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NewTypeSuite from './Create-Suite-Type';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 525,
    overflowY: 'auto',
    marginBottom: 5,
  },
  floatActionButton:{
      marginRight: 20,
  },
  buttons:{
      margin: 12,
  },
};

const tilesData = [
  {
    img: 'images/room-types/room596_1_thumb.jpg',
    title: 'Vista al Mar',
    description: 'Cama King Size, DirecTV, nevera de 5 pies, a/c, baño privado.',
  },
  {
    img: 'images/room-types/room595_1_thumb.jpg',
    title: 'Single Room',
    description: 'Cama Queen Size, DirecTV, nevera de 5 pies, a/c, baño privado',
  },
  {
    img: 'images/room-types/room597_thumb.jpg',
    title: 'Twin Room',
    description: 'Posee una cama Queen y una Tween Size, DirecTV, nevera de 5 pies, a/c, baño privado',
  },
];

export default class RoomTypesShow extends React.Component{

    constructor(props) {
    super(props);
    this.state = {
      open: false,
      openSnackBar:false,
    };
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTapEditar = this.handleTouchTapEditar.bind(this);
  }

  handleTouchTapEditar() {
  this.setState({
    open: true,
  });
  };

  handleRequestClose() {
  this.setState({
    openSnackBar: false,
  });
};
    handleOpen () {
      this.setState({open: true});
    };

    handleClose  ()  {
      this.setState({open: false});
    };
    handleTouchTap  (){
      this.setState({
        openSnackBar: true,
      });
    };

render(){
    const actions = [
      <RaisedButton
          label="Guardar"
          onTouchTap={this.handleTouchTap}
          backgroundColor="#add580"
          style={styles.buttons}
          />,
      <RaisedButton
          label="Atrás"
          style={styles.buttons}
          onTouchTap={this.handleClose}
          />
    ];

return(
    <div>
  <div style={styles.root}>
      <Subheader>Tipos de Suite</Subheader>
    <GridList
      cellHeight={200}
      cols={1}
      style={styles.gridList}
    >

      {tilesData.map((tile) => (
        <GridTile
          key={tile.img}
          title={tile.title}
          subtitle={<span>{tile.description}</span>}
          actionIcon={
              <IconMenu
                  iconButtonElement={
                      <IconButton>
                          <MoreVertIcon color="white"/>
                    </IconButton>
                }
              >
                <MenuItem primaryText="Editar" onTouchTap={this.handleTouchTapEditar} />
                <MenuItem primaryText="Eliminar" />
                </IconMenu>
      }>
          <img src={tile.img} />
        </GridTile>
      ))}
    </GridList>

  </div>
  <FloatingActionButton onTouchTap={this.handleOpen} mini={true} style={styles.floatActionButton}>
        <ContentAdd />
    </FloatingActionButton>
    <Dialog
          title="Añadir Nuevo Tipo de Habitación"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <NewTypeSuite />
        </Dialog>
        <Snackbar
            open={this.state.openSnackBar}
            message="Tipo de Habitación Añadida"
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
            />
  </div>
)
}

};

export default RoomTypesShow;
