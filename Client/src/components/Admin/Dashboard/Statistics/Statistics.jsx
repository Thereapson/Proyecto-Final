import * as React from 'react';
import DollarIcon from '@mui/icons-material/AttachMoney';

import CardM from './CardM'


const Statistic = (props) => {
    const { to, title, value } = props;
    return (
        <CardM
            to={to}
            icon={DollarIcon}
            title={title}
            value={value}
        />
    );
};

export default Statistic;
