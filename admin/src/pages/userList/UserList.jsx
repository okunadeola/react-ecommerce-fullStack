import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletecustomer, getCustomers } from "../../redux/apiCalls";

export default function UserList() {
  const dispatch = useDispatch()
  const customers = useSelector((state)=> state.customer.customers)

  useEffect(()=>{
    getCustomers(dispatch)
  }, [dispatch]);

  const handleDelete = (id) => {
    // deletecustomer(id, dispatch);
    alert("coming soon...")
  };
  
  const columns = [
    { field: "_id", headerName: "ID", width: 120 },
    {
      field: "username",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.image || "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"} alt="profileImg" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params)=>{
        return (
          <>
          <div>Active</div>
          </>
        )
      }
    },
    {
      field: "createdAt",
      headerName: "Date Joined",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={customers}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row)=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
