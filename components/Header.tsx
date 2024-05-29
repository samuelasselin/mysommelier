import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { locale, push, pathname } = useRouter();
    const { i18n } = useTranslation();

    const changeLocale = locale === 'en' ? 'fr' : 'en';

    useEffect(() => {
        i18n.changeLanguage(locale);
    }, [locale]);

    const handleLocaleChange = () => {
        push(pathname, pathname, { locale: changeLocale });
    };

    return (
        <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
            <Link href="/" className="flex space-x-3">
                <img
                    alt="header text"
                    src="/wine.svg"
                    className="sm:w-10 sm:h-10 w-9 h-9"
                />
                <h1 className="sm:text-3xl text-2xl font-bold ml-2 tracking-tight">
                    vno
                </h1>
            </Link>

            <button onClick={handleLocaleChange} className="flex space-x-3">
                <h5 className="sm:text-2xl text-1xl font-bold ml-2 tracking-tight">
                    {locale === 'en' ? 'fr' : 'en'}
                </h5>
            </button>
        </header>
    );
}
