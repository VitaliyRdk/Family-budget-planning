import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import Menu from './sections/menu';
import PublicSections from './sections';

class PublicPage extends Component {
    render() {
        return(
            <div>
                <div className="container">
                    <Row>
                        <Col><Menu/></Col>
                    </Row>
                    <PublicSections />
                </div>
            </div>
        )
    }
}

export default PublicPage;