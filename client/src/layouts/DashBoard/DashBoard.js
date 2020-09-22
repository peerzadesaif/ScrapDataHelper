import React, { Component } from "react";
import api from "../../shared/customAxios";
import { apiUrl } from "../../shared/vars";
import { Grid, Paper } from "@material-ui/core";
import { observer } from "mobx-react";
import { appStore } from "../../store/appStore";
import Header from "../../components/Header/Header";
import { withRouter } from "react-router-dom";
import MovieList from "../../components/Movies/MovieList";

import Icon from '@material-ui/core/Icon';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import ForumIcon from '@material-ui/icons/Forum';
import PaymentIcon from '@material-ui/icons/Payment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import Checkbox from '@material-ui/core/Checkbox';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: '#FFFFFF',
    },
  },
  icon: {
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});

// Inspired by blueprintjs
function StyledCheckbox(props) {
  const classes = useStyles();

  return (
    <Checkbox
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      inputProps={{ 'aria-label': 'decorative checkbox' }}
      {...props}
    />
  );
}

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      movies: [],
      allMovies: [],
      movieSearch: "",
      isChecked: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.init();
  };

  handleOnChangeCheckbox = (event) => {
    this.setState({
      isChecked: event.target.checked
    });
  }

  onHandleSearch = (e) => {
    const { movies, allMovies, movieSearch, isChecked } = this.state;
    this.setState({
      movieSearch: e.target.value
    }, () => {
      isChecked ? this.onHandleSearchSubmit() : undefined
    });

  }


  onHandleClearSearchSubmit = () => {
    const { movies, allMovies, movieSearch } = this.state;
    this.setState({
      movies: allMovies,
      movieSearch: ''
    });
  }

  onHandleSearchSubmit = () => {
    this.setState({ isLoading: true });
    const { movies, allMovies, movieSearch } = this.state;
    let _movies = allMovies.filter((x) => {
      return (x.title.toLowerCase().includes(movieSearch.toLowerCase()) ||
        x.genre.toLowerCase().includes(movieSearch.toLowerCase()) ||
        x.description.toLowerCase().includes(movieSearch.toLowerCase()) ||
        x.directors.toLowerCase().includes(movieSearch.toLowerCase()) ||
        x.actors.toLowerCase().includes(movieSearch.toLowerCase()))
    });
    console.log('_movies', _movies);

    this.setState({
      movies: _movies
    }, () => {
      this.setState({ isLoading: false });
    });
  }

  getUniqueReplies = (replies) => {
    let _replies = {};
    Object.keys(replies).map((x) => {
      _replies[x] = [...new Set(replies[x].map(x => x['id']))].map((id) => replies[x].find(a => a.id === id))
    })
    return _replies
  }

  init = async () => {
    const { movies } = await api.get(`${apiUrl}/api/get-movies`);
    this.setState(
      {
        isLoading: false,
        movies,
        allMovies: movies,
      },
    );
  };



  logout = async () => {
    window.localStorage.clear();
    appStore.changeLoginState(false, null, "");
    setTimeout(() => {
      this.props.history.push("/");
    }, 100);
  };


  getSideNavs = () => ([
    {
      icon_name: 'access_time',
      icon_component: <AccessTimeIcon />,
      // icon_svg: getSVGIcon(props)(props)=><HomeIcon />
    },
    {
      icon_name: 'home',
      icon_component: <HomeIcon />
    },
    {
      icon_name: 'people_alt',
      icon_component: <PeopleAltIcon />
    },
    {
      icon_name: 'forum',
      icon_component: <ForumIcon />
    },
    {
      icon_name: 'payment',
      icon_component: <PaymentIcon />
    },
    {
      icon_name: 'home_one',
      icon_component: <HomeIcon />
    }
  ])

  scrollChat = () => {
    // const messages = document.getElementById('auto-scroll-chat');
    // messages.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  render() {
    let {
      movies,
      isLoading,
      movieSearch,
      isChecked
    } = this.state;

    return (
      <Grid container spacing={0} style={{ height: '130vh' }}>
        <Grid style={{ backgroundColor: '#f7f6f2', maxWidth: '5.5%' }} item xs={1}>
          <List style={{ marginTop: "8vh" }}>
            {this.getSideNavs().map((text, index) => (
              <ListItem button key={text.icon_name} style={{ padding: '28%', textAlign: 'center', marginTop: "20%", background: text.icon_name === 'forum' ? '#00000014' : 'transparent' }}>
                <ListItemIcon style={{ margin: '0 auto', minWidth: '28px' }}>
                  {/* {text.icon_component} */}
                  <Icon>{text.icon_name}</Icon>
                </ListItemIcon>
                {/* <ListItemText primary={text} /> */}
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={1}>
            <Header logout={this.logout} />
            <Grid style={{ maxWidth: '6%' }} item xs={1}>
            </Grid>
            <Grid item xs={11}>
              <div style={{ height: "14%" }}>
                <div style={{
                  display: "flex", flexDirection: "row", margin: "10px", width: '90%',
                  textAlign: 'center'
                }}>
                  <h1>Movies Scrap Help</h1>
                  <div className="search-box" style={{
                    margin: '30px', border: '1px solid #e7e6e2',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    overflow: 'hidden',
                    padding: '0.2rem 0.4rem'
                  }}>
                    <img src="./img/search-solid.svg" height="12px" width="12px" alt="" />
                    <input style={{
                      border: 'none',
                      background: 'transparent'
                    }}
                      value={movieSearch}
                      onChange={this.onHandleSearch}
                      placeholder="Quick search" type="text" />
                  </div>
                  <div>
                    <div
                      onClick={this.onHandleSearchSubmit}
                      style={{
                        margin: '30px', border: '1px solid #e7e6e2',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        overflow: 'hidden',
                        padding: '0.2rem 1.4rem',
                        paddingRight: '1.8rem',
                        cursor: 'pointer'
                      }}>
                      <img src="./img/search-solid.svg" height="12px" width="12px" alt="" />
                      <span >Search</span>
                    </div>

                  </div>
                  <div
                    onClick={this.onHandleClearSearchSubmit}
                    style={{
                      margin: '30px', border: '1px solid #e7e6e2',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      overflow: 'hidden',
                      padding: '0.2rem 1.4rem',
                      paddingRight: '1.8rem',
                      cursor: 'pointer'
                    }}>
                    <img src="./img/search-solid.svg" height="12px" width="12px" alt="" />
                    <span >Clear</span>
                  </div>

                  <StyledCheckbox checked={isChecked}
                    onChange={this.handleOnChangeCheckbox}

                    color="primary" />
                  <span style={{ marginTop: 30 }}>Search on input change</span>
                  {/* <Checkbox

                    checked={isChecked}
                    onChange={this.handleOnChangeCheckbox}

                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  /> */}
                </div>
              </div>
              <Grid container spacing={0} >

                <Grid item style={{ marginRight: '2%', marginLeft: '-2%' }}>
                  <MovieList
                    isLoading={isLoading}
                    movies={movies}
                  // selectedIndex={selectedIndex}
                  // handleReply={this.handleReply}
                  // handleSelected={this.handleSelected}
                  ></MovieList>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid >
    );
  }
}




export default observer(withRouter(DashBoard));
