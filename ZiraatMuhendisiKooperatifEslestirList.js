import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class ZiraatMuhendisiKooperatifEslestirList extends Component {

    
    constructor(props) {
        super(props);
        this.state = {muhendisler: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount(id) {
        fetch(`/ziraatmuhendisi/kooperatifleeslenikziraatmuhendislerinigetir?kooperatifid=${this.props.match.params.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
        }).then(response => response.json())
        .then(data => this.setState({muhendisler: data.resultValue}));
    }


    async remove(id) {
        await fetch(`/ziraatmuhendisi/ziraatmuhendisinikooperatiftencikar?id=${id}`, {
               method: 'PUT',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json'
               }
           }).then(() => {
               let updatedCiftciler = [...this.state.muhendisler].filter(i => i.id !== id);
               this.setState({muhendisler: updatedCiftciler});
           });
       }
 



    render() {
        const {muhendisler} = this.state;

        const ciftcilerList = muhendisler.map(ciftci => {
            return <tr key={ciftci.kooperatifid}>            
                 <td style={{whiteSpace: 'nowrap'}}>{ciftci.ad+' '+ciftci.soyad}</td>   
                <td>{ciftci.tckimlikno}</td>       
                <td>{ciftci.eposta}</td>       
                <td>{ciftci.uzmanlikalani}</td>     
                <td>
                    <ButtonGroup>
                        {/* <Button size="sm" color="primary" tag={Link} to={"/kooperatif/" + ciftci.kooperatifid}>Güncelle</Button> */}
                        <Button size="sm" color="danger" onClick={() => this.remove(ciftci.id)}>Eşlenikten Çıkar</Button> 
                        <Button size="sm" color="primary"  tag={Link} to={"/ziraatmuhendisi/ziraatmuhendisiyleeslenikciftcilerigetir/"+ ciftci.id} >Eşlenik Çiftçi Getir</Button>  
                                          
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    {/* <div className="float-right">
                        <Button color="success" tag={Link} to="/kooperatif/new">Kooperatif Ekle</Button>
                    </div> */}
                    
                    <h3>Eşlenik Ziraat Mühendisi</h3>
                    

                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Ad Soyad</th>
                            <th width="15%">TC</th>                            
                            <th width="25%">E Posta</th>
                            <th width="25%">Uzmanlık Alanı</th>
                         
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
export default ZiraatMuhendisiKooperatifEslestirList;
