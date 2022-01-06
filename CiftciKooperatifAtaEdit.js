import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavBar';

class KooperatifEdit extends Component {

    emptyItem = {
        id:'',
        ad: '',
        il: '',
        ilce: '',
        
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
            const kooperatif = await(await (await fetch(`/kooperatif/getir?id=${this.props.match.params.id}`)).json()).resultValue;
           fetch(`/kooperatif/getir?id=${this.props.match.params.id}`)
             .then(response => response.json())
             .then(data => this.setState({item: data.resultValue}));
             this.setState({item: kooperatif});
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

    await fetch('/kooperatif' + (item.id ? '/guncelle/' + item.id : '/ekle'), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/kooperatif');
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Kooperatif Güncelle' : 'Kooperatif Ekle'}</h2>;

        return <div>
            <AppNavbar/>
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="ad">Ad</Label>
                        <Input type="text" name="ad" id="ad" value={item.ad || ''}
                               onChange={this.handleChange} autoComplete="ad"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="il">İl</Label>
                        <Input type="text" name="il" id="il" value={item.il || ''}
                               onChange={this.handleChange} autoComplete="il"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="ilce">İlçe</Label>
                        <Input type="text" name="ilce" id="ilce" value={item.ilce || ''}
                               onChange={this.handleChange} autoComplete="ilce"/>
                    </FormGroup>                 
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/kooperatif">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(KooperatifEdit);












