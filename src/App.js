import React from 'react'
import './App.css'
import Desktopheader from "./components/Header"
import Mobileheader from "./components/mobileHeader"
import { auth , db } from './services/firebase'
import { signInWithGoogle, signInWithGitHub} from "./helpers/auth";


class App extends React.Component{

  state ={
    user: auth().currentUser,
    salary: [],
    jobTitle: '',
    experienceLevel: '',
    readError: null,
    writeError: null,
    comment: '',
    error:'',
    salaryAmount: null,
    authenticated: false,
    message: '',
    avgSalary: null,
    percentage: null,
    submit: false
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true
        });
      } else {
        this.setState({
          authenticated: false
        });
      }
    });
  }

  changeSubmit = () =>{
    const prevSubmit = this.state.submit
    this.setState({
      submit: !prevSubmit
    })
  }

  googleSignIn = () =>{
    try{
        signInWithGoogle()
    }catch (error){
        this.setState({ 
            error: error.message
        })
    }
  }

  githubSignIn = () =>{
    try{
        signInWithGitHub()
    }catch (error){
        this.setState({ 
            error: error.message
        })
    }
  }

  estimateSalary =() =>{
    const {salary, jobTitle, experienceLevel } = this.state
    const data = salary.filter(s =>(
      s.title.toLowerCase().includes(jobTitle.toLowerCase()),
      s.experience.toLowerCase().includes(experienceLevel.toLowerCase())
    ))
    
    let totalSalary = 0

    for(let i in data){
      totalSalary += parseFloat(data[i].salary)
    }
    
    const averageSalary = totalSalary/data.length
    const percentage = (averageSalary/100)*10
    this.setState({
      avgSalary: averageSalary,
      percentage
    })
  }

  handleChange = (event) =>{
    this.setState({
        [event.target.name]: event.target.value
    })
  }

  loadSalary = (event) =>{
    event.preventDefault()   
    const {jobTitle} = this.state
    
    this.setState({ readError: null})
    try {
        db.ref(jobTitle).on("value", snapshot => {
            let salary = []
            snapshot.forEach((snap) => {
                salary.push(snap.val())
            })
            this.setState({ salary })
            
        })
        setTimeout(this.estimateSalary, 1000)
        
    } catch (error) {
        this.setState({readError: error.message})
    }
  }

  handleSubmit = (event) =>{
    event.preventDefault()
    this.setState({
        writeError: null
    })
    const {jobTitle} = this.state
    try {
         db.ref(jobTitle).push({
            title: jobTitle,
            experience: this.state.experienceLevel,
            salary: this.state.salaryAmount
            
        })
        this.setState({
            jobTitle: '',
            experienceLevel: '',
            salaryAmount: '',
            message: "Salary submitted successfully"
        })
    } catch (error) {
        this.setState({ writeError: error.message})
    }
  }

  submitSalary =() =>{
    return( 
      <div>
        {this.state.authenticated === false ?
        <div className="form-container" style={{background:'lightgray', paddingTop:'20px', paddingBottom: '20px'}} >
          <h1><strong>Submit Salary</strong></h1>

          <h3 style={{color:'red', textAlign:'center', margin: '20px'}}>Sign In to Submit salary</h3>
          <div className="button-container">
            <button className="form-control google-button hover-animation" type="button" onClick={this.googleSignIn}>
              Sign in with Google
            </button>
          </div>
          <div className="button-container">
            <button className="form-control github-button hover-animation" type="button" onClick={this.githubSignIn}>
              Sign in with GitHub
            </button>
            
          </div>
          
        </div>
        :    
        <div className="form-container">      
              <h1><strong>Submit Salary</strong></h1>
              <h4 style={{color: 'green', textAlign:'center'}}>{this.state.message}</h4>
              <form className="py-5 px-5" onSubmit={this.handleSubmit}>
                <div>      
                  <select 
                      name = "jobTitle" 
                      value={this.state.jobTitle} 
                      className="form-control"
                      onChange={this.handleChange}
                  >
                          <option value="" selected> Select a Job Title </option>
                          <option value="web developer"> Web Developer</option>
                          <option value="app developer"> Mobile App Developer</option>
                  </select>
                </div>
                <div className="py-5">
                  <select 
                      name = "experienceLevel" 
                      value={this.state.experienceLevel} 
                      className="form-control"
                      onChange={this.handleChange}
                  >
                          <option value="" selected> Select a Experience Level </option>
                          <option value="junior"> Junior ( 1-3 years)</option>
                          <option value="intermediate"> Intermediate (3-5 years)</option>
                          <option value="senior"> Senior (5+ years)</option>
                  </select>
                </div>
                <div style={{marginBottom:'15px'}}>
                  Salary in Naira (#)
                  <input 
                    className="form-control"
                    type="number"
                    placeholder="100,000"
                    value={this.state.salaryAmount}
                    name="salaryAmount"
                    onChange={this.handleChange}
                  />
                </div>
                
                <div className="button-container">
                  <button className="form-control button hover-animation" type="submit">Submit Salary</button>
                </div>  
              </form>
              <button className="btn btn-primary mr-3" onClick={() => auth().signOut()}>Logout</button>
            </div>
        }
      </div>
    )
  }

  getSalary = () => {
    return(
      <div>
          <div className="form-container">
            <h1><strong>What am I worth?</strong></h1>
            {this.state.avgSalary != null ?
            
              <p>Estimated salary for {this.state.experienceLevel} {this.state.jobTitle}
                <p
                  style={{color:'green', fontSize:'1em'}}
                ><strong>
                  #{(this.state.avgSalary - this.state.percentage).toLocaleString()} - #{(this.state.avgSalary + this.state.percentage).toLocaleString()} 
                  </strong>
                </p>
              </p>
              
              : 
              null
            }
            <form className="py-5 px-5" onSubmit={this.loadSalary}>
              <div>      
                <select 
                    name = "jobTitle" 
                    value={this.state.jobTitle} 
                    className="form-control"
                    onChange={this.handleChange}
                >
                        <option value="" selected> Select a Job Title </option>
                        <option value="web developer"> Web Developer</option>
                        <option value="app developer"> Mobile App Developer</option>
                </select>
              </div>
              <div className="py-5">
                <select 
                    name = "experienceLevel" 
                    value={this.state.experienceLevel} 
                    className="form-control"
                    onChange={this.handleChange}
                >
                        <option value="" selected> Select a Experience Level </option>
                        <option value="junior"> Junior ( 1-3 years)</option>
                        <option value="intermediate"> Intermediate (3-5 years)</option>
                        <option value="senior"> Senior (5+ years)</option>

                </select>
              </div>
              <div className="button-container">
                <button className="form-control button hover-animation" type="submit">Get Salary</button>
              </div>  
            </form>
          </div>
      </div>
    )

  }

  render(){
    const screenWidth = window.screen.width
   
    return(
        <div >
          {screenWidth <= 700 ? <Mobileheader/> : <Desktopheader /> }
          <div className="holder">
            <div className="text-holder">
              <h1>Get Paid Right</h1>
              <p>Get salary estimates based on Job title and experience</p>
            </div>
            <div className="holder-button">
             <button 
              className="form-control hover-animation"
              onClick={this.changeSubmit}
            >
              {this.state.submit ? 'Get Salary' : 'Submit Salary'}
            </button>
            </div>
          </div>
          <div>
            {this.state.submit ? this.submitSalary() : this.getSalary()}
          </div>
        </div>
    )
  }
}

export default App