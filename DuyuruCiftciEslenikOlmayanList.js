import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class DuyuruCiftciEslenikOlmayanList extends Component {

    
    constructor(props) {
        super(props);
        this.state = {ciftciler: []};
        this.ekle = this.ekle.bind(this);
    }

    componentDidMount(id) {
        fetch(`/duyuru/eslesmemisciftcilerigetir?duyuruid=${this.props.match.params.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
        }).then(response => response.json())
        .then(data => this.setState({ciftciler: data.resultValue}));
    }


    async ekle(id) {
        await fetch(`/duyuru/ciftciduyurueslestirmeekle?ciftciid=${id}&duyuruid=${this.props.match.params.id}`, { 
            method: 'POST',
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
                <td>{ciftci.id}</td>          
                <td>{ciftci.ad}</td> 
                <td>{ciftci.soyad}</td>  
                <td>{ciftci.tckimlikno}</td>       
                <td>{ciftci.eposta}</td> 


                <td>
                    <ButtonGroup>
                        {/* <Button size="sm" color="primary" tag={Link} to={"/kooperatif/" + ciftci.kooperatifid}>Güncelle</Button> */}
                        <Button size="sm" color="danger" onClick={() => this.ekle(ciftci.id)}>Çiftçi Duyuru Eşlenik Ekle</Button>                       
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                   
                    
                    <h3>Eşlenik Olmayan Çiftçiler</h3>
                    

                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Id</th>
                            <th width="15%"> Ad </th>    
                            <th width="15%"> Soyad </th>                          
                            <th width="25%"> Tc Kimlik No </th>
                            <th width="25%"> E Posta </th>
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
export default DuyuruCiftciEslenikOlmayanList;
