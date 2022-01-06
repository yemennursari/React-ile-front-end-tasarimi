import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/clients')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));
    }

    async remove(id) {
        await fetch(`/clients/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== id);
            this.setState({clients: updatedClients});
        });
    }

    render() {
        const {clients} = this.state;

        const clientList = clients.map(client => {
            return <tr key={client.id}>
                <td style={{whiteSpace: 'nowrap'}}>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.kurumadi}</td>
                <td>{client.kullaniciadi}</td>
                <td>{client.sifre}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/clients/" + client.id}>Güncelle</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(client.id)}>Sil</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/clients/new">Kurumsal Kullanıcı Ekle</Button>
                    </div>
                    <h3>Kurumsal Kullanıcılar</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Ad Soyad</th>
                            <th width="15%">e-posta</th>
                            <th width="15%">Kurum Adı</th>
                            <th width="15%">Kullanıcı Adı</th>
                            <th width="15%">Şifre</th>
                            <th width="25%">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default ClientList;