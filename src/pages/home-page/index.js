import { useEffect } from "react";
import { useState } from "react";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { MobileSidebar } from "../../components/sidebar/mobile-sidebar";
import { VaccinationReminder } from "./vaccination-reminders";
import { CovidVaccination } from "./covid-vaccination/covid-vaccination-section";
import { HeroBanner } from "./hero-banner";
import { VaccinationSites } from "./vaccination-sites";
import { HomePageAbout } from "./about";
import ScrollHandler from "../../helpers/scrollHandler";
import { Capacitor } from "@capacitor/core";
import { useHistory } from "react-router-dom";
import { InNews } from "./in-news";

export const RayaHomePage = () => {
  const history = useHistory();
  const headerMenu = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Covid-19 Vaccination", href: "/#covid" },
    { label: "Vaccination Sites", href: "/#vaccination" },
    { label: "Contact", href: "/#contact" },
  ];

  const [showNavMenu, setShowNavMenu] = useState(false);

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      history.push("/login");
    }
  }, []);

  return (
    <div>
      <ScrollHandler />
      <MobileSidebar
        toggleNavMenu={() => setShowNavMenu(!showNavMenu)}
        showNavMenu={showNavMenu}
        headerMenu={headerMenu}
      /> 
      {showNavMenu ? null : (
        <Header
          toggleNavMenu={() => setShowNavMenu(!showNavMenu)}
          headerMenu={headerMenu}
        />
      )}
      <HeroBanner />
      <VaccinationReminder />
      <InNews />
      <HomePageAbout />
      <CovidVaccination />
      <VaccinationSites />
      <Footer />
    </div>
  );
};
