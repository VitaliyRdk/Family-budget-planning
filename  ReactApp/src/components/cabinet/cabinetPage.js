import React, { Component } from 'react';
import Menu from './sections/menu';
import CabinetSections from './sections';

class CabinetPage extends Component {

    render() {
        return(
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12"><Menu /></div>
                    </div>
                    <CabinetSections />
                </div>
        )
    }
}

export default CabinetPage;