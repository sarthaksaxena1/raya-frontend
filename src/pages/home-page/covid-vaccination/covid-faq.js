import { Collapse } from "antd";

const { Panel } = Collapse;

export const CovidFaqs = () => {
  const covidFaqList = [
    {
      question: "What is the route of administration?",
      answer:
        "The Moderna COVID-19 Vaccine is administered as a 2-dose series, 28 days apart, intramuscular into the deltoid muscle (upper arm)",
      type: "text",
    },
    {
      question: "Moderna Vaccine Effectivity.",
      answer:
        "Moderna is 94.1% effective in preventing COVID 19 100% effective in preventing severe COVID 19 requiring hospitalization.",
      type: "text",
    },
    {
      question: "Is vaccination mandatory?",
      answer:
        "Vaccination is not mandatory. But the government highly encourages the public to get vaccinated and be protected against preventable disease.",
      type: "text",
    },
    {
      question:
        "Are there risks for complications when given the COVID-19 vaccine?",
      answer:
        "Like all other vaccines, there are risks of complications BUT SEVERE OR LIFE-THREATENING REACTIONS ARE EXTREMELY RARE. The benefit of protection against severe COVID-19 is far greater than the risk. Anyone who will get the vaccine will be properly evaluated and closely monitored by health professionals 15-30 minutes after vaccination to further minimize any risk.",
      type: "text",
    },
    {
      question: "Who should not get the MODERNA COVID-19 Vaccine?",
      answer: (
        <div>
          <span>You should not get the MODERNA COVID-19 Vaccine if you:</span>
          <br />
          <br />
          <ul className="list-disc ml-8">
            <li>
              had a severe allergic reaction after a previous dose of any
              vaccine
            </li>
            <li>
              had a severe allergic reaction to the first dose of any COVID 19
              vaccine (go to a nearest hospital if this happens)
            </li>
            <li>Age 17 years and below</li>
          </ul>
        </div>
      ),
      type: "html",
    },
    {
      question:
        "If I have an underlying condition such as diabetes, hypertension or asthma, can I still get the vaccine?",
      answer: "Yes",
      type: "text",
    },
    {
      question:
        "What are the conditions that will strictly need medical clearance from a physician?",
      answer: (
        <div>
          <span>There are 6 conditions that need clearance:</span>
          <br />
          <br />
          <ul className="list-decimal ml-8">
            <li>HIV patients</li>
            <li>Patients using steroids</li>
            <li>Patients with cancer</li>
            <li>Patients with autoimmune disease</li>
            <li>Transplant patients</li>
            <li>Bedridden patients</li>
          </ul>
        </div>
      ),
      type: "html",
    },
    {
      question: "What if I am pregnant or breastfeeding?",
      answer:
        "Patients in the 2nd and 3rd trimester may be injected with the vaccine. The vaccine is safe in breastfeeding mothers.",
      type: "text",
    },
    {
      question: "Will I get a vaccination card?",
      answer:
        "When you receive your first dose, you will get a vaccination card to show you when to return for your second dose of the Moderna COVID-19 Vaccine. Remember to bring your card when you return.",
      type: "text",
    },
    {
      question: "What if I miss my second dose?",
      answer: `The second dose can be given up to 42 days or six weeks after the first one.
      
        Even if your second dose is significantly delayed, you do not need to start the vaccine series all over. You should just get the second dose to complete the series as soon as possible.
        `,
      type: "text",
    },
    {
      question: "What if I have allergies to food and medicine?",
      answer: (
        <div>
          <span>
            A patient who is allergic to the following may receive the vaccine:
          </span>
          <br />
          <ul className="list-disc ml-8">
            <li>food or medicine</li>
            <li>inhalant/environmental allergens</li>
            <li>insect bites</li>
            <li>Latex</li>
          </ul>
        </div>
      ),
      type: "html",
    },
    {
      question:
        "What if I have a bleeding disorder and taking anti-coagulants, can I get the vaccine?",
      answer:
        "A patient who has bleeding disorder and taking anti-coagulants may receive the vaccine, provided that the vaccinator will use gauge 23-25 syringe and apply pressure.",
      type: "text",
    },
    {
      question:
        "What if I am experiencing the following symptoms: fever, chills, headache, cough, colds, diarrhea, sore throat, myalgia, fatigue, weakness, loss of smell and. taste, shortness of breath. and difficulty in breathing, can I get the vaccine?",
      answer: `No, you will be rescheduled and come back after full recovery`,
      type: "text",
    },
    {
      question:
        "What if I had a history of exposure to confirmed or suspected COVID-19 case in the past 2weeks, can I get the vaccine?",
      answer: `No, you will be rescheduled, and come back after quarantine completion`,
      type: "text",
    },
    {
      question:
        "What if I was tested positive for COVID-19 in the past 30 days, can I get the vaccine?",
      answer: `No, reschedule after 30 days or 1 month.`,
      type: "text",
    },
    {
      question:
        "I have received a convalescent plasma or monoclonal antibodies for COVID-19 in the past. 90 days, can I get the vaccine?",
      answer: `No, reschedule after 90 days or 3 months.`,
      type: "text",
    },
    {
      question:
        "What if I received any vaccine in the past two weeks, can I get the vaccine.",
      answer: `No, you will be rescheduled after 14 days from that vaccination.`,
      type: "text",
    },
    {
      question:
        "What if I have auto-immune disease, HIV, cancer, malignancy, underwent transplant, under steroid medication, bed ridden, terminal illness, and less than 6 months prognosis, can I get the vaccine?",
      answer: `No, you should get medical clearance first from your attending physician.`,
      type: "text",
    },
    {
      question: "How do I prepare before the vaccination?",
      answer: `Ensure that you had proper sleep, ate adequately and be hydrated.`,
      type: "text",
    },
    {
      question: "What documents should I bring prior to the inoculation?",
      answer: `Bring a valid government issued ID, company ID and medical clearance/prescriptions as necessary.`,
      type: "text",
    },
  ];
  return (
    <div className="mt-16">
      <h2 className="text-center mb-8">Frequently Asked Questions</h2>
      <Collapse bordered={false} className="bg-transparent">
        {covidFaqList.map((val, index) => (
          <Panel
            header={
              <span className=" text-xl font-medium">{val.question}</span>
            }
            key={index.toString()}
            className="py-4"
          >
            <div className="text-lg">{val.answer}</div>
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
