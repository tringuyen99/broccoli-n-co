//Components
import Header from '../Header';
import Footer from '../Footer';
import WelcomeMessage from './WelcomeMessage';

import './HomePage.scss';

function HomePage(props) {
    
    return (
    <div className="d-flex flex-column h-100">
        <Header />
        <WelcomeMessage/>
        <Footer />
    </div>)
}


export default HomePage;