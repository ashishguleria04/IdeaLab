"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Heading = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Unleash Your Creativity<span className="text-blue-600">💡</span>, Organize Your Thoughts<span className="text-green-600">📚</span>, & Achieve Your Goals<span className="text-yellow-600">🚀</span>
                <span className="block mt-2">Welcome to <span className="underline decoration-blue-500 decoration-4">IdeaLab</span></span>
            </h1>
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300">
                Transform your ideas into reality with IdeaLab -
                <br className="hidden sm:inline" />
                the all-in-one workspace for innovators and dreamers.
            </h3>
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size = "lg"/>
                </div>    
            )}
            {isAuthenticated && !isLoading && (
                <Button asChild>
                    <Link href="/documents">
                        Enter IdeaLab
                        <ArrowRight className="h-4 w-4 ml-2"/>
                    </Link>

                </Button>
            )}
            {!isAuthenticated && !isLoading && (
                <SignInButton mode="modal">
                    <Button>
                        Start Your Free IdeaLab Journey
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                </SignInButton>
            )}
        </div>
    )
}
