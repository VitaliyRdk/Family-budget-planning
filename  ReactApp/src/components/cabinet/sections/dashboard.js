import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import PieChart from "react-svg-piechart";
import randomColor from 'random-color';

/*Actions*/
import * as OperationsActions from './../../../actions//operationsActions';
import { Link } from 'react-router-dom';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedSector: null,
        }
        this.handleMouseEnterOnSector = this.handleMouseEnterOnSector.bind(this);
    }

    componentDidMount(){
        OperationsActions.getStatistic();
    }

    handleMouseEnterOnSector(sector) {
        this.setState({expandedSector: sector})
    }

    render() {
        const {expandedSector} = this.state;
        var operations = this.props.store.operations.statistic.map((operation, i)=>{
            var color = randomColor();
            return(
                {
                    label: `Type ${operation.type} Priority: ${operation.level}`, 
                    value: operation.sum, 
                    color: color.hexString()
                }
            );
        });

        return (
            <div>
                <Breadcrumb>
                    <Link to="/">|Home| </Link>
                    <Link to="/cabinet/operations"> |Manager| </Link>
                    <BreadcrumbItem active> |Dashboard| </BreadcrumbItem>
                    <Link to="/cabinet/operation"> |Create operation| </Link> 
                </Breadcrumb>
                <div style={{'width': '300px', 'margin': '0 auto'}}>
                    <PieChart
                        data={ operations }
                        expandedSector={expandedSector}
                        onSectorHover={this.handleMouseEnterOnSector}
                    />
                    <div>
                    {
                        this.props.store.operations.statistic.map((element, i) => (
                            <div key={i}>
                                <span style={{background: element.color}}></span>
                                <span style={{fontWeight: this.state.expandedSector === i ? "bold" : null}}>
                                    Type: {element.type}, Priority:{element.level}, count: {element.count}, sum: {element.sum}, max: {element.max}, max: {element.min}
                                </span>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(store => ({ store }))(Dashboard);