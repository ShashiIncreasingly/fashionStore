import { FC } from 'react';
import "../../components/Footer/Footer.css"
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons'

const Footer: FC = () => {
  return (
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>company</h4>
              <ul>
                <li> <a href="#">about us</a> </li>
                <li> <a href="#">our services</a> </li>
                <li>  <a href="#">privacy policy</a>  </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>get help</h4>
              <ul>
                <li> <a href="#">FAQ</a>  </li>
                <li> <a href="#">shipping</a> </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>online shop</h4>
              <ul>
                <li>  <Link to="/">Home</Link>  </li>
                <li> <Link to="/product-listing">Categories</Link> </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <ul className="fh5co-social-icons">
                    <li className="giticon"><SocialIcon network="github" url="https://github.com/Shashi1525" /></li><li className="linkedicon"><SocialIcon network="linkedin" url="https://www.linkedin.com/in/shashbhushan/" /></li><li className="browsericon"><SocialIcon network="dribbble" url="https://shashireactweb.netlify.app/" /></li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-text">
            <p>Copyright &copy; 2018, All Right Reserved <a href="https://github.com/Shashi1525" target='_blank'>Shashi Bhushan Kumar</a></p>
        </div>
      </footer>
  );
};

export default Footer;
