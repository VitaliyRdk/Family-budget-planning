import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Table, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone';

/*Actions*/
import * as OperationsActions from './../../../actions/operationsActions';
import { Link } from 'react-router-dom';


class Operations extends Component {

    componentDidMount(){
        OperationsActions.get();
    }

    render() {
        var sum = {
            amount: 0
        };

        var operations = this.props.store.operations.list.length > 0 ? this.props.store.operations.list.map((operation, i)=>{
            var editLink = "/cabinet/operation/" + operation.id;
            if (operation.type === 'add'){
                sum.amount += Number.parseFloat(operation.amount);
            }else{
                sum.amount -= Number.parseFloat(operation.amount);
            }
            return (
                <tr key = {i}>
                    <th scope="row">{operation.type}</th>
                    <td>{operation.amount}</td>
                    <td>{operation.level === -1 ? '' : 'Priority ' + operation.level}</td>
                    <td>{operation.description === 'null' ? '' : operation.description}</td>
                    <td><Moment fromNow>{operation.create_date}</Moment></td>
                    <td>
                        <Link to={editLink} className="btn btn-warning">Edit</Link>
                    </td>
                </tr>
            );
        }) : null;

        return (
            <div>
                <Breadcrumb>
                    <Link to="/">|Home| </Link>
                    <BreadcrumbItem active> |Manager| </BreadcrumbItem> 
                    <Link to="/cabinet/dashboard"> |Dashboard| </Link>
                    <Link to="/cabinet/operation"> |Create operation| </Link> 
                </Breadcrumb>
                <div style={{'textAlign': 'center'}}><Link to="/cabinet/operation" className="btn btn-success">Add operation</Link></div>
                <Table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Level</th>
                            <th>Description</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        { operations }
                        <tr>
                            <th>Sum</th>
                            <th>{sum.amount}</th>
                            <th>---</th>
                            <th>---</th>
                            <th>---</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default connect(store => ({ store }))(Operations);