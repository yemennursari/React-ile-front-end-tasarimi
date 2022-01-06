import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class CiftciList extends Component {

    constructor(props) {
        super(props);
        this.state = {ciftciler: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        fetch('/ciftci/tumunugetir')
            .then(response => response.json())
            .then(data => this.setState({ciftciler: data.resultValue}));
    }

    async remove(id) {
        await fetch(`/ciftci/sil?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedCiftciler = [...this.state.ciftciler].filter(i => i.id !== id);
            this.setState({ciftciler: updatedCiftciler});
        });
    }

    render() {
        const {ciftciler} = this.state;

        const ciftciList = ciftciler.map(ciftci => {
            return <tr key={ciftci.id}>   
                <td style={{whiteSpace: 'nowrap'}}>{ciftci.ad+' '+ciftci.soyad}</td>   
                <td>{ciftci.tckimlikno}</td>
                <td>{ciftci.eposta}</td>             
                <td>{ciftci.kullaniciadi}</td>
                <td>{ciftci.sifre}</td>
                <td>{ciftci.kooperatifid}</td> 
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/ciftciler/" + ciftci.id}>Güncelle</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(ciftci.id)}>Sil</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/ciftciler/new">Çiftçi Ekle</Button>
                    </div>
                    <h3>Çiftçiler</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>                           
                            <th width="15%">Ad Soyad</th>
                            <th width="15%">TC Kimlik No</th>
                            <th width="15%">e-posta</th>
                            <th width="15%">Kullanıcı Adı</th>
                            <th width="15%">Şifre</th>
                            <th width="15%">Kooperatif ID</th>
                            <th width="25%">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ciftciList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default CiftciList;