import React from 'react';
import { Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/system';
import CheckTickIcon from '@mui/icons-material/Check'; // Import Check icon (without circle)

interface Props {
  activeStep: number;
}

// Custom StepIcon to style the dots and show a tick for completed steps
const CustomStepIcon = ({
  active,
  completed,
}: {
  active: boolean;
  completed: boolean;
}) => {
  // Set a fixed size for both the dot and the tick to ensure they don't cause layout shift
  // Set a consistent size for the icon

  if (completed) {
    return (
      <CheckTickIcon
        style={{
          color: '#000000', // Color of the tick for completed steps
          fontSize: 16, // Set fontSize to the fixed size
          verticalAlign: 'middle', // Ensures the tick is vertically aligned with the dots
          marginTop: '5px',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: 11, // Same width as the tick icon
        height: 11, // Same height as the tick icon
        borderRadius: '50%', // Circle shape
        backgroundColor: active ? '#000000' : '#BDBDBD', // Active dot in blue, default in gray
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '8px',
      }}
    />
  );
};

// Custom StepConnector for changing connector color based on activeStep
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  '& .MuiStepConnector-line': {
    borderWidth: 2,
    transition: 'border-color 0.3s ease',
  },
  '&.Mui-active .MuiStepConnector-line': {
    borderColor: '#000000', // Blue for the connector of the active step
  },
  '&.Mui-completed .MuiStepConnector-line': {
    borderColor: '#000000', // Blue for completed steps
  },
  '&.Mui-disabled .MuiStepConnector-line': {
    borderColor: '#BDBDBD', // Gray for non-active steps
  },
}));

const StepperComponent: React.FC<Props> = ({ activeStep }) => {
  const steps = ['Select Item', 'Check Eligibility', 'Zakat Applicability'];

  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep} // Set active step dynamically
      connector={<CustomConnector />} // Apply custom connector
      sx={{ width: '100%' }}
    >
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel
            StepIconComponent={(props) => (
              <CustomStepIcon
                active={props.active ?? false} // Default active to false if undefined
                completed={props.completed ?? false} // Default completed to false if undefined
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
