import { ShareOutlined } from '@mui/icons-material';
import { FC } from 'react';
import { Link } from 'react-router-dom';

export interface SharButtonProps {
    link: string
}

const ShareButton: FC<SharButtonProps> = ({ link = 'https://tap-it.in/' }) => {

    return (
        <Link to={link}>
            <ShareOutlined fontSize='small' />
        </Link>
    );
};

export default ShareButton;
