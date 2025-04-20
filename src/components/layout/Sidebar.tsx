import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronRight, LayoutDashboard, Users, ShoppingBag, Menu } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  roles: string[];
  submenu?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard size={20} />,
    roles: ['admin', 'seller'],
  },
  {
    title: 'User Management',
    icon: <Users size={20} />,
    roles: ['admin' ],
    submenu: [
      {
        title: 'All Users',
        path: '/users',
        icon: <ChevronRight size={20} />,
        roles: ['admin'],
      },
      // {
      //   title: 'Roles',
      //   path: '/roles',
      //   icon: <ChevronRight size={20} />,
      //   roles: ['admin'],
      // },
    ],
  },
  {
    title: 'Resturent',
    icon: <ShoppingBag size={20} />,
    roles: ['admin', 'seller'],
    submenu: [
      {
        title: 'Add Restutrent',
        path: '/addresturent',
        icon: <ChevronRight size={20} />,
        roles: ['seller',"admin"],
      },
      {
        title: 'Foods',
        path: '/foods',
        icon: <ChevronRight size={20} />,
        roles: ['seller'],
      },
    ],
  },
  // {
  //   title: 'Settings',
  //   path: '/settings',
  //   icon: <Settings size={20} />,
  //   roles: ['admin', 'seller'],
  // },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>([]);
  const { user } = useSelector((state: RootState) => state.auth);

  const toggleSubmenu = (title: string) => {
    setOpenMenus(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const canAccessMenuItem = (item: MenuItem) => {
    return user && item.roles.includes(user.role);
  };

  const renderMenuItem = (item: MenuItem) => {
    if (!canAccessMenuItem(item)) return null;

    const isOpen = openMenus.includes(item.title);

    return (
      <div key={item.title}>
        {item.path ? (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${isActive ? 'bg-gray-100' : ''}`
            }
          >
            <span className="mr-3">{item.icon}</span>
            {!isCollapsed && <span>{item.title}</span>}
          </NavLink>
        ) : (
          <div
            className="flex items-center p-3 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => toggleSubmenu(item.title)}
          >
            <span className="mr-3">{item.icon}</span>
            {!isCollapsed && (
              <>
                <span className="flex-1">{item.title}</span>
                {item.submenu && (
                  <span className="ml-auto">
                    {isOpen ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </span>
                )}
              </>
            )}
          </div>
        )}

        {item.submenu && isOpen && !isCollapsed && (
          <div className="ml-6 mt-2">
            {item.submenu.map(subItem =>
              canAccessMenuItem(subItem) && (
                <NavLink
                  key={subItem.title}
                  to={subItem.path || '#'}
                  className={({ isActive }) =>
                    `flex items-center p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors ${isActive ? 'bg-gray-100' : ''}`
                  }
                >
                  <span className="mr-3">{subItem.icon}</span>
                  <span>{subItem.title}</span>
                </NavLink>
              )
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white h-screen shadow-lg transition-all ${isCollapsed ? 'w-20' : 'w-64'} fixed top-0 left-0 bottom-0`}>
      <div className="p-4 border-b flex items-center justify-between">
        {!isCollapsed && <h1 className="text-xl font-bold">Food Dashboard</h1>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>
      </div>
      <nav className="p-4 overflow-y-auto h-full">
        {menuItems.map(renderMenuItem)}
      </nav>
    </div>
  );
};

export default Sidebar;
