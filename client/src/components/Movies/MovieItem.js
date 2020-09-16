import React from "react";
import { ListItem, Avatar, Divider, makeStyles } from "@material-ui/core";
import moment from "moment";
const useStyles = makeStyles(theme => ({
  root: {

  },
  marginGutter: {

    backgroundColor: 'transparent !important',
    border: '1px solid #e8e8e8',
    borderRadius: '2%'
  }
}));

function MovieItem(props) {
  let { movie, index } = props;
  const classes = useStyles();

  return (
    <>

      <ListItem
        className={classes.marginGutter}
        style={{ marginTop: index !== 0 ? '5px' : null, cursor: 'pointer' }}
        key={movie.id}
      // selected={props.selectedIndex !== tweet.id_str}
      // onClick={() => {
      //   handleReply("@" + tweet.user.screen_name + " ");
      //   handleSelected(tweet.id_str, tweet);
      // }}
      >
        <div style={{ marginLeft: "10px", maxWidth: "80%" }}>
          <h3>{movie.title}</h3>

          <p>
            <span style={{ fontSize: "0.8em" }}><b>Id:</b> {movie.id}</span>
          </p>
          <b style={{ fontSize: "1em" }}>
            {movie.year}{" "}
            <span
              style={{
                fontWeight: "normal",
                fontSize: "0.8em"
              }}
            >
              <b>Description:</b> {movie.description}
            </span>
          </b>
          <p>
            <span style={{ fontSize: "0.8em" }}><b>Genre:</b> {movie.genre}</span>
          </p>
          <p>
            <span style={{ fontSize: "0.8em" }}><b>Certificate:</b> {movie.certificate}</span>
          </p>
          <p>
            <span style={{ fontSize: "0.8em" }}><b>Imdb Rating:</b> {movie.imdbRating}</span>
          </p>
          <p>
            <span style={{ fontSize: "0.8em" }}><b>Directors:</b> {movie.directors}</span>
          </p>
          <p>
            <span style={{ fontSize: "0.8em" }}><b>Actors:</b> {movie.actors}</span>
          </p>
        </div>
      </ListItem>
      {/* <Divider /> */}
    </>
  );
}

export default MovieItem