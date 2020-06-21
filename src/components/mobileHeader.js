import React from 'react'

class Mobileheader extends React.Component {
    state={
        offcanva: true
    }

    showOffcanvas = () =>{
        const canvaState = this.state.offcanva
        this.setState({
            offcanva: !canvaState
        })
        if(this.state.offcanva === true ){
            document.getElementById('mobile-menu').style.display ="block";
        }
        else{
            document.getElementById('mobile-menu').style.display ="none";
        }
      }

    render(){
        return(
            <div>
                <header className="main-header">
                    <div 
                        className="toggle-btn"
                        onClick={this.showOffcanvas}>
                    </div>
                    <div class="logo-wrap is-logo-image site-branding">
                        <a href="http://techietainment.io/" class="logo" title="Techie-Tainment">
                        <img class="logo-default logo-sticky-retina logo-retina"  width="213" src="http://techietainment.io/wp-content/uploads/2020/06/t2-01.png" alt="Techie-Tainment" />
                        </a>
                    </div>  
                </header>
                <div id='mobile-menu' className="offcanvas-menu">
                    
                    <div className="off-canvas-header">
                        <div className="off-canvas-close-btn" onClick={this.showOffcanvas}>
                            X
                        </div>
                        <div class="off-canvas-logo">
                            <a href="http://techietainment.io/" >
                                <img src="http://techietainment.io/wp-content/uploads/2020/06/T-icon-01.png" alt="Techie-Tainment" width="88" />
                            </a>
                        </div>
                    </div>
                    <div className="off-canvas-inner">
                        <a href="http://techietainment.io/" className="mobile-menu">Home</a>
                        <a href="http://techietainment.io/category/tech-news/" className="mobile-menu">Tech News</a>
                        <a href="http://techietainment.io/category/hackhaton/" className="mobile-menu">Hackhaton</a>
                        <a href="http://techietainment.io/category/freebies/" className="mobile-menu">Freebies</a>
                        <a href="http://techietainment.io/category/conferences-meetups/" className="mobile-menu">Comferences/Meetups</a>
                        <a href="http://techietainment.io/category/scholarships/" className="mobile-menu">Scholarships</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Mobileheader