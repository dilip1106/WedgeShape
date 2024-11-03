import React from 'react';
import '../assets/Team.css';
import deepimg from "../assets/deep.jpg"; // Ensure other images are imported similarly
import dilipimg from "../assets/dilip.jpg"; // Ensure other images are imported similarly
import 'bootstrap-icons/font/bootstrap-icons.css';
import MentorImg from "../assets/Namrata_Manglani.png"
const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Namrata Manglani',
      role: 'Mentor',
      description: 'laudantium vel dolorum distinctio dire flow',
      image: MentorImg,
      socials: {
        instagram: '#',
        linkedin: '#',
        github: '',
      },
    },
    {
      name: 'Dilipkumar Teli',
      role: 'Developer',
      description: 'Labore ipsam sit consequatur exercitationem rerum laboriosam laudantium aut quod dolores exercitationem ut',
      image: dilipimg,
      socials: {
        instagram: 'https://www.instagram.com/dilip_1124',
        linkedin: 'https://www.linkedin.com/in/dilipkumarteli/',
        github: 'https://github.com/dilip1106/',
      },
    },
    {
      name: 'Deep Adak',
      role: 'Developer',
      description: 'Illum minima ea autem doloremque ipsum quidem quas aspernatur modi ut praesentium vel tque sed facilis at qui',
      image: deepimg,
      socials: {
        instagram: 'https://www.instagram.com/_deep_5317',
        linkedin: 'https://www.linkedin.com/in/deep-adak/',
        github: 'https://github.com/Deep5317/',
      },
    },
  ];

  return (
    <section id="team" className="team section light-background">
      <div className="container section-title">
        <h2>Our Team</h2>
        <p>Meet the professionals who drive our mission forward</p>
      </div>

      <div className="container team-cards">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <div className="team-card-inner">
              <div className="team-card-front">
                <img src={member.image} alt={member.name} />
              </div>
              <div className="team-card-back">
                <div className="member-img-back">
                  <img src={member.image} alt={member.name} />
                </div>
                <h4 className='back-name' >{member.name}</h4>
                <span className='back-role'>{member.role}</span>
                <p>{member.description}</p>
                <div className="social">
                  <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i></a>
                  <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer"><i className="bi bi-linkedin"></i></a>
                  <a href={member.socials.github} target="_blank" rel="noopener noreferrer"><i className="bi bi-github"></i></a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutPage;
