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
        top: '50%',
        left: '50%',
        marginTop: '0px',
        marginLeft: '0px',
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