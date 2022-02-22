import { Table, Button, Modal, Input, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { UiConfig } from "../../appRedux/constants";
import { TableScreenLayout } from "../../layouts/screens/table-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterParams,
  getSortOrderParams,
  setTableRowColor,
} from "../../helpers/utils";
import { setSideBarMenuItem } from "../../appRedux/actions/Settings";
import {
  getAllVaccinatorDetailsList,
  deleteVaccinator,
  editVaccinator,
} from "../../appRedux/actions/UserList";

export const VaccinatorList = (props) => {
  const { confirm } = Modal;
  const [requestObj, setRequestObj] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const { isLoaded, vaccinatorDetails } = useSelector(
    ({ userList }) => userList
  );

  useEffect(() => {
    dispatch(setSideBarMenuItem("vaccinator-list"));
  }, []);

  useEffect(() => {
    let paginationData = {
      page: requestObj.page_number,
      limit: requestObj.page_size,
    };
    if (!!requestObj.order) paginationData['order'] = requestObj.order;
    if (!!requestObj.filter) paginationData['filter'] = requestObj.filter;
    dispatch(getAllVaccinatorDetailsList(paginationData));
  }, [requestObj]);

  useEffect(() => {
    let finalVaccinatorData = vaccinatorDetails.data?.map((value) => ({
      id: value.id,
      prc_no: value.code,
      vaccinator_name: value.name,
      status: value.status === 1 ? "Active" : "Inactive",
    }));
    setData(finalVaccinatorData);
    setTotal(vaccinatorDetails.total);
  }, [isLoaded]);

  const navigateToEditVaccinator = (item) => {
    const { history } = props;
    history.push("/staff/edit-vaccinator/" + item.id);
  };

  const navigateToAddVaccine = () => {
    const { history } = props;
    history.push("/staff/add-vaccinator");
  };

  const showConfirmDelete = (item) => {
    confirm({
      title: "Do you want to delete " + item.vaccinator_name + "?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          deleteVaccinator(item.id, () => {
            dispatch(getAllVaccinatorDetailsList({}));
          })
        );
      },
    });
  };

  const showConfirmVerify = (item) => {
    confirm({
      title: "Do you want to activate this " + item.vaccinator_name + "?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          editVaccinator(item.id, { status: 1 }, () => {
            dispatch(getAllVaccinatorDetailsList({}));
          })
        );
      },
    });
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const { current, pageSize } = pagination;
    setRequestObj({
      page_size: pageSize,
      page_number: current,
      order: getSortOrderParams(sorter.order, sorter.field),
      filter: getFilterParams(filters),
    });
  };

  const columns = [
    {
      title: "Vaccinator Name",
      dataIndex: "vaccinator_name",
      key: "vaccinator_name",
      width: 200,
    },
    {
      title: "PRC License Number",
      dataIndex: "prc_no",
      key: "prc_no",
      width: 200,
    },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
      key: "x",
      width: 150,
      render: (item) => (
        <div>
          <Button type="link" onClick={() => navigateToEditVaccinator(item)}>
            Edit
          </Button>
          {item.status === "Active" ? (
            <Button type="link" onClick={() => showConfirmDelete(item)}>
              Delete
            </Button>
          ) : (
            <Button type="link" onClick={() => showConfirmVerify(item)}>
              Activate
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between pl-2">
        <h2>Vaccinator List</h2>
        <div>
          <Button type="primary" onClick={navigateToAddVaccine}>
            Add Vaccinator
          </Button>
        </div>
      </div>
      <TableScreenLayout>
        <Table
          size="small"
          scroll={{ y: UiConfig.tableLength }}
          columns={columns}
          dataSource={data}
          pagination={{
            pageSize: requestObj.page_size,
            current: requestObj.page_number,
            total,
          }}
          onChange={handleTableChange}
          rowClassName={setTableRowColor}
        />
      </TableScreenLayout>
    </div>
  );
};
