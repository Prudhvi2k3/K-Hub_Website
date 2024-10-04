import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './teamview.css';

const TeamView = () => {
  const [team, setTeam] = useState(null);
  const { teamIndex } = useParams();

  useEffect(() => {
    fetchTeamDetails();
  }, [teamIndex]);

  const fetchTeamDetails = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/teams/batches/latest');
      setTeam(response.data.teams[teamIndex]);
    } catch (error) {
      console.error('Error fetching team details:', error);
    }
  };

  if (!team) {
    return <p>Loading team details...</p>;
  }

  const renderMemberCard = (member, role) => (
    <div className="teamview-card">
      {member.image && (
        <img
          src={`data:image/jpeg;base64,${member.image}`}
          alt={member.name}
          className="teamview-image"
        />
      )}
      <div className="teamview-card-content">
        <h3>{member.name}</h3>
        <p><strong>Role:</strong> {role}</p>
        {/* <p><strong>Subteam:</strong> {member.subteam}</p> */}
        {/* {member.git && <p><strong>GitHub:</strong> <a href={member.git} target="_blank" rel="noopener noreferrer">{member.git}</a></p>} */}
        {/* {member.linkedin && <p><strong>LinkedIn:</strong> <a href={member.linkedin} target="_blank" rel="noopener noreferrer">{member.linkedin}</a></p>} */}
        <div className="teamview-social-icons">
          {member.twitter && <a href={member.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>}
          {member.instagram && <a href={member.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>}
          {member.git && <a href={member.git} target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>}
          {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>}
        </div>
      </div>
    </div>
  );

  const renderPairs = (seniorDevelopers, juniorDevelopers) => {
    const pairs = [];

    seniorDevelopers.forEach((senior) => {
      const junior = juniorDevelopers.find(junior => junior.subteam === senior.subteam);
      pairs.push(
        <div className="teamview-memberPair" key={senior.name}>
          {renderMemberCard(senior, 'Senior Developer')}
          {junior && renderMemberCard(junior, 'Junior Developer')}
        </div>
      );
    });

    return pairs;
  };

  const seniorDevelopers = team.members.filter(member => member.role === 'Senior Developer');
  const juniorDevelopers = team.members.filter(member => member.role === 'Junior Developer');

  return (
    <div className="teamview-container">
      <h2>Team {parseInt(teamIndex) + 1} Details</h2>
      <div className="teamview-section teamview-side-by-side">
        <div>
          <h3>Team Leader</h3>
          {renderMemberCard(team.teamLeader, 'Team Leader')}
        </div>
        <div>
          <h3>Team Mentor</h3>
          {renderMemberCard(team.teamMentor, 'Mentor')}
        </div>
      </div>
      <div className="teamview-section">
        <h3>Team Members</h3>
        <div className="teamview-memberGrid">
          {renderPairs(seniorDevelopers, juniorDevelopers)}
        </div>
      </div>
    </div>
  );
};

export default TeamView;
