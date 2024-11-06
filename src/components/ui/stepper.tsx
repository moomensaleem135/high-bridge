import React from 'react';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/system';
import CheckTickIcon from '@mui/icons-material/Check';

interface Props {
  activeStep: number;
}

const CustomStepIcon = ({
  active,
  completed,
}: {
  active: boolean;
  completed: boolean;
}) => {
  if (completed) {
    return (
      <CheckTickIcon
        style={{
          color: '#000000',
          fontSize: 16,
          verticalAlign: 'middle',
          marginTop: '5px',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 11,
        height: 11,
        borderRadius: '50%',
        backgroundColor: active ? '#000000' : '#BDBDBD',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8px',
      }}
    />
  );
};

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderWidth: 2,
    transition: 'border-color 0.3s ease',
  },
  '&.Mui-active .MuiStepConnector-line': {
    borderColor: '#000000',
  },
  '&.Mui-completed .MuiStepConnector-line': {
    borderColor: '#000000',
  },
  '&.Mui-disabled .MuiStepConnector-line': {
    borderColor: '#BDBDBD',
  },
}));

const StepperComponent: React.FC<Props> = ({ activeStep }) => {
  const steps = ['Select Item', 'Check Eligibility', 'Zakat Applicability'];

  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<CustomConnector />}
      sx={{ width: '100%' }}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomStepIcon
                active={props.active ?? false}
                completed={props.completed ?? false}
              />
            )}
          >
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperComponent;
