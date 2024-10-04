import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import './aluminiview.css';

const AlumniView = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const { batchNumber } = useParams();

  useEffect(() => {
    fetchAlumni();
  }, [batchNumber]);

  const fetchAlumni = async () => {
    try {
      const response = await axios.get(`https://k-hub.onrender.com/api/alumni/batch/${batchNumber}`);
      setAlumni(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching alumni:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading alumni for Batch {batchNumber}...</p>;
  }

  return (
    <div className="alumniv-container">
      <h5 >.</h5>
      <h2 className="heading">Batch {batchNumber}</h2>
      <button><Link to="/aluminibatch">Back</Link></button>
      {alumni.length === 0 ? (
        <p>No alumni found for Batch {batchNumber}.</p>
      ) : (
        <div className="alumniv-grid">
          {alumni.map((alumnus, index) => (
            <div key={index} className="alumni-card">
              {alumnus.image && (
                <img
                  src={`data:image/jpeg;base64,${alumnus.image}`}
                  alt={alumnus.name}
                  className="alumniv-image"
                />
              )}
              <h3>{alumnus.name}</h3>
              <p><strong>Role:</strong> {alumnus.role}</p>
              <p><strong>Team:</strong> {alumnus.teamNumber}</p>
              <div className="alumniv-icons">
                {alumnus.git && (
                  <a href={alumnus.git} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                )}
                {alumnus.linkedin && (
                  <a href={alumnus.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlumniView;
