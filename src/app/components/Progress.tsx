import { JSX } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { blue } from '@mui/material/colors';


type Props = {
    loading: boolean;
};

const Progress = ({ loading }: Props): JSX.Element => {
    const sx = {
        color: blue[500],
        position: 'absolute',
        top: '0%',
        left: '0%',
        marginTop: '25px',
        marginLeft: '64px',
    };

    return (
      <>
        {loading && (
          <CircularProgress
            size={25}
            sx={sx}
          />
        )}
      </>
    );
};

export default Progress;