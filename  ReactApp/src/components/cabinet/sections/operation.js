import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, ControlLabel, FormControl, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

/*Helpers*/
import * as notify from './../../../helpers/notificationHelper';

/*Actions*/
import * as OperationsActions from './../../../actions/operationsActions';


class Operation extends Component {

    constructor(props){
        super(props);
        this.state = {
            operation:{
                type: 'add',
                description: '',
                amount: '',
                level: '1'
            }
        };
    }

    onClickSave (){
        if (this.props.match.params.id){
            OperationsActions.modify(this.props.match.params.id, this.state.operation).then(ok=>{
                notify.success('Operation saved');
            }, e=>{
                notify.error(e);
            });
        }else{
            OperationsActions.add(this.state.operation).then(ok=>{
                notify.success('Operation created');
            }, e=>{
                notify.error(e);
            });
        }
    };

    onChangeValue = (value, prop) => {
        this.state.operation[prop] = value;
        this.setState(this.state);
    };

    render() {
        return(
            <div>
                <Breadcrumb>
                    <Link to="/">|Home| </Link>
                    <Link to="/cabinet/operations"> |Manager| </Link>
                    <Link to="/cabinet/dashboard"> |Dashboard| </Link>
                    <BreadcrumbItem active> |Create operation| </BreadcrumbItem> 
                </Breadcrumb>
                <FormGroup>
                    <ControlLabel>Type</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" value={this.state.operation.type} onChange={e => this.onChangeValue(e.target.value, 'type')}>
                        <option value="add">add</option>
                        <option value="get">gave</option>
                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Amount</ControlLabel>
                    <FormControl type="number" step="0.01" value={this.state.operation.amount} onChange={e => this.onChangeValue(e.target.value, 'amount')} name="name"placeholder="Enter the amount in numerical format" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Description</ControlLabel>
                    <FormControl value={this.state.operation.description} onChange={e => this.onChangeValue(e.target.value, 'description')} componentClass="textarea" placeholder="Enter description" />
                </FormGroup>
                <FormGroup  hidden={this.state.operation.type === 'add'}>
                    <ControlLabel>Level</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" value={this.state.operation.level} onChange={e => this.onChangeValue(e.target.value, 'level')}>
                        <option value="1">High</option>
                        <option value="2">Middle</option>
                        <option value="3">Low</option>
                    </FormControl>
                </FormGroup>
                <Button color="success" onClick={this.onClickSave.bind(this)}>Save</Button>
            </div>
        )
    }
}

export default connect(store => ({ store }))(Operation);