'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
    const pathname = usePathname();

    // Split and filter path segments
    const segments = pathname
        .split('/')
        .filter((segment) => segment !== '');

    const buildHref = (index) => {
        return '/' + segments.slice(0, index + 1).join('/');
    };

    return (
        <nav className="text-sm text-gray-500">
            <ol className="flex space-x-2">
                <li>
                    <Link href="/" className="font-bold text-blue-700 hover:underline text-blue-600">
                        ConsultNow
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    const href = buildHref(index);
                    const isLast = index === segments.length - 1;

                    return (
                        <li key={href} className="flex items-center space-x-2">
                            <span className="mx-1">/</span>
                            {isLast ? (
                                <span className="capitalize text-gray-700">{segment}</span>
                            ) : (
                                <Link href={href} className="capitalize hover:underline text-blue-600">
                                    {segment}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
