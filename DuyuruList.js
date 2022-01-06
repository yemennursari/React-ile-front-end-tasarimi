import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class DuyuruList extends Component {

    constructor(props) {
        super(props);
        this.state = {duyurular: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/duyuru/tumunugetir')
            .then(response => response.json())
            .then(data => this.setState({duyurular: data.resultValue}));
    }

    async remove(id) {
        await fetch(`/duyuru/sil?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedDuyurular = [...this.state.duyurular].filter(i => i.id !== id);
            this.setState({duyurular: updatedDuyurular});
        });
    }

    render() {
        const {duyurular} = this.state;

        const duyuruList = duyurular.map(duyuru => {
            return <tr key={duyuru.id}>               
                <td>{duyuru.mesaj}</td>
                <td>{duyuru.aktivasyontarihi}</td>             
                <td>{duyuru.kapanistarihi}</td>
                <td>{duyuru.onemderecesi}</td>
                <td>{duyuru.duyurutarihi}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/duyuru/" + duyuru.id}>Güncelle</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(duyuru.id)}>Sil</Button>
                        <Button size="sm" color="primary" tag={Link} to={"/duyuru/eslesmemisciftcilerigetir/" + duyuru.id}>Çiftçi Eşleştir</Button>
                        <Button size="sm" color="danger" tag={Link} to={"/duyuru/duyuruylaeslenikciftcilerigetir/" + duyuru.id}>Eşlenik Çiftçileri Getir</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/duyuru/new">Duyuru Ekle</Button>
                    </div>
                    <h3>Duyurular</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Mesaj</th>
                            <th width="15%">Aktivasyon Tarihi</th>
                            <th width="15%">Kapanış Tarihi</th>
                            <th width="15%">Önem Derecesi</th>
                            <th width="15%">Duyuru Tarihi</th>
                            <th width="25%">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {duyuruList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default DuyuruList;
