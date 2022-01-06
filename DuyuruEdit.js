import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import AppNavbar from './AppNavBar';




class DuyuruEdit extends Component {

    emptyItem = {
        id:'',
        mesaj: '',
        aktivasyontarihi: '',
        kapanistarihi: '',
        onemderecesi:'',
        duyurutarihi:'',   
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const duyuru = await(await (await fetch(`/duyuru/getir?id=${this.props.match.params.id}`)).json()).resultValue;
           fetch(`/duyuru/getir?id=${this.props.match.params.id}`)
             .then(response => response.json())
             .then(data => this.setState({item: data.resultValue}));
             this.setState({item: duyuru});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;

    await fetch('/duyuru' + (item.id ? '/guncelle/' + item.id : '/ekle'), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/duyuru');
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Duyuru Güncelle' : 'Duyuru Ekle'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                 <Form onSubmit={this.handleSubmit}>
                     <FormGroup>
                        <Label for="ad">Mesaj</Label>
                            <Input type="textarea" rows="4" cols="152" name="mesaj" id="mesaj" value={item.mesaj || ''}
                               onChange={this.handleChange} autoComplete="mesaj"/>   
                    </FormGroup>  

                    <FormGroup>
                        <Label for="aktivasyontarihi">Aktivasyon Tarihi</Label>
                        <Input type="date" name="aktivasyontarihi" id="aktivasyontarihi" value={item.aktivasyontarihi || ''}
                               onChange={this.handleChange} autoComplete="aktivasyontarihi"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="kapanistarihi">Kapanış Tarihi</Label>
                        <Input type="date" name="kapanistarihi" id="kapanistarihi" value={item.kapanistarihi || ''}
                               onChange={this.handleChange} autoComplete="kapanistarihi"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="onemderecesi">Önem Derecesi</Label>
                        <br/>
                                <select class="custom-select my-1 mr-sm-2" name="onemderecesi" id="onemderecesi" value={item.onemderecesi || ''}
                                onChange={this.handleChange} autoComplete="onemderecesi">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                               </select>                                                                                            
                    </FormGroup>
                    <FormGroup>
                        <Label for="duyurutarihi">Duyuru Tarihi</Label>
                        <Input type="date" name="duyurutarihi" id="duyurutarihi" value={item.duyurutarihi || ''}
                               onChange={this.handleChange} autoComplete="duyurutarihi"/>
                    </FormGroup>                  
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/duyuru">Cancel</Button>
                    </FormGroup>
                </Form> 
            </Container>
        </div>
    }
}

export default withRouter(DuyuruEdit);