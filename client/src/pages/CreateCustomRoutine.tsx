import './CreateCustomRoutine.css';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { PoseDTO } from '../interfaces/PoseDTO';
import { updateUserInfo } from '../services/server';

import { updateUser } from '../redux/usersSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

import PoseCard from '../containers/PoseCard';
import Button from '../components/Button';

const CreateCustomRoutine: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const routines = useAppSelector((state) => state.routines);
  const routineArray = [
    ...routines['beginner'],
    ...routines['intermediate'],
    ...routines['advanced'],
  ];
  let customTrack: PoseDTO[] = [];

  const handleCardClick = (checkBox: HTMLInputElement) => {
    const poseId = checkBox.value;
    if (checkBox.checked) {
      routineArray.forEach((pose) =>
        pose.id === poseId ? customTrack.push(pose) : {}
      );
    } else {
      customTrack = customTrack.filter((pose) => pose.id !== poseId);
    }
  };

  const handleSave = async () => {
    dispatch(updateUser({ customTracks: customTrack }));
    await updateUserInfo({ customTracks: customTrack });
    history.push('dashboard');
  };

  return (
    <div className="custom-routine-container">
      <div className="custom-routine-header">
        <div className="custom-routine-save">
          <h2>Custom Routine</h2>
          <Button label="Save" onClick={handleSave} />
        </div>
        <p>
          Click on the cards below to add or remove them from your personalized
          routine. When you are satisfied, click on &quot;Save&quot; to store
          your sequence and return to the Dashboard.
        </p>
      </div>
      <div className="custom-routine-cards">
        {routineArray.map((pose: PoseDTO) => (
          <PoseCard key={pose.id} pose={pose} handleClick={handleCardClick} />
        ))}
      </div>
    </div>
  );
};

export default CreateCustomRoutine;
