import {DashboardIcon,BarChartIcon} from "../utils/myMaterial";

function Menu() {
  return (
    [
        {
            segment: 'dashboard',
            title: 'Dashboard',
            icon: <DashboardIcon />,
          },
          {
            segment: 'orders',
            title: 'Orders',
            icon: <DashboardIcon />,
          },
          {
            segment: 'reports',
            title: 'Reports',
            icon: <BarChartIcon />,
          },
    ]
  )
}

export default Menu