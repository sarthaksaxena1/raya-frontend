import { Card, Col, Row } from "antd";
import bgDrug from "../../assests/images/bg-vaccination-drug.svg";
import bgRectangle from "../../assests/images/bg-vaccination-rectangle.svg";

export const VaccinationSites = () => {
  const vaccinationLocations = [
    {
      name: "Raya Health-Centuria Medical (Makati)",
      address: "Gen. Luna St. Poblacion, Makati",
      status: "Operational (Private)",
      dailyCapacity: "600",
      remarks: "3-5 days a week*",
    },
    {
      name: "Raya Health-Albergus (Quezon City)",
      address: "16 Capitol Hills Drive, Old Balara, Quezon City",
      status: "Operational (Private)",
      dailyCapacity: "600",
      remarks: "2 days a week*",
    },
    {
      name: "Raya Health-The Heritage Park (Taguig)",
      address: "Bayani Rd. Taguig",
      status: "Operational Soon",
      dailyCapacity: "400",
      remarks: "3-5 days a week (w/ Drive thru)*",
    },
    {
      name: "Raya Health- Visayas Med (Cebu)",
      address: "85 Osmena Blvd Cebu City",
      status: "Operational (Private)",
      dailyCapacity: "400",
      remarks: "2 days a week*",
    },
    {
      name: "Raya Health-Claver, SDN",
      address: "Claver Gym, Claver, SDN",
      status: "Operational (LGU)",
      dailyCapacity: "300",
      remarks: "Subject to vaccine availability",
    },
    {
      name: "Raya Health-Siargao, SDN",
      address: "General Luna Gym Purok 1 Siargao, SDN",
      status: "Operational (LGU)",
      dailyCapacity: "300",
      remarks: "Pop-up site",
    },
    {
      name: "Raya Health-Surigao City, SDN",
      address: "Surigao Provincial Convention Center",
      status: "Operational (LGU)",
      dailyCapacity: "300",
      remarks: "Pop-up site",
    },
    {
      name: "Raya Health-El Nido",
      address: "El Nido Gym, Palawan",
      status: "Operational (LGU)",
      dailyCapacity: "300",
      remarks: "Pop-up site",
    },
    {
      name: "Raya Health-Pampanga",
      address: "Clark Development Corporation, Pampanga",
      status: "Operational (LGU)",
      dailyCapacity: "300",
      remarks: "Pop-up site",
    },
    {
      name: "Raya Health-THPAL Clinic SDN",
      address: "THPAL Clinic, SDN",
      status: "Operational Soon",
      dailyCapacity: "500",
      remarks: "Corporate vaccination site",
    },
    {
      name: "Raya Health-Rio Tuba, Palawan",
      address: "LSVMS La Salle School",
      status: "Operational Soon",
      dailyCapacity: "500",
      remarks: "Corporate vaccination site",
    },
  ];
  return (
    <div id="#vaccination" className="mt-16">
      <div className="w-full relative">
        <div className="z-negative absolute top-0 left-0 hidden md:block">
          <img src={bgDrug} alt="" />
        </div>
        <div className="z-negative absolute bottom-0 right-0 hidden md:block">
          <img src={bgRectangle} alt="" />
        </div>
        <div className="mx-8">
          <h1 className="text-center mb-8 sm:mb-16">Vaccination Sites</h1>
        </div>
        <div className="mx-8 xl:mx-auto max-w-1200 xxl:max-w-1440">
          <Row className="flex -mx-4">
            {vaccinationLocations.map((value, index) => (
              <Col xs={24} lg={12} key={index} className="px-4 mb-8">
                <Card
                  className="home-page-vaccination-location-card p-0 rounded-md border-0 shadow-md border-b-10 border-blue-600 flex flex-col h-full"
                  title={<p className="text-lg font-medium">{value.name}</p>}
                >
                  <Row className="text-base md:text-sm lg:text-base w-full h-full flex">
                    <Col
                      xs={24}
                      md={8}
                      className="mb-2 md:mb-0 flex items-center"
                      style={{ minHeight: 64 }}
                    >
                      <p className=" py-4 px-6">{value.address}</p>
                    </Col>
                    <Col
                      xs={24}
                      md={16}
                      className="md:pl-2 flex flex-col h-full"
                    >
                      <Row className="h-20 items-center px-6 py-1 bg-gray-100 bg-opacity-50">
                        <Col xs={12}>Status</Col>
                        <Col xs={12}>{value.status}</Col>
                      </Row>
                      <Row className="h-20 items-center px-6 py-1 bg-gray-200 bg-opacity-50">
                        <Col xs={12}>Daily Capacity</Col>
                        <Col xs={12}>{value.dailyCapacity}</Col>
                      </Row>
                      <Row className="h-20 items-center px-6 py-1 bg-gray-100 bg-opacity-50">
                        <Col xs={12}>Remarks</Col>
                        <Col xs={12}>{value.remarks}</Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};
