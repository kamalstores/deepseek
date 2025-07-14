import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect } from "react";

const ChatLabel = ({chat, isSelected, onSelect, openMenu, setOpenMenu}) => {
    
    const handleMenuClick = (e) => {
        e.stopPropagation();
        setOpenMenu(prev => ({
            id: chat._id,
            open: prev.id === chat._id ? !prev.open : true
        }));
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = () => {
            if (openMenu.open) {
                setOpenMenu({id: 0, open: false});
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openMenu.open, setOpenMenu]);

    return (
        <div 
            className={`flex items-center justify-between p-2 hover:bg-white/10 rounded-lg text-sm group cursor-pointer ${isSelected ? 'bg-white/10 text-white' : 'text-white/80'}`}
            onClick={onSelect}
        >
            <p className="group-hover:max-w-5/6 truncate">{chat.name || 'New Chat'}</p>
            <div className="group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg">
                <Image 
                    src={assets.three_dots} 
                    alt='' 
                    className={`w-4 ${openMenu.open && openMenu.id === chat._id ? '' : 'hidden'} group-hover:block`}
                    onClick={handleMenuClick} />

                {/* ... for delete and edit options */}
                <div className={`absolute ${openMenu.open && openMenu.id === chat._id ? 'block' : 'hidden'} -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 transition-opacity z-10`}>
                    <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                        <Image src={assets.pencil_icon} alt='' className='w-4'/>
                        <p>Rename</p>
                    </div>

                    <div className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-lg">
                        <Image src={assets.delete_icon} alt='' className='w-4'/>
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatLabel;