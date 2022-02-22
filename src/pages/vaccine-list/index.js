import { Table, Button, Modal, Input, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import { UiConfig } from '../../appRedux/constants';
import { TableScreenLayout } from '../../layouts/screens/table-screen';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminVaccineList,
  getAdminVaccineExportList,
  adminDeleteVaccine,
  adminEditVaccine,
  resetVaccine
} from "../../appRedux/actions/VaccineList";
import {
  getFilterParams,
  getSortOrderParams,
  setTableRowColor,
} from '../../helpers/utils';
import { setSideBarMenuItem } from '../../appRedux/actions/Settings';
import { SearchOutlined } from '@ant-design/icons';
import { CSVLink } from "react-csv";

export const VaccineList = (props) => {
  const { confirm } = Modal;
  const csvLink = useRef()

  const [requestObj, setRequestObj] = useState({
    page_number: 1,
    page_size: 10,
  });
  const [total, setTotal] = useState(0);

  const isLoaded = useSelector((state) => state.vaccineList.isLoaded);
  const vaccineList = useSelector((state) => state.vaccineList.vaccineListData);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [exportData, setExporData] = useState("");

  useEffect(() => {
    dispatch(setSideBarMenuItem('vaccine-list'));
  }, []);

  useEffect(() => {
    let paginationData = {
      page: requestObj.page_number,
      limit: requestObj.page_size,
    };
    if (!!requestObj.order) paginationData['order'] = requestObj.order;
    if (!!requestObj.filter) paginationData['filter'] = requestObj.filter;
    dispatch(getAdminVaccineList(paginationData));
  }, [requestObj]);

  useEffect(() => {
    if (!!vaccineList.data) {
      let finalVaccineData = vaccineList.data.map((value) => ({
        id: value.id,
        name: value.name,
        details: value.details,
        vaccine_manufacturer: value.vaccine_manufacturer,
        min_cooling_period_days: value.min_cooling_period_days,
        max_cooling_period_days: value.max_cooling_period_days,
        batch_no: value.batch_number,
        status: value.status === 1 ? "Active" : "Inactive",
      }));
      setData(finalVaccineData);
      setTotal(vaccineList.total);
    } else {
      setData([]);
    }
  }, [isLoaded]);

  const navigateToEditVaccine = (item) => {
    const { history } = props;
    history.push('/admin/edit-vaccine/' + item.id);
  };

  const navigateToAddVaccine = () => {
    const { history } = props;
    history.push('/admin/add-vaccine');
  };

  const showConfirmDelete = (item) => {
    confirm({
      title: 'Do you want to delete ' + item.name + '?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          adminDeleteVaccine(item.id, () => {
            dispatch(getAdminVaccineList({}));
          })
        );
      },
    });
  };

  const showConfirmVerify = (item) => {
    confirm({
      title: "Do you want to activate this " + item.name + "?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        dispatch(
          adminEditVaccine(item.id, { status: 1 }, () => {
            dispatch(resetVaccine())
            dispatch(getAdminVaccineList({}));
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText(null);
  };

  const downloadVaccineData = () => {
    dispatch(
      getAdminVaccineExportList((exportData) => {
        
        const csvReport = {
          data: exportData.data.data,
          headers: exportData.data.headers,
          filename: "vaccine_list.csv",
        };

        setExporData(csvReport);

        csvLink.current.link.click()
        

      })
    );
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      sorter: true,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Manufacturer',
      dataIndex: 'vaccine_manufacturer',
      key: 'vaccine_manufacturer',
      width: 200,
    },
    {
      title: 'Lot No',
      dataIndex: 'batch_no',
      key: 'batch_no',
      width: 100,
    },
    {
      title: 'Minimum Cooling Period',
      dataIndex: 'min_cooling_period_days',
      key: 'min_cooling_period_days',
      width: 125,
      sorter: true,
    },
    {
      title: 'Maximum Cooling Period',
      dataIndex: 'max_cooling_period_days',
      key: 'max_cooling_period_days',
      width: 125,
      sorter: true,
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 70,
    },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
      key: "x",
      width: 150,
      render: (item) => (
        <div>
          <Button type="link" onClick={() => navigateToEditVaccine(item)}>
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
        <h2>Vaccine List</h2>
        <div>
          <Button type="primary" onClick={navigateToAddVaccine}>
            Add Vaccine
          </Button>
          { data.length > 0 && <Button
            type="primary"
            className="ml-2"
            onClick={downloadVaccineData}
          >
            Download
          </Button>}
          { exportData && <CSVLink className="hidden" ref={csvLink} target='_blank' {...exportData}>Export Data</CSVLink>}
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
