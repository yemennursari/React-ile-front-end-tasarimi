import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';
// import CiftciKooperatifEslestirList from './CiftciKooperatifEslestirList';

class KooperatifList extends Component {

    constructor(props) {
        super(props);
        this.state = {kooperatifler: [],
            seciliKooperatifler : []
        };
        this.remove = this.remove.bind(this);
    }


    componentDidMount() {
        fetch('/kooperatif/tumunugetir')
            .then(response => response.json())
            .then(data => this.setState({kooperatifler: data.resultValue}));
    }

    async remove(id) {
        await fetch(`/kooperatif/sil?id=${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedKooperatifler = [...this.state.kooperatifler].filter(i => i.id !== id);
            this.setState({kooperatifler: updatedKooperatifler});
        });
    }
    
    chkclick = (e)=>{
        var {name,checked} = e.target;
        const {seciliKooperatifler} = this.state
        const testList = [...seciliKooperatifler, name]
        this.setState({seciliKooperatifler : testList})
    };        

    render() {
        
        const {kooperatifler} = this.state;

        const kooperatifList = kooperatifler.map(kooperatif => {
            return <tr key={kooperatif.id}>
                {/* <td><input type="checkbox"  true id={kooperatif.id} name={kooperatif.id} onChange={this.chkclick}></input></td>     */}
                <td>{kooperatif.ad}</td>   
                <td>{kooperatif.il}</td>
                <td>{kooperatif.ilce}</td>            
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link}
                         to={"/kooperatif/" + kooperatif.id}>Güncelle</Button>
                        <Button size="sm" color="danger" onClick={() => 
                            this.remove(kooperatif.id)}>Sil</Button>   
                       <Button  size="sm" color="warning" tag={Link}
                        to={"/ciftci/kooperatifleeslenikciftcilerigetir/"
                        +kooperatif.id}>Eşlenik Çiftçi Getir</Button>
                       <Button  size="sm" color="info" tag={Link} 
                       to={"/ciftci/kooperatifidnullciftcilerigetir/"
                       +kooperatif.id}>Çiftçi Ekle</Button>                      
                       <Button  size="sm" color="warning" tag={Link} 
                       to={"/ziraatmuhendisi/kooperatifleeslenikziraatmuhendislerinigetir/"
                       +kooperatif.id}>Eşlenik Ziraat Mühendisleri Getir</Button>    
                       <Button  size="sm" color="info" tag={Link}
                        to={"/ziraatmuhendisi/kooperatifidnullziraatmuhendislerinigetir/"
                        +kooperatif.id}>Ziraat Mühendisi Ekle</Button>         
                    </ButtonGroup>
                </td>               
            </tr>
            
        });


        

        const {seciliKooperatifler} = this.state;
        const seciliKooperatifListesi = seciliKooperatifler.map(kooperatif => {
            return <tr key={kooperatif.id}>
                <td>{kooperatif.id}</td>            
               
            </tr>
        });

        

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/kooperatif/new">Kooperatif Ekle</Button>
                    </div>
                    <h3>Kooperatifler</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            {/* <th width="15%">Seçilenler</th> */}
                            <th width="15%">Kooperatif Adı</th>
                            <th width="15%">İl</th>
                            <th width="15%">İlçe</th>
                            <th width="25%">İşlemler</th>
                        </tr>
                        </thead>
                        <tbody>                           
                        {kooperatifList}                                                            
                        </tbody>
                    </Table>                   
                </Container>
               

                <AppNavbar/>
                {/* <Container fluid>
                 <div className="float-right" >
                       <Button  color="success" tag={Link} to={"/ciftci/kooperatifleeslenikciftcilerigetir/"+seciliKooperatifler}>Eşlenikleri Getir</Button>
                </div>  
                <div className="float-right" >
                       <Button  color="success" tag={Link} to={"/ciftci/kooperatifciftciekle/"+seciliKooperatifler}>Çiftçi Ekle</Button>
                </div>  
                </Container> */}
                
            </div>

            
        );
    }
}

export default KooperatifList;