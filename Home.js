import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    constructor() { 
        super();
        // this.state = {title: "Web Portal Ana Sayfa 2"};
      }
    render() {
        return (
            <div>
                <AppNavbar title={this.props.title}/>
                <Container fluid>
                    <Button color="link"><Link to="/clients">Kurumsal Kullanıcılar</Link></Button>
                    
                    <Button color="link"><Link to="/ciftciler">Çiftçiler</Link></Button>
                    <Button color="link"><Link to="/ziraatmuhendisi">Ziraat Mühendisleri</Link></Button>
                    <Button color="link"><Link to="/duyuru">Duyuru</Link></Button>
                    <Button color="link"><Link to="/sistemyoneticisi">Sistem Yöneticisi</Link></Button>
                    <Button color="link"><Link to="/kooperatif">Kooperatif</Link></Button>   
                            
                </Container>
            </div>
        );
    }
}
export default Home;