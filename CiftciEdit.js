import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavBar';

class CiftciEdit extends Component {

    emptyItem = {
        id:'',
        ad: '',
        soyad: '',
        eposta: '',
        tckimlikno:'',
        kullaniciadi:'',
        sifre:''
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
            const ciftci = await(await (await fetch(`/ciftci/getir?id=${this.props.match.params.id}`)).json()).resultValue;
        //    fetch(`/ciftci/getir?id=${this.props.match.params.id}`)
        //      .then(response => response.json())
        //      .then(data => this.setState({item: data.resultValue}));
             this.setState({item: ciftci});
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

    await fetch('/ciftci' + (item.id ? '/guncelle/' + item.id : '/ekle'), {
        method: (item.id) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
    });
    this.props.history.push('/ciftciler');
}

    render() {
        const {item} = this.state;
        const title = <h2>{item.id ? 'Çiftçi Güncelle' : 'Çiftçi Ekle'}</h2>;

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
                        <Label for="soyad">Soyad</Label>
                        <Input type="text" name="soyad" id="soyad" value={item.soyad || ''}
                               onChange={this.handleChange} autoComplete="soyad"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tckimlikno">TC Kimlik No</Label>
                        <Input type="text" name="tckimlikno" id="tckimlikno" value={item.tckimlikno || ''}
                               onChange={this.handleChange} autoComplete="tckimlikno"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="eposta">e-posta</Label>
                        <Input type="text" name="eposta" id="eposta" value={item.eposta || ''}
                               onChange={this.handleChange} autoComplete="eposta"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="kullaniciadi">Kullanıcı Adı</Label>
                        <Input type="text" name="kullaniciadi" id="kullaniciadi" value={item.kullaniciadi || ''}
                               onChange={this.handleChange} autoComplete="kullaniciadi"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="sifre">Şifre</Label>
                        <Input type="text" name="sifre" id="sifre" value={item.sifre || ''}
                               onChange={this.handleChange} autoComplete="sifre"/>
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/ciftciler">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(CiftciEdit);