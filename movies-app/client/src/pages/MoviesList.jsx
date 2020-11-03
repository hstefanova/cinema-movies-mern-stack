import React, { Component, useState, useEffect, useMemo } from "react";
import api from "../api";
import styled from "styled-components";
import axios from "axios";
import { Table } from "../components";
// import { useTable } from 'react-table'

const Wrapper = styled.div`
  paddng: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

class UpdateMovie extends Component {
  updateUser = (event) => {
    event.preventDefault();
    window.location.href = `/movies/edit/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteMovie extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do you want to delete the movie ${this.props.id} permanently?`
      )
    ) {
      api.deleteMovieById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
        filterable: true,
      },
      {
        Header: "Name",
        accessor: "title",
        filterable: true,
      },
      {
        Header: "Rating",
        accessor: "rating",
        filterable: true,
      },
      {
        Header: "Time",
        accessor: "time",
        Cell: (props) => <span>{props.value.join(" / ")}</span>,
      },
      {
        Header: "Remove",
        accessor: "removeMovie",
        Cell: function (props) {
          console.log("PROPS: ", props.row.original._id);
          return (
            <span>
              <DeleteMovie id={props.row.original._id} />
            </span>
          );
        },
      },
      {
        Header: "UpdateMovie",
        accessor: "updateMovie",
        Cell: function (props) {
          return (
            <span>
              <UpdateMovie id={props.row.original._id} />
            </span>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const result = await api.getAllMovies();
        setMovies(result.data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <Wrapper>
      <Table columns={columns} data={movies} />
    </Wrapper>
  );
};

export default MoviesList;
