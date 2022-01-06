import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class ZiraatMuhendisiList extends Component {

    constructor(props) {
        super(props);
        this.state = {ziraatmuhendisleri: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/ziraatmuhendisi/tumunugetir')
            .then(response => response.json())
            .then(data => this.setState({ziraatmuhendisleri: data.resultValue}));
    }

    async remove(id) {
        await fetch(`/ziraatmuhendisi/ciftciziraatmuhendisieslestirmesil?ciftciid=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedZiraatMuhendisleri = [...this.state.ziraatmuhendisleri].filter(i => i.id !== id);
            this.setState({ziraatmuhendisleri: updatedZiraatMuhendisleri});
        });
    }

    render() {
        const {ziraatmuhendisleri} = this.state;

        const ziraatMuhendisiList = ziraatmuhendisleri.map(ziraatmuhendisi => {
            return <tr key={ziraatmuhendisi.id}>
                <td style={{whiteSpace: 'nowrap'}}>{ziraatmuhendisi.ad+' '+ziraatmuhendisi.soyad}</td>
                <td>{ziraatmuhendisi.tckimlikno}</td>
                <td>{ziraatmuhendisi.eposta}</td>             
                <td>{ziraatmuhendisi.uzmanlikalani}</td>   
                <td>{ziraatmuhendisi.kullaniciadi}</td>
                <td>{ziraatmuhendisi.sifre}</td>            
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/ziraatmuhendisi/" + ziraatmuhendisi.id}>Güncelle</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(ziraatmuhendisi.id)}>Çiftçi, Ziraat Mühendisleri Eşlenikleri Sil</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/ziraatmuhendisi/new">Ziraat Mühendisi Ekle</Button>
                    </div>
                    <h3>Ziraat Mühendisleri</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Ad Soyad</th>
                            <th width="15%">TC Kimlik No</th>
                            <th width="15%">e-posta</th>
                            <th width="15%">Uzmanlık Alanı</th>
                            <th width="15%">Kullanıcı Adı</th>
                            <th width="15%">Şifre</th>
                            <th width="25%">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ziraatMuhendisiList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ZiraatMuhendisiList;