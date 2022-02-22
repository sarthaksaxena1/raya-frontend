import { useDispatch, useSelector } from "react-redux";
import { updatePatientMedicalHistory } from "../../appRedux/actions/MedicalHistory";
import { getAdminUserList } from "../../appRedux/actions/UserList";
import { find } from "lodash";
import { Row, Col, Form, Input, Button, Divider, Tag } from "antd";
import { roleConstants } from "../../appRedux/constants";
import useWindowDimensions from "../../helpers/window-dimensions";

export const MedicalHistoryDetails = ({
  handleMedicalModalClose,
  patientId,
}) => {
  const { medicalHistoryData, medicalQuestions } = useSelector(
    ({ medicalHistory }) => medicalHistory
  );
  const userListRequestObj = useSelector(
    (state) => state.userList.userListRequestObj
  );
  let user = JSON.parse(localStorage.getItem("user"));
  const { height, width } = useWindowDimensions();

  const dispatch = useDispatch();

  const onFinish = (values) => {
    dispatch(
      updatePatientMedicalHistory(
        patientId,
        {
          remarks: values.remarks,
        },
        () => {
          dispatch(getAdminUserList(userListRequestObj));
          handleMedicalModalClose();
        }
      )
    );
  };

  const setMedicalHistoryData = () => {
    return medicalHistoryData.medical_data
      ? medicalHistoryData.medical_data.map((value) => ({
          question: find(medicalQuestions.data, {
            id: Number(value.question_id),
          })?.name,
          questionTags: find(medicalQuestions.data, {
            id: Number(value.question_id),
          })?.question_tags,
          answer: value.answer,
          symptoms: value.symptoms,
          remarks: value.remarks,
          date: value.date,
        }))
      : [];
  };

  return (
    <div style={{ height: height - 200, overflowY: "auto" }}>
      {setMedicalHistoryData().map((val, index) => (
        <>
          <Row key={index} className="mb-4">
            <Col xs={20}>
              <span className=" text-lg font-semi-bold">
                {index + 1}. {val.question}
              </span>
              {val.symptoms && val.symptoms.length > 0 ? (
                <ul className="list-disc ml-8 mt-2">
                  {Array.isArray(val.symptoms) ? (
                    val.symptoms.map((value, index) => (
                      <li key={index} className="text-lg font-semi-bold">
                        {value}
                      </li>
                    ))
                  ) : (
                    <li className="text-lg font-semi-bold">{val.symptoms}</li>
                  )}
                </ul>
              ) : val.questionTags ? (
                <ul className="list-disc ml-8 mt-2">
                  {val.questionTags.map((value, index) => (
                    <li key={index} className="text-lg break-all">
                      {value}
                    </li>
                  ))}
                </ul>
              ) : null}
              {val.date ? (
                <ul className="list-disc ml-8 mt-2">
                  <li className="text-lg break-words">Date : {val.date}</li>
                </ul>
              ) : null}
              {val.remarks ? (
                <ul className="list-disc ml-8 mt-2">
                  <li className="text-lg break-words">
                    Remarks : {val.remarks}
                  </li>
                </ul>
              ) : null}
            </Col>
            <Col xs={4} className="text-right">
              <span className=" text-lg font-semi-bold break-all mr-4">
                {val.answer === "Yes" ? (
                  <Tag color="error" className="text-lg">
                    Yes
                  </Tag>
                ) : (
                  <p className="mr-9 text-lg font-semi-bold">No</p>
                )}
              </span>
            </Col>
          </Row>
          <Divider />
        </>
      ))}
      {user.user_type === roleConstants.STAFF_ROLE ? (
        !medicalHistoryData.is_verified ? (
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Enter remarks"
              name="remarks"
              rules={[{ required: true, message: "Please enter remarks" }]}
              className="mb-2"
            >
              <Input.TextArea />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Row className="mb-4">
            <Col xs={24}>
              <span className=" text-lg font-bold">Remarks:</span>
            </Col>
            <Col xs={24}>
              <span className=" text-lg font-semi-bold break-all">
                {medicalHistoryData.remarks}
              </span>
            </Col>
          </Row>
        )
      ) : null}
    </div>
  );
};
