import React from 'react';


class ResizableComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {height : '0px',
          totalVerticalMargin: this.props.initialMarginY || 0 }
        this.updateDimensions = this.updateDimensions.bind(this)
    }

    updateDimensions() {
        const w = window
        const d = document
        const documentElement = d.documentElement
        const body = d.getElementsByTagName('body')[0]
        const height = (w.innerHeight|| documentElement.clientHeight
          || body.clientHeight) - (this.state.totalVerticalMargin || 0)

        this.setState({height: `${height}px`});
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
