import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks } from '@fortawesome/free-solid-svg-icons';

const MenuBar: React.FC = () => {
    const menuItems = [
        { icon: faHome, label: 'Home' },
        { icon: faTasks, label: 'Management Story' },
    ];

    return (
        <div className="flex flex-col md:flex-col">
            {menuItems.map((item, index) => (
                <div key={index} className="mb-4 md:mb-0 md:mr-4 flex md:flex-row">
                    <div className="mr-2 md:mr-2 md:mb-2">
                        <FontAwesomeIcon icon={item.icon} />
                    </div>
                    <div>
                        <p className="text-lg font-bold md:text-base">{item.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuBar;