import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavBar';
import { Link } from 'react-router-dom';

class CiftciKooperatifEslestirList extends Component {

    
    constructor(props) {
        super(props);
        this.state = {ciftciler: []};
        this.remove = this.remove.bind(this);
    }

    componentDidMount(id) {
        fetch(`/ciftci/kooperatifleeslenikciftcilerigetir?kooperatifid=${this.props.match.params.id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
            
        }).then(response => response.json())
        .then(data => this.setState({ciftciler: data.resultValue}));
    }




    async remove(id) {
     await fetch(`/ciftci/ciftciyikooperatiftencikar?id=${id}`, {
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
                <td>
                    <ButtonGroup>
                        {/* <Button size="sm" color="primary" tag={Link} to={"/kooperatif/" + ciftci.kooperatifid}>Güncelle</Button> */}
                        <Button size="lg" color="danger" onClick={() => this.remove(ciftci.id)}>Eşlenikten Çıkar</Button>                       
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                   
                    
                    <h3>Eşlenik Çiftçiler</h3>
                    

                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="15%">Ad Soyad</th>
                            <th width="15%">TC</th>                            
                            <th width="25%">E Posta</th>
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
export default CiftciKooperatifEslestirList;
