import { Logo } from "./logo"

import { Button } from "@/components/ui/button"
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
});

export const Footer = () => {
    return (
        <div className="flex items-center w-full p-6 bg-gradient-to-r from-green-400 to-blue-500 dark:from-gray-700 dark:to-gray-800 z-50">
            <Logo />
            <div className={`md:ml-auto w-full justify-between md:justify-end flex items-center gap-x-4 text-white ${font.className}`}>
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
