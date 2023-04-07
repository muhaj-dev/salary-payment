import { MdOutlineDashboardCustomize, MdOutlineManageAccounts, MdReportGmailerrorred, MdOutlineAdminPanelSettings } from 'react-icons/md'


export const NavMenu = [
    {
      name:"Dashboard",
      link: "/admin/dashboard",
      icon: <MdOutlineDashboardCustomize className='h-[10%] w-[10%]' />,
      id: 1
    }, 
    {
      link: "/management/staffs",
      id: 2,
      icon: <MdOutlineManageAccounts  className='h-[10%] w-[10%]'/>,
      name:"Staff Mgt",
    },
    {
      id: 3,
      link: "/payment/report",
      icon: <MdReportGmailerrorred  className='h-[10%] w-[10%]'/>,
      name:"Report",
    }, 
  
  ]


  