import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class SistemYoneticisiList extends Component {

    constructor(props) {
        super(props);
        this.state = {sistemYoneticileri: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/sistemyoneticisi/tumunugetir')
            .then(response => response.json())
            .then(data => this.setState({sistemYoneticileri: data.resultValue}));
    }

    async remove(id) {
        await fetch(`/sistemyoneticisi/sil?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedSistemYoneticileri = [...this.state.sistemYoneticileri].filter(i => i.id !== id);
            this.setState({sistemYoneticileri: updatedSistemYoneticileri});
        });
    }

    render() {
        const {sistemYoneticileri} = this.state;

        const sistemYoneticisiList = sistemYoneticileri.map(sistemyoneticisi => {
            return <tr key={sistemyoneticisi.id}>
                <td style={{whiteSpace: 'nowrap'}}>{sistemyoneticisi.ad+' '+sistemyoneticisi.soyad}</td>
                <td>{sistemyoneticisi.tckimlikno}</td>
                <td>{sistemyoneticisi.eposta}</td>             
                <td>{sistemyoneticisi.kullaniciadi}</td>
                <td>{sistemyoneticisi.sifre}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/sistemyoneticisi/" + sistemyoneticisi.id}>Güncelle</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(sistemyoneticisi.id)}>Sil</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/sistemyoneticisi/new">Sistem Yöneticisi Ekle</Button>
                    </div>
                    <h3>Sistem Yöneticileri</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Ad Soyad</th>
                            <th width="15%">TC Kimlik No</th>
                            <th width="15%">e-posta</th>
                            <th width="15%">Kullanıcı Adı</th>
                            <th width="15%">Şifre</th>
                            <th width="25%">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sistemYoneticisiList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default SistemYoneticisiList;