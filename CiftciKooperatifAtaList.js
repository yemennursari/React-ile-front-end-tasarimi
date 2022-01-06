import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class CiftciKooperatifAtaList extends Component {

    
    constructor(props) {
        super(props);
        this.state = {ciftciler: []};
        this.ekle = this.ekle.bind(this);
    }

    componentDidMount(id) {
        fetch(`/ciftci/kooperatifidnullciftcilerigetir`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
        }).then(response => response.json())
        .then(data => this.setState({ciftciler: data.resultValue}));
    }

    // async ekle(id) {
    //  await fetch(`/ciftci/ciftciyekooperatifekle?id=${id}&koopearatifid=${this.props.match.params.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(() => {
    //         let updatedCiftciler = [...this.state.ciftciler].filter(i => i.id !== id);
    //         this.setState({ciftciler: updatedCiftciler});
    //     });
    // }

    async ekle(id) {
        await fetch(`/ciftci/ciftciyekooperatifekle?id=${id}&kooperatifid=${this.props.match.params.id}`, { 
            method: 'PUT',
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

        const ciftcilerList = ciftciler.map(ciftci => {
            return <tr key={ciftci.id}>            
                 <td style={{whiteSpace: 'nowrap'}}>{ciftci.ad+' '+ciftci.soyad}</td>   
                <td>{ciftci.tckimlikno}</td>       
                <td>{ciftci.eposta}</td>       
                {/* <td>{ciftci.kooperatifid}</td>      */}
                <td>
                    <ButtonGroup>
                        {/* <Button size="sm" color="primary" tag={Link} to={"/kooperatif/" + ciftci.kooperatifid}>Güncelle</Button> */}
                        <Button size="sm" color="danger" onClick={() => this.ekle(ciftci.id)}>Çiftçi Ekle</Button>                       
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                  
                    <h3>Null Kooperatifler</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Ad Soyad</th>
                            <th width="15%">TC</th>                            
                            <th width="25%">E Posta</th>
                            {/* <th width="15%">Kooperatif ID</th> */}
                            <th width="25%">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ciftcilerList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default CiftciKooperatifAtaList;
