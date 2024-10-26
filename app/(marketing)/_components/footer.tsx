import { Logo } from "./logo"

import { Button } from "@/components/ui/button"

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-gradient-to-r from-blue-500 to-purple-600 dark:from-gray-800 dark:to-gray-900 z-50">
            <Logo />
            <div className="md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-4 text-white">
                <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                    Privacy Policy
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                    Terms & Conditions
                </Button>
            </div> 
        </div>
    )
}

