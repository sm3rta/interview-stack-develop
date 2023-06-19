import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderProps } from '../interfaces';
import MainIcon from '../MainIcon/MainIcon';

const Header = (props: HeaderProps) => {
    return (
        <div
            className='bg-red-700 flex flex-row h-20 items-center p-4 justify-between w-full'
            data-testid="header-container-div"
        >
            <MainIcon data-testid="main-icon" />
            <div> 
                {
                    props.links.map(
                        (headerLink, index) => {
                            const classes = `
                                ${index < props.links.length - 1 ? 'pr-4' : ''} text-xl text-white font-bold
                            `;
                            const testId = `link-${index}`;
                            return (
                                <Link to={headerLink.url} className={classes} key={testId} data-testid={testId}>
                                    {headerLink.label}
                                </Link>
                            );
                        }
                    )
                }
            </div>
        </div>
    );
};

export default Header;