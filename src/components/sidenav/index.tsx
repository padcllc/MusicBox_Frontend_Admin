import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import admin from '../../assets/sidenavicons/admin.svg';
import music from '../../assets/sidenavicons/music.svg';
import restaurant from '../../assets/sidenavicons/restaurant.svg';
import user from '../../assets/sidenavicons/user.svg';
import logout from '../../assets/sidenavicons/logout.svg';

import active_admin from '../../assets/sidenavicons/active_admin.svg';
import active_music from '../../assets/sidenavicons/active_music.svg';
import active_restaurant from '../../assets/sidenavicons/active_restaurant.svg';
import active_user from '../../assets/sidenavicons/active_user.svg';
import active_logout from '../../assets/sidenavicons/active_logout.svg';



interface LinkItem {
    name: string;
    role?: string;
    icon: string;
    navigate: string;
    activeIcon: string;
};
export function SideNav() {
    const location = useLocation();
    const navigate = useNavigate();

    const [linkItem, setLinkItem] = useState<LinkItem[]>([
        { name: 'Admin', icon: admin, activeIcon: active_admin, navigate: '/admins'},
        { name: 'Songs', icon: music, activeIcon: active_music, navigate: '/songs' },
        { name: 'Restaurants', icon: restaurant, activeIcon: active_restaurant, navigate: '/restaurants'},
        { name: 'Users', icon: user, activeIcon: active_user, navigate: '/users'},
        { name: 'Log Out', icon: logout, activeIcon: active_logout, navigate: '/login' },
    ]);

    return (
        <>
            <div className="sidenav_content">
                <p className="logo">LOGO</p>

                <p className="title">Music Box</p>
                <ul className="nav__block">
                    {
                        linkItem.map((element: LinkItem, index: number) => {
                            return <li className="nav__list" key={index + 1} onClick={(()=>{
                                if(element?.name === 'Log Out'){
                                    localStorage.removeItem("accessToken");
                                    localStorage.removeItem("refreshToken");
                                    navigate('/login');

                                }
                                else{
                                    return false;
                                }
                            })}>
                                <NavLink to={element?.navigate} className={({ isActive }) =>
                                    [
                                        "navLink",
                                        isActive ? "activeClass" : null,
                                    ]
                                        .filter(Boolean)
                                        .join(" ")
                                }>
                                    <img className="icon" src={location.pathname === element?.navigate ? element.activeIcon : element?.icon} />
                                    <span className="nav__text">{element?.name}</span>
                                </NavLink>
                            </li>
                        })
                    }

                </ul>
            </div>
        </>
    )
}