import Transactions from "./Transactions";
import Addresses from "./Addresses";
import Wallet from "./Wallet";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Transfer from './Transfer';
import './App.css'

function App() {
  return (
    <Router>
      <div className="links">
        <Link className="link" to="/">Transaction</Link><>    |    </>
        <Link className="link" to="/addresses">Addresses</Link><>    |    </>
        <Link className="link" to="/wallet">Wallet</Link>
      </div>

      <Routes>
        <Route path="/" element={<Transactions />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route
              path="/transfer/:nodeAddress"
              element={<Transfer />}
            />
      </Routes>

    </Router>
  );
}

export default App;
