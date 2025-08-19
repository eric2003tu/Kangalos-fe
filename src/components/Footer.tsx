import React from 'react';
import { ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                    <div className="text-sm text-gray-600">
                        © {currentYear} Kangalos .  All rights reserved.
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <span>Powered by</span>
                        <a
                            href="http://urbinaryhub.rw/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-ur-blue hover:text-ur-blue/80 transition-colors duration-200 font-medium"
                        >
                            <span> UR Binary Hub  </span> 
                            <ExternalLink className="h-3 w-3" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 