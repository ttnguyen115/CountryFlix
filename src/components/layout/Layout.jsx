import Head from 'next/head';
import Link from 'next/Link';
import styles from "./Layout.module.css";
import Brightness6Icon from '@material-ui/icons/Brightness6';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { useEffect, useState } from 'react';

const Layout = ({ children, title = "CountryFlix" }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', 
            localStorage.getItem("theme")    
        );

        setTheme(localStorage.getItem("theme"));
    }, []);

    const switchTheme =() => {
        if (theme === "light") {
            saveTheme("dark");
        } else {
            saveTheme("light"); 
        }
    }

    const saveTheme = (theme) => {
        setTheme("dark");
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute('data-theme', theme);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/countryflix.png" />
            </Head>

            <header className={styles.header}>
                <Link href="/">
                    <img src="/countryflix.png" alt="" />
                </Link>

                <button 
                    className={styles.theme_switcher}
                    onClick={switchTheme}
                >
                    { theme === "light" 
                        ? <Brightness6Icon />
                        : <Brightness4Icon />
                    }
                </button>
            </header>

            <main className={styles.main}>
                { children }
            </main>

            <footer className={styles.footer}>
                Trung Nguyen
            </footer>
        </div>
    )
};

export default Layout;