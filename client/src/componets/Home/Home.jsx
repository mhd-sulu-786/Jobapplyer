
import React, { useEffect, useState } from 'react';
import '../Home/Home.css';
import { useNavigate } from 'react-router-dom';

function DashBoard() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('http://localhost:2000/jobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredJobs = jobs.filter(job => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      job.companyName.toLowerCase().includes(lowerCaseQuery) ||
      job.role.toLowerCase().includes(lowerCaseQuery) ||
      job.experience.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div>
      <header>
        <div className="section__container header__container">
          <div className="header__image">
            <img src="https://tse1.mm.bing.net/th?id=OIP.Jw1ij013jxt8j7XConLE_gHaE7&pid=Api&P=0&h=180" alt="header" />
            <img src="https://tse1.mm.bing.net/th?id=OIP.Jw1ij013jxt8j7XConLE_gHaE7&pid=Api&P=0&h=180" alt="header" />
          </div>
          <div className="header__content">
            <div>
              <p className="sub__header">Jobs</p>
              <h1>Your Next Career Move <br />Starts Here:</h1>
              <p className="section__subtitle">
                Empowering Your Career Journey: Explore new opportunities with our intuitive job portal. Discover, apply, and thrive!
              </p>
              <div className="action__btns">
                <button className="btn">Contact us</button>
                <div className="story">
                  <span>Watch our story</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section className="section__container destination__container">
        <div className="section__header">
          <div>
            <h2 className="section__title">Explore top Jobs</h2>
            <p className="section__subtitle">
              Unlock Your Potential: Our job portal offers personalized job recommendations and a seamless application process. Explore now
            </p>
          </div>
          <div className="destination__nav">
            <span><i className="ri-arrow-left-s-line"></i></span>
            <span><i className="ri-arrow-right-s-line"></i></span>
          </div>
        </div>
        <div className="search__bar" style={{margin:'1rem'}}>
          <input  style={{width:'500px',height:'40px',borderRadius:'10px'}}
            type="text"
            placeholder="Search for jobs by title, experience, or company..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="destination__grid">
          {filteredJobs.map((job, index) => (
            <div className="destination__card" key={index}>
              <img src="https://img.freepik.com/free-photo/computer-dark-room-with-graphs-screen_169016-55085.jpg?t=st=1722070854~exp=1722074454~hmac=87829bf99491e4924e760eb65b02b735d284f379480405d70862cb9051594f40&w=360" alt="destination" />
              <div className="destination__details">
                <p className="destination__title">{job.companyName}</p>
                <p className="destination__subtitle">{job.role}</p>
                <p className="destination__subtitle">{job.experience}</p>
                <p className="destination__subtitle">{job.place}</p>
                <button className="btn" onClick={() => navigate('/apply')}>Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashBoard;