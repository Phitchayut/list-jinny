import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const style = {
  headRow: {
    style: {
      borderRadius: '5px',
      color: 'black',
    },
  },
};

const columns = [
  {
    name: 'No.',
    selector: (row) => row.No,
    sorttable: true,
  },
  {
    name: 'Type',
    selector: (row) => row.TYPE,
    sorttable: true,
  },
  {
    name: 'Vendor Code',
    selector: (row) => row.VendorCode,
    sorttable: true,
  },
  {
    name: 'Vendor Name',
    selector: (row) => row.VendorName,
    sorttable: true,
  },
  {
    name: 'Supplier Contact',
    selector: (row) => row.Suppliercontact,
    sorttable: true,
  },
  {
    name: 'Position',
    selector: (row) => row.Position,
    sorttable: true,
  },
  {
    name: 'Tel.',
    cell: (row) => <p className="text-start">{row.Tel}</p>,
    sorttable: true,
  },
  {
    name: 'E-Mail',
    cell: (row) => <p className="text-start">{row.EMail}</p>,
    sorttable: true,
  },
];

const urlApi =
  'https://script.google.com/macros/s/AKfycby2J6gNdkhnheqgjYwZYwm9LOAw5xHLthkNMkEpkkzVpR6w84jrSA7nDxZ1qDYuyTgP/exec';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlApi);
        setData(response.data.data);
        setRecords(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const newData = data.filter((row) => {
      return (
        row.Position.toLowerCase().includes(filterValue) ||
        row.TYPE.toLowerCase().includes(filterValue) ||
        row.VendorName.toLowerCase().includes(filterValue) ||
        row.Tel.toLowerCase().includes(filterValue) ||
        row.EMail.toLowerCase().includes(filterValue) ||
        row.Suppliercontact.toLowerCase().includes(filterValue) ||
        row.VendorCode.toString().includes(filterValue)
      );
    });
    setRecords(newData);
  };

  console.log(data);

  return (
    <div className="container mx-auto">
      <div className="mt-5 text-3xl md:text-4xl lg:text-4xl font-semibold text-center">
        <h1>List Supplier For TSIS</h1>
        {isLoading ? (
          <div className="flex justify-center mt-4">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="mt-4 px-3 md:px-0 lg:px-0">
                <label className="input input-bordered flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    onChange={handleFilter}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </label>
                <DataTable
                  columns={columns}
                  data={records}
                  pagination
                  customStyles={style}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
