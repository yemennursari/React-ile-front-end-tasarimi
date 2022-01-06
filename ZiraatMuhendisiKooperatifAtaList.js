import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class ZiraatMuhendisiKooperatifAtaList extends Component {

    
    constructor(props) {
        super(props);
        this.state = {ziraatmuhendisleri: []};
        this.ekle = this.ekle.bind(this);
    }

    componentDidMount(id) {
        fetch(`/ziraatmuhendisi/kooperatifidnullziraatmuhendislerinigetir`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
        }).then(response => response.json())
        .then(data => this.setState({ziraatmuhendisleri: data.resultValue}));
    }

  
    async ekle(id) {
        await fetch(`/ziraatmuhendisi/ziraatmuhendisinekooperatifekle?id=${id}&kooperatifid=${this.props.match.params.id}`, { 
            method: 'PUT',
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
        const ziraatmuhenisleriList = ziraatmuhendisleri.map(ziraatmuhendisi => {
            return <tr key={ziraatmuhendisi.id}>            
                 <td style={{whiteSpace: 'nowrap'}}>{ziraatmuhendisi.ad+' '+ziraatmuhendisi.soyad}</td>   
                <td>{ziraatmuhendisi.tckimlikno}</td>       
                <td>{ziraatmuhendisi.eposta}</td>       
                {/* <td>{ziraatmuhendisi.kooperatifid}</td>      */}
                <td>
                    <ButtonGroup>
                        {/* <Button size="sm" color="primary" tag={Link} to={"/kooperatif/" + ziraatmuhendisi.kooperatifid}>Güncelle</Button> */}
                        <Button size="lg" color="danger" onClick={() => this.ekle(ziraatmuhendisi.id)}>Ziraat Mühendisi Ekle</Button>                       
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                  
                    <h3>Null Ziraat Mühendisleri</h3>
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
                        {ziraatmuhenisleriList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}
export default ZiraatMuhendisiKooperatifAtaList;
