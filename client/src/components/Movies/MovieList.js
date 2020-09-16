import React from "react";
import { Paper, List } from "@material-ui/core";
import { MentionsPlaceHolder } from "../PlaceHolders/PlaceHolders";
import MovieItem from "./MovieItem";

function MovieList(props) {
  let { isLoading, movies } = props;


  return (
    <Paper elevation={0} style={{ height: "89vh", overflow: "scroll" }}>
      <List
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: 0
        }}
      >
        {movies.length > 0 ? (
          movies.map((o, i) => (
            <MovieItem
              key={i.toString()}
              index={i}
              movie={o}
            // selectedIndex={selectedIndex}
            // handleReply={s => handleReply(s)}
            // handleSelected={(id_str, o) => handleSelected(id_str, o)}
            ></MovieItem>
          ))
        ) : <span>No Records found</span>}
      </List>
    </Paper>
  );
}

export default MovieList;