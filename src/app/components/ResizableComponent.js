import React from 'react';


class ResizableComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {width : '0px', height : '0px',
          totalVerticalMargin: this.props.initialMarginY,
          totalHorizontalMargin: this.props.initialMarginX }
        this.updateDimensions = this.updateDimensions.bind(this)
    }

    updateDimensions() {
        const w = window
        const d = document
        const documentElement = d.documentElement
        const body = d.getElementsByTagName('body')[0]
        const width = (w.innerWidth || documentElement.clientWidth
          || body.clientWidth) - (this.state.totalHorizontalMargin || 0)
        const height = (w.innerHeight|| documentElement.clientHeight
          || body.clientHeight) - (this.state.totalVerticalMargin || 0)

        this.setState({width: `${width}px`, height: `${height}px`});
    }

    componentWillMount() {
        this.updateDimensions();
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
}

export default ResizableComponent;
