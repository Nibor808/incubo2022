import React, {useEffect, useRef, useState} from 'react';
import {Header} from './Header';
import {About} from './About';
import {PortfolioList} from './PortfolioList';
import {list2016} from '../portfolio-data/list_2016';
import {list2017} from '../portfolio-data/list_2017';
import {list2020} from '../portfolio-data/list_2020';
import {Modal} from './Modal';
import linkedIn from '../styles/images/linkedIn.png';
import {MyLink} from './MyLink';

const AppElement: React.FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div className="row">
            <div className="col-12">{children}</div>
        </div>
    );
};

export const App: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [event, setEvent] = useState<React.MouseEvent<HTMLImageElement, MouseEvent> | null>(null);
    const portfolioRef = useRef<HTMLDivElement | null>(null);
    const contactRef = useRef<HTMLDivElement | null>(null);
    const [logoImg, setLogoImg] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setLogoImg(document.getElementById('logo-img'));
    }, []);

    window.onscroll = () => {
        const width = window.innerWidth;

        if (logoImg) {
            if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
                document.body.classList.add('nav-shadow');

                if (width < 768) {
                    logoImg.style.height = '70px';
                    logoImg.style.width = '165px';
                } else {
                    logoImg.style.height = '80px';
                    logoImg.style.width = '185px';
                }

                logoImg.style.transition = '0.4s';
            } else if (width < 768) {
                logoImg.style.height = '85px';
                logoImg.style.width = '200px';
                document.body.classList.remove('nav-shadow');
            } else {
                logoImg.style.height = '110px';
                logoImg.style.width = '258px';
                document.body.classList.remove('nav-shadow');
            }
        }
    };

    const toTop = React.useCallback((ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ev.preventDefault();

        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 50);
    }, []);

    const toPortfolio = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();

        setTimeout(() => {
            portfolioRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }, 75);
    }, []);

    const toContact = React.useCallback((ev: React.MouseEvent<HTMLButtonElement>) => {
        ev.preventDefault();

        setTimeout(() => {
            contactRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }, 75);
    }, []);

    const handleClick = (ev: React.MouseEvent<HTMLImageElement>) => {
        setIsOpen(true);
        ev.persist();
        setEvent(ev);
    };

    const showModal = React.useCallback((): React.ReactElement => {
        const target = event?.target as HTMLImageElement;

        return (
            <span key="a1">
                <Modal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    srcText={target?.dataset.text} // holds path to full size image
                    headerText={target?.alt}
                />
            </span>
        );
    }, [event?.target, isOpen]);

    return (
        <>
            {isOpen ? showModal() : null}
            <Header key="a2" toContact={toContact} toPortfolio={toPortfolio} toTop={toTop} />
            <section key="a3" className="landing container">
                <article className="about" data-testid="about">
                    <div className="about-container d-flex align-items-center flex-column">
                        <AppElement>
                            <About />
                        </AppElement>
                    </div>
                </article>

                <article className="portfolio" ref={portfolioRef} data-testid="portfolio">
                    <div className="header-container">
                        <AppElement>
                            <h1>Portfolio</h1>
                            <a
                                href="https://github.com/Nibor808"
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="github-link"
                            >
                                github
                            </a>
                        </AppElement>
                    </div>

                    <div className="portfolio-container">
                        <PortfolioList
                            year="2020"
                            list={list2020}
                            sideBarName="sidebar2020"
                            handleClick={handleClick}
                        />

                        <PortfolioList
                            year="2017"
                            list={list2017}
                            sideBarName="sidebar2017"
                            handleClick={handleClick}
                        />

                        <PortfolioList
                            data-testid="2016-list"
                            year="2016"
                            list={list2016}
                            sideBarName="sidebar2016"
                            handleClick={handleClick}
                        />
                    </div>
                </article>

                <article className="contact" ref={contactRef} data-testid="contact">
                    <AppElement>
                        <h1>Contact</h1>
                    </AppElement>

                    <AppElement>
                        <div className="cta">
                            <p>Want to work together? Get in touch!</p>
                            <MyLink
                                title={<img src={linkedIn} alt="Robin Erickson linkedIn" />}
                                href="https://www.linkedin.com/in/robinerickson08/"
                                klass="social-link"
                            />
                        </div>
                    </AppElement>
                </article>
            </section>
        </>
    );
};
