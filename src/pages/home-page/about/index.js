import { AffiliatesSection } from "./affiliates-section";
import { OurTeamSection } from "./our-team";
import { VaccineAdministeration } from "./vaccine-administeration";

export const HomePageAbout = () => {
  return (
    <div id="#about" className="w-full bg-gray-100 bg-opacity-30 pt-16">
      <div className="mx-8">
        <h1 className="text-center mb-12">About</h1>
      </div>
      <div className="mx-8 xl:mx-auto max-w-1200 xxl:max-w-1440">
        <div className="w-full md:w-10/12 md:mx-auto">
          <p className="text-center mb-12 text-lg md:text-xl">
            Since its establishment in 2014, The Raya Clinic has offered its
            clients products and services to enable them to live their lives
            fully well. When the COVID-19 pandemic hit, we became one of the
            first and most preferred COVID-19 Testing providers in Metro Manila,
            serving various companies and institutions like Huawei, Hewlett
            Packard Philippines, and the Armed Forces of the Philippines. The
            Raya Clinic’s medical staff are trained and equipped with the proper
            knowledge to carry out a safe and proper administration of the
            Moderna vaccine. We have the capacity to vaccinate 100,000 patients
            per month, or potentially scale depending on your requirements.
          </p>
        </div>
        <OurTeamSection />
        <VaccineAdministeration />
        <AffiliatesSection />
      </div>
    </div>
  );
};
