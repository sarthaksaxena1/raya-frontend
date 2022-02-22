import bgBell from "../../assests/images/bg-bell.svg";
export const VaccinationReminder = () => {
  const reminderData = [
    {
      label: "1",
      value: "Please wear loose clothing/short sleeves for easy vaccination.",
    },
    {
      label: "2",
      value:
        "Please sleep well, eat and hydrate adequately before arrival as there is no eating and drinking allowed at the vaccination site.",
    },
    {
      label: "3",
      value:
        "Please bring your own pen to sign the consent forms and vaccination cards.",
    },
    {
      label: "4",
      value:
        "Wearing of face mask and face shield is required to enter the building.",
    },
    {
      label: "5",
      value:
        "If you are pre-registered, go directly to the vaccination site; if not, proceed to registration; ushers will assist patients upon arrival if needed.",
    },
    {
      label: "6",
      value:
        "We have limited waiting area seating for crowd control. Excess and unscheduled vaccinees (early birds and later comers) will be required at the waiting area and be escorted to the vaccination site.",
    },
    {
      label: "7",
      value:
        "If you are pre-registered, go directly to the roofdeck; if not, proceed to the 25th for registration; ushers will assist patients upon arrival if needed .",
    },
  ];
  return (
    <div className="mt-16">
      <div className="w-full relative">
        <div className="z-negative absolute top-16 bottom-0 right-0 hidden md:block">
          <img src={bgBell} alt="" />
        </div>
        <div className="mx-8">
          <h2 className="text-center mb-8 sm:mb-16">
            Reminders before vaccination
          </h2>
        </div>
        <div className="mx-8 xl:mx-auto max-w-1200 xxl:max-w-1440">
          {reminderData.map((val, index) => (
            <div
              key={index}
              className="flex md:flex-row flex-col items-center mb-4"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 text-xl md:mr-8 sm:mt-0 mt-4">
                <span className="text-4xl font-bold text-white">
                  {val.label}
                </span>
              </div>
              <p className="w-full md:w-11/12 lg:w-10/12 text-lg text-center md:text-left md:pt-0 pt-4">
                {val.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
