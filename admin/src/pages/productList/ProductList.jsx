import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {MovieContext} from '../../context/movieContext/MovieContext'
import { deleteMovie, getMovies } from "../../context/movieContext/apiCalls";
import { Box } from "@mui/material";

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const {movies, dispatch} = useContext(MovieContext) 

  const handleDelete = (id) => {
    // setData(data.filter((item) => item.id !== id));
    deleteMovie(id,dispatch)
  };

  useEffect(() => {
    getMovies(dispatch)
  },[dispatch])

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "Year", width: 120 },
    { field: "limit", headerName: "Age Limit", width: 120 },
    { field: "isSeries", headerName: "IsSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="actions">
            <Link to={"/product/" + params.row._id} state={{movie: params.row}}>
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
        rows={movies}
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
