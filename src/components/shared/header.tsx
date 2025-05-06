import { Bell, Plus, Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { SidebarTrigger } from '../ui/sidebar'

const Header = () => {
  return (
    <header className="bg-white border-b border-slate-200 p-4">

    <div className="flex items-center justify-between">
    <SidebarTrigger />

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
        <Input 
          type="search" 
          placeholder="Search..." 
          className="pl-9 w-64 bg-slate-50 border-slate-200"
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-slate-600" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <span className="bg-slate-200 rounded-full px-2 py-1 text-xs font-medium">?</span>
        </Button>
        
       
      </div>
    </div>
  </header>
  )
}

export default Header