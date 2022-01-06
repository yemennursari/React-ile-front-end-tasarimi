import React, { Component } from 'react';
import logo from './logo.svg';
 import './App.css';
 import Home from './Home';
 import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
 import ClientList from './ClientList';
 import ClientEdit from "./ClientEdit";
 import CiftciList from "./CiftciList";
 import CiftciEdit from './CiftciEdit';
 import AppCiftci  from './AppCiftci';
 import ZiraatMuhendisiList from './ZiraatMuhendisiList';
 import ZiraatMuhendisiEdit from './ZiraatMuhendisiEdit';
 import DuyuruList from './DuyuruList';
 import DuyuruEdit from './DuyuruEdit';
import SistemYoneticisiList from './SistemYoneticisiList';
import SistemYoneticisiEdit from './SistemYoneticisiEdit';
import KooperatifList from './KooperatifList';
import KooperatifEdit from './KooperatifEdit';
import CiftciKooperatifEslestirList from './CiftciKooperatifEslestirList';
import CiftciKooperatifAtaList from './CiftciKooperatifAtaList';
import ZiraatMuhendisiKooperatifEslestirList from './ZiraatMuhendisiKooperatifEslestirList';
import ZiraatMuhendisiKooperatifAtaList from './ZiraatMuhendisiKooperatifAtaList';
import CiftciZiraatEslenikList from './CiftciZiraatEslenikList';
import CiftciZiraatAtaList from './CiftciZiraatAtaList';
import CiftciZiraatEslenikOlmayanList from './CiftciZiraatEslenikOlmayanList';
import DuyuruCiftciEslestirList from './DuyuruCiftciEslestirList';
import DuyuruCiftciEslenikOlmayanList from './DuyuruCiftciEslenikOlmayanList';




 

 //import React from 'react';

 // Bu otomatik oluşturulan bölüm
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//export default App;

// Bu ilk örnek
// class App extends React.Component {
//   state = {
//     ciftciler: []
//   };

//   async componentDidMount() {
//     const response = await fetch('/tumciftcilerigetir');
//     const body = await response.json();
//     this.setState({ciftciler: body});
//   }

//   render() {
//     const {ciftciler} = this.state;
//     return (
//         <div className="App">
//           <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo" />
//             <div className="App-intro">
//               <h2>Çiftçiler</h2>
//               {ciftciler.map(ciftci =>
//                   <div key={ciftci.id}>
//                     {ciftci.ad} ({ciftci.eposta})
//                   </div>
//               )}
//             </div>
//           </header>
//         </div>
//     );
//   }
// }
// export default App;


// Bu bölüm ciftçi için yapılmıştı şimdi kapatıldı
// import React, { Component } from 'react';
// import './App.css';
// import Home from './Home';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import CiftciList from './CiftciList';
// import CiftciEdit from "./CiftciEdit";

// class App extends Component {
//   render() {
//     return (
//         <Router>
//           <Switch>
//             <Route path='/' exact={true} component={Home}/>
//             <Route path='/tumciftcilerigetir' exact={true} component={CiftciList}/>
//             <Route path='/ciftcigetir/:ad&:soyad' component={CiftciEdit}/>
//           </Switch>
//         </Router>
//     )
//   }
// }

// export default App;



class App extends Component {
  render() {
    return (
      <div className="App">
     
          
          {/* const myelement = <h1>I Love{2+3} {"red"} JSX!</h1>; */}
        {/* <AppCiftci/> */}
        {/* <h1>I Love{2+3} {"blue"} JSX!</h1>; */}
         <Router>
          <Switch>
            {/* <Route path='/' exact={true} component={Home}/> */}
            <Route path='/' exact={true} render={(props) => (<Home{...props} title={"Web Portal"} />)}
              />


            <Route path='/clients' exact={true} component={ClientList}/>
            <Route path='/clients/:id' component={ClientEdit}/>
            {/* ciftcilist.js'i çağırabilmesi içi burada route yapıyoruz */}
            <Route path='/ciftciler' exact={true} component={CiftciList}/>
            <Route path='/ciftciler/:id' component={CiftciEdit}/>
            <Route path='/ziraatmuhendisi' exact={true} component={ZiraatMuhendisiList}/>
            <Route path='/ziraatmuhendisi/:id' exact={true} component={ZiraatMuhendisiEdit}/>
            <Route path='/duyuru' exact={true} component={DuyuruList}/>
            <Route path='/duyuru/:id' exact={true} component={DuyuruEdit}/>
            <Route path='/sistemyoneticisi' exact={true} component={SistemYoneticisiList}/>
            <Route path='/sistemyoneticisi/:id' exact={true} component={SistemYoneticisiEdit}/>
            <Route path='/kooperatif' exact={true} component={KooperatifList}/>
            <Route path='/kooperatif/:id' exact={true} component={KooperatifEdit}/>
            <Route path='/ciftci/kooperatifleeslenikciftcilerigetir/:id' exact={true} component={CiftciKooperatifEslestirList}/>
            <Route path='/ciftci/kooperatifidnullciftcilerigetir/:id' exact={true} component={CiftciKooperatifAtaList}/>
            <Route path='/ziraatmuhendisi/kooperatifleeslenikziraatmuhendislerinigetir/:id' exact={true} component={ZiraatMuhendisiKooperatifEslestirList}/>
            <Route path='/ziraatmuhendisi/kooperatifidnullziraatmuhendislerinigetir/:id' exact={true} component={ZiraatMuhendisiKooperatifAtaList}/>
            <Route path='/ziraatmuhendisi/ziraatmuhendisiyleeslenikciftcilerigetir/:id' exact={true} component={CiftciZiraatEslenikList}/>
            <Route path='/ziraatmuhendisi/ziraatmuhendisiyleeslenikciftcilerigetir/:id' exact={true} component={CiftciZiraatAtaList}/>
            <Route path='/ziraatmuhendisi/eslesmemisciftcilerigetir/:id' exact={true} component={ CiftciZiraatEslenikOlmayanList}/>
            <Route path='/duyuru/duyuruylaeslenikciftcilerigetir/:id' exact={true} component={  DuyuruCiftciEslestirList}/>
            <Route path='/duyuru/eslesmemisciftcilerigetir/:id' exact={true} component={DuyuruCiftciEslenikOlmayanList}/>
           


            
          </Switch>
        </Router>
 

        </div>
    );
  }
}

export default App;