import "../styles/Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-box">
                <div><b>ESSENTIAL</b></div>
                <div className="footer-color">개인정보처리방침</div>
                <div className="footer-color">이용약관</div>
                <div className="footer-color">채용</div>
            </div>
            <div className="footer-line">
                <div className="footer-text"><b>(주)아힘모약 대표자 : 000</b></div>
                <div className="footer-text"><b>사업자번호 : 000-00-0000</b></div>
            </div>
            <div className="footer-line">
                <div className="footer-text"><b>통신판매업 : 2024-부산센텀A-0000</b></div>
                <div className="footer-text"><b>이메일 : info@megazone.com</b></div>
            </div>
            <div className="footer-line"><b>전화번호 : 010-0000-0000</b></div>
        </footer>
    );
}

export default Footer;
