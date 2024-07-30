import "./listList.css"
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect,} from "react";
import { Box } from "@mui/material";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "../../context/listContext/apiCalls";

export default function ProductList() {
  const {lists, dispatch} = useContext(ListContext) 

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteList(id,dispatch)
  };

  useEffect(() => {
    getLists(dispatch)
  },[])

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "type", headerName: "Type", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link to={"/lists/" + params.row._id} state={{list: params.row}}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div className="productList">
      <DataGrid
        rows={lists}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        getRowId={r => r._id}
        disableRowSelectionOnClick
      />
    </div>
  );
}
